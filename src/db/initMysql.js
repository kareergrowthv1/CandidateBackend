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
      id INT AUTO_INCREMENT PRIMARY KEY,
      candidate_id VARCHAR(36) NOT NULL,
      subscription_type VARCHAR(50),
      credits INT DEFAULT 0,
      status VARCHAR(20) DEFAULT 'ACTIVE',
      total_credits INT DEFAULT 0,
      utilized_credits INT DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )
  `);
  // Add more ensureTable calls for other required tables here if needed
}

module.exports = { initMysql };
