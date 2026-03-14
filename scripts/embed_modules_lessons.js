/**
 * Migration: Embed all modules + lessons directly into each Course document.
 * Then drop the separate Modules and Lessons collections.
 *
 * New Course document shape:
 * {
 *   _id, name, slug, description, ...stats,
 *   modules: [
 *     {
 *       _id, title, order, description, items[], ...counts,
 *       lessons: [
 *         { _id, order, type, title, duration, language, starterCode, content[] }
 *       ]
 *     }
 *   ]
 * }
 */
require('dotenv').config();
const { connect, getProgCollection, getProgDb, PROG_COLLECTIONS, close } = require('../src/config/mongo');

async function migrate() {
    try {
        await connect();
        const coursesCol = await getProgCollection(PROG_COLLECTIONS.COURSES);
        const modulesCol = await getProgCollection(PROG_COLLECTIONS.MODULES);
        const lessonsCol = await getProgCollection(PROG_COLLECTIONS.LESSONS);

        const courses = await coursesCol.find({}).toArray();
        console.log(`\n📦 Found ${courses.length} courses to migrate.\n`);

        for (const course of courses) {
            console.log(`  → Embedding course: ${course.name} (${course.slug})`);

            // Fetch all modules for this course, sorted by order
            const modules = await modulesCol
                .find({ courseId: course._id })
                .sort({ order: 1 })
                .toArray();

            console.log(`    Modules found: ${modules.length}`);

            // For each module, fetch its lessons
            const enrichedModules = [];
            for (const mod of modules) {
                const lessons = await lessonsCol
                    .find({ moduleId: mod._id })
                    .sort({ order: 1 })
                    .toArray();

                console.log(`    Module "${mod.title}" has ${lessons.length} lessons`);

                enrichedModules.push({
                    ...mod,
                    lessons, // embed all lessons directly
                });
            }

            // Update the course document with embedded modules+lessons
            await coursesCol.updateOne(
                { _id: course._id },
                { $set: { modules: enrichedModules, migratedAt: new Date() } }
            );

            console.log(`    ✅ Course "${course.name}" updated with ${enrichedModules.length} embedded modules.`);
        }

        // Drop separate collections
        const db = await getProgDb();
        const existing = await db.listCollections().toArray();
        const colNames = existing.map(c => c.name);

        if (colNames.includes('Modules')) {
            await db.collection('Modules').drop();
            console.log('\n🗑  Dropped: Modules');
        } else {
            console.log('\n⚠️  Modules collection not found (already dropped?)');
        }

        if (colNames.includes('Lessons')) {
            await db.collection('Lessons').drop();
            console.log('🗑  Dropped: Lessons');
        } else {
            console.log('⚠️  Lessons collection not found (already dropped?)');
        }

        console.log('\n✅ Migration complete. All data is now embedded in Courses.\n');
    } catch (err) {
        console.error('❌ Migration error:', err.message);
        process.exit(1);
    } finally {
        await close();
    }
}

migrate();
