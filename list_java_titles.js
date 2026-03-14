const { MongoClient } = require('mongodb');
require('dotenv').config({ path: '/Users/ifocus/Documents/Systemmindz/CandidateBackend/.env' });

const MONGODB_URI = process.env.MONGODB_URI;
const DB_NAME = 'KnowledgeBase';

async function listTitles() {
    const client = new MongoClient(MONGODB_URI);
    try {
        await client.connect();
        const db = client.db(DB_NAME);
        const col = db.collection('java');
        const docs = await col.find({}, { projection: { title: 1, order: 1 } }).sort({ order: 1 }).toArray();
        console.log('Documents in "java" collection:');
        docs.forEach(d => console.log(`- [${d.order}] ${d.title}`));
    } catch (err) {
        console.error(err);
    } finally {
        await client.close();
    }
}

listTitles();
