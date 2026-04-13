require('dotenv').config();
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

const authMiddleware = require('./middlewares/auth.middleware');
const tenantMiddleware = require('./middlewares/tenant.middleware');
const { pool, DB_NAME } = require('./config/db');
const { startQuizCron } = require('./cron/quizCron');

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
app.use(cookieParser());
const path = require('path');
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
