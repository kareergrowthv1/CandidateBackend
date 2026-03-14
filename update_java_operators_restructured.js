const { MongoClient } = require('mongodb');
const fs = require('fs');
require('dotenv').config({ path: '/Users/ifocus/Documents/Systemmindz/CandidateBackend/.env' });

const MONGODB_URI = process.env.MONGODB_URI;
const DB_NAME = 'KnowledgeBase';
const FILE_PATH = '/Users/ifocus/Documents/Systemmindz/CandidateBackend/java-operators_restructured.md';

async function updateOperators() {
    const client = new MongoClient(MONGODB_URI);
    try {
        await client.connect();
        const db = client.db(DB_NAME);
        const col = db.collection('java');

        if (!fs.existsSync(FILE_PATH)) {
            console.error('File not found:', FILE_PATH);
            return;
        }

        const content = fs.readFileSync(FILE_PATH, 'utf8');

        // We use the title expected by sync_mastery_order.js or standard name
        const result = await col.updateOne(
            { title: 'Operators' },
            {
                $set: {
                    content: content,
                    order: 4,
                    updatedAt: new Date()
                }
            },
            { upsert: true }
        );

        console.log('Successfully updated Java Operators content.');

    } catch (err) {
        console.error('Update error:', err);
    } finally {
        await client.close();
    }
}

updateOperators();
