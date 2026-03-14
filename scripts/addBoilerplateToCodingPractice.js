/**
 * Adds boilerplateByLanguage (javascript, java, python) to every question in Coding_Practice.
 * Boilerplate is the same as used by run-code for Judge0: reads stdin, calls user's function, prints result.
 *
 * Run from CandidateBackend: node scripts/addBoilerplateToCodingPractice.js
 */
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });
const { connect, getCollection, COLLECTIONS, close } = require('../src/config/mongo');
const { getBoilerplateByLanguage } = require('../src/lib/boilerplate');

function getFunctionName(signature) {
  if (!signature || typeof signature !== 'string') return 'solution';
  const m = signature.trim().match(/\b(\w+)\s*\(/);
  return m ? m[1] : 'solution';
}

async function run() {
  try {
    await connect();
    const col = await getCollection(COLLECTIONS.CODING_PRACTICE);
    const docs = await col.find({}).toArray();
    let updated = 0;
    for (const doc of docs) {
      const functionName = getFunctionName(doc.functionSignature) || doc.name || 'solution';
      const functionSignature = doc.functionSignature || '';
      const { javascript, python, java } = getBoilerplateByLanguage(functionName, functionSignature);
      const boilerplateByLanguage = { javascript, python, java };
      await col.updateOne(
        { _id: doc._id },
        { $set: { boilerplateByLanguage, updatedAt: new Date() } }
      );
      updated++;
      console.log(`Updated ${doc.name || doc._id}: added boilerplateByLanguage (javascript, java, python)`);
    }
    console.log(`Done. ${updated} questions updated with boilerplate for all languages.`);
  } catch (e) {
    console.error(e);
    process.exit(1);
  } finally {
    await close();
  }
}

run();
