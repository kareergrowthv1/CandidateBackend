const { MongoClient } = require('mongodb');
require('dotenv').config({ path: '/Users/ifocus/Documents/Systemmindz/CandidateBackend/.env' });

const MONGODB_URI = process.env.MONGODB_URI;
const DB_NAME = 'KnowledgeBase';

async function verify() {
    const client = new MongoClient(MONGODB_URI);
    try {
        await client.connect();
        const db = client.db(DB_NAME);
        const col = db.collection('java');
        const prog = await col.findOne({ title: { $regex: /programming/i } });
        if (prog && prog.subtopics) {
            console.log(`Verified: Found "Programming" with ${prog.subtopics.length} subtopics.`);
            prog.subtopics.forEach(s => console.log(`- ${s.title}`));
        } else {
            console.log('Verification failed: Programming document or subtopics not found.');
        }
    } catch (err) {
        console.error(err);
    } finally {
        await client.close();
    }
}

verify();
