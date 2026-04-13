const fs = require('fs');
const path = require('path');

const dir = './';
const files = fs.readdirSync(dir).filter(f => f.endsWith('_seed.js'));

for (const file of files) {
  let content = fs.readFileSync(path.join(dir, file), 'utf8');
  
  if (content.includes('let lessonStub = (mod.lessons || []).find')) {
    // Has lessonStub logic. Just fix the lessonId line.
    content = content.replace(/const lessonId = new ObjectId\([^)]+\);/, 'const lessonId = lessonStub._id;');
  } else {
    // Need to inject lessonStub lookup
    const replacePattern = /(const moduleId = mod\._id;\s*const courseId = course\._id;\s*)const lessonId = new ObjectId\([^)]+\);/;
    const injection = `$1let lessonStub = (mod.lessons || []).find(l => l.title === LESSON_TITLE);
    if (!lessonStub) {
      console.log('✅ Lesson stub created or missing');
      // For fallback we can just use the old ID if not found, but we want to fail fast 
      // ACTUALLY better to create one if missing:
      lessonStub = { _id: new ObjectId(), title: LESSON_TITLE };
      // but let's just abort so we know something is wrong
      console.error('❌ Lesson stub "' + LESSON_TITLE + '" not found.');
      return;
    }
    const lessonId = lessonStub._id;`;
    
    content = content.replace(replacePattern, injection);
  }

  // Also fix any other stray `new ObjectId(LESSON_ID)` if present
  content = content.replace(/_id: new ObjectId\(LESSON_ID\),/g, '_id: lessonId,');

  fs.writeFileSync(path.join(dir, file), content, 'utf8');
}
console.log('Done fixing seeds');
