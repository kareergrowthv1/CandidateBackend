#!/usr/bin/env node
/**
 * update_template_layouts.js
 *
 * Adds `layout`, `sectionStyles`, and a complete `sections` array to every
 * existing resume template in MongoDB so DynamicTemplate.jsx can render them
 * without any separate per-template JSX files.
 *
 * Usage: node update_template_layouts.js
 */

const { MongoClient } = require('mongodb');

const MONGO_URI        = process.env.MONGODB_URI     || 'mongodb://localhost:27017';
const DB_NAME          = process.env.MONGODB_DB_NAME || 'kareergrowth';
const COLLECTION_NAME  = 'resume_templates';

// ─── Full section lists + layout config for every template ────────────────────
const TEMPLATE_UPDATES = [
    {
        key: 'classic',
        sections: [
            { id: 'summary',      title: 'Professional Summary',    type: 'paragraph',    enabled: true },
            { id: 'experience',   title: 'Professional Experience', type: 'experience',   enabled: true },
            { id: 'projects',     title: 'Projects',                type: 'projects',     enabled: true },
            { id: 'education',    title: 'Education',               type: 'education',    enabled: true },
            { id: 'skills',       title: 'Core Skills',             type: 'skills',       enabled: true },
            { id: 'certificates', title: 'Certifications',          type: 'certificates', enabled: true },
            { id: 'achievements', title: 'Achievements',            type: 'achievements', enabled: true },
            { id: 'languages',    title: 'Languages',               type: 'languages',    enabled: true },
            { id: 'hobbies',      title: 'Hobbies & Interests',     type: 'hobbies',      enabled: true },
        ],
        layout: {
            type: 'single',
            header: 'centered-border',
        },
        sectionStyles: {
            experience: 'border-left',
            skills:     'pills',
            hobbies:    'pills',
            languages:  'dot-join',
        },
    },
    {
        key: 'modern',
        sections: [
            { id: 'summary',      title: 'Professional Summary', type: 'paragraph',    enabled: true },
            { id: 'experience',   title: 'Experience',           type: 'experience',   enabled: true },
            { id: 'projects',     title: 'Projects',             type: 'projects',     enabled: true },
            { id: 'certificates', title: 'Certifications',       type: 'certificates', enabled: true },
            { id: 'achievements', title: 'Achievements',         type: 'achievements', enabled: true },
            { id: 'education',    title: 'Education',            type: 'education',    enabled: true },
            { id: 'skills',       title: 'Skills',               type: 'skills',       enabled: true },
            { id: 'languages',    title: 'Languages',            type: 'languages',    enabled: true },
            { id: 'hobbies',      title: 'Hobbies & Interests',  type: 'hobbies',      enabled: true },
        ],
        layout: {
            type: 'two-col-bottom',
            header: 'accent-bg',
            twoColBottom: { left: ['education'], right: ['skills'] },
        },
        sectionStyles: {
            experience: 'border-left',
            skills:     'pills',
            hobbies:    'pills',
            languages:  'dot-join',
        },
    },
    {
        key: 'minimal',
        sections: [
            { id: 'summary',      title: 'Summary',       type: 'paragraph',    enabled: true },
            { id: 'experience',   title: 'Experience',    type: 'experience',   enabled: true },
            { id: 'projects',     title: 'Projects',      type: 'projects',     enabled: true },
            { id: 'education',    title: 'Education',     type: 'education',    enabled: true },
            { id: 'skills',       title: 'Skills',        type: 'skills',       enabled: true },
            { id: 'certificates', title: 'Certifications',type: 'certificates', enabled: true },
            { id: 'achievements', title: 'Achievements',  type: 'achievements', enabled: true },
            { id: 'languages',    title: 'Languages',     type: 'languages',    enabled: true },
            { id: 'hobbies',      title: 'Interests',     type: 'hobbies',      enabled: true },
        ],
        layout: {
            type: 'single',
            header: 'left-minimal',
        },
        sectionStyles: {
            experience: 'plain',
            skills:     'dot-join',
            hobbies:    'dot-join',
            languages:  'dot-join',
        },
    },
    {
        key: 'minimal-image',
        sections: [
            // sidebar sections first (order matters for sidebar-left layout)
            { id: 'contact',      title: 'Contact',       type: 'contact',      enabled: true },
            { id: 'education',    title: 'Education',     type: 'education',    enabled: true },
            { id: 'skills',       title: 'Skills',        type: 'skills',       enabled: true },
            { id: 'languages',    title: 'Languages',     type: 'languages',    enabled: true },
            { id: 'hobbies',      title: 'Interests',     type: 'hobbies',      enabled: true },
            // main sections
            { id: 'summary',      title: 'About Me',      type: 'paragraph',    enabled: true },
            { id: 'experience',   title: 'Experience',    type: 'experience',   enabled: true },
            { id: 'projects',     title: 'Projects',      type: 'projects',     enabled: true },
            { id: 'certificates', title: 'Certifications',type: 'certificates', enabled: true },
            { id: 'achievements', title: 'Achievements',  type: 'achievements', enabled: true },
        ],
        layout: {
            type: 'sidebar-left',
            header: 'accent-bg',
            showProfileImage: true,
            sidebar: {
                sections: ['contact', 'education', 'skills', 'languages', 'hobbies'],
                bg: 'dark',
            },
        },
        sectionStyles: {
            experience: 'dot-list',
            skills:     'dot-list',
            hobbies:    'dot-join',
            languages:  'dot-join',
        },
    },
    {
        key: 'executive',
        sections: [
            // sidebar
            { id: 'contact',      title: 'Contact',                 type: 'contact',      enabled: true },
            { id: 'skills',       title: 'Core Skills',             type: 'skills',       enabled: true },
            { id: 'education',    title: 'Education',               type: 'education',    enabled: true },
            { id: 'languages',    title: 'Languages',               type: 'languages',    enabled: true },
            { id: 'hobbies',      title: 'Interests',               type: 'hobbies',      enabled: true },
            // main
            { id: 'summary',      title: 'Executive Summary',       type: 'paragraph',    enabled: true },
            { id: 'experience',   title: 'Professional Experience', type: 'experience',   enabled: true },
            { id: 'projects',     title: 'Projects',                type: 'projects',     enabled: true },
            { id: 'certificates', title: 'Certifications',          type: 'certificates', enabled: true },
            { id: 'achievements', title: 'Achievements',            type: 'achievements', enabled: true },
        ],
        layout: {
            type: 'sidebar-left',
            header: 'accent-bg',
            sidebar: {
                sections: ['contact', 'skills', 'education', 'languages', 'hobbies'],
                bg: 'gray',
            },
        },
        sectionStyles: {
            experience: 'border-left',
            skills:     'dot-list',
            hobbies:    'dot-join',
            languages:  'dot-list',
        },
    },
    {
        key: 'academic',
        sections: [
            { id: 'summary',      title: 'Research Interests',       type: 'paragraph',    enabled: true },
            { id: 'education',    title: 'Education',                type: 'education',    enabled: true },
            { id: 'experience',   title: 'Professional Experience',  type: 'experience',   enabled: true },
            { id: 'projects',     title: 'Publications & Research',  type: 'projects',     enabled: true },
            { id: 'skills',       title: 'Skills & Competencies',    type: 'skills',       enabled: true },
            { id: 'certificates', title: 'Certifications',           type: 'certificates', enabled: true },
            { id: 'achievements', title: 'Honors & Awards',          type: 'achievements', enabled: true },
            { id: 'languages',    title: 'Languages',                type: 'languages',    enabled: true },
            { id: 'hobbies',      title: 'Interests',                type: 'hobbies',      enabled: true },
        ],
        layout: {
            type: 'single',
            header: 'centered-serif',
        },
        sectionStyles: {
            experience: 'border-left',
            skills:     'grid2',
            hobbies:    'dot-join',
            languages:  'grid2',
        },
    },
    {
        key: 'ats',
        sections: [
            { id: 'summary',      title: 'Professional Summary', type: 'paragraph',    enabled: true },
            { id: 'experience',   title: 'Work Experience',      type: 'experience',   enabled: true },
            { id: 'projects',     title: 'Projects',             type: 'projects',     enabled: true },
            { id: 'education',    title: 'Education',            type: 'education',    enabled: true },
            { id: 'skills',       title: 'Skills',               type: 'skills',       enabled: true },
            { id: 'certificates', title: 'Certifications',       type: 'certificates', enabled: true },
            { id: 'achievements', title: 'Achievements',         type: 'achievements', enabled: true },
            { id: 'languages',    title: 'Languages',            type: 'languages',    enabled: true },
            { id: 'hobbies',      title: 'Interests',            type: 'hobbies',      enabled: true },
        ],
        layout: {
            type: 'single',
            header: 'left-border-bottom',
        },
        sectionStyles: {
            experience: 'plain',
            skills:     'dot-join',
            hobbies:    'dot-join',
            languages:  'dot-join',
        },
    },
    {
        key: 'ats-compact',
        sections: [
            { id: 'summary',      title: 'Summary',       type: 'paragraph',    enabled: true },
            { id: 'experience',   title: 'Experience',    type: 'experience',   enabled: true },
            { id: 'education',    title: 'Education',     type: 'education',    enabled: true },
            { id: 'skills',       title: 'Skills',        type: 'skills',       enabled: true },
            { id: 'certificates', title: 'Certifications',type: 'certificates', enabled: true },
            { id: 'achievements', title: 'Achievements',  type: 'achievements', enabled: true },
            { id: 'projects',     title: 'Projects',      type: 'projects',     enabled: true },
            { id: 'languages',    title: 'Languages',     type: 'languages',    enabled: true },
            { id: 'hobbies',      title: 'Interests',     type: 'hobbies',      enabled: true },
        ],
        layout: {
            type: 'single',
            header: 'three-col',
        },
        sectionStyles: {
            experience: 'compact',
            skills:     'grid3',
            hobbies:    'dot-join',
            languages:  'dot-join',
        },
    },
];

async function run() {
    const client = new MongoClient(MONGO_URI);
    try {
        console.log('🔗 Connecting to MongoDB…');
        await client.connect();
        const col = client.db(DB_NAME).collection(COLLECTION_NAME);

        for (const tpl of TEMPLATE_UPDATES) {
            const result = await col.updateOne(
                { key: tpl.key },
                {
                    $set: {
                        sections:      tpl.sections,
                        layout:        tpl.layout,
                        sectionStyles: tpl.sectionStyles,
                        updatedAt:     new Date().toISOString(),
                    },
                }
            );
            const status = result.matchedCount > 0
                ? (result.modifiedCount > 0 ? '✓ updated' : '— already up to date')
                : '✗ not found';
            console.log(`  ${status}: ${tpl.key}`);
        }

        console.log('\n✅ Layout migration complete!');
    } catch (err) {
        console.error('❌ Migration error:', err.message);
        process.exit(1);
    } finally {
        await client.close();
    }
}

run();
