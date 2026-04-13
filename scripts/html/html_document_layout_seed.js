/**
 * Seed HTML/CSS course — Lesson 8 (Module 2): "HTML Document Layout"
 * Run from CandidateBackend: node scripts/html/html_document_layout_seed.js
 */
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../../.env') });
const { MongoClient, ObjectId } = require('mongodb');

const MONGO_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017';
const DB_NAME = 'Programming';
const COURSE_SLUG = 'html-css';
const MODULE_TITLE = 'Basic HTML Structure';
const LESSON_TITLE = 'HTML Document Layout';
const LESSON_ID = '6a0100188c89a2213bb71357'; // Generating a unique ID

function buildContent() {
  return [
    { type: 'label', value: 'Semantic Mapping' },
    { type: 'heading', value: 'HTML Document Layout' },
    { type: 'duration', value: '25 min' },

    { type: 'section_heading', value: 'Introduction' },
    { type: 'rich_text', value: 'The <strong>HTML Document Layout</strong> defines exactly how visual content is structured and logically organized on a webpage.' },

    { type: 'section_heading', value: 'Basic Layout Structure' },
    { type: 'rich_text', value: 'Rather than using a bunch of identical, generic <code>&lt;div&gt;</code> tags to build everything, modern HTML5 introduced specific "semantic" tags that intrinsically describe their layout positioning:' },
    { type: 'code_block', language: 'html', value: '<header>\n<nav>\n<main>\n  <section>\n    <article>\n<footer>' },

    { type: 'section_heading', value: 'Layout Element Explanations' },
    { type: 'rich_text', value: 'Here is what each of those core layout elements represents on a page:' },
    {
      type: 'rich_text',
      value: `<table class="min-w-full border-collapse border border-gray-200 my-4 text-sm text-left">
        <thead class="bg-gray-100">
          <tr>
            <th class="border border-gray-200 p-2">Layout Tag</th>
            <th class="border border-gray-200 p-2">Location/Role</th>
            <th class="border border-gray-200 p-2">Typical Content</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="border border-gray-200 p-2 font-bold text-teal-600">&lt;header&gt;</td>
            <td class="border border-gray-200 p-2">Top section of the page</td>
            <td class="border border-gray-200 p-2">Site logo, main page title, "Hero" banner image.</td>
          </tr>
          <tr>
            <td class="border border-gray-200 p-2 font-bold text-teal-600">&lt;nav&gt;</td>
            <td class="border border-gray-200 p-2">Near the top</td>
            <td class="border border-gray-200 p-2">Primary navigation menu links (Home, About, Contact).</td>
          </tr>
          <tr>
            <td class="border border-gray-200 p-2 font-bold text-teal-600">&lt;main&gt;</td>
            <td class="border border-gray-200 p-2">Center of the page</td>
            <td class="border border-gray-200 p-2">The dominant content of the document.</td>
          </tr>
          <tr>
            <td class="border border-gray-200 p-2 font-bold text-teal-600">&lt;section&gt;</td>
            <td class="border border-gray-200 p-2">Inside &lt;main&gt;</td>
            <td class="border border-gray-200 p-2">A thematic grouping of content, like "Features" or "Pricing".</td>
          </tr>
          <tr>
            <td class="border border-gray-200 p-2 font-bold text-teal-600">&lt;article&gt;</td>
            <td class="border border-gray-200 p-2">Inside &lt;main&gt;</td>
            <td class="border border-gray-200 p-2">Independent, self-contained content like a blog post or news story.</td>
          </tr>
          <tr>
            <td class="border border-gray-200 p-2 font-bold text-teal-600">&lt;footer&gt;</td>
            <td class="border border-gray-200 p-2">Absolute bottom</td>
            <td class="border border-gray-200 p-2">Copyright notices, privacy policy links, social media icons.</td>
          </tr>
        </tbody>
      </table>`
    },

    { type: 'section_heading', value: 'Example: Putting it Together' },
    { type: 'code_block', language: 'html', value: '<body>\n\n    <!-- 1. The highest level banner -->\n    <header>\n        <h1>Company Website</h1>\n    </header>\n\n    <!-- 2. The routing block -->\n    <nav>\n        <a href="#home">Home</a>\n        <a href="#about">About</a>\n    </nav>\n\n    <!-- 3. The absolute core of the page -->\n    <main>\n        <section>\n            <article>\n                <p>Welcome to our new product launch announcement!</p>\n            </article>\n        </section>\n    </main>\n\n    <!-- 4. The end cap -->\n    <footer>\n        <p>&copy; 2026 Company Inc.</p>\n    </footer>\n    \n</body>' },

    { type: 'section_heading', value: 'Importance' },
    {
      type: 'list',
      value: [
        '<strong>Visually Maps The Brain:</strong> It radically improves code readability for other developers trying to edit your work later.',
        '<strong>Supercharges SEO:</strong> Google strongly prioritizes text written inside a <code>&lt;main&gt;</code> or <code>&lt;article&gt;</code> tag over text hidden in a footer.',
        '<strong>Incredible Structure for Accessibility:</strong> Blind users utilizing screen readers can instantly jump straight to the <code>&lt;nav&gt;</code> to change pages without having to slowly listen to the entire document first.',
      ],
    },

    { type: 'section_heading', value: 'Best Practices' },
    {
      type: 'list',
      value: [
        '<strong>Use semantic layout tags relentlessly</strong>: Only resort to a <code>&lt;div&gt;</code> (a generic, meaningless rectangle) when absolutely none of the layout tags above make sense for what you are building.',
        '<strong>Keep layouts hierarchically organized:</strong> Never put a <code>&lt;main&gt;</code> inside an <code>&lt;article&gt;</code>. The <code>main</code> is the parent container.',
      ],
    },

    { type: 'section_heading', value: 'Check Your Understanding' },
    {
      type: 'checkpoint',
      index: 1,
      points: 5,
      value: 'Create a footer element at the bottom of the code, containing a paragraph that says: <code>&copy; 2026</code>.',
      content: [{ type: 'hint', value: [{ type: 'text', value: 'Ensure you open and close both the footer and p tags.' }] }],
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
      console.error('❌ Course not found.');
      return;
    }

    let mod = (course.modules || []).find((m) => m.title === MODULE_TITLE);
    if (!mod) {
      console.error('❌ Module not found.');
      return;
    }

    const lessonId = new ObjectId(LESSON_ID);
    const content = buildContent();

    const doc = {
      _id: lessonId,
      moduleId: mod._id,
      courseId: course._id,
      order: 8, // Eighth lesson in Module 2
      type: 'lesson',
      title: LESSON_TITLE,
      duration: '25 min',
      language: 'html',
      isTerminal: false,
      fileName: 'html_layout.html',
      starterCode: '<!DOCTYPE html>\n<html>\n<body>\n  <header>\n    <h1>Logo</h1>\n  </header>\n\n  <main>\n    <p>Main content goes here.</p>\n  </main>\n\n  <!-- Create the footer layout element below: -->\n  \n\n</body>\n</html>',
      content,
      validationCriteria: [
        { index: 1, matchCode: '<footer>.*<p>&copy; 2026</p>.*</footer>' }
      ],
    };

    await lessonsCol.updateOne({ _id: lessonId }, { $set: doc }, { upsert: true });
    
    // Ensure course linkage
    await coursesCol.updateOne(
      { _id: course._id, 'modules._id': mod._id },
      { $set: { 'modules.$.lessons.7': { // Index 7
        _id: lessonId,
        moduleId: mod._id,
        courseId: course._id,
        order: 8,
        type: 'lesson',
        title: LESSON_TITLE,
        duration: '25 min',
        language: 'html'
      } } }
    );

    console.log('✅ Lesson "' + LESSON_TITLE + '" seeded successfully.');
  } finally {
    await client.close();
  }
}

seed().catch(console.error);
