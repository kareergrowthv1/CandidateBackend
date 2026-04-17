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

// GET /internal/streaming/report-document?positionId=&candidateId=&clientId=
router.get('/report-document', async (req, res) => {
  const { positionId, candidateId, clientId } = req.query;

  if (!positionId || !candidateId) {
    return res.status(400).json({ success: false, message: 'positionId and candidateId are required' });
  }

  try {
    const col = await getCollection(COLLECTIONS.ASSESSMENT_REPORTS);
    const query = { positionId: String(positionId), candidateId: String(candidateId) };
    if (clientId) query.clientId = String(clientId);

    let doc = await col.findOne(query, { projection: { _id: 0 } });
    if (!doc && clientId) {
      doc = await col.findOne(
        { positionId: String(positionId), candidateId: String(candidateId) },
        { projection: { _id: 0 } }
      );
    }

    if (!doc) {
      return res.status(404).json({ success: false, message: 'Report not found' });
    }

    return res.status(200).json({ success: true, data: doc });
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
    const filter = { positionId: String(positionId), candidateId: String(candidateId) };

    const nowIso = new Date().toISOString();
    const baseUpdate = {
      ...payload,
      positionId: String(positionId),
      candidateId: String(candidateId),
      updatedAt: nowIso,
    };

    if (mode === 'patch') {
      await col.updateOne(
        filter,
        { $set: baseUpdate, $setOnInsert: { createdAt: nowIso } },
        { upsert: true }
      );
    } else {
      await col.updateOne(
        filter,
        { $set: baseUpdate, $setOnInsert: { createdAt: nowIso } },
        { upsert: true }
      );
    }

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
