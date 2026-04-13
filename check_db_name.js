require('dotenv').config();
const { DB_NAME } = require('./src/config/db');
console.log('DB_NAME from config/db:', DB_NAME);
console.log('process.env.CANDIDATE_DB_NAME:', process.env.CANDIDATE_DB_NAME);
process.exit(0);
