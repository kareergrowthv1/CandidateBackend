const { MongoClient } = require('mongodb');
require('dotenv').config({ path: '/Users/ifocus/Documents/Systemmindz/CandidateBackend/.env' });

const MONGODB_URI = process.env.MONGODB_URI;
const DB_NAME = 'KnowledgeBase';

async function getRoadmap() {
    const client = new MongoClient(MONGODB_URI);
    try {
        await client.connect();
        const db = client.db(DB_NAME);
        const col = db.collection('java');
        const roadmap = await col.findOne({ title: 'Road Map' });
        console.log('--- Road Map Content ---');
        console.log(roadmap ? roadmap.content : 'No Road Map content found.');
    } catch (err) {
        console.error(err);
    } finally {
        await client.close();
    }
}

getRoadmap();
