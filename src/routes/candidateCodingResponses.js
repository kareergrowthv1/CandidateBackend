const express = require('express');
const { randomUUID } = require('crypto');
const { getCollection, COLLECTIONS } = require('../config/mongo');

const router = express.Router();

function toInt(value, fallback = 0) {
  const n = Number(value);
  return Number.isFinite(n) ? n : fallback;
}

function nowIso() {
  return new Date().toISOString();
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

function ensureQuestionPath(doc, setIndex, questionIndex) {
  if (!Array.isArray(doc.codingQuestionSets)) doc.codingQuestionSets = [];
  while (doc.codingQuestionSets.length <= setIndex) {
    doc.codingQuestionSets.push({ questions: [] });
  }
  if (!Array.isArray(doc.codingQuestionSets[setIndex].questions)) {
    doc.codingQuestionSets[setIndex].questions = [];
  }

  while (doc.codingQuestionSets[setIndex].questions.length <= questionIndex) {
    doc.codingQuestionSets[setIndex].questions.push({
      questionTitle: '',
      questionDescription: '',
      timeLimit: 0,
      tags: [],
      constraints: '',
      followUpQuestions: [],
      sampleInputAndOutput: { input: '', output: '', explanation: '' },
      testCases: [],
      totalTestCases: 0,
      testCasesPassed: 0,
      executionStatus: 'NOT_STARTED',
      submissions: [],
      language: '',
      difficulty: '',
      functionSignature: '',
      inputFormat: '',
      outputFormat: '',
      constraintsList: [],
      examples: [],
      starterCode: '',
    });
  }

  return doc.codingQuestionSets[setIndex].questions[questionIndex];
}

function normalizeTestCases(rawCases) {
  if (!Array.isArray(rawCases)) return [];
  return rawCases.map((tc, i) => ({
    testCaseId: String(tc?.testCaseId || `tc_${i}`),
    input: tc?.input || '',
    expectedOutput: tc?.expectedOutput || tc?.output || '',
    actualOutput: tc?.actualOutput || '',
    isPassed: Boolean(tc?.isPassed),
    executionTime: tc?.executionTime || '',
    errorMessage: tc?.errorMessage || '',
    locked: Boolean(tc?.locked),
  }));
}

function normalizeSubmission(body, isFinalSubmission) {
  return {
    sourceCode: body?.sourceCode || '',
    programmingLanguage: body?.programmingLanguage || '',
    submittedAt: nowIso(),
    isFinalSubmission,
    status: isFinalSubmission ? 'SUBMITTED' : 'DRAFT',
    executionStatus: body?.executionStatus || (isFinalSubmission ? 'SUBMITTED' : 'IN_PROGRESS'),
    testCasesPassed: toInt(body?.testCasesPassed, 0),
    testCases: normalizeTestCases(body?.testCases),
  };
}

// POST /candidate-coding-responses/upsert
router.post('/upsert', async (req, res) => {
  const { candidateId, positionId, questionSetId, totalQuestions, codingQuestionSets } = req.body || {};
  if (!candidateId || !positionId) {
    return res.status(400).json({ success: false, message: 'candidateId and positionId are required' });
  }

  try {
    const col = await getCollection(COLLECTIONS.CODING_RESPONSES);
    const existing = await col.findOne(candidatePositionQuery(candidateId, positionId), { projection: { _id: 0 } });
    if (existing) {
      return res.status(200).json({ success: true, responseId: existing.id, record: existing, message: 'Already exists' });
    }

    const now = nowIso();
    const doc = {
      id: randomUUID(),
      candidateId,
      positionId,
      questionSetId: questionSetId || '',
      totalQuestions: toInt(totalQuestions, 0),
      codingQuestionSets: Array.isArray(codingQuestionSets) ? codingQuestionSets : [{ questions: [] }],
      isScreeningCompleted: false,
      createdAt: now,
      updatedAt: now,
    };

    await col.insertOne(doc);
    return res.status(201).json({ success: true, responseId: doc.id, record: doc, message: 'Created' });
  } catch (err) {
    console.error('[candidate-coding-responses] upsert error:', err);
    return res.status(500).json({ success: false, message: err.message });
  }
});

// GET /candidate-coding-responses/candidate/:candidateId/position/:positionId
router.get('/candidate/:candidateId/position/:positionId', async (req, res) => {
  const { candidateId, positionId } = req.params;
  try {
    const col = await getCollection(COLLECTIONS.CODING_RESPONSES);
    const doc = await col.findOne(candidatePositionQuery(candidateId, positionId), { projection: { _id: 0 } });
    if (!doc) {
      return res.status(404).json({ success: false, message: 'Coding response not found' });
    }
    return res.status(200).json(doc);
  } catch (err) {
    console.error('[candidate-coding-responses] fetch error:', err);
    return res.status(500).json({ success: false, message: err.message });
  }
});

// PUT /candidate-coding-responses/:id/set/:setIndex/question/:qIndex/content
router.put('/:id/set/:setIndex/question/:qIndex/content', async (req, res) => {
  const { id, setIndex, qIndex } = req.params;
  try {
    const col = await getCollection(COLLECTIONS.CODING_RESPONSES);
    const doc = await col.findOne({ id });
    if (!doc) return res.status(404).json({ success: false, message: 'Coding response not found' });

    const sIdx = toInt(setIndex, 0);
    const qIdx = toInt(qIndex, 0);
    const q = ensureQuestionPath(doc, sIdx, qIdx);

    const allowed = [
      'questionTitle', 'questionDescription', 'timeLimit', 'tags', 'constraints',
      'testCases', 'totalTestCases', 'followUpQuestions', 'sampleInputAndOutput',
      'language', 'difficulty', 'functionSignature', 'inputFormat', 'outputFormat',
      'constraintsList', 'examples', 'starterCode',
    ];

    for (const key of allowed) {
      if (Object.prototype.hasOwnProperty.call(req.body || {}, key)) {
        if (key === 'testCases') {
          q.testCases = normalizeTestCases(req.body.testCases);
          q.totalTestCases = q.testCases.length;
        } else {
          q[key] = req.body[key];
        }
      }
    }

    doc.updatedAt = nowIso();
    await col.updateOne({ id }, { $set: { codingQuestionSets: doc.codingQuestionSets, updatedAt: doc.updatedAt } });
    return res.status(200).json({ success: true, message: 'Question content saved' });
  } catch (err) {
    console.error('[candidate-coding-responses] save content error:', err);
    return res.status(500).json({ success: false, message: err.message });
  }
});

// PUT /candidate-coding-responses/:id/set/:setIndex/question/:qIndex/save
router.put('/:id/set/:setIndex/question/:qIndex/save', async (req, res) => {
  const { id, setIndex, qIndex } = req.params;
  try {
    const col = await getCollection(COLLECTIONS.CODING_RESPONSES);
    const doc = await col.findOne({ id });
    if (!doc) return res.status(404).json({ success: false, message: 'Coding response not found' });

    const sIdx = toInt(setIndex, 0);
    const qIdx = toInt(qIndex, 0);
    const q = ensureQuestionPath(doc, sIdx, qIdx);
    const submission = normalizeSubmission(req.body || {}, false);

    q.testCases = submission.testCases;
    q.totalTestCases = submission.testCases.length;
    q.testCasesPassed = submission.testCasesPassed;
    q.executionStatus = submission.executionStatus || 'IN_PROGRESS';
    if (!Array.isArray(q.submissions)) q.submissions = [];
    q.submissions.push(submission);

    doc.updatedAt = nowIso();
    await col.updateOne({ id }, { $set: { codingQuestionSets: doc.codingQuestionSets, updatedAt: doc.updatedAt } });
    return res.status(200).json({ success: true, message: 'Draft saved' });
  } catch (err) {
    console.error('[candidate-coding-responses] save draft error:', err);
    return res.status(500).json({ success: false, message: err.message });
  }
});

// PUT /candidate-coding-responses/:id/set/:setIndex/question/:qIndex/final
router.put('/:id/set/:setIndex/question/:qIndex/final', async (req, res) => {
  const { id, setIndex, qIndex } = req.params;
  try {
    const col = await getCollection(COLLECTIONS.CODING_RESPONSES);
    const doc = await col.findOne({ id });
    if (!doc) return res.status(404).json({ success: false, message: 'Coding response not found' });

    const sIdx = toInt(setIndex, 0);
    const qIdx = toInt(qIndex, 0);
    const q = ensureQuestionPath(doc, sIdx, qIdx);
    const submission = normalizeSubmission({ ...(req.body || {}), executionStatus: 'SUBMITTED' }, true);

    q.testCases = submission.testCases;
    q.totalTestCases = submission.testCases.length;
    q.testCasesPassed = submission.testCasesPassed;
    q.executionStatus = 'SUBMITTED';
    if (!Array.isArray(q.submissions)) q.submissions = [];
    q.submissions.push(submission);

    doc.updatedAt = nowIso();
    await col.updateOne({ id }, { $set: { codingQuestionSets: doc.codingQuestionSets, updatedAt: doc.updatedAt } });
    return res.status(200).json({ success: true, message: 'Question submitted' });
  } catch (err) {
    console.error('[candidate-coding-responses] final submit error:', err);
    return res.status(500).json({ success: false, message: err.message });
  }
});

// PUT /candidate-coding-responses/:id/complete
router.put('/:id/complete', async (req, res) => {
  const { id } = req.params;
  try {
    const col = await getCollection(COLLECTIONS.CODING_RESPONSES);
    const result = await col.updateOne(
      { id },
      { $set: { isScreeningCompleted: true, updatedAt: nowIso() } }
    );
    if (!result.matchedCount) {
      return res.status(404).json({ success: false, message: 'Coding response not found' });
    }
    return res.status(200).json({ success: true, message: 'Coding round marked complete' });
  } catch (err) {
    console.error('[candidate-coding-responses] complete error:', err);
    return res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;