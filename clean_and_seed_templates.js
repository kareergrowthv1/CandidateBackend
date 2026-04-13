const dotenv = require('dotenv');
dotenv.config();

const { getCollection, COLLECTIONS } = require('./src/config/mongo');

const RESUME_TEMPLATES = [
    {
        key: 'classic',
        name: 'Classic',
        description: 'Timeless professional resume design perfect for all industries.',
        thumbnailColor: '#000000',
        tags: ['Classic', 'Professional', 'Universal'],
        isSystemTemplate: true,
        availablePlanIds: ['all'],
        availablePlanNames: ['all'],
        sections: []
    },
    {
        key: 'modern',
        name: 'Modern',
        description: 'Contemporary design with clean typography and modern styling.',
        thumbnailColor: '#3b82f6',
        tags: ['Modern', 'Trendy', 'Tech'],
        isSystemTemplate: true,
        availablePlanIds: ['all'],
        availablePlanNames: ['all'],
        sections: []
    },
    {
        key: 'minimal',
        name: 'Minimal',
        description: 'Simple and minimal design emphasizing content over decoration.',
        thumbnailColor: '#6b7280',
        tags: ['Minimal', 'Clean', 'Simple'],
        isSystemTemplate: true,
        availablePlanIds: ['all'],
        availablePlanNames: ['all'],
        sections: []
    },
    {
        key: 'minimal-image',
        name: 'Minimal Image',
        description: 'Minimal design with space for a profile image.',
        thumbnailColor: '#9ca3af',
        tags: ['Minimal', 'Image', 'Professional'],
        isSystemTemplate: true,
        availablePlanIds: ['all'],
        availablePlanNames: ['all'],
        sections: []
    },
    {
        key: 'executive',
        name: 'Executive',
        description: 'Professional executive resume with two-column layout.',
        thumbnailColor: '#0f766e',
        tags: ['Executive', 'Leadership', 'Advanced'],
        isSystemTemplate: true,
        availablePlanIds: ['all'],
        availablePlanNames: ['all'],
        sections: []
    },
    {
        key: 'academic',
        name: 'Academic',
        description: 'Academic-focused CV design with publications and research.',
        thumbnailColor: '#7c3aed',
        tags: ['Academic', 'Research', 'Education'],
        isSystemTemplate: true,
        availablePlanIds: ['all'],
        availablePlanNames: ['all'],
        sections: []
    },
    {
        key: 'ats',
        name: 'ATS Friendly',
        description: 'Optimized for ATS (Applicant Tracking System) parsing.',
        thumbnailColor: '#059669',
        tags: ['ATS', 'Optimized', 'Compatible'],
        isSystemTemplate: true,
        availablePlanIds: ['all'],
        availablePlanNames: ['all'],
        sections: []
    },
    {
        key: 'ats-compact',
        name: 'ATS Compact',
        description: 'Compact ATS-friendly resume for concise information.',
        thumbnailColor: '#017857',
        tags: ['ATS', 'Compact', 'Concise'],
        isSystemTemplate: true,
        availablePlanIds: ['all'],
        availablePlanNames: ['all'],
        sections: []
    }
];

(async () => {
    try {
        console.log('🔗 Connecting to MongoDB...');
        const templatesCol = await getCollection(COLLECTIONS.RESUME_TEMPLATES);
        
        console.log('🗑️  Deleting all existing templates...');
        const deleteResult = await templatesCol.deleteMany({});
        console.log(`  ✓ Deleted ${deleteResult.deletedCount} templates`);
        
        console.log('✨ Inserting 8 new templates...');
        const now = new Date().toISOString();
        const docs = RESUME_TEMPLATES.map(tpl => ({
            ...tpl,
            createdAt: now,
            updatedAt: now
        }));
        
        const insertResult = await templatesCol.insertMany(docs);
        console.log(`  ✓ Inserted ${insertResult.insertedCount} new templates`);
        
        console.log('\n📋 All templates in database:');
        const all = await templatesCol.find({}).toArray();
        all.forEach((tpl, i) => {
            console.log(`  ${i + 1}. ${tpl.name} (${tpl.key}) — ID: ${tpl._id}`);
        });
        
        console.log('\n✅ Cleanup and seeding complete!');
        process.exit(0);
    } catch (err) {
        console.error('❌ Error:', err.message);
        process.exit(1);
    }
})();
