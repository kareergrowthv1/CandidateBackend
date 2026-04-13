const axios = require('axios');
const { pool, DB_NAME } = require('../config/db');
const { getCollection, COLLECTIONS } = require('../config/mongo');

const GROQ_API_KEY = process.env.GROQ_API_KEY;
const GROQ_BASE_URL = process.env.GROQ_BASE_URL;
const GROQ_MODEL = process.env.GROQ_MODEL || 'llama-3.3-70b-versatile';

const ROUND_CONFIGS = {
  1: {
    name: 'Communication',
    interviewer: 'Alex',
    role: 'Communication Lead',
    prompt: "You are Alex, an expert Communication Lead. Your goal is to evaluate the candidate's soft skills, introduction, and situational judgment. Ask one clear, engaging question to start the interview or respond to their introduction. Keep it professional but encouraging."
  },
  2: {
    name: 'Technical',
    interviewer: 'Sarah',
    role: 'Technical Architect',
    prompt: "You are Sarah, a Senior Technical Architect. Your goal is to evaluate the candidate's technical depth and problem-solving skills. Ask a challenging technical question related to their field or a general architectural problem. Be precise and analytical."
  },
  3: {
    name: 'Aptitude',
    interviewer: 'Mark',
    role: 'Logic Expert',
    prompt: "You are Mark, a Logic Expert. Your goal is to evaluate the candidate's logical reasoning and aptitude. Present a logical puzzle or a numerical reasoning scenario. Encourage them to explain their thought process step-by-step."
  },
  4: {
    name: 'HR/Management',
    interviewer: 'Elena',
    role: 'HR Director',
    prompt: "You are Elena, a Senior HR Director. Your goal is to evaluate behavioral traits, culture fit, and career alignment. Ask a reflective question about their career journey, conflict resolution, or long-term goals."
  }
};

/**
 * SSE Streaming Interview Controller
 */
exports.streamInterview = async (req, res) => {
  const { round, messages, context } = req.body;
  const roundNum = parseInt(round) || 1;
  const config = ROUND_CONFIGS[roundNum];

  if (!config) {
    return res.status(400).json({ success: false, message: 'Invalid round number' });
  }

  // Set headers for SSE
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  try {
    const systemPrompt = `${config.prompt}. You should address yourself as ${config.interviewer}, the ${config.role}. Context: ${JSON.stringify(context || {})}. Stay in character. Respond in a concise and conversational manner. Limit each response to 2-3 sentences unless explaining a logic problem.`;

    const response = await axios({
      method: 'post',
      url: `${GROQ_BASE_URL}/chat/completions`,
      headers: {
        'Authorization': `Bearer ${GROQ_API_KEY}`,
        'Content-Type': 'application/json',
      },
      data: {
        model: GROQ_MODEL,
        messages: [
          { role: 'system', content: systemPrompt },
          ...messages
        ],
        stream: true,
      },
      responseType: 'stream',
    });

    response.data.on('data', (chunk) => {
      const payload = chunk.toString();
      const lines = payload.split('\n');
      
      for (const line of lines) {
        if (line.trim() === '') continue;
        if (line.includes('data: [DONE]')) return;

        if (line.startsWith('data: ')) {
          try {
            const data = JSON.parse(line.substring(6));
            const content = data.choices[0]?.delta?.content;
            if (content) {
              res.write(`data: ${JSON.stringify({ content })}\n\n`);
            }
          } catch (e) {
            // Ignore parse errors for partial chunks
          }
        }
      }
    });

    response.data.on('end', () => {
      res.end();
    });

    req.on('close', () => {
      response.data.destroy();
    });

  } catch (error) {
    console.error('AI Stream Error:', error.response?.data || error.message);
    res.write(`data: ${JSON.stringify({ error: 'Failed to connect to AI service' })}\n\n`);
    res.end();
  }
};

/**
 * Save round progress
 */
exports.saveProgress = async (req, res) => {
  const { candidateId, round, status, score, feedback } = req.body;
  
  if (!candidateId || !round) {
    return res.status(400).json({ success: false, message: 'Missing required fields' });
  }

  try {
    const query = `
      INSERT INTO \`${DB_NAME}\`.candidate_ai_mock_rounds 
      (candidate_id, round_number, status, score, last_feedback, updated_at)
      VALUES (?, ?, ?, ?, ?, NOW())
      ON DUPLICATE KEY UPDATE 
      status = VALUES(status), 
      score = VALUES(score), 
      last_feedback = VALUES(last_feedback), 
      updated_at = NOW()
    `;
    
    await pool.query(query, [candidateId, round, status, score || 0, feedback || '']);
    
    res.status(200).json({ success: true, message: 'Progress saved successfully' });
  } catch (error) {
    console.error('Save Progress Error:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

/**
 * Get candidate's mock rounds status
 */
exports.getRounds = async (req, res) => {
  const candidateId = req.query.candidateId;
  
  if (!candidateId) {
    return res.status(400).json({ success: false, message: 'candidateId is required' });
  }

  try {
    const [rows] = await pool.query(
      `SELECT round_number as round, status, score, last_feedback as feedback, updated_at 
       FROM \`${DB_NAME}\`.candidate_ai_mock_rounds 
       WHERE candidate_id = ?`, 
      [candidateId]
    );
    
    res.status(200).json({ success: true, data: rows });
  } catch (error) {
    console.error('Get Rounds Error:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

/**
 * Save complete AIMock Session to MongoDB
 */
exports.saveSession = async (req, res) => {
  const { 
    sessionId, candidateId, round, roundTitle, mode, durationMinutes, 
    concepts, questions, status, startedAt, completedAt,
    score, analysis
  } = req.body;
  
  if (!candidateId || !round) {
    return res.status(400).json({ success: false, message: 'Missing required fields' });
  }

  const { ObjectId } = require('mongodb');

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
      analysis: analysis || ''
    };

    if (sessionId) {
      await aimockCol.updateOne(
        { _id: new ObjectId(sessionId) },
        { $set: doc }
      );
      return res.status(200).json({ success: true, sessionId });
    }
    
    // Insert new session
    const result = await aimockCol.insertOne(doc);
    const newSessionId = result.insertedId;

    // Auto-trigger: Limit to 15 latest records per candidate
    try {
      const allSessions = await aimockCol.find({ candidateId })
        .sort({ completedAt: -1, savedAt: -1 })
        .toArray();

      if (allSessions.length > 15) {
        const sessionsToDelete = allSessions.slice(15); // Everything after the first 15
        const idsToDelete = sessionsToDelete.map(s => s._id);
        if (idsToDelete.length > 0) {
          await aimockCol.deleteMany({ _id: { $in: idsToDelete } });
          console.log(`[saveSession] Auto-deleted ${idsToDelete.length} old sessions for candidate ${candidateId}`);
        }
      }
    } catch (limitErr) {
      console.error('Session limit cleanup error:', limitErr);
      // Don't fail the request if cleanup fails
    }
    
    res.status(200).json({ success: true, sessionId: newSessionId });
  } catch (error) {
    console.error('Save MongoDB Session Error:', error);
    res.status(500).json({ success: false, message: 'Internal server error saving session' });
  }
};

/**
 * Get candidate interview sessions (paginated)
 * GET /api/ai-mock/sessions?candidateId=...&roundTitle=...&page=1&limit=10
 */
exports.getSessions = async (req, res) => {
  const { candidateId, roundTitle, page = 1, limit = 15 } = req.query;
  
  if (!candidateId) {
    return res.status(400).json({ success: false, message: 'candidateId is required' });
  }

  console.log(`[getSessions] Fetching for candidate: ${candidateId}, round: ${roundTitle}`);

  try {
    const aimockCol = await getCollection(COLLECTIONS.AIMOCK_RESPONSES);
    
    const query = { candidateId };
    if (roundTitle && roundTitle !== 'All') {
      query.roundTitle = roundTitle;
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const total = await aimockCol.countDocuments(query);
    
    // Lean projection: Only roundName/Title, Mode, Concepts, and Score.
    const sessions = await aimockCol.find(query, {
      projection: { 
        roundTitle: 1, mode: 1, score: 1, concepts: 1, 
        completedAt: 1, startedAt: 1, round: 1, status: 1 
      }
    })
      .sort({ completedAt: -1, savedAt: -1 })
      .skip(skip)
      .limit(parseInt(limit))
      .toArray();

    // Consolidated: Fetch all counts in a single pass for the UI tabs
    const aggregateCounts = await aimockCol.aggregate([
      { $match: { candidateId } },
      { $group: { _id: "$roundTitle", count: { $sum: 1 } } }
    ]).toArray();

    const counts = {
      All: await aimockCol.countDocuments({ candidateId }),
      Communication: 0,
      Technical: 0,
      Aptitude: 0,
      'HR/Management': 0
    };

    aggregateCounts.forEach(c => {
      const key = c._id === 'HR' ? 'HR/Management' : c._id;
      if (counts.hasOwnProperty(key)) {
        counts[key] = c.count;
      }
    });

    console.log(`[getSessions] Found ${sessions.length} sessions, total ${total}`);

    res.status(200).json({
      success: true,
      data: sessions,
      counts, // Included counts for single-API efficiency
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(total / parseInt(limit))
      }
    });
  } catch (error) {
    console.error('Get Sessions Error:', error);
    res.status(500).json({ success: false, message: 'Internal server error fetching sessions' });
  }
};

/**
 * Get single session details
 * GET /api/ai-mock/sessions/:id
 */
exports.getSessionDetails = async (req, res) => {
  const { id } = req.params;
  const { ObjectId } = require('mongodb');

  try {
    const aimockCol = await getCollection(COLLECTIONS.AIMOCK_RESPONSES);
    console.log(`[getSessionDetails] ID: ${id}`);
    const session = await aimockCol.findOne({ _id: new ObjectId(id) });
    
    if (!session) {
      console.log(`[getSessionDetails] Not found: ${id}`);
      return res.status(404).json({ success: false, message: 'Session not found' });
    }

    res.status(200).json({ success: true, data: session });
  } catch (error) {
    console.error('Get Session Details Error:', error);
    res.status(500).json({ success: false, message: 'Internal server error fetching session details' });
  }
};
