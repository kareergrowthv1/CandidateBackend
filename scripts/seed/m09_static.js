/** 
 * Module 9 — Static (ULTIMATE MASTER MERGE)
 * Combines all content from m09.js, m09v2.js, and static platform optimizations.
 * 100% Density — No data removed.
 */
const { seedModule } = require('./_helpers');

const TABLE = (content) => `<div class="overflow-x-auto my-6 rounded-lg border border-gray-200"><table class="min-w-full divide-y divide-gray-200 text-sm text-left font-sans">${content}</table></div>`;
const NOTE = (text) => `<div class=\"p-4 bg-yellow-50 border-l-4 border-yellow-400 text-yellow-700 my-4\"><strong>📝 NOTE:</strong> ${text}</div>`;
const RULE = (label, text) => `<div class=\"p-4 bg-blue-50 border-l-4 border-blue-400 text-blue-700 my-4\"><strong>${label}:</strong> ${text}</div>`;
const CODE = (code) => `<pre class=\"bg-black text-white p-4 rounded-lg my-4 font-mono text-sm overflow-x-auto\"><code>${code}</code></pre>`;

seedModule({
    moduleTitle: 'Static',
    moduleOrder: 9,
    description: 'The complete guide to the Static keyword. Master shared data, class methods, memory management, and advanced design patterns.',
    label: 'STATIC',
    lessons: [
        {
            title: 'Static Variables (Class Level Data)',
            duration: '50 min',
            sections: [
                {
                    "type": "section",
                    "title": "1.1 What is a Static Variable?",
                    "rich": "A static variable (class variable) belongs to the class itself — not to any individual object. It is declared with the <code>static</code> keyword inside a class but outside all methods. No matter how many objects you create, there is only ONE copy in memory."
                },
                {
                    "type": "section",
                    "title": "1.2 Key Points for Static Variables",
                    "rich": "<ul><li><strong>Memory:</strong> Stored in the Method Area, not the Heap.</li><li><strong>Sharing:</strong> Shared by all objects of the class.</li><li><strong>Lifetime:</strong> Created when class loads, destroyed when program ends.</li><li><strong>Access:</strong> Recommended using <code>ClassName.variableName</code>.</li></ul>"
                },
                {
                    "type": "section",
                    "title": "1.3 Memory Comparison — Method Area vs Heap",
                    "rich": "Understanding where variables live is critical for memory optimization.<br/><br/>" +
                        TABLE(`<thead><tr class="bg-gray-50 border-b"><th class="px-4 py-2 border-r">Static (Method Area)</th><th class="px-4 py-2">Instance (Heap)</th></tr></thead><tbody>
<tr><td class="px-4 py-2 border-r">class Student {<br/>  static int total = 0;<br/>}</td><td class="px-4 py-2">class Student {<br/>  String name;<br/>}</td></tr>
<tr><td class="px-4 py-2 border-r">ONE shared copy</td><td class="px-4 py-2">NEW copy per object</td></tr>
<tr><td class="px-4 py-2 border-r">Resolved at class load</td><td class="px-4 py-2">Created at 'new'</td></tr></tbody>`)
                },
                {
                    "type": "section",
                    "title": "1.4 Practical Example — The Object Counter",
                    "rich": "Incrementing a shared counter in the constructor:",
                    "code": "class Student {\n    static int totalStudents = 0;\n    String name;\n\n    Student(String name) {\n        this.name = name;\n        totalStudents++; // Increments the SINGLE shared copy\n    }\n}\n\n// Student.totalStudents will be 3 after 3 objects."
                },
                {
                    "type": "section",
                    "title": "1.5 Shared Configuration — Bank Interest Rate",
                    "rich": "Use static for data that must change for all objects simultaneously:",
                    "code": "class BankAccount {\n    static double interestRate = 3.5;\n    // Changing this to 5.0 affects all accounts instantly.\n}"
                },
                {
                    "type": "section",
                    "title": "1.6 Constraints with 'static final'",
                    "rich": "Constants that belong to the class and never change:",
                    "code": "class AppConfig {\n    static final String APP_NAME = \"SystemMindz\";\n    static final int MAX_USERS = 5000;\n}"
                },
                {
                    "type": "section",
                    "title": "1.7 Advanced — Singleton Pattern",
                    "rich": "Ensuring a single global instance of a class (like a DB connection):",
                    "code": "class DB {\n    private static DB instance = null;\n    private DB() { }\n    public static DB getInstance() {\n        if (instance == null) instance = new DB();\n        return instance;\n    }\n}"
                },
                {
                    "type": "section",
                    "rich": NOTE("Accessing static variables via an object reference (s1.totalStudents) is allowed but highly discouraged. It makes code harder to read.")
                },
                {
                    "type": "section",
                    "title": "Instructions"
                },
                {
                    "type": "task",
                    "value": "Task: Create a <code class=\"font-mono\">Car</code> class with a <code class=\"font-mono\">static int count</code>. Increment it in the constructor. Print <code class=\"font-mono\">\"Count: 3\"</code> in main after making 3 cars.",
                    "hints": ["Car.count++", "Print in main"],
                    "points": 10
                }
            ],
            validation: [
                { "index": 1, "match": "Count:\\s*3", "matchCode": "Car\\.count" }
            ]
        },
        {
            title: 'Static Methods (Class Level Behavior)',
            duration: '50 min',
            sections: [
                {
                    "type": "section",
                    "title": "1. What are Static Methods?",
                    "rich": "<p class=\"mb-4\">Static methods are methods that belong to the class itself, not to any specific object. This means:</p><ul class=\"list-disc ml-5 space-y-3 my-6\"><li>You can call them without creating an object</li><li>They are shared across all instances</li><li>They are loaded into memory once when the class is loaded</li></ul>A static method represents behavior related to the class as a whole, not individual objects.<br/><br/>"
                },
                {
                    "type": "section",
                    "title": "2. Why Static Methods Exist?",
                    "rich": "<p class=\"mb-4\">In real-world systems, not all operations depend on object data. Examples:</p><ul class=\"list-disc ml-5 space-y-3 my-6\"><li>Mathematical calculations</li><li>Parsing data</li><li>Utility/helper logic</li><li>Factory object creation</li></ul>Instead of creating unnecessary objects, Java allows class-level behavior using static methods.<br/><br/>"
                },
                {
                    "type": "section",
                    "title": "2.1 Accessing Static Methods",
                    "rich": "Belongs to the class. No object required. Examples: <code>Math.sqrt(16);</code>, <code>Integer.parseInt(\"123\");</code>. Use: <code>ClassName.methodName();</code><br/><br/>",
                    "code": "class MathUtils {\n    static int square(int n) {\n        return n * n;\n    }\n\n    static int cube(int n) {\n        return n * n * n;\n    }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        int result1 = MathUtils.square(5);\n        int result2 = MathUtils.cube(3);\n        System.out.println(\"Square: \" + result1);\n        System.out.println(\"Cube: \" + result2);\n    }\n}"
                },
                {
                    "type": "section",
                    "title": "2.2 Utility Logic Example",
                    "rich": "Perfect for logic that doesn't need personal object 'state'. These are called <strong>Utility Methods</strong>.<br/><br/>",
                    "code": "class StringUtils {\n    static boolean isEmpty(String str) {\n        return str == null || str.length() == 0;\n    }\n\n    static String toUpper(String str) {\n        return str.toUpperCase();\n    }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        String name = \"java\";\n        System.out.println(StringUtils.toUpper(name));\n        System.out.println(StringUtils.isEmpty(name));\n    }\n}"
                },
                {
                    "type": "section",
                    "title": "2.3 The Two Golden Rules",
                    "rich": RULE("RULE 1", "Static methods can only access static data directly. To access instance data, you must pass an object reference.") +
                        RULE("RULE 2", "Static methods cannot use <code>this</code> or <code>super</code>. Reason: <code>this</code> refers to current object, and static methods have no object context.") + "<br/>"
                },
                {
                    "type": "section",
                    "rich": "<strong>Accessing Instance Data (Correct vs Incorrect):</strong>",
                    "code": "// ❌ Wrong:\nclass Test {\n    int x = 10;\n    static void show() { System.out.println(x); } // ERROR\n}\n\n// ✅ Correct:\nclass Test {\n    int x = 10;\n    static void show(Test obj) { System.out.println(obj.x); } // OK\n}"
                },
                {
                    "type": "section",
                    "title": "2.4 Factory Methods (Static Constructors)",
                    "rich": "Control object creation with named methods. This improves readability and is used heavily in frameworks.<br/><br/>",
                    "code": "class Temperature {\n    double value;\n    private Temperature(double value) { this.value = value; }\n\n    static Temperature fromCelsius(double c) {\n        return new Temperature(c);\n    }\n\n    static Temperature fromFahrenheit(double f) {\n        return new Temperature((f - 32) * 5 / 9);\n    }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Temperature t1 = Temperature.fromCelsius(25);\n        Temperature t2 = Temperature.fromFahrenheit(77);\n        System.out.println(\"Temp1: \" + t1.value);\n        System.out.println(\"Temp2: \" + t2.value);\n    }\n}"
                },
                {
                    "type": "section",
                    "title": "2.5 Static Method Hiding (Inheritance)",
                    "rich": "Static methods are NOT overridden. They are hidden. This uses <strong>Compile-Time Binding</strong>. Behavior depends on reference type, not object.<br/><br/>",
                    "code": "class Animal {\n    static void sound() { System.out.println(\"Animal sound\"); }\n}\n\nclass Dog extends Animal {\n    static void sound() { System.out.println(\"Dog sound\"); }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Animal a = new Dog();\n        a.sound(); // Animal version\n\n        Dog d = new Dog();\n        d.sound(); // Dog version\n    }\n}"
                },
                {
                    "type": "section",
                    "title": "2.6 Method Chaining / Fluent API",
                    "rich": "Building complex commands through static start points:<br/><br/>",
                    "code": "class Query {\n    String data = \"\";\n    static Query select(String fields) {\n        Query q = new Query();\n        q.data = \"SELECT \" + fields;\n        return q;\n    }\n    Query from(String table) {\n        data += \" FROM \" + table;\n        return this;\n    }\n    String build() { return data; }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        String sql = Query.select(\"*\").from(\"users\").build();\n        System.out.println(sql);\n    }\n}"
                },
                {
                    "type": "section",
                    "title": "3. Additional Concepts",
                    "rich": "<strong>Memory Behavior:</strong> Stored in Method Area, Loaded once per class, Shared across all objects.<br/><br/>" +
                        TABLE(`<thead><tr class=\"bg-blue-50/50 border-b\"><th class=\"w-1/3 px-6 py-4 border-r font-bold text-gray-800\">Feature</th><th class=\"w-1/3 px-6 py-4 border-r font-bold text-gray-800\">Static Method</th><th class=\"w-1/3 px-6 py-4 font-bold text-gray-800\">Instance Method</th></tr></thead><tbody>
<tr class=\"border-b\"><td class=\"px-6 py-4 border-r font-semibold\">Belongs to</td><td class=\"px-6 py-4 border-r font-semibold text-blue-600\">Class</td><td class=\"px-6 py-4 font-semibold text-orange-600\">Object</td></tr>
<tr class=\"border-b\"><td class=\"px-6 py-4 border-r font-semibold\">Object Required</td><td class=\"px-6 py-4 border-r font-semibold text-blue-600\">No</td><td class=\"px-6 py-4 font-semibold text-orange-600\">Yes</td></tr>
<tr class=\"border-b\"><td class=\"px-6 py-4 border-r font-semibold\">Access Instance Data</td><td class=\"px-6 py-4 border-r font-semibold text-blue-600\">No</td><td class=\"px-6 py-4 font-semibold text-orange-600\">Yes</td></tr>
<tr><td class=\"px-6 py-4 border-r font-semibold\">Uses this</td><td class=\"px-6 py-4 border-r font-semibold text-blue-600\">No</td><td class=\"px-6 py-4 font-semibold text-orange-600\">Yes</td></tr></tbody>`)
                },
                {
                    "type": "section",
                    "title": "Summary",
                    "rich": "Use static when there's no dependency on object data (utility, factory, shared ops). Avoid when behavior depends on object state. Static methods improve performance, clarity, and design.<br/><br/>"
                },
                {
                    "type": "section",
                    "title": "Instructions"
                },
                {
                    "type": "task",
                    "value": "Task 1: Create a <code class=\"font-mono\">Cutter</code> class with a static method <code class=\"font-mono\">half(int n)</code> that returns half of the input. In main, print <code class=\"font-mono\">Cutter.half(10)</code>. Output: <code class=\"font-mono\">5</code>.",
                    "hints": ["Use the code: static int half(int n)"],
                    "points": 10
                },
                {
                    "type": "task",
                    "value": "Task 2: Create a <code class=\"font-mono\">MathHelper</code> class with a static method <code class=\"font-mono\">triple(int n)</code>. In main, print <code class=\"font-mono\">MathHelper.triple(3)</code>. Output: <code class=\"font-mono\">9</code>.",
                    "hints": ["Define the method as: static int triple(int n)"],
                    "points": 10
                },
                {
                    "type": "task",
                    "value": "Task 3: Create a <code class=\"font-mono\">Greeter</code> class with a static method <code class=\"font-mono\">greet()</code> that returns <code class=\"font-mono\">\"Hi\"</code>. In main, print <code class=\"font-mono\">Greeter.greet()</code>. Output: <code class=\"font-mono\">Hi</code>.",
                    "hints": ["Return type should be String: static String greet()"],
                    "points": 10
                }
            ],
            validation: [
                { "index": 1, "match": "5", "matchCode": "Cutter\\.half" },
                { "index": 2, "match": "9", "matchCode": "MathHelper\\.triple" },
                { "index": 3, "match": "Hi", "matchCode": "Greeter\\.greet" }
            ]
        },
        {
            title: 'Static Blocks (Class Initializers)',
            duration: '40 min',
            sections: [
                {
                    "type": "section",
                    "title": "1. What is a Static Block?",
                    "rich": "<p class=\"mb-4\">A static block is a block of code inside a class that runs automatically when the class is loaded into memory.</p>" + CODE("static {\n    // code\n}")
                },
                {
                    "type": "section",
                    "title": "3.1 What is a Static Block?",
                    "rich": "<p class=\"mb-4\">A block of code that runs ONCE exactly when the class is loaded, before any object exists or main() runs.</p>" + 
                        "<p class=\"font-semibold\">👉 Important:</p><ul class=\"list-disc ml-5 space-y-1 mb-4\"><li>Runs only one time per class</li><li>Runs automatically</li><li>Used for initial setup logic</li></ul>"
                },
                {
                    "type": "section",
                    "title": "2. Why Static Blocks Exist?",
                    "rich": "<p class=\"mb-4\">Sometimes you need to:</p><ul class=\"list-disc ml-5 space-y-1\"><li>Initialize static variables with complex logic</li><li>Load configuration</li><li>Prepare resources before program starts</li></ul><p class=\"mt-4\">Static blocks solve this problem.</p>"
                },
                {
                    "type": "section",
                    "title": "3.2 Execution Order",
                    "rich": "<ol class=\"list-decimal ml-8 space-y-2 font-medium\"><li>Static variables initialized</li><li>Static blocks run (top to bottom)</li><li>main() starts</li><li>Objects created (constructors run)</li></ol>"
                },
                {
                    "type": "section",
                    "title": "Complete Execution Flow Example",
                    "code": "class Demo {\n\n    static int x = 10;\n\n    static {\n        System.out.println(\"Static Block 1\");\n    }\n\n    static {\n        System.out.println(\"Static Block 2\");\n    }\n\n    Demo() {\n        System.out.println(\"Constructor\");\n    }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n\n        System.out.println(\"Main Method\");\n\n        Demo d1 = new Demo();\n        Demo d2 = new Demo();\n    }\n}",
                    "rich": "<div class=\"p-4 bg-gray-50 border font-mono text-sm my-4\"><strong>Output:</strong><br/>Static Block 1<br/>Static Block 2<br/>Main Method<br/>Constructor<br/>Constructor</div>" + 
                        "<div class=\"mt-4 font-semibold\">👉 Static blocks run once, constructors run every time</div>"
                },
                {
                    "type": "section",
                    "title": "3. Static Block Memory Behavior",
                    "rich": "<ul class=\"list-disc ml-5 space-y-2\"><li>Stored in Method Area</li><li>Executed when class is loaded by JVM ClassLoader</li><li>Not tied to any object</li></ul>"
                },
                {
                    "type": "section",
                    "title": "3.3 Complex Map Initialization",
                    "rich": "<p class=\"mb-4\">Static blocks are ideal for setting up final static collections:</p>",
                    "code": "import java.util.HashMap;\nimport java.util.Map;\n\nclass CountryCodes {\n\n    static final Map<String, String> CODES = new HashMap<>();\n\n    static {\n        CODES.put(\"IN\", \"India\");\n        CODES.put(\"US\", \"USA\");\n        CODES.put(\"UK\", \"United Kingdom\");\n    }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n\n        System.out.println(CountryCodes.CODES.get(\"IN\"));\n    }\n}",
                },
                {
                    "type": "section",
                    "rich": "<div class=\"mb-6 font-semibold\">👉 Why static block here?</div><p class=\"mb-4\">You cannot use loops or complex logic directly in variable declaration. Static block allows multi-step initialization.</p>" + 
                        "<strong>Alternative (Advanced Clean Approach)</strong>" +
                        CODE("static final Map<String, String> CODES = Map.of(\n    \"IN\", \"India\",\n    \"US\", \"USA\"\n);") + 
                        "<p class=\"mt-4 font-semibold\">👉 But static block is still needed for:</p><ul class=\"list-disc ml-5 space-y-1\"><li>large datasets</li><li>dynamic logic</li><li>external configuration</li></ul>"
                },
                {
                    "type": "section",
                    "title": "3.4 Static Blocks in Inheritance",
                    "rich": "<p class=\"mb-4\">Parent static blocks always fire before Child static blocks. Objects and constructors are subsequent.</p><strong>Complete Example</strong>",
                    "code": "class Parent {\n\n    static {\n        System.out.println(\"Parent Static Block\");\n    }\n\n    Parent() {\n        System.out.println(\"Parent Constructor\");\n    }\n}\n\nclass Child extends Parent {\n\n    static {\n        System.out.println(\"Child Static Block\");\n    }\n\n    Child() {\n        System.out.println(\"Child Constructor\");\n    }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n\n        Child c = new Child();\n    }\n}"
                },
                {
                    "type": "section",
                    "rich": "<div class=\"p-4 bg-gray-50 border font-mono text-sm my-4\"><strong>Output:</strong><br/>Parent Static Block<br/>Child Static Block<br/>Parent Constructor<br/>Child Constructor</div>" +
                        "<div class=\"mt-4 font-semibold\">👉 Order:</div><ol class=\"list-decimal ml-8 space-y-1\"><li>Parent static</li><li>Child static</li><li>Parent constructor</li><li>Child constructor</li></ol>"
                },
                {
                    "type": "section",
                    "title": "4. Multiple Static Blocks",
                    "rich": "<p class=\"mb-4 text-blue-800 font-bold\">Java allows multiple static blocks.</p>",
                    "code": "class Test {\n\n    static {\n        System.out.println(\"Block 1\");\n    }\n\n    static {\n        System.out.println(\"Block 2\");\n    }\n}",
                    "rich_after": "<div class=\"mt-4\">👉 Executes in top-to-bottom order</div>"
                },
                {
                    "type": "section",
                    "title": "5. Static Block Without Main Method",
                    "rich": "<p class=\"mb-4\">Yes — Java allows execution without main() (older versions).</p>",
                    "code": "class Test {\n\n    static {\n        System.out.println(\"Static Block Executed\");\n        System.exit(0);\n    }\n}",
                    "rich_after": "<div class=\"mt-4 font-semibold\">👉 Used in:</div><ul class=\"list-disc ml-5 space-y-1\"><li>tricky interview questions</li><li>JVM behavior understanding</li></ul>"
                },
                {
                    "type": "section",
                    "title": "6. Exception Handling Guide",
                    "rich": "<p class=\"mb-4\">Catch errors inside blocks to prevent ExceptionInInitializerError which crashes class loading.</p>",
                    "code": "class ConfigLoader {\n\n    static {\n        try {\n            int x = 10 / 0; // risky\n        } catch (Exception e) {\n            System.out.println(\"Handled Exception\");\n        }\n    }\n}",
                    "rich_after": "<div class=\"mt-4 font-semibold\">👉 If not handled:</div>" + CODE("static {\n    int x = 10 / 0;\n}") + "<p class=\"mt-2 font-bold text-red-600\">➡ JVM throws:</p><code>ExceptionInInitializerError</code>"
                },
                {
                    "type": "section",
                    "title": "7. Real-World Use Cases",
                    "rich": "<p class=\"mb-4\">Static blocks are used in:</p><ul class=\"list-disc ml-5 space-y-1 font-semibold\"><li>Database driver loading</li><li>Configuration loading</li><li>Cache initialization</li><li>Logging setup</li><li>Constant preparation</li></ul>"
                },
                {
                    "type": "section",
                    "title": "8. Static Block vs Constructor",
                    "rich": TABLE(`<thead><tr class=\"bg-slate-100\"><th class=\"px-4 py-3 border-r font-bold\">Feature</th><th class=\"px-4 py-3 border-r font-bold\">Static Block</th><th class=\"px-4 py-3 font-bold\">Constructor</th></tr></thead><tbody>
<tr class=\"border-b\"><td class=\"px-4 py-3 border-r font-semibold\">Runs</td><td class=\"px-4 py-3 border-r\">Once</td><td class=\"px-4 py-3\">Every object</td></tr>
<tr class=\"border-b\"><td class=\"px-4 py-3 border-r font-semibold\">Belongs to</td><td class=\"px-4 py-3 border-r text-blue-600\">Class</td><td class=\"px-4 py-3 text-orange-600\">Object</td></tr>
<tr class=\"border-b\"><td class=\"px-4 py-3 border-r font-semibold\">Trigger</td><td class=\"px-4 py-3 border-r\">Class load</td><td class=\"px-4 py-3\">Object creation</td></tr>
<tr><td class=\"px-4 py-3 border-r font-semibold\">Purpose</td><td class=\"px-4 py-3 border-r\">Initialization</td><td class=\"px-4 py-3\">Object setup</td></tr></tbody>`)
                },
                {
                    "type": "section",
                    "title": "9. When to Use Static Blocks",
                    "rich": "<p class=\"mb-2 font-bold\">Use when:</p><ul class=\"list-disc ml-5 mb-6\"><li>Initialization is complex</li><li>Depends on multiple steps</li><li>Needed only once</li></ul><p class=\"mb-2 font-bold\">Avoid when:</p><ul class=\"list-disc ml-5\"><li>Logic depends on object data</li><li>Simple assignment is enough</li></ul>"
                },
                {
                    "type": "section",
                    "title": "Final Understanding",
                    "rich": "<p class=\"mb-4\">Static blocks are part of class initialization phase in JVM.</p><p class=\"font-bold mb-2\">They are powerful for:</p><ul class=\"list-disc ml-5 mb-6\"><li>one-time setup</li><li>preparing shared resources</li><li>controlling class loading behavior</li></ul><p class=\"font-semibold\">Used correctly, they make your code:</p><ul class=\"list-disc ml-5 font-medium\"><li>cleaner</li><li>faster</li><li>more structured</li></ul>"
                },
                {
                    "type": "section",
                    "title": "Instructions"
                },
                {
                    "type": "task",
                    "value": "Task 1: Create a <code class=\"font-mono\">Database</code> class with a static string <code class=\"font-mono\">status</code>. Initialize it to <code class=\"font-mono\">\"Connected\"</code> inside a static block. In main, print <code class=\"font-mono\">Database.status</code>.",
                    "hints": ["Use: static { status = \"Connected\"; }"],
                    "points": 10
                },
                {
                    "type": "task",
                    "value": "Task 2: Create a <code class=\"font-mono\">Runner</code> class with a static block that prints <code class=\"font-mono\">\"Block\"</code>. In main, print <code class=\"font-mono\">\"Main\"</code>. Verify \"Block\" appears first.",
                    "hints": ["Static blocks run BEFORE main."],
                    "points": 10
                },
                {
                    "type": "task",
                    "value": "Task 3: Create a <code class=\"font-mono\">Config</code> class with a static block that uses <code class=\"font-mono\">try-catch</code> to set a static int <code class=\"font-mono\">val = 100</code>. Print it in main.",
                    "hints": ["Wrap the assignment in a try block."],
                    "points": 10
                }
            ],
            validation: [
                { "index": 1, "match": "Connected", "matchCode": "Database\\.status" },
                { "index": 2, "match": "Block[\\s\\S]*Main", "matchCode": "static\\s*\\{" },
                { "index": 3, "match": "100", "matchCode": "Config\\.val" }
            ]
        },
        {
            title: 'Ultimate Comparison — Static vs Instance (Full Deep Version)',
            duration: '60 min',
            sections: [
                {
                    "type": "section",
                    "title": "4.1 Mental Model: Blueprint vs House",
                    "rich": "<p class=\"mb-4\">Think of a class as a blueprint and objects as actual houses.</p>" +
                        "<p class=\"mb-2 text-blue-700 font-bold\">Static (Class Level)</p>" +
                        "<p class=\"mb-1\">→ Shared across ALL objects</p>" +
                        "<p class=\"mb-1\">→ Created once when class loads</p>" +
                        "<p class=\"mb-4\">→ Same value for everyone</p>" +
                        "<p class=\"mb-2 text-orange-700 font-bold\">Instance (Object Level)</p>" +
                        "<p class=\"mb-1\">→ Unique per object</p>" +
                        "<p class=\"mb-1\">→ Created when object is created</p>" +
                        "<p class=\"mb-4\">→ Each object has its own copy</p>" +
                        "<p class=\"mt-4 font-semibold\">👉 Example Thinking:</p>" +
                        "<p>Static → Company Name (same for all employees)</p>" +
                        "<p>Instance → Employee Name (different for each)</p>"
                },
                {
                    "type": "section",
                    "title": "4.2 Deep Comparison Table",
                    "rich": TABLE(`<thead><tr class=\"bg-slate-100 border-b\"><th class=\"px-6 py-4 border-r font-bold\">Aspect</th><th class=\"px-6 py-4 border-r font-bold\">Static</th><th class=\"px-6 py-4 font-bold\">Instance</th></tr></thead><tbody>
<tr class=\"border-b\"><td class=\"px-6 py-4 border-r font-semibold\">Belongs To</td><td class=\"px-6 py-4 border-r\">Class</td><td class=\"px-6 py-4\">Object</td></tr>
<tr class=\"border-b\"><td class=\"px-6 py-4 border-r font-semibold\">Memory Location</td><td class=\"px-6 py-4 border-r text-blue-600\">Method Area (MetaSpace)</td><td class=\"px-6 py-4 text-orange-600\">Heap</td></tr>
<tr class=\"border-b\"><td class=\"px-6 py-4 border-r font-semibold\">Creation Time</td><td class=\"px-6 py-4 border-r\">Class Loading</td><td class=\"px-6 py-4\">Object Creation</td></tr>
<tr class=\"border-b\"><td class=\"px-6 py-4 border-r font-semibold\">Access Style</td><td class=\"px-6 py-4 border-r\">ClassName.member</td><td class=\"px-6 py-4\">object.member</td></tr>
<tr class=\"border-b\"><td class=\"px-6 py-4 border-r font-semibold\">Copies</td><td class=\"px-6 py-4 border-r\">Single Shared Copy</td><td class=\"px-6 py-4\">Multiple Copies</td></tr>
<tr class=\"border-b\"><td class=\"px-6 py-4 border-r font-semibold\">Polymorphism</td><td class=\"px-6 py-4 border-r\">❌ No (Method Hiding)</td><td class=\"px-6 py-4\">✅ Yes (Method Overriding)</td></tr>
<tr class=\"border-b\"><td class=\"px-6 py-4 border-r font-semibold\">this/super</td><td class=\"px-6 py-4 border-r\">❌ Not Allowed</td><td class=\"px-6 py-4\">✅ Allowed</td></tr>
<tr class=\"border-b\"><td class=\"px-6 py-4 border-r font-semibold\">Lifecycle</td><td class=\"px-6 py-4 border-r\">Until class unload</td><td class=\"px-6 py-4\">Until object GC</td></tr>
<tr><td class=\"px-6 py-4 border-r font-semibold\">Thread Impact</td><td class=\"px-6 py-4 border-r\">Shared → needs caution</td><td class=\"px-6 py-4\">Isolated → safer</td></tr></tbody>`)
                },
                {
                    "type": "section",
                    "title": "4.3 Internal JVM Understanding (Important for Pro Level)",
                    "rich": "<p class=\"mb-4\">When JVM runs:</p><p class=\"font-bold text-blue-600\">Class Loads → Static comes first</p><p class=\"mb-1\">→ Static variables created</p><p class=\"mb-4\">→ Static blocks executed</p><p class=\"font-bold text-orange-600\">Object Created → Instance comes next</p><p class=\"mb-1\">→ Instance variables allocated in Heap</p><p class=\"mb-4\">→ Constructor initializes values</p><div class=\"p-4 bg-yellow-50 border border-yellow-200 mt-4 rounded-lg font-semibold\">👉 Key Insight:<br/>Static lives before objects even exist</div>"
                },
                {
                    "type": "section",
                    "title": "4.4 Unified Example (Complete Working Code)",
                    "code": "class Employee {\n\n    // Static Variable (Shared)\n    static String company = \"TechCorp\";\n\n    // Instance Variables (Unique)\n    String name;\n    int id;\n\n    // Constructor\n    Employee(String name, int id) {\n        this.name = name;\n        this.id = id;\n    }\n\n    // Static Method\n    static void changeCompany(String newCompany) {\n        company = newCompany;\n    }\n\n    // Instance Method\n    void display() {\n        System.out.println(name + \" (\" + id + \") works at \" + company);\n    }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n\n        Employee e1 = new Employee(\"Sharan\", 101);\n        Employee e2 = new Employee(\"Rahul\", 102);\n\n        e1.display();\n        e2.display();\n\n        // Change shared data\n        Employee.changeCompany(\"Google\");\n\n        e1.display();\n        e2.display();\n    }\n}",
                    "rich": "<div class=\"p-4 bg-gray-50 border font-mono text-sm my-4\"><strong>Output:</strong><br/>Sharan (101) works at TechCorp<br/>Rahul (102) works at TechCorp<br/>Sharan (101) works at Google<br/>Rahul (102) works at Google</div><div class=\"mt-4 font-semibold\">👉 Insight:<br/>Changing static affects ALL objects instantly</div>"
                },
                {
                    "type": "section",
                    "title": "4.5 Memory Visualization (Very Important)",
                    "rich": CODE("Method Area:\n-----------------------\nEmployee.company = \"TechCorp\"\nEmployee.changeCompany()\n\nHeap:\n-----------------------\ne1 → { name: \"Sharan\", id: 101 }\ne2 → { name: \"Rahul\", id: 102 }\n\nStack:\n-----------------------\ne1 reference\ne2 reference")
                },
                {
                    "type": "section",
                    "title": "4.6 Behavior Difference (Real Thinking)",
                    "rich": "<div class=\"mb-6\"><p class=\"font-bold text-blue-700\">Static Behavior</p><p>Global/shared</p><p>Used for constants, utilities</p><p>One change → affects entire system</p></div><div><p class=\"font-bold text-orange-700\">Instance Behavior</p><p>Personal/object-specific</p><p>Used for state/data</p><p>Change affects only that object</p></div>"
                },
                {
                    "type": "section",
                    "title": "4.7 Method Difference (Critical Interview Concept)",
                    "rich": "<div><p class=\"font-bold mb-2\">Static Method</p>" + 
                        CODE("static void show() {\n    System.out.println(\"Static Method\");\n}") + 
                        "<p>→ Called using class</p><p>→ No object needed</p><p>→ Cannot access instance variables directly</p></div><div class=\"mt-8\"><p class=\"font-bold mb-2\">Instance Method</p>" + 
                        CODE("void show() {\n    System.out.println(name);\n}") + 
                        "<p>→ Requires object</p><p>→ Can access both static + instance</p></div>"
                },
                {
                    "type": "section",
                    "title": "4.8 Polymorphism Difference (VERY IMPORTANT)",
                    "rich": "<div class=\"space-y-6\"><div><h4 class=\"font-bold text-red-700\">Static → Method Hiding</h4>" +
                        CODE("class A {\n    static void show() { System.out.println(\"A\"); }\n}\nclass B extends A {\n    static void show() { System.out.println(\"B\"); }\n}\n\nA obj = new B();\nobj.show(); // A") +
                        "<p class=\"font-semibold\">👉 Based on reference type</p></div><div><h4 class=\"font-bold text-green-700\">Instance → Method Overriding</h4>" +
                        CODE("class A {\n    void show() { System.out.println(\"A\"); }\n}\nclass B extends A {\n    void show() { System.out.println(\"B\"); }\n}\n\nA obj = new B();\nobj.show(); // B") + "<p class=\"font-semibold\">👉 Based on object type</p></div></div>"
                },
                {
                    "type": "section",
                    "title": "4.9 Access Rules (Very Important)",
                    "rich": "<div class=\"p-4 bg-slate-50 border rounded-lg\"><h4 class=\"font-bold mb-2\">Static Context Can Access:</h4><p>Static variables ✅</p><p class=\"mb-6\">Static methods ✅</p><h4 class=\"font-bold mb-2\">Static Context Cannot Access:</h4><p>Instance variables ❌</p><p class=\"mb-6\">Instance methods ❌</p><p class=\"font-bold\">Unless:</p>" + 
                        CODE("Employee e = new Employee(\"A\",1);\nSystem.out.println(e.name);") + "</div>"
                },
                {
                    "type": "section",
                    "title": "4.10 Real-World Use Cases",
                    "rich": "<div class=\"grid grid-cols-2 gap-4\"><div><h5 class=\"font-bold border-b pb-1 mb-2\">Static Used For:</h5><p class=\"mb-4\"><strong>Constants</strong></p><code>static final double PI = 3.14;</code><p class=\"mt-4\"><strong>Utility Classes</strong></p><code>Math.sqrt(16);</code><p class=\"mt-4\"><strong>Shared Configurations</strong></p><code>static String DB_URL;</code></div><div><h5 class=\"font-bold border-b pb-1 mb-2\">Instance Used For:</h5><p>User Data</p><p>Business Logic</p><p>Object-specific states</p></div></div>"
                },
                {
                    "type": "section",
                    "title": "4.11 Quick Decision Guide (Improved)",
                    "rich": "<p class=\"font-semibold mb-3\">Ask yourself:</p><p>Is data shared across all objects? → <strong>YES → Static</strong></p><p>Is data unique per object? → <strong>YES → Instance</strong></p><p>Does method depend on object data? → <strong>YES → Instance</strong></p><p>Is method just utility logic? → <strong>YES → Static</strong></p>"
                },
                {
                    "type": "section",
                    "title": "4.12 Common Mistakes (Deep Explanation)",
                    "rich": "<div class=\"space-y-6\"><p><strong class=\"text-red-600 font-bold\">❌ 1. Accessing instance inside static</strong></p>" + 
                        CODE("static void test() {\n    System.out.println(name); // ERROR\n}") + 
                        "<p><strong class=\"text-red-600 font-bold\">❌ 2. Using this in static</strong></p>" + 
                        CODE("static void test() {\n    this.name = \"A\"; // ERROR\n}") + 
                        "<p><strong class=\"text-red-600 font-bold\">❌ 3. Expecting overriding</strong></p><p>Static does NOT override → it hides</p><p><strong class=\"text-red-600 font-bold\">❌ 4. Modifying static unintentionally</strong></p><p><code>Employee.company = \"XYZ\";</code> // affects ALL objects</p></div>"
                },
                {
                    "type": "section",
                    "title": "4.13 Advanced Insight (Senior Level)",
                    "rich": "<p>Static is loaded once → <strong>improves memory efficiency</strong></p><p class=\"mb-6\">Instance increases memory usage per object</p><p class=\"font-semibold\">👉 That's why:</p><p class=\"bg-slate-800 text-white p-2 mb-2\">Static → scalable systems</p><p class=\"bg-slate-800 text-white p-2\">Instance → flexible systems</p>"
                },
                {
                    "type": "section",
                    "title": "4.14 Final Concept Summary",
                    "rich": "<p class=\"mb-2 font-bold\">Static = Class Level / Shared / One Copy</p>" +
                        "<p class=\"mb-2 font-bold\">Instance = Object Level / Unique / Multiple Copies</p>" +
                        "<p class=\"mb-2\">Static loads first, instance later</p>" +
                        "<p class=\"mb-2\">Static methods → no object context</p>" +
                        "<p>Instance methods → full access</p>"
                },
                {
                    "type": "section",
                    "title": "Instructions"
                },
                {
                    "type": "task",
                    "value": "Task 1: Create a <code class=\"font-mono\">Car</code> class with a <code class=\"font-mono\">static String type = \"Sedan\"</code> and an instance <code class=\"font-mono\">String model</code>. Print both in a method.",
                    "hints": ["Static belongs to class, model belongs to object."],
                    "points": 10
                },
                {
                    "type": "task",
                    "value": "Task 2: Build an <code class=\"font-mono\">Account</code> class. Show that changing <code class=\"font-mono\">static double rate</code> affects all accounts, but <code class=\"font-mono\">double bal</code> remains unique.",
                    "hints": ["Use a static method to change the rate."],
                    "points": 10
                },
                {
                    "type": "task",
                    "value": "Task 3: Demonstrate Static Hiding. Create Parent/Child with <code class=\"font-mono\">static void greet()</code>. Call it using a Parent reference to a Child object.",
                    "hints": ["Parent p = new Child(); p.greet();"],
                    "points": 10
                }
            ],
            validation: [
                { "index": 1, "match": "Sedan", "matchCode": "static\\s*String" },
                { "index": 2, "match": "rate", "matchCode": "static\\s*double" },
                { "index": 3, "match": ".*", "matchCode": "static\\s*void\\s*greet" }
            ]
        }
    ],
}).catch(console.error);
