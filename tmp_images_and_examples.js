const fs = require('fs');
const path = 'scripts/seed/m04_conditional_statements.js';
let data = fs.readFileSync(path, 'utf8');

// 1. Fix Lesson 1 Image
data = data.replace(
    /conditional_if_flowchart_white\.png/,
    'conditional_intro_white.png'
);

// 2. Fix Lesson 2 (If statement) Image injection
data = data.replace(
    /({ type: 'section', title: '7\. Code execution explanation', rich: ')(The CPU checks the variable in memory\.)/g,
    '$1<div class="my-4"><img src="/assets/conditional_if_flowchart_white.png" alt="Java If Flowchart" class="rounded-lg shadow-md border border-gray-100" /></div>$2'
);

// 3. Fix Lesson 4 (Else-If Ladder) Image injection
data = data.replace(
    /({ type: 'section', title: '7\. Code execution explanation', rich: ')(Linear sequential evaluation starts)/g,
    '$1<div class="my-4"><img src="/assets/conditional_else_if_ladder_white.png" alt="Java Else-If Ladder" class="rounded-lg shadow-md border border-gray-100" /></div>$2'
);

// 4. Fix Lesson 5 (Nested If) Image injection - Wait, this one uses 'text:' instead of 'rich:' in the original!
data = data.replace(
    /{ type: 'section', title: '7\. Code execution explanation', text: 'The machine evaluates/g,
    `{ type: 'section', title: '7. Code execution explanation', rich: '<div class="my-4"><img src="/assets/conditional_nested_if_white.png" alt="Java Nested If Flowchart" class="rounded-lg shadow-md border border-gray-100" /></div>The machine evaluates`
);

// 5. Expand Step-By-Step Examples for all 6!
// For Lesson 1:
data = data.replace(
    /({ type: 'section', title: '6\. Step-by-step examples', rich: '[^}]+' \},)/g,
    `$1\n                { type: 'section', title: '6b. String Verification Example', rich: 'Let us build a weather check!\\n<br/><strong>Step 1:</strong> Declare a String.<br/><strong>Step 2:</strong> Check logic equality.<br/><strong>Step 3:</strong> Print result.', code: 'String weather = "Rain";\\nif (weather.equals("Rain")) {\\n    System.out.println("Take Umbrella!");\\n}' },`
);

// For Lessons using `text:` for step-by-step (which is almost all the rest)
data = data.replace(
    /({ type: 'section', title: '6\. Step-by-step examples', text: 'Let\\'s write an absolute value checker\.[^}]+' \},)/g,
    `$1\n                { type: 'section', title: '6b. Another Step-by-step Example', rich: 'Let us determine if a player is at max level.\\n<br/><strong>Step 1:</strong> Declare max level threshold.\\n<br/><strong>Step 2:</strong> Use equality <code class="font-mono">==</code> to check memory.\\n<br/><strong>Step 3:</strong> Execute the block if true.', code: 'int level = 99;\\nif (level == 99) {\\n    System.out.println("Max Level Reached!");\\n}' },`
);

data = data.replace(
    /({ type: 'section', title: '6\. Step-by-step examples', text: 'Let\\'s evaluate an exam grader that grants a Pass or a Fail\.[^}]+' \},)/g,
    `$1\n                { type: 'section', title: '6b. Second Step-by-step Example', rich: 'Discount application logic.\\n<br/><strong>Step 1:</strong> Set a price.\\n<br/><strong>Step 2:</strong> If > 50, Apply discount...\\n<br/><strong>Step 3:</strong> Else, charge full.', code: 'double cart = 45.0;\\nif (cart >= 50.0) {\\n    System.out.println("Free Shipping!");\\n} else {\\n    System.out.println("Shipping: $5.99");\\n}' },`
);

data = data.replace(
    /({ type: 'section', title: '6\. Step-by-step examples', text: 'Let\\'s evaluate an engine temperature sensor\.[^}]+' \},)/g,
    `$1\n                { type: 'section', title: '6b. Subscription Tier Example', rich: 'Tiered user capabilities.\\n<br/><strong>Step 1:</strong> Read user tier level.\\n<br/><strong>Step 2:</strong> Match highest bracket first.\\n<br/><strong>Step 3:</strong> Cascade downward to default.', code: 'int subLevel = 2;\\nif (subLevel == 3) {\\n    System.out.println("Ultimate Access");\\n} else if (subLevel == 2) {\\n    System.out.println("Pro Access");\\n} else {\\n    System.out.println("Basic Access");\\n}' },`
);

data = data.replace(
    /({ type: 'section', title: '6\. Step-by-step examples', text: 'Let us build a VIP concert admission checker\.[^}]+' \},)/g,
    `$1\n                { type: 'section', title: '6b. Nested Game Menu Example', rich: 'Nested checks for a game menu.\\n<br/><strong>Step 1:</strong> Check if Game is Paused.\\n<br/><strong>Step 2:</strong> Inside that, check Menu option.\\n<br/><strong>Step 3:</strong> Execute.', code: 'boolean isPaused = true;\\nString menuSelect = "Options";\\nif (isPaused) {\\n    if (menuSelect.equals("Options")) {\\n        System.out.println("Opening Options...");\\n    }\\n}' },`
);

data = data.replace(
    /({ type: 'section', title: '6\. Step-by-step examples', text: 'Let us build a quick Day of the Week display handler!' \},|{ type: 'section', title: '6\. Step-by-step examples', text: 'Let us build a quick Day of the Week display handler!', code: '[^}]+' \},)/g,
    `$1\n                { type: 'section', title: '6b. Game State Switch Example', rich: 'Let\\'s route game logic states.\\n<br/><strong>Step 1:</strong> Capture State String.\\n<br/><strong>Step 2:</strong> Route with modern switch.\\n<br/><strong>Step 3:</strong> Handle default fallback.', code: 'String state = "COMBAT";\\nswitch (state) {\\n    case "IDLE" -> System.out.println("Playing Idle Anim");\\n    case "COMBAT" -> System.out.println("Drawing Weapons");\\n    default -> System.out.println("Loading...");\\n}' },`
);

fs.writeFileSync(path, data);
console.log("Images injected and additional step-by-step examples deployed!");
