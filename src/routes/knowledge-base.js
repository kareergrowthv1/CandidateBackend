const express = require('express');
const router = express.Router();
const { getKbCollection, KB_COLLECTIONS } = require('../config/mongo');

/**
 * GET /api/knowledge-base/topics
 * Returns the list of all knowledge base topics (for navigation grid).
 */
router.get('/topics', async (req, res) => {
    try {
        const col = await getKbCollection(KB_COLLECTIONS.TOPICS);
        const topics = await col.find({}, { projection: { _id: 1, title: 1, slug: 1, icon: 1, description: 1, isBooming: 1 } })
            .sort({ title: 1 })
            .toArray();
        return res.json({ success: true, data: topics });
    } catch (err) {
        console.error('knowledge-base/topics error:', err);
        return res.status(500).json({ success: false, message: 'Failed to fetch topics' });
    }
});

/**
 * GET /api/knowledge-base/content/:topicSlug
 * Returns all content items for a specific topic.
 */
router.get('/content/:topicSlug', async (req, res) => {
    try {
        const { topicSlug } = req.params;
        const topicsCol = await getKbCollection(KB_COLLECTIONS.TOPICS);
        const topic = await topicsCol.findOne({ slug: topicSlug });

        if (!topic) {
            return res.status(404).json({ success: false, message: 'Topic not found' });
        }

        const contentsCol = await getKbCollection(topicSlug);
        // Exclude content body from index to keep it lightweight
        const contents = await contentsCol.find({}, { projection: { content: 0 } })
            .sort({ order: 1 })
            .toArray();

        return res.json({ success: true, data: { topic, contents } });
    } catch (err) {
        console.error('knowledge-base/content error:', err);
        return res.status(500).json({ success: false, message: 'Failed to fetch content' });
    }
});

const redisClient = require('../config/redis');

/**
 * GET /api/knowledge-base/item/:topicSlug/:itemId
 * Returns the full content for a specific item.
 * Implements Redis caching to reduce DB hits.
 */
router.get('/item/:topicSlug/:itemId', async (req, res) => {
    try {
        const { topicSlug, itemId } = req.params;
        const cacheKey = `kb:item:${topicSlug}:${itemId}`;

        // 1. Try to fetch from Redis Cache
        try {
            const cachedItem = await redisClient.get(cacheKey);
            if (cachedItem) {
                console.log(`[Redis] Cache Hit for ${cacheKey}`);
                return res.json({ success: true, data: JSON.parse(cachedItem), cached: true });
            }
        } catch (redisErr) {
            console.error('[Redis] Error fetching cache:', redisErr);
        }

        // 2. Fetch from MongoDB if cache miss
        console.log(`[Redis] Cache Miss for ${cacheKey}. Fetching from MongoDB...`);
        const contentsCol = await getKbCollection(topicSlug);
        const { ObjectId } = require('mongodb');
        let query = {};
        try {
            query = { _id: new ObjectId(itemId) };
        } catch (e) {
            query = { _id: itemId };
        }

        const item = await contentsCol.findOne(query);

        if (!item) {
            return res.status(404).json({ success: false, message: 'Item not found' });
        }

        // 3. Cache the result in Redis (Set expiry to 1 hour = 3600 seconds)
        try {
            await redisClient.setEx(cacheKey, 3600, JSON.stringify(item));
        } catch (redisErr) {
            console.error('[Redis] Error setting cache:', redisErr);
        }

        return res.json({ success: true, data: item });
    } catch (err) {
        console.error('knowledge-base/item error:', err);
        return res.status(500).json({ success: false, message: 'Failed to fetch item' });
    }
});

module.exports = router;
