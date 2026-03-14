/**
 * candidates_db connection for Candidate Backend (Colleges admin).
 * Uses same DB credentials as AdminBackend. college_candidates stored in candidates_db.
 */
const mysql = require('mysql2/promise');

const DB_NAME = process.env.CANDIDATE_DB_NAME;

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  waitForConnections: true,
  connectionLimit: parseInt(process.env.DB_POOL_SIZE, 10),
  queueLimit: 0,
  charset: 'utf8mb4',
});

module.exports = { pool, DB_NAME };
