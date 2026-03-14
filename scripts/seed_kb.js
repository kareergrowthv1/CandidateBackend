const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });
const { connect, getKbCollection, KB_COLLECTIONS, close } = require('../src/config/mongo');

const topics = [
    {
        title: 'Java',
        slug: 'java',
        icon: 'Coffee', // Just a string identifier for frontend to map to an icon
        description: 'Learn object-oriented programming with Java.',
        isBooming: true,
    },
    {
        title: 'Python',
        slug: 'python',
        icon: 'TerminalSquare',
        description: 'Master Python for data science, AI, and backend development.',
        isBooming: true,
    },
    {
        title: 'Database (SQL)',
        slug: 'sql',
        icon: 'Database',
        description: 'Relational database concepts, queries, and optimization.',
        isBooming: true,
    },
    {
        title: 'MySQL',
        slug: 'mysql',
        icon: 'Database',
        description: 'Deep dive into MySQL administration and advanced querying.',
        isBooming: false,
    },
    {
        title: 'MongoDB',
        slug: 'mongodb',
        icon: 'DatabaseZap',
        description: 'NoSQL document database for modern web applications.',
        isBooming: true,
    },
    {
        title: 'PostgreSQL',
        slug: 'postgresql',
        icon: 'Database',
        description: 'Advanced open-source relational database management system.',
        isBooming: true,
    },
    {
        title: 'HTML & CSS',
        slug: 'html-css',
        icon: 'LayoutTemplate',
        description: 'The foundation of web pages, structuring and styling the web.',
        isBooming: false,
    },
    {
        title: 'JavaScript',
        slug: 'javascript',
        icon: 'FileCode2',
        description: 'Make web pages interactive and build full-stack applications.',
        isBooming: true,
    },
    {
        title: 'React JS',
        slug: 'react-js',
        icon: 'Atom',
        description: 'A JavaScript library for building user interfaces.',
        isBooming: true,
    },
    {
        title: 'Node JS',
        slug: 'node-js',
        icon: 'Server',
        description: 'JavaScript runtime built on Chrome\'s V8 JavaScript engine.',
        isBooming: true,
    },
    {
        title: 'Angular',
        slug: 'angular',
        icon: 'Hexagon',
        description: 'Platform for building mobile and desktop web applications.',
        isBooming: false,
    },
    {
        title: 'DevOps',
        slug: 'devops',
        icon: 'Settings',
        description: 'Practices that combine software development and IT operations.',
        isBooming: true,
    },
    {
        title: 'AI/ML',
        slug: 'ai-ml',
        icon: 'BrainCircuit',
        description: 'Artificial Intelligence and Machine Learning fundamentals.',
        isBooming: true,
    }
];

// Sample contents mapped by topic slug
const sampleContents = [
    {
        topicSlug: 'react-js',
        title: 'Understanding React Hooks',
        type: 'article',
        content: 'React Hooks are functions that let you "hook into" React state and lifecycle features from function components. The most common hooks are useState and useEffect...',
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        topicSlug: 'python',
        title: 'Python List Comprehensions',
        type: 'snippet',
        content: 'nums = [1, 2, 3, 4]\nsquares = [n**2 for n in nums]\nprint(squares) # [1, 4, 9, 16]',
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        topicSlug: 'ai-ml',
        title: 'Introduction to Neural Networks',
        type: 'video_link',
        content: 'https://www.youtube.com/watch?v=aircAruvnKk',
        createdAt: new Date(),
        updatedAt: new Date()
    }
];

async function seed() {
    try {
        console.log('Connecting to database...');
        await connect();

        const topicsCollection = await getKbCollection(KB_COLLECTIONS.TOPICS);
        const contentsCollection = await getKbCollection(KB_COLLECTIONS.CONTENTS);

        // Clear existing
        console.log('Clearing existing Knowledge Base data...');
        await topicsCollection.deleteMany({});
        await contentsCollection.deleteMany({});

        // Create Indexes
        await topicsCollection.createIndex({ slug: 1 }, { unique: true });
        await contentsCollection.createIndex({ topicSlug: 1 });

        // Seed Topics
        console.log(`Seeding ${topics.length} topics...`);
        const topicsWithDates = topics.map(t => ({
            ...t,
            createdAt: new Date(),
            updatedAt: new Date()
        }));
        await topicsCollection.insertMany(topicsWithDates);

        // Seed Contents
        console.log(`Seeding sample contents...`);
        await contentsCollection.insertMany(sampleContents);

        console.log('Knowledge Base seeding completed successfully!');
    } catch (error) {
        console.error('Error seeding Knowledge Base:', error);
    } finally {
        close();
        process.exit(0);
    }
}

seed();
