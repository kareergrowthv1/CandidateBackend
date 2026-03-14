/**
 * Migration: create candidate_question_answers table in candidates_db
 *
 * Run: node scripts/run-migration-001-create-question-answers.js
 */
require('dotenv').config();
const mysql = require('mysql2/promise');

const DB_HOST     = process.env.DB_HOST     || 'localhost';
const DB_PORT     = parseInt(process.env.DB_PORT || '3306', 10);
const DB_USER     = process.env.DB_USER     || 'root';
const DB_PASSWORD = process.env.DB_PASSWORD || '';
const DB_NAME     = process.env.CANDIDATE_DB_NAME || 'candidates_db';

const CREATE_TABLE_SQL = `
CREATE TABLE IF NOT EXISTS \`${DB_NAME}\`.candidate_question_answers (
  id              BINARY(16)   NOT NULL,
  client_id       VARCHAR(255) NOT NULL,
  candidate_id    BINARY(16)   NOT NULL,
  position_id     BINARY(16)   NOT NULL,
  \`round\`       VARCHAR(10)  NOT NULL,
  question_id     VARCHAR(255) NOT NULL,
  answer_text     TEXT         DEFAULT NULL,
  question_set_id VARCHAR(36)  DEFAULT NULL,
  assessment_summary_id VARCHAR(36) DEFAULT NULL,
  correct_answer  VARCHAR(10)  DEFAULT NULL,
  created_at      DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at      DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uk_cqa_answer (client_id, candidate_id, position_id, \`round\`, question_id, question_set_id),
  INDEX idx_cqa_candidate (candidate_id),
  INDEX idx_cqa_position  (position_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
`;

async function main() {
  let conn;
  try {
    console.log(`[migration] Connecting to MySQL ${DB_HOST}:${DB_PORT} as ${DB_USER} ...`);
    conn = await mysql.createConnection({
      host: DB_HOST,
      port: DB_PORT,
      user: DB_USER,
      password: DB_PASSWORD,
    });

    console.log(`[migration] Ensuring database ${DB_NAME} exists ...`);
    await conn.query(`CREATE DATABASE IF NOT EXISTS \`${DB_NAME}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`);

    console.log('[migration] Creating table candidate_question_answers if not exists ...');
    await conn.query(CREATE_TABLE_SQL);

    console.log('[migration] ✅ Done. Table candidate_question_answers is ready.');
  } catch (err) {
    console.error('[migration] ❌ Error:', err.message);
    process.exit(1);
  } finally {
    if (conn) await conn.end();
  }
}

main();
