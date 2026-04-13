/**
 * MongoDB connection for candidate interview responses (round 1–2), coding, and aptitude.
 * Collections: candidate_interview_responses, candidate_interview_coding_responses, candidate_interview_aptitude_responses.
 */
const { MongoClient } = require('mongodb');

const MONGODB_URI = process.env.MONGODB_URI || '';
const DB_NAME = process.env.MONGODB_DB_NAME || 'kareergrowth';
const KB_DB_NAME = 'KnowledgeBase'; // The new database specifically for knowledge base content
const PROG_DB_NAME = 'Programming'; // New database for programming courses

let client = null;
let db = null;
let kbDb = null;
let progDb = null;

const COLLECTIONS = {
  INTERVIEW_RESPONSES: 'candidate_interview_responses',
  CODING_RESPONSES: 'candidate_interview_coding_responses',
  APTITUDE_RESPONSES: 'candidate_interview_aptitude_responses',
  CODING_PRACTICE: 'Coding_Practice',
  CODING_RESPONSE: 'CodingResponse',
  AIMOCK_RESPONSES: 'aimock',
  RESUME_REPORTS: 'candidatesresumereport',
  RESUME_TEMPLATES: 'sql',
  NOTIFICATIONS: 'notifications',
  NOTIFICATION_DISMISSALS: 'notification_dismissals',
  FAKE_OFFER_RESPONSES: 'fakeoffer_responses',
};

const KB_COLLECTIONS = {
  TOPICS: 'Topics',
  CONTENTS: 'Contents'
};

const PROG_COLLECTIONS = {
  COURSES: 'Courses',
  MODULES: 'Modules',
  LESSONS: 'Lessons',
  USER_PROGRESS: 'UserProgress', // legacy / generic fallback
  // Per-language candidate progress collections (modules + lessons now embedded in Courses)
  JAVA_CANDIDATES: 'javaCandidates',
  HTML_CANDIDATES: 'htmlCandidates',
  CSS_CANDIDATES: 'cssCandidates',
  JAVASCRIPT_CANDIDATES: 'javascriptCandidates',
  PYTHON_CANDIDATES: 'pythonCandidates',
  SQL_CANDIDATES: 'sqlCandidates',
  DEVOPS_CANDIDATES: 'devopsCandidates',
};

/**
 * Return the per-language candidates collection name from a course slug.
 * e.g. 'java' -> 'javaCandidates', 'html-css' -> 'htmlCssCandidates'
 */
function langCandidateCollection(slug) {
  if (!slug) return 'Candidates_Unknown';
  // camelCase the slug: 'html-css' -> 'htmlCss'
  const camel = slug
    .toLowerCase()
    .replace(/-([a-z])/g, (_, c) => c.toUpperCase());
  return `${camel}Candidates`;
}


async function connect() {
  if (!MONGODB_URI) {
    throw new Error('MONGODB_URI is not set');
  }
  if (client) return client;
  client = new MongoClient(MONGODB_URI);
  await client.connect();
  db = client.db(DB_NAME);
  kbDb = client.db(KB_DB_NAME);
  progDb = client.db(PROG_DB_NAME);
  return client;
}

async function getDb() {
  if (!db) await connect();
  return db;
}

async function getKbDb() {
  if (!kbDb) await connect();
  return kbDb;
}

async function getProgDb() {
  if (!progDb) await connect();
  return progDb;
}

async function getCollection(name) {
  const database = await getDb();
  return database.collection(name);
}

async function getKbCollection(name) {
  const database = await getKbDb();
  return database.collection(name);
}

async function getProgCollection(name) {
  const database = await getProgDb();
  return database.collection(name);
}

function close() {
  if (client) {
    client.close().catch(() => { });
    client = null;
    db = null;
    kbDb = null;
    progDb = null;
  }
}

module.exports = {
  connect,
  getDb,
  getKbDb,
  getProgDb,
  getCollection,
  getKbCollection,
  getProgCollection,
  COLLECTIONS,
  KB_COLLECTIONS,
  PROG_COLLECTIONS,
  langCandidateCollection,
  DB_NAME,
  KB_DB_NAME,
  PROG_DB_NAME,
  close,
};
