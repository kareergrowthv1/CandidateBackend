require('dotenv').config();
const { connect, getProgCollection, PROG_COLLECTIONS, close } = require('../src/config/mongo');

async function seed() {
    try {
        await connect();
        const coursesCol = await getProgCollection(PROG_COLLECTIONS.COURSES);
        const modulesCol = await getProgCollection(PROG_COLLECTIONS.MODULES);
        const lessonsCol = await getProgCollection(PROG_COLLECTIONS.LESSONS);

        // Clear existing data
        await coursesCol.deleteMany({});
        await modulesCol.deleteMany({});
        await lessonsCol.deleteMany({});

        const courses = [
            {
                slug: 'java',
                name: 'Learn Java',
                description: 'Learn to code in Java — a robust programming language used to create software, web and mobile apps, and more.',
                projectsCount: 14,
                lessonsCount: 16,
                level: 'Beginner friendly'
            },
            {
                slug: 'sql',
                name: 'Learn SQL',
                description: 'Master the language used to communicate with databases and manage data effectively.',
                projectsCount: 8,
                lessonsCount: 10,
                level: 'Beginner'
            },
            {
                slug: 'html',
                name: 'Learn HTML',
                description: 'The foundation of the web. Learn how to structure your web pages with HTML5.',
                projectsCount: 6,
                lessonsCount: 8,
                level: 'Beginner'
            },
            {
                slug: 'css',
                name: 'Learn CSS',
                description: 'Style your websites with CSS. Learn about layouts, colors, animations, and responsive design.',
                projectsCount: 10,
                lessonsCount: 12,
                level: 'Beginner'
            },
            {
                slug: 'javascript',
                name: 'Learn JavaScript',
                description: 'Bring your websites to life with JavaScript. Learn about variables, loops, and DOM manipulation.',
                projectsCount: 15,
                lessonsCount: 20,
                level: 'Intermediate'
            },
            {
                slug: 'python',
                name: 'Learn Python',
                description: 'One of the most popular and versatile programming languages for data science, AI, and automation.',
                projectsCount: 20,
                lessonsCount: 25,
                level: 'Beginner'
            },
            {
                slug: 'devops',
                name: 'Learn DevOps',
                description: 'Bridge the gap between development and operations. Learn about CI/CD, Docker, and Kubernetes.',
                projectsCount: 8,
                lessonsCount: 12,
                level: 'Intermediate'
            }
        ];

        await coursesCol.insertMany(courses);

        const allCourses = await coursesCol.find({}).toArray();
        const modulesData = [];

        for (const course of allCourses) {
            modulesData.push({
                courseId: course._id,
                order: 1,
                title: `Welcome to ${course.name}`,
                description: `Get started with the fundamentals of ${course.name.replace('Learn ', '')}.`,
                lessons: [
                    { title: 'Introduction', duration: '5 min' },
                    { title: 'Setting up the environment', duration: '10 min' },
                    { title: 'Hello World', duration: '15 min' }
                ]
            });
            modulesData.push({
                courseId: course._id,
                order: 2,
                title: 'Core Concepts',
                description: `Deep dive into the essential components of ${course.name.replace('Learn ', '')}.`,
                lessons: [
                    { title: 'Variables and Constants', duration: '10 min' },
                    { title: 'Data Types', duration: '15 min' },
                    { title: 'Basic Operations', duration: '20 min' }
                ]
            });
        }

        await modulesCol.insertMany(modulesData);

        console.log('Programming database seeded successfully!');
    } catch (error) {
        console.error('Error seeding Programming database:', error);
    } finally {
        await close();
    }
}

seed();
