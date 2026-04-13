const express = require('express');
const router = express.Router();
const { pool, DB_NAME } = require('../config/db');
const tenantMiddleware = require('../middlewares/tenant.middleware');

/** DB where assessments_summary table exists. Use tenant DB from req.tenantDb. */
function getAssessmentSummaryDb(req) {
  return req?.tenantDb || 'candidates_db';
}

function toCleanAssessmentData(raw) {
  if (!raw || typeof raw !== 'object') return raw;
  const hexToUuid = (val) => {
    if (val == null) return null;
    const s = (typeof val === 'string' ? val : (Buffer.isBuffer(val) ? val.toString('hex') : String(val))).replace(/-/g, '').toLowerCase();
    return s.length === 32 ? [s.slice(0, 8), s.slice(8, 12), s.slice(12, 16), s.slice(16, 20), s.slice(20)].join('-') : val;
  };
  const toBool = (v) => (Buffer.isBuffer(v) ? v[0] === 1 : Boolean(v));
  const toDateStr = (v) => (v ? (v instanceof Date ? v.toISOString().slice(0, 19).replace('T', ' ') : String(v).slice(0, 19).replace('T', ' ')) : null);
  
  return {
    id: hexToUuid(raw.id),
    positionId: hexToUuid(raw.positionId || raw.position_id),
    candidateId: hexToUuid(raw.candidateId || raw.candidate_id),
    questionId: hexToUuid(raw.questionId || raw.question_id),
    totalRoundsAssigned: Number(raw.totalRoundsAssigned || raw.total_rounds_assigned) || 0,
    totalRoundsCompleted: Number(raw.totalRoundsCompleted || raw.total_rounds_completed) || 0,
    totalInterviewTime: raw.totalInterviewTime ?? raw.total_interview_time ?? null,
    totalCompletionTime: raw.totalCompletionTime ?? raw.total_completion_time ?? null,
    assessmentStartTime: raw.assessmentStartTime ?? raw.assessment_start_time ?? null,
    assessmentEndTime: raw.assessmentEndTime ?? raw.assessment_end_time ?? null,
    round1Assigned: toBool(raw.round1Assigned ?? raw.round1_assigned),
    round1Completed: toBool(raw.round1Completed ?? raw.round1_completed),
    round1TimeTaken: raw.round1TimeTaken ?? raw.round1_time_taken ?? null,
    round1StartTime: raw.round1StartTime ?? raw.round1_start_time ?? null,
    round1EndTime: raw.round1EndTime ?? raw.round1_end_time ?? null,
    round2Assigned: toBool(raw.round2Assigned ?? raw.round2_assigned),
    round2Completed: toBool(raw.round2Completed ?? raw.round2_completed),
    round2TimeTaken: raw.round2TimeTaken ?? raw.round2_time_taken ?? null,
    round2StartTime: raw.round2StartTime ?? raw.round2_start_time ?? null,
    round2EndTime: raw.round2EndTime ?? raw.round2_end_time ?? null,
    round3Assigned: toBool(raw.round3Assigned ?? raw.round3_assigned),
    round3Completed: toBool(raw.round3Completed ?? raw.round3_completed),
    round3TimeTaken: raw.round3TimeTaken ?? raw.round3_time_taken ?? null,
    round3StartTime: raw.round3StartTime ?? raw.round3_start_time ?? null,
    round3EndTime: raw.round3EndTime ?? raw.round3_end_time ?? null,
    round4Assigned: toBool(raw.round4Assigned ?? raw.round4_assigned),
    round4Completed: toBool(raw.round4Completed ?? raw.round4_completed),
    round4TimeTaken: raw.round4TimeTaken ?? raw.round4_time_taken ?? null,
    round4StartTime: raw.round4StartTime ?? raw.round4_start_time ?? null,
    round4EndTime: raw.round4EndTime ?? raw.round4_end_time ?? null,
    isAssessmentCompleted: toBool(raw.isAssessmentCompleted ?? raw.is_assessment_completed),
    isReportGenerated: toBool(raw.isReportGenerated ?? raw.is_report_generated),
    createdAt: toDateStr(raw.createdAt || raw.created_at),
    updatedAt: toDateStr(raw.updatedAt || raw.updated_at)
  };
}

/**
 * GET /candidate/assessment-summary?candidateId=...&positionId=...
 */
router.get('/assessment-summary', async (req, res) => {
  try {
    const { candidateId, positionId } = req.query;
    if (!candidateId || !positionId) {
      return res.status(400).json({ success: false, message: 'candidateId and positionId are required' });
    }
    const dbName = getAssessmentSummaryDb(req);
    const query = `
      SELECT * FROM \`${dbName}\`.assessments_summary 
      WHERE (candidate_id = UNHEX(?) OR candidate_id = ?)
        AND (position_id = UNHEX(?) OR position_id = ?)
      LIMIT 1
    `;
    const candHex = candidateId.replace(/-/g, '');
    const posHex = positionId.replace(/-/g, '');
    const [rows] = await pool.query(query, [candHex, candidateId, posHex, positionId]);
    
    if (rows.length === 0) {
      return res.status(200).json({
        success: true,
        message: 'No assessment summary found; returning defaults',
        data: toCleanAssessmentData({
          candidateId, positionId, totalRoundsAssigned: 4, totalRoundsCompleted: 0
        })
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Assessment summary retrieved successfully',
      data: toCleanAssessmentData(rows[0])
    });
  } catch (error) {
    console.error('Error fetching assessment summary:', error);
    return res.status(500).json({ success: false, message: error.message });
  }
});

/**
 * POST /candidate/assessment-summary
 */
router.post('/assessment-summary', async (req, res) => {
  try {
    const { positionId, candidateId, questionId, ...rest } = req.body;
    if (!positionId || !candidateId) {
      return res.status(400).json({ success: false, message: 'positionId and candidateId are required' });
    }
    const dbName = getAssessmentSummaryDb(req);
    const candHex = candidateId.replace(/-/g, '');
    const posHex = positionId.replace(/-/g, '');
    const qHex = (questionId || '').replace(/-/g, '');

    const checkQuery = `SELECT id FROM \`${dbName}\`.assessments_summary WHERE candidate_id = UNHEX(?) AND position_id = UNHEX(?)`;
    const [existing] = await pool.query(checkQuery, [candHex, posHex]);

    if (existing.length > 0) {
      return res.status(200).json({ success: true, message: 'Already exists', data: { id: existing[0].id } });
    }

    const insertQuery = `
      INSERT INTO \`${dbName}\`.assessments_summary (
        id, position_id, candidate_id, question_id, 
        total_rounds_assigned, total_rounds_completed, 
        round1_assigned, round2_assigned, round3_assigned, round4_assigned,
        round1_completed, round2_completed, round3_completed, round4_completed,
        is_assessment_completed, is_report_generated, created_at, updated_at
      ) VALUES (
        UUID_TO_BIN(UUID()), UNHEX(?), UNHEX(?), UNHEX(?), 
        ?, ?, 
        ?, ?, ?, ?,
        0, 0, 0, 0,
        0, 0, NOW(), NOW()
      )
    `;
    const params = [
      posHex, candHex, qHex || null,
      rest.totalRoundsAssigned ?? 4, rest.totalRoundsCompleted ?? 0,
      rest.round1Assigned ?? 1, rest.round2Assigned ?? 1, rest.round3Assigned ?? 1, rest.round4Assigned ?? 1
    ];
    await pool.query(insertQuery, params);
    
    return res.status(201).json({ success: true, message: 'Assessment summary created' });
  } catch (error) {
    console.error('Error creating assessment summary:', error);
    return res.status(500).json({ success: false, message: error.message });
  }
});

/**
 * PATCH /candidate/assessment-summary
 */
router.patch('/assessment-summary', async (req, res) => {
  try {
    const { candidateId, positionId, ...rest } = req.body;
    if (!candidateId || !positionId) {
      return res.status(400).json({ success: false, message: 'candidateId and positionId are required' });
    }
    const dbName = getAssessmentSummaryDb(req);
    const candHex = candidateId.replace(/-/g, '');
    const posHex = positionId.replace(/-/g, '');

    const updates = [];
    const params = [];

    const fieldMap = {
      questionId: 'question_id',
      totalRoundsAssigned: 'total_rounds_assigned',
      totalRoundsCompleted: 'total_rounds_completed',
      round1StartTime: 'round1_start_time',
      round1EndTime: 'round1_end_time',
      round1Completed: 'round1_completed',
      round2StartTime: 'round2_start_time',
      round2EndTime: 'round2_end_time',
      round2Completed: 'round2_completed',
      round3StartTime: 'round3_start_time',
      round3EndTime: 'round3_end_time',
      round3Completed: 'round3_completed',
      round4StartTime: 'round4_start_time',
      round4EndTime: 'round4_end_time',
      round4Completed: 'round4_completed',
      isAssessmentCompleted: 'is_assessment_completed',
      assessmentStartTime: 'assessment_start_time',
      assessmentEndTime: 'assessment_end_time'
    };

    for (const [key, val] of Object.entries(rest)) {
      if (fieldMap[key]) {
        if (key === 'questionId' && val) {
          updates.push(`${fieldMap[key]} = UNHEX(?)`);
          params.push(val.replace(/-/g, ''));
        } else {
          updates.push(`${fieldMap[key]} = ?`);
          params.push(val);
        }
      }
    }

    if (updates.length === 0) {
      return res.status(400).json({ success: false, message: 'No fields to update' });
    }

    params.push(candHex, posHex);
    const updateQuery = `
      UPDATE \`${dbName}\`.assessments_summary 
      SET ${updates.join(', ')}, updated_at = NOW()
      WHERE candidate_id = UNHEX(?) AND position_id = UNHEX(?)
    `;

    const [result] = await pool.query(updateQuery, params);
    if (result.affectedRows === 0) {
      console.log(`[assessment-summary] Record not found for candidate ${candidateId} / position ${positionId}. Attempting self-healing INSERT.`);
      // Self-healing: if update fails, attempt to create the record
      try {
        const insertQuery = `
          INSERT IGNORE INTO \`${dbName}\`.assessments_summary (
            id, position_id, candidate_id, question_id, 
            total_rounds_assigned, total_rounds_completed, 
            round1_assigned, round2_assigned, round3_assigned, round4_assigned,
            round1_completed, round2_completed, round3_completed, round4_completed,
            is_assessment_completed, is_report_generated, created_at, updated_at
          ) VALUES (
            UUID_TO_BIN(UUID()), UNHEX(?), UNHEX(?), UNHEX(?), 
            ?, ?, 
            ?, ?, ?, ?,
            ?, ?, ?, ?,
            ?, 0, NOW(), NOW()
          )
        `;
        const qHex = (rest.questionId || '').replace(/-/g, '');
        const iParams = [
          posHex, candHex, qHex || null,
          rest.totalRoundsAssigned ?? 4, rest.totalRoundsCompleted ?? 0,
          rest.round1Assigned ?? 1, rest.round2Assigned ?? 1, rest.round3Assigned ?? 1, rest.round4Assigned ?? 1,
          rest.round1Completed ?? 0, rest.round2Completed ?? 0, rest.round3Completed ?? 0, rest.round4Completed ?? 0,
          rest.isAssessmentCompleted ?? 0
        ];
        await pool.query(insertQuery, iParams);
        return res.status(200).json({ success: true, message: 'Assessment summary created (self-healed)' });
      } catch (insertError) {
        console.error('Self-healing insert failed:', insertError);
        return res.status(404).json({ success: false, message: 'Assessment summary not found and self-healing failed' });
      }
    }

    return res.status(200).json({ success: true, message: 'Assessment summary updated successfully' });
  } catch (error) {
    console.error('Error updating assessment summary:', error);
    return res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
