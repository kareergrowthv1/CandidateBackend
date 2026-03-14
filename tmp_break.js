const fs = require('fs');
const path = 'scripts/seed/m04_conditional_statements.js';
let data = fs.readFileSync(path, 'utf8');

// Add breaking spaces before answers
data = data.replace(/<strong>Answer:<\/strong>/g, '<br/><br/><strong>Answer:</strong>');

// Add breaking spaces before steps
data = data.replace(/<strong>Step 1:<\/strong>/g, '<br/><strong>Step 1:</strong>');
data = data.replace(/<strong>Step 2:<\/strong>/g, '<br/><strong>Step 2:</strong>');
data = data.replace(/<strong>Step 3:<\/strong>/g, '<br/><strong>Step 3:</strong>');

fs.writeFileSync(path, data);
console.log('Fixed formatting spacings');
