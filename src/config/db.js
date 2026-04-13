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

// Auth pool for users/roles/organizations (auth_db)
const authPool = mysql.createPool({
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: 'auth_db',
  waitForConnections: true,
  connectionLimit: 5,
  queueLimit: 0,
  charset: 'utf8mb4',
});

/** Run a query against auth_db (users, roles, organizations, permissions). */
const authQuery = async (sql, params = []) => {
  const connection = await authPool.getConnection();
  try {
    const [rows] = await connection.query(sql, params);
    return rows;
  } finally {
    connection.release();
  }
};

module.exports = { pool, DB_NAME, authPool, authQuery };
