const { getProgCollection, getProgDb, PROG_COLLECTIONS, langCandidateCollection } = require('../config/mongo');
const { pool, DB_NAME } = require('../config/db');
const { ObjectId } = require('mongodb');
const mysql = require('mysql2/promise');

// ─── Course helpers ───────────────────────────────────────────────────────────

async function getCourses() {
    const col = await getProgCollection(PROG_COLLECTIONS.COURSES);
    // Return courses without the full embedded modules (just top-level stats)
    return col.find({}, {
        projection: {
            name: 1, slug: 1, description: 1, icon: 1, color: 1, level: 1,
            lessonsCount: 1, articlesCount: 1, quizzesCount: 1,
            projectsCount: 1, videosCount: 1, duration: 1,
            // Include modules but strip out lesson content for list view
            'modules._id': 1, 'modules.title': 1, 'modules.order': 1,
            'modules.description': 1, 'modules.items': 1,
            'modules.lessonsCount': 1, 'modules.articlesCount': 1,
            'modules.quizzesCount': 1, 'modules.projectsCount': 1,
            'modules.videosCount': 1, 'modules.conceptsCount': 1,
        }
    }).toArray();
}

async function getCourseBySlug(slug) {
    const col = await getProgCollection(PROG_COLLECTIONS.COURSES);
    const course = await col.findOne({ slug });
    if (!course) return null;

    // Recalculate counts dynamically based on actual content
    let totalLessons = 0;
    let totalArticles = 0;
    let totalQuizzes = 0;
    let totalProjects = 0;
    let totalVideos = 0;

    const lightModules = (course.modules || []).map(mod => {
        // Module level counts
        const lessons = (mod.lessons || []);
        const items = (mod.items || []);
        
        const lessonEntriesInItems = items.filter(i => i.type === 'lesson').length;
        const mLessons = (lessonEntriesInItems === 1 && lessons.length > 1) ? lessons.length : (lessonEntriesInItems || lessons.length);
        const mArticles = items.filter(i => i.type === 'article').length;
        const mQuizzes = items.filter(i => i.type === 'quiz').length;
        const mProjects = items.filter(i => i.type === 'project').length;
        const mVideos = items.filter(i => i.type === 'video').length;

        totalLessons += mLessons;
        totalArticles += mArticles;
        totalQuizzes += mQuizzes;
        totalProjects += mProjects;
        totalVideos += mVideos;

        return {
            ...mod,
            lessonsCount: mLessons,
            articlesCount: mArticles,
            quizzesCount: mQuizzes,
            projectsCount: mProjects,
            videosCount: mVideos,
            conceptsCount: mLessons + mArticles + mQuizzes + mProjects + mVideos,
            lessons: lessons.map(l => {
                const { content, starterCode, ...rest } = l;
                return rest;
            }),
            items: undefined // Fetched on demand
        };
    });

    return { 
        ...course, 
        modules: lightModules,
        lessonsCount: totalLessons,
        articlesCount: totalArticles,
        quizzesCount: totalQuizzes,
        projectsCount: totalProjects,
        videosCount: totalVideos
    };
}

/**
 * Get the items (topics list) for a specific module by module ID.
 * This is called when a user expands a module accordion in the UI.
 */
async function getModuleItems(moduleId) {
    const col = await getProgCollection(PROG_COLLECTIONS.COURSES);
    const oid = new ObjectId(moduleId);
    const course = await col.findOne(
        { 'modules._id': oid },
        { projection: { 'modules.$': 1 } }
    );
    if (!course) return [];
    const mod = (course.modules || []).find(m => String(m._id) === String(oid));
    const items = mod?.items || [];
    const lessons = mod?.lessons || [];

    // If there's a single generic lesson item but multiple actual lessons, nest them
    const lessonEntriesInItems = items.filter(i => i.type === 'lesson');
    if (lessonEntriesInItems.length === 1 && lessons.length > 1) {
        return items.map(item => {
            if (item.type === 'lesson') {
                return {
                    ...item,
                    subItemsCount: lessons.length,
                    subItems: lessons.map(l => ({
                        type: 'lesson',
                        title: l.title,
                        _id: l._id
                    }))
                };
            }
            return item;
        });
    }

    return items;
}

// ─── Lesson helpers (from embedded modules) ───────────────────────────────────

/**
 * Get a single lesson by ID — also returns prev/next lesson metadata for navigation.
 * This avoids a second API call to fetch all module lessons.
 */
async function getLessonById(lessonId) {
    const oid = new ObjectId(lessonId);
    
    // 1. Try to fetch from the dedicated Lessons collection (rich content)
    const lessonsCol = await getProgCollection(PROG_COLLECTIONS.LESSONS);
    const richLesson = await lessonsCol.findOne({ _id: oid });

    const coursesCol = await getProgCollection(PROG_COLLECTIONS.COURSES);
    const course = await coursesCol.findOne(
        { 'modules.lessons._id': oid },
        { projection: { 'modules.lessons': 1, 'modules._id': 1 } }
    );
    if (!course) return richLesson || null;

    for (const mod of course.modules || []) {
        const sorted = (mod.lessons || []).sort((a, b) => (a.order || 0) - (b.order || 0));
        const idx = sorted.findIndex(l => String(l._id) === String(oid));
        if (idx === -1) continue;

        // Use rich content if available, otherwise fallback to embedded
        const baseLesson = richLesson || sorted[idx];
        
        // Return a plain JS object so navigation fields are properly JSON-serialized
        const pick = (l) => l ? { _id: l._id, title: l.title, order: l.order, type: l.type } : null;
        return {
            ...baseLesson,
            moduleId: mod._id,
            prevLesson: pick(sorted[idx - 1]),
            nextLesson: pick(sorted[idx + 1]),
            totalInModule: sorted.length,
            indexInModule: idx,          // 0-based, frontend adds 1 for display
        };
    }
    return richLesson || null;
}

/**
 * Get all lessons for a module ID — reads from embedded course.
 */
async function getLessonsByModuleId(moduleId) {
    const col = await getProgCollection(PROG_COLLECTIONS.COURSES);
    const oid = new ObjectId(moduleId);
    const course = await col.findOne(
        { 'modules._id': oid },
        { 
            projection: { 
                'modules.$': 1,
            } 
        }
    );
    if (!course) return [];
    const mod = (course.modules || []).find(m => String(m._id) === String(oid));
    
    // Filter out heavy fields here to avoid Path Collision in projection
    const lightLessons = (mod?.lessons || []).map(l => {
        const { content, starterCode, ...rest } = l;
        return rest;
    });

    return lightLessons.sort((a, b) => (a.order || 0) - (b.order || 0));
}

/**
 * Get the first lesson of a course by course slug.
 * Returns the first lesson of the first module.
 */
async function getFirstLessonByCourseSlug(slug) {
    const col = await getProgCollection(PROG_COLLECTIONS.COURSES);
    const course = await col.findOne({ slug });
    if (!course || !course.modules || course.modules.length === 0) return null;

    // Find the first module by order
    const firstModule = [...course.modules].sort((a, b) => (a.order || 0) - (b.order || 0))[0];
    if (!firstModule || !firstModule.lessons || firstModule.lessons.length === 0) return null;

// Find the first lesson by order in that module
    return [...firstModule.lessons].sort((a, b) => (a.order || 0) - (b.order || 0))[0];
}

// ─── Per-language Candidate Progress ─────────────────────────────────────────

async function getCandidateProgress(candidateId, courseSlug, options = {}) {
    // options: { summary: boolean, moduleId: string, lessonId: string }
    
    // 1. Fetch course to get the courseId matching the slug
    const course = await getCourseBySlug(courseSlug);
    if (!course) return null;

    // 2. Fetch from MySQL
    const [rows] = await pool.query(
        `SELECT * FROM ${DB_NAME}.candidate_course_points WHERE candidate_id = ? AND course_id = ?`,
        [candidateId, String(course._id)]
    );

    let mysqlProgress = rows.length > 0 ? rows[0] : null;

    // 3. Fetch from MongoDB for granular persistence
    const mongoCol = await getProgCollection(langCandidateCollection(courseSlug));
    const mongoCandidate = await mongoCol.findOne({ candidateId });

    if (!mysqlProgress && !mongoCandidate) return null;

    // Parse MySQL metadata
    let metadata = {};
    try {
        if (mysqlProgress?.metadata) {
            metadata = typeof mysqlProgress.metadata === 'string' ? JSON.parse(mysqlProgress.metadata) : mysqlProgress.metadata;
        }
    } catch (e) { console.error('Error parsing mysql metadata', e); }

    // Prepare response metadata
    let responseMetadata = {
        ...metadata,
        percentComplete: mysqlProgress?.overall_percentage || metadata.percentComplete || 0
    };

    // Filter Saved Code and Checkpoints if lessonId is provided
    if (options.lessonId) {
        const mongoSavedCode = mongoCandidate?.metadata?.savedCode || {};
        const mysqlSavedCode = metadata.savedCode || {};
        const combinedSavedCode = { ...mysqlSavedCode, ...mongoSavedCode };
        
        const mongoCheckpoints = mongoCandidate?.metadata?.checkpoints || {};
        const mysqlCheckpoints = metadata.checkpoints || {};
        const combinedCheckpoints = { ...mysqlCheckpoints, ...mongoCheckpoints };

        responseMetadata.savedCode = { [options.lessonId]: combinedSavedCode[options.lessonId] };
        responseMetadata.checkpoints = { [options.lessonId]: combinedCheckpoints[options.lessonId] };

        // PER USER REQUEST: Include the lesson title and parent module info for context
        let lessonTitle = "Unknown Lesson";
        let parentModuleId = null;
        let parentModuleTitle = "Unknown Module";

        for (const mod of course.modules || []) {
            const les = (mod.lessons || []).find(l => String(l._id) === String(options.lessonId));
            if (les) {
                lessonTitle = les.title;
                parentModuleId = mod._id;
                parentModuleTitle = mod.title;
                break;
            }
        }
        responseMetadata.lessonTitle = lessonTitle;
        responseMetadata.parentModuleId = parentModuleId;
        responseMetadata.parentModuleTitle = parentModuleTitle;
    } else if (options.summary) {
        // Exclude huge fields for summary
        responseMetadata.savedCode = {};
        responseMetadata.checkpoints = {};
    } else {
        // Return everything (backward compatibility / full load)
        const mongoSavedCode = mongoCandidate?.metadata?.savedCode || {};
        const mysqlSavedCode = metadata.savedCode || {};
        responseMetadata.savedCode = { ...mysqlSavedCode, ...mongoSavedCode };

        const mongoCheckpoints = mongoCandidate?.metadata?.checkpoints || {};
        const mysqlCheckpoints = metadata.checkpoints || {};
        responseMetadata.checkpoints = { ...mysqlCheckpoints, ...mongoCheckpoints };
    }

    // Filter Module Progress
    let moduleProgress = [];
    if (options.moduleId || options.summary || (!options.lessonId)) {
        try {
            if (mysqlProgress?.module_progress) {
                moduleProgress = typeof mysqlProgress.module_progress === 'string' ? JSON.parse(mysqlProgress.module_progress) : mysqlProgress.module_progress;
            } else if (metadata.module_progress) {
                moduleProgress = metadata.module_progress;
            }
        } catch (e) { console.error('Error parsing module_progress', e); }
    }

    if (options.moduleId) {
        // Find the module in the syllabus
        const syllabusModule = (course.modules || []).find(m => String(m._id) === String(options.moduleId));
        
        // Find the module in the progress record
        const progModule = moduleProgress.find(m => String(m.module_id) === String(options.moduleId));

        if (syllabusModule) {
            // Merge syllabus lessons with progress completion
            const lessons = (syllabusModule.lessons || []).map(sysLes => {
                const pLes = (progModule?.lessons || []).find(l => String(l.lesson_id) === String(sysLes._id));
                return {
                    lesson_id: sysLes._id,
                    lesson_title: sysLes.title,
                    completion_percentage: pLes?.completion_percentage || 0
                };
            });

            responseMetadata.module_progress = [{
                module_id: syllabusModule._id,
                module_title: syllabusModule.title,
                module_percentage: progModule?.module_percentage || 0,
                lessons: lessons
            }];
        } else {
            responseMetadata.module_progress = [];
        }
    } else if (options.summary) {
        // For summary, return module IDs and percentages but skip full lesson arrays if possible
        responseMetadata.module_progress = moduleProgress.map(m => ({
            module_id: m.module_id,
            module_title: m.module_title,
            module_percentage: m.module_percentage
            // Skip lessons array in summary to save space
        }));
    } else if (options.lessonId) {
        // PER USER REQUEST: If lessonId is provided, DO NOT return module_progress at all
        responseMetadata.module_progress = []; 
    } else {
        responseMetadata.module_progress = moduleProgress;
    }

    // Always include computed headers for UI logic (completed lesson IDs)
    // ONLY if not in strict lesson mode or summary mode (or keep them light)
    if (options.summary || !options.lessonId) {
        responseMetadata.computedCompletedLessons = moduleProgress.flatMap(m => 
            (m.lessons || []).filter(l => l.completion_percentage === 100).map(l => l.lesson_id)
        );
        responseMetadata.computedCompletedModules = moduleProgress.filter(m => m.module_percentage === 100).map(m => m.module_id);
    } else {
        responseMetadata.computedCompletedLessons = [];
        responseMetadata.computedCompletedModules = [];
    }

    return {
        candidateId,
        courseId: String(course._id),
        overall_percentage: mysqlProgress?.overall_percentage || responseMetadata.percentComplete || 0,
        points: mysqlProgress?.points || 0,
        metadata: responseMetadata
    };
}

async function startCourseForCandidate(candidateId, courseSlug, mongoCourseId) {
    const course = await getCourseBySlug(courseSlug);
    if (!course) throw new Error('Course not found');

    const courseIdStr = String(course._id);

    // Initial module_progress structure based on course
    const initialProgress = (course.modules || []).map(mod => ({
        module_id: String(mod._id),
        module_title: mod.title,
        module_percentage: 0,
        lessons: (mod.lessons || []).map(l => ({
            lesson_id: String(l._id),
            lesson_title: l.title,
            completion_percentage: 0
        }))
    }));

    const insertSql = `
        INSERT IGNORE INTO ${DB_NAME}.candidate_course_points 
        (candidate_id, course_id, module_progress, overall_percentage, points, metadata)
        VALUES (?, ?, ?, 0, 0, '{}')
    `;

    await pool.query(insertSql, [candidateId, courseIdStr, JSON.stringify(initialProgress)]);
    
    return await getCandidateProgress(candidateId, courseSlug);
}

async function updateCandidateProgress(candidateId, courseSlug, metadataUpdate = {}) {
    // 1. Fetch current progress
    const progress = await getCandidateProgress(candidateId, courseSlug);
    if (!progress) {
        // If not started, start it
        await startCourseForCandidate(candidateId, courseSlug);
    }
    
    // Fetch again to ensure we have the row
    const currentProgress = await getCandidateProgress(candidateId, courseSlug);
    if (!currentProgress) return { success: false, message: 'Could not find or create progress' };

    // Maintain existing metadata
    const existingMeta = { ...currentProgress.metadata };
    
    // Strip out the computed fields we injected during getCandidateProgress
    delete existingMeta.percentComplete;
    delete existingMeta.module_progress;
    delete existingMeta.computedCompletedLessons;
    delete existingMeta.computedCompletedModules;

    // Apply the dot-notation patch (simulate MongoDB $set)
    for (const [key, value] of Object.entries(metadataUpdate)) {
        const parts = key.split('.');
        let current = existingMeta;
        
        for (let i = 0; i < parts.length - 1; i++) {
            if (current[parts[i]] === undefined) current[parts[i]] = {};
            current = current[parts[i]];
        }
        current[parts[parts.length - 1]] = value;
    }

    // Update in MySQL
    const updateSql = `
        UPDATE ${DB_NAME}.candidate_course_points 
        SET metadata = ?
        WHERE candidate_id = ? AND course_id = ?
    `;

    await pool.query(updateSql, [
        JSON.stringify(existingMeta),
        candidateId,
        currentProgress.courseId
    ]);

    return { success: true };
}

async function markLessonComplete(candidateId, courseSlug, lessonId, pointsUpdate = null) {
    const course = await getCourseBySlug(courseSlug);
    if (!course) return null;

    const progress = await getCandidateProgress(candidateId, courseSlug);
    if (!progress) {
        await startCourseForCandidate(candidateId, courseSlug);
    }

    const currentProgress = await getCandidateProgress(candidateId, courseSlug);
    let modules = currentProgress.metadata.module_progress || [];

    const ITEM_WEIGHTS = {
        lesson: 1.5,
        quiz: 1.5,
        project: 2.0,
        article: 1.0,
        video: 1.0
    };

    const getModuleWeight = (modDb) => {
        return (modDb.lessonsCount || 0) * ITEM_WEIGHTS.lesson +
               (modDb.quizzesCount || 0) * ITEM_WEIGHTS.quiz +
               (modDb.projectsCount || 0) * ITEM_WEIGHTS.project +
               (modDb.articlesCount || 0) * ITEM_WEIGHTS.article +
               (modDb.videosCount || 0) * ITEM_WEIGHTS.video;
    };

    let totalCourseWeight = 0;
    course.modules.forEach(modDb => {
        totalCourseWeight += getModuleWeight(modDb);
    });

    // Update lesson status in JSON
    let found = false;
    modules.forEach(mod => {
        const lessonInfo = (mod.lessons || []).find(l => String(l.lesson_id) === String(lessonId));
        if (lessonInfo) {
            lessonInfo.completion_percentage = 100;
            found = true;
            
            const activeModDb = course.modules.find(m => String(m._id) === String(mod.module_id));
            if (activeModDb) {
                const moduleTotalWeight = getModuleWeight(activeModDb);
                const doneCount = mod.lessons.filter(l => l.completion_percentage === 100).length;
                const completedModuleWeight = doneCount * ITEM_WEIGHTS.lesson; // Currently only tracking lessons
                
                mod.module_percentage = moduleTotalWeight > 0 ? Math.round((completedModuleWeight / moduleTotalWeight) * 100) : 0;
            }
        }
    });

    if (!found) {
        console.warn(`Lesson ${lessonId} not found in course ${courseSlug} progress meta`);
    }

    // Recalculate overall percentage
    const allDoneLessons = modules.flatMap(m => m.lessons || []).filter(l => l.completion_percentage === 100).length;
    const totalCompletedWeight = allDoneLessons * ITEM_WEIGHTS.lesson;
    const overallPercentage = totalCourseWeight > 0 ? Math.round((totalCompletedWeight / totalCourseWeight) * 100) : 0;

    // Points update
    let pointsToAdd = 0;
    if (pointsUpdate) {
        pointsToAdd = Object.values(pointsUpdate).reduce((a, b) => a + b, 0);
    }

    // 3. Update MySQL
    const updateSql = `
        UPDATE ${DB_NAME}.candidate_course_points 
        SET module_progress = ?, overall_percentage = ?, points = points + ?
        WHERE candidate_id = ? AND course_id = ?
    `;

    await pool.query(updateSql, [
        JSON.stringify(modules),
        overallPercentage,
        pointsToAdd,
        candidateId,
        String(course._id)
    ]);

    // 4. Update MongoDB lang-specific collection for persistence
    const mongoCol = await getProgCollection(langCandidateCollection(courseSlug));
    await mongoCol.updateOne(
        { candidateId },
        { 
            $set: { 
                updatedAt: new Date(),
                'metadata.lastLessonId': lessonId,
                'metadata.percentComplete': overallPercentage,
                'metadata.module_progress': modules
            },
            $addToSet: { 'metadata.completedLessons': String(lessonId) }
        },
        { upsert: true }
    );

    return { success: true };
}

async function markModuleComplete(candidateId, courseSlug, moduleId, pointsUpdate = null) {
    const course = await getCourseBySlug(courseSlug);
    if (!course) return null;

    // Points update
    let pointsToAdd = 0;
    if (pointsUpdate) {
        pointsToAdd = Object.values(pointsUpdate).reduce((a, b) => a + b, 0);
    }

    if (pointsToAdd > 0) {
        const updateSql = `
            UPDATE ${DB_NAME}.candidate_course_points 
            SET points = points + ?
            WHERE candidate_id = ? AND course_id = ?
        `;
        await pool.query(updateSql, [pointsToAdd, candidateId, String(course._id)]);
    }

    return { success: true };
}

async function getCandidateSkills(candidateId, courseSlug) {
    const progress = await getCandidateProgress(candidateId, courseSlug);
    if (!progress) return { points: 0, metadata: {} };
    return {
        points: progress.points,
        metadata: progress.metadata
    };
}

async function getAllCandidatesForCourse(courseSlug) {
    const colName = langCandidateCollection(courseSlug);
    const col = await getProgCollection(colName);
    return col.find({}).sort({ lastLearningAt: -1 }).toArray();
}

module.exports = {
    getCourses,
    getCourseBySlug,
    getLessonById,
    getLessonsByModuleId,
    getModuleItems,
    getFirstLessonByCourseSlug,
    getCandidateProgress,
    startCourseForCandidate,
    updateCandidateProgress,
    markLessonComplete,
    markModuleComplete,
    getCandidateSkills,
    getAllCandidatesForCourse,
};
