/**
 * Module 4 — Conditional Statements
 * node scripts/seed/m04_conditional_statements.js
 */
const { seedModule, TABLE } = require('./_helpers');

const T_LOGIC = TABLE(`<thead><tr class="bg-gray-50 border-b"><th class="px-4 py-2 border-r">Operator</th><th class="px-4 py-2 border-r">Symbol</th><th class="px-4 py-2">Meaning</th></tr></thead>
<tbody><tr><td class="px-4 py-2 border-r font-mono">Equality</td><td class="px-4 py-2 border-r font-mono">==</td><td class="px-4 py-2">Checks if two values are identical.</td></tr>
<tr><td class="px-4 py-2 border-r font-mono">Inequality</td><td class="px-4 py-2 border-r font-mono">!=</td><td class="px-4 py-2">Checks if two values are different.</td></tr>
<tr><td class="px-4 py-2 border-r font-mono">Logical AND</td><td class="px-4 py-2 border-r font-mono">&&</td><td class="px-4 py-2">True only if both sides are true.</td></tr>
<tr><td class="px-4 py-2 border-r font-mono">Logical OR</td><td class="px-4 py-2 border-r font-mono">||</td><td class="px-4 py-2">True if at least one side is true.</td></tr></tbody>`);

seedModule({
    moduleTitle: 'Conditional Statements',
    moduleOrder: 4,
    description: 'Master the architectural decision-making processes in Java, from basic if-else structures to advanced pattern matching and switch expressions.',
    label: 'CONDITIONALS',
    lessons: [
        {
            "title": "Introduction to Control Flow",
            "duration": "45 min",
            "sections": [
                {
                    "type": "section",
                    "title": "The Logic of Decision Making",
                    "rich": "In the world of professional software engineering, code is rarely a straight line. Every application—from a simple calculator to a global banking system—must make decisions. <strong>Control Flow</strong> is the architectural term for how a program chooses which path to take. Without it, your code would blindly execute every instruction in sequence. With it, your code becomes intelligent, responding dynamically to user input, network states, and internal variables."
                },
                {
                    "type": "section",
                    "title": "Core Logic Example",
                    "code": "if (userStatus.equals(\"ACTIVE\")) {\n    sendVerificationEmail();\n    updateRegistry();\n}"
                },
                {
                    "type": "section",
                    "title": "Visual Representation",
                    "rich": "<div class=\"my-4 text-center\"><img src=\"/public/images/conditional_intro_white.png\" alt=\"Control Flow Intro\" style=\"max-width: 65%; margin: 0 auto;\" class=\"rounded-lg shadow-sm border border-gray-100\" /></div>"
                },
                {
                    "type": "section",
                    "title": "The Three Pillars of Flow",
                    "rich": "Java programs generally utilize three types of flow control:<br/>1. <strong>Selection:</strong> Choosing between different code blocks (if, switch).<br/>2. <strong>Iteration:</strong> Repeating blocks of code (loops).<br/>3. <strong>Jump:</strong> Moving execution to a specific label or returning from a method (break, continue, return)."
                },
                {
                    "type": "section",
                    "title": "Module Curriculum & Roadmap",
                    "rich": "In this module, we will journey from basic binary logic to modern Java 14+ switch expressions and high-performance industry patterns. Below is your roadmap for mastery:"
                },
                {
                    "type": "section",
                    "title": "Basic If Statements",
                    "rich": "The <code>if</code> statement is the absolute foundation of logic. It represents the most basic form of choosing whether to execute code based on a single condition. In industrial application, early validation and status checks are almost exclusively handled by these single-branch structures. Mastering 'if' logic is the first step toward building software that can actually think independently.<br/><br/><strong>Five Key Points:</strong><br/>1. Acts like a gatekeeper that only opens when a condition is true.<br/>2. Requires a clear 'Yes' or 'No' (boolean) question to work.<br/>3. Variables created inside the if-block are only available there.<br/>4. You can use braces {} to group multiple lines of code together.<br/>5. It is the most common way to handle security and error checks."
                },
                {
                    "type": "section",
                    "title": "Code Preview: If Statement",
                    "code": "if (score > 90) {\n    System.out.println(\"A+ Distinction\");\n}"
                },
                {
                    "type": "section",
                    "title": "If-Else Selection",
                    "rich": "When decisions are binary—meaning there are two mutually exclusive outcomes—the <code>if-else</code> structure is the architectural standard. It guarantees that the program will never enter a 'no-man\'s-land' of execution. By providing a clear fallback (the else block), you ensure that your application has a deterministic response for every possible state of a variable. <br/><br/><strong>Five Key Points:</strong><br/>1. Provides two clear paths for your code to follow.<br/>2. The 'else' part handles everything that doesn't fit the 'if' part.<br/>3. Guarantees that exactly one block of code will run.<br/>4. Perfect for simple 'Yes or No' decisions in software.<br/>5. Helps prevent errors by providing a default response."
                },
                {
                    "type": "section",
                    "title": "Code Preview: If-Else",
                    "code": "if (isLoggedIn) {\n    showDashboard();\n} else {\n    showLoginPage();\n}"
                },
                {
                    "type": "section",
                    "title": "Else-If Ladders",
                    "rich": "Real-world logic is often hierarchical or range-bound. When you have three or more distinct paths, the <code>else-if</code> ladder provides a prioritized way to check conditions in order. This 'Decision Ladder' ensures that the program identifies the most specific condition first, which is vital for applications like grading systems, tax calculators, and priority-based task dispatchers.<br/><br/><strong>Five Key Points:</strong><br/>1. Allows you to check many different conditions in one go.<br/>2. The program checks from top to bottom and stops at the first match.<br/>3. Only the first matching block runs; the rest are ignored.<br/>4. Excellent for creating ranges (like grades from A to F).<br/>5. Always ends with an 'else' to catch any remaining cases."
                },
                {
                    "type": "section",
                    "title": "Code Preview: Else-If Ladder",
                    "code": "if (speed > 100) {\n    applyFullBrake();\n} else if (speed > 60) {\n    applyLightBrake();\n} else {\n    maintainSpeed();\n}"
                },
                {
                    "type": "section",
                    "title": "Switch Statements",
                    "rich": "The <code>switch</code> statement is a specialized routing mechanism designed for high-performance equality matching. Instead of checking a long list of conditions one-by-one, a switch uses a jump-table logic that can route execution to the correct branch with near-instant speed. It is the gold standard for state-machine architectures and menu-selection logic where performance is critical.<br/><br/><strong>Five Key Points:</strong><br/>1. Directly jumps to the matching case instead of checking one by one.<br/>2. Best used when you have many fixed choices (like colors or menu items).<br/>3. Requires 'break' to stop the code from falling into the next case.<br/>4. Includes a 'default' case for when no match is found.<br/>5. Improves code readability when dealing with many constants."
                },
                {
                    "type": "section",
                    "title": "Code Preview: Traditional Switch",
                    "code": "switch(level) {\n    case 1: \n        startStage(); \n        break;\n    case 2: \n        unlockBonus(); \n        break;\n    default: \n        waitForInput();\n}"
                },
                {
                    "type": "section",
                    "title": "Switch Expressions (Java 14+)",
                    "rich": "Modern Java development has evolved the traditional switch into a powerful, value-returning <code>expression</code>. This modern construct eliminates decades of common 'fall-through' bugs by using arrow syntax. It treats logic as a function that returns a result, making your code significantly more concise, safer, and easier to test in mission-critical environments.<br/><br/><strong>Five Key Points:</strong><br/>1. Can return a value directly to a variable for cleaner code.<br/>2. Uses the arrow (->) syntax to make it easier to read.<br/>3. No more 'break' statements needed; it stops automatically.<br/>4. You can easily group multiple cases together with commas.<br/>5. It is much safer because the compiler ensures all cases are handled."
                },
                {
                    "type": "section",
                    "title": "Code Preview: Modern Switch Expression",
                    "code": "var type = switch(id) {\n    case 1, 2 -> \"Administrator\";\n    case 3    -> \"Moderator\";\n    default   -> \"Standard User\";\n};"
                },
                {
                    "type": "section",
                    "title": "Ternary Inline Operators",
                    "rich": "Professional Java code often favors density and readability for simple binary choices. The <code>ternary operator</code> is the 'Inline Architect's' tool of choice. It allows you to perform a decision and an assignment in one single line. This reduces visual clutter and is the standard for setting default values, dynamic UI labels, and simple conditional initializations.<br/><br/><strong>Five Key Points:</strong><br/>1. A shorthand way to write an if-else statement in one line.<br/>2. Uses '?' for the question and ':' for the choices.<br/>3. Great for initializing variables based on a condition.<br/>4. Makes code much shorter and more elegant for simple decisions.<br/>5. Always returns a result that must be used or assigned."
                },
                {
                    "type": "section",
                    "title": "Code Preview: Ternary Operator",
                    "code": "String message = (count > 0) ? (count + \" Items Found\") : \"No Items\";"
                },
                {
                    "type": "section",
                    "title": "Nested Conditionals",
                    "rich": "Complex systems often require multi-layered validation where one decision depends entirely on a previous one. <code>Nested Conditionals</code> allow you to build deep decision trees that handle hierarchical requirements—like checking if a user is logged in, then checking if they have permissions, then finally checking if they have sufficient balance for a transaction.<br/><br/><strong>Five Key Points:</strong><br/>1. Allows you to put an if-block inside another if-block.<br/>2. Used for step-by-step decisions that depend on each other.<br/>3. The inner block only runs if the outer block is already true.<br/>4. Helps in organizing complex multi-step validation processes.<br/>5. Requires careful indentation so the code stays easy to follow."
                },
                {
                    "type": "section",
                    "title": "Code Preview: Nested Logic",
                    "code": "if (isAccountActive) {\n    if (hasSufficientBalance) {\n        processWithdrawal();\n    } else {\n        showBalanceError();\n    }\n}"
                },
                {
                    "type": "section",
                    "title": "Advanced Mastery Patterns",
                    "rich": "The pinnacle of Java control flow mastery involves using modern patterns that combine safety with elegance. From <code>Pattern Matching</code> that prevents type-casting errors to <code>Guard Clauses</code> that keep your methods flat and readable, these advanced patterns are what distinguish senior engineers. They focus on preventing errors (like NullPointerExceptions) before they can even manifest.<br/><br/><strong>Five Key Points:</strong><br/>1. Modern features like 'Pattern Matching' check types and create variables at once.<br/>2. 'Guard Clauses' help exit methods early to keep the code neat.<br/>3. Logical short-circuiting skips extra work if the result is already known.<br/>4. These patterns make your code much harder to break and easier to maintain.<br/>5. Mastering these is the hallmark of a professional Java developer."
                },
                {
                    "type": "section",
                    "title": "Code Preview: Pattern Matching & Guards",
                    "code": "if (obj instanceof Customer c && c.isValid()) {\n    c.applyDiscount();\n}"
                },
                {
                    "type": "section",
                    "title": "Technical Mastery Points",
                    "list": [
                        "<strong>Boolean Foundations:</strong> Every selection decision in Java is ultimately powered by a <code>boolean</code> expression resolving to true or false.",
                        "<strong>JVM Execution:</strong> The JVM uses 'Program Counter' (PC) registers to keep track of which branch is currently executing.",
                        "<strong>Logical Short-Circuiting:</strong> Operators like <code>&&</code> and <code>||</code> skip unnecessary evaluations to save CPU cycles.",
                        "<strong>State Preservation:</strong> Control flow doesn't change the values of variables unless you explicitly assign them within the branch.",
                        "<strong>Execution Pipeline:</strong> Modern CPUs use 'Branch Prediction' to guess which path your code will take to speed up execution."
                    ]
                },
                {
                    "type": "section",
                    "title": "Expanded Practice Examples",
                    "rich": "Below are categorized code patterns demonstrating core conditional concepts used in industry."
                },
                {
                    "type": "section",
                    "title": "Basic: Boolean Selection",
                    "code": "boolean isRich = true;\nif (isRich) {\n    System.out.println(\"Invest in Assets!\");\n}"
                },
                {
                    "type": "section",
                    "title": "Intermediate: Logic Compound",
                    "code": "int score = 85;\nif (score > 80 && score <= 100) {\n    System.out.println(\"Distinction achieved.\");\n}"
                },
                {
                    "type": "section",
                    "title": "Advanced: Dynamic Inline Guard",
                    "code": "String status = (user != null && user.isActive()) ? \"User Online\" : \"User Offline\";\nSystem.out.println(status);"
                },
                {
                    "type": "section",
                    "title": "Instructions"
                },
                {
                    "type": "task",
                    "value": "<strong>Task: Variable Decision</strong><br/><br/><strong>Question:</strong><br/>Declare an <code class=\"font-mono\">int age = 20</code> and use an <code class=\"font-mono\">if</code> statement to print <code class=\"font-mono\">Adult</code> if the age is 18 or older.",
                    "hints": [
                        "int age = 20; if (age >= 18) { System.out.println(\"Adult\"); }"
                    ],
                    "points": 10
                }
            ],
            "validation": [
                {
                    "index": 1,
                    "match": "Adult",
                    "matchCode": "if"
                }
            ]
        },
        {
            "title": "If Statements",
            "duration": "40 min",
            "sections": [
                {
                    "type": "section",
                    "title": "The Single Switch",
                    "rich": "The <code class=\"font-mono\">if</code> statement is the most fundamental building block of logic in Java. It acts as a gatekeeper: if the condition inside the parentheses is <strong>true</strong>, the gate opens and the code inside the curly braces executes. If it's false, the JVM completely ignores that block and moves to the next part of the program. It is the core of all algorithmic thinking, allowing programs to react to data rather than just following a fixed script."
                },
                {
                    "type": "section",
                    "title": "Flowchart of Logic",
                    "rich": "<div class=\"my-4 text-center\"><img src=\"/public/images/conditional_if_flowchart_white.png\" alt=\"If Flowchart\" style=\"max-width: 65%; margin: 0 auto;\" class=\"rounded-lg shadow-sm border border-gray-100\" /></div>"
                },
                {
                    "type": "section",
                    "title": "The Boolean Contract",
                    "rich": "In Java, unlike some other languages like C++ or Python, the condition in an <code class=\"font-mono\">if</code> statement <strong>MUST</strong> resolve to a strict <code>boolean</code>. You cannot use integers (where 0 is false and 1 is true) or null pointers as truthy values. This design choice prevents thousands of common bugs found in older languages by enforcing type safety at the logic level. Every decision starts with a question that must have a clear 'Yes' or 'No' answer."
                },
                {
                    "type": "section",
                    "title": "Technical Mastery Points",
                    "list": [
                        "<strong>Strict Typing:</strong> Conditions must be boolean; <code>if(1)</code> or <code>if(null)</code> will fail to compile in Java.",
                        "<strong>Optional Braces Warning:</strong> While single-line <code>if</code> statements don't require <code>{}</code>, professional standards always use them to avoid 'Dangling Else' and logic bugs.",
                        "<strong>Scope Isolation:</strong> Variables declared inside the <code>if</code> block are local to that block and cannot be accessed outside (Block Scope).",
                        "<strong>Comparison vs Assignment:</strong> Never confuse <code>=</code> (set) with <code>==</code> (match) inside your logic; Java's compiler usually catches this for you.",
                        "<strong>JIT Optimization:</strong> Simple <code>if</code> checks are heavily optimized by the JVM's Just-In-Time compiler using techniques like branch prediction."
                    ]
                },
                {
                    "type": "section",
                    "title": "From Scratch to Advanced: Strategic Use Cases",
                    "rich": "Understanding 'if' logic starts with simple binary checks but evolves into complex architectural patterns. In senior-level engineering, we use 'Guard Clauses' to eliminate deep nesting. By checking for invalid conditions at the very start of a method and returning early, we keep the main logic 'flat' and readable. This transition from 'if-wrapped' logic to 'guard-protected' logic is a hallmark of professional development."
                },
                {
                    "type": "section",
                    "title": "Five Practical Implementation Examples",
                    "rich": "Below are five distinct patterns used in industrial Java applications, ranging from simple validation to advanced security guards."
                },
                {
                    "type": "section",
                    "title": "1. Basic Validation",
                    "code": "int age = 19;\nif (age >= 18) {\n    System.out.println(\"Access Granted: User is an adult.\");\n}",
                    "rich": "<strong>How it works:</strong> The program checks if <code>age</code> is 18 or older. Since 19 is greater than 18, the condition is true and the message prints. If age was 17, the block would be skipped entirely."
                },
                {
                    "type": "section",
                    "title": "2. Security Guard Pattern",
                    "code": "if (!isAuthorized) {\n    System.out.println(\"Security Alert: Unauthorized access attempt!\");\n    return; // Exit early to protect sensitive logic below\n}",
                    "rich": "<strong>How it works:</strong> This uses the 'Logical NOT' (<code>!</code>). If <code>isAuthorized</code> is false, the condition becomes true. The <code>return</code> keyword is a powerful professional tool that stops the entire method immediately, preventing unauthorized users from reaching the code below."
                },
                {
                    "type": "section",
                    "title": "3. Compound Logic Check",
                    "code": "boolean isServerUp = true;\nboolean hasConnection = true;\nif (isServerUp && hasConnection) {\n    System.out.println(\"System Status: Online and Ready.\");\n}",
                    "rich": "<strong>How it works:</strong> The <code>&&</code> (AND) operator requires <strong>both</strong> sides to be true. If the server is up but there is no connection, the condition fails and nothing is printed. This ensures multiple requirements are met before acting."
                },
                {
                    "type": "section",
                    "title": "4. Content Existence Guard",
                    "code": "String username = \"Alex\";\nif (username != null && !username.isEmpty()) {\n    System.out.println(\"Welcome back, \" + username);\n}",
                    "rich": "<strong>How it works:</strong> This is a 'Safety First' check. It first ensures the variable exists (<code>!= null</code>) and then checks that it isn't empty. This order is critical: checking <code>isEmpty()</code> on a null value would crash the program."
                },
                {
                    "type": "section",
                    "title": "5. Range-Bound Logic",
                    "code": "int batteryLevel = 15;\nif (batteryLevel < 20) {\n    System.out.println(\"Warning: Low battery! Enable power saving mode.\");\n}",
                    "rich": "<strong>How it works:</strong> The program monitors a numeric range. The condition <code>batteryLevel < 20</code> is only true when the number is 19 or lower, triggering a specific response when a threshold is crossed."
                },
                {
                    "type": "section",
                    "title": "Instructions"
                },
                {
                    "type": "task",
                    "value": "<strong>Task: Positive Check</strong><br/><br/><strong>Question:</strong><br/>Declare <code class=\"font-mono\">int num = 10</code>. Write an <code class=\"font-mono\">if</code> statement that prints <code class=\"font-mono\">Positive</code> if the number is greater than 0.",
                    "hints": [],
                    "points": 10
                },
                {
                    "type": "task",
                    "value": "<strong>Task: Voting Eligibility</strong><br/><br/><strong>Question:</strong><br/>Declare <code class=\"font-mono\">int age = 20</code>. Write an <code class=\"font-mono\">if</code> statement that prints <code class=\"font-mono\">Eligible to Vote</code> if the age is 18 or older.",
                    "hints": [],
                    "points": 10
                },
                {
                    "type": "task",
                    "value": "<strong>Task: Even Finder</strong><br/><br/><strong>Question:</strong><br/>Declare <code class=\"font-mono\">int n = 8</code>. Write an <code class=\"font-mono\">if</code> statement that prints <code class=\"font-mono\">Even Number</code> if the number is divisible by 2.",
                    "hints": [
                        "A number is even if (n % 2 == 0)."
                    ],
                    "points": 10
                },
                {
                    "type": "task",
                    "value": "<strong>Task: Passing Grade</strong><br/><br/><strong>Question:</strong><br/>Declare <code class=\"font-mono\">int score = 75</code>. Write an <code class=\"font-mono\">if</code> statement that prints <code class=\"font-mono\">Passed</code> if the score is 50 or higher.",
                    "hints": [
                        "Syntax: if (score >= 50) { ... }"
                    ],
                    "points": 10
                }
            ],
            "validation": [
                {
                    "index": 1,
                    "match": "Positive",
                    "matchCode": "if"
                },
                {
                    "index": 2,
                    "match": "Eligible to Vote",
                    "matchCode": "if"
                },
                {
                    "index": 3,
                    "match": "Even Number",
                    "matchCode": "if"
                },
                {
                    "index": 4,
                    "match": "Passed",
                    "matchCode": "if"
                }
            ]
        },
        {
            "title": "If-Else Statements",
            "duration": "40 min",
            "sections": [
                {
                    "type": "section",
                    "title": "The Binary Choice",
                    "rich": "The <code class=\"font-mono\">if-else</code> statement is more than just a gate—it's a crossroads. It represents the concept of <strong>Mutually Exclusive Paths</strong>. In professional code, you often have a default action that must happen if the primary condition fails. Instead of writing two separate 'if' statements (which is inefficient and prone to errors), you use 'else' to handle the 'otherwise' scenario, ensuring your program always has a clear direction to follow."
                },
                {
                    "type": "section",
                    "title": "Crossroad Flow",
                    "rich": "<div class=\"my-4 text-center\"><img src=\"/public/images/conditional_if_else_flowchart_white.png\" alt=\"If-Else Flow\" style=\"max-width: 65%; margin: 0 auto;\" class=\"rounded-lg shadow-sm border border-gray-100\" /></div>"
                },
                {
                    "type": "section",
                    "title": "Guaranteed Execution",
                    "rich": "The defining characteristic of an <code class=\"font-mono\">if-else</code> is that <strong>exactly one</strong> of the two blocks will execute. It is mathematically impossible for both to run, and impossible for neither to run (assuming the program continues normally). This certainty makes it the backbone of deterministic programming logic, ensuring that your application never enters an 'undefined' state."
                },
                {
                    "type": "section",
                    "title": "Technical Best Practices",
                    "list": [
                        "<strong>Branch Prediction:</strong> CPUs predict which branch is more likely to be taken; placing the more frequent condition in the <code>if</code> can slightly improve performance.",
                        "<strong>Logical Inverse:</strong> Ensure your <code>else</code> logic truly represents the mathematical and logical 'opposite' of your <code>if</code> check.",
                        "<strong>Scope Lifetime:</strong> Variables declared in the <code>if</code> block are invisible to the <code>else</code> block, and vice-versa.",
                        "<strong>Clean Fallbacks:</strong> Use the <code>else</code> block for 'safe defaults' like default settings, log messages, or error handling UI.",
                        "<strong>Avoid Deep Nesting:</strong> If your <code>if-else</code> levels go beyond 3, consider refactoring into a <code>switch</code> or smaller helper methods."
                    ]
                },
                {
                    "type": "section",
                    "title": "Five Practical Implementation Examples",
                    "rich": "Below are five common patterns where if-else logic provides the essential foundation for robust Java applications."
                },
                {
                    "type": "section",
                    "title": "1. Simple Pass/Fail",
                    "code": "int gradient = 65;\nif (gradient >= 50) {\n    System.out.println(\"Result: Pass\");\n} else {\n    System.out.println(\"Result: Fail\");\n}",
                    "rich": "<strong>How it works:</strong> There is no 'middle ground' here. If <code>gradient</code> is 50 or above, the first block runs. For <strong>any</strong> other value (49, 0, -10), the <code>else</code> block automatically takes over."
                },
                {
                    "type": "section",
                    "title": "2. Modern Authentication Toggle",
                    "code": "boolean isLoggedIn = checkToken();\nif (isLoggedIn) {\n    loadUserProfile();\n} else {\n    redirectToLogin();\n}",
                    "rich": "<strong>How it works:</strong> This pattern manages user flow. If the login check is true, the user sees their profile. If false, they are forced to the login page. It ensures the user is never left in an 'unauthenticated' state."
                },
                {
                    "type": "section",
                    "title": "3. Pricing & Discounts",
                    "code": "double price = 100.0;\nif (isVIP) {\n    price *= 0.8; // 20% Discount\n} else {\n    price *= 0.95; // 5% Standard Discount\n}",
                    "rich": "<strong>How it works:</strong> Both paths update the same <code>price</code> variable but with different math. A VIP gets a larger reduction (20%), while everyone else gets a standard 5% off. Exactly one calculation will apply."
                },
                {
                    "type": "section",
                    "title": "4. Resource Availability",
                    "code": "if (cache.contains(key)) {\n    data = cache.get(key);\n} else {\n    data = database.fetch(key);\n    cache.put(key, data);\n}",
                    "rich": "<strong>How it works:</strong> This is a professional optimization pattern. It checks if data is already in fast memory (cache). If missing (<code>else</code>), it takes the slower path of fetching from the database and then 'primes' the cache for next time."
                },
                {
                    "type": "section",
                    "title": "5. UI State Control",
                    "code": "if (isLoading) {\n    showSpinner();\n} else {\n    hideSpinner();\n    renderGrid();\n}",
                    "rich": "<strong>How it works:</strong> This controls what the user sees. While <code>isLoading</code> is true, a spinner is visible. The moment it becomes false, the <code>else</code> block hides that spinner and renders the actual data layout."
                },
                {
                    "type": "section",
                    "title": "Instructions"
                },
                {
                    "type": "task",
                    "value": "<strong>Task: Positive-Negative Checker</strong><br/><br/><strong>Question:</strong><br/>Declare <code class=\"font-mono\">int val = -5</code>. Use an <code class=\"font-mono\">if-else</code> to print <code class=\"font-mono\">Positive</code> if val is >= 0, otherwise print <code class=\"font-mono\">Negative</code>.",
                    "hints": [],
                    "points": 10
                },
                {
                    "type": "task",
                    "value": "<strong>Task: Adult Check</strong><br/><br/><strong>Question:</strong><br/>Declare <code class=\"font-mono\">int age = 16</code>. Use an <code class=\"font-mono\">if-else</code> to print <code class=\"font-mono\">Adult</code> if age is 18 or older, otherwise print <code class=\"font-mono\">Minor</code>.",
                    "hints": [],
                    "points": 10
                },
                {
                    "type": "task",
                    "value": "<strong>Task: Parity Checker</strong><br/><br/><strong>Question:</strong><br/>Declare <code class=\"font-mono\">int n = 7</code>. Use an <code class=\"font-mono\">if-else</code> to print <code class=\"font-mono\">Even</code> if n is divisible by 2, otherwise print <code class=\"font-mono\">Odd</code>.",
                    "hints": [
                        "Use the modulo operator: if (n % 2 == 0) { ... }"
                    ],
                    "points": 10
                },
                {
                    "type": "task",
                    "value": "<strong>Task: Pass/Fail</strong><br/><br/><strong>Question:</strong><br/>Declare <code class=\"font-mono\">int score = 45</code>. Use an <code class=\"font-mono\">if-else</code> to print <code class=\"font-mono\">Pass</code> if score is 50 or higher, otherwise print <code class=\"font-mono\">Fail</code>.",
                    "hints": [
                        "Compare the score: if (score >= 50) { ... }"
                    ],
                    "points": 10
                }
            ],
            "validation": [
                {
                    "index": 1,
                    "match": "Negative",
                    "matchCode": "else"
                },
                {
                    "index": 2,
                    "match": "Minor",
                    "matchCode": "else"
                },
                {
                    "index": 3,
                    "match": "Odd",
                    "matchCode": "else"
                },
                {
                    "index": 4,
                    "match": "Fail",
                    "matchCode": "else"
                }
            ]
        },
        {
            "title": "Else-If and Chained Conditions",
            "duration": "45 min",
            "sections": [
                {
                    "type": "section",
                    "title": "Lesson Description",
                    "rich": "The <code class=\"font-mono\">else if</code> ladder is used when you have more than two possible paths for your program. It allows you to check multiple conditions one after another until a match is found. This 'priority-based' logic is essential for complex decision-making like grading systems, menu selections, or user permission levels."
                },
                {
                    "type": "section",
                    "title": "Key Highlights",
                    "list": [
                        "<strong>Sequential Check:</strong> The JVM evaluates conditions from top to bottom in a strict order.",
                        "<strong>One-Match Rule:</strong> Only the first true block executes; once a match is found, all other branches are skipped.",
                        "<strong>Logical Priority:</strong> This structure ensures that specific conditions are handled before general ones.",
                        "<strong>Safety Default:</strong> The final <code>else</code> acts as a 'Catch-All' for any values that didn't match the specific conditions above."
                    ]
                },
                {
                    "type": "section",
                    "title": "The Decision Ladder",
                    "rich": "Life isn't always binary. The <code class=\"font-mono\">else if</code> chain allows you to stack multiple conditions in a specific priority order. It is a <strong>Decision Ladder</strong>: the JVM starts at the top and stops the <strong>very moment</strong> it finds a match. This ensures that only the most relevant piece of code runs, saving processing power and preventing logical overlaps."
                },
                {
                    "type": "section",
                    "title": "Ladder Visualization",
                    "rich": "<div class=\"my-8 text-center\">\n    <img src=\"/public/images/conditional_else_if_ladder_white.png\" alt=\"Else-If Ladder Overview\" style=\"max-width: 65%; margin: 0 auto;\" class=\"rounded-lg shadow-sm border border-gray-100\" />\n  </div>"
                },
                {
                    "type": "section",
                    "title": "Sequential Prioritization",
                    "rich": "<div class=\"my-6\">\n  <div class=\"mb-6 p-5 bg-white border border-gray-100 shadow-sm rounded-xl\">\n    <h4 class=\"text-orange-600 font-bold mb-3 flex items-center\">\n      <span class=\"mr-2 underline underline-offset-4 decoration-2\">Logic Challenge: The Security Gate</span>\n    </h4>\n    <p class=\"text-sm text-gray-700 leading-relaxed mb-6\">\n      <strong>The Scenario:</strong> You are building a secure facility gate. If a user has a clearance of 10+, they get <strong>Top Secret</strong> access. If it's 5+, they get <strong>Confidential</strong> access. All others get <strong>Basic</strong> access. \n      <br/><br/>How do we write this so that a Top Secret user doesn't get downgraded to Basic?\n    </p>\n\n    <div class=\"bg-gray-900 rounded-lg overflow-hidden shadow-md mb-8\">\n      <div class=\"px-4 py-2 bg-gray-800 text-[10px] uppercase font-bold tracking-widest text-gray-400\">The Official Solution</div>\n      <pre class=\"p-4 text-xs font-mono text-green-400\">int clearance = 7; // Example input\n\nif (clearance >= 10) {\n    System.out.println(\"Top Secret Access\");\n} else if (clearance >= 5) {\n    System.out.println(\"Confidential Access\"); \n} else {\n    System.out.println(\"Basic Access\");\n}</pre>\n    </div>\n\n    <div class=\"text-center\">\n      <h5 class=\"text-[11px] font-bold text-gray-400 uppercase tracking-tighter mb-4\">Visual Path Analysis: One Row, Three Scenarios</h5>\n      <img src=\"/public/images/else_if_security_clearance_triple_flow_1773472578837.png\" alt=\"Else-If Triple Logic Flow\" style=\"width: 100%; border-radius: 8px;\" class=\"border border-gray-50\" />\n      <div class=\"grid grid-cols-3 gap-2 mt-3 text-[10px] text-gray-500 font-medium italic\">\n        <div>Case 1: Clearance 12<br/>Hits first block and exits.</div>\n        <div>Case 2: Clearance 7<br/>Skips first, hits second.</div>\n        <div>Case 3: Clearance 2<br/>Falls to the final 'else'.</div>\n      </div>\n    </div>\n  </div>\n</div>"
                },
                {
                    "type": "section",
                    "title": "Order Matters",
                    "rich": "In an <code class=\"font-mono\">else if</code> chain, the order of your conditions is critical. If you check <code class=\"font-mono\">score > 80</code> before <code class=\"font-mono\">score > 90</code>, a score of 95 will trigger the 80 block and stop. Always place your <strong>most specific</strong> or most restrictive conditions at the top of the ladder."
                },
                {
                    "type": "section",
                    "title": "Five Practical Implementation Examples",
                    "rich": "Below are five industrial patterns where chained logic manages complex state transitions and business rules."
                },
                {
                    "type": "section",
                    "title": "1. Grade Classifier",
                    "code": "int score = 88;\nif (score >= 90) {\n    System.out.println(\"Grade: A\");\n} else if (score >= 80) {\n    System.out.println(\"Grade: B\");\n} else if (score >= 70) {\n    System.out.println(\"Grade: C\");\n} else {\n    System.out.println(\"Grade: F\");\n}",
                    "rich": "<strong>How it works:</strong> The JVM checks top-down. Since 88 is not >= 90 but is >= 80, it prints 'B' and exits the entire ladder. It never checks the 70 branch."
                },
                {
                    "type": "section",
                    "title": "2. Traffic Management System",
                    "code": "String light = \"Yellow\";\nif (light.equals(\"Red\")) {\n    stop();\n} else if (light.equals(\"Yellow\")) {\n    caution();\n} else if (light.equals(\"Green\")) {\n    proceed();\n} else {\n    alertMalfunction();\n}",
                    "rich": "<strong>How it works:</strong> This handles categorical states. If the light isn't Red or Yellow, it checks for Green. The final <code>else</code> acts as a safety backup for invalid states (like a broken light)."
                },
                {
                    "type": "section",
                    "title": "3. Customer Discount Tiers",
                    "code": "int points = 1500;\nif (points > 2000) {\n    discount = 0.20; // Platinum\n} else if (points > 1000) {\n    discount = 0.10; // Gold\n} else if (points > 500) {\n    discount = 0.05; // Silver\n} else {\n    discount = 0.0;  // Basic\n}",
                    "rich": "<strong>How it works:</strong> Logic flows from highest requirement to lowest. This 'Top-Down Filtering' ensures a Gold member (1500 pts) doesn't get downgraded to the Silver tier (500 pts)."
                },
                {
                    "type": "section",
                    "title": "4. Physics: Matter States",
                    "code": "double tempCelsius = 25.0;\nif (tempCelsius <= 0) {\n    System.out.println(\"State: Solid (Ice)\");\n} else if (tempCelsius < 100) {\n    System.out.println(\"State: Liquid (Water)\");\n} else {\n    System.out.println(\"State: Gas (Steam)\");\n}",
                    "rich": "<strong>How it works:</strong> This divides a continuous number range into discrete states. Anything between 0.1 and 99.9 falls into the 'Liquid' category."
                },
                {
                    "type": "section",
                    "title": "5. Game AI State Machine",
                    "code": "double distanceToPlayer = 5.0;\nif (distanceToPlayer < 2.0) {\n    state = \"ATTACK\";\n} else if (distanceToPlayer < 10.0) {\n    state = \"CHASE\";\n} else {\n    state = \"IDLE\";\n}",
                    "rich": "<strong>How it works:</strong> Used in game development to control character behavior. The NPC (Non-Player Character) switches between 'Attack', 'Chase', or 'Idle' based on its proximity to the player."
                },
                {
                    "type": "section",
                    "title": "Instructions"
                },
                {
                    "type": "task",
                    "value": "<strong>Task: Number Range Classifier</strong><br/><br/><strong>Question:</strong><br/>Declare <code class=\"font-mono\">int x = 15</code>. Use <code class=\"font-mono\">if / else if / else</code> to print <code class=\"font-mono\">Large</code> if x > 20, <code class=\"font-mono\">Medium</code> if x > 10, or <code class=\"font-mono\">Small</code> otherwise.",
                    "hints": [],
                    "points": 10
                },
                {
                    "type": "task",
                    "value": "<strong>Task: Temperature Alert</strong><br/><br/><strong>Question:</strong><br/>Declare <code class=\"font-mono\">int temp = 35</code>. Print <code class=\"font-mono\">Hot</code> if temp > 30, <code class=\"font-mono\">Warm</code> if temp > 20, or <code class=\"font-mono\">Cold</code> otherwise.",
                    "hints": [],
                    "points": 10
                },
                {
                    "type": "task",
                    "value": "<strong>Task: Simple Grading</strong><br/><br/><strong>Question:</strong><br/>Declare <code class=\"font-mono\">int score = 75</code>. Print <code class=\"font-mono\">A</code> if score >= 90, <code class=\"font-mono\">B</code> if score >= 70, or <code class=\"font-mono\">F</code> otherwise.",
                    "hints": [
                        "Order matters: Check score >= 90 first."
                    ],
                    "points": 10
                },
                {
                    "type": "task",
                    "value": "<strong>Task: Speed Check</strong><br/><br/><strong>Question:</strong><br/>Declare <code class=\"font-mono\">int speed = 120</code>. Print <code class=\"font-mono\">Dangerous</code> if speed > 100, <code class=\"font-mono\">Fast</code> if speed > 60, or <code class=\"font-mono\">Safe</code> otherwise.",
                    "hints": [
                        "Use speed > 100 for the first condition."
                    ],
                    "points": 10
                }
            ],
            "validation": [
                {
                    "index": 1,
                    "match": "Medium",
                    "matchCode": "else if"
                },
                {
                    "index": 2,
                    "match": "Hot",
                    "matchCode": "if"
                },
                {
                    "index": 3,
                    "match": "B",
                    "matchCode": "else if"
                },
                {
                    "index": 4,
                    "match": "Dangerous",
                    "matchCode": "if"
                }
            ]
        },
        {
            "title": "Switch Statements",
            "duration": "45 min",
            "sections": [
                {
                    "type": "section",
                    "title": "Lesson Description",
                    "rich": "The <code class=\"font-mono\">switch</code> statement is Java's specialized tool for multi-way branching based on a single variable's value. Instead of checking a series of true/false conditions like an if-ladder, it matches a value directly against a list of constant 'cases'. It is cleaner, more readable, and often more performant for categorical selection."
                },
                {
                    "type": "section",
                    "title": "Key Highlights",
                    "list": [
                        "<strong>Exact Matching:</strong> The selector variable is compared against each case using strict equality.",
                        "<strong>Jump Optimized:</strong> For large sets of cases, the JVM uses a 'Jump Table' for nearly instantaneous (O(1)) lookup performance.",
                        "<strong>The Break Guard:</strong> Every case block must usually end with a <code>break</code> to prevent execution from 'falling through' into the next case.",
                        "<strong>Default Safety:</strong> Always include a <code>default</code> case to handle unexpected or invalid input values."
                    ]
                },
                {
                    "type": "section",
                    "title": "Jump-Table Logic",
                    "rich": "<div class=\"my-4 text-center\"><img src=\"/public/images/conditional_switch_flowchart_white.png\" alt=\"Switch Flowchart\" style=\"max-width: 65%; margin: 0 auto;\" class=\"rounded-lg shadow-sm border border-gray-100\" /></div>"
                },
                {
                    "type": "section",
                    "title": "The Fall-Through Trap",
                    "rich": "The most important rule of the classic <code class=\"font-mono\">switch</code> is the <code class=\"font-mono\">break</code> statement. Without a break, execution 'falls through' into the next case automatically! While this can be used intentionally for grouping cases, it is often a source of dangerous logic errors for beginners."
                },
                {
                    "type": "section",
                    "title": "Five Practical Implementation Examples",
                    "rich": "Below are five patterns where Switch statements provide clean, efficient routing for application logic."
                },
                {
                    "type": "section",
                    "title": "1. Day of Week Mapper (Basic)",
                    "code": "int day = 3;\nswitch (day) {\n    case 1: System.out.println(\"Monday\"); break;\n    case 2: System.out.println(\"Tuesday\"); break;\n    case 3: System.out.println(\"Wednesday\"); break;\n    default: System.out.println(\"Other Day\");\n}",
                    "rich": "<strong>How it works:</strong> The JVM jumps directly to case 3. The <code>break</code> ensures it stops there. If day was 10, it would skip all cases and hit the <code>default</code> safety net."
                },
                {
                    "type": "section",
                    "title": "2. Order Status Tracker (Intermediate)",
                    "code": "String status = \"SHIPPED\";\nswitch (status) {\n    case \"PENDING\": System.out.println(\"Checking stock...\"); break;\n    case \"SHIPPED\": System.out.println(\"Package in transit\"); break;\n    case \"DELIVERED\": System.out.println(\"Order complete\"); break;\n    default: System.out.println(\"Unknown Status\");\n}",
                    "rich": "<strong>How it works:</strong> Modern Java allows switches on <code>String</code> values. This makes processing API responses or database flags extremely readable."
                },
                {
                    "type": "section",
                    "title": "3. Remote Command Processor (Advanced)",
                    "code": "String cmd = \"BOOT\";\nswitch (cmd) {\n    case \"WAKE\":\n    case \"BOOT\":\n        System.out.println(\"Initializing Hardware...\");\n        break;\n    case \"SHUTDOWN\":\n        System.out.println(\"Cleaning Resources...\");\n        break;\n}",
                    "rich": "<strong>How it works:</strong> This demonstrates intentional fall-through. Both 'WAKE' and 'BOOT' execute the same initialization code because 'WAKE' doesn't have a <code>break</code>."
                },
                {
                    "type": "section",
                    "title": "4. Calculator Operations",
                    "code": "char op = '*';\nint a = 10, b = 5;\nswitch (op) {\n    case '+': System.out.println(a + b); break;\n    case '-': System.out.println(a - b); break;\n    case '*': System.out.println(a * b); break;\n    case '/': System.out.println(a / b); break;\n}",
                    "rich": "<strong>How it works:</strong> A switch on a <code>char</code> is very efficient. It provides a simple way to map mathematical symbols to their actual logic."
                },
                {
                    "type": "section",
                    "title": "5. Role-Based Access Control",
                    "code": "String role = \"EDITOR\";\nswitch (role) {\n    case \"ADMIN\": grantFullAccess(); break;\n    case \"EDITOR\": grantWriteAccess(); break;\n    case \"VIEWER\": grantReadAccess(); break;\n    default: denyAccess();\n}",
                    "rich": "<strong>How it works:</strong> Used in security systems to map user roles to specific permission functions. The <code>default</code> ensures that unknown roles are denied access by default."
                },
                {
                    "type": "section",
                    "title": "Instructions"
                },
                {
                    "type": "task",
                    "value": "<strong>Task: Month Name Matcher</strong><br/><br/><strong>Question:</strong><br/>Declare <code class=\"font-mono\">int month = 2</code>. Use a <code class=\"font-mono\">switch</code> to print <code class=\"font-mono\">February</code>. Remember to use <code class=\"font-mono\">break</code>.",
                    "hints": [],
                    "points": 10
                },
                {
                    "type": "task",
                    "value": "<strong>Task: Direction Router</strong><br/><br/><strong>Question:</strong><br/>Declare <code class=\"font-mono\">String dir = \"LEFT\"</code>. Use a <code class=\"font-mono\">switch</code> to print <code class=\"font-mono\">Turning Left</code>. Handle <code class=\"font-mono\">RIGHT</code> as well.",
                    "hints": [],
                    "points": 10
                },
                {
                    "type": "task",
                    "value": "<strong>Task: Grade Converter</strong><br/><br/><strong>Question:</strong><br/>Declare <code class=\"font-mono\">char grade = 'A'</code>. Use a <code class=\"font-mono\">switch</code> to print <code class=\"font-mono\">Excellent</code> for 'A' and <code class=\"font-mono\">Good</code> for 'B'.",
                    "hints": [
                        "switch(grade) { case 'A': ... break; }"
                    ],
                    "points": 10
                },
                {
                    "type": "task",
                    "value": "<strong>Task: Season Checker</strong><br/><br/><strong>Question:</strong><br/>Declare <code class=\"font-mono\">int q = 1</code>. Print <code class=\"font-mono\">Winter</code> for case 1 or 2 using a switch.",
                    "hints": [
                        "You can stack cases like 'case 1: case 2: ...'"
                    ],
                    "points": 10
                }
            ],
            "validation": [
                {
                    "index": 1,
                    "match": "February",
                    "matchCode": "switch"
                },
                {
                    "index": 2,
                    "match": "Turning Left",
                    "matchCode": "case \"LEFT\""
                },
                {
                    "index": 3,
                    "match": "Excellent",
                    "matchCode": "case 'A'"
                },
                {
                    "index": 4,
                    "match": "Winter",
                    "matchCode": "case 1"
                }
            ]
        },
        {
            "title": "Switch Expressions (Java 14+)",
            "duration": "45 min",
            "sections": [
                {
                    "type": "section",
                    "title": "Lesson Description",
                    "rich": "Java 14 introduced **Switch Expressions**, a modern evolution of the traditional switch. Unlike the old statement which was just an instruction, an expression *returns a value*. It uses the clean 'Arrow Syntax' (<code class=\"font-mono\">-></code>), eliminates vertical boilerplate, and is completely 'fall-through' safe by design."
                },
                {
                    "type": "section",
                    "title": "Key Highlights",
                    "list": [
                        "<strong>Value Return:</strong> You can assign the result of a switch directly to a variable.",
                        "<strong>No Fall-Through:</strong> Arrow cases execute exactly one block; no <code>break</code> statements are needed.",
                        "<strong>Syntactic Comma:</strong> Multiple cases can be grouped on one line (e.g., <code>case 1, 2, 3 -></code>).",
                        "<strong>Exhaustiveness:</strong> The compiler ensures you've handled every possible value (often requiring a <code>default</code>)."
                    ]
                },
                {
                    "type": "section",
                    "title": "Evolutionary Flow Model",
                    "rich": "<div class=\"my-4 text-center\"><img src=\"/public/images/java_switch_expression_diagram.png\" alt=\"Switch Expression Flow\" style=\"max-width: 65%; margin: 0 auto;\" class=\"rounded-lg shadow-sm border border-gray-100\" /></div>"
                },
                {
                    "type": "section",
                    "title": "Value Assignment",
                    "rich": "The primary benefit of switch expressions is that they treat selection as a **Functional Mapping**. You provide an input, and the expression instantly 'maps' it to an output. For complex logic, you can use a block with the <code class=\"font-mono\">yield</code> keyword to return the final value."
                },
                {
                    "type": "section",
                    "title": "Five Practical Implementation Examples",
                    "rich": "Below are five modern patterns where switch expressions produce cleaner, safer code than traditional logic."
                },
                {
                    "type": "section",
                    "title": "1. Result Mapping (Days in Month)",
                    "code": "int month = 2;\nint days = switch (month) {\n    case 1, 3, 5, 7, 8, 10, 12 -> 31;\n    case 4, 6, 9, 11 -> 30;\n    case 2 -> 28;\n    default -> 0;\n};",
                    "rich": "<strong>How it works:</strong> The result is assigned directly to the <code>days</code> variable. Notice how multiple cases are grouped with commas for absolute brevity."
                },
                {
                    "type": "section",
                    "title": "2. Categorical String Return (User Permissions)",
                    "code": "String role = \"EDITOR\";\nString access = switch (role) {\n    case \"ADMIN\" -> \"FULL\";\n    case \"EDITOR\", \"MODERATOR\" -> \"WRITE\";\n    case \"USER\" -> \"READ\";\n    default -> \"NONE\";\n};",
                    "rich": "<strong>How it works:</strong> Perfect for translating internal codes into human-readable strings. It replaces 15+ lines of if-else with a single, readable block."
                },
                {
                    "type": "section",
                    "title": "3. Math Resolver (returning results)",
                    "code": "char op = '*';\nint x = 10, y = 2;\nint result = switch (op) {\n    case '+' -> x + y;\n    case '-' -> x - y;\n    case '*' -> x * y;\n    case '/' -> x / y;\n    default -> 0;\n};",
                    "rich": "<strong>How it works:</strong> Traditional switches couldn't assign results like this. Here, the mathematical result flows directly into the <code>result</code> variable."
                },
                {
                    "type": "section",
                    "title": "4. Block Logic with yield",
                    "code": "String cmd = \"BOOT\";\nint statusCode = switch (cmd) {\n    case \"BOOT\" -> {\n        System.out.println(\"Booting...\");\n        yield 1;\n    }\n    case \"SHUTDOWN\" -> {\n        System.out.println(\"Ending...\");\n        yield 0;\n    }\n    default -> -1;\n};",
                    "rich": "<strong>How it works:</strong> For blocks with multiple lines (like logging), we use the <code>yield</code> keyword to return the value that the switch should resolve to."
                },
                {
                    "type": "section",
                    "title": "5. Multi-Value Grouping",
                    "code": "char ch = 'e';\nboolean isVowel = switch (ch) {\n    case 'a', 'e', 'i', 'o', 'u' -> true;\n    default -> false;\n};",
                    "rich": "<strong>How it works:</strong> This is the cleanest way to check for set membership in Java. It clearly defines the 'True' group and the fallback 'False' group."
                },
                {
                    "type": "section",
                    "title": "Instructions"
                },
                {
                    "type": "task",
                    "value": "<strong>Task: Rank Mapper</strong><br/><br/><strong>Question:</strong><br/>Declare <code class=\"font-mono\">int level = 2</code>. Use a switch expression to assign <code class=\"font-mono\">\"Pro\"</code> to a String if level is 2, or <code class=\"font-mono\">\"Noob\"</code> otherwise. Print the result.",
                    "hints": [],
                    "points": 10
                },
                {
                    "type": "task",
                    "value": "<strong>Task: Boolean Toggle</strong><br/><br/><strong>Question:</strong><br/>Declare <code class=\"font-mono\">String mode = \"ON\"</code>. Print <code class=\"font-mono\">true</code> if mode is \"ON\" using a switch expression arrow syntax.",
                    "hints": [],
                    "points": 10
                },
                {
                    "type": "task",
                    "value": "<strong>Task: Hex Color Resolver</strong><br/><br/><strong>Question:</strong><br/>Declare <code class=\"font-mono\">String color = \"RED\"</code>. Return <code class=\"font-mono\">#FF0000</code> for RED and <code class=\"font-mono\">#0000FF</code> for BLUE using a modern switch.",
                    "hints": [
                        "String hex = switch(color) { case \"RED\" -> \"#FF0000\"; ... };"
                    ],
                    "points": 10
                },
                {
                    "type": "task",
                    "value": "<strong>Task: Yield Practice</strong><br/><br/><strong>Question:</strong><br/>Return <code class=\"font-mono\">100</code> using a switch expression and the <code class=\"font-mono\">yield</code> keyword for <code class=\"font-mono\">case \"WIN\"</code>.",
                    "hints": [
                        "case \"WIN\" -> { yield 100; }"
                    ],
                    "points": 15
                }
            ],
            "validation": [
                {
                    "index": 1,
                    "match": "Pro",
                    "matchCode": "->"
                },
                {
                    "index": 2,
                    "match": "true",
                    "matchCode": "->"
                },
                {
                    "index": 3,
                    "match": "#FF0000",
                    "matchCode": "switch"
                },
                {
                    "index": 4,
                    "match": "100",
                    "matchCode": "yield"
                }
            ]
        },
        {
            "title": "Ternary in Control Flow",
            "duration": "40 min",
            "sections": [
                {
                    "type": "section",
                    "title": "Lesson Description",
                    "rich": "The <code class=\"font-mono\">ternary operator</code> (<code class=\"font-mono\">? :</code>) is Java's ONLY operator that takes three operands. It is best envisioned as a 'Compressed If-Else'. Instead of writing 4-5 lines of code for a simple binary choice, you can do it in a single, clean line. It is widely used for variable initialization where a full if-else would be verbose."
                },
                {
                    "type": "section",
                    "title": "Key Highlights",
                    "list": [
                        "<strong>Inline Choice:</strong> It evaluates a condition and returns one of two values immediately.",
                        "<strong>Expression Nature:</strong> Unlike an <code>if</code> statement, a ternary is an <em>expression</em> that returns a value.",
                        "<strong>Type Symmetry:</strong> Both the 'True' and 'False' results must be of compatible data types.",
                        "<strong>Readability First:</strong> professional developers only use ternaries for simple binary choices; never nest them."
                    ]
                },
                {
                    "type": "section",
                    "title": "Logical Anatomy",
                    "rich": "<div class=\"my-4 text-center\"><img src=\"/public/images/java_ternary_operator_diagram.png\" alt=\"Ternary logic\" style=\"max-width: 65%; margin: 0 auto;\" class=\"rounded-lg shadow-sm border border-gray-100\" /></div>"
                },
                {
                    "type": "section",
                    "title": "Decision Tree",
                    "rich": "A ternary follows a strict pattern: <code class=\"font-mono\">(condition) ? (result_if_true) : (result_if_false)</code>. It is essentially an expression that <em>returns</em> a value, making it fundamentally different from an if-statement, which is an instruction that <em>executes</em> a block."
                },
                {
                    "type": "section",
                    "title": "Five Practical Implementation Examples",
                    "rich": "Below are five patterns where ternary operators provide clean, concise logic for everyday coding tasks."
                },
                {
                    "type": "section",
                    "title": "1. Max/Min Finder (Basic)",
                    "code": "int a = 10, b = 20;\nint max = (a > b) ? a : b;",
                    "rich": "<strong>How it works:</strong> Since 10 > 20 is false, the value after the colon (<code>b</code>) is assigned to <code>max</code>. This is the fastest way to pick between two numbers."
                },
                {
                    "type": "section",
                    "title": "2. Null Safety Wrapper (Intermediate)",
                    "code": "String input = null;\nString name = (input != null) ? input : \"Guest\";",
                    "rich": "<strong>How it works:</strong> Prevents 'NullPointerExceptions'. If the input is null, it safely defaults to 'Guest' on a single line."
                },
                {
                    "type": "section",
                    "title": "3. Dynamic UI Labeling (Grammar)",
                    "code": "int count = 1;\nString message = \"Found \" + count + (count == 1 ? \" item\" : \" items\");",
                    "rich": "<strong>How it works:</strong> Used inside print statements to dynamically change between singular and plural words based on a number."
                },
                {
                    "type": "section",
                    "title": "4. Permission Check (Boolean return)",
                    "code": "int age = 16;\nboolean canVote = (age >= 18) ? true : false;",
                    "rich": "<strong>How it works:</strong> Quickly maps a numerical condition to a boolean flag. While <code>age >= 18</code> works alone, ternaries make the logic explicit for beginner readability."
                },
                {
                    "type": "section",
                    "title": "5. Complex Initialization",
                    "code": "double price = 100.0;\nboolean isHoliday = true;\ndouble finalPrice = isHoliday ? price * 0.9 : price;",
                    "rich": "<strong>How it works:</strong> Perfect for 'Conditional Assignments'. It calculates a 10% holiday discount only if <code>isHoliday</code> is true."
                },
                {
                    "type": "section",
                    "title": "Instructions"
                },
                {
                    "type": "task",
                    "value": "<strong>Task: Even/Odd Labeler</strong><br/><br/><strong>Question:</strong><br/>Declare <code class=\"font-mono\">int n = 7</code>. Use a ternary to assign <code class=\"font-mono\">\"Even\"</code> or <code class=\"font-mono\">\"Odd\"</code> to a String. Print the result.",
                    "hints": [],
                    "points": 10
                },
                {
                    "type": "task",
                    "value": "<strong>Task: Absolute Value</strong><br/><br/><strong>Question:</strong><br/>Declare <code class=\"font-mono\">int num = -5</code>. Use a ternary to assign its absolute (positive) value to <code class=\"font-mono\">int abs</code>. Print it.",
                    "hints": [],
                    "points": 10
                },
                {
                    "type": "task",
                    "value": "<strong>Task: Discount Applier</strong><br/><br/><strong>Question:</strong><br/>Set <code class=\"font-mono\">boolean isMember = true</code>. Set <code class=\"font-mono\">double price = 50.0</code>. If member, price is <code class=\"font-mono\">40.0</code>, else <code class=\"font-mono\">50.0</code> using a ternary.",
                    "hints": [
                        "double finalPrice = isMember ? 40.0 : 50.0;"
                    ],
                    "points": 10
                },
                {
                    "type": "task",
                    "value": "<strong>Task: Logical Toggle</strong><br/><br/><strong>Question:</strong><br/>Declare <code class=\"font-mono\">int status = 1</code>. Print <code class=\"font-mono\">Active</code> if status is 1, else <code class=\"font-mono\">Inactive</code> using a ternary.",
                    "hints": [
                        "System.out.println(status == 1 ? \"Active\" : \"Inactive\");"
                    ],
                    "points": 10
                }
            ],
            "validation": [
                {
                    "index": 1,
                    "match": "Odd",
                    "matchCode": "\\?"
                },
                {
                    "index": 2,
                    "match": "5",
                    "matchCode": "\\?"
                },
                {
                    "index": 3,
                    "match": "40",
                    "matchCode": "\\?"
                },
                {
                    "index": 4,
                    "match": "Active",
                    "matchCode": "\\?"
                }
            ]
        },
        {
            "title": "Nested Conditionals",
            "duration": "45 min",
            "sections": [
                {
                    "type": "section",
                    "title": "Lesson Description",
                    "rich": "Real-world decisions are often hierarchical. For example, to withdraw money, you must <em>first</em> have a valid account, and <em>then</em> you must have enough balance. <strong>Nested Conditionals</strong> occur when you place one <code>if</code> statement inside another, creating specialized sub-branches for complex validation logic."
                },
                {
                    "type": "section",
                    "title": "Key Highlights",
                    "list": [
                        "<strong>Hierarchical Logic:</strong> The inner block only executes if all parent conditions are true.",
                        "<strong>Contextual Access:</strong> Inner blocks can use variables from all outer blocks (Shadowing should be avoided).",
                        "<strong>The Arrow Trap:</strong> Avoid nesting more than 3 levels deep; it makes code hard to read (The 'Pyramid of Doom').",
                        "<strong>Flattening Rule:</strong> If you don't need independent logic between levels, combine them with <code>&&</code> instead."
                    ]
                },
                {
                    "type": "section",
                    "title": "Hierarchical Logic",
                    "rich": "<div class=\"my-4 text-center\"><img src=\"/public/images/conditional_nested_if_white.png\" alt=\"Nested If Flow\" style=\"max-width: 65%; margin: 0 auto;\" class=\"rounded-lg shadow-sm border border-gray-100\" /></div>"
                },
                {
                    "type": "section",
                    "title": "The Arrow Pattern Danger",
                    "rich": "When you nest too many levels deep, your code starts drifting to the right side of the screen. This is known as the 'Arrow Pattern'. Professional Java developers solve this by using 'Guard Clauses'—checking for invalid conditions early and exiting—to keep the main logic flat and readable."
                },
                {
                    "type": "section",
                    "title": "Five Practical Implementation Examples",
                    "rich": "Below are five industrial patterns where nested logic manages multi-step verification and state dependent rules."
                },
                {
                    "type": "section",
                    "title": "1. Multi-Factor Authentication",
                    "code": "boolean hasPassword = true;\nboolean hasOTP = true;\nif (hasPassword) {\n    if (hasOTP) {\n        System.out.println(\"Login Successful\");\n    } else {\n        System.out.println(\"Please enter OTP\");\n    }\n}",
                    "rich": "<strong>How it works:</strong> The first block checks the password. Only if that passes does the JVM check for the second factor (OTP). This ensures security steps happen in sequence."
                },
                {
                    "type": "section",
                    "title": "2. Nested Discounting",
                    "code": "boolean isMember = true;\nint points = 1200;\nif (isMember) {\n    if (points > 1000) {\n        discount = 0.15; // Platinum Member\n    } else {\n        discount = 0.05; // Standard Member\n    }\n}",
                    "rich": "<strong>How it works:</strong> We first verify membership. Then, *within* that category, we apply further logic based on loyalty points to determine the exact discount tier."
                },
                {
                    "type": "section",
                    "title": "3. Inventory & Shipping",
                    "code": "int stock = 5;\nboolean isInternational = true;\nif (stock > 0) {\n    if (isInternational) {\n        fee = 50;\n    } else {\n        fee = 10;\n    }\n}",
                    "rich": "<strong>How it works:</strong> First check if the product is available. If it is, determine the shipping fee based on distance. If out of stock, the inner logic never runs."
                },
                {
                    "type": "section",
                    "title": "4. Game AI: Combat State",
                    "code": "boolean seesPlayer = true;\ndouble distance = 1.5;\nif (seesPlayer) {\n    if (distance < 2.0) {\n        state = \"ATTACK\";\n    } else {\n        state = \"CHASE\";\n    }\n}",
                    "rich": "<strong>How it works:</strong> The AI first checks vision. If it can see the player, it then decides whether to attack (if close) or chase (if far away)."
                },
                {
                    "type": "section",
                    "title": "5. File System Validation",
                    "code": "boolean exists = true;\nboolean isReadable = true;\nif (exists) {\n    if (isReadable) {\n        readData();\n    } else {\n        System.out.println(\"Access Denied\");\n    }\n}",
                    "rich": "<strong>How it works:</strong> Used in OS level coding. We don't try to check permissions (readability) on a file that doesn't even exist."
                },
                {
                    "type": "section",
                    "title": "Instructions"
                },
                {
                    "type": "task",
                    "value": "<strong>Task: Double Check</strong><br/><br/><strong>Question:</strong><br/>Set <code class=\"font-mono\">boolean a = true</code> and <code class=\"font-mono\">boolean b = true</code>. Use nested <code class=\"font-mono\">if</code> statements to print <code class=\"font-mono\">Success</code> only if both are true.",
                    "hints": [],
                    "points": 10
                },
                {
                    "type": "task",
                    "value": "<strong>Task: Simple ATM</strong><br/><br/><strong>Question:</strong><br/>Set <code class=\"font-mono\">int pin = 1234</code> and <code class=\"font-mono\">int bal = 500</code>. If pin is 1234, check if bal > 100. If both pass, print <code class=\"font-mono\">Withdrawal OK</code>.",
                    "hints": [],
                    "points": 10
                },
                {
                    "type": "task",
                    "value": "<strong>Task: Membership Pricing</strong><br/><br/><strong>Question:</strong><br/>Set <code class=\"font-mono\">boolean member = true</code> and <code class=\"font-mono\">int age = 20</code>. If member, check if age < 18 for <code class=\"font-mono\">Junior</code> or else <code class=\"font-mono\">Senior</code>. Print the label.",
                    "hints": [
                        "if(member) { if(age < 18) { ... } else { ... } }"
                    ],
                    "points": 10
                },
                {
                    "type": "task",
                    "value": "<strong>Task: Nested Guard</strong><br/><br/><strong>Question:</strong><br/>Set <code class=\"font-mono\">String user = \"Admin\"</code>. If user is \"Admin\", check <code class=\"font-mono\">boolean active = true</code>. If true, print <code class=\"font-mono\">Console Open</code>.",
                    "hints": [
                        "Use .equals() for String comparison."
                    ],
                    "points": 10
                }
            ],
            "validation": [
                {
                    "index": 1,
                    "match": "Success",
                    "matchCode": "if[\\s\\S]*if"
                },
                {
                    "index": 2,
                    "match": "Withdrawal OK",
                    "matchCode": "if[\\s\\S]*if"
                },
                {
                    "index": 3,
                    "match": "Senior",
                    "matchCode": "if[\\s\\S]*if"
                },
                {
                    "index": 4,
                    "match": "Console Open",
                    "matchCode": "if[\\s\\S]*if"
                }
            ]
        },
        {
            "title": "Advanced Control Flow Patterns",
            "duration": "50 min",
            "sections": [
                {
                    "type": "section",
                    "title": "Lesson Description",
                    "rich": "As Java enterprise systems grow in complexity, the traditional <code class=\"font-mono\">if-else</code> statement can become a source of technical debt. <strong>Advanced Control Flow Patterns</strong> represent the modern engineering approach to selection logic. By leveraging features like <strong>Pattern Matching</strong>, <strong>Short-Circuit Evaluation</strong>, and <strong>Guard Clauses</strong>, developers can write code that isn't just 'correct,' but is architecturally resilient, crash-proof, and highly performance-optimized. These patterns transform messy 'spaghetti' logic into a clean, readable flow that mirrors professional business requirements."
                },
                {
                    "type": "section",
                    "title": "Key Highlights",
                    "list": [
                        "<strong>Pattern Matching (Java 16+):</strong> Combined type-checking and extraction into a single atomic operation, eliminating unsafe casting.",
                        "<strong>Short-Circuit Logic:</strong> A performance and safety mechanism that prevents the execution of unnecessary or dangerous code branches.",
                        "<strong>Guard Clause Architecture:</strong> A 'fail-fast' design pattern that removes deep nesting by validation at the entry point of a method.",
                        "<strong>Exhaustive Data Processing:</strong> Modern Java ensures that all logical possibilities are accounted for at compile-time, preventing runtime failures."
                    ]
                },
                {
                    "type": "section",
                    "title": "High-Performance Design",
                    "rich": "<div class=\"my-4 text-center\"><img src=\"/public/images/java_advanced_control_flow_patterns.png\" alt=\"Advanced Patterns\" style=\"max-width: 65%; margin: 0 auto;\" class=\"rounded-lg shadow-sm border border-gray-100\" /></div>"
                },
                {
                    "type": "section",
                    "title": "1. Modern Pattern Matching",
                    "rich": "Before Java 16, checking if an object was a specific type required a tedious two-step process: first the <code class=\"font-mono\">instanceof</code> check, and then an explicit (and potentially dangerous) cast. <strong>Pattern Matching for instanceof</strong> solves this by allowing you to declare a pattern variable directly in the condition. If the check passes, the variable is automatically initialized and scoped to the <code class=\"font-mono\">if</code> block. This prevents the 'CastClassException' and reduces boilerplate code by 50%."
                },
                {
                    "type": "section",
                    "title": "2. Short-Circuit Safety Mechanism",
                    "rich": "Java's logical operators (<code class=\"font-mono\">&&</code> and <code class=\"font-mono\">||</code>) are 'Lazy'. In a conditional like <code class=\"font-mono\">if(obj != null && obj.isValid())</code>, Java will stop immediately if the first part is false. This is a <strong>primary safety shield</strong>. Without short-circuiting, checking a property of a null object would crash the entire application with a <code class=\"font-mono\">NullPointerException</code>. Professionally, we use this to 'stack' safety checks from left to right, ensuring basic validity before complex logic."
                },
                {
                    "type": "section",
                    "title": "3. The Guard Clause Pattern (Flattening)",
                    "rich": "One of the most powerful 'Clean Code' techniques is the use of <strong>Guard Clauses</strong>. Instead of wrapping your entire logic inside a giant <code class=\"font-mono\">if</code> block, you check for 'edge cases' or 'invalid states' at the very top and return immediately. This keeps the 'Happy Path' (the main logic of your method) at the lowest possible indentation level. It makes code significantly easier to debug and test because the prerequisites for execution are clearly stated at the beginning."
                },
                {
                    "type": "section",
                    "title": "Technical Mastery Points",
                    "list": [
                        "<strong>Atomic Casting:</strong> Pattern matching ensures that the variable is only accessible when the type check is guaranteed to be true.",
                        "<strong>Logical Efficiency:</strong> Short-circuiting reduces CPU cycles by ignoring operations that cannot change the final outcome of a boolean expression.",
                        "<strong>Readability over Nesting:</strong> Guard clauses solve the 'Pyramid of Doom' (massive rightward indentation) by handling errors early and exiting.",
                        "<strong>Side-Effect Warning:</strong> Avoid putting methods that modify data inside short-circuit conditions, as they might never be called if the statement skips evaluation.",
                        "<strong>Performance-Ready:</strong> Modern JVMs (HotSpot) optimize these patterns into machine code that is faster than traditional nested logic."
                    ]
                },
                {
                    "type": "section",
                    "title": "Five Practical Implementation Examples",
                    "rich": "Below are five advanced patterns used by senior Java architects to build robust, crash-proof enterprise systems."
                },
                {
                    "type": "section",
                    "title": "1. Null Guard Pattern",
                    "code": "String msg = getMessage();\nif (msg != null && msg.length() > 0) {\n    System.out.println(msg);\n}",
                    "rich": "<strong>How it works:</strong> The <code>&&</code> operator 'short-circuits'. If <code>msg</code> is null, the second part (length check) is never executed, preventing a crash."
                },
                {
                    "type": "section",
                    "title": "2. Modern Instanceof (Pattern Matching)",
                    "code": "Object obj = \"Expert\";\nif (obj instanceof String s) {\n    System.out.println(s.toUpperCase());\n}",
                    "rich": "<strong>How it works:</strong> Java 16+ combined the check and the cast. We no longer need <code>String s = (String)obj;</code> on a second line. It's safer and cleaner."
                },
                {
                    "type": "section",
                    "title": "3. Guard Clause Flow",
                    "code": "public void process(User u) {\n    if (u == null) return;\n    if (!u.isActive()) return;\n    // Core logic stays at depth 0\n    System.out.println(\"Processing...\");\n}",
                    "rich": "<strong>How it works:</strong> Instead of nesting the main logic inside 3 <code>if</code> blocks, we 'guard' the entry. If conditions aren't met, we exit early. This is a senior coding standard."
                },
                {
                    "type": "section",
                    "title": "4. Bitwise-Style Flag Checking",
                    "code": "int status = 0b101; // Binary\nif ((status & 0b100) != 0) {\n    System.out.println(\"Bit 3 is set\");\n}",
                    "rich": "<strong>How it works:</strong> High-performance systems use individual bits to store multiple 'Yes/No' answers in a single number. Conditionals are used to 'mask' and check these flags."
                },
                {
                    "type": "section",
                    "title": "5. Optional-Based Branching",
                    "code": "Optional<String> name = Optional.ofNullable(null);\nname.ifPresentOrElse(\n    n -> System.out.println(\"Hi \" + n),\n    () -> System.out.println(\"Hi Guest\")\n);",
                    "rich": "<strong>How it works:</strong> While not a standard <code>if</code>, this functional approach to branching is the modern Java way to handle nullability without manual checks."
                },
                {
                    "type": "section",
                    "title": "Instructions"
                },
                {
                    "type": "task",
                    "value": "<strong>Task: Pattern Guard</strong><br/><br/><strong>Question:</strong><br/>Given <code class=\"font-mono\">Object o = \"Java\"</code>. Use <code class=\"font-mono\">instanceof String s</code> to print its length using <code class=\"font-mono\">s.length()</code>.",
                    "hints": [],
                    "points": 10
                },
                {
                    "type": "task",
                    "value": "<strong>Task: Short Circuit Proof</strong><br/><br/><strong>Question:</strong><br/>Create a safety check. If <code class=\"font-mono\">String s = null</code> is not null AND its length is 0, print <code class=\"font-mono\">Empty</code>.",
                    "hints": [],
                    "points": 10
                },
                {
                    "type": "task",
                    "value": "<strong>Task: Early Return</strong><br/><br/><strong>Question:</strong><br/>Write a condition where if <code class=\"font-mono\">int age = 10</code> is less than 18, execution prints <code class=\"font-mono\">Exit</code> and conceptually stops.",
                    "hints": [
                        "if(age < 18) { System.out.println(\"Exit\"); return; }"
                    ],
                    "points": 10
                },
                {
                    "type": "task",
                    "value": "<strong>Task: Object Type Mapping</strong><br/><br/><strong>Question:</strong><br/>If <code class=\"font-mono\">Object data = 100</code> is an <code class=\"font-mono\">Integer i</code>, print <code class=\"font-mono\">Value: 100</code> using modern pattern matching.",
                    "hints": [
                        "if(data instanceof Integer i) { ... }"
                    ],
                    "points": 10
                }
            ],
            "validation": [
                {
                    "index": 1,
                    "match": "4",
                    "matchCode": "instanceof"
                },
                {
                    "index": 2,
                    "match": "Empty",
                    "matchCode": "&&"
                },
                {
                    "index": 3,
                    "match": "Exit",
                    "matchCode": "return"
                },
                {
                    "index": 4,
                    "match": "Value: 100",
                    "matchCode": "instanceof"
                }
            ]
        }
    ]
});