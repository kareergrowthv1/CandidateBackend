require('dotenv').config();
const { connect, getProgCollection, PROG_COLLECTIONS, close } = require('./src/config/mongo');

async function verify() {
    try {
        await connect();
        const col = await getProgCollection(PROG_COLLECTIONS.COURSES);
        const javaCourse = await col.findOne({ slug: 'java' });
        if (!javaCourse) throw new Error('Java course not found');

        const helloWorldMod = (javaCourse.modules || []).find(m => m.title === 'Hello World');
        if (!helloWorldMod) throw new Error('Hello World module not found');

        console.log('Module ID:', helloWorldMod._id);
        const lesson = (helloWorldMod.lessons || []).find(l => l.order === 3);
        
        if (lesson) {
            console.log('Lesson 3 Found:');
            console.log('ID:', lesson._id);
            console.log('Title:', lesson.title);
            console.log('Validation Criteria:', JSON.stringify(lesson.validationCriteria, null, 2));
            console.log('Checkpoint 1 content (nested hint check):', JSON.stringify(lesson.content.find(c => c.index === 1)?.content, null, 2));
            console.log('Checkpoint 2 content (nested hint check):', JSON.stringify(lesson.content.find(c => c.index === 2)?.content, null, 2));
        } else {
            console.log('Lesson 3 NOT found');
        }

    } catch (err) {
        console.error('Error:', err.message);
    } finally {
        await close();
    }
}

verify();
