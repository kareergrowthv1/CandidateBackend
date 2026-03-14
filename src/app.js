const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const candidatesRoutes = require('./routes/candidates');
const codingPracticeRoutes = require('./routes/coding-practice');
const runCodeRoutes = require('./routes/run-code');
const dailyQuizRoutes = require('./routes/daily-quiz');
const knowledgeBaseRoutes = require('./routes/knowledge-base');
const programmingRoutes = require('./routes/programmingRoutes');
const authMiddleware = require('./middlewares/auth.middleware');
const tenantMiddleware = require('./middlewares/tenant.middleware');
const { pool, DB_NAME } = require('./config/db');
const { startQuizCron } = require('./cron/quizCron');

dotenv.config();

const app = express();

// CORS: from .env (comma-separated CORS_ORIGINS); fallback for dev when empty
const DEFAULT_CORS_ORIGINS = [
  'http://localhost:4000', 'http://localhost:4001', 'http://localhost:4002', 'http://localhost:4003',
  'http://localhost:5173', 'http://localhost:5174',
  'http://127.0.0.1:4000', 'http://127.0.0.1:4001', 'http://127.0.0.1:4002', 'http://127.0.0.1:4003',
  'http://127.0.0.1:5173', 'http://127.0.0.1:5174',
];
const corsOrigins = (process.env.CORS_ORIGINS || '').split(',').map(o => o.trim()).filter(Boolean);
const originList = corsOrigins.length > 0 ? corsOrigins : DEFAULT_CORS_ORIGINS;
app.use(cors({
  origin: (origin, cb) => {
    if (!origin) return cb(null, true);
    if (originList.includes(origin)) return cb(null, true);
    return cb(null, false);
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: [
    'Content-Type', 'Authorization', 'Accept', 'X-Requested-With',
    'X-Tenant-Id', 'X-User-Id', 'X-User-Cl', 'X-User-Email', 'X-User-Roles', 'X-User-OrgId', 'X-Organization-Id',
    'X-Service-Token', 'X-Service-Name', 'X-XSRF-Token', 'X-CSRF-TOKEN',
  ],
}));
app.use(morgan('dev'));
app.use(express.json());
const path = require('path');
app.use('/public', express.static(path.join(__dirname, '../public')));

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'Candidate Backend is healthy' });
});

/**
 * GET /candidates/check-mail?email=...&organizationId=...
 * Registered at app level so path is always matched (avoids 404 from router ordering).
 */
app.get('/candidates/check-mail', authMiddleware, tenantMiddleware, async (req, res) => {
  const email = (req.query.email || '').toString().trim();
  const organizationId = (req.query.organizationId || req.headers['x-organization-id'] || '').toString().trim();
  if (!email) {
    return res.status(400).json({ success: false, message: 'email is required' });
  }
  try {
    const dbName = DB_NAME || process.env.CANDIDATE_DB_NAME;
    if (!dbName) {
      return res.status(500).json({ success: false, message: 'CANDIDATE_DB_NAME not configured' });
    }

    let query = `SELECT candidate_id as id, candidate_code as code, candidate_name as name, email, mobile_number as mobileNumber
                 FROM \`${dbName}\`.college_candidates
                 WHERE LOWER(TRIM(email)) = LOWER(?)`;
    const params = [email];

    if (organizationId) {
      query += ` AND organization_id = ?`;
      params.push(organizationId);
    }

    query += ` LIMIT 1`;

    const [rows] = await pool.query(query, params);
    const row = rows && rows[0];
    if (!row) {
      return res.status(200).json({ success: false, data: null });
    }
    return res.status(200).json({
      success: true,
      data: {
        id: row.id,
        code: row.code,
        name: row.name,
        email: row.email,
        mobileNumber: row.mobileNumber || ''
      }
    });
  } catch (err) {
    console.error('check-mail error:', err);
    return res.status(500).json({ success: false, message: err.message || 'Check failed' });
  }
});

app.use('/candidates', candidatesRoutes);
app.use('/coding-practice', codingPracticeRoutes);
app.use('/run-code', runCodeRoutes);
app.use('/api/daily-quiz', dailyQuizRoutes);
app.use('/api/knowledge-base', knowledgeBaseRoutes);
app.use('/api/programming', programmingRoutes);

// Start daily quiz cron job (generates quiz at midnight every day)
startQuizCron();

app.use((err, req, res, next) => {
  console.error(err.stack);
  const status = err.status || 500;
  res.status(status).json({ error: err.message || 'Something went wrong!' });
});

module.exports = app;
