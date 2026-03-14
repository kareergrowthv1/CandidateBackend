require('dotenv').config();
const { getProgCollection, PROG_COLLECTIONS, close } = require('./src/config/mongo');

async function listAllLessonIds() {
    try {
        const col = await getProgCollection(PROG_COLLECTIONS.COURSES);
        const courses = await col.find({ slug: 'java' }).toArray();
        const requestedId = '69b2da46f98f988579f9b89f';
        let foundRequested = false;
        
        console.log(`Found ${courses.length} courses.`);
        
        courses.forEach(course => {
            console.log(`\nCourse: ${course.name} (${course.slug})`);
            (course.modules || []).forEach(mod => {
                console.log(`  Module: ${mod.title}`);
                (mod.lessons || []).forEach(les => {
                    console.log(`    Lesson: [${les._id}] ${les.title}`);
                    if (String(les._id) === requestedId) foundRequested = true;
                });
            });
        });

        console.log(`\nRequested ID ${requestedId} found: ${foundRequested}`);
    } catch (err) {
        console.error('Error:', err.message);
    } finally {
        await close();
    }
}

listAllLessonIds();
