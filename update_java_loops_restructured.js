const { MongoClient } = require('mongodb');
const fs = require('fs');
require('dotenv').config({ path: '/Users/ifocus/Documents/Systemmindz/CandidateBackend/.env' });

const MONGODB_URI = process.env.MONGODB_URI;
const DB_NAME = 'KnowledgeBase';
const FILE_PATH = '/Users/ifocus/Documents/Systemmindz/CandidateBackend/java-loops_restructured.md';

async function updateLoops() {
    const client = new MongoClient(MONGODB_URI);
    try {
        await client.connect();
        const db = client.db(DB_NAME);
        const col = db.collection('java');

        const content = fs.readFileSync(FILE_PATH, 'utf8');

        const result = await col.updateOne(
            { title: '4. Loop statements' },
            {
                $set: {
                    content: content,
                    order: 6,
                    updatedAt: new Date()
                }
            },
            { upsert: true }
        );

        if (result.matchedCount > 0) {
            console.log('Successfully updated Loop Statements.');
        } else if (result.upsertedCount > 0) {
            console.log('Successfully created Loop Statements (Upserted).');
        }

    } catch (err) {
        console.error('Update error:', err);
    } finally {
        await client.close();
    }
}

updateLoops();
