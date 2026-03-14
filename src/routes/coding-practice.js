/**
 * Public route: coding practice from MongoDB (Coding_Practice collection).
 * Two endpoints: 1) topics + counts only (light). 2) questions for one topic (on demand).
 */
const express = require('express');
const router = express.Router();
const { getCollection, COLLECTIONS } = require('../config/mongo');
const { getBoilerplateByLanguage } = require('../lib/boilerplate');

function topicIdToName(topicId) {
  if (!topicId || typeof topicId !== 'string') return 'Coding';
  const parts = topicId.split('-');
  const name = parts[0].charAt(0).toUpperCase() + parts[0].slice(1).toLowerCase();
  const num = parts[1] ? ` ${parts[1]}` : '';
  return name + num;
}

const ALLOWED_LANGUAGES = ['java', 'python', 'javascript'];

/** Get function name from Java-style signature (e.g. "public boolean scoresIncreasing(int[] scores)" -> "scoresIncreasing"). */
function getFunctionNameFromSig(sig) {
  const m = sig.trim().match(/\b(\w+)\s*\(/);
  return m ? m[1] : 'solution';
}

/** Extract parameter names only from Java-style param list (e.g. "int[] scores" or "String[] words, int len" -> ["scores"] or ["words", "len"]). */
function getParamNamesFromSig(sig) {
  const open = sig.indexOf('(');
  const close = sig.indexOf(')', open);
  if (open === -1 || close === -1) return [];
  const params = sig.slice(open + 1, close).trim();
  if (!params) return [];
  return params.split(',').map((p) => {
    const parts = p.trim().split(/\s+/);
    return parts[parts.length - 1] || '';
  }).filter(Boolean);
}

/**
 * Build display-only function stub (no full program) per language from functionSignature.
 * JS/Python get valid syntax (no Java types in params); Java gets full signature with static.
 */
function buildStarterByLanguage(functionSignature) {
  const sig = (functionSignature || '').trim();
  if (!sig) {
    return {
      javascript: '// Implement your function here\nfunction solution() {\n  // your code\n  return null;\n}',
      python: '# Implement your function here\ndef solution():\n    # your code\n    return None',
      java: '// Implement your function here\npublic boolean solution() {\n    // your code\n    return false;\n}',
    };
  }
  const fnName = getFunctionNameFromSig(sig);
  const paramNames = getParamNamesFromSig(sig);
  const jsParams = paramNames.length ? paramNames.join(', ') : '';
  const javaSig = sig.replace(/\bpublic\s+(\w+)\s+(\w+)\s*\(/, 'public static $1 $2 (');
  const pythonName = fnName.replace(/([A-Z])/g, '_$1').toLowerCase().replace(/^_/, '');
  const pythonParams = paramNames.length ? paramNames.join(', ') : '';
  return {
    javascript: `// Implement:\nfunction ${fnName}(${jsParams}) {\n  // your code here\n  return false;\n}`,
    python: `# Implement:\ndef ${pythonName}(${pythonParams}):\n    # your code here\n    return False`,
    java: `// Implement (function only); static so runner can call it:\n${javaSig} {\n    // your code here\n    return false;\n}`,
  };
}

function normLang(lang) {
  const l = (lang || 'javascript').toString().trim().toLowerCase();
  if (l === 'java' || l === 'python' || l === 'javascript' || l === 'js') return l === 'js' ? 'javascript' : l;
  return 'javascript';
}

/**
 * GET /coding-practice/response?candidateId=xxx&questionId=yyy
 * Returns saved response: byLanguage (one record per candidate+question, all languages inside).
 * byLanguage: { javascript: { code, runResults, starCount }, python: {}, java: {} }
 */
const authMiddleware = require('../middlewares/auth.middleware');
const tenantMiddleware = require('../middlewares/tenant.middleware');

router.get('/response', authMiddleware, tenantMiddleware, async (req, res) => {
  try {
    const candidateId = (req.query.candidateId || '').toString().trim();
    const questionId = (req.query.questionId || '').toString().trim();
    if (!candidateId || !questionId) {
      return res.status(400).json({ success: false, message: 'candidateId and questionId are required' });
    }
    const col = await getCollection(COLLECTIONS.CODING_RESPONSE);
    const doc = await col.findOne({ candidateId, questionId });
    if (!doc) {
      return res.status(200).json({ success: true, data: null });
    }
    let byLanguage = doc.byLanguage && typeof doc.byLanguage === 'object' ? doc.byLanguage : {};
    if (Object.keys(byLanguage).length === 0 && (doc.code != null || doc.runResults != null)) {
      const lang = normLang(doc.language);
      byLanguage = { [lang]: { code: doc.code ?? '', runResults: Array.isArray(doc.runResults) ? doc.runResults : [], starCount: typeof doc.starCount === 'number' ? doc.starCount : 0 } };
    }
    return res.status(200).json({ success: true, data: { byLanguage } });
  } catch (e) {
    if (e.message && e.message.includes('MONGODB_URI')) {
      return res.status(503).json({ success: false, message: 'MongoDB not configured' });
    }
    console.error('coding-practice get response:', e);
    return res.status(500).json({ success: false, message: e.message || 'Failed to fetch response' });
  }
});

/**
 * POST /coding-practice/response
 * Create one record per candidate+question. Stores byLanguage so all languages live in same doc.
 * Body: { candidateId, questionId, topicId, code, language, starCount?, runResults? }
 */
router.post('/response', authMiddleware, tenantMiddleware, async (req, res) => {
  try {
    const { candidateId, questionId, topicId, code, language, starCount, runResults } = req.body || {};
    const cid = (candidateId || '').toString().trim();
    const qid = (questionId || '').toString().trim();
    if (!cid || !qid) {
      return res.status(400).json({ success: false, message: 'candidateId and questionId are required' });
    }
    const col = await getCollection(COLLECTIONS.CODING_RESPONSE);
    const lang = normLang(language);
    const langPayload = {
      code: typeof code === 'string' ? code : '',
      runResults: Array.isArray(runResults) ? runResults : [],
      starCount: typeof starCount === 'number' && starCount >= 0 && starCount <= 5 ? starCount : 0,
    };
    const existing = await col.findOne({ candidateId: cid, questionId: qid });
    const now = new Date();
    if (existing) {
      await col.updateOne(
        { candidateId: cid, questionId: qid },
        { $set: { [`byLanguage.${lang}`]: langPayload, updatedAt: now } }
      );
      return res.status(200).json({ success: true, data: { saved: true } });
    }
    await col.insertOne({
      candidateId: cid,
      questionId: qid,
      topicId: (topicId || '').toString().trim(),
      byLanguage: { [lang]: langPayload },
      createdAt: now,
      updatedAt: now,
    });
    return res.status(201).json({ success: true, data: { saved: true } });
  } catch (e) {
    if (e.message && e.message.includes('MONGODB_URI')) {
      return res.status(503).json({ success: false, message: 'MongoDB not configured' });
    }
    console.error('coding-practice post response:', e);
    return res.status(500).json({ success: false, message: e.message || 'Failed to save response' });
  }
});

/**
 * PUT /coding-practice/response
 * Update existing record: merge this language only into byLanguage (one doc per candidate+question).
 * Body: { candidateId, questionId, topicId, code, language, starCount?, runResults? }
 */
router.put('/response', authMiddleware, tenantMiddleware, async (req, res) => {
  try {
    const { candidateId, questionId, topicId, code, language, starCount, runResults } = req.body || {};
    const cid = (candidateId || '').toString().trim();
    const qid = (questionId || '').toString().trim();
    if (!cid || !qid) {
      return res.status(400).json({ success: false, message: 'candidateId and questionId are required' });
    }
    const lang = normLang(language);
    const langPayload = {
      code: typeof code === 'string' ? code : '',
      runResults: Array.isArray(runResults) ? runResults : [],
      starCount: typeof starCount === 'number' && starCount >= 0 && starCount <= 5 ? starCount : 0,
    };
    const col = await getCollection(COLLECTIONS.CODING_RESPONSE);
    const result = await col.updateOne(
      { candidateId: cid, questionId: qid },
      { $set: { topicId: (topicId || '').toString().trim(), [`byLanguage.${lang}`]: langPayload, updatedAt: new Date() } }
    );
    if (result.matchedCount === 0) {
      return res.status(404).json({ success: false, message: 'Response not found; use POST to create' });
    }
    return res.status(200).json({ success: true, data: { updated: true } });
  } catch (e) {
    if (e.message && e.message.includes('MONGODB_URI')) {
      return res.status(503).json({ success: false, message: 'MongoDB not configured' });
    }
    console.error('coding-practice put response:', e);
    return res.status(500).json({ success: false, message: e.message || 'Failed to update response' });
  }
});

/**
 * GET /coding-practice/responses/stats?candidateId=xxx
 * Lightweight summary for stats cards: byTopic and byQuestion star counts. Reduces DB load.
 */
router.get('/responses/stats', authMiddleware, tenantMiddleware, async (req, res) => {
  try {
    const candidateId = (req.query.candidateId || '').toString().trim();
    if (!candidateId) {
      return res.status(400).json({ success: false, message: 'candidateId is required' });
    }
    const col = await getCollection(COLLECTIONS.CODING_RESPONSE);
    const docs = await col.find({ candidateId }).project({ questionId: 1, topicId: 1, starCount: 1, byLanguage: 1 }).toArray();
    const byQuestion = {};
    const byTopic = {};
    for (const d of docs) {
      const qid = d.questionId || '';
      const tid = d.topicId || '';
      let stars = typeof d.starCount === 'number' ? d.starCount : 0;
      if (d.byLanguage && typeof d.byLanguage === 'object') {
        const langStars = Object.values(d.byLanguage).map((x) => (x && typeof x.starCount === 'number' ? x.starCount : 0));
        if (langStars.length) stars = Math.max(stars, ...langStars);
      }
      byQuestion[qid] = stars;
      if (tid) {
        if (!byTopic[tid]) byTopic[tid] = { attempted: 0, totalStars: 0 };
        byTopic[tid].attempted += 1;
        byTopic[tid].totalStars += stars;
      }
    }
    return res.status(200).json({
      success: true,
      data: { byQuestion, byTopic },
    });
  } catch (e) {
    if (e.message && e.message.includes('MONGODB_URI')) {
      return res.status(503).json({ success: false, message: 'MongoDB not configured' });
    }
    console.error('coding-practice get stats:', e);
    return res.status(500).json({ success: false, message: e.message || 'Failed to fetch stats' });
  }
});

/**
 * GET /coding-practice/categories
 * Returns topics grouped by category.
 * Response: { success, data: { categories: [ { name, description, topics: [ { id, name, description, questionCount } ] } ] } }
 */
router.get('/categories', authMiddleware, tenantMiddleware, async (req, res) => {
  try {
    const col = await getCollection(COLLECTIONS.CODING_PRACTICE);
    const pipeline = [
      {
        $group: {
          _id: '$topicId',
          topicId: { $first: '$topicId' },
          topicName: { $first: '$topicName' },
          topicDescription: { $first: '$topicDescription' },
          category: { $first: '$category' },
          categoryDescription: { $first: '$categoryDescription' },
          questionCount: { $sum: 1 },
        },
      },
      {
        $group: {
          _id: '$category',
          categoryName: { $first: '$category' },
          categoryDescription: { $first: '$categoryDescription' },
          topics: {
            $push: {
              id: '$topicId',
              name: '$topicName',
              description: '$topicDescription',
              questionCount: '$questionCount',
            },
          },
        },
      },
      { $sort: { categoryName: 1 } },
    ];
    const agg = await col.aggregate(pipeline).toArray();

    const categories = agg.map((row) => {
      const name = row.categoryName || 'General';
      const description = row.categoryDescription || `${name} practice problems`;
      return {
        name,
        description,
        topics: row.topics.sort((a, b) => a.id.localeCompare(b.id)),
      };
    });

    return res.status(200).json({
      success: true,
      data: { categories },
    });
  } catch (e) {
    if (e.message && e.message.includes('MONGODB_URI')) {
      return res.status(503).json({ success: false, message: 'MongoDB not configured' });
    }
    console.error('coding-practice get categories:', e);
    return res.status(500).json({ success: false, message: e.message || 'Failed to fetch categories' });
  }
});

/**
 * GET /coding-practice
 * Returns only topics with question counts (no question bodies). Use this to display section cards.
 * Response: { success, data: { topics: [{ id, name, description, questionCount }] } }
 */
router.get('/', authMiddleware, tenantMiddleware, async (req, res) => {
  try {
    const col = await getCollection(COLLECTIONS.CODING_PRACTICE);
    const pipeline = [
      { $match: {} },
      {
        $group: {
          _id: '$topicId',
          topicId: { $first: '$topicId' },
          topicName: { $first: '$topicName' },
          topicDescription: { $first: '$topicDescription' },
          questionCount: { $sum: 1 },
        },
      },
      { $sort: { topicId: 1 } },
    ];
    const agg = await col.aggregate(pipeline).toArray();

    const topics = agg.map((row) => {
      const id = row.topicId || row._id || 'default';
      const name = (row.topicName && String(row.topicName).trim()) || topicIdToName(id);
      const description = (row.topicDescription && String(row.topicDescription).trim()) || `${name} practice problems`;
      return {
        id,
        name,
        description,
        questionCount: row.questionCount || 0,
      };
    });

    return res.status(200).json({
      success: true,
      data: { topics },
    });
  } catch (e) {
    if (e.message && e.message.includes('MONGODB_URI')) {
      return res.status(503).json({ success: false, message: 'MongoDB not configured' });
    }
    console.error('coding-practice get:', e);
    return res.status(500).json({ success: false, message: e.message || 'Failed to fetch coding practice' });
  }
});

/**
 * GET /coding-practice/:topicId
 * Returns questions for one topic only. Call this when user clicks a section card.
 * Each question includes examples (test cases). When user clicks Run, all examples are executed.
 * MongoDB: examples: [ { input: string, output: string }, ... ] (e.g. 10 per question).
 * Response: { success, data: { topicId, questions: [ ... ] } }
 */
router.get('/:topicId', authMiddleware, tenantMiddleware, async (req, res) => {
  try {
    const { topicId } = req.params;
    const col = await getCollection(COLLECTIONS.CODING_PRACTICE);
    const cursor = col
      .find({ topicId })
      .project({ topicId: 1, topicName: 1, topicDescription: 1, name: 1, description: 1, difficulty: 1, functionSignature: 1, examples: 1, allowedLanguages: 1, starterCodeByLanguage: 1, boilerplateByLanguage: 1, id: 1, _id: 1 });
    const docs = await cursor.toArray();

    const topicIdToNameFallback = topicIdToName(topicId);
    const name = (docs[0]?.topicName && String(docs[0].topicName).trim()) || topicIdToNameFallback;
    const description = (docs[0]?.topicDescription && String(docs[0].topicDescription).trim()) || `${name} practice problems`;

    const questions = docs.map((doc, idx) => {
      const starterByLang = doc.starterCodeByLanguage && typeof doc.starterCodeByLanguage === 'object'
        ? doc.starterCodeByLanguage
        : buildStarterByLanguage(doc.functionSignature);
      const fnName = doc.name || (doc.functionSignature && doc.functionSignature.trim().match(/\b(\w+)\s*\(/)?.[1]) || 'solution';
      const boilerplateByLang = doc.boilerplateByLanguage && typeof doc.boilerplateByLanguage === 'object' && doc.boilerplateByLanguage.javascript
        ? doc.boilerplateByLanguage
        : getBoilerplateByLanguage(fnName, doc.functionSignature || '');
      return {
        id: doc.id || (doc._id && doc._id.toString()) || `q-${topicId}-${idx}`,
        name: doc.name || 'Problem',
        description: doc.description || '',
        difficulty: doc.difficulty || 'E',
        functionSignature: doc.functionSignature || null,
        examples: Array.isArray(doc.examples) ? doc.examples : [],
        allowedLanguages: Array.isArray(doc.allowedLanguages) && doc.allowedLanguages.length > 0
          ? doc.allowedLanguages
          : ALLOWED_LANGUAGES,
        starterCodeByLanguage: starterByLang,
        boilerplateByLanguage: boilerplateByLang,
      };
    });

    return res.status(200).json({
      success: true,
      data: {
        topic: { id: topicId, name, description, questionCount: questions.length },
        questions,
      },
    });
  } catch (e) {
    if (e.message && e.message.includes('MONGODB_URI')) {
      return res.status(503).json({ success: false, message: 'MongoDB not configured' });
    }
    console.error('coding-practice get topic:', e);
    return res.status(500).json({ success: false, message: e.message || 'Failed to fetch topic questions' });
  }
});

module.exports = router;
