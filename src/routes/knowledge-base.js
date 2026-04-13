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

/**
 * GET /api/knowledge-base/search?q=loops
 * Full-text search across all topic collections.
 * Searches: topic title, content item title, and subItem titles.
 * Returns up to top 5 matches with navigation info.
 */
router.get('/search', async (req, res) => {
    const q = (req.query.q || '').trim();
    if (!q || q.length < 2) {
        return res.json({ success: true, data: [] });
    }

    try {
        const topicsCol = await getKbCollection(KB_COLLECTIONS.TOPICS);
        const allTopics = await topicsCol.find({}, { projection: { _id: 1, title: 1, slug: 1 } }).toArray();

        const regex = new RegExp(q, 'i');
        const results = [];

        // Search each topic's collection in parallel
        await Promise.all(allTopics.map(async (topic) => {
            try {
                const col = await getKbCollection(topic.slug);

                // 1. Match on main content title
                const titleMatches = await col.find(
                    { title: { $regex: regex } },
                    { projection: { _id: 1, title: 1, slug: 1, subItems: 1 } }
                ).limit(5).toArray();

                for (const item of titleMatches) {
                    results.push({
                        type: 'content',
                        topicSlug: topic.slug,
                        topicTitle: topic.title,
                        itemId: item._id,
                        itemSlug: item.slug,
                        title: item.title,
                        subtitle: topic.title,
                        url: `/knowledge-base/${topic.slug}/${item.slug || item._id}`,
                    });
                }

                // 2. Match on subItem titles (e.g. section headings like "What is Java?")
                const subMatches = await col.find(
                    { 'subItems.title': { $regex: regex } },
                    { projection: { _id: 1, title: 1, slug: 1, subItems: 1 } }
                ).limit(5).toArray();

                for (const item of subMatches) {
                    const matchingSubItems = (item.subItems || []).filter(s => regex.test(s.title));
                    for (const sub of matchingSubItems) {
                        // Avoid duplicate if main title already matched
                        const alreadyAdded = results.some(r => r.type === 'content' && String(r.itemId) === String(item._id));
                        results.push({
                            type: 'subitem',
                            topicSlug: topic.slug,
                            topicTitle: topic.title,
                            itemId: item._id,
                            itemSlug: item.slug,
                            title: sub.title,
                            subtitle: `${topic.title} › ${item.title}`,
                            url: `/knowledge-base/${topic.slug}/${String(item._id)}`,
                        });
                    }
                }
            } catch (e) {
                // silently skip topics with no collection
            }
        }));

        // Also search topic names themselves
        const topicMatches = allTopics.filter(t => regex.test(t.title));
        for (const t of topicMatches) {
            results.unshift({
                type: 'topic',
                topicSlug: t.slug,
                topicTitle: t.title,
                title: t.title,
                subtitle: 'Course',
                url: `/knowledge-base/${t.slug}`,
            });
        }

        // Deduplicate and cap at 5
        const seen = new Set();
        const deduped = results.filter(r => {
            const key = `${r.topicSlug}:${r.title}`;
            if (seen.has(key)) return false;
            seen.add(key);
            return true;
        });

        return res.json({ success: true, data: deduped.slice(0, 5) });
    } catch (err) {
        console.error('knowledge-base/search error:', err);
        return res.status(500).json({ success: false, message: 'Search failed' });
    }
});

module.exports = router;
