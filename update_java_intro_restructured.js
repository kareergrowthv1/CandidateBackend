const { MongoClient } = require('mongodb');
const fs = require('fs');
require('dotenv').config({ path: '/Users/ifocus/Documents/Systemmindz/CandidateBackend/.env' });

const MONGODB_URI = process.env.MONGODB_URI;
const DB_NAME = 'KnowledgeBase';
const FILE_PATH = '/Users/ifocus/Documents/Systemmindz/CandidateBackend/java-intro_restructured.md';

async function updateIntro() {
    const client = new MongoClient(MONGODB_URI);
    try {
        await client.connect();
        const db = client.db(DB_NAME);
        const col = db.collection('java');

        const content = fs.readFileSync(FILE_PATH, 'utf8');

        const result = await col.updateOne(
            { title: 'Introduction to Java' },
            { $set: { content: content, order: 2 } }
        );

        if (result.matchedCount > 0) {
            console.log('Successfully updated Java content from java-intro_restructured.md');
        } else {
            console.log('Could not find Introduction to Java document');
        }

    } catch (err) {
        console.error('Update error:', err);
    } finally {
        await client.close();
    }
}

updateIntro();
