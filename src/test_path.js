const fs = require('fs');
const path = require('path');
const file = path.join(__dirname, '../public/images/java_method_conceptual_flow_1773498747923.png');
console.log('Checking file:', file);
console.log('Exists:', fs.existsSync(file));
if (fs.existsSync(file)) {
  console.log('Stats:', fs.statSync(file));
}
