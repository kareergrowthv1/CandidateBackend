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
        {
            title: 'Creating Objects',
            duration: '32 min',
            sections: [
                {
                    "type": "section",
                    "title": "Lesson Description",
                    "rich": "Creating objects is the step where a class blueprint becomes a real usable entity inside a program. In Java, programs interact with objects to store data and perform operations."
                },
                {
                    "type": "section",
                    "title": "1. Class vs Object: The Blueprint",
                    "rich": "A class only defines the structure, but an object is the actual instance that exists in memory during program execution. When a developer writes a class, it only describes what the object should contain and what it should do.<br/><br/><strong>In simple terms:</strong><br/>• Class → Blueprint<br/>• Object → Instance created from the blueprint<br/><br/><strong>Example:</strong> Imagine a Car class. The class defines properties like brand and speed, and actions like start or stop. When we create objects from this class, each object represents a specific car (car1 → BMW, car2 → Tesla, car3 → Audi). Even though all objects come from the same class, they can store different values."
                },
                {
                    "type": "section",
                    "title": "2. Creating an Object in Java",
                    "rich": "In Java, objects are created using the <code>new</code> keyword. This keyword instructs the Java Virtual Machine to allocate memory for a new instance of a class.<br/><br/><strong>General syntax:</strong><br/><code>ClassName objectName = new ClassName();</code>"
                },
                {
                    "type": "section",
                    "title": "Explanation of the Statement",
                    "rich": TABLE(`<thead><tr class="bg-gray-50 border-b"><th class="px-4 py-2 border-r">Part</th><th class="px-4 py-2">Meaning</th></tr></thead><tbody>
<tr><td class="px-4 py-2 border-r">ClassName</td><td class="px-4 py-2">Name of the class used to create the object</td></tr>
<tr><td class="px-4 py-2 border-r">objectName</td><td class="px-4 py-2">Reference variable that refers to the object</td></tr>
<tr><td class="px-4 py-2 border-r">new</td><td class="px-4 py-2">Keyword that allocates memory for the object</td></tr>
<tr><td class="px-4 py-2 border-r">ClassName()</td><td class="px-4 py-2">Constructor call that initializes the object</td></tr></tbody>`)
                },
                {
                    "type": "section",
                    "title": "3. Example: Student Class",
                    "code": "class Student {\n    String name;\n    int age;\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Student s1 = new Student();\n        Student s2 = new Student();\n    }\n}"
                },
                {
                    "type": "section",
                    "title": "4. Creating Multiple Objects",
                    "rich": "A single class can create any number of objects. Each object has its own memory and can store different data.",
                    "code": "class Product {\n    String name;\n    double price;\n}\n\n// In main:\nProduct p1 = new Product(); // Laptop, 80000\nProduct p2 = new Product(); // Phone, 30000\nProduct p3 = new Product(); // Tablet, 25000"
                },
                {
                    "type": "section",
                    "title": "Default Values in Newly Created Objects",
                    "rich": "When an object is created, Java automatically assigns default values to fields if no values are provided.<br/><br/>" +
                        TABLE(`<thead><tr class="bg-gray-50 border-b"><th class="px-4 py-2 border-r">Data Type</th><th class="px-4 py-2">Default Value</th></tr></thead><tbody>
<tr><td class="px-4 py-2 border-r">int</td><td class="px-4 py-2">0</td></tr>
<tr><td class="px-4 py-2 border-r">double</td><td class="px-4 py-2">0.0</td></tr>
<tr><td class="px-4 py-2 border-r">boolean</td><td class="px-4 py-2">false</td></tr>
<tr><td class="px-4 py-2 border-r">object references</td><td class="px-4 py-2">null</td></tr></tbody>`) +
                        "<br/><strong>Example:</strong><br/><code>class Employee { int salary; }</code><br/>Object creation: <code>Employee e1 = new Employee();</code><br/>Value stored: <code>salary = 0</code><br/>This happens because Java initializes instance variables automatically when the object is created."
                },
                {
                    "type": "section",
                    "title": "Memory Structure During Object Creation",
                    "rich": "Java manages memory using three primary regions during execution.<br/>• The <strong>Method Area</strong> stores the class definitions, method code, and metadata related to classes. When the program starts, class structures are loaded into this area.<br/>• The <strong>Heap Memory</strong> is used to store actual objects created using the new keyword. Every object created during program execution is stored in this region.<br/>• The <strong>Stack Memory</strong> stores reference variables and method calls. When a method executes, its local variables and references exist in the stack.<br/><br/><strong>Conceptually the runtime memory can be visualized like this:</strong><br/>Method Area: Student class structure<br/>Heap Memory: Student Object<br/>Stack Memory: s1 → reference to Student object<br/><br/>This separation allows Java to manage memory efficiently and safely."
                },
                {
                    "type": "section",
                    "title": "Object Lifecycle",
                    "rich": "Objects exist in memory for a certain period of time during program execution. The lifecycle begins when the <code>new</code> keyword creates the object and memory is allocated. During program execution the object may store data, execute methods, and interact with other objects.<br/><br/>If the reference to the object is removed and no other variables point to it, the object becomes eligible for <strong>garbage collection</strong>. The Java Garbage Collector later frees that memory automatically.<br/><br/><strong>Example:</strong><br/><code>Student s1 = new Student();</code><br/>If the reference variable is later removed: <code>s1 = null;</code><br/>The object no longer has a reference and may be cleaned by the garbage collector."
                },
                {
                    "type": "section",
                    "title": "Understanding Object References",
                    "rich": "In Java, variables that store objects actually store <strong>references</strong> to objects, not the objects themselves.<br/><br/><strong>Example:</strong><br/><code>Student s1 = new Student();</code><br/><code>Student s2 = s1;</code><br/><br/>Now both variables refer to the same object. Conceptually:<br/>s1 → Student Object<br/>s2 → Student Object<br/><br/>If one reference modifies the object, the change is visible through the other reference as well."
                },
                {
                    "type": "section",
                    "title": "Object Creation in Real Applications",
                    "rich": "In real-world software systems, objects represent entities that exist in the business domain. For example, in an e-commerce system, developers may create objects such as: <code>User</code>, <code>Product</code>, <code>Order</code>, <code>Payment</code>, and <code>Invoice</code>.<br/><br/>Each object represents a real entity inside the application. These objects interact with each other through method calls to complete business operations. A single application may create thousands or even millions of objects during runtime. Efficient object creation and proper memory management are therefore important aspects of large-scale software development."
                },
                {
                    "type": "section",
                    "title": "7. Object Methods: Behavior in Java",
                    "rich": "Methods are the <strong>behavioral</strong> components of an object. While fields store data (the object's state), methods define the actions that the object can perform. By invoking methods, we can manipulate internal data, perform calculations, or trigger interactions with other objects. In Java, methods allow you to keep your logic and data grouped together, making code modular and organized.<br/><br/><strong>Key Points about Methods:</strong><br/>• <strong>Behavioral Blueprint:</strong> Methods describe what an object can do (e.g., a <code>Car</code> can <code>accelerate</code> or <code>brake</code>).<br/>• <strong>State Manipulation:</strong> They are the primary way to safely update an object's fields (e.g., changing a <code>salary</code> or <code>speed</code>).<br/>• <strong>Encapsulation:</strong> Methods hide complexity, allowing users to call a simple function without knowing the internal implementation.<br/>• <strong>Code Reusability:</strong> Logic is written once and shared across all instances of the class.<br/>• <strong>Dynamic Execution:</strong> Methods enable objects to perform tasks and communicate during program runtime."
                },
                {
                    "type": "section",
                    "title": "Example: Car with Methods",
                    "code": "class Car {\n    String brand;\n    int speed;\n\n    void start() {\n        System.out.println(brand + \" engine started.\");\n    }\n\n    void accelerate(int kmh) {\n        speed += kmh;\n        System.out.println(\"New speed: \" + speed + \" km/h\");\n    }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Car myCar = new Car();\n        myCar.brand = \"Toyota\";\n        myCar.start();\n        myCar.accelerate(40);\n    }\n}"
                },
                {
                    "type": "section",
                    "title": "8. Universal Methods of Every Object (java.lang.Object)",
                    "rich": "In Java, every class automatically inherits from a special parent class called <code>Object</code>. This means that even if you don't define any methods, your object already has built-in capabilities to describe itself, compare itself with others, and provide metadata. These universal methods are the foundation of how Java manages objects in collections and memory."
                },
                {
                    "type": "section",
                    "title": "A. toString()",
                    "rich": "The <code>toString()</code> method is used to provide a human-readable string representation of an object. By default, it returns the class name followed by a hex memory address, but developers usually override it to show actual data values.<br/><br/><strong>Key Points:</strong><br/>• <strong>Default Output:</strong> Displays ClassName@HashCode if not overridden.<br/>• <strong>Customization:</strong> Allows you to display the specific values of fields like <code>name</code> or <code>age</code>.<br/>• <strong>Auto-Invocation:</strong> Automatically called when passing an object to <code>System.out.println()</code>.<br/>• <strong>Debugging:</strong> Essential for quickly inspecting object states in logs.<br/>• <strong>Professional Standards:</strong> It's a standard practice to override this in all business model classes."
                },
                {
                    "type": "section",
                    "title": "Example: Overriding toString()",
                    "code": "class Student {\n    String name = \"John\";\n\n    @Override\n    public String toString() {\n        return \"Student[name=\" + name + \"]\";\n    }\n}\n\n// Usage:\nStudent s1 = new Student();\nSystem.out.println(s1); // Prints: Student[name=John]"
                },
                {
                    "type": "section",
                    "title": "B. equals(Object obj)",
                    "rich": "The <code>equals()</code> method determines if two objects are \"meaningfully equal.\" While the <code>==</code> operator checks if references point to the same memory address, <code>equals()</code> checks if the internal data is the same.<br/><br/><strong>Key Points:</strong><br/>• <strong>Logical Comparison:</strong> Checks content equality (e.g., same Roll Number) rather than address.<br/>• <strong>Custom Rules:</strong> You decide what makes two objects identical in your application.<br/>• <strong>Override Necessity:</strong> Must be overridden for custom objects to compare data correctly.<br/>• <strong>Null Safety:</strong> Good implementations check if the input object is null to prevent errors.<br/>• <strong>Standard Contract:</strong> Objects that are equal must return the same value from <code>hashCode()</code>."
                },
                {
                    "type": "section",
                    "title": "Example: Using equals()",
                    "code": "class User {\n    int id = 101;\n\n    @Override\n    public boolean equals(Object obj) {\n        if (obj instanceof User) {\n            User other = (User) obj;\n            return this.id == other.id;\n        }\n        return false;\n    }\n}\n\n// Usage:\nUser u1 = new User();\nUser u2 = new User();\nSystem.out.println(u1.equals(u2)); // Prints: true"
                },
                {
                    "type": "section",
                    "title": "C. hashCode()",
                    "rich": "The <code>hashCode()</code> method returns an integer ID for the object. It is used by performance-oriented collections like <code>HashMap</code> to organize and find objects in memory efficiently.<br/><br/><strong>Key Points:</strong><br/>• <strong>Numeric Identity:</strong> Provides a unique integer representation for the object.<br/>• <strong>Collection Performance:</strong> Helps in finding objects instantly in HashMaps and HashSets.<br/>• <strong>Efficiency:</strong> Distributes objects into different memory \"buckets\" for faster access.<br/>• <strong>Consitentcy:</strong> Must return the same integer as long as object data doesn't change.<br/>• <strong>Equals Relationship:</strong> Two objects that are equal via <code>equals()</code> must have the same <code>hashCode()</code>."
                },
                {
                    "type": "section",
                    "title": "Example: hashCode() Illustration",
                    "code": "class Product {\n    int id = 50;\n\n    @Override\n    public int hashCode() {\n        return id * 31; // Generates a unique numeric bucket ID\n    }\n}"
                },
                {
                    "type": "section",
                    "title": "D. getClass()",
                    "rich": "The <code>getClass()</code> method returns a <code>Class</code> object containing metadata about the object's type. It's used in reflection to inspect class structure at runtime.<br/><br/><strong>Key Points:</strong><br/>• <strong>Metadata Access:</strong> Provides access to class name, package, and methods.<br/>• <strong>Runtime Investigation:</strong> Identifies which class an object belongs to while the program is running.<br/>• <strong>Reflection:</strong> Core part of frameworks like Spring and Hibernate for auto-discovery.<br/>• <strong>Type Verification:</strong> Useful for checking instance types before casting.<br/>• <strong>Non-Overridable:</strong> This method is marked <code>final</code>; you cannot change its behavior."
                },
                {
                    "type": "section",
                    "title": "Example: Investigating Types",
                    "code": "Student s1 = new Student();\nSystem.out.println(\"Object type: \" + s1.getClass().getSimpleName()); \n// Output: Object type: Student"
                },
                {
                    "type": "section",
                    "title": "E. clone()",
                    "rich": "The <code>clone()</code> method creates a bitwise copy of an object. This is useful when you need an identical instance without altering the original.<br/><br/><strong>Key Points:</strong><br/>• <strong>Memory Replication:</strong> Allocates new memory and copies the field values.<br/>• <strong>Cloning Interface:</strong> The class must implement the <code>Cloneable</code> interface to work.<br/>• <strong>Shallow Copy:</strong> By default, it copies field values; references to other objects are shared.<br/>• <strong>Deep Copying:</strong> Can be manually implemented to fully duplicate nested objects.<br/>• <strong>Snapshotting:</strong> Often used to save the state of an object before making changes."
                },
                {
                    "type": "section",
                    "title": "Example: Cloning an Object",
                    "code": "class Point implements Cloneable {\n    int x = 1, y = 2;\n\n    public Object clone() throws CloneNotSupportedException {\n        return super.clone();\n    }\n}\n\n// Usage:\nPoint p1 = new Point();\nPoint p2 = (Point) p1.clone(); // p2 is now a separate copy"
                },
                {
                    "type": "section",
                    "title": "Instructions"
                },
                {
                    "type": "task",
                    "value": "Task: Object with Behavior<br/><br/>Create an <code class=\"font-mono\">Employee</code> class with a String field <code class=\"font-mono\">name</code> and a method <code class=\"font-mono\">work()</code> that prints <code class=\"font-mono\">\"Working...\"</code>. Create an object, set the name, and call <code class=\"font-mono\">work()</code>.",
                    "hints": ["emp.work();"],
                    "points": 10
                }
            ],
            validation: [
                { index: 1, match: "Working...", matchCode: "work\\s*\\(" }
            ]
        },
        {
            title: 'Accessing Object Members',
            duration: '32 min',
            sections: [
                {
                    "type": "section",
                    "title": "Lesson Description",
                    "rich": "Once an object is created in Java, the next important concept is accessing its members. Members of an object include its variables (fields) and methods (functions) that define the object's state and behavior. Accessing these members allows a program to read or modify the data stored inside an object and to execute the logic defined by its methods."
                },
                {
                    "type": "section",
                    "title": "1. Understanding Object Members",
                    "rich": "Object members consist of two primary components:<br/>• <strong>Instance Variables (Fields)</strong> – store data related to the object<br/>• <strong>Methods</strong> – define actions that the object can perform<br/><br/>When a program creates an object, it stores the object's memory location inside a <strong>reference variable</strong>. The reference variable acts as a handle that allows the program to interact with the object stored in heap memory. Without a reference, the program cannot access the object.<br/><br/><strong>Conceptually:</strong><br/>Reference Variable → Memory address → Object in Heap"
                },
                {
                    "type": "section",
                    "title": "2. Accessing Members Using the Dot Operator",
                    "rich": "Java uses the <strong>dot operator (.)</strong> to access object members. The dot operator connects the reference variable to the fields or methods stored inside the object.<br/><br/><strong>General syntax:</strong><br/><code>objectReference.memberName</code><br/>or for methods:<br/><code>objectReference.methodName()</code><br/><br/>The dot operator instructs the Java runtime to locate the object referenced by the variable and then access the specified member inside that object."
                },
                {
                    "type": "section",
                    "title": "3. Accessing Object Fields",
                    "rich": "Fields store the internal state of an object. After creating an object, a program can assign values to these fields or read their values.",
                    "code": "class Car {\n    String brand;\n    int speed;\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Car car1 = new Car();\n        car1.brand = \"BMW\";\n        car1.speed = 120;\n\n        System.out.println(car1.brand);\n        System.out.println(car1.speed);\n    }\n}"
                },
                {
                    "type": "section",
                    "title": "4. Accessing Object Methods",
                    "rich": "Methods represent the behavior of an object. After an object is created, methods can be called using the same dot operator.",
                    "code": "class Car {\n    String brand;\n    void start() {\n        System.out.println(\"Car started\");\n    }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Car car1 = new Car();\n        car1.brand = \"BMW\";\n        car1.start(); // invokes the method belonging to car1\n    }\n}"
                },
                {
                    "type": "section",
                    "title": "5. Accessing Members Internally vs Externally",
                    "rich": "Object members may be accessed either from within the class or from another class. Inside the same class, members can often be accessed directly using their names. Outside the class, they are accessed through the reference variable and the dot operator.",
                    "code": "class Student {\n    String name;\n    void display() {\n        System.out.println(name); // Internal access\n    }\n}\n\n// Outside the class:\nStudent s1 = new Student();\ns1.name = \"Alice\"; // External access via reference"
                },
                {
                    "type": "section",
                    "title": "Memory Behavior When Accessing Members",
                    "rich": "When a program executes <code>car1.brand</code>:<br/>1. The program looks at the <strong>reference variable</strong> <code>car1</code> in stack memory.<br/>2. This variable stores the memory address of the object in <strong>heap memory</strong>.<br/>3. The JVM uses that address to locate the object and then reads/modifies the specific field.<br/><br/><strong>Conceptually:</strong><br/>Stack: car1 → reference<br/>Heap: Car Object (brand = \"BMW\", speed = 120)"
                },
                {
                    "type": "section",
                    "title": "Shared Object References",
                    "rich": "Java reference variables can point to the same object. Modification through one reference is visible when accessing the other.",
                    "code": "Student s1 = new Student();\ns1.name = \"Alice\";\n\nStudent s2 = s1; // Both point to same object\ns2.name = \"Bob\";\n\nSystem.out.println(s1.name); // Prints: Bob"
                },
                {
                    "type": "section",
                    "title": "Accessing Members Through Method Calls",
                    "rich": "Object members are often accessed indirectly through methods to maintain data consistency.",
                    "code": "class Account {\n    double balance;\n    void deposit(double amount) {\n        balance = balance + amount;\n    }\n}\n\n// Usage:\nAccount acc = new Account();\nacc.deposit(500);"
                },
                {
                    "type": "section",
                    "title": "Accessing Members in Larger Applications",
                    "rich": "In complex systems, objects collaborate (e.g., User, Order, Payment) by accessing each other's members through references, forming the core interaction mechanism of object-oriented design."
                },
                {
                    "type": "section",
                    "title": "Internal JVM Behavior During Member Access",
                    "rich": "When executing <code>car1.start();</code>:<br/>1. Reference is resolved to locate object in heap.<br/>2. JVM determines the method belonging to that object's class.<br/>3. Method is placed on the <strong>call stack</strong> and executed.<br/>4. Control returns after completion.",
                    "code": "class Car {\n    void start() {\n        System.out.println(\"Engine started\");\n    }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Car car1 = new Car();\n        car1.start(); // Step-by-step resolution occurs here\n    }\n}"
                },
                {
                    "type": "section",
                    "title": "Instructions"
                },
                {
                    "type": "task",
                    "value": "Task: Member Interaction<br/><br/>Create a <code class=\"font-mono\">Car</code> object. Set its <code class=\"font-mono\">speed</code> to <code class=\"font-mono\">150</code>. Print <code class=\"font-mono\">\"Speed: \" + car.speed</code>.",
                    "hints": ["car.speed = 150;"],
                    "points": 10
                }
            ],
            validation: [
                { index: 1, match: "Speed: 150", matchCode: "\\.speed\\s*=\\s*150" }
            ]
        },
        {
            title: 'Object Memory Concept',
            duration: '32 min',
            sections: [
                {
                    "type": "section",
                    "title": "Lesson Description",
                    "rich": "When Java programs run, the Java Virtual Machine (JVM) manages memory automatically. Understanding how memory works is essential for understanding how objects behave, how references work, and why certain runtime issues like NullPointerException occur.<br/><br/>Whenever an object is created in Java, it does not simply appear in a single block of memory. Instead, the JVM uses separate memory regions, each designed for a specific purpose. These regions help the JVM manage programs efficiently, maintain performance, and provide memory safety.<br/><br/>The most important regions involved in object creation and usage are:<br/>• Method Area<br/>• Heap Memory<br/>• Stack Memory<br/><br/>These regions work together whenever a class is loaded, an object is created, or a method is executed."
                },
                {
                    "type": "section",
                    "title": "What Happens Internally When an Object is Created",
                    "rich": "Consider the statement:<br/><code>Student s1 = new Student();</code><br/><br/>When this line executes, several internal steps occur inside the JVM.<br/><br/>First, the JVM checks whether the Student class has already been loaded. If the class has not been loaded yet, the Class Loader loads the class definition into memory. This class definition includes information such as variables, methods, and metadata.<br/><br/>Next, the <code>new</code> keyword instructs the JVM to allocate memory in the heap memory. The heap is the region where all objects are stored during runtime.<br/><br/>Once the memory is allocated, the constructor of the class is executed. The constructor initializes the fields of the object either with default values or with values provided during object creation.<br/><br/>Finally, the reference variable <code>s1</code> stores the memory address of the created object. This reference allows the program to access the object later.<br/><br/><strong>Conceptually this process can be visualized as:</strong>",
                    "code": "Stack Memory\n-------------\ns1 \u2192 reference\n\nHeap Memory\n-------------\nStudent Object\nname = null\nage = 0"
                },
                {
                    "type": "section",
                    "rich": "The object exists in heap memory, while the variable s1 simply stores the reference pointing to that object."
                },
                {
                    "type": "section",
                    "title": "Method Area",
                    "rich": "The Method Area is a memory region used by the JVM to store information related to class definitions. When a class is loaded into the JVM, its structure is stored in this area.<br/><br/>This region contains information such as:<br/>\u2022 Class name<br/>\u2022 Method definitions<br/>\u2022 Field definitions<br/>\u2022 Static variables<br/>\u2022 Runtime constant pool<br/><br/>For example, when the JVM loads the following class:",
                    "code": "class Student {\n    String name;\n    int age;\n\n    void study() {\n        System.out.println(\"Studying...\");\n    }\n}"
                },
                {
                    "type": "section",
                    "rich": "The structure of this class is stored inside the Method Area. This includes information about the fields (name, age) and the method (study()).<br/><br/>The Method Area stores the template of the class, but it does not store the actual objects. Objects are stored separately in heap memory."
                },
                {
                    "type": "section",
                    "title": "Heap Memory",
                    "rich": "The Heap Memory is the runtime data area where all objects created using the new keyword are stored.<br/><br/>Whenever an object is created, the JVM allocates memory in the heap large enough to store the object's instance variables.<br/><br/>Example:",
                    "code": "Student s1 = new Student();\nStudent s2 = new Student();"
                },
                {
                    "type": "section",
                    "rich": "This results in two separate objects in heap memory.<br/><br/><strong>Conceptually:</strong>",
                    "code": "Heap Memory\n-------------\nStudent Object 1\nname = null\nage = 0\n\nStudent Object 2\nname = null\nage = 0"
                },
                {
                    "type": "section",
                    "rich": "Each object occupies its own memory location and maintains its own copy of variables. Heap memory is shared among all threads of the program, allowing different parts of the program to access objects through references. Another important characteristic of heap memory is that it is managed by the Garbage Collector, which automatically removes objects that are no longer in use."
                },
                {
                    "type": "section",
                    "title": "Stack Memory",
                    "rich": "The Stack Memory stores method execution information and reference variables. Every time a method runs, a stack frame is created. This frame contains:<br/>\u2022 local variables<br/>\u2022 reference variables<br/>\u2022 method parameters<br/>\u2022 intermediate values<br/><br/>For example:",
                    "code": "public class Main {\n    public static void main(String[] args) {\n        Student s1 = new Student();\n    }\n}"
                },
                {
                    "type": "section",
                    "rich": "When the main method executes, a stack frame is created. The variable s1 exists inside this stack frame.<br/><br/><strong>Conceptually:</strong>",
                    "code": "Stack Memory\n-------------\nmain()\n   s1 \u2192 reference"
                },
                {
                    "type": "section",
                    "rich": "The stack does not store objects themselves; it only stores references pointing to objects in heap memory. Stack memory is also faster to access compared to heap memory because it follows a strict Last In, First Out (LIFO) structure."
                },
                {
                    "type": "section",
                    "title": "Relationship Between Stack and Heap",
                    "rich": "Whenever a program creates an object, both stack and heap are involved. The object itself lives in heap memory, while the reference variable that points to that object lives in stack memory.<br/><br/>Example:",
                    "code": "Student s1 = new Student();"
                },
                {
                    "type": "section",
                    "rich": "<strong>Conceptual structure:</strong>",
                    "code": "Stack Memory\n-------------\ns1 \u2192 reference\n\nHeap Memory\n-------------\nStudent Object\nname = null\nage = 0"
                },
                {
                    "type": "section",
                    "rich": "This separation allows Java to manage memory efficiently and safely."
                },
                {
                    "type": "section",
                    "title": "Stack vs Heap",
                    "rich": "The stack and heap serve different purposes in memory management.<br/><br/>" +
                        TABLE(`<thead><tr class="bg-gray-50 border-b"><th class="px-4 py-2 border-r">Stack Memory</th><th class="px-4 py-2">Heap Memory</th></tr></thead><tbody>
<tr><td class="px-4 py-2 border-r">Stores reference variables</td><td class="px-4 py-2">Stores actual objects</td></tr>
<tr><td class="px-4 py-2 border-r">Stores method calls</td><td class="px-4 py-2">Stores object data</td></tr>
<tr><td class="px-4 py-2 border-r">Faster access</td><td class="px-4 py-2">Slower compared to stack</td></tr>
<tr><td class="px-4 py-2 border-r">Automatically cleared when methods end</td><td class="px-4 py-2">Managed by Garbage Collector</td></tr></tbody>`) +
                        "<br/>Because stack memory is automatically cleared when methods finish execution, reference variables are temporary. Heap memory, however, retains objects until they are no longer referenced."
                },
                {
                    "type": "section",
                    "title": "Understanding Object References",
                    "rich": "In Java, variables that appear to store objects actually store references to objects. A reference is simply a memory address pointing to an object located in heap memory.<br/><br/>Example:",
                    "code": "Student s1 = new Student();\nStudent s2 = s1;"
                },
                {
                    "type": "section",
                    "rich": "Now both s1 and s2 refer to the same object.<br/><br/><strong>Conceptually:</strong>",
                    "code": "Stack Memory\n-------------\ns1 \u2192 \n      \u2192 Student Object\ns2 \u2192 \n\nHeap Memory\n-------------\nStudent Object\nname = null\nage = 0"
                },
                {
                    "type": "section",
                    "rich": "If the object is modified through one reference, the change becomes visible through the other reference as well.<br/><br/>Example:",
                    "code": "s2.name = \"Alice\";\nSystem.out.println(s1.name); // Prints: Alice"
                },
                {
                    "type": "section",
                    "rich": "This happens because both references point to the same physical object in heap memory."
                },
                {
                    "type": "section",
                    "title": "Object Lifecycle",
                    "rich": "Objects exist in memory only for the duration in which they are needed. The lifecycle of an object begins when the <code>new</code> keyword creates it and memory is allocated in the heap. During its lifetime, the object may store values, execute methods, and interact with other objects.<br/><br/>If all references pointing to an object are removed, the object becomes unreachable.<br/><br/>Example:",
                    "code": "Student s1 = new Student();\ns1 = null;"
                },
                {
                    "type": "section",
                    "rich": "After the reference is removed, the object no longer has any way to be accessed by the program. At this stage, the object becomes eligible for <strong>garbage collection</strong>. The Garbage Collector is a JVM component responsible for automatically freeing memory occupied by unused objects."
                },
                {
                    "type": "section",
                    "title": "Visualizing the Complete Memory Model",
                    "rich": "When a program creates and uses objects, the three memory regions interact as follows:",
                    "code": "Method Area\n-----------\nStudent class structure\n\nHeap Memory\n-----------\nStudent Object\n\nStack Memory\n-----------\nmain()\n   s1 \u2192 reference to Student object"
                },
                {
                    "type": "section",
                    "rich": "The Method Area stores the class definition, the Heap stores the actual object, and the Stack stores the reference variable that allows the program to access that object. Together, these regions form the core of Java's runtime memory model, ensuring efficiency, stability, and memory safety."
                },
                {
                    "type": "section",
                    "title": "Instructions"
                },
                {
                    "type": "task",
                    "value": "Task: Shared State<br/><br/>Create a <code class=\"font-mono\">Car</code> object <code class=\"font-mono\">c1</code>. Link <code class=\"font-mono\">c2</code> to <code class=\"font-mono\">c1</code>. Change brand via <code class=\"font-mono\">c1</code> and print via <code class=\"font-mono\">c2</code>.",
                    "hints": ["Car c2 = c1;"],
                    "points": 10
                }
            ],
            validation: [
                { index: 1, match: "[a-zA-Z]+", matchCode: "c2\\s*=\\s*c1" }
            ]
        },

    ],
}).catch(console.error);
