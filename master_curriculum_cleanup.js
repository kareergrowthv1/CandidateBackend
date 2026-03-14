const { MongoClient } = require('mongodb');
require('dotenv').config({ path: '/Users/ifocus/Documents/Systemmindz/CandidateBackend/.env' });

const MONGODB_URI = process.env.MONGODB_URI;
const DB_NAME = 'KnowledgeBase';

const OLD_TITLES = [
    'Introduction(History of java)',
    'Methods',
    'Variables',
    'Condition statements',
    'Loop statements',
    'Arrays',
    'String Functions',
    'Static',
    'non-static and JVM memory -first mock',
    'class and object',
    'programming'
];

async function cleanup() {
    const client = new MongoClient(MONGODB_URI);
    try {
        await client.connect();
        const db = client.db(DB_NAME);
        const col = db.collection('java');

        console.log('Cleaning up old curriculum titles to prevent duplicates...');
        const result = await col.deleteMany({ title: { $in: OLD_TITLES } });
        console.log(`Successfully deleted ${result.deletedCount} old documents.`);

    } catch (err) {
        console.error('Cleanup error:', err);
    } finally {
        await client.close();
    }
}

cleanup();
