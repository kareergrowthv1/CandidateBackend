const { MongoClient } = require('mongodb');
const fs = require('fs');
require('dotenv').config({ path: '/Users/ifocus/Documents/Systemmindz/CandidateBackend/.env' });

const MONGODB_URI = process.env.MONGODB_URI;
const DB_NAME = 'KnowledgeBase';

const curriculum = [
    { title: 'Road Map', order: 1, file: null },
    { title: 'Introduction to Java', order: 2, file: 'java-intro_restructured.md' },
    { title: 'Variables', order: 3, file: 'java-variables_restructured.md' },
    { title: 'Operators', order: 4, file: 'java-operators_restructured.md' },
    { title: '3. Condition statements', order: 5, file: 'java-conditionals_restructured.md' },
    { title: '4. Loop statements', order: 6, file: 'java-loops_restructured.md' },
    { title: '5. Arrays', order: 7, file: 'java-arrays_restructured.md' },
    { title: '2. Methods', order: 8, file: 'java-methods_restructured.md' },
    { title: '9. class and object', order: 9, file: 'java-class-object_restructured.md' },
    { title: '7. Static', order: 10, file: 'java-static_restructured.md' },
    { title: '8. non-static and JVM memory -first mock', order: 11, file: 'java-jvm-memory_restructured.md' },
    { title: '6. String Functions', order: 12, file: 'java-strings_restructured.md' },
    { title: '10. programming', order: 13, file: 'java-programming_restructured.md' }
];

async function syncCurriculum() {
    const client = new MongoClient(MONGODB_URI);
    try {
        await client.connect();
        const db = client.db(DB_NAME);
        const col = db.collection('java');

        // 1. Shift existing items with order >= 4 up to make room if they aren't in our explicit list
        // However, it's safer to just set everyone's order.

        for (const item of curriculum) {
            let updateData = { order: item.order, updatedAt: new Date() };

            if (item.file) {
                const filePath = `/Users/ifocus/Documents/Systemmindz/CandidateBackend/${item.file}`;
                if (fs.existsSync(filePath)) {
                    updateData.content = fs.readFileSync(filePath, 'utf8');
                }
            }

            const result = await col.updateOne(
                { title: item.title },
                { $set: updateData },
                { upsert: true }
            );
            console.log(`Synced: ${item.title} (Order: ${item.order})`);
        }

        // 2. Shift the remaining items (11. Blocks onwards) to start from order 14
        // Original order for "11. Blocks" was 13.
        // We have 13 items in our explicit list.
        // So anything with current order >= 13 (that isn't in our list) should be order current+1?
        // Let's just update them explicitly by title pattern or current order.

        const remaining = await col.find({
            title: { $not: { $in: curriculum.map(i => i.title) } },
            order: { $gte: 1 }
        }).toArray();

        for (const rem of remaining) {
            // If it's the old intro or variables that might still be there under different titles
            if (rem.title.includes('Variables') && rem.order !== 3) continue;

            // Shift remaining down if they were after the original programming (order 12)
            if (rem.order >= 12) {
                await col.updateOne(
                    { _id: rem._id },
                    { $set: { order: rem.order + 1 } }
                );
            }
        }

        console.log('Massive curriculum sync complete.');

    } catch (err) {
        console.error('Sync error:', err);
    } finally {
        await client.close();
    }
}

syncCurriculum();
