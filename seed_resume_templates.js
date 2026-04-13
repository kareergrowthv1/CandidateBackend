#!/usr/bin/env node
/**
 * Migration script: Update MongoDB resume templates
 * Deletes old templates (Modern Slate, Executive Grid, Minimal Mono)
 * Inserts 8 new professional templates
 *
 * Usage: node seed_resume_templates.js
 */

const { MongoClient, ObjectId } = require('mongodb');

const MONGO_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017';
const DB_NAME = process.env.MONGODB_DB_NAME || 'kareergrowth';
const COLLECTION_NAME = 'resume_templates';

// ── New templates to seed ────────────────────────────────────────────────
const NEW_TEMPLATES = [
    {
        key: 'classic',
        name: 'Classic',
        description: 'Clean professional with accented headings',
        thumbnailColor: '#2563eb',
        tags: ['Classic', 'Professional', 'Traditional'],
        isSystemTemplate: true,
        availablePlanIds: [],
        availablePlanNames: [],
        styleConfig: {
            fontFamily: 'Georgia, Times New Roman, serif',
            headingColor: '#171717',
            bodyColor: '#3f3f46',
            accentColor: '#2563eb'
        },
        sections: [
            { id: 'summary', title: 'Professional Summary', type: 'paragraph', enabled: true },
            { id: 'experience', title: 'Experience', type: 'bullets', enabled: true },
            { id: 'skills', title: 'Skills', type: 'tags', enabled: true },
            { id: 'education', title: 'Education', type: 'bullets', enabled: true }
        ]
    },
    {
        key: 'modern',
        name: 'Modern',
        description: 'Bold header style with contemporary layout',
        thumbnailColor: '#10B981',
        tags: ['Modern', 'Contemporary', 'Bold'],
        isSystemTemplate: true,
        availablePlanIds: [],
        availablePlanNames: [],
        styleConfig: {
            fontFamily: 'Arial, Helvetica, sans-serif',
            headingColor: '#1f2937',
            bodyColor: '#4b5563',
            accentColor: '#10B981'
        },
        sections: [
            { id: 'summary', title: 'Professional Summary', type: 'paragraph', enabled: true },
            { id: 'experience', title: 'Experience', type: 'bullets', enabled: true },
            { id: 'skills', title: 'Skills', type: 'tags', enabled: true },
            { id: 'projects', title: 'Projects', type: 'bullets', enabled: true }
        ]
    },
    {
        key: 'minimal',
        name: 'Minimal',
        description: 'Ultra-light typography, content-first',
        thumbnailColor: '#8B5CF6',
        tags: ['Minimal', 'Light', 'Minimal'],
        isSystemTemplate: true,
        availablePlanIds: [],
        availablePlanNames: [],
        styleConfig: {
            fontFamily: 'Cambria, Georgia, serif',
            headingColor: '#111827',
            bodyColor: '#4b5563',
            accentColor: '#8B5CF6'
        },
        sections: [
            { id: 'summary', title: 'Summary', type: 'paragraph', enabled: true },
            { id: 'experience', title: 'Experience', type: 'bullets', enabled: true },
            { id: 'skills', title: 'Skills', type: 'paragraph', enabled: true }
        ]
    },
    {
        key: 'minimal-image',
        name: 'Minimal Image',
        description: 'Sidebar layout with profile photo',
        thumbnailColor: '#EF4444',
        tags: ['Minimal', 'Image', 'Sidebar'],
        isSystemTemplate: true,
        availablePlanIds: [],
        availablePlanNames: [],
        styleConfig: {
            fontFamily: 'Arial, Helvetica, sans-serif',
            headingColor: '#1f2937',
            bodyColor: '#4b5563',
            accentColor: '#EF4444'
        },
        sections: [
            { id: 'summary', title: 'Summary', type: 'paragraph', enabled: true },
            { id: 'experience', title: 'Experience', type: 'bullets', enabled: true },
            { id: 'skills', title: 'Skills', type: 'tags', enabled: true }
        ]
    },
    {
        key: 'executive',
        name: 'Executive',
        description: 'Two-column power layout for senior roles',
        thumbnailColor: '#F59E0B',
        tags: ['Executive', 'Two Column', 'Leadership'],
        isSystemTemplate: true,
        availablePlanIds: [],
        availablePlanNames: [],
        styleConfig: {
            fontFamily: 'Cambria, Georgia, serif',
            headingColor: '#0f172a',
            bodyColor: '#1f2937',
            accentColor: '#F59E0B'
        },
        sections: [
            { id: 'summary', title: 'Executive Summary', type: 'paragraph', enabled: true },
            { id: 'experience', title: 'Experience', type: 'bullets', enabled: true },
            { id: 'skills', title: 'Core Skills', type: 'tags', enabled: true }
        ]
    },
    {
        key: 'academic',
        name: 'Academic',
        description: 'Formal CV for education and research',
        thumbnailColor: '#EC4899',
        tags: ['Academic', 'CV', 'Formal'],
        isSystemTemplate: true,
        availablePlanIds: [],
        availablePlanNames: [],
        styleConfig: {
            fontFamily: 'Georgia, Times New Roman, serif',
            headingColor: '#171717',
            bodyColor: '#3f3f46',
            accentColor: '#EC4899'
        },
        sections: [
            { id: 'summary', title: 'Research Interests', type: 'paragraph', enabled: true },
            { id: 'education', title: 'Education', type: 'bullets', enabled: true },
            { id: 'experience', title: 'Professional Experience', type: 'bullets', enabled: true }
        ]
    },
    {
        key: 'ats',
        name: 'ATS Friendly',
        description: 'Serif style, keyword-optimized for ATS systems',
        thumbnailColor: '#06B6D4',
        tags: ['ATS', 'Friendly', 'Optimized'],
        isSystemTemplate: true,
        availablePlanIds: [],
        availablePlanNames: [],
        styleConfig: {
            fontFamily: 'Georgia, Times New Roman, serif',
            headingColor: '#111827',
            bodyColor: '#374151',
            accentColor: '#06B6D4'
        },
        sections: [
            { id: 'summary', title: 'Professional Summary', type: 'paragraph', enabled: true },
            { id: 'skills', title: 'Skills', type: 'bullets', enabled: true },
            { id: 'experience', title: 'Experience', type: 'bullets', enabled: true }
        ]
    },
    {
        key: 'ats-compact',
        name: 'ATS Compact',
        description: 'Dense format for experienced professionals',
        thumbnailColor: '#171717',
        tags: ['ATS', 'Compact', 'Dense'],
        isSystemTemplate: true,
        availablePlanIds: [],
        availablePlanNames: [],
        styleConfig: {
            fontFamily: 'Arial, Helvetica, sans-serif',
            headingColor: '#111827',
            bodyColor: '#374151',
            accentColor: '#171717'
        },
        sections: [
            { id: 'summary', title: 'Summary', type: 'paragraph', enabled: true },
            { id: 'experience', title: 'Experience', type: 'bullets', enabled: true },
            { id: 'skills', title: 'Skills', type: 'tags', enabled: true }
        ]
    }
];

// ── Old template keys to delete ──────────────────────────────────────────
const OLD_KEYS_TO_DELETE = ['modern-slate', 'executive-grid', 'minimal-mono'];

async function migrate() {
    const client = new MongoClient(MONGO_URI);

    try {
        console.log('🔗 Connecting to MongoDB...');
        await client.connect();
        const db = client.db(DB_NAME);
        const collection = db.collection(COLLECTION_NAME);

        // Delete old templates
        console.log('\n🗑️  Deleting old templates...');
        for (const key of OLD_KEYS_TO_DELETE) {
            const result = await collection.deleteOne({ key });
            console.log(`  ✓ Deleted "${key}" — matched: ${result.deletedCount}`);
        }

        // Insert new templates
        console.log('\n✨ Inserting new templates...');
        const now = new Date().toISOString();
        const docsToInsert = NEW_TEMPLATES.map(tpl => ({
            ...tpl,
            createdAt: now,
            updatedAt: now
        }));

        const result = await collection.insertMany(docsToInsert);
        console.log(`  ✓ Inserted ${result.insertedIds.length} new templates`);

        // List all templates
        console.log('\n📋 All templates in database:');
        const allTemplates = await collection.find({}).sort({ createdAt: 1 }).toArray();
        allTemplates.forEach((tpl, idx) => {
            console.log(`  ${idx + 1}. ${tpl.name} (${tpl.key}) — ID: ${tpl._id}`);
        });

        console.log('\n✅ Migration complete!');
    } catch (err) {
        console.error('❌ Migration error:', err);
        process.exit(1);
    } finally {
        await client.close();
    }
}

migrate();
