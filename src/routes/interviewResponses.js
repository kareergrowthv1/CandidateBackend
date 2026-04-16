/**
 * MongoDB-backed interview responses for Round 1 & 2.
 * Collection: candidate_interview_responses
 * Document structure:
 *   { candidateId, positionId, questionSetId,
 *     categories: {
 *       generalQuestion: { conversationSets: { conversationQuestion1: [{question, answer, answerTime, prepareTime}] } },
 *       positionSpecificQuestion: { conversationSets: { ... } }
 *     },
 *     isScreeningCompleted, createdAt, updatedAt }
 *
 * Routes:
 *   GET  /candidate/interview-responses?candidateId=&positionId=
 *   POST /candidate/interview-responses
 *   PATCH /candidate/interview-responses
 */
const express = require('express');
const router = express.Router();
const { getCollection, COLLECTIONS } = require('../config/mongo');

function idVariants(id) {
  const raw = String(id || '').trim();
  const compact = raw.replace(/-/g, '').toLowerCase();
  const out = new Set([raw]);
  if (compact.length === 32) {
    const dashed = `${compact.slice(0, 8)}-${compact.slice(8, 12)}-${compact.slice(12, 16)}-${compact.slice(16, 20)}-${compact.slice(20)}`;
    out.add(compact);
    out.add(dashed);
  }
  return Array.from(out).filter(Boolean);
}

function candidatePositionQuery(candidateId, positionId) {
  return {
    candidateId: { $in: idVariants(candidateId) },
    positionId: { $in: idVariants(positionId) },
  };
}

// GET /candidate/interview-responses?candidateId=&positionId=
router.get('/interview-responses', async (req, res) => {
  const { candidateId, positionId } = req.query;
  if (!candidateId || !positionId) {
    return res.status(400).json({ success: false, message: 'candidateId and positionId are required' });
  }
  try {
    const col = await getCollection(COLLECTIONS.INTERVIEW_RESPONSES);
    const doc = await col.findOne(candidatePositionQuery(candidateId, positionId), { projection: { _id: 0 } });
    if (!doc) {
      return res.status(404).json({ success: false, message: 'Interview response not found' });
    }
    return res.status(200).json({ success: true, data: doc });
  } catch (err) {
    console.error('[interview-responses] GET error:', err);
    return res.status(500).json({ success: false, message: err.message });
  }
});

// POST /candidate/interview-responses  — create or return existing (idempotent)
router.post('/interview-responses', async (req, res) => {
  const { candidateId, positionId, questionSetId, categories } = req.body;
  if (!candidateId || !positionId) {
    return res.status(400).json({ success: false, message: 'candidateId and positionId are required' });
  }
  try {
    const col = await getCollection(COLLECTIONS.INTERVIEW_RESPONSES);
    const existing = await col.findOne(candidatePositionQuery(candidateId, positionId), { projection: { _id: 0 } });
    if (existing) {
      return res.status(200).json({ success: true, data: existing, message: 'Already exists' });
    }
    const now = new Date().toISOString();
    const doc = {
      candidateId,
      positionId,
      questionSetId: questionSetId || '',
      categories: categories || {},
      isScreeningCompleted: false,
      createdAt: now,
      updatedAt: now,
    };
    await col.insertOne(doc);
    const inserted = await col.findOne(candidatePositionQuery(candidateId, positionId), { projection: { _id: 0 } });
    return res.status(201).json({ success: true, data: inserted, message: 'Created' });
  } catch (err) {
    console.error('[interview-responses] POST error:', err);
    return res.status(500).json({ success: false, message: err.message });
  }
});

/**
 * PATCH /candidate/interview-responses
 *
 * Supported body patterns:
 *   1. Single answer update:
 *      { candidateId, positionId, round, convKey, pairIdx, answer }
 *
 *   2. Append cross-question pair (answer starts empty):
 *      { candidateId, positionId, round, convKey, appendQuestion, appendAnswerTime?, appendPrepareTime? }
 *
 *   3. Mark screening complete:
 *      { candidateId, positionId, isScreeningCompleted: true }
 */
router.patch('/interview-responses', async (req, res) => {
  const {
    candidateId, positionId,
    round, convKey, pairIdx, answer,
    appendQuestion, appendAnswerTime, appendPrepareTime,
    isScreeningCompleted,
  } = req.body;

  if (!candidateId || !positionId) {
    return res.status(400).json({ success: false, message: 'candidateId and positionId are required' });
  }

  try {
    const col = await getCollection(COLLECTIONS.INTERVIEW_RESPONSES);

    const $set = { updatedAt: new Date().toISOString() };
    let $push = null;

    if (round && convKey) {
      const catKey = (Number(round) === 1) ? 'generalQuestion' : 'positionSpecificQuestion';
      const basePath = `categories.${catKey}.conversationSets.${convKey}`;

      if (appendQuestion !== undefined) {
        // Append a new cross-question pair
        $push = {
          [basePath]: {
            question: appendQuestion,
            answer: '',
            answerTime: Number(appendAnswerTime) || 120,
            prepareTime: Number(appendPrepareTime) || 10,
          },
        };
      } else if (pairIdx !== undefined && answer !== undefined) {
        // Set the answer for one specific pair
        $set[`${basePath}.${pairIdx}.answer`] = answer;
      }
    }

    if (isScreeningCompleted !== undefined) {
      $set.isScreeningCompleted = Boolean(isScreeningCompleted);
    }

    // Require at least one meaningful field change
    if (Object.keys($set).length <= 1 && !$push) {
      return res.status(400).json({ success: false, message: 'No valid fields to update' });
    }

    const updateOp = { $set };
    if ($push) updateOp.$push = $push;

    const result = await col.updateOne(candidatePositionQuery(candidateId, positionId), updateOp);
    if (result.matchedCount === 0) {
      return res.status(404).json({ success: false, message: 'Interview response not found' });
    }

    const updated = await col.findOne(candidatePositionQuery(candidateId, positionId), { projection: { _id: 0 } });
    return res.status(200).json({ success: true, data: updated });
  } catch (err) {
    console.error('[interview-responses] PATCH error:', err);
    return res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
