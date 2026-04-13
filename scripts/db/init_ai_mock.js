const dotenv = require('dotenv');
const path = require('path');

// Load .env BEFORE requiring db config
dotenv.config({ path: path.join(__dirname, '../../.env') });

const { pool, DB_NAME } = require('../../src/config/db');

async function init() {
  try {
    console.log(`Initialising AI Mock table in ${DB_NAME}...`);
    const query = `
      CREATE TABLE IF NOT EXISTS \`${DB_NAME}\`.candidate_ai_mock_rounds (
          id INT AUTO_INCREMENT PRIMARY KEY,
          candidate_id INT NOT NULL,
          round_number INT NOT NULL,
          status ENUM('NOT_STARTED', 'IN_PROGRESS', 'COMPLETED') DEFAULT 'NOT_STARTED',
          score INT DEFAULT 0,
          last_feedback TEXT,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
          UNIQUE KEY unique_candidate_round (candidate_id, round_number)
      );
    `;
    await pool.query(query);
    console.log('✅ AI Mock table created successfully');
    process.exit(0);
  } catch (err) {
    console.error('❌ Error creating table:', err);
    process.exit(1);
  }
}

init();
