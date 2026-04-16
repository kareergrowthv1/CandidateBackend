const path = require('path');
const dotenv = require('dotenv');

// Load local overrides first, then fallback backup env.
dotenv.config({ path: path.resolve(__dirname, '../.env.local') });
dotenv.config({ path: path.resolve(__dirname, '../.env') });
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const candidatesRoutes = require('./routes/candidates');
const codingPracticeRoutes = require('./routes/coding-practice');
const runCodeRoutes = require('./routes/run-code');
const dailyQuizRoutes = require('./routes/daily-quiz');
const knowledgeBaseRoutes = require('./routes/knowledge-base');
const programmingRoutes = require('./routes/programmingRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const aiMockRoutes = require('./routes/aiMockRoutes');
const resumeRoutes = require('./routes/resumeRoutes');
const notificationRoutes = require('./routes/notificationRoutes');
const candidateStatusRoutes = require('./routes/candidateStatus');
const assessmentSummaryRoutes = require('./routes/assessmentSummary');
const interviewResponsesRoutes = require('./routes/interviewResponses');
const candidateCodingResponsesRoutes = require('./routes/candidateCodingResponses');
const candidateAptitudeResponsesRoutes = require('./routes/candidateAptitudeResponses');

const authMiddleware = require('./middlewares/auth.middleware');
const tenantMiddleware = require('./middlewares/tenant.middleware');
const { pool, DB_NAME } = require('./config/db');
const { startQuizCron } = require('./cron/quizCron');

const app = express();

// CORS: from .env (comma-separated CORS_ORIGINS); fallback for dev when empty
const DEFAULT_CORS_ORIGINS = [
  'http://localhost:4000', 'http://localhost:4001', 'http://localhost:4002', 'http://localhost:4003',
  'http://localhost:5173', 'http://localhost:5174',
  'https://localhost:4000', 'https://localhost:4001', 'https://localhost:4002', 'https://localhost:4003',
  'https://localhost:5173', 'https://localhost:5174',
  'http://127.0.0.1:4000', 'http://127.0.0.1:4001', 'http://127.0.0.1:4002', 'http://127.0.0.1:4003',
  'http://127.0.0.1:5173', 'http://127.0.0.1:5174',
  'https://127.0.0.1:4000', 'https://127.0.0.1:4001', 'https://127.0.0.1:4002', 'https://127.0.0.1:4003',
  'https://127.0.0.1:5173', 'https://127.0.0.1:5174',
];
const corsOrigins = (process.env.CORS_ORIGINS || '').split(',').map(o => o.trim()).filter(Boolean);
const originList = corsOrigins.length > 0 ? corsOrigins : DEFAULT_CORS_ORIGINS;

function isLocalDevOrigin(origin) {
  try {
    const u = new URL(origin);
    const port = Number(u.port || (u.protocol === 'https:' ? 443 : 80));
    const isFrontendPort = [4000, 4001, 4002, 4003, 5173, 5174].includes(port);
    if (!isFrontendPort) return false;

    const host = u.hostname;
    const isLocalHost = host === 'localhost' || host === '127.0.0.1';
    const isLanHost =
      /^192\.168\.\d{1,3}\.\d{1,3}$/.test(host) ||
      /^10\.\d{1,3}\.\d{1,3}\.\d{1,3}$/.test(host) ||
      /^172\.(1[6-9]|2\d|3[0-1])\.\d{1,3}\.\d{1,3}$/.test(host);

    return isLocalHost || isLanHost;
  } catch (_) {
    return false;
  }
}

app.use(cors({
  origin: (origin, cb) => {
    if (!origin) return cb(null, true);
    if (originList.includes(origin) || isLocalDevOrigin(origin)) return cb(null, true);
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
app.use(cookieParser());
app.use('/public', express.static(path.join(__dirname, '../public')));

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'Candidate Backend is healthy' });
});

app.use('/candidates', candidatesRoutes);
app.use('/coding-practice', codingPracticeRoutes);
app.use('/run-code', runCodeRoutes);
app.use('/api/daily-quiz', dailyQuizRoutes);
app.use('/api/knowledge-base', knowledgeBaseRoutes);
app.use('/api/programming', programmingRoutes);
app.use('/payments', paymentRoutes);
app.use('/api/ai-mock', aiMockRoutes);
app.use('/api/resume', resumeRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/candidate-status', candidateStatusRoutes);
app.use('/candidate', tenantMiddleware, assessmentSummaryRoutes);
app.use('/candidate', tenantMiddleware, interviewResponsesRoutes);
app.use('/candidate-coding-responses', candidateCodingResponsesRoutes);
app.use('/candidate-aptitude-responses', candidateAptitudeResponsesRoutes);


// Start daily quiz cron job (generates quiz at midnight every day)
startQuizCron();

app.use((err, req, res, next) => {
  console.error(err.stack);
  const status = err.status || 500;
  res.status(status).json({ 
    success: false,
    error: err.message || 'Something went wrong!',
    type: err.name || 'Error',
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined 
  });
});

module.exports = app;
