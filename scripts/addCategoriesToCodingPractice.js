const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });
const { connect, getCollection, COLLECTIONS, close } = require('../src/config/mongo');

const TOPIC_TO_CATEGORY = {
    'warmup-1': 'Warmup',
    'warmup-2': 'Warmup',
    'string-1': 'String',
    'string-2': 'String',
    'string-3': 'String',
    'array-1': 'Array',
    'array-2': 'Array',
    'array-3': 'Array',
    'logic-1': 'Logic',
    'logic-2': 'Logic',
    'ap-1': 'Numbers',
    'recursion-1': 'Recursion',
    'recursion-2': 'Recursion',
    'map-1': 'Collection',
    'map-2': 'Collection',
    'functional-1': 'Collection',
    'functional-2': 'Collection'
};

const CATEGORY_DESCRIPTIONS = {
    'Warmup': 'Simple warmup problems to get started with basic syntax and logic.',
    'String': 'Master string manipulation, parsing, and formatting challenges.',
    'Array': 'Learn to handle lists, grids, and complex array transformations.',
    'Logic': 'Practice Boolean logic, conditional statements, and comparison operators.',
    'Recursion': 'Understand recursive thinking and solve problems using self-referential functions.',
    'Collection': 'Work with Maps, Sets, and functional programming patterns.',
    'Numbers': 'Solve mathematical and arithmetic-focused coding challenges.'
};

async function update() {
    try {
        await connect();
        const col = await getCollection(COLLECTIONS.CODING_PRACTICE);

        console.log('Starting category enrichment...');

        for (const [topicId, category] of Object.entries(TOPIC_TO_CATEGORY)) {
            const result = await col.updateMany(
                { topicId },
                {
                    $set: {
                        category,
                        categoryDescription: CATEGORY_DESCRIPTIONS[category] || `${category} focus`,
                        updatedAt: new Date()
                    }
                }
            );
            if (result.modifiedCount > 0) {
                console.log(`Updated ${result.modifiedCount} docs for topic "${topicId}" -> Category: ${category}`);
            } else {
                console.log(`No documents updated for topic "${topicId}" (already set or topic not found)`);
            }
        }

        console.log('Category enrichment completed.');
    } catch (e) {
        console.error('Update failed:', e);
    } finally {
        await close();
    }
}

update();
