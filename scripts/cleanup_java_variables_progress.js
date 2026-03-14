const { pool, DB_NAME } = require('../src/config/db');
const { getProgCollection, langCandidateCollection } = require('../src/config/mongo');
require('dotenv').config();

async function cleanupProgress() {
    try {
        const candidateId = '339e57de-5bd1-4dc7-9f6f-2940c43a184f';
        const courseSlug = 'java';
        const courseId = '69b3d8039b2a0a6ff33d121b';
        const variablesModuleId = '69b3d8039b2a0a6ff33d1223';
        const targetLessonId = '69b418ee484bc3c7a591889c';
        const DB_NAME = process.env.CANDIDATE_DB_NAME || 'candidates_db';

        console.log(`Cleaning up progress for candidate ${candidateId} in Variables module...`);

        // Ensure DB is selected
        await pool.query(`USE ${DB_NAME}`);

        // 1. Update MySQL
        const [rows] = await pool.query(
            `SELECT * FROM candidate_course_points WHERE candidate_id = ? AND course_id = ?`,
            [candidateId, courseId]
        );

        if (rows.length > 0) {
            let record = rows[0];
            let moduleProgress = typeof record.module_progress === 'string' ? JSON.parse(record.module_progress) : record.module_progress;
            let metadata = typeof record.metadata === 'string' ? JSON.parse(record.metadata) : record.metadata;

            // Find and reset Variables module
            moduleProgress = moduleProgress.map(m => {
                if (String(m.module_id) === variablesModuleId) {
                    console.log(`Resetting module_progress for: ${m.module_title}`);
                    return { ...m, module_percentage: 0, lessons: [] };
                }
                return m;
            });

            // Remove Variables lesson IDs from completedLessons
            // (Looking at the user's log, Introduction to Variables ID is 69b418ee484bc3c7a591889c)
            const targetLessonId = '69b418ee484bc3c7a591889c';
            if (metadata.completedLessons) {
                metadata.completedLessons = metadata.completedLessons.filter(id => id !== targetLessonId);
            }

            await pool.query(
                `UPDATE ${DB_NAME}.candidate_course_points SET module_progress = ?, metadata = ? WHERE candidate_id = ? AND course_id = ?`,
                [JSON.stringify(moduleProgress), JSON.stringify(metadata), candidateId, String(record.course_id)]
            );
            console.log('MySQL progress updated.');
        }

        // 2. Update MongoDB
        const mongoCol = await getProgCollection(langCandidateCollection(courseSlug));
        const mongoCandidate = await mongoCol.findOne({ candidateId });

        if (mongoCandidate) {
            console.log('Cleaning MongoDB granular data...');
            await mongoCol.updateOne(
                { candidateId },
                {
                    $unset: {
                        [`metadata.savedCode.69b418ee484bc3c7a591889c`]: "",
                        [`metadata.checkpoints.69b418ee484bc3c7a591889c`]: ""
                    },
                    $pull: {
                        "metadata.completedLessons": "69b418ee484bc3c7a591889c"
                    }
                }
            );
            console.log('MongoDB progress cleaned.');
        }

        console.log('Cleanup complete.');
    } catch (err) {
        console.error('Cleanup failed:', err);
    } finally {
        process.exit();
    }
}

cleanupProgress();
