require('dotenv').config();
const { connect, getProgCollection, PROG_COLLECTIONS, close } = require('./src/config/mongo');

async function check() {
    try {
        await connect();
        const coursesCol = await getProgCollection(PROG_COLLECTIONS.COURSES);
        const modulesCol = await getProgCollection(PROG_COLLECTIONS.MODULES);

        const courseCount = await coursesCol.countDocuments();
        const moduleCount = await modulesCol.countDocuments();

        console.log(`Courses count: ${courseCount}`);
        console.log(`Modules count: ${moduleCount}`);

        const allCourses = await coursesCol.find({}).toArray();
        console.log('Courses in DB:', allCourses.map(c => c.name));

    } catch (error) {
        console.error('Check failed:', error);
    } finally {
        await close();
    }
}

check();
