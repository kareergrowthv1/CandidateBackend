/** Module 7 — Methods (Enriched) */
const { seedModule, TABLE } = require('./_helpers');

seedModule({
    moduleTitle: 'Methods',
    moduleOrder: 7,
    description: 'Master the architectural foundations of Java methods, from basic declaration and calling to advanced recursion and memory management.',
    label: 'METHODS',
    lessons: [
        { 
            title: 'Introduction to Methods', 
            duration: '35 min', 
            sections: [
                {
                    "type": "section",
                    "title": "Lesson Description",
                    "rich": "Methods are the primary building blocks of reusable logic in Java. Instead of writing the same code repeatedly, developers encapsulate specific tasks inside methods, which can be called whenever needed. This lesson covers the purpose, benefits, and execution flow of methods in professional software systems."
                },
                {
                    "type": "section",
                    "title": "Key Highlights",
                    "list": [
                        "<strong>Resuability:</strong> Placing logic in a method allows it to be reused multiple times without duplication.",
                        "<strong>Readability:</strong> Named methods describe the <i>intent</i> of code, making complex programs easier to follow.",
                        "<strong>Maintainability:</strong> Fixing a bug in one method corrects the logic in every location where that method is used.",
                        "<strong>JVM Lifecycle:</strong> Every method call creates a new stack frame in memory to manage local variables and execution.",
                        "<strong>Standard Entry:</strong> The <code>main()</code> method is the universal entry point for JVM execution."
                    ]
                },
                {
                    "type": "section",
                    "title": "Method Conceptual Flow",
                    "image": "/public/images/java_method_conceptual_flow_1773498747923.png",
                    "caption": "Conceptual Flow: main() calling sub-methods in a banking system."
                },
                {
                    "type": "section",
                    "title": "1. What is a Method?",
                    "rich": "A method is a block of code that performs a specific task. In simple terms, it is a <strong>reusable block of instructions</strong>. By placing logic like <code>calculateTotal()</code> inside a method, you can trigger that logic from anywhere in your program by simply 'calling' the method name."
                },
                {
                    "type": "section",
                    "title": "2. Simple Method Concept",
                    "rich": "Imagine we want a method that prints a welcome message. Instead of repeating the print statement, we define a <code>welcomeMessage()</code> method and call it from <code>main()</code>."
                },
                {
                    "type": "section",
                    "title": "Simple Method Example",
                    "code": "public class Main {\n    public static void main(String[] args) {\n        System.out.println(\"Program Started\");\n        welcomeMessage(); // Calling our method\n    }\n\n    public static void welcomeMessage() {\n        System.out.println(\"Welcome to Methods Module!\");\n    }\n}"
                },
                {
                    "type": "section",
                    "title": "3. Method for Business Logic (Banking)",
                    "rich": "Professional methods often handle calculations. In a banking app, we might have a method to calculate the final balance after interest is applied."
                },
                {
                    "type": "section",
                    "title": "Banking Example",
                    "code": "public class BankSystem {\n    public static void main(String[] args) {\n        calculateBalance(1000.0, 5.0);\n    }\n\n    public static void calculateBalance(double principal, double rate) {\n        double interest = (principal * rate) / 100;\n        double total = principal + interest;\n        System.out.println(\"Total Balance: \" + total);\n    }\n}"
                },
                {
                    "type": "section",
                    "title": "4. Method for Authentication (Web App)",
                    "rich": "Methods are perfect for security checks. Below is a conceptual example of a method that validates a user."
                },
                {
                    "type": "section",
                    "title": "Authentication Example",
                    "code": "public class AuthService {\n    public static void main(String[] args) {\n        boolean isValid = validateUser(\"admin\", \"1234\");\n        System.out.println(\"Login Successful: \" + isValid);\n    }\n\n    public static boolean validateUser(String username, String password) {\n        if (username.equals(\"admin\") && password.equals(\"1234\")) {\n            return true;\n        }\n        return false;\n    }\n}"
                },
                {
                    "type": "section",
                    "title": "5. Method for E-commerce (Order Processing)",
                    "rich": "Methods help decouple complex logic. In an e-commerce system, a method might handle the entire sequence of processing an order."
                },
                {
                    "type": "section",
                    "title": "Order Processing Example",
                    "code": "public class OrderSystem {\n    public static void main(String[] args) {\n        processOrder(\"ORD12345\", 299.99);\n    }\n\n    public static void processOrder(String orderId, double amount) {\n        System.out.println(\"Processing Order: \" + orderId);\n        System.out.println(\"Deducting Amount: \" + amount);\n        System.out.println(\"Order Confirmed!\");\n    }\n}"
                },
                {
                    "type": "section",
                    "title": "6. Method for Game Physics (Movement)",
                    "rich": "In game development, methods are called 60 times per second to update entity positions."
                },
                {
                    "type": "section",
                    "title": "Game Engine Example",
                    "code": "public class GameEngine {\n    public static void main(String[] args) {\n        updatePlayerPosition(10, 5);\n    }\n\n    public static void updatePlayerPosition(int xOffset, int yOffset) {\n        int currentX = 100;\n        int currentY = 100;\n        System.out.println(\"New Position: \" + (currentX + xOffset) + \", \" + (currentY + yOffset));\n    }\n}"
                },
                {
                    "type": "section",
                    "title": "7. Why Methods are Mandatory",
                    "rich": "Professional programs can consist of millions of lines of code. Methods are the tool used to manage this complexity:"
                },
                {
                    "type": "section",
                    "title": "Professional Advantages",
                    "rich": TABLE(`<thead><tr class="bg-gray-50 border-b"><th class="px-4 py-2 border-r">Feature</th><th class="px-4 py-2">Professional Impact</th></tr></thead><tbody>
<tr><td class="px-4 py-2 border-r">Organization</td><td class="px-4 py-2">Divides large programs into smaller, manageable sub-tasks.</td></tr>
<tr><td class="px-4 py-2 border-r">Code Reuse</td><td class="px-4 py-2">Prevents the 'Copy-Paste' anti-pattern across the codebase.</td></tr>
<tr><td class="px-4 py-2 border-r">Error Resilience</td><td class="px-4 py-2">Ensures logic fixes are centralized and atomic.</td></tr>
<tr><td class="px-4 py-2 border-r">Collaboration</td><td class="px-4 py-2">Enables multiple engineers to work on distinct methods simultaneously.</td></tr></tbody>`)
                },
                {
                    "type": "section",
                    "title": "3. Methods in Enterprise Systems",
                    "rich": "In any modern application, methods are used to encapsulate distinct responsibilities."
                },
                {
                    "type": "section",
                    "title": "Use-Case Examples",
                    "rich": TABLE(`<thead><tr class="bg-gray-50 border-b"><th class="px-4 py-2 border-r">System Type</th><th class="px-4 py-2">Core Methods</th></tr></thead><tbody>
<tr><td class="px-4 py-2 border-r">Banking App</td><td class="px-4 py-2"><code>calculateInterest()</code>, <code>validateTransaction()</code></td></tr>
<tr><td class="px-4 py-2 border-r">E-commerce</td><td class="px-4 py-1"><code>applyDiscount()</code>, <code>processPayment()</code></td></tr>
<tr><td class="px-4 py-2 border-r">Authentication</td><td class="px-4 py-2"><code>validateUser()</code>, <code>generateToken()</code></td></tr>
<tr><td class="px-4 py-2 border-r">Game Engine</td><td class="px-4 py-2"><code>updatePhysics()</code>, <code>renderGraphics()</code></td></tr></tbody>`)
                },
                {
                    "type": "section",
                    "title": "4. The Main Method Breakdown",
                    "rich": "Every Java program starts its lifecycle at a specific method: <code>public static void main(String[] args)</code>."
                },
                {
                    "type": "section",
                    "title": "Component Analysis",
                    "rich": TABLE(`<thead><tr class="bg-gray-50 border-b"><th class="px-4 py-2 border-r">Keyword</th><th class="px-4 py-2">Technical Meaning</th></tr></thead><tbody>
<tr><td class="px-4 py-2 border-r"><code>public</code></td><td class="px-4 py-2">Method is accessible from any class in the system.</td></tr>
<tr><td class="px-4 py-2 border-r"><code>static</code></td><td class="px-4 py-2">Method belongs to the class itself, not a specific object.</td></tr>
<tr><td class="px-4 py-2 border-r"><code>void</code></td><td class="px-4 py-2">Indicates that this method does not return a value.</td></tr>
<tr><td class="px-4 py-2 border-r"><code>main</code></td><td class="px-4 py-2">The hardcoded name the JVM searches for at startup.</td></tr></tbody>`)
                },
                {
                    "type": "section",
                    "title": "5. JVM Internal Workflow",
                    "rich": "When a method is called at runtime:<br/>1. The JVM <strong>calls</strong> the method and creates a <strong>Stack Frame</strong> in memory.<br/>2. The method runs its instructions sequentially.<br/>3. When finished, control returns to the caller, and the stack frame is discarded.<br/><br/>This sequence of nested calls is known as the <strong>Call Stack</strong>."
                },
                {
                    "type": "section",
                    "title": "6. Common Beginner Mistakes",
                    "rich": "<strong>1. Monolithic Main:</strong> Beginners often write thousands of lines inside <code>main()</code>. Professionals break this into small, descriptive methods.<br/><br/><strong>2. 'God' Methods:</strong> Methods should follow the <strong>Single Responsibility Principle</strong>. Avoid methods like <code>validateAndSaveAndEmail()</code>. Instead, create three separate methods for each specific task."
                },
                {
                    "type": "section",
                    "title": "7. Real-World Analogy: Factory Machines",
                    "rich": "Think of methods like specialized machines in a factory. A factory has an assembly line (App execution) where raw materials (data) pass through different machines (Methods) to perform specific transformations. Each machine does one job perfectly before passing the product to the next."
                },
                {
                    "type": "section",
                    "title": "8. Upcoming Method Roadmap",
                    "rich": "In the following lessons, we will dive deep into the technical mechanics of methods:"
                },
                {
                    "type": "section",
                    "title": "Curriculum Overview",
                    "rich": TABLE(`<thead><tr class="bg-gray-50 border-b"><th class="px-4 py-2 border-r">Lesson</th><th class="px-4 py-2">Key Technical Objective</th></tr></thead><tbody>
<tr><td class="px-4 py-2 border-r">Declaration</td><td class="px-4 py-2">Syntax, return types, and access modifiers.</td></tr>
<tr><td class="px-4 py-2 border-r">Parameters</td><td class="px-4 py-2">Passing data and arguments into a block of code.</td></tr>
<tr><td class="px-4 py-2 border-r">Returns</td><td class="px-4 py-2">How methods send results back to the caller.</td></tr>
<tr><td class="px-4 py-2 border-r">Recursion</td><td class="px-4 py-2">Methods that call themselves for complex solving.</td></tr></tbody>`)
                },
                {
                    "type": "section",
                    "title": "Instructions"
                },
                {
                    "type": "task",
                    "value": "Task: Entry Point Check<br/><br/>Write a standard <code class=\"font-mono\">main</code> method inside a <code class=\"font-mono\">Main</code> class that prints <code class=\"font-mono\">\"System Ready\"</code>.",
                    "hints": ["public static void main(String[] args)"],
                    "points": 10
                },
                {
                    "type": "task",
                    "value": "Task: Minimal Output<br/><br/>Declare a class <code class=\"font-mono\">MethodDemo</code> and inside a main method, print <code class=\"font-mono\">\"Learning Methods\"</code>.",
                    "hints": [],
                    "points": 10
                }
            ], 
            validation: [
                { index: 1, match: "System Ready", matchCode: "main\\s*\\(" }, 
                { index: 2, match: "Learning Methods", matchCode: "MethodDemo" }
            ] 
        },
        { 
            title: 'Method Declaration', 
            duration: '35 min', 
            sections: [
                {
                    "type": "section",
                    "title": "Lesson Description",
                    "rich": "A method declaration is the blueprint that defines how a task will be executed. It tells the Java compiler the name, inputs, outputs, and visibility of a block of code. Understanding the syntax of declaration is critical for building scalable and error-free applications."
                },
                {
                    "type": "section",
                    "title": "Anatomy of a Declaration",
                    "image": "/public/images/java_method_declaration_fully_labeled_example_1773500442234.png",
                    "caption": "Method Blueprint: A complete breakdown of access, return types, and labels."
                },
                {
                    "type": "section",
                    "title": "1. What is Method Declaration?",
                    "rich": "A method declaration defines a method’s structure so the Java compiler understands what it is called, what inputs it accepts, and what it produces. It acts as a <strong>blueprint</strong> for the logic that will live inside the method body."
                },
                {
                    "type": "section",
                    "title": "2. General Syntax Structure",
                    "rich": "The standard structure follows a specific order of keywords and identifiers:"
                },
                {
                    "type": "section",
                    "title": "Syntax Blueprint",
                    "code": "accessModifier returnType methodName(parameters) {\n    // Method Body (Logic goes here)\n    return value; \n}"
                },
                {
                    "type": "section",
                    "title": "3. Access Modifiers",
                    "rich": "Access modifiers control the visibility and security of your methods. They determine which other classes can see and call your method."
                },
                {
                    "type": "section",
                    "title": "Visibility Levels",
                    "rich": TABLE(`<thead><tr class="bg-gray-50 border-b"><th class="px-4 py-2 border-r">Modifier</th><th class="px-4 py-2">Description</th></tr></thead><tbody>
<tr><td class="px-4 py-2 border-r"><code>public</code></td><td class="px-4 py-2">Accessible from any class in any package.</td></tr>
<tr><td class="px-4 py-2 border-r"><code>private</code></td><td class="px-4 py-2">Accessible only within the same class (Encapsulation).</td></tr>
<tr><td class="px-4 py-2 border-r"><code>protected</code></td><td class="px-4 py-2">Accessible within the same package and by subclasses.</td></tr>
<tr><td class="px-4 py-2 border-r"><code>default</code></td><td class="px-4 py-2">Accessible only within classes in the same package.</td></tr></tbody>`)
                },
                {
                    "type": "section",
                    "title": "4. Return Types",
                    "rich": "The return type specifies the data type of the value the method produces. If a method performs an action but returns nothing, the <code>void</code> keyword is used."
                },
                {
                    "type": "section",
                    "title": "Common Return Types",
                    "rich": TABLE(`<thead><tr class="bg-gray-50 border-b"><th class="px-4 py-2 border-r">Type</th><th class="px-4 py-2">Example Use-Case</th></tr></thead><tbody>
<tr><td class="px-4 py-2 border-r"><code>void</code></td><td class="px-4 py-2">Printing messages, updating a database (no result needed).</td></tr>
<tr><td class="px-4 py-2 border-r"><code>int</code> / <code>double</code></td><td class="px-4 py-2">Mathematical calculations, counting items.</td></tr>
<tr><td class="px-4 py-2 border-r"><code>boolean</code></td><td class="px-4 py-2">Validation checks (isUserLoggedIn, isValidEmail).</td></tr>
<tr><td class="px-4 py-2 border-r"><code>String</code> / <code>Object</code></td><td class="px-4 py-2">Retrieving textual data or complex objects.</td></tr></tbody>`)
                },
                {
                    "type": "section",
                    "title": "5. Example: Discount Logic (E-commerce)",
                    "rich": "A common method declaration for calculating a reduction in price based on a percentage."
                },
                {
                    "type": "section",
                    "title": "Discount Calculation",
                    "code": "public double calculateDiscount(double price, int percentage) {\n    return (price * percentage) / 100;\n}"
                },
                {
                    "type": "section",
                    "title": "6. Example: Temperature Conversion (Weather App)",
                    "rich": "Methods are essential for converting units. Here we declare a method to convert Celsius to Fahrenheit."
                },
                {
                    "type": "section",
                    "title": "Unit Conversion",
                    "code": "public static double toFahrenheit(double celsius) {\n    return (celsius * 9/5) + 32;\n}"
                },
                {
                    "type": "section",
                    "title": "7. Example: Inventory Management (Warehouse)",
                    "rich": "A boolean return type is perfect for checking if a product is in stock."
                },
                {
                    "type": "section",
                    "title": "Stock Check",
                    "code": "public boolean isProductInStock(String productId, int requestedQty) {\n    int currentStock = 50; // Conceptual data\n    return currentStock >= requestedQty;\n}"
                },
                {
                    "type": "section",
                    "title": "8. Example: Geometry Logic (Graphics Engine)",
                    "rich": "Calculating shapes requires precise return types and parameters."
                },
                {
                    "type": "section",
                    "title": "Area of Circle",
                    "code": "public double getCircleArea(double radius) {\n    return Math.PI * radius * radius;\n}"
                },
                {
                    "type": "section",
                    "title": "9. Parameters and naming",
                    "rich": "Parameters are input variables declared inside the parentheses. They allow the method to operate on different data dynamically. Standard Java follows <strong>camelCase</strong> for method names (e.g., <code>calculateTotalAmount()</code>)."
                },
                {
                    "type": "section",
                    "title": "10. The Return Statement",
                    "rich": "If a method defines a return type (anything other than <code>void</code>), it <strong>must</strong> use the <code>return</code> keyword to send a value back."
                },
                {
                    "type": "section",
                    "title": "11. Industrial Best Practices",
                    "rich": "Professional developers adhere to several 'Clean Code' principles when declaring methods:"
                },
                {
                    "type": "section",
                    "title": "Professional Standards",
                    "rich": TABLE(`<thead><tr class="bg-gray-50 border-b"><th class="px-4 py-2 border-r">Principle</th><th class="px-4 py-2">Actionable Rule</th></tr></thead><tbody>
<tr><td class="px-4 py-2 border-r">Verb First</td><td class="px-4 py-2">Start names with a verb (e.g., <code>processOrder</code>, not <code>orderProcess</code>).</td></tr>
<tr><td class="px-4 py-2 border-r">Small Size</td><td class="px-4 py-2">Each method should typically be less than 20-30 lines of code.</td></tr>
<tr><td class="px-4 py-2 border-r">Single Purpose</td><td class="px-4 py-2">A method should do exactly one thing (Single Responsibility).</td></tr>
<tr><td class="px-4 py-2 border-r">Param Count</td><td class="px-4 py-2">Keep parameters under 3-4. Use objects if more are needed.</td></tr></tbody>`)
                },
                {
                    "type": "section",
                    "title": "12. Practical Implementation",
                    "code": "public class OrderService {\n    public double calculateTotalPrice(double price, int quantity) {\n        double taxRate = 0.08;\n        double subtotal = price * quantity;\n        return subtotal + (subtotal * taxRate);\n    }\n}"
                },
                {
                    "type": "section",
                    "title": "Instructions"
                },
                {
                    "type": "task",
                    "value": "Task: Basic Declaration<br/><br/>Declare a public class <code class=\"font-mono\">SumDemo</code>. Inside it, declare a <code class=\"font-mono\">public static void main</code> method that prints <code class=\"font-mono\">\"Blueprint Ready\"</code>.",
                    "hints": ["public class SumDemo", "System.out.println(\"Blueprint Ready\");"],
                    "points": 10
                },
                {
                    "type": "task",
                    "value": "Task: Mathematical Component<br/><br/>Inside the same class, declare a method named <code class=\"font-mono\">calculate</code> that returns an <code class=\"font-mono\">int</code> value of <code class=\"font-mono\">10</code>. Call it from <code class=\"font-mono\">main</code> and print the result.",
                    "hints": ["public static int calculate() { return 10; }"],
                    "points": 10
                }
            ], 
            validation: [
                { index: 1, match: "Blueprint Ready", matchCode: "class\\s*SumDemo" },
                { index: 2, match: "10", matchCode: "calculate\\s*\\(" }
            ] 
        },
        { 
            title: 'Method Parameters', 
            duration: '35 min', 
            sections: [
                {
                    "type": "section",
                    "title": "Lesson Description",
                    "rich": "Parameters are the specialized variables that allow a method to receive input data. They turn static blocks of code into dynamic, reusable tools that can process different data every time they are called."
                },
                {
                    "type": "section",
                    "title": "Parameters vs Arguments",
                    "image": "/public/images/java_params_vs_args_concept_1773500762862.png",
                    "caption": "Mapping flow: The variables in the definition (Parameters) receive values from the call (Arguments)."
                },
                {
                    "type": "section",
                    "title": "1. What Are Method Parameters?",
                    "rich": "A method parameter is a variable declared in the method's signature. It acts as a <strong>placeholder</strong> for the actual data that will be passed when the method is executed."
                },
                {
                    "type": "section",
                    "title": "2. Parameters vs Arguments",
                    "rich": "While often used interchangeably, they represent two different stages of a method's lifecycle:"
                },
                {
                    "type": "section",
                    "title": "Concept Breakdown",
                    "rich": TABLE(`<thead><tr class="bg-gray-50 border-b"><th class="px-4 py-2 border-r">Term</th><th class="px-4 py-2">Meaning</th><th class="px-4 py-2">Location</th></tr></thead><tbody>
<tr><td class="px-4 py-2 border-r"><strong>Parameter</strong></td><td class="px-4 py-2">The variable placeholder.</td><td class="px-4 py-2">Method definition.</td></tr>
<tr><td class="px-4 py-2 border-r"><strong>Argument</strong></td><td class="px-4 py-2">The actual value passed.</td><td class="px-4 py-2">Method call.</td></tr></tbody>`)
                },
                {
                    "type": "section",
                    "title": "3. Single vs Multiple Parameters",
                    "rich": "A method can accept any number of parameters, separated by commas. Java enforces <strong>Strict Type Matching</strong>—the argument passed must match the parameter's declared type."
                },
                {
                    "type": "section",
                    "title": "Multiple Parameter Syntax",
                    "code": "public void registerUser(String name, int age, boolean isActive) {\n    System.out.println(\"User: \" + name);\n}"
                },
                {
                    "type": "section",
                    "title": "4. Order Matters",
                    "rich": "Java matches arguments to parameters based on their position. If you swap the order in the call, the program will either fail to compile or produce logical errors."
                },
                {
                    "type": "section",
                    "title": "Incorrect Call Order",
                    "code": "// Definition: void showInfo(String name, int id)\nshowInfo(101, \"Alice\"); // ERROR: int cannot be converted to String"
                },
                {
                    "type": "section",
                    "title": "5. Pass-by-Value (Primitives)",
                    "rich": "In Java, primitive types (int, double, etc.) are always <strong>passed by value</strong>. This means the method receives a <strong>copy</strong> of the data. Modifying the parameter inside the method does NOT affect the original variable outside."
                },
                {
                    "type": "section",
                    "title": "Primitive Copy Example",
                    "code": "public void modifyValue(int x) {\n    x = 100; // Only the copy is changed\n}\n\n// Calling code:\nint num = 5;\nmodifyValue(num);\nSystem.out.println(num); // Result is still 5"
                },
                {
                    "type": "section",
                    "title": "6. Reference Passing (Objects)",
                    "rich": "When you pass an Object (like an Array or a custom class), you are passing the <strong>reference</strong> to that object. Modifications to the object's contents inside the method WILL be reflected in the original object."
                },
                {
                    "type": "section",
                    "title": "Object Reference Example",
                    "code": "public void updateArray(int[] arr) {\n    arr[0] = 99; // Modifies the actual object in memory\n}\n\n// Calling code:\nint[] myArr = {1, 2};\nupdateArray(myArr);\nSystem.out.println(myArr[0]); // Result is 99!"
                },
                {
                    "type": "section",
                    "title": "7. Varargs: Variable-Length Parameters",
                    "rich": "Introduced in Java 5, <strong>Varargs</strong> (<code>...</code>) allow a method to accept Zero or More arguments of a specific type. Internally, Java treats varargs as an array."
                },
                {
                    "type": "section",
                    "title": "Varargs Implementation",
                    "code": "public void sumItems(int... numbers) {\n    int sum = 0;\n    for (int n : numbers) sum += n;\n    System.out.println(\"Total: \" + sum);\n}"
                },
                {
                    "type": "section",
                    "title": "8. Professional Best Practices",
                    "rich": "Professional engineers follow strict cleanliness rules when designing parameter lists to ensure code maintainability."
                },
                {
                    "type": "section",
                    "title": "Industry Standards",
                    "rich": TABLE(`<thead><tr class="bg-gray-50 border-b"><th class="px-4 py-2 border-r">Best Practice</th><th class="px-4 py-2">Actionable Rule</th></tr></thead><tbody>
<tr><td class="px-4 py-2 border-r">Limit Count</td><td class="px-4 py-2">Prefer 0-3 parameters. If more are needed, use a 'Data Object'.</td></tr>
<tr><td class="px-4 py-2 border-r">Meaningful Names</td><td class="px-4 py-2">Never use <code>a</code>, <code>b</code>, <code>x</code>. Use <code>unitPrice</code>, <code>taxRate</code>.</td></tr>
<tr><td class="px-4 py-2 border-r">Validation</td><td class="px-4 py-2">Check for <code>null</code> or negative numbers immediately (Guards).</td></tr>
<tr><td class="px-4 py-2 border-r">Type Safety</td><td class="px-4 py-2">Avoid using generic <code>Object</code>. Use specific types or Enums.</td></tr></tbody>`)
                },
                {
                    "type": "section",
                    "title": "9. Industrial Example: Product Management",
                    "rich": "A real-world method for managing inventory with parameter validation."
                },
                {
                    "type": "section",
                    "title": "Stock Management System",
                    "code": "public class Warehouse {\n    public void updateInventory(String sku, int quantityChange) {\n        // Guard Clause: validation\n        if (sku == null || sku.isEmpty()) {\n            System.out.println(\"Invalid SKU\");\n            return;\n        }\n\n        System.out.println(\"Updating \" + sku + \" by \" + quantityChange + \" units.\");\n    }\n}"
                },
                {
                    "type": "section",
                    "title": "Instructions"
                },
                {
                    "type": "task",
                    "value": "Task: Parameter Mapping<br/><br/>Declare a public class <code class=\"font-mono\">AreaTool</code>. Create a <code class=\"font-mono\">public static void calculate</code> method that receives two <code class=\"font-mono\">int</code> parameters: <code class=\"font-mono\">length</code> and <code class=\"font-mono\">width</code>. Print the result of length * width.",
                    "hints": ["public static void calculate(int length, int width)"],
                    "points": 10
                },
                {
                    "type": "task",
                    "value": "Task: Argument Interaction<br/><br/>Declare a class <code class=\"font-mono\">Speaker</code> with a method <code class=\"font-mono\">say</code> that receives a <code class=\"font-mono\">String</code> named <code class=\"font-mono\">msg</code>. Print <code class=\"font-mono\">\"Message: \" + msg</code>.",
                    "hints": ["void say(String msg)"],
                    "points": 10
                }
            ], 
            validation: [
                { index: 1, match: "calculate", matchCode: "calculate\\s*\\(" },
                { index: 2, match: "Message:", matchCode: "say\\s*\\(" }
            ] 
        },
        { 
            title: 'Method Return Types', 
            duration: '35 min', 
            sections: [
                {
                    "type": "section",
                    "title": "Return Lifecycle Visualization",
                    "rich": TABLE(`<thead><tr class="bg-gray-50 border-b"><th class="px-4 py-2 border-r">Stage</th><th class="px-4 py-2 border-r">Action</th><th class="px-4 py-2">Data Transformation</th></tr></thead><tbody>
<tr><td class="px-4 py-2 border-r"><strong>1. Execution</strong></td><td class="px-4 py-2 border-r">Method logic runs to completion.</td><td class="px-4 py-2">Intermediate variables calculated.</td></tr>
<tr><td class="px-4 py-2 border-r"><strong>2. Return Trigger</strong></td><td class="px-4 py-2 border-r"><code>return</code> keyword is reached.</td><td class="px-4 py-2">Method stops immediately.</td></tr>
<tr><td class="px-4 py-2 border-r"><strong>3. Handover</strong></td><td class="px-4 py-2 border-r">Result passed to Call Stack.</td><td class="px-4 py-2">Local variables destroyed.</td></tr>
<tr><td class="px-4 py-2 border-r"><strong>4. Assignment</strong></td><td class="px-4 py-2 border-r">Caller receives and stores value.</td><td class="px-4 py-2"><code>result = method();</code></td></tr></tbody>`)
                },
                {
                    "type": "section",
                    "title": "1. What is a Method Return Type?",
                    "rich": "A return type defines what a method produces after it finishes its work. It acts as the <strong>output</strong> of the method unit, allowing code to pass results back to the caller for further processing or decision-making."
                },
                {
                    "type": "section",
                    "title": "2. Example: Authentication Status (Security)",
                    "rich": "Boolean return types are industrially used to check permissions and user states."
                },
                {
                    "type": "section",
                    "title": "User Status Check",
                    "code": "public boolean isUserAuthorized(String token) {\n    if (token == null) return false;\n    return token.startsWith(\"AUTH_\");\n}"
                },
                {
                    "type": "section",
                    "title": "3. Example: Interest Calculation (Finance)",
                    "rich": "Calculating precise values requires double or BigDecimal return types."
                },
                {
                    "type": "section",
                    "title": "Loan Interest",
                    "code": "public double getInterestAmount(double principal, double rate) {\n    return (principal * rate) / 100;\n}"
                },
                {
                    "type": "section",
                    "title": "4. Example: Feature Toggles (DevOps)",
                    "rich": "Returning values from configuration methods helps enable or disable features dynamically."
                },
                {
                    "type": "section",
                    "title": "System Feature Check",
                    "code": "public boolean isDarkModeEnabled() {\n    // Simulating a check from system properties\n    return System.getProperty(\"ui.theme\").equals(\"dark\");\n}"
                },
                {
                    "type": "section",
                    "title": "5. Basic Syntax and the 'return' Keyword",
                    "rich": "The return type specifies the data type of the result a method sends back. If a method exists only to perform an action (like printing), its return type is <code>void</code>."
                },
                {
                    "type": "section",
                    "title": "2. Basic Syntax and the 'return' Keyword",
                    "rich": "The <code>return</code> keyword is used to stop the execution of a method and send a value back to the code that called it."
                },
                {
                    "type": "section",
                    "title": "Return Flow Syntax",
                    "code": "public int calculateSum(int a, int b) {\n    return a + b; // Result is sent back to the caller\n}"
                },
                {
                    "type": "section",
                    "title": "3. Returning Primitive Values",
                    "rich": "Methods can return any of the 8 primitive data types (int, double, boolean, etc.). This is the most common use-case for mathematical or logical processing."
                },
                {
                    "type": "section",
                    "title": "Primitive Return Types",
                    "rich": TABLE(`<thead><tr class="bg-gray-50 border-b"><th class="px-4 py-2 border-r">Type</th><th class="px-4 py-2">Typical Result</th></tr></thead><tbody>
<tr><td class="px-4 py-2 border-r"><code>int</code></td><td class="px-4 py-2">Counts, sums, indexes.</td></tr>
<tr><td class="px-4 py-2 border-r"><code>double</code></td><td class="px-4 py-2">Prices, measurements, percentages.</td></tr>
<tr><td class="px-4 py-2 border-r"><code>boolean</code></td><td class="px-4 py-2">Validation flags (isValid, isUserActive).</td></tr></tbody>`)
                },
                {
                    "type": "section",
                    "title": "4. Returning Object References",
                    "rich": "Java methods can return complex objects, such as <code>String</code>, Arrays, or custom class instances. When returning an object, the method passes a <strong>reference</strong> to the object in memory."
                },
                {
                    "type": "section",
                    "title": "Object Return Example",
                    "code": "public String getFirstName() {\n    return \"Alice\"; // String object reference\n}\n\npublic int[] getGrades() {\n    return new int[]{85, 90, 78}; // Array object reference\n}"
                },
                {
                    "type": "section",
                    "title": "5. Logic-Based Returns (Early Return)",
                    "rich": "A method can have multiple <code>return</code> statements within conditional logic. Once any <code>return</code> is hit, the method ends immediately."
                },
                {
                    "type": "section",
                    "title": "Early Return Guard Pattern",
                    "code": "public String checkStatus(int score) {\n    if (score < 50) return \"Fail\"; // Early exit\n    if (score < 80) return \"Pass\";\n    return \"Excellent\";\n}"
                },
                {
                    "type": "section",
                    "title": "6. The Concept of 'void'",
                    "rich": "Use <code>void</code> when a method is designed to perform a side-effect (like writing to a log, updating a database, or printing) rather than producing a value."
                },
                {
                    "type": "section",
                    "title": "void vs Return",
                    "rich": TABLE(`<thead><tr class="bg-gray-50 border-b"><th class="px-4 py-2 border-r">Feature</th><th class="px-4 py-2">Action Method (void)</th><th class="px-4 py-2">Functional Method (return)</th></tr></thead><tbody>
<tr><td class="px-4 py-2 border-r">Result</td><td class="px-4 py-2">Produces NO data.</td><td class="px-4 py-2">Produces SPECIFIC data.</td></tr>
<tr><td class="px-4 py-2 border-r">Usage</td><td class="px-4 py-2">Runs an operation.</td><td class="px-4 py-2">Calculates or retrieves values.</td></tr></tbody>`)
                },
                {
                    "type": "section",
                    "title": "7. Professional Best Practices",
                    "rich": "Clean code requires returns to be predictable and easy to trace."
                },
                {
                    "type": "section",
                    "title": "Industry Guidelines",
                    "rich": TABLE(`<thead><tr class="bg-gray-50 border-b"><th class="px-4 py-2 border-r">Rule</th><th class="px-4 py-2">Description</th></tr></thead><tbody>
<tr><td class="px-4 py-2 border-r">Single Exit Point</td><td class="px-4 py-2">Prefer one exit point for complex logic (though guard clauses are allowed).</td></tr>
<tr><td class="px-4 py-2 border-r">Explicit Types</td><td class="px-4 py-2">Always return the most specific type possible.</td></tr>
<tr><td class="px-4 py-2 border-r">Meaningful Failures</td><td class="px-4 py-2">Avoid returning <code>null</code> if possible; return an empty object or throw an exception.</td></tr></tbody>`)
                },
                {
                    "type": "section",
                    "title": "8. Industrial Example: Pricing Engine",
                    "rich": "In a real-world shopping app, a method calculates the final total including tax if the user is in a specific region."
                },
                {
                    "type": "section",
                    "title": "Tax Calculation Logic",
                    "code": "public class PricingEngine {\n    public double getFinalTotal(double subtotal, double taxRate) {\n        if (subtotal <= 0) return 0.0; // Early return for invalid input\n        return subtotal + (subtotal * taxRate);\n    }\n}"
                },
                {
                    "type": "section",
                    "title": "Instructions"
                },
                {
                    "type": "task",
                    "value": "Task: Primitive Return Implementation<br/><br/>Declare a class <code class=\"font-mono\">Calculator</code>. Create a <code class=\"font-mono\">public int getYear</code> method that receives no parameters and returns the integer <code class=\"font-mono\">2024</code>. Print the result from a main method.",
                    "hints": ["public int getYear() { return 2024; }"],
                    "points": 10
                },
                {
                    "type": "task",
                    "value": "Task: Conditional Return Logic<br/><br/>Create a class <code class=\"font-mono\">Security</code> with a method <code class=\"font-mono\">isAllowed</code> that receives an <code class=\"font-mono\">int age</code>. If age is 18 or more, return <code class=\"font-mono\">true</code>, otherwise return <code class=\"font-mono\">false</code>.",
                    "hints": ["return age >= 18;"],
                    "points": 10
                }
            ], 
            validation: [
                { index: 1, match: "2024", matchCode: "getYear\\s*\\(" },
                { index: 2, match: "isAllowed", matchCode: "return\\s+age" }
            ] 
        },
        { 
            title: 'Calling Methods', 
            duration: '35 min', 
            sections: [
                {
                    "type": "section",
                    "title": "Lesson Description",
                    "rich": "Calling a method (invocation) is the process of executing a predefined block of code. In this lesson, we master the mechanics of trigger execution, argument passing, and how Java manages active methods using the Call Stack."
                },
                {
                    "type": "section",
                    "title": "1. Goals of This Lesson",
                    "rich": "By the end of this lesson, you should understand:<br/>• How to call (invoke) methods in Java<br/>• The syntax used to execute methods<br/>• How arguments are passed to methods<br/>• How the call stack works during method execution<br/>• What happens during nested method calls<br/>• Best practices used in real-world Java applications"
                },
                {
                    "type": "section",
                    "title": "2. What Does Calling a Method Mean?",
                    "rich": "Calling a method means executing the method’s code so that it performs its defined task. In simple terms: <strong>Calling a method = executing the method</strong>.<br/><br/>Example: <code>add(10,20)</code> executes the method add with values 10 and 20."
                },
                {
                    "type": "section",
                    "title": "3. Method Invocation Syntax",
                    "rich": "Standard syntax: <code>methodName(arguments);</code><br/><br/>Example: <code>add(10, 20);</code> This executes the add method and passes two arguments."
                },
                {
                    "type": "section",
                    "title": "4. Example: Calling a Simple Method",
                    "rich": "A simple call triggers a method that performs a task without needing inputs or returning data."
                },
                {
                    "type": "section",
                    "title": "Simple Method Implementation",
                    "code": "// Definition:\npublic static void greet() {\n    System.out.println(\"Hello Java\");\n}\n\n// Calling:\ngreet();"
                },
                {
                    "type": "section",
                    "title": "5. Calling Methods with Parameters",
                    "rich": "When a method has parameters, values must be passed when calling it. The method runs each time it is called with different inputs."
                },
                {
                    "type": "section",
                    "title": "Parameterized Invocation",
                    "code": "public static void greet(String name) {\n    System.out.println(\"Hello \" + name);\n}\n\n// Execution:\ngreet(\"Alice\");\ngreet(\"Bob\");"
                },
                {
                    "type": "section",
                    "title": "6. Calling Methods that Return Values",
                    "rich": "Some methods return results. The returned value can be stored in a variable."
                },
                {
                    "type": "section",
                    "title": "Result Processing",
                    "code": "public static int add(int a, int b) {\n    return a + b;\n}\n\n// Calling:\nint result = add(10, 20);\nSystem.out.println(result); // Output: 30"
                },
                {
                    "type": "section",
                    "title": "7. Calling Methods Multiple Times",
                    "rich": "Methods can be executed repeatedly to perform the same logic without duplication."
                },
                {
                    "type": "section",
                    "title": "Repeated Execution",
                    "code": "public static void printMessage() {\n    System.out.println(\"Java is powerful\");\n}\n\n// Calling:\nprintMessage();\nprintMessage();\nprintMessage();"
                },
                {
                    "type": "section",
                    "title": "8. Calling Methods Inside main()",
                    "rich": "The <code>main</code> method is the starting point. All custom methods are orchestrated from here."
                },
                {
                    "type": "section",
                    "title": "Main Method Context",
                    "code": "public class Main {\n    public static void sayHello() {\n        System.out.println(\"Hello World\");\n    }\n\n    public static void main(String[] args) {\n        sayHello(); // Start of flow\n    }\n}"
                },
                {
                    "type": "section",
                    "title": "9. Understanding the Call Stack",
                    "rich": "When methods are called, Java uses a call stack to manage execution. Concept: <strong>Last method called -> executed first (LIFO)</strong>."
                },
                {
                    "type": "section",
                    "title": "10. Call Stack Example",
                    "rich": "When <code>methodA()</code> is called from <code>main()</code>, <code>main()</code> is pushed to the stack, followed by <code>methodA()</code>. When <code>methodA()</code> finishes, it is removed."
                },
                {
                    "type": "section",
                    "title": "Stack Trace Visualization",
                    "rich": TABLE(`<thead><tr class="bg-gray-50 border-b"><th class="px-4 py-2 border-r">Step</th><th class="px-4 py-2 border-r">Active Method</th><th class="px-4 py-2">Stack Action</th></tr></thead><tbody>
<tr><td class="px-4 py-2 border-r"><strong>1</strong></td><td class="px-4 py-2 border-r"><code>main()</code></td><td class="px-4 py-2">Pushed to stack base.</td></tr>
<tr><td class="px-4 py-2 border-r"><strong>2</strong></td><td class="px-4 py-2 border-r"><code>methodA()</code></td><td class="px-4 py-2">Pushed to top; main waits.</td></tr>
<tr><td class="px-4 py-2 border-r"><strong>3</strong></td><td class="px-4 py-2 border-r"><code>methodA()</code> finish</td><td class="px-4 py-2">Popped off stack.</td></tr>
<tr><td class="px-4 py-2 border-r"><strong>4</strong></td><td class="px-4 py-2 border-r"><code>main()</code> resume</td><td class="px-4 py-2">Continues next line in main.</td></tr></tbody>`)
                },
                {
                    "type": "section",
                    "title": "11. Nested Method Calls",
                    "rich": "A nested call happens when a method calls another method. Control jumps through the chain until the top-most method completes."
                },
                {
                    "type": "section",
                    "title": "12. Visualizing Nested Calls",
                    "rich": TABLE(`<thead><tr class="bg-gray-50 border-b"><th class="px-4 py-2 border-r">Stack Level</th><th class="px-4 py-2">Current Context</th></tr></thead><tbody>
<tr><td class="px-4 py-2 border-r"><strong>| methodB |</strong></td><td class="px-4 py-2">Executing Logic [Active]</td></tr>
<tr><td class="px-4 py-2 border-r"><strong>| methodA |</strong></td><td class="px-4 py-2">Waiting for methodB [Paused]</td></tr>
<tr><td class="px-4 py-2 border-r"><strong>| main    |</strong></td><td class="px-4 py-2">Waiting for methodA [Paused]</td></tr></tbody>`)
                },
                {
                    "type": "section",
                    "title": "13. Method Calls with Return Values in Nested Calls",
                    "rich": "Results can flow through nested calls. A method can use the result of one call as an argument for another."
                },
                {
                    "type": "section",
                    "title": "Result Chaining Example",
                    "code": "int result = add(5, multiply(2, 3)); \n// Execution order:\n// 1. multiply(2,3) -> returns 6\n// 2. add(5,6) -> returns 11"
                },
                {
                    "type": "section",
                    "title": "14. Static vs Instance Method Calls",
                    "rich": "Static methods use class names (e.g., <code>Math.sqrt(16)</code>). Instance methods require objects (e.g., <code>scanner.nextInt()</code>)."
                },
                {
                    "type": "section",
                    "title": "Call Context Mechanics",
                    "rich": TABLE(`<thead><tr class="bg-gray-50 border-b"><th class="px-4 py-2 border-r">Method Type</th><th class="px-4 py-2">How to Call</th></tr></thead><tbody>
<tr><td class="px-4 py-2 border-r"><strong>Static</strong></td><td class="px-4 py-2"><code>Class.methodName()</code></td></tr>
<tr><td class="px-4 py-2 border-r"><strong>Instance</strong></td><td class="px-4 py-2"><code>object.methodName()</code></td></tr></tbody>`)
                },
                {
                    "type": "section",
                    "title": "15. Common Beginner Mistakes",
                    "rich": "Avoid these common pitfalls during method invocation to avoid compilation or logical errors."
                },
                {
                    "type": "section",
                    "title": "Troubleshooting Calls",
                    "rich": TABLE(`<thead><tr class="bg-gray-50 border-b"><th class="px-4 py-2 border-r">Mistake</th><th class="px-4 py-2">Incorrect</th><th class="px-4 py-2">Correct</th></tr></thead><tbody>
<tr><td class="px-4 py-2 border-r">Missing Parentheses</td><td class="px-4 py-2"><code>add;</code></td><td class="px-4 py-2"><code>add();</code></td></tr>
<tr><td class="px-4 py-2 border-r">Arg Count Mismatch</td><td class="px-4 py-2"><code>add(10)</code></td><td class="px-4 py-2"><code>add(10,20)</code></td></tr>
<tr><td class="px-4 py-2 border-r">Ignoring Return</td><td class="px-4 py-2"><code>add(5,10);</code></td><td class="px-4 py-2"><code>int res = add(5,10);</code></td></tr></tbody>`)
                },
                {
                    "type": "section",
                    "title": "16. Industrial Example",
                    "rich": "Real-world banking applications use nested calls transfer -> validate -> debit -> notify."
                },
                {
                    "type": "section",
                    "title": "Financial Transaction Flow",
                    "code": "public void executeTransfer(double amount) {\n    if (hasBalance(amount)) {\n        debitAccount(amount);\n        generateReceipt();\n    }\n}"
                },
                {
                    "type": "section",
                    "title": "17. Professional Best Practices",
                    "rich": "Keep calls readable by breaking apart complex expressions. Avoid deep nesting (more than 3-4 levels)."
                },
                {
                    "type": "section",
                    "title": "Clean Code Standards",
                    "rich": TABLE(`<thead><tr class="bg-gray-50 border-b"><th class="px-4 py-2 border-r">Principle</th><th class="px-4 py-2">Practical Action</th></tr></thead><tbody>
<tr><td class="px-4 py-2 border-r">Readability</td><td class="px-4 py-2">Use intermediate variables for nested results.</td></tr>
<tr><td class="px-4 py-2 border-r">Shallow Nesting</td><td class="px-4 py-2">Flatten logic to avoid deep call chains.</td></tr>
<tr><td class="px-4 py-2 border-r">Validation</td><td class="px-4 py-2">Always handle returning results immediately.</td></tr></tbody>`)
                },
                {
                    "type": "section",
                    "title": "18. Real-World Use Cases",
                    "rich": "Method calling powers system heartbeats: <code>calculateSalary()</code>, <code>validateUser()</code>, <code>sendEmail()</code>, etc."
                },
                {
                    "type": "section",
                    "title": "19. Key Concepts Summary",
                    "rich": "• Calling executes method code.<br/>• Invocation uses <code>name(args)</code> syntax.<br/>• Java use a LIFO Call Stack.<br/>• Nested calls create temporary dependency chains."
                },
                {
                    "type": "section",
                    "title": "Instructions"
                },
                {
                    "type": "task",
                    "value": "Task: Basic Invocation<br/><br/>Declare a class <code class=\"font-mono\">CallDemo</code>. Create a <code class=\"font-mono\">public static void showMsg</code> method that prints <code class=\"font-mono\">\"System Running\"</code>. Call this method from the <code class=\"font-mono\">main</code> method.",
                    "hints": ["showMsg();"],
                    "points": 10
                },
                {
                    "type": "task",
                    "value": "Task: Nested Interaction<br/><br/>Create a class <code class=\"font-mono\">NestedDemo</code>. Inside a method <code class=\"font-mono\">runner</code>, call another method <code class=\"font-mono\">worker</code> that prints <code class=\"font-mono\">\"Working...\"</code>. Call <code class=\"font-mono\">runner</code> from <code class=\"font-mono\">main</code>.",
                    "hints": ["runner() calls worker()"],
                    "points": 10
                }
            ], 
            validation: [
                { index: 1, match: "System Running", matchCode: "showMsg\\s*\\(" },
                { index: 2, match: "Working...", matchCode: "runner\\s*\\(" }
            ] 
        },
        { 
            title: 'Recursive Methods', 
            duration: '35 min', 
            sections: [
                {
                    "type": "section",
                    "title": "Lesson Description",
                    "rich": "Recursion is a fundamental programming technique where a method calls itself to break down complex problems into simpler, identical sub-problems. In this lesson, we master the logic of base cases, recursive steps, and the underlying Call Stack mechanics."
                },
                {
                    "type": "section",
                    "title": "1. Goals of This Lesson",
                    "rich": "By the end of this lesson, you should understand:<br/>• What recursion is and its importance<br/>• The role of the Base Case and Recursive Case<br/>• How the Call Stack manages recursive calls<br/>• How to prevent Stack Overflow errors<br/>• Real-world applications like Factorial and Fibonacci"
                },
                {
                    "type": "section",
                    "title": "2. What is Recursion?",
                    "rich": "Recursion occurs when a method calls itself. It is best used for problems that have a repetitive, self-similar structure.<br/><br/><strong>Concept:</strong> <code>factorial(5) = 5 * factorial(4)</code>"
                },
                {
                    "type": "section",
                    "title": "3. Why Recursion is Useful",
                    "rich": "Recursion simplifies logic for hierarchical data (like file systems and trees) and complex mathematical patterns that would require messy nested loops if done iteratively."
                },
                {
                    "type": "section",
                    "title": "4. Structure of a Recursive Method",
                    "rich": "Every valid recursive method MUST have two components:<br/>1. <strong>Base Case:</strong> The condition that stops the recursion (the 'exit').<br/>2. <strong>Recursive Case:</strong> The part where the method calls itself with a smaller input."
                },
                {
                    "type": "section",
                    "title": "5. Basic Recursion Example",
                    "rich": "Printing numbers from N down to 1 using recursion."
                },
                {
                    "type": "section",
                    "title": "Countdown Implementation",
                    "code": "public void printNumbers(int n) {\n    if(n == 0) return; // Base Case\n    System.out.println(n);\n    printNumbers(n - 1); // Recursive Call\n}"
                },
                {
                    "type": "section",
                    "title": "6. Understanding the Base Case",
                    "rich": "Without a base case, recursion continues infinitely, consuming memory until the program crashes with a <code>StackOverflowError</code>."
                },
                {
                    "type": "section",
                    "title": "7. Factorial Using Recursion",
                    "rich": "Calculating <code>n!</code> (n factorial) is the classic example of recursion: <code>n! = n * (n-1)!</code>"
                },
                {
                    "type": "section",
                    "title": "Factorial Logic",
                    "code": "public int factorial(int n) {\n    if(n <= 1) return 1; // Base Case\n    return n * factorial(n - 1); // Recursive Step\n}"
                },
                {
                    "type": "section",
                    "title": "8. Detailed Tracing: How Factorial Resolves",
                    "rich": "Let's trace <code>factorial(4)</code> step-by-step as it moves through the stack:<br/><br/>" + 
                          TABLE(`<thead><tr class="bg-gray-50 border-b"><th class="px-4 py-2 border-r">Step</th><th class="px-4 py-2 border-r">Call/Action</th><th class="px-4 py-2">Mental Model</th></tr></thead><tbody>
<tr><td class="px-4 py-2 border-r"><strong>1</strong></td><td class="px-4 py-2 border-r"><code>fact(4)</code></td><td class="px-4 py-2">Needs 4 * <code>fact(3)</code> [Waiting...]</td></tr>
<tr><td class="px-4 py-2 border-r"><strong>2</strong></td><td class="px-4 py-2 border-r"><code>fact(3)</code></td><td class="px-4 py-2">Needs 3 * <code>fact(2)</code> [Waiting...]</td></tr>
<tr><td class="px-4 py-2 border-r"><strong>3</strong></td><td class="px-4 py-2 border-r"><code>fact(2)</code></td><td class="px-4 py-2">Needs 2 * <code>fact(1)</code> [Waiting...]</td></tr>
<tr><td class="px-4 py-2 border-r"><strong>4</strong></td><td class="px-4 py-2 border-r"><code>fact(1)</code></td><td class="px-4 py-2"><strong>Base Case reached!</strong> Returns 1.</td></tr>
<tr><td class="px-4 py-2 border-r"><strong>5</strong></td><td class="px-4 py-2 border-r">Resolving...</td><td class="px-4 py-2">fact(2) gets 1, returns 2 * 1 = 2.</td></tr>
<tr><td class="px-4 py-2 border-r"><strong>6</strong></td><td class="px-4 py-2 border-r">Resolving...</td><td class="px-4 py-2">fact(3) gets 2, returns 3 * 2 = 6.</td></tr>
<tr><td class="px-4 py-2 border-r"><strong>7</strong></td><td class="px-4 py-2 border-r">Final Result</td><td class="px-4 py-2">fact(4) gets 6, returns 4 * 6 = 24.</td></tr></tbody>`)
                },
                {
                    "type": "section",
                    "title": "9. Visualizing Recursive Branching",
                    "rich": "Complex recursion like Fibonacci creates a <strong>Recursion Tree</strong>, where one call branches into multiple sub-calls.<br/><br/>![Recursion Tree](/images/java_recursion_tree_1773475396644.png)"
                },
                {
                    "type": "section",
                    "title": "10. Recursive Fibonacci Example",
                    "rich": "Generating the Fibonacci sequence (0, 1, 1, 2, 3, 5, 8...) by summing the previous two numbers."
                },
                {
                    "type": "section",
                    "title": "Fibonacci Implementation",
                    "code": "public int fibonacci(int n) {\n    if(n <= 1) return n; // Base case for 0 and 1\n    return fibonacci(n-1) + fibonacci(n-2);\n}"
                },
                {
                    "type": "section",
                    "title": "11. Tracing Fibonacci Branching",
                    "rich": "Tracing <code>fibonacci(4)</code> shows how the tree grows:<br/><br/>" + 
                          TABLE(`<thead><tr class="bg-gray-50 border-b"><th class="px-4 py-2 border-r">Call</th><th class="px-4 py-2">Sub-Calls Formed</th></tr></thead><tbody>
<tr><td class="px-4 py-2 border-r"><code>fib(4)</code></td><td class="px-4 py-2"><code>fib(3) + fib(2)</code></td></tr>
<tr><td class="px-4 py-2 border-r"><code>fib(3)</code></td><td class="px-4 py-2"><code>fib(2) + fib(1)</code></td></tr>
<tr><td class="px-4 py-2 border-r"><code>fib(2)</code></td><td class="px-4 py-2"><code>fib(1) + fib(0)</code> [Base Cases]</td></tr></tbody>`) + 
                          "<br/>Notice how <code>fib(2)</code> is calculated twice. This is why branching recursion can be slower for large inputs."
                },
                {
                    "type": "section",
                    "title": "12. Recursion with Arrays",
                    "rich": "Recursion can also process arrays by reducing the 'problem size' (the index) on each call."
                },
                {
                    "type": "section",
                    "title": "Sum Array Elements",
                    "code": "public int sumArray(int[] arr, int n) {\n    if(n <= 0) return 0;\n    return arr[n-1] + sumArray(arr, n-1);\n}"
                },
                {
                    "type": "section",
                    "title": "13. Recursion vs Iteration",
                    "rich": TABLE(`<thead><tr class="bg-gray-50 border-b"><th class="px-4 py-2 border-r">Feature</th><th class="px-4 py-2 border-r">Recursion</th><th class="px-4 py-2">Iteration (Loop)</th></tr></thead><tbody>
<tr><td class="px-4 py-2 border-r"><strong>Logic</strong></td><td class="px-4 py-2 border-r">Elegant, cleaner for Trees.</td><td class="px-4 py-2">More complex for Trees.</td></tr>
<tr><td class="px-4 py-2 border-r"><strong>Performance</strong></td><td class="px-4 py-2 border-r">Heavier (Stack overheard).</td><td class="px-4 py-2">Faster (Low overhead).</td></tr>
<tr><td class="px-4 py-2 border-r"><strong>Memory</strong></td><td class="px-4 py-2 border-r">Uses Stack memory.</td><td class="px-4 py-2">Minimal memory usage.</td></tr></tbody>`)
                },
                {
                    "type": "section",
                    "title": "14. Stack Overflow Problem",
                    "rich": "If recursion goes too deep without hitting a base case, Java throws a <code>StackOverflowError</code> because it runs out of memory reserved for the Call Stack."
                },
                {
                    "type": "section",
                    "title": "15. Preventing Stack Overflow",
                    "rich": "Always ensure: <br/>1. A valid base case exists. <br/>2. Every recursive call moves the input <strong>closer</strong> to that base case."
                },
                {
                    "type": "section",
                    "title": "16. Tail Recursion (Advanced)",
                    "rich": "Tail recursion occurs when the recursive call is the <strong>very last action</strong> in the method. Some languages (though not yet standard Java compilers) can optimize this to use zero extra stack space."
                },
                {
                    "type": "section",
                    "title": "17. Real-World Applications",
                    "rich": "Recursion is the engine behind: <br/>• <strong>File Exploration:</strong> Navigating nested folders. <br/>• <strong>Sorting:</strong> QuickSort and MergeSort algorithms. <br/>• <strong>Searching:</strong> Binary Search on complex data."
                },
                {
                    "type": "section",
                    "title": "18. Common Beginner Mistakes",
                    "rich": TABLE(`<thead><tr class="bg-gray-50 border-b"><th class="px-4 py-2 border-r">Mistake</th><th class="px-4 py-2 border-r">Likely Result</th><th class="px-4 py-2">Prevention</th></tr></thead><tbody>
<tr><td class="px-4 py-2 border-r">No Base Case</td><td class="px-4 py-2 border-r">StackOverflowError</td><td class="px-4 py-2">Check for exit condition first.</td></tr>
<tr><td class="px-4 py-2 border-r">Wrong Condition</td><td class="px-4 py-2 border-r">Incorrect Result</td><td class="px-4 py-2">Trace with 'factorial(1)'.</td></tr>
<tr><td class="px-4 py-2 border-r">No Input Change</td><td class="px-4 py-2 border-r">Infinite Loop</td><td class="px-4 py-2">Ensure input reduces (e.g., n-1).</td></tr></tbody>`)
                },
                {
                    "type": "section",
                    "title": "19. Best Practices for Recursion",
                    "rich": "• Prefer iteration for simple counting tasks.<br/>• Use recursion for hierarchical data (JSON, Trees).<br/>• Always document the Base Case explicitly."
                },
                {
                    "type": "section",
                    "title": "20. Key Concepts Summary",
                    "rich": "• Recursion is a method calling itself.<br/>• Base cases prevent memory crashes.<br/>• The Call Stack manages the execution chain.<br/>• Tail recursion is the most efficient form."
                },
                {
                    "type": "section",
                    "title": "Instructions"
                },
                {
                    "type": "task",
                    "value": "Task: Recursive Factorial<br/><br/>Declare a class <code class=\"font-mono\">MathTool</code> with a <code class=\"font-mono\">public int fact(int n)</code> method. Use recursion to calculate factorial. <strong>Base case:</strong> If n <= 1, return 1.",
                    "hints": ["return n * fact(n - 1);"],
                    "points": 10
                },
                {
                    "type": "task",
                    "value": "Task: Base Case Implementation<br/><br/>Create a class <code class=\"font-mono\">Counter</code> with a recursive method <code class=\"font-mono\">countDown(int n)</code>. If n is 0, print <code class=\"font-mono\">\"Launch!\"</code> and return. Otherwise, print n and call <code class=\"font-mono\">countDown(n-1)</code>.",
                    "hints": ["if (n == 0)"],
                    "points": 10
                }
            ], 
            validation: [
                { index: 1, match: "fact", matchCode: "n\\s*\\*\\s*fact\\s*\\(" },
                { index: 2, match: "Launch!", matchCode: "countDown\\s*\\(" }
            ] 
        },
    ],
}).catch(console.error);
