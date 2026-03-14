const axios = require('axios');

async function testResume() {
    try {
        const slug = 'java';
        const courseRes = await axios.get(`http://localhost:8003/api/programming/courses/${slug}`);
        const course = courseRes.data;
        
        console.log('Course fetched, first lesson:', course.modules?.[0]?.lessons?.[0]);

    } catch (e) {
        console.error('Error:', e.message);
    }
}

testResume();
