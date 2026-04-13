const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });
const { MongoClient, ObjectId } = require('mongodb');

async function testApi() {
    const client = new MongoClient(process.env.MONGODB_URI);
    try {
        await client.connect();
        const db = client.db('Programming');
        const course = await db.collection('Courses').findOne({ slug: 'html-css' });
        
        if (!course || !course.modules || course.modules.length === 0) {
            console.log('Course not found');
            return;
        }

        const m1 = course.modules[0];
        console.log('Testing Module 1 ID:', m1._id);

        // Simulate getModuleItems logic
        const oid = m1._id;
        const resultCourse = await db.collection('Courses').findOne(
            { 'modules._id': oid },
            { projection: { 'modules.$': 1 } }
        );

        if (!resultCourse) {
            console.log('Module NOT FOUND in query');
        } else {
            const mod = resultCourse.modules[0];
            console.log('Module found:', mod.title);
            console.log('Items:', JSON.stringify(mod.items, null, 2));
        }
    } finally {
        await client.close();
    }
}

testApi().catch(console.error);
