const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notificationController');
const auth = require('../middlewares/auth.middleware');

// All notification routes are protected
router.get('/', auth, notificationController.getNotifications);
router.delete('/:id', auth, notificationController.dismissNotification);

// Create global notification (typically called by Superadmin/System)
router.post('/global', notificationController.createGlobalNotification);

module.exports = router;
