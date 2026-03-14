/** Module 15 — Pass by Reference (generated) */
const { seedModule } = require('./_helpers');
seedModule({
    moduleTitle: 'Pass by Reference',
    moduleOrder: 15,
    description: 'Object references; behavior in methods.',
    label: 'PASS_REF',
    lessons: [
        { title: 'Object Reference Passing', duration: '32 min', sections: [
            { type: 'section', title: '1. Goals', text: 'Object Reference Passing: from basics to professional use — syntax, JVM/runtime behavior, and pitfalls.' },
            { type: 'section', title: '2. Core concepts', list: ['Read official Java docs for this topic.', 'Write small main() experiments.', 'Use debugger / println to verify.'] },
            { type: 'section', title: '3. Example', code: '// Object Reference Passing\npublic class Main {\n  public static void main(String[] a) {\n    System.out.println("Object Reference Passing");\n  }\n}' },
            { type: 'section', title: '4. Pro level', text: 'Combine with unit tests, clear naming, and API contracts when building real features.' },
            { type: 'task', value: '<strong>Task</strong><br/>Print line containing <code class="font-mono">Topic: Object Reference Passing</code>.', hints: ['println'], points: 6 },
            { type: 'task', value: '<strong>Task 2</strong><br/>Print <code class="font-mono">Done: true</code>.', hints: ['boolean'], points: 6 },
        ], validation: [{ index: 1, match: 'Topic:', matchCode: 'println' }, { index: 2, match: 'Done:\\s*true', matchCode: 'true' }] },
        { title: 'Behavior of Objects in Methods', duration: '32 min', sections: [
            { type: 'section', title: '1. Goals', text: 'Behavior of Objects in Methods: from basics to professional use — syntax, JVM/runtime behavior, and pitfalls.' },
            { type: 'section', title: '2. Core concepts', list: ['Read official Java docs for this topic.', 'Write small main() experiments.', 'Use debugger / println to verify.'] },
            { type: 'section', title: '3. Example', code: '// Behavior of Objects in Methods\npublic class Main {\n  public static void main(String[] a) {\n    System.out.println("Behavior of Objects in Methods");\n  }\n}' },
            { type: 'section', title: '4. Pro level', text: 'Combine with unit tests, clear naming, and API contracts when building real features.' },
            { type: 'task', value: '<strong>Task</strong><br/>Print line containing <code class="font-mono">Topic: Behavior of Objects in Methods</code>.', hints: ['println'], points: 6 },
            { type: 'task', value: '<strong>Task 2</strong><br/>Print <code class="font-mono">Done: true</code>.', hints: ['boolean'], points: 6 },
        ], validation: [{ index: 1, match: 'Topic:', matchCode: 'println' }, { index: 2, match: 'Done:\\s*true', matchCode: 'true' }] },
        { title: 'Reference Handling', duration: '32 min', sections: [
            { type: 'section', title: '1. Goals', text: 'Reference Handling: from basics to professional use — syntax, JVM/runtime behavior, and pitfalls.' },
            { type: 'section', title: '2. Core concepts', list: ['Read official Java docs for this topic.', 'Write small main() experiments.', 'Use debugger / println to verify.'] },
            { type: 'section', title: '3. Example', code: '// Reference Handling\npublic class Main {\n  public static void main(String[] a) {\n    System.out.println("Reference Handling");\n  }\n}' },
            { type: 'section', title: '4. Pro level', text: 'Combine with unit tests, clear naming, and API contracts when building real features.' },
            { type: 'task', value: '<strong>Task</strong><br/>Print line containing <code class="font-mono">Topic: Reference Handling</code>.', hints: ['println'], points: 6 },
            { type: 'task', value: '<strong>Task 2</strong><br/>Print <code class="font-mono">Done: true</code>.', hints: ['boolean'], points: 6 },
        ], validation: [{ index: 1, match: 'Topic:', matchCode: 'println' }, { index: 2, match: 'Done:\\s*true', matchCode: 'true' }] },
    ],
}).catch(console.error);
