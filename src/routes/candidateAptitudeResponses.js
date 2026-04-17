const express = require('express');
const { randomUUID } = require('crypto');
const { getCollection, COLLECTIONS } = require('../config/mongo');

const router = express.Router();

function nowIso() {
  return new Date().toISOString();
}

function toInt(value, fallback = 0) {
  const n = Number(value);
  return Number.isFinite(n) ? n : fallback;
}

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

function normalizeGeneratedQuestions(raw) {
  if (!Array.isArray(raw)) return [];
  return raw.map((q, i) => ({
    id: String(q?.id || randomUUID()),
    question: q?.question || '',
    options: Array.isArray(q?.options) ? q.options : [],
    correctAnswer: q?.correctAnswer || '',
    topic: q?.topic || '',
    order: toInt(q?.order, i + 1),
  }));
}

function normalizeSelectedAnswers(raw) {
  if (!Array.isArray(raw)) return [];
  return raw
    .map((item, index) => ({
      questionId: String(item?.questionId || ''),
      questionOrder: toInt(item?.questionOrder, index + 1),
      selectedOptionKey: String(item?.selectedOptionKey ?? item?.optionKey ?? ''),
      selectedOptionText: String(item?.selectedOptionText ?? item?.text ?? ''),
      isCorrect: typeof item?.isCorrect === 'boolean' ? item.isCorrect : null,
      answeredAt: item?.answeredAt || nowIso(),
    }))
    .filter((item) => item.questionId);
}

// POST /candidate-aptitude-responses/upsert
router.post('/upsert', async (req, res) => {
  const {
    candidateId,
    positionId,
    questionSetId,
    totalQuestions,
    generatedQuestions,
    selectedAnswers,
    isScreeningCompleted,
    completedAt,
    totalAnswered,
  } = req.body || {};
  if (!candidateId || !positionId) {
    return res.status(400).json({ success: false, message: 'candidateId and positionId are required' });
  }

  try {
    const col = await getCollection(COLLECTIONS.APTITUDE_RESPONSES);
    const existing = await col.findOne(candidatePositionQuery(candidateId, positionId), { projection: { _id: 0 } });
    const now = nowIso();
    const normalized = normalizeGeneratedQuestions(generatedQuestions);
    const normalizedAnswers = normalizeSelectedAnswers(selectedAnswers);

    if (existing) {
      const updates = {
        updatedAt: now,
      };
      if (questionSetId !== undefined) updates.questionSetId = questionSetId || '';
      if (totalQuestions !== undefined) updates.totalQuestions = toInt(totalQuestions, normalized.length || existing.totalQuestions || 0);
      if (Array.isArray(generatedQuestions) && normalized.length > 0) {
        updates.generatedQuestions = normalized;
      }
      if (Array.isArray(selectedAnswers)) {
        updates.selectedAnswers = normalizedAnswers;
        updates.totalAnswered = normalizedAnswers.length;
      }
      if (totalAnswered !== undefined) {
        updates.totalAnswered = toInt(totalAnswered, normalizedAnswers.length || existing.totalAnswered || 0);
      }
      if (isScreeningCompleted !== undefined) {
        updates.isScreeningCompleted = Boolean(isScreeningCompleted);
      }
      if (completedAt !== undefined) {
        updates.completedAt = completedAt || null;
      }

      await col.updateOne(candidatePositionQuery(candidateId, positionId), { $set: updates });
      const refreshed = await col.findOne(candidatePositionQuery(candidateId, positionId), { projection: { _id: 0 } });
      return res.status(200).json({ success: true, id: refreshed.id, responseId: refreshed.id, record: refreshed, message: 'Updated' });
    }

    const doc = {
      id: randomUUID(),
      candidateId,
      positionId,
      questionSetId: questionSetId || '',
      totalQuestions: toInt(totalQuestions, normalized.length),
      generatedQuestions: normalized,
      selectedAnswers: normalizedAnswers,
      totalAnswered: toInt(totalAnswered, normalizedAnswers.length),
      isScreeningCompleted: Boolean(isScreeningCompleted),
      completedAt: completedAt || null,
      createdAt: now,
      updatedAt: now,
    };

    await col.insertOne(doc);
    return res.status(201).json({ success: true, id: doc.id, responseId: doc.id, record: doc, message: 'Created' });
  } catch (err) {
    console.error('[candidate-aptitude-responses] upsert error:', err);
    return res.status(500).json({ success: false, message: err.message });
  }
});

// PUT /candidate-aptitude-responses/:id
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const col = await getCollection(COLLECTIONS.APTITUDE_RESPONSES);
    const existing = await col.findOne({ id }, { projection: { _id: 0 } });
    if (!existing) {
      return res.status(404).json({ success: false, message: 'Aptitude response not found' });
    }

    const updates = { updatedAt: nowIso() };
    if (Array.isArray(req.body?.generatedQuestions)) {
      updates.generatedQuestions = normalizeGeneratedQuestions(req.body.generatedQuestions);
      updates.totalQuestions = updates.generatedQuestions.length;
    }
    if (Array.isArray(req.body?.selectedAnswers)) {
      updates.selectedAnswers = normalizeSelectedAnswers(req.body.selectedAnswers);
      updates.totalAnswered = updates.selectedAnswers.length;
    }
    if (req.body?.totalAnswered !== undefined) {
      updates.totalAnswered = toInt(req.body.totalAnswered, updates.selectedAnswers?.length || existing.totalAnswered || 0);
    }
    if (req.body?.isScreeningCompleted !== undefined) {
      updates.isScreeningCompleted = Boolean(req.body.isScreeningCompleted);
    }
    if (req.body?.completedAt !== undefined) {
      updates.completedAt = req.body.completedAt || null;
    }
    if (req.body?.questionSetId !== undefined) {
      updates.questionSetId = req.body.questionSetId || '';
    }

    await col.updateOne({ id }, { $set: updates });
    const refreshed = await col.findOne({ id }, { projection: { _id: 0 } });
    return res.status(200).json({ success: true, id: refreshed.id, responseId: refreshed.id, record: refreshed, message: 'Updated' });
  } catch (err) {
    console.error('[candidate-aptitude-responses] update error:', err);
    return res.status(500).json({ success: false, message: err.message });
  }
});

// GET /candidate-aptitude-responses/generated-questions?candidateId=&positionId=&questionSetId=
router.get('/generated-questions', async (req, res) => {
  const { candidateId, positionId, questionSetId } = req.query;
  if (!candidateId || !positionId) {
    return res.status(400).json({ success: false, message: 'candidateId and positionId are required' });
  }
  try {
    const col = await getCollection(COLLECTIONS.APTITUDE_RESPONSES);
    const query = candidatePositionQuery(String(candidateId), String(positionId));
    if (questionSetId) query.questionSetId = String(questionSetId);
    let doc = await col.findOne(query, { projection: { _id: 0 } });

    if (!doc && questionSetId) {
      doc = await col.findOne(candidatePositionQuery(String(candidateId), String(positionId)), { projection: { _id: 0 } });
    }

    if (!doc) {
      return res.status(404).json({ success: false, message: 'Aptitude response not found' });
    }

    return res.status(200).json({
      success: true,
      id: doc.id,
      totalQuestions: doc.totalQuestions || 0,
      questions: Array.isArray(doc.generatedQuestions) ? doc.generatedQuestions : [],
      record: doc,
    });
  } catch (err) {
    console.error('[candidate-aptitude-responses] generated-questions error:', err);
    return res.status(500).json({ success: false, message: err.message });
  }
});

// GET /candidate-aptitude-responses/candidate/:candidateId/position/:positionId
router.get('/candidate/:candidateId/position/:positionId', async (req, res) => {
  const { candidateId, positionId } = req.params;
  try {
    const col = await getCollection(COLLECTIONS.APTITUDE_RESPONSES);
    const doc = await col.findOne(candidatePositionQuery(candidateId, positionId), { projection: { _id: 0 } });
    if (!doc) {
      return res.status(404).json({ success: false, message: 'Aptitude response not found' });
    }
    return res.status(200).json(doc);
  } catch (err) {
    console.error('[candidate-aptitude-responses] fetch error:', err);
    return res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;