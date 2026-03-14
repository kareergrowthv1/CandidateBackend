const express = require('express');
const router = express.Router();
const {
    getCourses, getCourseBySlug,
    getCandidateProgress, startCourseForCandidate, updateCandidateProgress, markLessonComplete, 
    markModuleComplete, getCandidateSkills, getAllCandidatesForCourse,
    getLessonById, getLessonsByModuleId, getModuleItems, getFirstLessonByCourseSlug,
} = require('../services/programmingService');

// ─── Course routes ────────────────────────────────────────────────────────────

router.get('/courses', async (req, res) => {
    try { res.json(await getCourses()); }
    catch (err) { res.status(500).json({ error: err.message }); }
});

router.get('/courses/:slug', async (req, res) => {
    try {
        const course = await getCourseBySlug(req.params.slug);
        if (!course) return res.status(404).json({ error: 'Course not found' });
        res.json(course);
    } catch (err) { res.status(500).json({ error: err.message }); }
});

router.get('/courses/:slug/first-lesson', async (req, res) => {
    try {
        const lesson = await getFirstLessonByCourseSlug(req.params.slug);
        if (!lesson) return res.status(404).json({ error: 'First lesson not found' });
        res.json(lesson);
    } catch (err) { res.status(500).json({ error: err.message }); }
});

// ─── Lesson routes (embedded in each course) ─────────────────────────────────

/**
 * GET /api/programming/lessons/:lessonId
 * Finds a lesson by searching embedded arrays across all courses.
 */
router.get('/lessons/:lessonId', async (req, res) => {
    try {
        const lesson = await getLessonById(req.params.lessonId);
        if (!lesson) return res.status(404).json({ error: 'Lesson not found' });
        res.json(lesson);
    } catch (err) { res.status(500).json({ error: err.message }); }
});

/**
 * GET /api/programming/modules/:moduleId/lessons
 * Returns all lessons for a module (from the embedded module.lessons array).
 */
router.get('/modules/:moduleId/lessons', async (req, res) => {
    try {
        const lessons = await getLessonsByModuleId(req.params.moduleId);
        res.json(lessons);
    } catch (err) { res.status(500).json({ error: err.message }); }
});

/**
 * GET /api/programming/modules/:moduleId/items
 * Returns the items (topics list) for a specific module — called when user expands accordion.
 */
router.get('/modules/:moduleId/items', async (req, res) => {
    try {
        const items = await getModuleItems(req.params.moduleId);
        res.json(items);
    } catch (err) { res.status(500).json({ error: err.message }); }
});

// ─── Per-language candidate progress routes ───────────────────────────────────

/**
 * GET /api/programming/candidate-progress/:courseSlug/:candidateId
 */
router.get('/candidate-progress/:courseSlug/:candidateId', async (req, res) => {
    try {
        const { courseSlug, candidateId } = req.params;
        const { summary, moduleId, lessonId } = req.query;
        
        const progress = await getCandidateProgress(candidateId, courseSlug, {
            summary: summary === 'true',
            moduleId,
            lessonId
        });

        // The user specifically requested candidates liked data from this endpoint
        const candidatesLiked = Math.floor(Math.random() * 5000) + 1000; // Mocked until there's an actual DB table for course likes

        if (!progress) {
            return res.json({ candidatesLiked });
        }
        res.json({ ...progress, candidatesLiked });
    } catch (err) { res.status(500).json({ error: err.message }); }
});

/**
 * POST /api/programming/start-course
 * Body: { candidateId, courseSlug, courseId }
 */
router.post('/start-course', async (req, res) => {
    const { candidateId, courseSlug, courseId } = req.body;
    if (!candidateId || !courseSlug) return res.status(400).json({ error: 'candidateId and courseSlug required' });
    try {
        const progress = await startCourseForCandidate(candidateId, courseSlug, courseId);
        res.json(progress);
    } catch (err) { res.status(500).json({ error: err.message }); }
});

/**
 * PATCH /api/programming/candidate-progress/:courseSlug/:candidateId
 * Body: { metadata: { anyField: value } }
 */
router.patch('/candidate-progress/:courseSlug/:candidateId', async (req, res) => {
    const { courseSlug, candidateId } = req.params;
    const { metadata = {} } = req.body;
    try {
        await updateCandidateProgress(candidateId, courseSlug, metadata);
        res.json({ success: true });
    } catch (err) { res.status(500).json({ error: err.message }); }
});

router.post('/complete-lesson', async (req, res) => {
    const { candidateId, courseSlug, lessonId, pointsUpdate = null } = req.body;
    if (!candidateId || !courseSlug || !lessonId) return res.status(400).json({ error: 'candidateId, courseSlug, lessonId required' });
    try {
        await markLessonComplete(candidateId, courseSlug, lessonId, pointsUpdate);
        const progress = await getCandidateProgress(candidateId, courseSlug);
        res.json({ success: true, ...progress });
    } catch (err) { res.status(500).json({ error: err.message }); }
});

/**
 * POST /api/programming/complete-module
 * Body: { candidateId, courseSlug, moduleId, pointsUpdate }
 */
router.post('/complete-module', async (req, res) => {
    const { candidateId, courseSlug, moduleId, pointsUpdate = null } = req.body;
    if (!candidateId || !courseSlug || !moduleId) return res.status(400).json({ error: 'candidateId, courseSlug, moduleId required' });
    try {
        await markModuleComplete(candidateId, courseSlug, moduleId, pointsUpdate);
        const progress = await getCandidateProgress(candidateId, courseSlug);
        res.json({ success: true, ...progress });
    } catch (err) { res.status(500).json({ error: err.message }); }
});

router.get('/candidate-skills/:courseSlug/:candidateId', async (req, res) => {
    try {
        const { courseSlug, candidateId } = req.params;
        const skills = await getCandidateSkills(candidateId, courseSlug);
        res.json(skills);
    } catch (err) { res.status(500).json({ error: err.message }); }
});

/**
 * GET /api/programming/all-candidates/:courseSlug
 * Admin: all candidates enrolled in a specific language course.
 */
router.get('/all-candidates/:courseSlug', async (req, res) => {
    try {
        const candidates = await getAllCandidatesForCourse(req.params.courseSlug);
        res.json(candidates);
    } catch (err) { res.status(500).json({ error: err.message }); }
});

module.exports = router;
