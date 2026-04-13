const express = require('express');
const router = express.Router();
const resumeController = require('../controllers/resumeController');
const authMiddleware = require('../middlewares/auth.middleware');
const tenantMiddleware = require('../middlewares/tenant.middleware');

// Analyze resume text (non-persistent: no DB save)
router.post('/analyze', authMiddleware, tenantMiddleware, resumeController.analyzeResume);

// Enhance section content with AI (SSE stream — proxies to Streaming AI)
router.post('/enhance', resumeController.enhanceSection);

// Resume templates (stored in kareergrowth.sql collection)
router.get('/templates', resumeController.getTemplates);
router.get('/templates/:id', resumeController.getTemplateById);
router.put('/templates/:id', authMiddleware, tenantMiddleware, resumeController.updateTemplate);

module.exports = router;
