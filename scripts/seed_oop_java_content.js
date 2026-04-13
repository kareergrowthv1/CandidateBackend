/**
 * Seed rich content for Java course — Module 3: Object-Oriented Java
 * Lesson order: Intro → Constructors → Instance Methods → Overloading → Static
 * Run: node scripts/seed_oop_java_content.js
 */
const { MongoClient, ObjectId } = require('mongodb');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

const MONGO_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017';
const DB_NAME = 'Programming';

const TABLE_WRAP = (inner) => `
<div class="overflow-x-auto my-4 border border-gray-100 rounded-md shadow-sm">
    <table class="min-w-full text-sm border-collapse">${inner}</table>
</div>`;

const H = (...parts) => ({ type: 'hint', value: parts });

async function seedOopJavaModule() {
    const client = new MongoClient(MONGO_URI);
    try {
        await client.connect();
        const db = client.db(DB_NAME);
        const lessonsCol = db.collection('Lessons');
        const coursesCol = db.collection('Courses');

        const course = await coursesCol.findOne({ slug: 'java' });
        if (!course) {
            console.error('❌ Java course not found (slug: java).');
            return;
        }

        const courseId = course._id;
        const oopMod = (course.modules || []).find((m) => m.title === 'Object-Oriented Java');
        if (!oopMod) {
            console.error('❌ Module "Object-Oriented Java" not found.');
            return;
        }

        const moduleId = oopMod._id;
        let lessonsEmbedded = [...(oopMod.lessons || [])];

        const ensureLessonStub = (title, order, duration) => {
            let stub = lessonsEmbedded.find((l) => l.title === title);
            if (!stub) {
                stub = { _id: new ObjectId(), moduleId, courseId, order, type: 'lesson', title, duration, language: 'java' };
                lessonsEmbedded.push(stub);
            }
            return stub;
        };

        const introStub = ensureLessonStub('Java: Introduction to Classes', 1, '70 min');
        const constructorsStub = ensureLessonStub('Constructors, this & Object creation', 2, '50 min');
        const methodsStub = ensureLessonStub('Learn Java: Methods', 3, '55 min');
        const overloadStub = ensureLessonStub('Method overloading & return types', 4, '45 min');
        const staticStub = ensureLessonStub('static vs instance — advanced recap', 5, '45 min');

        [introStub, constructorsStub, methodsStub, overloadStub, staticStub].forEach((s, i) => { s.order = i + 1; });

        const lesson1 = {
            _id: introStub._id,
            moduleId,
            courseId,
            order: 1,
            type: 'lesson',
            title: 'Java: Introduction to Classes',
            duration: '70 min',
            language: 'java',
            isTerminal: false,
            fileName: 'Bicycle.java',
            starterCode: `public class Bicycle {\n    private String color;\n    private int gears;\n\n    public Bicycle(String color, int gears) {\n        this.color = color;\n        this.gears = gears;\n    }\n\n    public void ride() {\n        System.out.println("Riding the " + color + " bicycle!");\n    }\n\n    public static void main(String[] args) {\n        // Create your Bicycle and call ride()\n    }\n}`,
            content: [
                { type: 'label', value: 'OBJECT-ORIENTED JAVA' },
                { type: 'heading', value: 'Java: Introduction to Classes' },
                { type: 'duration', value: '70 min' },
                { type: 'text', value: 'Read in order: memory → visibility → fields → constructors → methods → practice. Micro-topics below prepare you for references, garbage collection, encapsulation, and object passing later.' },

                { type: 'section_heading', value: '1. Why OOP fits Java' },
                { type: 'text', value: 'Large programs become hard to change when everything lives in one giant main(). Object-oriented programming splits the program into types (classes). Each class owns a small amount of data and the operations that make sense for that data.' },
                {
                    type: 'list', value: [
                        '<strong>Class</strong> — blueprint: fields + methods.',
                        '<strong>Object / instance</strong> — one runtime thing from <code class="font-mono bg-gray-100 px-1">new</code>.',
                        '<strong>State vs behavior</strong> — fields hold state; methods implement behavior.',
                    ]
                },

                { type: 'section_heading', value: '2. Class vs object (table)' },
                {
                    type: 'rich_text', value: TABLE_WRAP(`
        <thead><tr class="bg-gray-50/80 border-b"><th class="px-6 py-3 text-left font-semibold border-r">Idea</th><th class="px-6 py-3 text-left font-semibold border-r">Class</th><th class="px-6 py-3 text-left font-semibold">Object</th></tr></thead>
        <tbody class="divide-y">
            <tr><td class="px-6 py-3 border-r font-bold bg-gray-50/30">Role</td><td class="px-6 py-3 border-r">Blueprint</td><td class="px-6 py-3">One instance</td></tr>
            <tr><td class="px-6 py-3 border-r font-bold bg-gray-50/30">In code</td><td class="px-6 py-3 border-r font-mono">class Name { }</td><td class="px-6 py-3 font-mono">new Name(...)</td></tr>
        </tbody>`)
                },

                { type: 'section_heading', value: '3. How objects exist in memory (very important)' },
                { type: 'text', value: 'When you write Bicycle b1 = new Bicycle("Green", 18); two ideas appear: a reference variable and a real object.' },
                { type: 'code_block', language: 'text', value: 'Stack memory              Heap memory\n--------                  ------------\nb1  ------------------>   Bicycle object\n(reference)                color = "Green"\n                            gears = 18' },
                {
                    type: 'list', value: [
                        '<strong>b1</strong> is a <strong>reference variable</strong> (lives on the stack in typical JVM diagrams). It stores an address (or handle) to the object.',
                        'The <strong>actual object</strong> (fields + method table) lives in the <strong>heap</strong>.',
                        '<strong>Multiple references</strong> can point to different objects — or the same object if you assign b2 = b1.',
                        'This picture helps later: <strong>references</strong>, <strong>garbage collection</strong> (no references → reclaim), <strong>passing objects</strong> (you pass the reference).',
                    ]
                },

                { type: 'section_heading', value: '4. Access modifiers (preview)' },
                { type: 'text', value: 'Java controls who can read or write fields and who can call methods.' },
                {
                    type: 'rich_text', value: TABLE_WRAP(`
        <thead><tr class="bg-gray-50 border-b"><th class="px-6 py-3 text-left border-r font-semibold">Modifier</th><th class="px-6 py-3 text-left">Accessible from</th></tr></thead>
        <tbody>
            <tr><td class="px-6 py-3 border-r font-mono">public</td><td class="px-6 py-3">Everywhere</td></tr>
            <tr><td class="px-6 py-3 border-r font-mono">private</td><td class="px-6 py-3">Inside the same class only</td></tr>
            <tr><td class="px-6 py-3 border-r font-mono">protected</td><td class="px-6 py-3">Subclass + same package</td></tr>
            <tr><td class="px-6 py-3 border-r font-mono">(default)</td><td class="px-6 py-3">Same package only</td></tr>
        </tbody>`)
                },
                { type: 'text', value: 'Best practice for fields: prefer private so the outside world cannot change state blindly. Full encapsulation (getters/setters, validation) comes in a later module — but you should see private fields early.' },
                { type: 'code_block', language: 'java', value: 'private String color;\nprivate int gears;' },

                { type: 'section_heading', value: '5. Getter / setter (light intro)' },
                { type: 'text', value: 'Direct public fields are simple but fragile: any code can set color to null or gears to -99. Getters/setters are a small gate so you can add checks later.' },
                { type: 'code_block', language: 'java', value: 'public String getColor() {\n    return color;\n}\npublic void setColor(String color) {\n    this.color = color;\n}' },

                { type: 'section_heading', value: '6. toString() — object as text' },
                { type: 'text', value: 'println(object) calls object.toString(). Override it for readable output.' },
                { type: 'code_block', language: 'java', value: '@Override\npublic String toString() {\n    return color + " bicycle with " + gears + " gears";\n}\n// Usage:\n// System.out.println(b1);\n// Green bicycle with 18 gears' },

                { type: 'section_heading', value: '7. Object equality: == vs .equals()' },
                { type: 'text', value: 'Beginners often compare objects with ==. That only compares references (same object in memory?), not field values.' },
                {
                    type: 'list', value: [
                        '<strong>==</strong> → same reference?',
                        '<strong>.equals()</strong> → logical equality (especially for String and types you design).',
                    ]
                },
                { type: 'code_block', language: 'java', value: 'String a = "Java";\nString b = "Java";\nSystem.out.println(a.equals(b)); // true — content\n// a == b may be true for string literals (pooling) but don\'t rely on == for String content' },

                { type: 'section_heading', value: '8. Constructor vs method (comparison)' },
                {
                    type: 'rich_text', value: TABLE_WRAP(`
        <thead><tr class="bg-gray-50 border-b"><th class="px-6 py-3 text-left border-r font-semibold">Constructor</th><th class="px-6 py-3 text-left font-semibold">Method</th></tr></thead>
        <tbody>
            <tr><td class="px-6 py-3 border-r">Same name as class</td><td class="px-6 py-3">Any valid name</td></tr>
            <tr><td class="px-6 py-3 border-r">No return type (not even void)</td><td class="px-6 py-3">Must declare return type or void</td></tr>
            <tr><td class="px-6 py-3 border-r">Runs when <code class="font-mono">new</code> runs</td><td class="px-6 py-3">Runs when you call it</td></tr>
            <tr><td class="px-6 py-3 border-r">Called via <code class="font-mono">new ClassName(...)</code></td><td class="px-6 py-3">Called via <code class="font-mono">object.method(...)</code> or static</td></tr>
        </tbody>`)
                },

                { type: 'section_heading', value: '9. Immutability (short note)' },
                { type: 'text', value: 'String objects are immutable: once created, their characters do not change. When you write s = s + " Course"; you create a new String and s points to it; the old one may be garbage-collected if nothing else references it.' },
                { type: 'code_block', language: 'java', value: 'String s = "Java";\ns = s + " Course"; // new object' },

                { type: 'section_heading', value: '10. Real-world OOP example (Car)' },
                { type: 'text', value: 'Class Car — fields: color, speed, fuelLevel. Methods: start(), accelerate(), brake(). Objects: each car you model is new Car(...).' },
                { type: 'code_block', language: 'java', value: '// Concept only\n// Car c1 = new Car("Red");\n// Car c2 = new Car("Blue");\n// c1.start(); c2.accelerate();' },

                { type: 'section_heading', value: '11. File rule & step-by-step Point' },
                { type: 'text', value: 'public class must match file name. Build: fields → constructor → methods → main.' },
                { type: 'code_block', language: 'java', value: 'Point p1 = new Point(1, 2);\nPoint p2 = new Point(10, 20);\np1.print();\np2.print();' },

                { type: 'section_heading', value: '12. Bicycle — common mistakes' },
                {
                    type: 'list', value: [
                        'Class name ≠ file name.',
                        'ride() needs an object: b.ride() in main.',
                        'Constructor name = class name; no return type.',
                    ]
                },

                { type: 'section_heading', value: 'Instructions' },
                { type: 'checkpoint', index: 1, points: 5, value: '<strong>Task 1</strong><br/><code class="font-mono">Bicycle</code> has private fields <code class="font-mono">color</code> and <code class="font-mono">gears</code> (or package-private if you prefer for this exercise).', content: [H({ type: 'text', value: 'private String color; private int gears;' })] },
                { type: 'checkpoint', index: 2, points: 8, value: '<strong>Task 2</strong><br/>Constructor <code class="font-mono">public Bicycle(String color, int gears)</code> assigns both with <code class="font-mono">this</code>.', content: [H({ type: 'code_block', language: 'java', value: 'this.color = color;\nthis.gears = gears;' })] },
                { type: 'checkpoint', index: 3, points: 8, value: '<strong>Task 3</strong><br/><code class="font-mono">ride()</code> prints <code class="font-mono">Riding the &lt;color&gt; bicycle!</code>', content: [H({ type: 'text', value: 'Still works: instance methods read private fields of same class.' })] },
                { type: 'checkpoint', index: 4, points: 8, value: '<strong>Task 4</strong><br/><code class="font-mono">main</code>: one <code class="font-mono">new Bicycle(...)</code> and <code class="font-mono">ride()</code>.', content: [H({ type: 'text', value: 'Bicycle b = new Bicycle("Green", 18); b.ride();' })] },
                { type: 'checkpoint', index: 5, points: 8, value: '<strong>Task 5</strong><br/>Second <code class="font-mono">Bicycle</code>, different color; call <code class="font-mono">ride()</code> again.', content: [H({ type: 'text', value: 'Two objects on heap, two references (or reuse variable).' })] },
                { type: 'checkpoint', index: 6, points: 12, value: '<strong>Task 6 — Design your own class (concept)</strong><br/>Add a class <code class="font-mono">Student</code> with fields <code class="font-mono">name</code>, <code class="font-mono">age</code>, <code class="font-mono">course</code>; constructor <code class="font-mono">Student(String name, int age, String course)</code>; methods <code class="font-mono">study()</code> (prints studying message) and <code class="font-mono">introduce()</code> (prints name + course). In <code class="font-mono">main</code>, create <strong>two</strong> <code class="font-mono">Student</code> objects and call <code class="font-mono">introduce()</code> on each.', content: [H({ type: 'text', value: 'File must be Bicycle.java if Bicycle is public — put Student as non-public top-level class in same file, or use only Student in Student.java for this task. Easiest: same file, class Student { } without public.' }, { type: 'code_block', language: 'java', value: 'class Student {\n  String name; int age; String course;\n  Student(String n, int a, String c) { name=n; age=a; course=c; }\n  void study() { System.out.println(name + " is studying"); }\n  void introduce() { System.out.println(name + " — " + course); }\n}' })] },
                { type: 'section_heading', value: 'Learning outcome' },
                { type: 'text', value: 'Stack vs heap mental model, private fields, getters/setters preview, toString/equality preview, constructor vs method, immutability, Car analogy, Bicycle + Student practice.' },
            ],
            validationCriteria: [
                { index: 1, match: 'Riding the \\S+ bicycle!', matchCode: 'gears' },
                { index: 2, match: 'Riding the \\S+ bicycle!', matchCode: 'this\\.color' },
                { index: 3, match: 'Riding the [a-zA-Z]+ bicycle!', matchCode: 'ride\\s*\\(' },
                { index: 4, match: 'Riding the [a-zA-Z]+ bicycle!', matchCode: 'new\\s+Bicycle' },
                { index: 5, match: 'Riding the [a-zA-Z]+ bicycle![\\s\\S]*Riding the [a-zA-Z]+ bicycle!', matchCode: 'new\\s+Bicycle[\\s\\S]*new\\s+Bicycle' },
                { index: 6, match: 'Student|studying|introduce', matchCode: 'class\\s+Student[\\s\\S]*introduce\\s*\\([\\s\\S]*new\\s+Student[\\s\\S]*new\\s+Student' },
            ],
        };

        const lesson2 = {
            _id: constructorsStub._id,
            moduleId,
            courseId,
            order: 2,
            type: 'lesson',
            title: 'Constructors, this & Object creation',
            duration: '50 min',
            language: 'java',
            isTerminal: false,
            fileName: 'Book.java',
            starterCode: `public class Book {\n    String title;\n    String author;\n    int pages;\n\n    public Book(String title, String author, int pages) {\n        this.title = title;\n        this.author = author;\n        this.pages = pages;\n    }\n\n    public void describe() {\n        System.out.println(title + " by " + author + " (" + pages + " pages)");\n    }\n\n    public static void main(String[] args) {\n        // Create two Book instances and call describe() on each\n    }\n}`,
            content: [
                { type: 'label', value: 'OBJECT-ORIENTED JAVA' },
                { type: 'heading', value: 'Constructors, this & Object creation' },
                { type: 'duration', value: '50 min' },
                { type: 'text', value: 'After Intro, we focus on object birth: new allocates heap space; constructor initializes. Order: memory → default ctor → this → chaining → tasks.' },

                { type: 'section_heading', value: '1. What runs when you write new?' },
                {
                    type: 'list', value: [
                        'Heap: space for the object.',
                        'Fields default (0, false, null) then constructor body.',
                        'Reference returned to caller (stack or field).',
                    ]
                },

                { type: 'section_heading', value: '2. Default constructor' },
                { type: 'text', value: 'Zero constructors written → Java adds invisible public Book(). First custom constructor → default removed unless you add Book() yourself.' },

                { type: 'section_heading', value: '3. this + chaining' },
                { type: 'code_block', language: 'java', value: 'public Book() {\n    this("Unknown", "Unknown", 0);\n}' },

                { type: 'section_heading', value: 'Instructions' },
                { type: 'checkpoint', index: 1, points: 10, value: '<strong>Task 1</strong><br/><code class="font-mono">b1</code> = Clean Code / Robert Martin / 464; <code class="font-mono">describe()</code>.', content: [H({ type: 'text', value: 'new Book("Clean Code", "Robert Martin", 464)' })] },
                { type: 'checkpoint', index: 2, points: 10, value: '<strong>Task 2</strong><br/>Second book + <code class="font-mono">describe()</code>.', content: [H({ type: 'text', value: 'Independent heap objects.' })] },
                { type: 'checkpoint', index: 3, points: 10, value: '<strong>Task 3</strong><br/>Print <code class="font-mono">Total pages: &lt;n&gt;</code>.', content: [H({ type: 'code_block', language: 'java', value: 'b1.pages + b2.pages' })] },
                { type: 'checkpoint', index: 4, points: 10, value: '<strong>Task 4</strong><br/>No-arg <code class="font-mono">Book()</code> chaining to defaults; <code class="font-mono">new Book()</code> + <code class="font-mono">describe()</code>.', content: [H({ type: 'text', value: 'this("Untitled", "Anonymous", 0);' })] },
                { type: 'section_heading', value: 'Learning outcome' },
                { type: 'text', value: 'You control creation order and chaining.' },
            ],
            validationCriteria: [
                { index: 1, match: 'Clean Code by Robert Martin \\(464 pages\\)', matchCode: 'Clean Code' },
                { index: 2, match: ' by .+ \\([0-9]+ pages\\)', matchCode: 'describe' },
                { index: 3, match: 'Total pages:\\s*[0-9]+', matchCode: 'Total pages' },
                { index: 4, match: 'Untitled by Anonymous \\(0 pages\\)', matchCode: 'Book\\s*\\(\\s*\\)' },
            ],
        };

        const lesson3 = {
            _id: methodsStub._id,
            moduleId,
            courseId,
            order: 3,
            type: 'lesson',
            title: 'Learn Java: Methods',
            duration: '55 min',
            language: 'java',
            isTerminal: false,
            fileName: 'Calculator.java',
            starterCode: `public class Calculator {\n\n    public int add(int a, int b) {\n        return a + b;\n    }\n\n    public double average(double x, double y) {\n        return (x + y) / 2.0;\n    }\n\n    public static void greet(String name) {\n        System.out.println("Hello, " + name + "!");\n    }\n\n    public static void main(String[] args) {\n        Calculator c = new Calculator();\n        // Use c.add, c.average, and greet(...)\n    }\n}`,
            content: [
                { type: 'label', value: 'OBJECT-ORIENTED JAVA' },
                { type: 'heading', value: 'Learn Java: Methods (instance & static)' },
                { type: 'duration', value: '55 min' },
                { type: 'text', value: 'Once objects exist, methods are how they behave. Instance methods use object state; static methods belong to the class.' },

                { type: 'section_heading', value: '1. Method anatomy' },
                { type: 'list', value: ['public / private', 'static (optional)', 'return type', 'name(params)', 'body'] },
                { type: 'code_block', language: 'java', value: 'public int add(int a, int b) { return a + b; }' },

                { type: 'section_heading', value: '2. void vs return' },
                {
                    type: 'rich_text', value: TABLE_WRAP(`
        <thead><tr class="bg-gray-50 border-b"><th class="px-6 py-3 border-r">Return</th><th class="px-6 py-3">Meaning</th></tr></thead>
        <tbody><tr><td class="px-6 py-3 border-r font-mono">void</td><td class="px-6 py-3">No value back</td></tr>
        <tr><td class="px-6 py-3 border-r font-mono">int, double, …</td><td class="px-6 py-3">Caller gets value</td></tr></tbody>`)
                },

                { type: 'section_heading', value: '3. Instance vs static' },
                {
                    type: 'rich_text', value: TABLE_WRAP(`
        <thead><tr class="bg-gray-50 border-b"><th class="px-6 py-3 border-r">Instance</th><th class="px-6 py-3">static</th></tr></thead>
        <tbody><tr><td class="px-6 py-3 border-r">c.add(1,2)</td><td class="px-6 py-3">greet("x")</td></tr></tbody>`)
                },

                { type: 'section_heading', value: 'Instructions' },
                { type: 'checkpoint', index: 1, points: 8, value: '<strong>Task 1</strong><br/><code class="font-mono">Sum: 30</code> via <code class="font-mono">add(10,20)</code>.', content: [H({ type: 'code_block', language: 'java', value: 'System.out.println("Sum: " + c.add(10, 20));' })] },
                { type: 'checkpoint', index: 2, points: 8, value: '<strong>Task 2</strong><br/><code class="font-mono">Average: 5</code> via <code class="font-mono">average(4.0,6.0)</code>.', content: [H({ type: 'text', value: 'double literals' })] },
                { type: 'checkpoint', index: 3, points: 8, value: '<strong>Task 3</strong><br/><code class="font-mono">greet</code> → <code class="font-mono">Hello, Name!</code>', content: [H({ type: 'text', value: 'greet("Ada");' })] },
                { type: 'checkpoint', index: 4, points: 10, value: '<strong>Task 4</strong><br/><code class="font-mono">Combined: 13</code> (add(5,5)+average(2,4)).', content: [H({ type: 'text', value: '10 + 3.0' })] },
                { type: 'section_heading', value: 'Learning outcome' },
                { type: 'text', value: 'Call instance and static methods; read signatures.' },
            ],
            validationCriteria: [
                { index: 1, match: 'Sum:\\s*30', matchCode: 'add\\s*\\(\\s*10' },
                { index: 2, match: 'Average:\\s*5', matchCode: 'average\\s*\\(\\s*4\\.0' },
                { index: 3, match: 'Hello, [^!\\n]+!', matchCode: 'greet\\s*\\(' },
                { index: 4, match: 'Combined:\\s*13', matchCode: 'Combined' },
            ],
        };

        const lesson4 = {
            _id: overloadStub._id,
            moduleId,
            courseId,
            order: 4,
            type: 'lesson',
            title: 'Method overloading & return types',
            duration: '45 min',
            language: 'java',
            isTerminal: false,
            fileName: 'MathUtils.java',
            starterCode: `public class MathUtils {\n\n    public int square(int n) { return n * n; }\n    public double square(double n) { return n * n; }\n    public int add(int a, int b) { return a + b; }\n    public int add(int a, int b, int c) { return a + b + c; }\n\n    public static void main(String[] args) {\n        MathUtils m = new MathUtils();\n        System.out.println("int: " + m.square(5));\n        System.out.println("double: " + m.square(2.5));\n    }\n}`,
            content: [
                { type: 'label', value: 'OBJECT-ORIENTED JAVA' },
                { type: 'heading', value: 'Method overloading & return types' },
                { type: 'duration', value: '45 min' },
                { type: 'text', value: 'Same name, different parameter lists — compiler picks at compile time.' },
                { type: 'section_heading', value: 'Instructions' },
                { type: 'checkpoint', index: 1, points: 8, value: '<strong>Task 1</strong><br/><code class="font-mono">int: 25</code> and <code class="font-mono">double: 6.25</code>.', content: [H({ type: 'text', value: 'square(5) vs square(2.5)' })] },
                { type: 'checkpoint', index: 2, points: 10, value: '<strong>Task 2</strong><br/><code class="font-mono">add2: 30</code>.', content: [H({ type: 'text', value: 'm.add(10,20)' })] },
                { type: 'checkpoint', index: 3, points: 10, value: '<strong>Task 3</strong><br/><code class="font-mono">add3: 60</code>.', content: [H({ type: 'text', value: 'm.add(10,20,30)' })] },
                { type: 'section_heading', value: 'Learning outcome' },
                { type: 'text', value: 'Overload by count and type.' },
            ],
            validationCriteria: [
                { index: 1, match: 'int:\\s*25[\\s\\S]*double:\\s*6\\.25', matchCode: 'square\\(5\\)' },
                { index: 2, match: 'add2:\\s*30', matchCode: 'add\\(10' },
                { index: 3, match: 'add3:\\s*60', matchCode: 'add\\(10\\s*,\\s*20\\s*,\\s*30' },
            ],
        };

        const lesson5 = {
            _id: staticStub._id,
            moduleId,
            courseId,
            order: 5,
            type: 'lesson',
            title: 'static vs instance — advanced recap',
            duration: '45 min',
            language: 'java',
            isTerminal: false,
            fileName: 'Counter.java',
            starterCode: `public class Counter {\n    static int totalObjects = 0;\n    int id;\n    public Counter() {\n        totalObjects++;\n        id = totalObjects;\n    }\n    public void printId() {\n        System.out.println("Instance id: " + id);\n    }\n    public static void main(String[] args) {\n        Counter c1 = new Counter();\n        Counter c2 = new Counter();\n        Counter c3 = new Counter();\n        c1.printId();\n        c2.printId();\n        c3.printId();\n        System.out.println("Total objects: " + totalObjects);\n    }\n}`,
            content: [
                { type: 'label', value: 'OBJECT-ORIENTED JAVA' },
                { type: 'heading', value: 'static vs instance — advanced recap' },
                { type: 'duration', value: '45 min' },
                { type: 'text', value: 'static = one per class; instance = per object.' },
                { type: 'section_heading', value: 'Instructions' },
                { type: 'checkpoint', index: 1, points: 8, value: '<strong>Task 1</strong><br/><code class="font-mono">Total objects: 3</code>', content: [H({ type: 'text', value: 'Constructor increments static' })] },
                { type: 'checkpoint', index: 2, points: 10, value: '<strong>Task 2</strong><br/><code class="font-mono">Instance id: 1,2,3</code>', content: [H({ type: 'text', value: 'printId' })] },
                { type: 'checkpoint', index: 3, points: 10, value: '<strong>Task 3</strong><br/><code class="font-mono">report()</code> → <code class="font-mono">Report: total=3</code>', content: [H({ type: 'code_block', language: 'java', value: 'public static void report() {\n  System.out.println("Report: total=" + totalObjects);\n}' })] },
                { type: 'section_heading', value: 'Learning outcome' },
                { type: 'text', value: 'Shared counters and static utilities.' },
            ],
            validationCriteria: [
                { index: 1, match: 'Total objects:\\s*3', matchCode: 'totalObjects' },
                { index: 2, match: 'Instance id:\\s*1[\\s\\S]*Instance id:\\s*2[\\s\\S]*Instance id:\\s*3', matchCode: 'printId' },
                { index: 3, match: 'Report:\\s*total=3', matchCode: 'report\\s*\\(' },
            ],
        };

        const ordered = [lesson1, lesson2, lesson3, lesson4, lesson5];
        const toEmbed = ordered.map((L) => ({
            _id: L._id,
            moduleId,
            courseId,
            order: L.order,
            type: 'lesson',
            title: L.title,
            duration: L.duration,
            language: 'java',
        }));

        for (const lesson of ordered) {
            const { validationCriteria, ...doc } = lesson;
            await lessonsCol.updateOne({ _id: lesson._id }, { $set: { ...doc, validationCriteria } }, { upsert: true });
        }

        const video = (oopMod.items || []).find((i) => i.type === 'video');
        const q1 = (oopMod.items || []).find((i) => i.type === 'quiz' && /Intro|Classes/i.test(i.title || ''));
        const q2 = (oopMod.items || []).find((i) => i.type === 'quiz' && /Methods/i.test(i.title || ''));
        const projects = (oopMod.items || []).filter((i) => i.type === 'project');
        const items = [
            ...(video ? [video] : []),
            { type: 'lesson', title: 'Java: Introduction to Classes' },
            ...(q1 ? [q1] : [{ type: 'quiz', title: 'Intro to Java Classes' }]),
            { type: 'lesson', title: 'Constructors, this & Object creation' },
            { type: 'lesson', title: 'Learn Java: Methods' },
            ...(q2 ? [q2] : [{ type: 'quiz', title: 'Java Methods Quiz' }]),
            { type: 'lesson', title: 'Method overloading & return types' },
            { type: 'lesson', title: 'static vs instance — advanced recap' },
            ...projects,
        ];

        await coursesCol.updateOne(
            { _id: courseId, 'modules._id': moduleId },
            { $set: { 'modules.$.lessons': toEmbed, 'modules.$.lessonsCount': 5, 'modules.$.items': items, 'modules.$.conceptsCount': items.length } }
        );

        console.log('✅ OOP module: memory/modifiers/getters/toString/equality + lesson order Intro→Constructors→Methods→Overload→Static.');
    } catch (e) {
        console.error('❌ seed_oop_java_content:', e);
    } finally {
        await client.close();
    }
}

seedOopJavaModule();
