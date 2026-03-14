/**
 * Daily Quiz Cron Job
 * Runs automatically at midnight (00:00) every day to generate fresh quiz questions.
 * Mirrors the KareerGrowth reference project's automatic daily quiz behaviour.
 */
const cron = require('node-cron');
const { generateDailyQuiz } = require('../services/dailyQuizService');

/**
 * Schedule the daily quiz generation cron job.
 * Cron expression: '0 0 * * *' = every day at 12:00 AM (midnight)
 */
function startQuizCron() {
    console.log('[DailyQuiz Cron] Scheduling daily quiz generation at midnight (00:00)...');

    cron.schedule('0 0 * * *', async () => {
        console.log(`[DailyQuiz Cron] Triggered at ${new Date().toISOString()} — generating today's quiz...`);
        try {
            const result = await generateDailyQuiz(5);
            console.log(`[DailyQuiz Cron] Success — ${result.questionsCount} questions generated for ${result.quizDate}`);
        } catch (err) {
            console.error('[DailyQuiz Cron] Failed to generate quiz:', err.message);
        }
    }, {
        timezone: 'Asia/Kolkata', // IST — adjust if needed
    });

    console.log('[DailyQuiz Cron] Daily quiz cron job registered.');
}

module.exports = { startQuizCron };
