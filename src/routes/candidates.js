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
 * Returns existing candidate by email + organizationId so frontend can skip POST /add when linking.
 * Response: 200 { success: true, data: { id, name, mobileNumber, ... } } or 200 { success: false }.
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
              current_role as currentRole, location, academic_year as academicYear, skills
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
        skills: row.skills || []
      }
    });
  } catch (err) {
    console.error('check-mail error:', err);
    return res.status(500).json({ success: false, message: err.message || 'Check failed' });
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
              resume_filename as resumeFilename, resume_url as resumeUrl, status, created_at as createdAt
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
      skills: row.skills || []
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
router.get('/dashboard-stats/:candidateId', authMiddleware, async (req, res) => {
  const { candidateId } = req.params;

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

    // 3. Practice stats from MongoDB (via mongoose/collection)
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

    // 4. Applied jobs (placeholder — update once applied_jobs table exists)
    const appliedJobs = 0;

    return res.status(200).json({
      success: true,
      data: {
        stats: {
          totalJobs,
          appliedJobs,
          solvedCount,
          totalStars,
          practiceCount,
        },
        latestJobs,
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

module.exports = router;
