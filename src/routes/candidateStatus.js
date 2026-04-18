const express = require('express');
const router = express.Router();
const { pool, DB_NAME } = require('../config/db');
const tenantMiddleware = require('../middlewares/tenant.middleware');

/**
 * PUT /candidate-status/position/:positionId/candidate/:candidateId
 * Body: { status: string }
 * Updates the candidate status in the position-candidate mapping and overall profile.
 */
router.put('/position/:positionId/candidate/:candidateId', tenantMiddleware, async (req, res) => {
    const { positionId, candidateId } = req.params;
    const { status } = req.body;
    const tenantDb = req.tenantDb;

    if (!status) {
        return res.status(400).json({ success: false, message: 'Status is required' });
    }

    console.log(`[CandidateStatus] Updating status for candidate ${candidateId} at position ${positionId} in tenant ${tenantDb}`);

    try {
        const [tables] = await pool.query(
            `SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES 
             WHERE TABLE_SCHEMA = ? AND TABLE_NAME IN ('candidate_positions', 'position_candidates', 'job_candidates', 'ats_candidates')`,
            [tenantDb]
        );
        const existingTables = (tables || []).map(t => t.TABLE_NAME);
        console.log(`[CandidateStatus] Tables found in ${tenantDb}:`, existingTables);

        let updated = false;
        const posIdHex = positionId.replace(/-/g, '');
        const candIdHex = candidateId.replace(/-/g, '');

        if (existingTables.includes('candidate_positions')) {
            const [result] = await pool.query(
                `UPDATE \`${tenantDb}\`.candidate_positions 
                 SET recommendation_status = ?, status = ?, updated_at = NOW() 
                 WHERE (position_id = ? OR REPLACE(position_id, '-', '') = ?)
                   AND (candidate_id = ? OR REPLACE(candidate_id, '-', '') = ?)`,
                [status, status, positionId, posIdHex, candidateId, candIdHex]
            );
            console.log(`[CandidateStatus] candidate_positions update: matched=${result.affectedRows}, changed=${result.changedRows || 0}`);
            if (result.affectedRows > 0) updated = true;
        }

        if (!updated && existingTables.includes('position_candidates')) {
            const [result] = await pool.query(
                `UPDATE \`${tenantDb}\`.position_candidates 
                 SET recommendation = ?, updated_at = NOW() 
                 WHERE position_id = UNHEX(?) AND candidate_id = UNHEX(?)`,
                [status, posIdHex, candIdHex]
            );
            console.log(`[CandidateStatus] position_candidates update: matched=${result.affectedRows}, changed=${result.changedRows || 0}`);
            if (result.affectedRows > 0) updated = true;
        }

        if (!updated && existingTables.includes('job_candidates')) {
            const [result] = await pool.query(
                `UPDATE \`${tenantDb}\`.job_candidates 
                 SET recommendation = ?, updated_at = NOW() 
                 WHERE job_id = UNHEX(?) AND candidate_id = UNHEX(?)`,
                [status, posIdHex, candIdHex]
            );
            console.log(`[CandidateStatus] job_candidates update: matched=${result.affectedRows}, changed=${result.changedRows || 0}`);
            if (result.affectedRows > 0) updated = true;
        }

        if (!updated && existingTables.includes('ats_candidates')) {
            const [result] = await pool.query(
                `UPDATE \`${tenantDb}\`.ats_candidates 
                 SET stage = ?, updated_at = NOW() 
                 WHERE job_id = UNHEX(?) AND id = UNHEX(?)`,
                [status, posIdHex, candIdHex]
            );
            console.log(`[CandidateStatus] ats_candidates update: matched=${result.affectedRows}, changed=${result.changedRows || 0}`);
            if (result.affectedRows > 0) updated = true;
        }

        // 3. Update the overall status in the college_candidates table
        // We try both the tenant DB and the global candidates_db to ensure sync
        const updateOverallQuery = `UPDATE \`${tenantDb}\`.college_candidates SET status = ?, updated_at = NOW() WHERE candidate_id = ?`;
        await pool.query(updateOverallQuery, [status, candidateId]).catch(() => {
            // Silently fail if table doesn't exist in tenant DB
        });

        const updateGlobalQuery = `UPDATE \`${DB_NAME}\`.college_candidates SET status = ?, updated_at = NOW() WHERE candidate_id = ?`;
        await pool.query(updateGlobalQuery, [status, candidateId]).catch(() => {
            // Silently fail if table doesn't exist in global DB
        });

        // 4. Update assessment summary completion flag if status is TEST_COMPLETED
        if (status === 'TEST_COMPLETED') {
            const updateSummaryQuery = `UPDATE \`${DB_NAME}\`.assessments_summary SET isAssessmentCompleted = 1 WHERE candidateId = ? AND positionId = ?`;
            await pool.query(updateSummaryQuery, [candidateId, positionId]).catch(() => { });

            // 5. Trigger background report generation in StreamingAi
            const axios = require('axios');
            const streamingAiUrl = (process.env.STREAMING_AI_URL || 'https://streamingai.onrender.com').replace(/\/$/, '');
            
            // Try to resolve questionSetId and clientId from the assessment summary table
            let questionSetId = '';
            let resolvedClientId = req.headers['x-client-id'] || tenantDb || '';
            
            try {
                const [summaryRows] = await pool.query(
                    `SELECT question_id, BIN_TO_UUID(question_id) as questionSetId 
                     FROM \`${DB_NAME}\`.assessments_summary 
                     WHERE candidateId = ? AND positionId = ? LIMIT 1`,
                    [candidateId, positionId]
                );
                if (summaryRows && summaryRows[0]) {
                    questionSetId = summaryRows[0].questionSetId || '';
                }
            } catch (sumErr) {
                console.warn(`[CandidateStatus] Could not fetch questionSetId for trigger: ${sumErr.message}`);
            }

            const reportPayload = {
                positionId,
                candidateId,
                clientId: resolvedClientId,
                tenantId: tenantDb,
                questionSetId: questionSetId
            };

            console.log(`[CandidateStatus] Triggering background report generation at ${streamingAiUrl}/report/generate (clientId: ${resolvedClientId}, questionSetId: ${questionSetId})`);
            axios.post(`${streamingAiUrl}/report/generate`, reportPayload)
                .then(r => console.log(`[CandidateStatus] Report generation triggered successfully: ${r.status}`))
                .catch(err => {
                    const status = err.response ? err.response.status : 'no_response';
                    console.error(`[CandidateStatus] Report trigger failed [${status}]: ${err.message}`);
                });
        }


        return res.status(200).json({
            success: true,
            message: `Candidate status updated to ${status}`,
            data: { status, updated }
        });

    } catch (err) {
        console.error('Candidate status update error:', err);
        return res.status(500).json({
            success: false,
            message: err.message || 'Failed to update candidate status'
        });
    }
});

module.exports = router;
