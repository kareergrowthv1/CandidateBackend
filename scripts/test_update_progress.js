const { updateCandidateProgress, getCandidateProgress } = require('../src/services/programmingService');

async function test() {
    try {
        const candidateId = '123'; // Replace with a real one
        const slug = 'java';
        
        let p = await getCandidateProgress(candidateId, slug);
        console.log('Initial:', JSON.stringify(p, null, 2));

        if (!p) {
            console.log('Not found, testing updateCandidateProgress anyway to see if it starts course...');
        }

        const res = await updateCandidateProgress(candidateId, slug, {
            'lastLessonId': 'lesson_xyz',
            'savedCode.lesson_xyz': 'System.out.println("Hello");'
        });

        console.log('Update Result:', res);

        p = await getCandidateProgress(candidateId, slug);
        console.log('Updated:', JSON.stringify(p, null, 2));

    } catch (err) {
        console.error('Err:', err);
    } finally {
        process.exit();
    }
}

test();
