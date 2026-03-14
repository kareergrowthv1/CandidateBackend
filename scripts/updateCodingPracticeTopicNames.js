/**
 * One-time script: set topicName and topicDescription on existing Coding_Practice documents
 * so the Practice UI shows full names (e.g. "AP 1" instead of "Ap 1").
 * Run from CandidateBackend: node scripts/updateCodingPracticeTopicNames.js
 */
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });
const { connect, getCollection, COLLECTIONS, close } = require('../src/config/mongo');

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

async function update() {
  try {
    await connect();
    const col = await getCollection(COLLECTIONS.CODING_PRACTICE);
    for (const [topicId, { topicName, topicDescription }] of Object.entries(TOPIC_DISPLAY)) {
      const result = await col.updateMany(
        { topicId },
        { $set: { topicName, topicDescription, updatedAt: new Date() } }
      );
      if (result.modifiedCount > 0) {
        console.log(`Updated ${result.modifiedCount} docs for topic "${topicId}" -> "${topicName}"`);
      }
    }
    console.log('Done. Topic names in MongoDB are set.');
  } catch (e) {
    console.error('Update failed:', e);
  } finally {
    await close();
  }
}

update();
