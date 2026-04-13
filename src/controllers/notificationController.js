const { getDb, COLLECTIONS } = require('../config/mongo');
const { ObjectId } = require('mongodb');

/**
 * Get notifications for the logged-in user within the last 24 hours.
 * Includes user-specific and global notifications (filtering out user-dismissed ones).
 * Query Params: limit, offset
 */
exports.getNotifications = async (req, res) => {
    try {
        const db = await getDb();
        const candidateId = req.user.id; // From auth middleware
        const { limit = 10, offset = 0 } = req.query;

        // Current time minus 24 hours
        const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);

        // 1. Get IDs of global notifications dismissed by this user
        const dismissedGlobal = await db.collection(COLLECTIONS.NOTIFICATION_DISMISSALS)
            .find({ candidateId })
            .toArray();
        const dismissedIds = dismissedGlobal.map(d => d.notificationId.toString());

        // 2. Fetch notifications (personal OR global)
        const notifications = await db.collection(COLLECTIONS.NOTIFICATIONS)
            .find({
                $or: [
                    { candidateId: candidateId }, // Personal
                    { type: 'global' }            // Global (added by Admin/System)
                ],
                createdAt: { $gte: twentyFourHoursAgo },
                dismissed: { $ne: true } // For personal, this flag is used
            })
            .sort({ createdAt: -1 })
            .toArray();

        // 3. Filter global notifications that were dismissed by this specific user
        const filteredNotifications = notifications.filter(n => {
            if (n.type === 'global') {
                return !dismissedIds.includes(n._id.toString());
            }
            return true;
        });

        // 4. Apply manual pagination (since we filtered after fetching)
        const paginated = filteredNotifications.slice(parseInt(offset), parseInt(offset) + parseInt(limit));

        res.status(200).json({
            success: true,
            data: paginated
        });
    } catch (error) {
        console.error('Error fetching notifications:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

/**
 * Dismiss a notification for the user.
 */
exports.dismissNotification = async (req, res) => {
    try {
        const db = await getDb();
        const { id } = req.params;
        const candidateId = req.user.id;

        // Check if the notification is global or personal
        const notification = await db.collection(COLLECTIONS.NOTIFICATIONS).findOne({ _id: new ObjectId(id) });
        if (!notification) {
            return res.status(404).json({ success: false, message: 'Notification not found' });
        }

        if (notification.type === 'global') {
            // Record dismissal for this user in separate collection
            await db.collection(COLLECTIONS.NOTIFICATION_DISMISSALS).updateOne(
                { candidateId, notificationId: new ObjectId(id) },
                { $set: { candidateId, notificationId: new ObjectId(id), dismissedAt: new Date() } },
                { upsert: true }
            );
        } else {
            // Direct update for personal notification
            await db.collection(COLLECTIONS.NOTIFICATIONS).updateOne(
                { _id: new ObjectId(id), candidateId },
                { $set: { dismissed: true } }
            );
        }

        res.status(200).json({ success: true, message: 'Notification dismissed' });
    } catch (error) {
        console.error('Error dismissing notification:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

/**
 * Create a global notification (triggered by Superadmin or System).
 * Body: { title, message }
 */
exports.createGlobalNotification = async (req, res) => {
    try {
        const db = await getDb();
        const { title, message } = req.body;

        if (!title || !message) {
            return res.status(400).json({ success: false, message: 'Title and message are required' });
        }

        const newNotification = {
            type: 'global',
            title,
            message,
            createdAt: new Date(),
            dismissed: false
        };

        const result = await db.collection(COLLECTIONS.NOTIFICATIONS).insertOne(newNotification);

        res.status(201).json({
            success: true,
            message: 'Global notification created',
            data: { ...newNotification, _id: result.insertedId }
        });
    } catch (error) {
        console.error('Error creating global notification:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};
