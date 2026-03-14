const { MongoClient } = require('mongodb');
const fs = require('fs');
require('dotenv').config({ path: '/Users/ifocus/Documents/Systemmindz/CandidateBackend/.env' });

const MONGODB_URI = process.env.MONGODB_URI;
const DB_NAME = 'KnowledgeBase';
const FILE_PATH = '/Users/ifocus/Documents/Systemmindz/CandidateBackend/java-methods_restructured.md';

async function updateMethods() {
    const client = new MongoClient(MONGODB_URI);
    try {
        await client.connect();
        const db = client.db(DB_NAME);
        const col = db.collection('java');

        const content = fs.readFileSync(FILE_PATH, 'utf8');

        // Use upsert: true in case the document doesn't exist
        const result = await col.updateOne(
            { title: '2. Methods' },
            {
                $set: {
                    content: content,
                    order: 4,
                    updatedAt: new Date()
                }
            },
            { upsert: true }
        );

        if (result.matchedCount > 0) {
            console.log('Successfully updated Java Methods content.');
        } else if (result.upsertedCount > 0) {
            console.log('Successfully created Java Methods content (Upserted).');
        } else {
            console.log('No changes were made.');
        }

    } catch (err) {
        console.error('Update error:', err);
    } finally {
        await client.close();
    }
}

updateMethods();
