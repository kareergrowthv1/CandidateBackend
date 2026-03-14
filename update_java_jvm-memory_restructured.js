const { MongoClient } = require('mongodb');
const fs = require('fs');
require('dotenv').config({ path: '/Users/ifocus/Documents/Systemmindz/CandidateBackend/.env' });

const MONGODB_URI = process.env.MONGODB_URI;
const DB_NAME = 'KnowledgeBase';
const FILE_PATH = '/Users/ifocus/Documents/Systemmindz/CandidateBackend/java-jvm-memory_restructured.md';

async function updateJVMMemory() {
    const client = new MongoClient(MONGODB_URI);
    try {
        await client.connect();
        const db = client.db(DB_NAME);
        const col = db.collection('java');

        const content = fs.readFileSync(FILE_PATH, 'utf8');

        const result = await col.updateOne(
            { title: '8. non-static and JVM memory -first mock' },
            {
                $set: {
                    content: content,
                    order: 10,
                    updatedAt: new Date()
                }
            },
            { upsert: true }
        );

        if (result.matchedCount > 0) {
            console.log('Successfully updated JVM Memory.');
        } else if (result.upsertedCount > 0) {
            console.log('Successfully created JVM Memory (Upserted).');
        }

    } catch (err) {
        console.error('Update error:', err);
    } finally {
        await client.close();
    }
}

updateJVMMemory();
