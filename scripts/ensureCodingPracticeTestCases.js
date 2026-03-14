/**
 * Ensures every question in Coding_Practice has exactly 10 test cases in MongoDB.
 *
 * Test case format in MongoDB (field: examples):
 *   examples: [
 *     { input: string, output: string },
 *     ...
 *   ]
 * - input:  stdin / input passed to the program (e.g. function call or raw input).
 * - output: expected stdout output (string; compared with actual output when Run is clicked).
 *
 * If a question has fewer than 10 examples, they are padded by repeating existing ones.
 * If a question has more than 10, it is trimmed to 10.
 *
 * Run from CandidateBackend: node scripts/ensureCodingPracticeTestCases.js
 */
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });
const { connect, getCollection, COLLECTIONS, close } = require('../src/config/mongo');

const TARGET_COUNT = 10;

function ensureTen(items) {
  if (!Array.isArray(items)) return [];
  const list = items.filter((x) => x != null && (typeof x === 'object'));
  if (list.length === 0) {
    return Array.from({ length: TARGET_COUNT }, (_, i) => ({ input: '', output: '' }));
  }
  if (list.length >= TARGET_COUNT) {
    return list.slice(0, TARGET_COUNT).map((x) => ({
      input: x.input != null ? String(x.input) : '',
      output: x.output != null ? String(x.output) : '',
    }));
  }
  const result = list.map((x) => ({
    input: x.input != null ? String(x.input) : '',
    output: x.output != null ? String(x.output) : '',
  }));
  while (result.length < TARGET_COUNT) {
    result.push(result[result.length % list.length]);
  }
  return result;
}

async function run() {
  try {
    await connect();
    const col = await getCollection(COLLECTIONS.CODING_PRACTICE);
    const docs = await col.find({}).toArray();
    let updated = 0;
    for (const doc of docs) {
      const examples = ensureTen(doc.examples);
      const current = Array.isArray(doc.examples) ? doc.examples.length : 0;
      if (current !== examples.length || JSON.stringify(doc.examples) !== JSON.stringify(examples)) {
        await col.updateOne(
          { _id: doc._id },
          { $set: { examples, updatedAt: new Date() } }
        );
        updated++;
        console.log(`Updated ${doc.name || doc._id}: examples ${current} -> ${examples.length}`);
      }
    }
    console.log(`Done. ${updated} questions updated to have ${TARGET_COUNT} test cases each.`);
  } catch (e) {
    console.error(e);
    process.exit(1);
  } finally {
    await close();
  }
}

run();
