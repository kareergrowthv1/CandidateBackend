
// Migration: Assign Pro plan to candidate sharanmneeli09@gmail.com
// Run: node migrations/migrate_pro_plan_sharanmneeli09.js

require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') });
const { pool } = require('../src/config/db');

async function migrateProPlan() {
  const email = 'sharanmneeli09@gmail.com';
  const planId = 'pro_plan_id'; // TODO: Replace with actual Pro plan ID
  const planName = 'Pro';
  const totalCredits = 1000; // TODO: Set as per Pro plan
  const permissions = JSON.stringify({ round1ReportLevel: 'full', aiResumeAnalysis: true });
  const now = new Date();
  const validFrom = now.toISOString().slice(0, 19).replace('T', ' ');
  const validTill = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000).toISOString().slice(0, 19).replace('T', ' ');

  try {
    // 1. Get candidate_id
    const [rows] = await pool.query(
      'SELECT candidate_id FROM candidates_db.college_candidates WHERE email = ?',
      [email]
    );
    if (!rows.length) throw new Error('Candidate not found');
    const candidateId = rows[0].candidate_id;

    // 2. Deactivate previous subscriptions
    await pool.query(
      'UPDATE candidates_db.candidate_subscriptions SET status = ? WHERE candidate_id = ? AND status = ?',[ 'INACTIVE', candidateId, 'ACTIVE']
    );

    // 3. Insert new Pro plan subscription with dummy UUID for id
    const dummyId = '11111111-2222-3333-4444-555555555555';
    await pool.query(
      `INSERT INTO candidates_db.candidate_subscriptions
        (id, candidate_id, plan_id, plan_name, valid_from, valid_till, total_credits, utilized_credits, permissions, status, created_at, updated_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, 0, ?, 'ACTIVE', NOW(), NOW())`,
      [dummyId, candidateId, planId, planName, validFrom, validTill, totalCredits, permissions]
    );

    console.log('Pro plan assigned to', email, 'from', validFrom, 'to', validTill);
    process.exit(0);
  } catch (err) {
    console.error('Migration failed:', err.message);
    process.exit(1);
  }
}

migrateProPlan();
