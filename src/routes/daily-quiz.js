/**
 * Daily Quiz Routes
 * GET  /api/daily-quiz/today         — fetch today's quiz with candidate's answer status
 * POST /api/daily-quiz/submit-answer — submit an answer for a question (locked once answered)
 * POST /api/daily-quiz/admin/generate — manually trigger quiz generation (SuperAdmin)
 */
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth.middleware');
const { generateDailyQuiz, getTodaysQuiz, submitAnswer } = require('../services/dailyQuizService');

/**
 * GET /api/daily-quiz/today
 * Returns today's quiz questions with this candidate's answer status.
 */
router.get('/today', authMiddleware, async (req, res) => {
    try {
        // Candidate ID from auth middleware (same pattern as other routes)
        const candidateId = req.user?.id || req.user?.candidateId || req.headers['x-user-id'] || null;
        const result = await getTodaysQuiz(candidateId);
        return res.json(result);
    } catch (err) {
        console.error('[DailyQuiz] GET /today error:', err);
        return res.status(500).json({ success: false, message: err.message || 'Failed to fetch quiz' });
    }
});

/**
 * POST /api/daily-quiz/submit-answer
 * Body: { questionId: string, selectedAnswerIndex: number }
 * Returns: { success, isCorrect, correctAnswerIndex, explanation }
 */
router.post('/submit-answer', authMiddleware, async (req, res) => {
    try {
        const candidateId = req.user?.id || req.user?.candidateId || req.headers['x-user-id'] || null;
        if (!candidateId) {
            return res.status(401).json({ success: false, message: 'Unauthorized: candidate ID not found' });
        }

        const { questionId, selectedAnswerIndex } = req.body;
        if (!questionId || selectedAnswerIndex === undefined || selectedAnswerIndex === null) {
            return res.status(400).json({ success: false, message: 'questionId and selectedAnswerIndex are required' });
        }

        const result = await submitAnswer(candidateId, questionId, Number(selectedAnswerIndex));
        return res.json(result);
    } catch (err) {
        console.error('[DailyQuiz] POST /submit-answer error:', err);
        return res.status(500).json({ success: false, message: err.message || 'Failed to submit answer' });
    }
});

/**
 * POST /api/daily-quiz/admin/generate
 * Manually trigger quiz generation (called by SuperAdmin Cron Jobs settings page).
 * No candidate auth needed — uses a simple service-level token check or just allows.
 */
router.post('/admin/generate', async (req, res) => {
    try {
        // Optional: add a simple admin secret check
        // const adminSecret = req.headers['x-admin-secret'];
        // if (adminSecret !== process.env.ADMIN_SECRET) return res.status(403).json({ success: false });

        const { numberOfQuestions = 5 } = req.body;
        const result = await generateDailyQuiz(numberOfQuestions);
        return res.json({
            ...result,
            message: `Successfully generated ${result.questionsCount} quiz questions for ${result.quizDate}`,
        });
    } catch (err) {
        console.error('[DailyQuiz] POST /admin/generate error:', err);
        return res.status(500).json({ success: false, message: err.message || 'Failed to generate quiz' });
    }
});

module.exports = router;
