/**
 * MongoDB initialization — runs once on server startup.
 * Explicitly creates all required collections and indexes.
 *
 * Collections (in DB: kareergrowth):
 *   candidate_interview_responses          — Round 1 & 2 Q&A recordings
 *   candidate_interview_coding_responses   — Round 3 Coding (questions + submissions)
 *   candidate_interview_aptitude_responses — Round 4 Aptitude answers
 */
const { connect, getDb, COLLECTIONS } = require('../config/mongo');

/**
 * Create a collection if it doesn't already exist.
 * MongoDB auto-creates on first insert but we create explicitly so it's
 * visible in Compass / Atlas before any data arrives.
 */
async function ensureCollection(db, name) {
  const existing = await db.listCollections({ name }).toArray();
  if (existing.length === 0) {
    await db.createCollection(name);
    console.log(`[MongoDB] 📦 Created collection: ${name}`);
  }
}

async function ensureCollectionIndexes() {
  const db = await getDb();

  // ── Explicitly create all 3 collections ─────────────────────────────────
  await ensureCollection(db, COLLECTIONS.INTERVIEW_RESPONSES);
  await ensureCollection(db, COLLECTIONS.CODING_RESPONSES);
  await ensureCollection(db, COLLECTIONS.APTITUDE_RESPONSES);
  await ensureCollection(db, COLLECTIONS.AIMOCK_RESPONSES);
  await ensureCollection(db, COLLECTIONS.RESUME_TEMPLATES);

  // ── Round 1 & 2: interview responses ─────────────────────────────────────
  const interviews = db.collection(COLLECTIONS.INTERVIEW_RESPONSES);
  await interviews.createIndex(
    { candidateId: 1, positionId: 1 },
    { name: 'idx_cand_pos', background: true }
  );
  await interviews.createIndex({ createdAt: 1 }, { name: 'idx_created', background: true });

  // ── Round 3: coding responses ─────────────────────────────────────────────
  const coding = db.collection(COLLECTIONS.CODING_RESPONSES);
  // Unique per candidate+position so upsert always finds the same document
  await coding.createIndex(
    { candidateId: 1, positionId: 1 },
    { unique: true, name: 'idx_cand_pos_uniq', background: true }
  );
  await coding.createIndex({ createdAt: 1 }, { name: 'idx_created', background: true });
  await coding.createIndex({ isScreeningCompleted: 1 }, { name: 'idx_completed', background: true });

  // ── Round 4: aptitude responses ───────────────────────────────────────────
  const aptitude = db.collection(COLLECTIONS.APTITUDE_RESPONSES);
  await aptitude.createIndex(
    { candidateId: 1, positionId: 1 },
    { unique: true, name: 'idx_cand_pos_uniq', background: true }
  );
  await aptitude.createIndex({ createdAt: 1 }, { name: 'idx_created', background: true });

  // ── AI Mock Sessions (History) ────────────────────────────────────────────
  const aimock = db.collection(COLLECTIONS.AIMOCK_RESPONSES);
  await aimock.createIndex({ candidateId: 1 }, { name: 'idx_candidate', background: true });
  await aimock.createIndex({ completedAt: -1, savedAt: -1 }, { name: 'idx_date', background: true });

  // Resume templates (sql collection in kareergrowth)
  const resumeTemplates = db.collection(COLLECTIONS.RESUME_TEMPLATES);
  await resumeTemplates.createIndex({ key: 1 }, { unique: true, name: 'idx_template_key_uniq', background: true });
  await resumeTemplates.createIndex({ createdAt: -1 }, { name: 'idx_created', background: true });

  console.log('[MongoDB] ✅ All collections and indexes ready');
}

async function initMongo() {
  if (!process.env.MONGODB_URI) {
    console.warn('[MongoDB] ⚠️  MONGODB_URI not set — skipping MongoDB initialization');
    return;
  }
  try {
    await connect();
    await ensureCollectionIndexes();
    console.log('[MongoDB] ✅ Connected and initialized (DB:', process.env.MONGODB_DB_NAME || 'kareergrowth', ')');
  } catch (err) {
    // Non-fatal: log and continue — app still works for non-coding routes
    console.error('[MongoDB] ❌ Initialization error:', err.message);
  }
}

module.exports = { initMongo };

