const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });
const { connect, getCollection, COLLECTIONS, close } = require('../src/config/mongo');

const FRONTEND_DATA_PATH = path.join(__dirname, '../../KareerGrowth/CandidateFrontend/src/data/topics');

// Full display names and descriptions for each topic (stored in MongoDB as topicName, topicDescription)
const TOPIC_DISPLAY = {
    'warmup-1': { topicName: 'Warmup 1', topicDescription: 'Warmup 1 practice problems' },
    'warmup-2': { topicName: 'Warmup 2', topicDescription: 'Warmup 2 practice problems' },
    'string-1': { topicName: 'String 1', topicDescription: 'String 1 practice problems' },
    'string-2': { topicName: 'String 2', topicDescription: 'String 2 practice problems' },
    'string-3': { topicName: 'String 3', topicDescription: 'String 3 practice problems' },
    'array-1': { topicName: 'Array 1', topicDescription: 'Array 1 practice problems' },
    'array-2': { topicName: 'Array 2', topicDescription: 'Array 2 practice problems' },
    'array-3': { topicName: 'Array 3', topicDescription: 'Array 3 practice problems' },
    'logic-1': { topicName: 'Logic 1', topicDescription: 'Logic 1 practice problems' },
    'logic-2': { topicName: 'Logic 2', topicDescription: 'Logic 2 practice problems' },
    'ap-1': { topicName: 'Arithmetic 1', topicDescription: 'Arithmetic 1 practice problems' },
    'recursion-1': { topicName: 'Recursion 1', topicDescription: 'Recursion 1 practice problems' },
    'recursion-2': { topicName: 'Recursion 2', topicDescription: 'Recursion 2 practice problems' },
    'map-1': { topicName: 'Map 1', topicDescription: 'Map 1 practice problems' },
    'map-2': { topicName: 'Map 2', topicDescription: 'Map 2 practice problems' },
    'functional-1': { topicName: 'Functional 1', topicDescription: 'Functional 1 practice problems' },
    'functional-2': { topicName: 'Functional 2', topicDescription: 'Functional 2 practice problems' }
};

const topics = [
    { file: 'warmup1.js', id: 'warmup-1', variable: 'warmup1Questions' },
    { file: 'warmup2.js', id: 'warmup-2', variable: 'warmup2Questions' },
    { file: 'string1.js', id: 'string-1', variable: 'string1Questions' },
    { file: 'string2.js', id: 'string-2', variable: 'string2Questions' },
    { file: 'string3.js', id: 'string-3', variable: 'string3Questions' },
    { file: 'array1.js', id: 'array-1', variable: 'array1Questions' },
    { file: 'array2.js', id: 'array-2', variable: 'array2Questions' },
    { file: 'array3.js', id: 'array-3', variable: 'array3Questions' },
    { file: 'logic1.js', id: 'logic-1', variable: 'logic1Questions' },
    { file: 'logic2.js', id: 'logic-2', variable: 'logic2Questions' },
    { file: 'ap1.js', id: 'ap-1', variable: 'ap1Questions' },
    { file: 'recursion1.js', id: 'recursion-1', variable: 'recursion1Questions' },
    { file: 'recursion2.js', id: 'recursion-2', variable: 'recursion2Questions' },
    { file: 'map1.js', id: 'map-1', variable: 'map1Questions' },
    { file: 'map2.js', id: 'map-2', variable: 'map2Questions' },
    { file: 'functional1.js', id: 'functional-1', variable: 'functional1Questions' },
    { file: 'functional2.js', id: 'functional-2', variable: 'functional2Questions' }
];

async function migrate() {
    try {
        console.log('Starting migration of coding questions...');
        await connect();
        const collection = await getCollection(COLLECTIONS.CODING_PRACTICE);

        // Clear existing data to avoid duplicates if re-running
        await collection.deleteMany({});
        console.log('Cleared existing Coding_Practice collection.');

        let totalInserted = 0;

        for (const topic of topics) {
            const filePath = path.join(FRONTEND_DATA_PATH, topic.file);
            if (!fs.existsSync(filePath)) {
                console.warn(`File not found: ${filePath}`);
                continue;
            }

            const content = fs.readFileSync(filePath, 'utf8');

            // Simple extraction logic: find the array content between [ and ];
            // We'll use a more robust way by evaluating a small wrapper or just clean regex
            // Since it's a JS file with export const, we can try to clean it and eval it safely if we trust it,
            // but let's stick to string manipulation to extract the JSON-like part.

            const arrayStartIndex = content.indexOf('[');
            const arrayEndIndex = content.lastIndexOf(']');

            if (arrayStartIndex === -1 || arrayEndIndex === -1) {
                console.warn(`Could not find array in ${topic.file}`);
                continue;
            }

            let arrayContent = content.substring(arrayStartIndex, arrayEndIndex + 1);

            // The content is JS, not pure JSON. It might have backticks, comments, etc.
            // We can't use JSON.parse directly. 
            // A trick is to use 'new Function' to return the array if we are in Node.
            try {
                const questions = new Function(`return ${arrayContent}`)();
                const display = TOPIC_DISPLAY[topic.id] || { topicName: null, topicDescription: null };

                const documents = questions.map(q => ({
                    ...q,
                    topicId: topic.id,
                    topicName: display.topicName,
                    topicDescription: display.topicDescription,
                    createdAt: new Date(),
                    updatedAt: new Date()
                }));

                if (documents.length > 0) {
                    const result = await collection.insertMany(documents);
                    console.log(`Successfully inserted ${result.insertedCount} questions for topic: ${topic.id}`);
                    totalInserted += result.insertedCount;
                }
            } catch (e) {
                console.error(`Error parsing content from ${topic.file}:`, e.message);
            }
        }

        console.log(`Migration completed. Total questions inserted: ${totalInserted}`);
    } catch (error) {
        console.error('Migration failed:', error);
    } finally {
        await close();
    }
}

migrate();
