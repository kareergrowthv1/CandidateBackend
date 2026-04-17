// Auto-create required MySQL tables if they do not exist
const { pool, DB_NAME } = require('../config/db');

async function ensureTable(tableName, createSql) {
  const [rows] = await pool.query(
    `SELECT COUNT(*) as count FROM information_schema.tables WHERE table_schema = ? AND table_name = ?`,
    [DB_NAME, tableName]
  );
  if (rows[0].count === 0) {
    await pool.query(createSql);
    console.log(`[MySQL] Created table: ${tableName}`);
  }
}

async function initMysql() {
  // candidate_subscriptions table
  await ensureTable('candidate_subscriptions', `
    CREATE TABLE candidate_subscriptions (
      id CHAR(36) PRIMARY KEY,
      candidate_id VARCHAR(36) NOT NULL,
      plan_id VARCHAR(50) NOT NULL,
      plan_name VARCHAR(100) NOT NULL,
      valid_from DATETIME DEFAULT NULL,
      valid_till DATETIME DEFAULT NULL,
      total_credits INT NOT NULL DEFAULT 0,
      utilized_credits INT NOT NULL DEFAULT 0,
      permissions JSON DEFAULT NULL,
      status VARCHAR(20) DEFAULT 'ACTIVE',
      created_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      KEY idx_candidate_id (candidate_id),
      KEY idx_status (status)
    )
  `);

  // candidate_coding_stats table (for coding analytics)
  await ensureTable('candidate_coding_stats', `
    CREATE TABLE candidate_coding_stats (
      id CHAR(36) PRIMARY KEY,
      candidateId VARCHAR(36) NOT NULL,
      codingQuestionId VARCHAR(36) NOT NULL,
      passedCount INT NOT NULL DEFAULT 0,
      failedCount INT NOT NULL DEFAULT 0,
      updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      KEY idx_candidateId (candidateId),
      KEY idx_codingQuestionId (codingQuestionId)
    )
  `);
  // Add more ensureTable calls for other required tables here if needed
}

module.exports = { initMysql };
