const { pool, DB_NAME } = require('/Users/ifocus/Documents/Systemmindz/CandidateBackend/src/config/db');
const { getProgCollection, PROG_COLLECTIONS, langCandidateCollection } = require('/Users/ifocus/Documents/Systemmindz/CandidateBackend/src/config/mongo');
const { ObjectId } = require('mongodb');
const dotenv = require('dotenv');
dotenv.config({ path: '/Users/ifocus/Documents/Systemmindz/CandidateBackend/.env' });

async function migrate() {
    try {
        const coursesCol = await getProgCollection(PROG_COLLECTIONS.COURSES);
        const courses = await coursesCol.find({}).toArray();

        for (const course of courses) {
            const slug = course.slug;
            const courseId = course._id;
            console.log(`Processing course: ${slug} (${courseId})...`);

            const colName = langCandidateCollection(slug);
            const progressCol = await getProgCollection(colName);
            const allProgress = await progressCol.find({}).toArray();

            for (const prog of allProgress) {
                const candidateId = prog.candidateId;
                const completedLessonIds = (prog.metadata?.completedLessons || []).map(id => String(id));
                const xp = prog.skills || {};
                
                // Total points logic (sum of all skills)
                const totalPoints = Object.values(xp).reduce((a, b) => a + b, 0);

                // Build module_progress JSON structure
                const moduleProgress = (course.modules || []).map(mod => {
                    const modLessons = (mod.lessons || []).map(l => {
                        const isDone = completedLessonIds.includes(String(l._id));
                        return {
                            lesson_id: String(l._id),
                            lesson_title: l.title,
                            completion_percentage: isDone ? 100 : 0
                        };
                    });

                    const completedCount = modLessons.filter(l => l.completion_percentage === 100).length;
                    const modPercentage = modLessons.length > 0 ? Math.round((completedCount / modLessons.length) * 100) : 0;

                    return {
                        module_id: String(mod._id),
                        module_title: mod.title,
                        module_percentage: modPercentage,
                        lessons: modLessons
                    };
                });

                const overallPercentage = prog.metadata?.percentComplete || 0;

                // Insert/Upsert into MySQL
                const insertSql = `
                    INSERT INTO ${DB_NAME}.candidate_course_points 
                    (candidate_id, course_id, overall_percentage, points, module_progress)
                    VALUES (?, ?, ?, ?, ?)
                    ON DUPLICATE KEY UPDATE 
                    overall_percentage = VALUES(overall_percentage),
                    points = VALUES(points),
                    module_progress = VALUES(module_progress)
                `;

                await pool.query(insertSql, [
                    candidateId,
                    String(courseId),
                    overallPercentage,
                    totalPoints,
                    JSON.stringify(moduleProgress)
                ]);
            }
            console.log(`Finished migrating ${allProgress.length} records for ${slug}.`);
        }
        console.log('Migration complete.');
    } catch (err) {
        console.error('Migration error:', err);
    } finally {
        process.exit();
    }
}

migrate();
