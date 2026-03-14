/** Module 8 — Class and Object (generated) */
const { seedModule, TABLE } = require('./_helpers');
seedModule({
    moduleTitle: 'Class and Object',
    moduleOrder: 8,
    description: 'Classes, objects, members, memory.',
    label: 'OOP',
    lessons: [
        { 
            title: 'Introduction to Classes', 
            duration: '35 min', 
            sections: [
                {
                    "type": "section",
                    "title": "Lesson Description",
                    "rich": "Object-Oriented Programming (OOP) is built on the concept of classes and objects. This lesson introduces the Class as a blueprint for modeled data and behavior, explaining how Java uses these structures to represent real-world entities."
                },
                {
                    "type": "section",
                    "title": "1. Goals of This Lesson",
                    "rich": "By the end of this lesson, you will understand:<br/>• What a class is in Java<br/>• Why classes are the foundation of OOP<br/>• How classes model real-world entities<br/>• The basic syntax and structure of a Java class<br/>• JVM lifecycle: Loading, Heap, and Stack basics"
                },
                {
                    "type": "section",
                    "title": "2. What is Object-Oriented Programming (OOP)?",
                    "rich": "OOP is a paradigm where software is designed using <strong>Objects</strong> that represent real-world entities. Every object has <strong>State</strong> (data) and <strong>Behavior</strong> (methods).<br/><br/>" + 
                          TABLE(`<thead><tr class="bg-gray-50 border-b"><th class="px-4 py-2 border-r">Object</th><th class="px-4 py-2 border-r">State (Data)</th><th class="px-4 py-2">Behavior (Methods)</th></tr></thead><tbody>
<tr><td class="px-4 py-2 border-r">Car</td><td class="px-4 py-2 border-r">color, speed, brand</td><td class="px-4 py-2">start(), stop(), accelerate()</td></tr>
<tr><td class="px-4 py-2 border-r">Student</td><td class="px-4 py-2 border-r">name, age, rollNo</td><td class="px-4 py-2">study(), attendClass()</td></tr></tbody>`)
                },
                {
                    "type": "section",
                    "title": "3. What is a Class?",
                    "rich": "A class is a <strong>blueprint</strong> or template used to create objects. While the class defines the structure, the objects are the actual 'instances' that exist in memory."
                },
                {
                    "type": "section",
                    "title": "Blueprint vs Instance",
                    "rich": TABLE(`<thead><tr class="bg-gray-50 border-b"><th class="px-4 py-2 border-r">Concept</th><th class="px-4 py-2">Real-world Analogy</th></tr></thead><tbody>
<tr><td class="px-4 py-2 border-r"><strong>Class</strong></td><td class="px-4 py-2">A house blueprint (shows where walls and doors go).</td></tr>
<tr><td class="px-4 py-2 border-r"><strong>Object</strong></td><td class="px-4 py-2">The actual physical house built using that blueprint.</td></tr></tbody>`)
                },
                {
                    "type": "section",
                    "title": "4. Basic Syntax of a Class",
                    "rich": "In Java, we use the <code>class</code> keyword followed by the <code>ClassName</code>. By convention, class names use <strong>PascalCase</strong>."
                },
                {
                    "type": "section",
                    "title": "Minimal Class Structure",
                    "code": "class Student {\n    // Data (Fields)\n    // Behavior (Methods)\n}"
                },
                {
                    "type": "section",
                    "title": "5. Example Program",
                    "rich": "Every Java program requires at least one class to house the <code>main</code> method."
                },
                {
                    "type": "section",
                    "title": "Basic Main Class",
                    "code": "public class Main {\n    public static void main(String[] args) {\n        System.out.println(\"Introduction to Classes\");\n    }\n}"
                },
                {
                    "type": "section",
                    "title": "6. Why Classes Are Important",
                    "rich": "Classes allow developers to organize code into modular, reusable units. Instead of writing massive scripts, we break logic into concepts like <code>User</code>, <code>Payment</code>, and <code>Order</code>."
                },
                {
                    "type": "section",
                    "title": "7. Real-World Example: E-Commerce",
                    "rich": "In an e-commerce app, we model different entities as separate files:<br/>• <code>User.java</code><br/>• <code>Product.java</code><br/>• <code>Order.java</code><br/>• <code>Payment.java</code>"
                },
                {
                    "type": "section",
                    "title": "8. Components of a Class",
                    "rich": "A standard Java class contains three primary members:<br/>1. <strong>Fields:</strong> Variables that store state.<br/>2. <strong>Methods:</strong> Functions that define behavior.<br/>3. <strong>Constructors:</strong> Special blocks to initialize new objects."
                },
                {
                    "type": "section",
                    "title": "Full Class Anatomy",
                    "code": "class Student {\n    String name; // Field\n    int age;    // Field\n\n    void study() { // Method\n        System.out.println(name + \" is studying\");\n    }\n}"
                },
                {
                    "type": "section",
                    "title": "9. Class Naming Conventions",
                    "rich": "Professional developers follow strict rules to ensure code readability and prevent conflicts."
                },
                {
                    "type": "section",
                    "title": "Naming Standards",
                    "rich": TABLE(`<thead><tr class="bg-gray-50 border-b"><th class="px-4 py-2 border-r">Standard</th><th class="px-4 py-2 border-r">Correct</th><th class="px-4 py-2">Incorrect</th></tr></thead><tbody>
<tr><td class="px-4 py-2 border-r">PascalCase</td><td class="px-4 py-2 border-r"><code>BankAccount</code></td><td class="px-4 py-2"><code>bank_account</code></td></tr>
<tr><td class="px-4 py-2 border-r">Conceptual</td><td class="px-4 py-2 border-r"><code>OrderService</code></td><td class="px-4 py-2"><code>DataClass</code></td></tr></tbody>`)
                },
                {
                    "type": "section",
                    "title": "10. How Java Uses Classes",
                    "rich": "Java is strictly class-based. Even the <code>main()</code> entry point must reside within a class. Java programs cannot execute without at least one loaded class definition."
                },
                {
                    "type": "section",
                    "title": "11. Real-World Example of Class Design",
                    "rich": "Modeling a Car concept for a racing game or automotive system."
                },
                {
                    "type": "section",
                    "title": "Car Blueprint",
                    "code": "class Car {\n    String brand;\n    int speed;\n\n    void start() {\n        System.out.println(\"Car started\");\n    }\n}"
                },
                {
                    "type": "section",
                    "title": "12. JVM Perspective (Advanced)",
                    "rich": "When you run a Java app, the JVM manages classes and objects across different memory areas:"
                },
                {
                    "type": "section",
                    "title": "Memory Lifecycle",
                    "rich": TABLE(`<thead><tr class="bg-gray-50 border-b"><th class="px-4 py-2 border-r">Area</th><th class="px-4 py-2">Action</th></tr></thead><tbody>
<tr><td class="px-4 py-2 border-r">Method Area</td><td class="px-4 py-2">Stores the Class structure (blueprint).</td></tr>
<tr><td class="px-4 py-2 border-r">Heap Memory</td><td class="px-4 py-2">Stores the actual Object instances.</td></tr>
<tr><td class="px-4 py-2 border-r">Stack</td><td class="px-4 py-2">Executes methods and stores references.</td></tr></tbody>`)
                },
                {
                    "type": "section",
                    "title": "13. Common Beginner Mistakes",
                    "rich": "Avoid confusing a <strong>Class</strong> (blueprint) with an <strong>Object</strong> (instance). Also, follow the <strong>Single Responsibility Principle</strong>: one class should handle one core concept."
                },
                {
                    "type": "section",
                    "title": "14. Upcoming Subtopics",
                    "rich": "In later lessons, we will master:<br/>• <strong>Creating Objects:</strong> Using the <code>new</code> keyword.<br/>• <strong>Constructors:</strong> Initializing object state.<br/>• <strong>Object References:</strong> How memory addresses are stored in the Stack."
                },
                {
                    "type": "section",
                    "title": "15. Pro-Level Development Practices",
                    "rich": "In industry projects (Spring, Hibernate), classes are designed for <strong>Low Coupling</strong> and <strong>High Cohesion</strong>. We use tools like JUnit to test individual class methods."
                },
                {
                    "type": "section",
                    "title": "16. Industrial Example",
                    "rich": "An enterprise <code>User</code> class representing accounts in a system."
                },
                {
                    "type": "section",
                    "title": "Enterprise User Model",
                    "code": "class User {\n    String username;\n    String email;\n\n    void login() {\n        System.out.println(username + \" logged in\");\n    }\n}"
                },
                {
                    "type": "section",
                    "title": "17. Key Concepts Summary",
                    "rich": "• A class is a blueprint; an object is an instance.<br/>• Classes contain Fields (data) and Methods (behavior).<br/>• JVM loads classes into the Method Area and creates objects in the Heap.<br/>• Proper naming (PascalCase) is essential for professional code."
                },
                {
                    "type": "section",
                    "title": "Instructions"
                },
                {
                    "type": "task",
                    "value": "Task: Create a Class<br/><br/>Declare a class named <code class=\"font-mono\">Product</code>. Inside it, declare a String field <code class=\"font-mono\">name</code> and an int field <code class=\"font-mono\">price</code>. Print <code class=\"font-mono\">\"Product blueprint defined\"</code> in the <code class=\"font-mono\">main</code> method.",
                    "hints": ["class Product { ... }"],
                    "points": 10
                },
                {
                    "type": "task",
                    "value": "Task: Real-world Modeling<br/><br/>Declare a class <code class=\"font-mono\">Employee</code> with a method <code class=\"font-mono\">work()</code> that prints <code class=\"font-mono\">\"Employee is working\"</code>. Call this method from <code class=\"font-mono\">main</code> (Note: You'll need to create an object, which we'll cover next, but try it now!).",
                    "hints": ["Employee e = new Employee();", "e.work();"],
                    "points": 10
                }
            ], 
            validation: [
                { index: 1, match: "Product blueprint defined", matchCode: "class\\s+Product" },
                { index: 2, match: "Employee is working", matchCode: "new\\s+Employee" }
            ] 
        },
        { 
            title: 'Creating Classes', 
            duration: '35 min', 
            sections: [
                {
                    "type": "section",
                    "title": "Lesson Description",
                    "rich": "Creating a class is the act of defining a new data type with its own state and behavior. This lesson focuses on the syntax of class declaration, multi-class orchestration, and how the JVM dynamically loads and verifies these definitions using specialized subsystems."
                },
                {
                    "type": "section",
                    "title": "1. Goals of This Lesson",
                    "rich": "By the end of this lesson, you will understand:<br/>• What it means to create a class in Java<br/>• The syntax used to declare multiple classes<br/>• How classes organize data and behavior<br/>• Detailed JVM behavior: Loading, Linking, and Initialization<br/>• Industrial standards like DTOs, POJOs, and SRP"
                },
                {
                    "type": "section",
                    "title": "2. What Does 'Creating a Class' Mean?",
                    "rich": "Class creation is the process of defining a <strong>blueprint</strong>. This blueprint specifies what data the object contains (Fields) and what actions it can perform (Methods).<br/><br/><strong>Analogy:</strong> Defining a <code>Student</code> class is like creating a form that every student must fill out (Name, Age, Roll No)."
                },
                {
                    "type": "section",
                    "title": "3. Basic Syntax for Creating a Class",
                    "rich": "Use the <code>class</code> keyword followed by the name. Names should be nouns and use <strong>PascalCase</strong>.<br/><br/><code>class ClassName { ... }</code>"
                },
                {
                    "type": "section",
                    "title": "4. Example: Main Entry Class",
                    "rich": "Every standalone Java application requires a class to house the entry point."
                },
                {
                    "type": "section",
                    "title": "Basic Class Implementation",
                    "code": "public class Main {\n    public static void main(String[] args) {\n        System.out.println(\"Creating Classes\");\n    }\n}"
                },
                {
                    "type": "section",
                    "title": "5. Adding Fields (Object State)",
                    "rich": "Fields are variables that store the data or 'state' of a class. Each object created from this class will have its own copy of these fields."
                },
                {
                    "type": "section",
                    "title": "Defining State",
                    "code": "class Student {\n    String name; // Data element\n    int age;    // Data element\n}"
                },
                {
                    "type": "section",
                    "title": "6. Adding Methods (Object Behavior)",
                    "rich": "Methods define what the class can <strong>do</strong>. They operate on the data stored in the fields."
                },
                {
                    "type": "section",
                    "title": "Defining Behavior",
                    "code": "class Student {\n    String name;\n    void study() {\n        System.out.println(\"Student is studying\");\n    }\n}"
                },
                {
                    "type": "section",
                    "title": "7. Complete Class Example: Car Model",
                    "rich": "A cohesive class combines state and behavior to model a single concept."
                },
                {
                    "type": "section",
                    "title": "Car Anatomy",
                    "rich": TABLE(`<thead><tr class="bg-gray-50 border-b"><th class="px-4 py-2 border-r">Component</th><th class="px-4 py-2 border-r">Implementation</th><th class="px-4 py-2">Role</th></tr></thead><tbody>
<tr><td class="px-4 py-2 border-r"><strong>Name</strong></td><td class="px-4 py-2 border-r"><code>class Car</code></td><td class="px-4 py-2">The Blueprint ID</td></tr>
<tr><td class="px-4 py-2 border-r"><strong>Fields</strong></td><td class="px-4 py-2 border-r"><code>brand, speed</code></td><td class="px-4 py-2">Object State</td></tr>
<tr><td class="px-4 py-2 border-r"><strong>Methods</strong></td><td class="px-4 py-2 border-r"><code>start()</code></td><td class="px-4 py-2">Object Behavior</td></tr></tbody>`)
                },
                {
                    "type": "section",
                    "title": "8. Multiple Classes in One Program",
                    "rich": "A Java program often defines multiple classes that interact. For example, a <code>Main</code> class to run the program and an <code>Employee</code> class to represent data."
                },
                {
                    "type": "section",
                    "title": "Multi-Class Interaction",
                    "code": "class Employee {\n    String name;\n    void performWork() {\n        System.out.println(name + \" is working.\");\n    }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Employee emp = new Employee();\n        emp.name = \"Alice\";\n        emp.performWork();\n    }\n}"
                },
                {
                    "type": "section",
                    "title": "9. Public vs Default Classes",
                    "rich": "• <strong>Public:</strong> Accessible from any package. File name MUST match class name.<br/>• <strong>Default (no modifier):</strong> Accessible only within the same package."
                },
                {
                    "type": "section",
                    "title": "10. Class Naming Rules",
                    "rich": "Avoid starting with numbers and avoid underscores. Use meaningful nouns.<br/><br/>" + 
                          TABLE(`<thead><tr class="bg-gray-50 border-b"><th class="px-4 py-2 border-r">Context</th><th class="px-4 py-2 border-r">Correct</th><th class="px-4 py-2">Incorrect</th></tr></thead><tbody>
<tr><td class="px-4 py-2 border-r">Format</td><td class="px-4 py-2 border-r"><code>InvoiceGenerator</code></td><td class="px-4 py-2"><code>invoice_generator</code></td></tr>
<tr><td class="px-4 py-2 border-r">Starting</td><td class="px-4 py-2 border-r"><code>User1</code></td><td class="px-4 py-2"><code>1User</code></td></tr></tbody>`)
                },
                {
                    "type": "section",
                    "title": "11. Real-World Example: Product Service",
                    "rich": "Enterprise systems use classes to map to database tables and API results."
                },
                {
                    "type": "section",
                    "title": "Enterprise Model",
                    "code": "class Product {\n    String name;\n    double price;\n    void display() {\n        System.out.println(name + \": $\" + price);\n    }\n}"
                },
                {
                    "type": "section",
                    "title": "12. JVM Behavior & Class Loading Phases",
                    "rich": "Before objects are created, the JVM must load metadata. This happens once per class via three phases:<br/>1. <strong>Loading:</strong> Reads binary data into the Method Area.<br/>2. <strong>Linking:</strong> Includes 'Verification' (checking byte-code integrity) and 'Preparation' (allocating static memory).<br/>3. <strong>Initialization:</strong> Executing static initializers and assigning static variable values."
                },
                {
                    "type": "section",
                    "title": "13. The Class Loader Delegation Principle",
                    "rich": "Java uses a hierarchy: <strong>Bootstrap</strong> -> <strong>Extension</strong> -> <strong>Application</strong>.<br/>• <strong>Delegation Rule:</strong> A loader always 'asks' its parent to load a class first. If the parent fails, only then does it try to load the class itself. This prevents security risks like user-defined classes replacing core Java classes (e.g., <code>java.lang.String</code>)."
                },
                {
                    "type": "section",
                    "title": "14. Common Beginner Mistakes",
                    "rich": "• <strong>God Class:</strong> Putting too many fields (e.g., 50+) in one class; violates modularity.<br/>• <strong>Mixed Responsibilities:</strong> A <code>User</code> class that also handles <code>Payment</code> and <code>Email</code>; becomes a maintenance nightmare.<br/>• <strong>Invalid Naming:</strong> Using names like <code>Data</code> or <code>Temp</code>; provides no context to future developers.<br/>• <strong>Implicit State:</strong> Failing to initialize fields correctly before use."
                },
                {
                    "type": "section",
                    "title": "15. Best Practices: Single Responsibility (SRP)",
                    "rich": "SRP states a class should have <strong>one reason to change</strong>.<br/>• <strong>Extra Point:</strong> High <strong>Cohesion</strong> (related things stay together) and Low <strong>Coupling</strong> (one class doesn't rely too much on another's internals) are the goal. Split <code>User</code> data from <code>PaymentService</code> logic to ensure a bug in payments doesn't stop user profiles from loading."
                },
                {
                    "type": "section",
                    "title": "16. Testing Your Classes (Enterprise Level)",
                    "rich": "Pros use <strong>JUnit</strong> or <strong>Mockito</strong>. <br/>• <strong>Edge Case Coverage:</strong> Test what happens with null fields or negative numbers.<br/>• <strong>Behavior Assertions:</strong> Don't just check if the code runs; check if the <strong>output</strong> and <strong>state changes</strong> match expectations perfectly."
                },
                {
                    "type": "section",
                    "title": "17. Industrial Example: Entity modeling & DTOs",
                    "rich": "In Spring Boot, we use <strong>POJOs</strong> (Plain Old Java Objects) for logic and <strong>DTOs</strong> (Data Transfer Objects) for API responses. <br/>• <strong>Mapping Logic:</strong> Classes are designed so they can be easily converted to JSON or XML without carrying unnecessary 'hidden' logic or secret passwords."
                },
                {
                    "type": "section",
                    "title": "18. Practical Exercises",
                    "rich": "<b>Task 1:</b> Create an <code>Employee</code> class (name, salary).<br/><b>Task 2:</b> Create a <code>Book</code> class (title, author, price).<br/><b>Task 3:</b> Create a <code>BankAccount</code> class with a <code>deposit()</code> method."
                },
                {
                    "type": "section",
                    "title": "19. Key Concepts Summary",
                    "rich": "• Class creation defines the blueprint for future objects.<br/>• Fields = State; Methods = Behavior.<br/>• Classes move through Loading, Linking, and Initialization phases.<br/>• Use SRP and DTO patterns to build production-grade, modular software."
                },
                {
                    "type": "section",
                    "title": "Instructions"
                },
                {
                    "type": "task",
                    "value": "Task: Automotive Blueprint<br/><br/>Declare a class named <code class=\"font-mono\">Car</code> with a String field <code class=\"font-mono\">model</code> and an int field <code class=\"font-mono\">year</code>. Inside the <code class=\"font-mono\">main</code> method, print <code class=\"font-mono\">\"Car blueprint created\"</code>.",
                    "hints": ["class Car { ... }"],
                    "points": 10
                },
                {
                    "type": "task",
                    "value": "Task: Employee Behavior<br/><br/>Declare a class <code class=\"font-mono\">Employee</code> with a method <code class=\"font-mono\">performTask()</code> that prints <code class=\"font-mono\">\"Processing...\"</code>. Call this method from <code class=\"font-mono\">main</code>.",
                    "hints": ["Employee e = new Employee();", "e.performTask();"],
                    "points": 10
                },
                {
                    "type": "task",
                    "value": "Task: Bank Account Model<br/><br/>Create a class <code class=\"font-mono\">Account</code> with a double field <code class=\"font-mono\">balance</code> and a method <code class=\"font-mono\">report()</code> that prints <code class=\"font-mono\">\"Status: Active\"</code>. Call <code class=\"font-mono\">report()</code> from <code class=\"font-mono\">main</code>.",
                    "hints": ["new Account()", "report()"],
                    "points": 10
                }
            ], 
            validation: [
                { index: 1, match: "Car blueprint created", matchCode: "class\\s+Car" },
                { index: 2, match: "Processing...", matchCode: "performTask\\s*\\(" },
                { index: 3, match: "Status: Active", matchCode: "report\\s*\\(" }
            ] 
        },
        { title: 'Creating Objects', duration: '32 min', sections: [
            { type: 'section', title: '1. Goals', text: 'Creating Objects: from basics to professional use — syntax, JVM/runtime behavior, and pitfalls.' },
            { type: 'section', title: '2. Core concepts', list: ['Read official Java docs for this topic.', 'Write small main() experiments.', 'Use debugger / println to verify.'] },
            { type: 'section', title: '3. Example', code: '// Creating Objects\npublic class Main {\n  public static void main(String[] a) {\n    System.out.println("Creating Objects");\n  }\n}' },
            { type: 'section', title: '4. Pro level', text: 'Combine with unit tests, clear naming, and API contracts when building real features.' },
            { type: 'task', value: '<strong>Task</strong><br/>Print line containing <code class="font-mono">Topic: Creating Objects</code>.', hints: ['println'], points: 6 },
            { type: 'task', value: '<strong>Task 2</strong><br/>Print <code class="font-mono">Done: true</code>.', hints: ['boolean'], points: 6 },
        ], validation: [{ index: 1, match: 'Topic:', matchCode: 'println' }, { index: 2, match: 'Done:\\s*true', matchCode: 'true' }] },
        { title: 'Accessing Object Members', duration: '32 min', sections: [
            { type: 'section', title: '1. Goals', text: 'Accessing Object Members: from basics to professional use — syntax, JVM/runtime behavior, and pitfalls.' },
            { type: 'section', title: '2. Core concepts', list: ['Read official Java docs for this topic.', 'Write small main() experiments.', 'Use debugger / println to verify.'] },
            { type: 'section', title: '3. Example', code: '// Accessing Object Members\npublic class Main {\n  public static void main(String[] a) {\n    System.out.println("Accessing Object Members");\n  }\n}' },
            { type: 'section', title: '4. Pro level', text: 'Combine with unit tests, clear naming, and API contracts when building real features.' },
            { type: 'task', value: '<strong>Task</strong><br/>Print line containing <code class="font-mono">Topic: Accessing Object Members</code>.', hints: ['println'], points: 6 },
            { type: 'task', value: '<strong>Task 2</strong><br/>Print <code class="font-mono">Done: true</code>.', hints: ['boolean'], points: 6 },
        ], validation: [{ index: 1, match: 'Topic:', matchCode: 'println' }, { index: 2, match: 'Done:\\s*true', matchCode: 'true' }] },
        { title: 'Object Memory Concept', duration: '32 min', sections: [
            { type: 'section', title: '1. Goals', text: 'Object Memory Concept: from basics to professional use — syntax, JVM/runtime behavior, and pitfalls.' },
            { type: 'section', title: '2. Core concepts', list: ['Read official Java docs for this topic.', 'Write small main() experiments.', 'Use debugger / println to verify.'] },
            { type: 'section', title: '3. Example', code: '// Object Memory Concept\npublic class Main {\n  public static void main(String[] a) {\n    System.out.println("Object Memory Concept");\n  }\n}' },
            { type: 'section', title: '4. Pro level', text: 'Combine with unit tests, clear naming, and API contracts when building real features.' },
            { type: 'task', value: '<strong>Task</strong><br/>Print line containing <code class="font-mono">Topic: Object Memory Concept</code>.', hints: ['println'], points: 6 },
            { type: 'task', value: '<strong>Task 2</strong><br/>Print <code class="font-mono">Done: true</code>.', hints: ['boolean'], points: 6 },
        ], validation: [{ index: 1, match: 'Topic:', matchCode: 'println' }, { index: 2, match: 'Done:\\s*true', matchCode: 'true' }] },
    ],
}).catch(console.error);
