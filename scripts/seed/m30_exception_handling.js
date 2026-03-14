/** Module 30 — Exception Handling (generated) */
const { seedModule } = require('./_helpers');
seedModule({
    moduleTitle: 'Exception Handling',
    moduleOrder: 30,
    description: 'try catch finally throw throws custom.',
    label: 'EXCEPTIONS',
    lessons: [
        { title: 'Introduction to Exceptions', duration: '32 min', sections: [
            { type: 'section', title: '1. Goals', text: 'Introduction to Exceptions: from basics to professional use — syntax, JVM/runtime behavior, and pitfalls.' },
            { type: 'section', title: '2. Core concepts', list: ['Read official Java docs for this topic.', 'Write small main() experiments.', 'Use debugger / println to verify.'] },
            { type: 'section', title: '3. Example', code: '// Introduction to Exceptions\npublic class Main {\n  public static void main(String[] a) {\n    System.out.println("Introduction to Exceptions");\n  }\n}' },
            { type: 'section', title: '4. Pro level', text: 'Combine with unit tests, clear naming, and API contracts when building real features.' },
            { type: 'task', value: '<strong>Task</strong><br/>Print line containing <code class="font-mono">Topic: Introduction to Exceptions</code>.', hints: ['println'], points: 6 },
            { type: 'task', value: '<strong>Task 2</strong><br/>Print <code class="font-mono">Done: true</code>.', hints: ['boolean'], points: 6 },
        ], validation: [{ index: 1, match: 'Topic:', matchCode: 'println' }, { index: 2, match: 'Done:\\s*true', matchCode: 'true' }] },
        { title: 'try-catch', duration: '32 min', sections: [
            { type: 'section', title: '1. Goals', text: 'try-catch: from basics to professional use — syntax, JVM/runtime behavior, and pitfalls.' },
            { type: 'section', title: '2. Core concepts', list: ['Read official Java docs for this topic.', 'Write small main() experiments.', 'Use debugger / println to verify.'] },
            { type: 'section', title: '3. Example', code: '// try-catch\npublic class Main {\n  public static void main(String[] a) {\n    System.out.println("try-catch");\n  }\n}' },
            { type: 'section', title: '4. Pro level', text: 'Combine with unit tests, clear naming, and API contracts when building real features.' },
            { type: 'task', value: '<strong>Task</strong><br/>Print line containing <code class="font-mono">Topic: try-catch</code>.', hints: ['println'], points: 6 },
            { type: 'task', value: '<strong>Task 2</strong><br/>Print <code class="font-mono">Done: true</code>.', hints: ['boolean'], points: 6 },
        ], validation: [{ index: 1, match: 'Topic:', matchCode: 'println' }, { index: 2, match: 'Done:\\s*true', matchCode: 'true' }] },
        { title: 'finally', duration: '32 min', sections: [
            { type: 'section', title: '1. Goals', text: 'finally: from basics to professional use — syntax, JVM/runtime behavior, and pitfalls.' },
            { type: 'section', title: '2. Core concepts', list: ['Read official Java docs for this topic.', 'Write small main() experiments.', 'Use debugger / println to verify.'] },
            { type: 'section', title: '3. Example', code: '// finally\npublic class Main {\n  public static void main(String[] a) {\n    System.out.println("finally");\n  }\n}' },
            { type: 'section', title: '4. Pro level', text: 'Combine with unit tests, clear naming, and API contracts when building real features.' },
            { type: 'task', value: '<strong>Task</strong><br/>Print line containing <code class="font-mono">Topic: finally</code>.', hints: ['println'], points: 6 },
            { type: 'task', value: '<strong>Task 2</strong><br/>Print <code class="font-mono">Done: true</code>.', hints: ['boolean'], points: 6 },
        ], validation: [{ index: 1, match: 'Topic:', matchCode: 'println' }, { index: 2, match: 'Done:\\s*true', matchCode: 'true' }] },
        { title: 'throw', duration: '32 min', sections: [
            { type: 'section', title: '1. Goals', text: 'throw: from basics to professional use — syntax, JVM/runtime behavior, and pitfalls.' },
            { type: 'section', title: '2. Core concepts', list: ['Read official Java docs for this topic.', 'Write small main() experiments.', 'Use debugger / println to verify.'] },
            { type: 'section', title: '3. Example', code: '// throw\npublic class Main {\n  public static void main(String[] a) {\n    System.out.println("throw");\n  }\n}' },
            { type: 'section', title: '4. Pro level', text: 'Combine with unit tests, clear naming, and API contracts when building real features.' },
            { type: 'task', value: '<strong>Task</strong><br/>Print line containing <code class="font-mono">Topic: throw</code>.', hints: ['println'], points: 6 },
            { type: 'task', value: '<strong>Task 2</strong><br/>Print <code class="font-mono">Done: true</code>.', hints: ['boolean'], points: 6 },
        ], validation: [{ index: 1, match: 'Topic:', matchCode: 'println' }, { index: 2, match: 'Done:\\s*true', matchCode: 'true' }] },
        { title: 'throws', duration: '32 min', sections: [
            { type: 'section', title: '1. Goals', text: 'throws: from basics to professional use — syntax, JVM/runtime behavior, and pitfalls.' },
            { type: 'section', title: '2. Core concepts', list: ['Read official Java docs for this topic.', 'Write small main() experiments.', 'Use debugger / println to verify.'] },
            { type: 'section', title: '3. Example', code: '// throws\npublic class Main {\n  public static void main(String[] a) {\n    System.out.println("throws");\n  }\n}' },
            { type: 'section', title: '4. Pro level', text: 'Combine with unit tests, clear naming, and API contracts when building real features.' },
            { type: 'task', value: '<strong>Task</strong><br/>Print line containing <code class="font-mono">Topic: throws</code>.', hints: ['println'], points: 6 },
            { type: 'task', value: '<strong>Task 2</strong><br/>Print <code class="font-mono">Done: true</code>.', hints: ['boolean'], points: 6 },
        ], validation: [{ index: 1, match: 'Topic:', matchCode: 'println' }, { index: 2, match: 'Done:\\s*true', matchCode: 'true' }] },
        { title: 'Custom Exceptions', duration: '32 min', sections: [
            { type: 'section', title: '1. Goals', text: 'Custom Exceptions: from basics to professional use — syntax, JVM/runtime behavior, and pitfalls.' },
            { type: 'section', title: '2. Core concepts', list: ['Read official Java docs for this topic.', 'Write small main() experiments.', 'Use debugger / println to verify.'] },
            { type: 'section', title: '3. Example', code: '// Custom Exceptions\npublic class Main {\n  public static void main(String[] a) {\n    System.out.println("Custom Exceptions");\n  }\n}' },
            { type: 'section', title: '4. Pro level', text: 'Combine with unit tests, clear naming, and API contracts when building real features.' },
            { type: 'task', value: '<strong>Task</strong><br/>Print line containing <code class="font-mono">Topic: Custom Exceptions</code>.', hints: ['println'], points: 6 },
            { type: 'task', value: '<strong>Task 2</strong><br/>Print <code class="font-mono">Done: true</code>.', hints: ['boolean'], points: 6 },
        ], validation: [{ index: 1, match: 'Topic:', matchCode: 'println' }, { index: 2, match: 'Done:\\s*true', matchCode: 'true' }] },
    ],
}).catch(console.error);
