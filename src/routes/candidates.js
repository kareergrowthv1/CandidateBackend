/**
 * POST /candidates/add
 * Multipart: candidate (JSON blob), resumeFile (file)
 * Saves to candidates_db.college_candidates (Colleges admin). Returns id, code, name, email, etc.
 */
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const { pool, DB_NAME } = require('../config/db');
const authMiddleware = require('../middlewares/auth.middleware');
const tenantMiddleware = require('../middlewares/tenant.middleware');
const pdf = require('pdf-parse');
const axios = require('axios');
const { getCollection, COLLECTIONS } = require('../config/mongo');

const STREAMING_AI_URL = process.env.STREAMING_AI_URL || 'http://localhost:9000';

const UPLOAD_DIR = path.join(__dirname, '../../uploads/resumes');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (!fs.existsSync(UPLOAD_DIR)) {
      fs.mkdirSync(UPLOAD_DIR, { recursive: true });
    }
    cb(null, UPLOAD_DIR);
  },
  filename: (req, file, cb) => {
    const date = new Date().toISOString().replace(/[:.]/g, '').slice(0, 15);
    const safeName = (file.originalname || 'resume').replace(/[^a-zA-Z0-9._-]/g, '_');
    cb(null, `${date}-${safeName.toLowerCase()}`);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const isResume = file.fieldname === 'resumeFile';
    const allowedResume = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!isResume) {
      cb(null, true);
      return;
    }
    if (allowedResume.includes(file.mimetype) || /\.(pdf|docx)$/i.test(file.originalname || '')) {
      cb(null, true);
    } else {
      cb(new Error('Only PDF and Word (.docx) files are allowed for resume'));
    }
  }
});

/**
 * GET /candidates/check-mail?email=...&organizationId=...
 */
router.get('/check-mail', authMiddleware, tenantMiddleware, async (req, res) => {
  const email = (req.query.email || '').toString().trim();
  const organizationId = (req.query.organizationId || req.headers['x-organization-id'] || '').toString().trim();
  if (!email) {
    return res.status(400).json({ success: false, message: 'email is required' });
  }
  if (!organizationId) {
    return res.status(400).json({ success: false, message: 'organizationId is required' });
  }
  try {
    const [rows] = await pool.query(
      `SELECT candidate_id as id, candidate_code as code, candidate_name as name, email, mobile_number as mobileNumber,
              current_role as currentRole, location, academic_year as academicYear, skills,
              registration_paid as registrationPaid, plan_id as planId, subscription_expiry as subscriptionExpiry
       FROM \`${DB_NAME}\`.college_candidates
       WHERE LOWER(TRIM(email)) = LOWER(?) AND organization_id = ?
       LIMIT 1`,
      [email, organizationId]
    );
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
        mobileNumber: row.mobileNumber || '-',
        currentRole: row.currentRole || '-',
        location: row.location || '-',
        academicYear: row.academicYear || '-',
        skills: row.skills || [],
        registrationPaid: !!row.registrationPaid,
        planId: row.planId,
        subscriptionExpiry: row.subscriptionExpiry
      }
    });
  } catch (err) {
    console.error('check-mail error:', err);
    return res.status(500).json({ success: false, message: err.message || 'Check failed' });
  }
});

/**
 * GET /candidates/leave/list
 * Returns leave history for the logged-in candidate.
 */
router.get('/leave/list', authMiddleware, tenantMiddleware, async (req, res) => {
  const loginUserId = req.user?.id;
  const userEmail = req.user?.email;
  const dbName = req.tenantDb;

  if (!loginUserId || !dbName) {
    return res.status(400).json({ success: false, message: 'Candidate ID or Tenant DB missing' });
  }

  try {
    // 1. Resolve Academic Candidate ID based on Email
    let academicCandidateId = loginUserId;
    if (userEmail) {
      // ALWAYS try tenant-local college_candidates first (most accurate for local attendance/leaves)
      let [identityLookup] = await pool.query(
        `SELECT candidate_id FROM \`${dbName}\`.college_candidates WHERE LOWER(email) = LOWER(?) LIMIT 1`,
        [userEmail]
      );

      // FALLBACK: Try global candidates_db
      if (identityLookup.length === 0) {
        [identityLookup] = await pool.query(
          `SELECT candidate_id FROM candidates_db.college_candidates WHERE LOWER(email) = LOWER(?) LIMIT 1`,
          [userEmail]
        );
      }

      if (identityLookup.length > 0) {
        academicCandidateId = identityLookup[0].candidate_id;
      }
    }

    // Ensure table exists (defensive migration)
    await pool.query(`
      CREATE TABLE IF NOT EXISTS \`${dbName}\`.college_leaves (
        id CHAR(36) PRIMARY KEY,
        organization_id VARCHAR(36),
        student_id VARCHAR(36) NOT NULL,
        leave_type VARCHAR(50) NOT NULL,
        start_date DATE NOT NULL,
        end_date DATE NOT NULL,
        reason TEXT,
        status ENUM('Pending', 'Approved', 'Rejected') DEFAULT 'Pending',
        applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        remarks TEXT,
        INDEX idx_leave_student (student_id)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);

    const [rows] = await pool.query(
      `SELECT id, leave_type as leaveType, start_date as startDate, end_date as endDate, 
              reason, status, applied_at as appliedAt, remarks
       FROM \`${dbName}\`.college_leaves
       WHERE student_id = ?
       ORDER BY applied_at DESC`,
      [academicCandidateId]
    );
    return res.status(200).json({ success: true, data: rows });
  } catch (err) {
    console.error('Leave list fetch error:', err);
    return res.status(500).json({ success: false, message: err.message || 'Failed to fetch leave history' });
  }
});

/**
 * GET /candidates/attendance
 * Returns subject-wise attendance for the logged-in candidate.
 */
router.get('/attendance', authMiddleware, tenantMiddleware, async (req, res) => {
  const loginUserId = req.user?.id;
  const userSub = req.user?.email; // sub is stored in req.user.email by middleware
  const dbName = req.tenantDb;
  const orgIdToken = req.user?.organizationId;

  console.log('[DEBUG] Attendance hit:', { loginUserId, userSub, dbName, orgIdToken });

  if (!loginUserId || !dbName) {
    return res.status(400).json({ success: false, message: 'Candidate ID or Tenant DB missing' });
  }

  try {
    // 0. Resolve Academic Candidate ID based on Email or Mobile (from sub)
    let academicCandidateId = loginUserId;
    if (userSub) {
      // ALWAYS try tenant-local college_candidates first (most accurate for local attendance/leaves)
      let [identityLookup] = await pool.query(
        `SELECT candidate_id FROM \`${dbName}\`.college_candidates 
         WHERE LOWER(email) = LOWER(?) OR mobile_number = ? OR mobile_number LIKE ? 
         LIMIT 1`,
        [userSub, userSub, `%${userSub}%`]
      );

      // FALLBACK: Try global candidates_db 
      if (identityLookup.length === 0) {
        [identityLookup] = await pool.query(
          `SELECT candidate_id FROM candidates_db.college_candidates 
           WHERE LOWER(email) = LOWER(?) OR mobile_number = ? OR mobile_number LIKE ? 
           LIMIT 1`,
          [userSub, userSub, `%${userSub}%`]
        );
      }

      if (identityLookup.length > 0) {
        academicCandidateId = identityLookup[0].candidate_id;
      }
    }

    // 1. Get candidate's academic context and organization info
    const [candRowsLog] = await pool.query(
      `SELECT dept_id, branch_id, organization_id FROM candidates_db.college_candidates WHERE candidate_id = ? LIMIT 1`,
      [academicCandidateId]
    );

    const [candRowsTen] = await pool.query(
      `SELECT branch_id, organization_id, subjects FROM \`${dbName}\`.college_candidates WHERE candidate_id = ? LIMIT 1`,
      [academicCandidateId]
    );

    const branchId = candRowsLog[0]?.branch_id || candRowsTen[0]?.branch_id;
    const organizationId = candRowsLog[0]?.organization_id || candRowsTen[0]?.organization_id || orgIdToken;
    const rawSubjectsCsv = candRowsTen[0]?.subjects || '';

    // 2. Fetch all relevant subjects
    let subjectsList = [];
    if (rawSubjectsCsv) {
      subjectsList = String(rawSubjectsCsv).split(',').map(s => s.trim()).filter(Boolean);
    }

    let subjects = [];
    let subjectQuery = `SELECT id, name, code FROM \`${dbName}\`.college_subjects WHERE status = 'Active' AND (1=0`;
    let queryParams = [];

    if (branchId) {
      subjectQuery += ' OR branch_id = ?';
      queryParams.push(branchId);
    }

    if (subjectsList.length > 0) {
      subjectQuery += ` OR id IN (${subjectsList.map(() => '?').join(',')})`;
      queryParams.push(...subjectsList);
    }

    // Always include subjects that have attendance
    subjectQuery += ` OR id IN (SELECT DISTINCT subject_id FROM \`${dbName}\`.college_attendance WHERE student_id = ?)`;
    queryParams.push(academicCandidateId);

    subjectQuery += ')';

    [subjects] = await pool.query(subjectQuery, queryParams);

    // 3. Fetch ALL attendance records for the semester
    const [attendance] = await pool.query(
      `SELECT subject_id, date, status, remarks, type FROM \`${dbName}\`.college_attendance WHERE student_id = ? ORDER BY date DESC`,
      [academicCandidateId]
    );

    // 4. Construct Subject-first Attendance Matrix & Calculate Semester Stats
    const attendanceGrouped = {};
    let totalPresent = 0, totalAbsent = 0, totalLeave = 0;

    subjects.forEach(s => {
      attendanceGrouped[s.id] = {
        subjectId: s.id,
        subjectName: s.name,
        months: {}
      };
    });

    attendance.forEach(record => {
      if (!record.date || !record.subject_id) return;

      // Update Semester Stats
      if (record.status === 'P' || record.status === 'Present') totalPresent++;
      else if (record.status === 'A' || record.status === 'Absent') totalAbsent++;
      else if (record.status === 'L' || record.status === 'Leave') totalLeave++;

      const dateObj = new Date(record.date);
      const monthKey = `${dateObj.getFullYear()}-${String(dateObj.getMonth() + 1).padStart(2, '0')}`;
      const dayKey = String(dateObj.getDate()).padStart(2, '0');

      if (!attendanceGrouped[record.subject_id]) {
        const sub = subjects.find(s => s.id === record.subject_id);
        attendanceGrouped[record.subject_id] = {
          subjectId: record.subject_id,
          subjectName: sub ? sub.name : 'Unknown',
          months: {}
        };
      }

      if (!attendanceGrouped[record.subject_id].months[monthKey]) {
        attendanceGrouped[record.subject_id].months[monthKey] = {};
      }

      attendanceGrouped[record.subject_id].months[monthKey][dayKey] = record.status;
    });

    const totalMarked = totalPresent + totalAbsent + totalLeave;
    const overallPercentage = totalMarked > 0 ? Math.round((totalPresent / totalMarked) * 100) : 0;

    return res.status(200).json({
      success: true,
      data: {
        subjects,
        attendance: attendanceGrouped,
        semesterStats: {
          totalPresent,
          totalAbsent,
          totalLeave,
          totalMarked,
          overallPercentage
        }
      }
    });
  } catch (err) {
    console.error('[DEBUG] Candidate attendance fetch error:', err);
    return res.status(500).json({ success: false, message: err.message || 'Failed to fetch attendance' });
  }
});

async function getNextCandidateCode() {
  const [rows] = await pool.query(
    `SELECT candidate_code FROM \`${DB_NAME}\`.college_candidates
     WHERE candidate_code REGEXP '^CAN[0-9]{4,}$'
     ORDER BY CAST(SUBSTRING(candidate_code, 4) AS UNSIGNED) DESC
     LIMIT 1`
  );
  const last = rows[0]?.candidate_code;
  let nextNum = 1;
  if (last) {
    nextNum = parseInt(last.substring(3), 10) + 1;
  }
  return `CAN${String(nextNum).padStart(4, '0')}`;
}

router.post('/add', authMiddleware, tenantMiddleware, upload.fields([{ name: 'candidate', maxCount: 1 }, { name: 'resumeFile', maxCount: 1 }]), async (req, res) => {
  let candidateJson = null;
  let resumeFile = null;

  if (req.files && Object.keys(req.files).length > 0) {
    const candField = req.files.candidate || req.files['candidate'];
    const resumeField = req.files.resumeFile || req.files['resumeFile'];
    if (candField && candField[0]) {
      const buf = fs.readFileSync(candField[0].path, 'utf8');
      candidateJson = JSON.parse(buf);
      fs.unlinkSync(candField[0].path);
    }
    if (resumeField && resumeField[0]) {
      resumeFile = resumeField[0];
    }
  }

  // Fallback to req.body for JSON requests (internal sync or simpler frontend calls)
  if (!candidateJson && req.body && (req.body.name || req.body.email)) {
    candidateJson = req.body;
  }

  if (!candidateJson) {
    return res.status(400).json({ message: 'Missing part: candidate (JSON) or body' });
  }

  const { name, email, mobileNumber, createdBy, code: inputCode, organizationId } = candidateJson;
  if (!name || !email || !mobileNumber) {
    return res.status(400).json({ message: 'name, email, and mobileNumber are required' });
  }
  // organizationId is optional for Colleges admin as per user request
  const orgId = organizationId || null;

  const candidateId = uuidv4();
  const now = new Date();
  const match = inputCode && String(inputCode).trim().match(/^CAN(\d+)$/i);
  const candidateCode = match ? `CAN${String(parseInt(match[1], 10)).padStart(4, '0')}` : await getNextCandidateCode();
  const resumeFilename = resumeFile ? resumeFile.originalname : null;
  const resumeUrl = resumeFile ? `/uploads/resumes/${resumeFile.filename}` : null;

  try {
    await pool.query(
      `INSERT INTO \`${DB_NAME}\`.college_candidates (
        candidate_id, organization_id, candidate_code, candidate_name, email, mobile_number,
        resume_filename, resume_url, status, candidate_created_by, candidate_created_at, created_at, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'All', ?, ?, ?, ?)`,
      [candidateId, orgId, candidateCode, name, email, mobileNumber, resumeFilename, resumeUrl, createdBy || null, now, now, now]
    );
  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ message: 'Candidate with this email already exists in this organization' });
    }
    throw err;
  }

  const toDateTime = (d) => d ? d.toISOString().slice(0, 19).replace('T', ' ') : null;
  const response = {
    id: candidateId,
    code: candidateCode,
    name,
    email,
    mobileNumber,
    currentRole: '-',
    location: '-',
    academicYear: '-',
    skills: [],
    resumeFilename: resumeFilename || null,
    resumeStoragePath: resumeUrl,
    createdBy: createdBy || null,
    createdAt: toDateTime(now),
    updatedAt: toDateTime(now)
  };

  return res.status(201).json(response);
});

/**
 * GET /candidates/:candidateId/resume-text
 * Returns extracted text from the candidate's resume file (for ATS scoring).
 */
router.get('/:candidateId/resume-text', authMiddleware, tenantMiddleware, async (req, res) => {
  const { candidateId } = req.params;
  if (!candidateId) {
    return res.status(400).json({ message: 'candidateId is required' });
  }
  try {
    const [rows] = await pool.query(
      `SELECT resume_url, resume_filename FROM \`${DB_NAME}\`.college_candidates WHERE candidate_id = ? LIMIT 1`,
      [candidateId]
    );
    const row = rows && rows[0];
    if (!row || !row.resume_url) {
      return res.status(404).json({ message: 'Candidate or resume not found' });
    }
    const filename = path.basename((row.resume_url || '').replace(/^\/uploads\/resumes\//, ''));
    const filePath = path.join(UPLOAD_DIR, filename);
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ message: 'Resume file not found on disk' });
    }
    const ext = path.extname(filePath).toLowerCase();
    let text = '';
    if (ext === '.pdf') {
      try {
        const pdfParse = require('pdf-parse');
        const dataBuffer = fs.readFileSync(filePath);
        const data = await pdfParse(dataBuffer);
        text = (data && data.text) ? data.text.trim() : '';
      } catch (e) {
        console.error('pdf-parse error:', e);
        return res.status(500).json({ message: 'Failed to extract text from PDF' });
      }
    } else if (ext === '.docx') {
      try {
        const mammoth = require('mammoth');
        const result = await mammoth.extractRawText({ path: filePath });
        text = (result && result.value) ? result.value.trim() : '';
      } catch (e) {
        console.error('mammoth error:', e);
        return res.status(500).json({ message: 'Failed to extract text from DOCX' });
      }
    } else {
      return res.status(400).json({ message: 'Unsupported resume format; use PDF or DOCX' });
    }
    if (!text || text.length < 20) {
      return res.status(422).json({ message: 'Resume text too short or empty after extraction' });
    }
    return res.status(200).json({ resumeText: text });
  } catch (err) {
    console.error('resume-text error:', err);
    return res.status(500).json({ message: err.message || 'Failed to get resume text' });
  }
});

/**
 * GET /candidates/profile/:candidateId
 * Returns full candidate details for the profile page.
 */
router.get('/profile/:candidateId', authMiddleware, tenantMiddleware, async (req, res) => {
  const { candidateId } = req.params;
  if (!candidateId) {
    return res.status(400).json({ success: false, message: 'candidateId is required' });
  }
  try {
    const [rows] = await pool.query(
      `SELECT candidate_id as id, candidate_code as code, candidate_name as name, email, mobile_number as mobileNumber,
              current_role as currentRole, location, academic_year as academicYear, skills,
              resume_filename as resumeFilename, resume_url as resumeUrl, status, created_at as createdAt,
              registration_paid as registrationPaid, plan_id as planId, subscription_expiry as subscriptionExpiry,
              organization_id as organizationId, branch_id as branchId, dept_id as departmentId
       FROM \`${DB_NAME}\`.college_candidates
       WHERE candidate_id = ? LIMIT 1`,
      [candidateId]
    );
    const row = rows && rows[0];
    if (!row) {
      // Fallback: If not found in DB, return profile from token data if ID matches
      if (req.user && req.user.id === candidateId) {
        return res.status(200).json({
          success: true,
          data: {
            id: req.user.id,
            code: 'CAN-GUEST',
            name: req.user.username || req.user.name || 'Candidate',
            email: req.user.email || 'N/A',
            mobileNumber: '-',
            currentRole: '-',
            location: '-',
            academicYear: '-',
            skills: [],
            status: 'Active',
            createdAt: new Date().toISOString()
          }
        });
      }
      return res.status(404).json({ success: false, message: 'Candidate not found' });
    }

    // Ensure all requested dynamic fields have a fallback
    const data = {
      ...row,
      mobileNumber: row.mobileNumber || '-',
      currentRole: row.currentRole || '-',
      location: row.location || '-',
      academicYear: row.academicYear || '-',
      skills: row.skills || [],
      registrationPaid: !!row.registrationPaid
    };

    return res.status(200).json({ success: true, data });
  } catch (err) {
    console.error('profile get error:', err);
    return res.status(500).json({ success: false, message: err.message || 'Failed to fetch profile' });
  }
});


/**
 * GET /candidates/dashboard-stats/:candidateId
 * Returns a single payload with all dashboard stats + top 8 latest jobs.
 * Stats: totalJobs, appliedJobs, solvedCount, totalStars, practiceCount
 * Jobs: top 8 latest OPEN jobs from superadmin_db
 */
router.get('/dashboard-stats/:candidateId', authMiddleware, tenantMiddleware, async (req, res) => {
  const { candidateId } = req.params;
  const dbName = req.tenantDb;

  try {
    // 1. Total open jobs count
    const [[jobCountRow]] = await pool.query(
      `SELECT COUNT(*) AS total FROM superadmin_db.jobs WHERE status = 'OPEN' AND is_active = 1`
    );
    const totalJobs = parseInt(jobCountRow?.total || 0, 10);

    // 2. Top 8 latest jobs
    const [latestJobs] = await pool.query(
      `SELECT 
        LOWER(CONCAT_WS('-',
          HEX(SUBSTR(id,1,4)), HEX(SUBSTR(id,5,2)), HEX(SUBSTR(id,7,2)),
          HEX(SUBSTR(id,9,2)), HEX(SUBSTR(id,11))
        )) AS id,
        title, 
        client_name AS company, 
        position_type AS jobType, 
        location,
        experience_range AS experienceRange,
        created_at AS postedAt
       FROM superadmin_db.jobs 
       WHERE status = 'OPEN' AND is_active = 1
       ORDER BY created_at DESC 
       LIMIT 8`
    );

    // 3. Practice stats from MongoDB
    let solvedCount = 0;
    let totalStars = 0;
    let practiceCount = 0;
    try {
      const { getCollection, COLLECTIONS } = require('../config/mongo');
      const col = await getCollection(COLLECTIONS.PRACTICE_RESPONSES);
      const responses = await col.find({ candidateId: String(candidateId) }).toArray();
      solvedCount = responses.length;
      totalStars = responses.reduce((sum, r) => sum + (r.starCount || 0), 0);
      practiceCount = new Set(responses.map(r => r.topicId)).size;
    } catch (mongoErr) {
      console.warn('MongoDB practice stats unavailable:', mongoErr.message);
    }

    // 4. Attendance Stats
    let attendancePercentage = 0;
    if (dbName) {
      try {
        const [attendance] = await pool.query(
          `SELECT status FROM \`${dbName}\`.college_attendance WHERE student_id = ?`,
          [candidateId]
        );
        if (attendance.length > 0) {
          const present = attendance.filter(a => a.status === 'P' || a.status === 'Present').length;
          attendancePercentage = Math.round((present / attendance.length) * 100);
        }
      } catch (attErr) {
        console.warn('Attendance stats fetch failed:', attErr.message);
      }
    }

    // 5. Credits Overview (Refactored to use localized summary table)
    let credits = { total: 0, utilized: 0, remaining: 0, planName: 'N/A' };
    try {
      // Resolve UUID if candidateId is an email
      let resolvedId = candidateId;
      if (candidateId && (candidateId.includes('@') || !candidateId.includes('-'))) {
        const [lookup] = await pool.query(
          `SELECT candidate_id FROM candidates_db.college_candidates WHERE email = ? OR candidate_id = ? LIMIT 1`,
          [candidateId, candidateId]
        );
        if (lookup.length > 0) resolvedId = lookup[0].candidate_id;
      }

      const queryActive = `
        SELECT plan_name, total_credits, utilized_credits
        FROM candidates_db.candidate_subscriptions
        WHERE candidate_id = ? AND status = 'ACTIVE'
        ORDER BY created_at DESC LIMIT 1
      `;
      const [activeRows] = await pool.query(queryActive, [resolvedId]);
      if (activeRows.length > 0) {
        credits.planName = activeRows[0].plan_name;
        credits.total = activeRows[0].total_credits || 0;
        credits.utilized = activeRows[0].utilized_credits || 0;
        credits.remaining = Math.max(0, credits.total - credits.utilized);
      }
    } catch (creditsErr) {
      console.warn('Credits stats fetch failed:', creditsErr.message);
    }

    // 6. Upcoming + Latest Completed Assessments
    let upcomingTests = [];
    let completedTests = [];
    try {
      // Upcoming
      const [upcoming] = await pool.query(
        `SELECT 
          LOWER(CONCAT_WS('-', HEX(SUBSTR(id,1,4)), HEX(SUBSTR(id,5,2)), HEX(SUBSTR(id,7,2)), HEX(SUBSTR(id,9,2)), HEX(SUBSTR(id,11)))) AS id,
          totalRoundsAssigned, isAssessmentCompleted, createdAt
         FROM candidates_db.assessments_summary 
         WHERE candidateId = ? AND isAssessmentCompleted = 0
         ORDER BY createdAt DESC LIMIT 3`,
        [candidateId]
      );
      upcomingTests = upcoming.map(a => ({ ...a, type: 'Technical Assessment', status: 'Pending' }));

      // Completed
      const [completed] = await pool.query(
        `SELECT 
          LOWER(CONCAT_WS('-', HEX(SUBSTR(id,1,4)), HEX(SUBSTR(id,5,2)), HEX(SUBSTR(id,7,2)), HEX(SUBSTR(id,9,2)), HEX(SUBSTR(id,11)))) AS id,
          totalRoundsAssigned, isAssessmentCompleted, createdAt
         FROM candidates_db.assessments_summary 
         WHERE candidateId = ? AND isAssessmentCompleted = 1
         ORDER BY createdAt DESC LIMIT 3`,
        [candidateId]
      );
      completedTests = completed.map(a => ({ ...a, type: 'Assessment Completed', status: 'Completed' }));
    } catch (testsErr) {
      console.warn('Assessments fetch failed:', testsErr.message);
    }

    // 7. Task Metrics (Tenant DB)
    let totalTasksCount = 0;
    let completedTasksCount = 0;
    if (dbName) {
      try {
        const [[taskRow]] = await pool.query(
          `SELECT COUNT(*) AS total, 
                  SUM(IF(status = 'Completed', 1, 0)) AS completed 
           FROM \`${dbName}\`.student_tasks 
           WHERE student_id = ?`,
          [candidateId]
        );
        totalTasksCount = parseInt(taskRow?.total || 0, 10);
        completedTasksCount = parseInt(taskRow?.completed || 0, 10);
      } catch (taskErr) {
        console.warn('Dashboard tasks stats fetch failed:', taskErr.message);
      }
    }

    return res.status(200).json({
      success: true,
      data: {
        stats: {
          totalJobs,
          appliedJobs: 0, // Placeholder
          solvedCount,
          totalStars,
          practiceCount,
          attendancePercentage,
          totalTasks: totalTasksCount,
          completedTasks: completedTasksCount,
          credits,
        },
        latestJobs,
        upcomingTests,
        completedTests
      },
    });
  } catch (err) {
    console.error('dashboard-stats error:', err);
    return res.status(500).json({ success: false, message: err.message || 'Failed to fetch dashboard stats' });
  }
});

/**
 * GET /candidates/internaljobs
 * Returns paginated list of OPEN jobs from superadmin_db.jobs
 * Query params: page, limit, search, location
 */
router.get('/internaljobs', authMiddleware, async (req, res) => {
  try {
    const page = Math.max(1, parseInt(req.query.page, 10) || 1);
    const limit = Math.min(50, Math.max(1, parseInt(req.query.limit, 10) || 12));
    const offset = (page - 1) * limit;
    const search = (req.query.search || '').trim();
    const { location, jobMode, date, salaryRange, itNonIt, sort } = req.query;

    let where = 'WHERE j.status = "OPEN" AND j.is_active = 1';
    const params = [];

    if (search) {
      where += ' AND (j.title LIKE ? OR j.description LIKE ? OR j.client_name LIKE ?)';
      const like = `%${search}%`;
      params.push(like, like, like);
    }

    if (location) {
      where += ' AND j.location = ?';
      params.push(location);
    }

    if (jobMode) {
      where += ' AND j.position_type = ?';
      params.push(jobMode);
    }

    if (salaryRange) {
      where += ' AND j.salary_range = ?';
      params.push(salaryRange);
    }

    if (itNonIt && itNonIt !== 'All') {
      where += ' AND j.is_it = ?';
      params.push(itNonIt === 'IT' ? 1 : 0);
    }

    if (date) {
      if (date === 'Last 24h') where += ' AND j.created_at >= NOW() - INTERVAL 1 DAY';
      else if (date === 'Last Week') where += ' AND j.created_at >= NOW() - INTERVAL 7 DAY';
      else if (date === 'Last Month') where += ' AND j.created_at >= NOW() - INTERVAL 30 DAY';
    }

    let orderBy = 'j.created_at DESC';
    if (sort === 'Salary: High to Low') orderBy = 'j.salary_range DESC';
    else if (sort === 'Most Applicants') orderBy = 'j.applications_count DESC';
    else if (sort === 'Relevance') orderBy = 'j.created_at DESC'; // Placeholder for relevance

    const [[{ total }]] = await pool.query(
      `SELECT COUNT(*) AS total FROM superadmin_db.jobs j ${where}`,
      params
    );

    const [rows] = await pool.query(
      `SELECT
        LOWER(CONCAT_WS('-',
          HEX(SUBSTR(j.id,1,4)),
          HEX(SUBSTR(j.id,5,2)),
          HEX(SUBSTR(j.id,7,2)),
          HEX(SUBSTR(j.id,9,2)),
          HEX(SUBSTR(j.id,11))
        )) AS id,
        j.title,
        j.client_name AS company,
        j.position_type AS jobType,
        j.location,
        j.experience_range AS experienceRange,
        j.salary_range as salaryRange,
        j.is_it as isIt,
        j.description,
        j.status,
        j.applications_count AS applicationsCount,
        j.created_at AS postedAt
       FROM superadmin_db.jobs j
       ${where}
       ORDER BY ${orderBy}
       LIMIT ${limit} OFFSET ${offset}`,
      params
    );

    return res.status(200).json({
      success: true,
      data: {
        items: rows,
        pagination: {
          page,
          limit,
          total: parseInt(total, 10),
          totalPages: Math.ceil(total / limit),
        },
      },
    });
  } catch (err) {
    console.error('internaljobs error:', err);
    return res.status(500).json({ success: false, message: err.message || 'Failed to fetch jobs' });
  }
});


/**
 * GET /candidates/tasks
 * Returns assigned tasks for the logged-in student from the tenant DB.
 */
router.get('/tasks', authMiddleware, tenantMiddleware, async (req, res) => {
  const candidateId = req.user?.id;
  const dbName = req.tenantDb;

  if (!candidateId || !dbName) {
    return res.status(400).json({ success: false, message: 'Candidate ID or Tenant DB missing' });
  }

  try {
    const [rows] = await pool.query(
      `SELECT t.*, st.status as task_status, st.updated_at as status_updated_at,
              d.name as dept_name, b.name as branch_name, s.name as subject_name,
              (SELECT COUNT(*) FROM \`${dbName}\`.task_attachments ta WHERE ta.task_id = t.id) as attachment_count
       FROM \`${dbName}\`.student_tasks st
       JOIN \`${dbName}\`.tasks t ON st.task_id = t.id
       LEFT JOIN \`${dbName}\`.college_departments d ON t.dept_id = d.id
       LEFT JOIN \`${dbName}\`.college_branches b ON t.branch_id = b.id
       LEFT JOIN \`${dbName}\`.college_subjects s ON t.subject_id = s.id
       WHERE st.student_id = ?
       ORDER BY t.created_at DESC`,
      [candidateId]
    );
    return res.status(200).json({ success: true, data: rows });
  } catch (err) {
    console.error('Candidate tasks fetch error:', err);
    return res.status(500).json({ success: false, message: err.message || 'Failed to fetch tasks' });
  }
});

/**
 * POST /candidates/leave/apply
 * Submits a leave application for the logged-in candidate.
 */
router.post('/leave/apply', authMiddleware, tenantMiddleware, async (req, res) => {
  const candidateId = req.user?.id;
  const dbName = req.tenantDb;
  const organizationId = req.headers['x-organization-id'];

  if (!candidateId || !dbName) {
    return res.status(400).json({ success: false, message: 'Candidate ID or Tenant DB missing' });
  }

  const { leaveType, startDate, endDate, reason } = req.body;
  if (!leaveType || !startDate || !endDate || !reason) {
    return res.status(400).json({ success: false, message: 'All fields (leaveType, startDate, endDate, reason) are required' });
  }

  try {
    const leaveId = uuidv4();
    await pool.query(
      `INSERT INTO \`${dbName}\`.college_leaves (
        id, organization_id, student_id, leave_type, start_date, end_date, reason, status, applied_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, 'Pending', NOW())`,
      [leaveId, organizationId, candidateId, leaveType, startDate, endDate, reason]
    );

    return res.status(201).json({
      success: true,
      data: {
        id: leaveId,
        leaveType,
        startDate,
        endDate,
        reason,
        status: 'Pending'
      }
    });
  } catch (err) {
    console.error('Leave application error:', err);
    return res.status(500).json({ success: false, message: err.message || 'Failed to apply for leave' });
  }
});



/**
 * GET /candidates/dashboard-activity/:candidateId
 * Aggregates latest AI mocks, assessments, and tasks into a unified feed.
 */
router.get('/dashboard-activity/:candidateId', authMiddleware, tenantMiddleware, async (req, res) => {
  const { candidateId } = req.params;
  const dbName = req.tenantDb;
  const activities = [];

  try {
    // 1. Latest AI Mock Sessions (MongoDB)
    try {
      const { getCollection, COLLECTIONS } = require('../config/mongo');
      const aimockCol = await getCollection(COLLECTIONS.AIMOCK_RESPONSES);
      const mocks = await aimockCol.find({ candidateId })
        .sort({ completedAt: -1, savedAt: -1 })
        .limit(3)
        .toArray();

      mocks.forEach(m => {
        activities.push({
          id: m._id,
          type: 'mock',
          title: m.roundTitle || 'AI Mock Interview',
          subtitle: `Scored ${m.score || 0}%`,
          status: 'Completed',
          timestamp: m.completedAt || m.savedAt,
          raw: m
        });
      });
    } catch (mErr) { console.warn('Activity Mock skip:', mErr.message); }

    // 2. Latest Completed Assessments (MySQL)
    try {
      const [assessments] = await pool.query(
        `SELECT id, totalRoundsAssigned, createdAt 
         FROM candidates_db.assessments_summary 
         WHERE candidateId = ? AND isAssessmentCompleted = 1
         ORDER BY createdAt DESC LIMIT 3`,
        [candidateId]
      );
      assessments.forEach(a => {
        activities.push({
          id: a.id,
          type: 'assessment',
          title: 'Technical Assessment',
          subtitle: `Completed ${a.totalRoundsAssigned} rounds`,
          status: 'Success',
          timestamp: a.createdAt,
          raw: a
        });
      });
    } catch (aErr) { console.warn('Activity Assessment skip:', aErr.message); }

    // 3. Latest Tasks (Tenant MySQL)
    if (dbName) {
      try {
        const [tasks] = await pool.query(
          `SELECT t.id, t.title, st.status, st.updated_at 
           FROM \`${dbName}\`.student_tasks st
           JOIN \`${dbName}\`.tasks t ON st.task_id = t.id
           WHERE st.student_id = ?
           ORDER BY st.updated_at DESC LIMIT 3`,
          [candidateId]
        );
        tasks.forEach(t => {
          activities.push({
            id: t.id,
            type: 'task',
            title: t.title,
            subtitle: `Status: ${t.status}`,
            status: t.status === 'Completed' ? 'Completed' : 'Neutral',
            timestamp: t.updated_at,
            raw: t
          });
        });
      } catch (tErr) { console.warn('Activity Task skip:', tErr.message); }
    }

    // Sort combined chronological
    activities.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

    return res.status(200).json({
      success: true,
      data: activities.slice(0, 10) // Return top 10
    });
  } catch (err) {
    console.error('dashboard-activity error:', err);
    return res.status(500).json({ success: false, message: 'Failed to fetch activity feed' });
  }
});

/**
 * GET /candidates/performance-stats/:candidateId
 * Aggregates latest 15 AI mocks to calculate average scores by category.
 */
router.get('/performance-stats/:candidateId', authMiddleware, async (req, res) => {
  const { candidateId } = req.params;

  try {
    const { getCollection, COLLECTIONS } = require('../config/mongo');
    const aimockCol = await getCollection(COLLECTIONS.AIMOCK_RESPONSES);

    // Fetch latest 15 mocks to get enough data for categories
    const mocks = await aimockCol.find({ candidateId })
      .sort({ completedAt: -1, savedAt: -1 })
      .limit(15)
      .toArray();

    const categorized = {
      communication: [],
      aptitude: [],
      hr: [],
      technical: [],
      overall: mocks.map(m => parseFloat(m.score || 0))
    };

    mocks.forEach(m => {
      const score = parseFloat(m.score || 0);
      const title = (m.roundTitle || '').toLowerCase();

      if (title.includes('comm') || title.includes('speak') || title.includes('prep')) {
        categorized.communication.push(score);
      } else if (title.includes('apti') || title.includes('math') || title.includes('logic')) {
        categorized.aptitude.push(score);
      } else if (title.includes('hr') || title.includes('cultur') || title.includes('behav')) {
        categorized.hr.push(score);
      } else if (title.includes('tech') || title.includes('code') || title.includes('dsa') || title.includes('sql') || title.includes('problem')) {
        categorized.technical.push(score);
      }
    });

    const getStats = (scores) => {
      if (scores.length === 0) return { score: 0, change: 0 };
      const current = scores[0];
      const previous = scores.length > 1 ? scores[1] : current;
      return {
        score: Math.round(current),
        change: Math.round(current - previous)
      };
    };

    const comm = getStats(categorized.communication);
    const apt = getStats(categorized.aptitude);
    const hr = getStats(categorized.hr);
    const tech = getStats(categorized.technical);

    // Overall is the average of the 4 core domains
    const overallScore = Math.round((comm.score + apt.score + hr.score + tech.score) / 4);
    const overallChange = Math.round((comm.change + apt.change + hr.change + tech.change) / 4);

    const result = {
      communication: comm,
      aptitude: apt,
      hr: hr,
      technical: tech,
      overall: { score: overallScore, change: overallChange },
      testCount: mocks.length
    };

    return res.status(200).json({ success: true, data: result });
  } catch (err) {
    console.error('performance-stats error:', err);
    return res.status(500).json({ success: false, message: 'Failed to fetch performance insights' });
  }
});

/**
 * GET /candidates/performance-history/:candidateId
 * Returns time-series data for performance chart (Weekly/Monthly)
 */
router.get('/performance-history/:candidateId', authMiddleware, async (req, res) => {
  const { candidateId } = req.params;
  const { range = 'monthly', startDate, endDate } = req.query;

  try {
    const { getCollection, COLLECTIONS } = require('../config/mongo');
    const aimockCol = await getCollection(COLLECTIONS.AIMOCK_RESPONSES);

    let since;
    let until = new Date();

    if (startDate && endDate) {
      since = new Date(startDate);
      until = new Date(endDate);
    } else {
      const days = range === 'weekly' ? 7 : 30;
      since = new Date();
      since.setDate(since.getDate() - days);
    }

    const mocks = await aimockCol.find({
      candidateId,
      $or: [
        { completedAt: { $gte: since, $lte: until } },
        { savedAt: { $gte: since.toISOString(), $lte: until.toISOString() } }
      ]
    }).sort({ completedAt: 1, savedAt: 1 }).toArray();

    // Group by day for daily "Trading" view
    const historyMap = {};
    mocks.forEach(m => {
      const dateStr = new Date(m.completedAt || m.savedAt).toLocaleDateString('en-US', { month: '2-digit', day: '2-digit' });
      if (!historyMap[dateStr]) {
        historyMap[dateStr] = { date: dateStr, total: 0, count: 0, timestamp: new Date(m.completedAt || m.savedAt).getTime() };
      }
      historyMap[dateStr].total += parseFloat(m.score || 0);
      historyMap[dateStr].count++;
    });

    const result = Object.values(historyMap)
      .sort((a, b) => a.timestamp - b.timestamp)
      .map(h => ({
        date: h.date,
        score: Math.round(h.total / h.count)
      }));

    return res.status(200).json({ success: true, data: result });
  } catch (err) {
    console.error('performance-history error:', err);
    return res.status(500).json({ success: false, message: 'Failed to fetch performance history' });
  }
});

/**
 * POST /candidates/coding-stats
 * Upserts coding pass/fail counts for a question.
 */
router.post('/coding-stats', authMiddleware, async (req, res) => {
  const { candidateId, codingQuestionId, passedCount, failedCount } = req.body;
  if (!candidateId || !codingQuestionId) {
    return res.status(400).json({ success: false, message: 'candidateId and codingQuestionId are required' });
  }

  try {
    await pool.query(`
      INSERT INTO \`${DB_NAME}\`.candidate_coding_stats (candidateId, codingQuestionId, passedCount, failedCount)
      VALUES (?, ?, ?, ?)
      ON DUPLICATE KEY UPDATE 
        passedCount = VALUES(passedCount),
        failedCount = VALUES(failedCount),
        updatedAt = CURRENT_TIMESTAMP
    `, [candidateId, codingQuestionId, passedCount || 0, failedCount || 0]);

    return res.status(200).json({ success: true, message: 'Coding stats updated successfully' });
  } catch (err) {
    console.error('coding-stats upsert error:', err);
    return res.status(500).json({ success: false, message: 'Failed to update coding stats' });
  }
});

/**
 * GET /candidates/coding-analytics/:candidateId
 * Returns composed data (Pass/Fail bars + Attempts line) from MySQL
 */
router.get('/coding-analytics/:candidateId', authMiddleware, async (req, res) => {
  const { candidateId } = req.params;
  const { startDate, endDate, range = 'monthly' } = req.query;
  
  try {
    let since;
    let until = new Date();

    if (startDate && endDate) {
      since = new Date(startDate);
      until = new Date(endDate);
    } else {
      const days = range === 'weekly' ? 7 : 30;
      since = new Date();
      since.setDate(since.getDate() - days);
    }

    const [rows] = await pool.query(`
      SELECT 
        DATE_FORMAT(updatedAt, '%m-%d') as date,
        SUM(passedCount) as passed,
        SUM(failedCount) as failed,
        COUNT(DISTINCT codingQuestionId) as questions
      FROM \`${DB_NAME}\`.candidate_coding_stats
      WHERE candidateId = ? AND updatedAt >= ? AND updatedAt <= ?
      GROUP BY DATE_FORMAT(updatedAt, '%m-%d')
      ORDER BY MIN(updatedAt) ASC
    `, [candidateId, since, until]);

    return res.status(200).json({ success: true, data: rows });
  } catch (err) {
    console.error('coding-analytics error:', err);
    return res.status(500).json({ success: false, message: 'Failed to fetch coding analytics' });
  }
});

/**
 * GET /candidates/fake-offer/history
 * Fetches the latest 5 verification results for the candidate.
 */
router.get('/fake-offer/history', authMiddleware, async (req, res) => {
  try {
    const candidateId = req.user.id;
    const fakeOfferCol = await getCollection(COLLECTIONS.FAKE_OFFER_RESPONSES);
    const history = await fakeOfferCol.find({ candidateId })
      .sort({ createdAt: -1 })
      .limit(5)
      .toArray();

    return res.status(200).json({ success: true, data: history });
  } catch (err) {
    console.error('Fetch fake offer history error:', err);
    return res.status(500).json({ success: false, message: 'Failed to fetch scan history' });
  }
});

/**
 * POST /candidates/fake-offer/verify
 * Multipart: offerLetter (file), companyName, website, address, ctc
 * Extracts text from PDF and calls Streaming AI for fraud analysis.
 */
router.post('/fake-offer/verify', authMiddleware, tenantMiddleware, upload.single('offerLetter'), async (req, res) => {
  try {
    const { companyName, website, address, ctc } = req.body;
    const file = req.file;

    if (!file) {
      return res.status(400).json({ success: false, message: 'Offer letter file is required' });
    }

    // Extract text from PDF
    let text = '';
    if (file.mimetype === 'application/pdf' || file.originalname.toLowerCase().endsWith('.pdf')) {
      const dataBuffer = fs.readFileSync(file.path);
      const data = await pdf(dataBuffer);
      text = data.text;
    } else {
      // For now, only PDF is supported for text extraction in this route
      // We could add mammoth for .docx if needed
      return res.status(400).json({ success: false, message: 'Only PDF files are supported for AI scanning' });
    }

    if (!text || text.trim().length < 50) {
      return res.status(400).json({ success: false, message: 'Could not extract sufficient text from the document' });
    }

    const STREAMING_AI_URL = process.env.STREAMING_AI_URL || 'http://127.0.0.1:9000';
    console.log(`Calling Streaming AI: ${STREAMING_AI_URL}/fake-offer/verify`);
    
    const aiResponse = await axios.post(`${STREAMING_AI_URL}/fake-offer/verify`, {
      text,
      companyName,
      website,
      address,
      ctc
    });

    const aiData = aiResponse.data;

    // Save to MongoDB with 5-record limit
    try {
      const fakeOfferCol = await getCollection(COLLECTIONS.FAKE_OFFER_RESPONSES);
      const candidateId = req.user?.id || 'anonymous';
      
      const newRecord = {
        candidateId,
        companyName,
        website,
        address,
        ctc,
        analysis: aiData,
        createdAt: new Date().toISOString()
      };

      await fakeOfferCol.insertOne(newRecord);

      // Prune old records: keep only latest 5
      const allRecords = await fakeOfferCol.find({ candidateId })
        .sort({ createdAt: -1 })
        .toArray();

      if (allRecords.length > 5) {
        const toDeleteIds = allRecords.slice(5).map(r => r._id);
        if (toDeleteIds.length > 0) {
          await fakeOfferCol.deleteMany({ _id: { $in: toDeleteIds } });
        }
      }
    } catch (mongoErr) {
      console.error('Mongo saving error:', mongoErr);
      // Don't fail the entire request if saving fails, but log it
    }

    return res.status(200).json({
      success: true,
      data: aiData
    });

  } catch (err) {
    console.error('Fake offer verification error:', err);
    return res.status(500).json({ 
      success: false, 
      message: err.response?.data?.detail || err.message || 'Failed to analyze offer letter',
      debug: {
        url: err.config?.url,
        status: err.response?.status
      }
    });
  } finally {
    // Cleanupuploaded file
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }
  }
});

module.exports = router;




