const express = require('express');
const { ObjectId } = require('mongodb');
const { getCollection, COLLECTIONS } = require('../config/mongo');

const router = express.Router();

function getServiceTokenFromReq(req) {
  const headerToken = req.header('x-service-token') || req.header('X-Service-Token');
  const auth = req.header('authorization') || req.header('Authorization') || '';
  const bearerToken = auth.toLowerCase().startsWith('bearer ') ? auth.slice(7).trim() : '';
  return (headerToken || bearerToken || '').trim();
}

function verifyServiceToken(req, res, next) {
  const expectedToken = (process.env.INTERNAL_SERVICE_TOKEN || '').trim();

  // Keep local/dev compatibility when token is not configured.
  if (!expectedToken) {
    return next();
  }

  const providedToken = getServiceTokenFromReq(req);
  if (!providedToken || providedToken !== expectedToken) {
    return res.status(401).json({ success: false, message: 'Unauthorized service token' });
  }

  return next();
}

router.use(verifyServiceToken);

const normalizeId = (id) => String(id || '').toLowerCase().replace(/-/g, '');

/**
 * GET /internal/streaming/report-document?positionId=&candidateId=&clientId=
 * Returns the report document from MongoDB. Handles both hyphenated and non-hyphenated UUID formats.
 */
router.get('/report-document', async (req, res) => {
  const { positionId, candidateId, clientId } = req.query;

  if (!positionId || !candidateId) {
    return res.status(400).json({ success: false, message: 'positionId and candidateId are required' });
  }

  try {
    const col = await getCollection(COLLECTIONS.ASSESSMENT_REPORTS);
    
    // Normalize IDs for comparison to handle format discrepancies
    const posNorm = normalizeId(positionId);
    const candNorm = normalizeId(candidateId);
    const posRaw = String(positionId);
    const candRaw = String(candidateId);

    // Broad query targeting common UUID string variations
    const idQuery = {
      positionId: { $in: [posRaw, posNorm] },
      candidateId: { $in: [candRaw, candNorm] }
    };

    // 1. Precise match: IDs + Provided ClientId
    if (clientId) {
      const doc = await col.findOne({ ...idQuery, clientId: String(clientId) }, { projection: { _id: 0 } });
      if (doc) return res.status(200).json({ success: true, data: doc });
    }

    // 2. Fallback: IDs + Shared/Empty ClientId (common for candidate-triggered reports)
    const docFallback = await col.findOne(
      { 
        ...idQuery, 
        $or: [
          { clientId: '' }, 
          { clientId: null }, 
          { clientId: { $exists: false } }
        ] 
      },
      { projection: { _id: 0 } }
    );
    if (docFallback) return res.status(200).json({ success: true, data: docFallback });

    // 3. Last fallback: Fetch ANY match for these IDs regardless of clientId
    const docAny = await col.findOne(idQuery, { projection: { _id: 0 } });
    if (docAny) return res.status(200).json({ success: true, data: docAny });

    return res.status(404).json({ 
      success: false, 
      message: 'Report not found in MongoDB',
      _diag: {
        posRaw, posNorm, candRaw, candNorm, clientId,
        searchedAt: new Date().toISOString(),
        v: 'v2-hyphen-agnostic'
      }
    });
  } catch (err) {
    console.error('[internal/streaming/report-document][GET]', err);
    return res.status(500).json({ success: false, message: err.message || 'Failed to fetch report' });
  }
});



async function upsertReportDocument(res, payload, mode = 'replace') {
  const { positionId, candidateId } = payload || {};

  if (!positionId || !candidateId) {
    return res.status(400).json({ success: false, message: 'positionId and candidateId are required' });
  }

  try {
    const col = await getCollection(COLLECTIONS.ASSESSMENT_REPORTS);
    
    // Normalize IDs for filtering to handle format discrepancies (stripping hyphens)
    const posNorm = normalizeId(positionId);
    const candNorm = normalizeId(candidateId);

    // Primary filter uses normalized IDs to prevent duplicates if format changes
    const filter = { positionId: posNorm, candidateId: candNorm };

    const nowIso = new Date().toISOString();
    const baseUpdate = {
      ...payload,
      positionId: posNorm,
      candidateId: candNorm,
      updatedAt: nowIso,
    };

    // Add original IDs as metadata if they differ from normalized
    if (String(positionId) !== posNorm) baseUpdate.positionId_raw = String(positionId);
    if (String(candidateId) !== candNorm) baseUpdate.candidateId_raw = String(candidateId);

    await col.updateOne(
      filter,
      { $set: baseUpdate, $setOnInsert: { createdAt: nowIso } },
      { upsert: true }
    );

    const saved = await col.findOne(filter, { projection: { _id: 0 } });
    return res.status(200).json({ success: true, data: saved });
  } catch (err) {
    console.error('[internal/streaming/report-document][UPSERT]', err);
    return res.status(500).json({ success: false, message: err.message || 'Failed to upsert report' });
  }
}


router.post('/report-document', async (req, res) => upsertReportDocument(res, req.body, 'replace'));
router.put('/report-document', async (req, res) => upsertReportDocument(res, req.body, 'replace'));
router.patch('/report-document', async (req, res) => upsertReportDocument(res, req.body, 'patch'));

// POST /internal/streaming/ai-mock/save-session
router.post('/ai-mock/save-session', async (req, res) => {
  const {
    sessionId, candidateId, round, roundTitle, mode, durationMinutes,
    concepts, questions, status, startedAt, completedAt,
    score, analysis,
  } = req.body || {};

  if (!candidateId || !round) {
    return res.status(400).json({ success: false, message: 'candidateId and round are required' });
  }

  try {
    const aimockCol = await getCollection(COLLECTIONS.AIMOCK_RESPONSES);
    const doc = {
      candidateId,
      round,
      roundTitle,
      mode,
      durationMinutes,
      concepts: concepts || [],
      questions: questions || [],
      status: status || 'completed',
      startedAt: startedAt || new Date().toISOString(),
      completedAt: completedAt || new Date().toISOString(),
      savedAt: new Date().toISOString(),
      score: score || 0,
      analysis: analysis || '',
    };

    if (sessionId) {
      let objectId = null;
      try {
        objectId = new ObjectId(sessionId);
      } catch (_) {
        return res.status(400).json({ success: false, message: 'Invalid sessionId' });
      }

      await aimockCol.updateOne({ _id: objectId }, { $set: doc });
      return res.status(200).json({ success: true, sessionId });
    }

    const result = await aimockCol.insertOne(doc);
    return res.status(200).json({ success: true, sessionId: String(result.insertedId) });
  } catch (err) {
    console.error('[internal/streaming/ai-mock/save-session]', err);
    return res.status(500).json({ success: false, message: err.message || 'Failed to save AI mock session' });
  }
});

module.exports = router;
