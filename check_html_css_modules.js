const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });
const { MongoClient } = require('mongodb');

async function run() {
    const client = new MongoClient(process.env.MONGODB_URI || 'mongodb://localhost:27017');
    await client.connect();
    const db = client.db('Programming');
    const course = await db.collection('Courses').findOne({ slug: 'html-css' });

    if (!course) {
        console.log('❌ Course html-css NOT FOUND');
        await client.close();
        return;
    }

    console.log('✅ Course:', course.name, '| Modules:', course.modules.length);

    const m1 = course.modules.find(m => m.title === 'Introduction to HTML');
    const m2 = course.modules.find(m => m.title === 'Basic HTML Structure');

    if (m1) {
        console.log('\n--- M1: Introduction to HTML ---');
        console.log('Lessons:', m1.lessons.length, '| Items:', m1.items.length);
        console.log('Item[0]:', JSON.stringify(m1.items[0]));
        console.log('Lesson titles:', m1.lessons.map(l => l.title));
    }

    if (m2) {
        console.log('\n--- M2: Basic HTML Structure ---');
        console.log('Lessons:', m2.lessons.length, '| Items:', m2.items.length);
        console.log('Item[0]:', JSON.stringify(m2.items[0]));
        console.log('Lesson titles:', m2.lessons.map(l => l.title));
    }

    await client.close();
}

run().catch(e => console.error(e.message));
