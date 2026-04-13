/**
 * Seed HTML/CSS course — Lesson 2: "How the Web Works" (full rich content).
 * Run from CandidateBackend: node scripts/html/how_web_works_seed.js
 */
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../../.env') });
const { MongoClient, ObjectId } = require('mongodb');

const MONGO_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017';
const DB_NAME = 'Programming';
const COURSE_SLUG = 'html-css';
const MODULE_TITLE = 'Introduction to HTML';
const LESSON_TITLE = 'How the Web Works';
const LESSON_ID = '69b900188c89a2213bb71348';

function buildContent() {
  return [
    { type: 'label', value: 'Web Basics' },
    { type: 'heading', value: 'How the Web Works' },
    { type: 'duration', value: '30 min' },

    { type: 'section_heading', value: '1. Introduction' },
    { type: 'text', value: 'The Web (World Wide Web) is a system that allows users to access websites using the internet. It works based on a continuous communication loop between a client (your browser) and a server.' },
    {
      type: 'rich_text',
      value: '<div class="bg-indigo-50 p-4 rounded-lg border-l-4 border-indigo-500 my-4"><strong>Main Idea:</strong> You type a URL → Request goes to server → Server sends response → Browser shows website.</div>',
    },

    { type: 'section_heading', value: '2. Key Components of the Web' },
    {
      type: 'list',
      value: [
        '<strong>Client (Browser):</strong> Software used to access websites (Chrome, Safari, Edge). It sends requests and displays responses. Browsers can understand and render HTML directly.',
        '<strong>Server:</strong> A powerful computer that stores website files and sends data when requested by a client.',
        '<strong>Internet:</strong> The global network that connects billions of clients and servers.',
        '<strong>Protocol (HTTP/HTTPS):</strong> The rules for communication. HTTPS is the secure, encrypted version of HTTP.',
      ],
    },

    { type: 'section_heading', value: 'Web Communication Flow' },
    {
      type: 'image',
      value: '/images/web_flow.png',
      caption: 'Visualizing the Request-Response cycle and DNS resolution',
    },

    { type: 'section_heading', value: '3. What Happens When You Enter a URL' },
    {
      type: 'list',
      value: [
        '<strong>Step 1: URL Entry:</strong> You type a URL like <code class="font-mono">www.google.com</code>.',
        '<strong>Step 2: DNS Resolution:</strong> The Domain Name is converted into an IP address. Computers understand numbers, not names!',
        '<strong>Step 3: Request Sent:</strong> The browser sends an HTTP request to that IP address.',
        '<strong>Step 4: Server Processing:</strong> The server finds the requested resource (HTML file, image, or data).',
        '<strong>Step 5: Response Sent:</strong> The server sends back a response containing HTML, CSS, and JavaScript.',
        '<strong>Step 6: Browser Rendering:</strong> The browser reads these files and "paints" the webpage for you.',
      ],
    },

    { type: 'section_heading', value: '4. Role of HTML in the Web' },
    {
      type: 'rich_text',
      value: '<div class="bg-amber-50 p-4 rounded-lg border-l-4 border-amber-500 my-4 text-amber-900 italic font-medium"><strong>Key Fact:</strong> HTML is the standard language of the web. Browsers can ONLY directly understand HTML; CSS and JavaScript are auxiliary layers that attach to the HTML skeleton.</div>',
    },
    {
      type: 'rich_text',
      value: '<table class="min-w-full text-sm border-collapse border border-gray-200"><thead><tr class="bg-gray-50"><th class="px-4 py-2 border text-left">Layer</th><th class="px-4 py-2 border text-left">Analogy</th><th class="px-4 py-2 border text-left">Function</th></tr></thead><tbody><tr><td class="px-4 py-2 border font-bold">HTML</td><td class="px-4 py-2 border">Skeleton</td><td class="px-4 py-2 border">Structural content (Text, Images)</td></tr><tr><td class="px-4 py-2 border font-bold">CSS</td><td class="px-4 py-2 border">Skin/Clothes</td><td class="px-4 py-2 border">Design (Colors, Layout)</td></tr><tr><td class="px-4 py-2 border font-bold">JS</td><td class="px-4 py-2 border">Brain</td><td class="px-4 py-2 border">Functionality (Clicks, Animations)</td></tr></tbody></table>',
    },

    { type: 'section_heading', value: '5. Frontend vs Backend' },
    {
      type: 'list',
      value: [
        '<strong>Frontend:</strong> Everything the user sees and interacts with. Technologies: HTML, CSS, JavaScript.',
        '<strong>Backend:</strong> The logic that happens on the server. Technologies: Node.js, Java, Python, SQL.',
      ],
    },

    { type: 'section_heading', value: '6. Static vs Dynamic Websites' },
    {
      type: 'text',
      value: 'Static websites show fixed content that is the same for everyone. Dynamic websites (like your login dashboard) change content based on who is logged in or what data is available.',
    },

    { type: 'section_heading', value: '7. Request and Response Cycle' },
    {
      type: 'rich_text',
      value: 'This cycle repeats for every single action you take online: clicking a link, submitting a form, or even refreshing the page. The browser requests, and the server responds.',
    },

    { type: 'section_heading', value: '8. The Rendering Process' },
    {
      type: 'text',
      value: 'Once the browser receives the HTML, it builds a <strong>DOM (Document Object Model)</strong>, applies CSS styles, executes any JavaScript, and finally displays the UI you interact with.',
    },

    { type: 'section_heading', value: '9. Real Life Analogy' },
    {
      type: 'rich_text',
      value: '<div class="bg-green-50 p-4 rounded-lg border-l-4 border-green-500 my-4"><strong>The Restaurant Analogy:</strong><br/>- <strong>Browser:</strong> The Customer<br/>- <strong>Server:</strong> The Restaurant<br/>- <strong>Request:</strong> The Order<br/>- <strong>Response:</strong> The Food<br/><br/>You order → the kitchen prepares → you receive your meal.</div>',
    },

    { type: 'section_heading', value: 'Check Your Understanding' },
    {
      type: 'checkpoint',
      index: 1,
      points: 5,
      value: 'Imagine you just clicked a link to a "Profile" page. Based on the Request-Response cycle, which component starts the communication?',
      content: [{ type: 'hint', value: [{ type: 'text', value: 'Review section 7. Who initiates Every action?' }] }],
    },
    {
      type: 'checkpoint',
      index: 2,
      points: 5,
      value: 'Which core technology provides the "Skeleton" of a webpage?',
      content: [{ type: 'hint', value: [{ type: 'text', value: 'Look at the comparison table in section 4.' }] }],
    },
  ];
}

async function seed() {
  const client = new MongoClient(MONGO_URI);
  try {
    await client.connect();
    const db = client.db(DB_NAME);
    const coursesCol = db.collection('Courses');
    const lessonsCol = db.collection('Lessons');

    const course = await coursesCol.findOne({ slug: COURSE_SLUG });
    if (!course) {
      console.error('❌ Course with slug "' + COURSE_SLUG + '" not found.');
      return;
    }

    let mod = (course.modules || []).find((m) => m.title === MODULE_TITLE);
    if (!mod) {
      console.error('❌ Module "' + MODULE_TITLE + '" not found.');
      return;
    }

    const moduleId = mod._id;
    const courseId = course._id;
    let lessonStub = (mod.lessons || []).find(l => l.title === LESSON_TITLE);
    if (!lessonStub) {
      console.log('✅ Lesson stub created or missing');
      // For fallback we can just use the old ID if not found, but we want to fail fast 
      // ACTUALLY better to create one if missing:
      lessonStub = { _id: new ObjectId(), title: LESSON_TITLE };
      // but let's just abort so we know something is wrong
      console.error('❌ Lesson stub "' + LESSON_TITLE + '" not found.');
      return;
    }
    const lessonId = lessonStub._id;

    const content = buildContent();
    const doc = {
      _id: lessonId,
      moduleId,
      courseId,
      order: 2,
      type: 'lesson',
      title: LESSON_TITLE,
      duration: '30 min',
      language: 'html',
      isTerminal: false,
      fileName: 'index.html',
      starterCode: '<!-- No coding required for this conceptual lesson -->\n<!-- Use this space to take notes! -->',
      content,
      validationCriteria: [
        { index: 1, match: '.*', matchCode: '.*' },
        { index: 2, match: '.*', matchCode: '.*' },
      ],
    };

    await lessonsCol.updateOne({ _id: lessonId }, { $set: doc }, { upsert: true });
    
    // Also ensure it is in the course modules if it wasn't already correctly linked
    await coursesCol.updateOne(
      { _id: courseId, 'modules._id': moduleId },
      { $set: { 'modules.$.lessons.1': {
        _id: lessonId,
        moduleId,
        courseId,
        order: 2,
        type: 'lesson',
        title: LESSON_TITLE,
        duration: '30 min',
        language: 'html'
      } } }
    );

    console.log('✅ Lesson "' + LESSON_TITLE + '" seeded with full rich content.');
  } finally {
    await client.close();
  }
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
