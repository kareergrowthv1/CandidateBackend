const axios = require('axios');
const { pool } = require('../config/db');
const { getCollection, COLLECTIONS } = require('../config/mongo');
const { ObjectId } = require('mongodb');

const STREAMING_AI_URL = process.env.STREAMING_AI_URL || 'http://localhost:9000';

const pick = (...vals) => vals.find((v) => v !== undefined && v !== null);

const toArray = (v) => {
    if (Array.isArray(v)) return v;
    if (!v || typeof v !== 'object') return [];
    return Object.values(v);
};

const toTextArray = (v) => toArray(v)
    .map((x) => (typeof x === 'string' ? x : pick(x?.text, x?.message, x?.suggestion, x?.title, '')))
    .map((x) => (x || '').toString().trim())
    .filter(Boolean);

const mergeTextArrays = (...vals) => {
    const seen = new Set();
    const out = [];
    vals.forEach((v) => {
        toTextArray(v).forEach((item) => {
            const key = item.toLowerCase();
            if (!seen.has(key)) {
                seen.add(key);
                out.push(item);
            }
        });
    });
    return out;
};

const normalizeSocialLinks = (root) => {
    const candidate = pick(root?.candidate_info, root?.candidateInfo, root?.candidate, {});
    const source = pick(
        candidate?.social_links,
        candidate?.socialLinks,
        root?.social_links,
        root?.socialLinks,
        root?.contact_links,
        root?.contactLinks,
        root?.links,
        {}
    );

    const links = Array.isArray(source)
        ? Object.fromEntries(
            source
                .map((entry) => {
                    if (typeof entry === 'string') return null;
                    const key = pick(entry?.type, entry?.label, entry?.name, '').toString().trim().toLowerCase().replace(/\s+/g, '_');
                    const value = pick(entry?.url, entry?.href, entry?.link, '');
                    return key && value ? [key, value] : null;
                })
                .filter(Boolean)
        )
        : (source && typeof source === 'object' ? source : {});

    return {
        github: pick(links.github, links.github_url, candidate?.github, root?.github),
        linkedin: pick(links.linkedin, links.linkedin_url, candidate?.linkedin, root?.linkedin),
        website: pick(links.website, candidate?.website, root?.website),
        portfolio: pick(links.portfolio, candidate?.portfolio, root?.portfolio),
        ...links,
    };
};

const normalizeSections = (rawSections) => toArray(rawSections).map((section, idx) => {
    const s = section && typeof section === 'object' ? section : {};
    const suggestions = mergeTextArrays(
        s?.improvements,
        s?.improvement,
        s?.suggestions,
        s?.recommendations,
        s?.optional,
        s?.optional_fixes,
        s?.optionalIssues,
        s?.optional_issues,
        s?.points,
        []
    );
    const sectionSummary = pick(
        s?.section_summary,
        s?.sectionSummary,
        s?.summary,
        s?.analysis_summary,
        s?.analysisSummary,
        ''
    );
    const urgentIssues = mergeTextArrays(s?.urgent_issues, s?.urgentIssues, s?.urgent_fixes, s?.urgentFixes, []);
    const criticalIssues = mergeTextArrays(s?.critical_issues, s?.criticalIssues, s?.critical_fixes, s?.criticalFixes, []);
    const optionalIssues = mergeTextArrays(s?.optional_issues, s?.optionalIssues, s?.optional_fixes, s?.optionalFixes, []);
    const strengths = mergeTextArrays(s?.strengths, s?.positives, s?.good_points, []);
    const keywordGaps = mergeTextArrays(s?.keyword_gaps, s?.missing_keywords, []);
    const atsObservations = mergeTextArrays(s?.ats_observations, s?.ats_notes, []);
    const formattingIssues = mergeTextArrays(s?.formatting_issues, s?.format_issues, []);

    return {
        section_name: pick(s?.section_name, s?.sectionName, s?.section, s?.name, s?.title, `Section ${idx + 1}`),
        urgent_count: Number(pick(s?.urgent_count, s?.urgentCount, s?.urgent, s?.fixes?.urgent, 0)) || 0,
        critical_count: Number(pick(s?.critical_count, s?.criticalCount, s?.critical, s?.fixes?.critical, 0)) || 0,
        improvements: suggestions,
        section_summary: typeof sectionSummary === 'string' ? sectionSummary.trim() : '',
        urgent_issues: urgentIssues,
        critical_issues: criticalIssues,
        optional_issues: optionalIssues,
        strengths,
        keyword_gaps: keywordGaps,
        ats_observations: atsObservations,
        formatting_issues: formattingIssues,
    };
});

const normalizeReportData = (raw) => {
    const root = pick(raw?.data, raw?.report, raw?.result, raw) || {};
    const rawSections = pick(
        root?.sections,
        root?.section_analysis,
        root?.sectionAnalysis,
        root?.analysis?.sections,
        root?.resume_analysis?.sections,
        root?.feedback?.sections,
        []
    );
    const sections = normalizeSections(rawSections);

    const fixCounts = pick(root?.fix_counts, root?.fixCounts, root?.counts, null);
    const computedOptional = sections.reduce((sum, s) => sum + ((s.improvements || []).length), 0);

    return {
        candidate_info: {
            ...(pick(root?.candidate_info, root?.candidateInfo, root?.candidate, {}) || {}),
            social_links: normalizeSocialLinks(root),
        },
        overallScore: Number(pick(root?.overallScore, root?.overall_score, root?.score, 0)) || 0,
        summary: pick(root?.summary, root?.analysis_summary, root?.resume_summary, ''),
        recommended_summary: pick(root?.recommended_summary, root?.recommendedSummary, ''),
        overall_recommendations: toTextArray(pick(root?.overall_recommendations, root?.overallRecommendations, root?.recommendations, [])),
        fix_counts: {
            urgent: Number(pick(fixCounts?.urgent, fixCounts?.urgent_count, 0)) || sections.reduce((sum, s) => sum + (s.urgent_count || 0), 0),
            critical: Number(pick(fixCounts?.critical, fixCounts?.critical_count, 0)) || sections.reduce((sum, s) => sum + (s.critical_count || 0), 0),
            optional: Number(pick(fixCounts?.optional, fixCounts?.optional_count, 0)) || computedOptional,
        },
        original_resume: pick(root?.original_resume, root?.originalResume, root?.parsed_resume, {}),
        sections,
    };
};

/**
 * Analyze Resume (non-persistent)
 * POST /api/resume/analyze
 */
exports.analyzeResume = async (req, res) => {
    const { resumeText, fileName } = req.body;
    const candidateId = req.user?.id;

    if (!resumeText) {
        return res.status(400).json({ success: false, message: 'Resume text is required' });
    }

    try {
        // Call Streaming AI to analyze the resume
        const aiResponse = await axios.post(
            `${STREAMING_AI_URL}/resume/analyze`,
            { resumeText, fileName, candidateId }
        );
        const report = normalizeReportData(aiResponse.data);
        return res.status(200).json({ success: true, data: report });
    } catch (error) {
        console.error('Resume Analysis Error:', {
            message: error.message,
            stack: error.stack,
            response: error.response?.data,
            query: error.sql
        });
        return res.status(500).json({ 
            success: false, 
            message: 'Failed to analyze resume',
            error: error.message,
            stack: error.stack,
            response: error.response?.data,
            query: error.sql
        });
    }
};

/**
 * List resume templates
 * GET /api/resume/templates
 */
exports.getTemplates = async (req, res) => {
    try {
        const templatesCol = await getCollection(COLLECTIONS.RESUME_TEMPLATES);
        const templates = await templatesCol.find(
            {},
            {
                projection: {
                    name: 1,
                    key: 1,
                    description: 1,
                    thumbnailColor: 1,
                    tags: 1,
                    styleConfig: 1,
                    sections: 1,
                    layout: 1,
                    sectionStyles: 1,
                    dummyData: 1,
                    createdAt: 1,
                    updatedAt: 1
                }
            }
        ).sort({ createdAt: -1 }).toArray();

        res.status(200).json({ success: true, data: templates });
    } catch (error) {
        console.error('Get Resume Templates Error:', error);
        res.status(500).json({ success: false, message: 'Failed to fetch resume templates' });
    }
};

/**
 * Get single template detail
 * GET /api/resume/templates/:id
 */
exports.getTemplateById = async (req, res) => {
    try {
        const { id } = req.params;
        const templatesCol = await getCollection(COLLECTIONS.RESUME_TEMPLATES);
        const filter = ObjectId.isValid(id) ? { _id: new ObjectId(id) } : { key: id };
        const template = await templatesCol.findOne(filter);

        if (!template) {
            return res.status(404).json({ success: false, message: 'Template not found' });
        }

        res.status(200).json({ success: true, data: template });
    } catch (error) {
        console.error('Get Resume Template Error:', error);
        res.status(500).json({ success: false, message: 'Failed to fetch template details' });
    }
};

/**
 * Update template data (sections + style + html)
 * PUT /api/resume/templates/:id
 */
exports.updateTemplate = async (req, res) => {
    try {
        const { id } = req.params;
        const { sections, styleConfig, htmlTemplate, name, description } = req.body;

        const templatesCol = await getCollection(COLLECTIONS.RESUME_TEMPLATES);
        const filter = ObjectId.isValid(id) ? { _id: new ObjectId(id) } : { key: id };

        const patch = {
            updatedAt: new Date().toISOString(),
        };

        if (Array.isArray(sections)) patch.sections = sections;
        if (styleConfig && typeof styleConfig === 'object') patch.styleConfig = styleConfig;
        if (typeof htmlTemplate === 'string') patch.htmlTemplate = htmlTemplate;
        if (typeof name === 'string' && name.trim()) patch.name = name.trim();
        if (typeof description === 'string') patch.description = description;

        const updateResult = await templatesCol.findOneAndUpdate(
            filter,
            { $set: patch },
            { returnDocument: 'after' }
        );

        if (!updateResult) {
            return res.status(404).json({ success: false, message: 'Template not found' });
        }

        res.status(200).json({ success: true, data: updateResult });
    } catch (error) {
        console.error('Update Resume Template Error:', error);
        res.status(500).json({ success: false, message: 'Failed to update template' });
    }
};

/**
 * Enhance resume section content with AI (SSE stream)
 * POST /api/resume/enhance
 * Body: { sectionTitle, sectionType, content, role? }
 * Streams SSE events from Streaming AI back to the browser.
 */
exports.enhanceSection = async (req, res) => {
    const { sectionTitle, sectionType, content, role } = req.body;

    if (!sectionTitle || !content) {
        return res.status(400).json({ success: false, message: 'sectionTitle and content are required' });
    }

    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('X-Accel-Buffering', 'no');
    res.flushHeaders();

    try {
        const aiRes = await axios.post(
            `${STREAMING_AI_URL}/resume-content/enhance`,
            { sectionTitle, sectionType: sectionType || 'paragraph', content, role: role || '' },
            { responseType: 'stream', timeout: 60000 }
        );

        aiRes.data.on('data', (chunk) => {
            if (!res.writableEnded) res.write(chunk);
        });

        aiRes.data.on('end', () => {
            if (!res.writableEnded) res.end();
        });

        aiRes.data.on('error', (err) => {
            console.error('AI stream error:', err.message);
            if (!res.writableEnded) {
                res.write(`data: ${JSON.stringify({ error: err.message })}\n\n`);
                res.end();
            }
        });

        req.on('close', () => {
            aiRes.data.destroy();
        });

    } catch (error) {
        console.error('Enhance Section Error:', error.message);
        if (!res.writableEnded) {
            res.write(`data: ${JSON.stringify({ error: error.message })}\n\n`);
            res.end();
        }
    }
};

