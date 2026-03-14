const fs = require('fs');

const { lessons_1_3 } = require('./scripts/seed/m05_part1.js');
const { lessons_4_5 } = require('./scripts/seed/m05_part2.js');
const { lessons_6_7 } = require('./scripts/seed/m05_part3.js');

const allLessons = [
    ...lessons_1_3,
    ...lessons_4_5,
    ...lessons_6_7
];

const fileContent = `/**
 * Module 5 — Loop Statements
 * node scripts/seed/m05_loop_statements.js
 */
const { seedModule, TABLE } = require('./_helpers');

const T_LOOPS = TABLE(\`<thead><tr class="bg-gray-50 border-b"><th class="px-4 py-2 border-r">Loop Construct</th><th class="px-4 py-2">Typical Use Case</th></tr></thead>
<tbody><tr><td class="px-4 py-2 border-r font-mono">for</td><td class="px-4 py-2">When you know exactly how many iterations are needed beforehand. </td></tr>
<tr><td class="px-4 py-2 border-r font-mono">while</td><td class="px-4 py-2">When you want to repeat based on a logical state that changes during execution.</td></tr>
<tr><td class="px-4 py-2 border-r font-mono">do-while</td><td class="px-4 py-2">When you MUST execute the block at least once, primarily for menus and user input loops.</td></tr></tbody>\`);

seedModule({
    moduleTitle: 'Loop Statements',
    moduleOrder: 5,
    description: 'Master iterative control flow architectures including while, do-while, deeply nested for loops, and runtime structural breaks.',
    label: 'LOOPS',
    lessons: ${JSON.stringify(allLessons, null, 4)}
}).catch(console.error);
`;

fs.writeFileSync('scripts/seed/m05_loop_statements.js', fileContent);
console.log("Successfully rebuilt scripts/seed/m05_loop_statements.js");
