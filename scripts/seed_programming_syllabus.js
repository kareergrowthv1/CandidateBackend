require('dotenv').config();
const { connect, getProgCollection, PROG_COLLECTIONS, close } = require('../src/config/mongo');

async function seed() {
    try {
        await connect();
        const coursesCol = await getProgCollection(PROG_COLLECTIONS.COURSES);
        const modulesCol = await getProgCollection(PROG_COLLECTIONS.MODULES);

        await coursesCol.deleteMany({});
        await modulesCol.deleteMany({});

        // ─── COURSES ────────────────────────────────────────────────────────
        const courses = [
            { slug: 'java', name: 'Learn Java', description: 'Learn to code in Java — a robust programming language used to create software, web and mobile apps, and more.', projectsCount: 14, lessonsCount: 16, level: 'Beginner friendly' },
            { slug: 'sql', name: 'Learn SQL', description: 'Master the language used to communicate with databases and manage data effectively.', projectsCount: 8, lessonsCount: 10, level: 'Beginner' },
            { slug: 'html', name: 'Learn HTML', description: 'The foundation of the web. Learn how to structure your web pages with HTML5.', projectsCount: 6, lessonsCount: 8, level: 'Beginner' },
            { slug: 'css', name: 'Learn CSS', description: 'Style your websites with CSS. Learn about layouts, colors, animations, and responsive design.', projectsCount: 10, lessonsCount: 12, level: 'Beginner' },
            { slug: 'javascript', name: 'Learn JavaScript', description: 'Bring your websites to life with JavaScript. Learn about variables, loops, and DOM manipulation.', projectsCount: 15, lessonsCount: 20, level: 'Intermediate' },
            { slug: 'python', name: 'Learn Python', description: 'One of the most popular and versatile programming languages for data science, AI, and automation.', projectsCount: 20, lessonsCount: 25, level: 'Beginner' },
            { slug: 'devops', name: 'Learn DevOps', description: 'Bridge the gap between development and operations. Learn about CI/CD, Docker, and Kubernetes.', projectsCount: 8, lessonsCount: 12, level: 'Intermediate' },
        ];

        await coursesCol.insertMany(courses);
        const allCourses = await coursesCol.find({}).toArray();
        const c = (slug) => allCourses.find(x => x.slug === slug)._id;

        // ─── HELPER ─────────────────────────────────────────────────────────
        const L = (title) => ({ type: 'lesson', title });
        const A = (title) => ({ type: 'article', title });
        const Q = (title) => ({ type: 'quiz', title });
        const P = (title) => ({ type: 'project', title });
        const V = (title) => ({ type: 'video', title });
        const I = (title) => ({ type: 'informational', title });

        const totalConcepts = (items) => items.length;

        // ─── MODULES ────────────────────────────────────────────────────────
        const modulesData = [

            // ══════════════════════ JAVA ══════════════════════════
            {
                courseId: c('java'), order: 1,
                title: 'Hello World',
                description: 'Welcome to the world of Java programming! Java is a popular object-oriented programming language that is used in many different industries.',
                items: [L('Hello World'), A('Java Program Structure'), Q('Hello World'), P('Planting a Tree'), A('What Is an IDE?')],
            },
            {
                courseId: c('java'), order: 2,
                title: 'Variables',
                description: 'Learn about datatypes in Java and how we use them. Then, practice your skills with two projects where you create and manipulate variables.',
                items: [L('Learn Java: Variables'), Q('Java Variables Quiz'), P('Java Variables: Mad Libs'), L('Learn Java: Manipulating Variables'), Q('Java Variable Manipulation Quiz'), P('Math Magic')],
            },
            {
                courseId: c('java'), order: 3,
                title: 'Object-Oriented Java',
                description: 'Learn about object-oriented programming in Java. Explore syntax for defining classes and creating instances.',
                items: [V('Classes and Objects'), L('Java: Introduction to Classes'), Q('Intro to Java Classes'), L('Learn Java: Methods'), Q('Java Methods Quiz'), P('A Basic Calculator'), P('Build A Droid')],
            },
            {
                courseId: c('java'), order: 4,
                title: 'Conditionals and Control Flow',
                description: 'Conditionals and control flow in Java programs.',
                items: [L('Conditionals and Control Flow'), L('Conditional Operators'), Q('Conditionals and Control Flow'), P('A Simple Car Loan Payment Calculator'), P('Continents and Cities')],
            },
            {
                courseId: c('java'), order: 5,
                title: 'Arrays and ArrayLists',
                description: 'Build lists of data with Java arrays and ArrayLists.',
                items: [L('Learn Java: Arrays'), Q('Java Arrays Quiz'), L('Learn Java: ArrayLists'), Q('Java ArrayList Quiz'), P('Desert Island Playlist')],
            },
            {
                courseId: c('java'), order: 6,
                title: 'Loops',
                description: 'Use loops to iterate through lists and repeat code.',
                items: [L('Learn Java: Loops'), Q('Learn Java: Loops Quiz'), P('Fizz Buzz'), P('The Prime Directive')],
            },
            {
                courseId: c('java'), order: 7,
                title: 'String Methods',
                description: 'The Java String class provides a lot of useful methods for performing operations on strings and data manipulation.',
                items: [L('String Methods'), Q('String Methods'), P('DNA Sequencing')],
            },
            {
                courseId: c('java'), order: 8,
                title: 'Access, Encapsulation, and Static Methods',
                description: "Let's dive deeper into classes and learn about some of their more advanced features.",
                items: [L('Access, Encapsulation, and Scope'), Q('Access, Encapsulation, and Scope'), A('Static Methods of the Math Class'), L('Static Variables and Methods'), Q('Static Variables and Methods')],
            },
            {
                courseId: c('java'), order: 9,
                title: 'Inheritance and Polymorphism',
                description: 'Dive deeper into object-oriented Java with inheritance and polymorphism.',
                items: [L('Inheritance and Polymorphism'), Q('Inheritance and Polymorphism Quiz'), P('Language Families')],
            },
            {
                courseId: c('java'), order: 10,
                title: 'Debugging',
                description: 'Learn about different types of errors in Java and practice finding them.',
                items: [L('Debugging'), Q('Debugging'), P('Bug Detective')],
            },
            {
                courseId: c('java'), order: 11,
                title: 'Two-Dimensional Arrays',
                description: 'Take your understanding of arrays and loops to the next dimension! Learn how to create and use two-dimensional arrays.',
                items: [L('2D Arrays: Java'), Q('Quiz: 2D Arrays in Java'), P('2D Arrays: Image Manipulation Project'), I('Next Steps')],
            },
            {
                courseId: c('java'), order: 12,
                title: 'Iterators and Error Handling',
                description: 'Iterate through custom data structures and handle runtime exceptions gracefully.',
                items: [L('Iterators'), L('Error Handling'), Q('Iterators and Error Handling Quiz'), P('Morse Code Translator')],
            },
            {
                courseId: c('java'), order: 13,
                title: 'Interview Prep: Data Structures',
                description: 'Tackle common technical interview questions based on core data structures.',
                items: [P('Linear Data Structures: Java'), P('Hash Maps: Java'), A('Recursion vs Iteration')],
            },

            // ══════════════════════ SQL ══════════════════════════
            {
                courseId: c('sql'), order: 1,
                title: 'Introduction to SQL',
                description: 'Understand what SQL is and how relational databases work.',
                items: [L('Manipulation'), A('What is SQLite?'), Q('Introduction to SQL Quiz')],
            },
            {
                courseId: c('sql'), order: 2,
                title: 'Queries',
                description: 'Write SELECT statements to retrieve and filter data.',
                items: [L('Queries'), Q('Basic Queries Quiz'), P('New York Restaurants')],
            },
            {
                courseId: c('sql'), order: 3,
                title: 'Aggregate Functions',
                description: 'Use SUM, AVG, COUNT, MIN, and MAX to gain insights from data.',
                items: [L('Aggregate Functions'), Q('Aggregate Functions Quiz'), P('Trends in Startups')],
            },
            {
                courseId: c('sql'), order: 4,
                title: 'Multiple Tables',
                description: 'Join tables to create powerful and comprehensive queries.',
                items: [L('Multiple Tables'), L('Joins — Advanced'), Q('Joins Quiz'), P('Lyft Trip Data')],
            },
            {
                courseId: c('sql'), order: 5,
                title: 'Advanced Queries',
                description: 'Use subqueries, CTEs, and window functions.',
                items: [L('Subqueries'), L('Window Functions'), Q('Advanced SQL Quiz'), P('Usage Funnels with Warby Parker'), P('A/B Testing for ShoeFly.com')],
            },

            // ══════════════════════ HTML ══════════════════════════
            {
                courseId: c('html'), order: 1,
                title: 'Elements and Structure',
                description: 'Learn the building blocks of HTML: tags, nesting, and document structure.',
                items: [L('Introduction to HTML'), L('HTML Document Standards'), Q('Elements & Structure Quiz'), P('Fashion Blog')],
            },
            {
                courseId: c('html'), order: 2,
                title: 'Tables',
                description: 'Organize data in a table with rows, columns, and headers.',
                items: [L('HTML Tables'), Q('Tables Quiz'), P('Wine Festival Schedule')],
            },
            {
                courseId: c('html'), order: 3,
                title: 'Forms',
                description: 'Capture user input with form fields, buttons, and validation.',
                items: [L('HTML Forms'), L('Form Validation'), Q('Forms Quiz'), P('HTML Form A-Z')],
            },
            {
                courseId: c('html'), order: 4,
                title: 'Semantic HTML',
                description: 'Use semantic elements to write accessible, meaningful HTML.',
                items: [L('Semantic HTML'), A('What is Accessibility?'), Q('Semantic HTML Quiz'), P('New York City Blog')],
            },

            // ══════════════════════ CSS ══════════════════════════
            {
                courseId: c('css'), order: 1,
                title: 'Selectors and Visual Rules',
                description: 'Target HTML elements and apply styling rules using selectors.',
                items: [L('Intro to CSS'), L('Visual Rules'), Q('Selectors Quiz'), P('Healthy Recipes')],
            },
            {
                courseId: c('css'), order: 2,
                title: 'The Box Model',
                description: 'Understand margin, padding, and border to control layout.',
                items: [L('The Box Model'), A('Changing the Box Model'), Q('Box Model Quiz'), P('Davie\'s Burgers')],
            },
            {
                courseId: c('css'), order: 3,
                title: 'Display and Positioning',
                description: 'Control element flow with display, position, and z-index.',
                items: [L('Display and Positioning'), Q('Display Quiz'), P('Broadway'), P('The Box Model and Layout')],
            },
            {
                courseId: c('css'), order: 4,
                title: 'Flexbox',
                description: 'Create powerful one-dimensional layouts with Flexbox.',
                items: [L('Flexbox'), L('Advanced Flexbox'), Q('Flexbox Quiz'), P('To-Do App Layout'), P('PupSpa')],
            },
            {
                courseId: c('css'), order: 5,
                title: 'Grid',
                description: 'Build complex two-dimensional grid layouts.',
                items: [L('CSS Grid Essentials'), L('Advanced CSS Grid'), Q('Grid Quiz'), P('PetSocial'), P('Task Board')],
            },
            {
                courseId: c('css'), order: 6,
                title: 'Transitions and Animations',
                description: 'Bring your UI to life with CSS animations and transitions.',
                items: [L('Transitions'), L('Animations'), Q('Transitions & Animations Quiz'), P('Kelvin Weather')],
            },
            {
                courseId: c('css'), order: 7,
                title: 'Responsive Design',
                description: 'Create layouts that adapt to different screen sizes.',
                items: [L('Responsive Design and Accessibility'), A('Using CSS Breakpoints'), Q('Responsive Quiz'), P('Tsunami Coffee')],
            },

            // ══════════════════════ JAVASCRIPT ══════════════════════════
            {
                courseId: c('javascript'), order: 1,
                title: 'Introduction to JavaScript',
                description: 'Understand the role of JavaScript and write your first programs.',
                items: [L('Introduction to JavaScript'), A('JavaScript History'), Q('Intro Quiz'), P('Kelvin Weather'), P('Dog Years')],
            },
            {
                courseId: c('javascript'), order: 2,
                title: 'Variables and Data Types',
                description: 'Declare variables with var, let, const and understand primitive types.',
                items: [L('Variables'), L('Data Types & Constructors'), Q('Variables Quiz'), P('Whale Talk')],
            },
            {
                courseId: c('javascript'), order: 3,
                title: 'Conditionals',
                description: 'Direct program flow using if-else, ternary, and switch statements.',
                items: [L('Conditionals'), Q('Conditionals Quiz'), P('Magic Eight Ball'), P('Race Day')],
            },
            {
                courseId: c('javascript'), order: 4,
                title: 'Functions',
                description: 'Write reusable code with parameters, return values, and arrow functions.',
                items: [L('Functions'), L('Arrow Functions'), Q('Functions Quiz'), P('Rock, Paper, Scissors'), P('Sleep Debt Calculator')],
            },
            {
                courseId: c('javascript'), order: 5,
                title: 'Scope',
                description: 'Understand global vs. block scope and variable hoisting.',
                items: [L('Scope'), Q('Scope Quiz'), P('Training Days')],
            },
            {
                courseId: c('javascript'), order: 6,
                title: 'Arrays',
                description: 'Store and manipulate collections of data with array methods.',
                items: [L('Arrays'), L('Higher-Order Functions'), Q('Arrays Quiz'), P('Secret Message'), P('Iterators')],
            },
            {
                courseId: c('javascript'), order: 7,
                title: 'Objects',
                description: 'Model real-world entities using key-value pairs and methods.',
                items: [L('Objects'), L('Objects: Advanced'), Q('Objects Quiz'), P('Meal Maker'), P('Team Stats')],
            },
            {
                courseId: c('javascript'), order: 8,
                title: 'Classes and Modules',
                description: 'Use ES6 classes and organize code with modules.',
                items: [L('Classes'), L('Modules'), Q('Classes Quiz'), P('Build a Library'), P('School Catalogue')],
            },
            {
                courseId: c('javascript'), order: 9,
                title: 'Async JavaScript',
                description: 'Promises, async/await, and working with external APIs.',
                items: [L('Promises'), L('Async/Await'), L('Requests with Fetch API'), Q('Async Quiz'), P('Film Finder'), P('Ravenous')],
            },

            // ══════════════════════ PYTHON ══════════════════════════
            {
                courseId: c('python'), order: 1,
                title: 'Hello World',
                description: 'Your first Python program. Learn how to print, use comments, and understand the interpreter.',
                items: [L('Hello World'), A('Python vs Other Languages'), Q('Python Basics Quiz'), P('Pythagorean Theorem')],
            },
            {
                courseId: c('python'), order: 2,
                title: 'Variables and Types',
                description: 'Store information in variables and understand Python data types.',
                items: [L('Python Syntax'), L('Python Variables'), Q('Variables Quiz'), P('Gradebook'), P('Guitar Lessons')],
            },
            {
                courseId: c('python'), order: 3,
                title: 'Control Flow',
                description: 'Use conditionals and logical operators to direct program flow.',
                items: [L('Python Control Flow'), Q('Control Flow Quiz'), P('Magic 8-Ball'), P('Block Letters')],
            },
            {
                courseId: c('python'), order: 4,
                title: 'Lists',
                description: 'Store sequential data and iterate efficiently.',
                items: [L('Python Lists'), L('Python List Comprehensions'), Q('Lists Quiz'), P('Carly\'s Clippers'), P('Len\'s Slice')],
            },
            {
                courseId: c('python'), order: 5,
                title: 'Loops',
                description: 'Automate repetitive tasks using for and while loops.',
                items: [L('Python Loops'), Q('Loops Quiz'), P('Drills: Loops'), P('Basta Fazoolin\'')],
            },
            {
                courseId: c('python'), order: 6,
                title: 'Functions',
                description: 'Write reusable functions and understand scope.',
                items: [L('Python Functions'), L('Lambda Functions'), Q('Functions Quiz'), P('Getting Ready for Physics Class'), P('Coding Challenges: Functions')],
            },
            {
                courseId: c('python'), order: 7,
                title: 'Dictionaries',
                description: 'Store key-value data and retrieve it efficiently.',
                items: [L('Python Dictionaries'), L('Python Files'), Q('Dictionaries Quiz'), P('Hurricane Analysis'), P('Scrabble')],
            },
            {
                courseId: c('python'), order: 8,
                title: 'Classes',
                description: 'Model real-world entities using object-oriented programming.',
                items: [L('Python Classes'), L('Python Inheritance'), Q('Classes Quiz'), P('Basta Fazoolin\': OOP'), P('Sublime Limes\' Line Graphs')],
            },

            // ══════════════════════ DEVOPS ══════════════════════════
            {
                courseId: c('devops'), order: 1,
                title: 'Introduction to DevOps',
                description: 'Understand the principles, culture, and goals of DevOps.',
                items: [L('What is DevOps?'), A('DevOps vs Agile'), Q('DevOps Intro Quiz')],
            },
            {
                courseId: c('devops'), order: 2,
                title: 'Version Control with Git',
                description: 'Manage code changes and collaborate using Git and GitHub.',
                items: [L('Git Basics'), L('Git Branching and Merging'), A('Git vs GitHub'), Q('Git Quiz'), P('Git Workflow')],
            },
            {
                courseId: c('devops'), order: 3,
                title: 'CI/CD Pipelines',
                description: 'Automate testing and deployment with Continuous Integration.',
                items: [L('Introduction to CI/CD'), L('GitHub Actions Basics'), Q('CI/CD Quiz'), P('Build a GitHub Action Pipeline'), P('Deploying a Node App')],
            },
            {
                courseId: c('devops'), order: 4,
                title: 'Docker',
                description: 'Package and ship applications using Docker containers.',
                items: [L('Docker Fundamentals'), L('Docker Compose'), Q('Docker Quiz'), P('Containerize a REST API'), P('Multi-Container Web App')],
            },
            {
                courseId: c('devops'), order: 5,
                title: 'Kubernetes',
                description: 'Orchestrate containerized applications at scale.',
                items: [L('Kubernetes Architecture'), L('Pods, Services, Deployments'), Q('Kubernetes Quiz'), P('Deploy to Minikube'), P('Kubernetes Scaling Lab')],
            },
            {
                courseId: c('devops'), order: 6,
                title: 'Monitoring and Logging',
                description: 'Set up observability to detect and fix production issues.',
                items: [L('Introduction to Monitoring'), L('Using Prometheus & Grafana'), Q('Monitoring Quiz'), P('Set Up a Dashboard')],
            },
        ];

        // Derive counts from items
        for (const mod of modulesData) {
            mod.lessonsCount = mod.items.filter(i => i.type === 'lesson').length;
            mod.articlesCount = mod.items.filter(i => i.type === 'article').length;
            mod.quizzesCount = mod.items.filter(i => i.type === 'quiz').length;
            mod.projectsCount = mod.items.filter(i => i.type === 'project').length;
            mod.videosCount = mod.items.filter(i => i.type === 'video').length;
            mod.conceptsCount = mod.items.length;
        }

        await modulesCol.insertMany(modulesData);

        const totalItems = modulesData.reduce((sum, m) => sum + m.items.length, 0);
        console.log('✅ Programming syllabi seeded successfully!');
        console.log(`   Courses: ${courses.length}`);
        console.log(`   Modules: ${modulesData.length}`);
        console.log(`   Total content items: ${totalItems}`);
    } catch (error) {
        console.error('❌ Error seeding syllabus:', error);
        throw error;
    } finally {
        await close();
    }
}

seed();
