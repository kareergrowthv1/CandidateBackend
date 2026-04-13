const express = require('express');
const router = express.Router();
const aiMockController = require('../controllers/aiMockController');
const authMiddleware = require('../middlewares/auth.middleware');
const tenantMiddleware = require('../middlewares/tenant.middleware');

/**
 * AI Mock Test Routes
 */

// SSE Streaming Interview
router.post('/stream', authMiddleware, tenantMiddleware, aiMockController.streamInterview);

// Save progress
router.post('/submit', authMiddleware, tenantMiddleware, aiMockController.saveProgress);

// Get rounds status
router.get('/rounds', authMiddleware, tenantMiddleware, aiMockController.getRounds);

// Session history
router.get('/sessions', authMiddleware, tenantMiddleware, aiMockController.getSessions);
router.get('/sessions/:id', authMiddleware, tenantMiddleware, aiMockController.getSessionDetails);

// Save mock session to MongoDB
router.post('/save-session', authMiddleware, tenantMiddleware, aiMockController.saveSession);

module.exports = router;
