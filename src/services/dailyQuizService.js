/**
 * Daily Quiz Service
 * Generates AI quiz questions via Groq and stores them in MongoDB.
 * Mirrors the logic of KareerGrowth/AiService/DailyQuizGenerator.py
 */
const axios = require('axios');
const { getCollection } = require('../config/mongo');

const STREAMING_AI_URL = process.env.STREAMING_AI_URL || 'http://localhost:9000';

const DAILY_QUIZ_COLLECTION = 'DailyQuiz';
const DAILY_QUIZ_ANSWERS_COLLECTION = 'DailyQuizAnswers';

/**
 * Request today's quiz using Streaming AI and store in MongoDB.
 * Replaces any existing quiz for today.
 * @returns {Promise<{success: boolean, questionsCount: number, quizDate: string}>}
 */
async function generateDailyQuiz(numberOfQuestions = 5) {
    const url = `${STREAMING_AI_URL}/api/generate-daily-quiz`;

    console.log(`[DailyQuiz] Requesting ${numberOfQuestions} questions via Streaming AI...`);

    const response = await axios.post(url, {
        category: "Software Development, IT and General Aptitude",
        difficulty: "Medium"
    }, { timeout: 120000 });

    const questions = response.data?.data || [];

    if (questions.length === 0) {
        throw new Error('Streaming AI did not return valid questions');
    }

    // Get today's date string (YYYY-MM-DD)
    const today = new Date().toISOString().split('T')[0];

    // Attach unique IDs to each question
    const { v4: uuidv4 } = require('uuid');
    const questionsWithIds = questions.map(q => ({ ...q, questionId: uuidv4(), category: q.category || 'MIXED' }));

    const collection = await getCollection(DAILY_QUIZ_COLLECTION);

    // Replace today's quiz (upsert)
    await collection.updateOne(
        { quizDate: today },
        { $set: { quizDate: today, questions: questionsWithIds, generatedAt: new Date() } },
        { upsert: true }
    );

    console.log(`[DailyQuiz] Stored ${questionsWithIds.length} questions for ${today}`);
    return { success: true, questionsCount: questionsWithIds.length, quizDate: today };
}

/**
 * Get today's quiz questions, merged with a specific candidate's answer status.
 * @param {string} candidateId
 * @returns {Promise<{success: boolean, quizDate: string, questions: Array}>}
 */
async function getTodaysQuiz(candidateId) {
    const today = new Date().toISOString().split('T')[0];

    const collection = await getCollection(DAILY_QUIZ_COLLECTION);
    let quizDoc = await collection.findOne({ quizDate: today });

    if (!quizDoc || !quizDoc.questions || quizDoc.questions.length === 0) {
        try {
            console.log(`[DailyQuiz] Quiz not found for ${today}, auto-generating via Streaming AI...`);
            await generateDailyQuiz(5);
            quizDoc = await collection.findOne({ quizDate: today });
            if (!quizDoc || !quizDoc.questions || quizDoc.questions.length === 0) {
                return { success: true, quizDate: today, questions: [] };
            }
        } catch (error) {
            console.error('[DailyQuiz] Auto-generation failed:', error.message);
            return { success: true, quizDate: today, questions: [] };
        }
    }

    // Load this candidate's answers for today
    let answeredMap = {};
    if (candidateId) {
        const answersCollection = await getCollection(DAILY_QUIZ_ANSWERS_COLLECTION);
        const answers = await answersCollection.find({ candidateId, quizDate: today }).toArray();
        for (const a of answers) {
            answeredMap[a.questionId] = a;
        }
    }

    // Merge answer status into questions (hide correctAnswerIndex unless answered)
    const questions = quizDoc.questions.map(q => {
        const answer = answeredMap[q.questionId];
        if (answer) {
            return {
                questionId: q.questionId,
                question: q.question,
                options: q.options,
                category: q.category,
                answered: true,
                selectedAnswerIndex: answer.selectedAnswerIndex,
                isCorrect: answer.isCorrect,
                correctAnswerIndex: q.correctAnswerIndex,
                explanation: q.explanation,
            };
        }
        return {
            questionId: q.questionId,
            question: q.question,
            options: q.options,
            category: q.category,
            answered: false,
        };
    });

    return { success: true, quizDate: today, questions };
}

/**
 * Submit a candidate's answer for a quiz question.
 * Prevents re-answering (returns error if already answered).
 * @param {string} candidateId
 * @param {string} questionId
 * @param {number} selectedAnswerIndex
 * @returns {Promise<{success: boolean, isCorrect: boolean, correctAnswerIndex: number, explanation: string}>}
 */
async function submitAnswer(candidateId, questionId, selectedAnswerIndex) {
    const today = new Date().toISOString().split('T')[0];

    // Check if already answered
    const answersCollection = await getCollection(DAILY_QUIZ_ANSWERS_COLLECTION);
    const existing = await answersCollection.findOne({ candidateId, questionId, quizDate: today });
    if (existing) {
        return { success: false, message: 'You have already answered this question', alreadyAnswered: true };
    }

    // Get the correct answer from the quiz
    const quizCollection = await getCollection(DAILY_QUIZ_COLLECTION);
    const quizDoc = await quizCollection.findOne({ quizDate: today });
    if (!quizDoc) {
        return { success: false, message: "Today's quiz not found" };
    }

    const question = quizDoc.questions.find(q => q.questionId === questionId);
    if (!question) {
        return { success: false, message: 'Question not found in today\'s quiz' };
    }

    const isCorrect = selectedAnswerIndex === question.correctAnswerIndex;

    // Store the answer
    await answersCollection.insertOne({
        candidateId,
        questionId,
        quizDate: today,
        selectedAnswerIndex,
        isCorrect,
        answeredAt: new Date(),
    });

    return {
        success: true,
        isCorrect,
        correctAnswerIndex: question.correctAnswerIndex,
        explanation: question.explanation,
    };
}

module.exports = { generateDailyQuiz, getTodaysQuiz, submitAnswer };
