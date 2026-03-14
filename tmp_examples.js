const fs = require('fs');
const path = 'scripts/seed/m04_conditional_statements.js';
let data = fs.readFileSync(path, 'utf8');

// Lesson 1: Intro
data = data.replace(
    /\{ type: 'section', title: '12\. Practice examples', text: [^}]+ \},/,
    `{ type: 'section', title: '12. Practice examples', rich: 'Here are multiple scenarios demonstrating basic truth validation through to advanced formulaic testing:<br/><br/><strong>Basic (Direct Boolean Check):</strong><br/><code class="font-mono">boolean isOnline = true;\\nif (isOnline) {\\n    System.out.println("User is connected.");\\n}</code><br/><br/><strong>Intermediate (Math Inject Check):</strong><br/>You can test out whether an operation succeeds or fails by injecting math directly into the evaluation block.<br/><code class="font-mono">int health = 100;\\nint damage = 50;\\nif ((health - damage) > 0) {\\n    System.out.println("Player survives attack!");\\n}</code><br/><br/><strong>Advanced (Method Call Evaluation):</strong><br/>You can actually place entire method functions inside the parenthesis as long as they return a boolean.<br/><code class="font-mono">String file = "data.txt";\\nif (file.endsWith(".txt")) {\\n    System.out.println("Valid Text Document");\\n}</code>' },`
);

// Lesson 2: if Statement
data = data.replace(
    /\{ type: 'section', title: '12\. Practice examples', text: [^}]+ \},/,
    `{ type: 'section', title: '12. Practice examples', rich: 'Explore how if-statements handle various primitive data types and logical constraints:<br/><br/><strong>Basic (Numeric Range Check):</strong><br/><code class="font-mono">int battery = 15;\\nif (battery &lt;= 20) {\\n    System.out.println("Warning: Low Battery");\\n}</code><br/><br/><strong>Intermediate (Divisibility via Modulo):</strong><br/>Let\\'s practice using modulo to check for divisibility. If a number divides perfectly into another, modulo returns 0.<br/><code class="font-mono">int year = 2024;\\nif (year % 2 == 0) {\\n    System.out.println("Even numbered year.");\\n}</code><br/><br/><strong>Advanced (Compound Char Validation):</strong><br/>Checking if a raw character primitive represents an uppercase letter using strict boundary bounds.<br/><code class="font-mono">char grade = \\'B\\';\\nif (grade >= \\'A\\' && grade &lt;= \\'Z\\') {\\n    System.out.println("Valid Uppercase Token");\\n}</code>' },`
);

// Lesson 3: if-else Statement
data = data.replace(
    /\{ type: 'section', title: '12\. Practice examples', (text|rich): [^}]+ \},/,
    `{ type: 'section', title: '12. Practice examples', rich: 'The strict binary guarantee allows us to cleanly split business logic into Success/Failure paths.<br/><br/><strong>Basic (Access Control dichotomy):</strong><br/><code class="font-mono">boolean isAdmin = false;\\nif (isAdmin) {\\n    System.out.println("Accessing core system");\\n} else {\\n    System.out.println("Access Denied");\\n}</code><br/><br/><strong>Intermediate (Parity Testing):</strong><br/>Testing for parity (Even/Odd) represents a classic dichotomous test perfectly suited for an if-else.<br/><code class="font-mono">int n = 7;\\nif (n % 2 == 0) {\\n    System.out.println("Even");\\n} else {\\n    System.out.println("Odd");\\n}</code><br/><br/><strong>Advanced (String Content Evaluation):</strong><br/>Strings cannot normally use <code class="font-mono">==</code>, so we use the <code class="font-mono">.equals()</code> method to route logic based on exact text matches.<br/><code class="font-mono">String role = "Guest";\\nif (role.equals("Member")) {\\n    System.out.println("Applying 10% Discount");\\n} else {\\n    System.out.println("Standard Pricing Applied");\\n}</code>' },`
);

// Lesson 4: else-if Ladder
data = data.replace(
    /\{ type: 'section', title: '12\. Practice examples', text: [^}]+ \},/,
    `{ type: 'section', title: '12. Practice examples', rich: 'Ladders are excellent for defining exact thresholds, tiers, and spectrum bounds.<br/><br/><strong>Basic (Categorizing Raw Metrics):</strong><br/><code class="font-mono">int speed = 80;\\nif (speed > 110) {\\n    System.out.println("Hurricane Warning");\\n} else if (speed > 60) {\\n    System.out.println("Tropical Storm Warning");\\n} else {\\n    System.out.println("Normal Breeze");\\n}</code><br/><br/><strong>Intermediate (Strict Grading Ranges):</strong><br/>Checking academic bounds from highest to lowest strictly.<br/><code class="font-mono">double gpa = 3.2;\\nif (gpa >= 3.8) {\\n    System.out.println("Summa Cum Laude");\\n} else if (gpa >= 3.5) {\\n    System.out.println("Magna Cum Laude");\\n} else {\\n    System.out.println("Standard Graduate");\\n}</code><br/><br/><strong>Advanced (Complex Mixed Conditions):</strong><br/>A ladder evaluating entirely different variables to determine application priority routing.<br/><code class="font-mono">boolean criticalError = true;\\nint loadTime = 500;\\nif (criticalError) {\\n    System.out.println("Halt System!");\\n} else if (loadTime > 1000) {\\n    System.out.println("Throttle Network");\\n} else {\\n    System.out.println("Nominal Operation");\\n}</code>' },`
);

// Lesson 5: Nested if
data = data.replace(
    /\{ type: 'section', title: '12\. Practice examples', text: [^}]+ \},/,
    `{ type: 'section', title: '12. Practice examples', rich: 'Nesting allows dependent sequences of authorization checks to execute sequentially.<br/><br/><strong>Basic (Dual State Matrix Check):</strong><br/><code class="font-mono">boolean isWeekend = true;\\nboolean isRaining = false;\\nif (isWeekend) {\\n    if (!isRaining) {\\n        System.out.println("Going to the park!");\\n    }\\n}</code><br/><br/><strong>Intermediate (Directory and File Validation):</strong><br/>Checking if a software file path exists and verifies securely as a parseable directory.<br/><code class="font-mono">boolean fileExists = true;\\nboolean isDirectory = true;\\nif (fileExists) {\\n    if (isDirectory) {\\n        System.out.println("Opening folder contents...");\\n    } else {\\n        System.out.println("Opening single file...");\\n    }\\n} else {\\n    System.out.println("Error 404: Path Not Found.");\\n}</code><br/><br/><strong>Advanced (3-Tier Authentication Nest):</strong><br/>A deep nest verifying user existence, active status, and specific role credentials.<br/><code class="font-mono">if (userExists) {\\n    if (isActiveUser) {\\n        if (roleRank >= 5) {\\n            System.out.println("Executing Admin Commands...");\\n        }\\n    }\\n}</code>' },`
);

// Lesson 6: switch Statement
data = data.replace(
    /\{ type: 'section', title: '12\. Practice examples', text: [^}]+ \},/,
    `{ type: 'section', title: '12. Practice examples', rich: 'Switch mechanisms excel at categorizing strictly discrete inputs instantaneously.<br/><br/><strong>Basic (Integer Menu Dispatch):</strong><br/><code class="font-mono">int menu = 2;\\nswitch (menu) {\\n    case 1 -> System.out.println("Start Game");\\n    case 2 -> System.out.println("Load Save");\\n    case 3 -> System.out.println("Settings");\\n    default -> System.out.println("Exit");\\n}</code><br/><br/><strong>Intermediate (String Input Parsing):</strong><br/>Harness Switch mechanisms to categorize input strings rapidly bypassing massive char matching logic checks.<br/><code class="font-mono">String action = "JUMP";\\nswitch(action) {\\n     case "RUN" -> moveFast();\\n     case "JUMP" -> applyGravity();\\n     default -> idleAnimation();\\n}</code><br/><br/><strong>Advanced (Multi-Match Cascading):</strong><br/>Using modern Java features to group multiple cases into a single line for tremendous structural efficiency.<br/><code class="font-mono">int month = 2;\\nswitch (month) {\\n    case 1, 3, 5, 7, 8, 10, 12 -> System.out.println("31 Days");\\n    case 4, 6, 9, 11 -> System.out.println("30 Days");\\n    case 2 -> System.out.println("28 or 29 Days");\\n}</code>' },`
);

fs.writeFileSync(path, data);
console.log('Expanded examples across all 6 lessons');
