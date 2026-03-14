const fs = require('fs');
const path = 'scripts/seed/m04_conditional_statements.js';
let data = fs.readFileSync(path, 'utf8');

// Replace raw '< ' or ' < ' with '&lt; '
data = data.replace(/ < /g, ' &lt; ');
data = data.replace(/< 0/g, '&lt; 0');
data = data.replace(/< 25/g, '&lt; 25');
data = data.replace(/< 30/g, '&lt; 30');

// Change text: to rich: if the line contains code or strong tags
const lines = data.split('\n');
const fixed = lines.map(line => {
    if (line.includes("text:") && (line.includes("<code") || line.includes("<strong>"))) {
        return line.replace("text:", "rich:");
    }
    return line;
});

fs.writeFileSync(path, fixed.join('\n'));
console.log('Fixed tags');
