const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });
const { MongoClient } = require('mongodb');

async function run() {
    const client = new MongoClient(process.env.MONGODB_URI);
    try {
        await client.connect();
        console.log('Connected to Atlas');
        
        const db = client.db('Programming');
        const course = await db.collection('Courses').findOne({ slug: 'html-css' });
        
        if (!course) {
            console.log('❌ Course html-css NOT FOUND on Atlas');
        } else {
            console.log('✅ Course found on Atlas:', course.name);
            console.log('Total modules:', course.modules?.length);
            
            if (course.modules?.length > 0) {
                const m1 = course.modules[0];
                console.log('Module 1:', m1.title);
                console.log('  Items count:', m1.items?.length);
                console.log('  Lessons count:', m1.lessons?.length);
                if (m1.items?.length > 0) {
                    console.log('  Sample Item:', JSON.stringify(m1.items[0]));
                }
            }
        }
        
        const kbDb = client.db('KnowledgeBase');
        const topicsCount = await kbDb.collection('Topics').countDocuments();
        console.log('KB Topics count:', topicsCount);
        
    } finally {
        await client.close();
    }
}

run().catch(console.error);
