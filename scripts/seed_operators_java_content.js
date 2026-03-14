/**
 * Seed Java course — Operators module (rich LMS content)
 * 9 Lessons, 2 Articles, 3 Projects
 * Run: node scripts/seed_operators_java_content.js
 */
const { MongoClient, ObjectId } = require('mongodb');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

const MONGO_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017';
const DB_NAME = 'Programming';

const T = (inner) => `<div class="overflow-x-auto my-4 border border-gray-100 rounded-md shadow-sm"><table class="min-w-full text-sm border-collapse">${inner}</table></div>`;
const H = (...v) => ({ type: 'hint', value: v });

const MAIN = `public class Main {\n    public static void main(String[] args) {\n        // Your code\n    }\n}`;

async function seed() {
    const client = new MongoClient(MONGO_URI);
    try {
        await client.connect();
        const db = client.db(DB_NAME);
        const lessonsCol = db.collection('Lessons');
        const coursesCol = db.collection('Courses');

        const course = await coursesCol.findOne({ slug: 'java' });
        if (!course) {
            console.error('❌ Course slug java not found');
            return;
        }
        const courseId = course._id;
        let mod = (course.modules || []).find((m) => m.title === 'Operators');
        const maxOrder = Math.max(0, ...(course.modules || []).map((m) => m.order || 0));

        if (!mod) {
            mod = {
                _id: new ObjectId(),
                courseId,
                order: maxOrder + 1,
                title: 'Operators',
                description: 'Learn about operators in Java.',
                lessons: [],
                items: [],
            };
            await coursesCol.updateOne({ _id: courseId }, { $push: { modules: mod } });
            console.log('✅ Created Operators module');
        }

        const moduleId = mod._id;
        const titles = [
            'Introduction to Operators',
            'Arithmetic Operators',
            'Relational Operators',
            'Logical Operators',
            'Assignment Operators',
            'Unary Operators',
            'Ternary Operator',
            'Bitwise and Shift Operators',
            'Advanced Operators',
        ];
        let embedded = [...(mod.lessons || [])];
        const stubs = {};
        titles.forEach((title, i) => {
            let s = embedded.find((l) => l.title === title);
            if (!s) {
                s = { _id: new ObjectId(), moduleId, courseId, order: i + 1, type: 'lesson', title, duration: '40 min', language: 'java' };
                embedded.push(s);
            }
            stubs[title] = s;
        });

        const label = 'OPERATORS';
        const L = (title, duration, content, validationCriteria) => ({
            _id: stubs[title]._id,
            moduleId,
            courseId,
            order: titles.indexOf(title) + 1,
            type: 'lesson',
            title,
            duration,
            language: 'java',
            isTerminal: false,
            fileName: 'Main.java',
            starterCode: MAIN,
            content,
            validationCriteria,
        });

        const lessons = [
            L('Introduction to Operators', '45 min', [
                { type: 'label', value: label },
                { type: 'heading', value: 'Introduction to Operators' },
                { type: 'duration', value: '45 min' },
                { type: 'text', value: 'Operators are symbols that combine or transform values (operands). Every expression you write—math, conditions, assignments—relies on operators. Understanding categories and precedence is what separates beginner code from predictable, professional code.' },
                { type: 'section_heading', value: '1. Sub-concepts: what is an operator?' },
                { type: 'list', value: [
                    '<strong>Unary</strong> — one operand (<code class="bg-gray-100 px-1 rounded font-mono">++x</code>, <code class="font-mono">!b</code>).',
                    '<strong>Binary</strong> — two operands (<code class="font-mono">a + b</code>, <code class="font-mono">x &lt; y</code>).',
                    '<strong>Ternary</strong> — three parts (<code class="font-mono">c ? a : b</code>).',
                    '<strong>Side effects</strong> — assignment and <code class="font-mono">++</code> change memory; pure arithmetic on primitives does not.' ] },
                { type: 'section_heading', value: '2. Operands & expressions' },
                { type: 'text', value: 'An operand can be a literal, variable, or another expression. The Java compiler builds an expression tree; evaluation order follows precedence and associativity.' },
                { type: 'code_block', language: 'java', value: '// Example 1: literals\nint a = 3 + 4;\n\n// Example 2: variables as operands\nint b = a * 2;\n\n// Example 3: nested expressions\nint c = (a + b) / 2;' },
                { type: 'section_heading', value: '3. Why operators matter (practical)' },
                { type: 'list', value: [
                    '<strong>Business logic</strong> — discounts, tax, scoring.',
                    '<strong>Control flow</strong> — relational + logical drive if/while.',
                    '<strong>Performance</strong> — integer ops vs double; avoid repeated work in conditions.' ] },
                { type: 'section_heading', value: '4. Category overview (table)' },
                { type: 'rich_text', value: T(`<thead><tr class="bg-gray-50 border-b"><th class="px-6 py-3 text-left border-r font-semibold">Category</th><th class="px-6 py-3 text-left border-r font-semibold">Role</th><th class="px-6 py-3 text-left font-semibold">Examples</th></tr></thead><tbody class="divide-y">
<tr><td class="px-6 py-3 border-r font-bold bg-gray-50/50">Arithmetic</td><td class="px-6 py-3 border-r">Numeric math</td><td class="px-6 py-3 font-mono">+ - * / %</td></tr>
<tr><td class="px-6 py-3 border-r font-bold bg-gray-50/50">Relational</td><td class="px-6 py-3 border-r">Compare → boolean</td><td class="px-6 py-3 font-mono">== != &lt; &gt; &lt;= &gt;=</td></tr>
<tr><td class="px-6 py-3 border-r font-bold bg-gray-50/50">Logical</td><td class="px-6 py-3 border-r">Combine booleans</td><td class="px-6 py-3 font-mono">&amp;&amp; || !</td></tr>
<tr><td class="px-6 py-3 border-r font-bold bg-gray-50/50">Assignment</td><td class="px-6 py-3 border-r">Store / update</td><td class="px-6 py-3 font-mono">= += *= …</td></tr>
<tr><td class="px-6 py-3 border-r font-bold bg-gray-50/50">Unary</td><td class="px-6 py-3 border-r">Single value</td><td class="px-6 py-3 font-mono">++ -- + - !</td></tr>
<tr><td class="px-6 py-3 border-r font-bold bg-gray-50/50">Ternary</td><td class="px-6 py-3 border-r">Inline if/else</td><td class="px-6 py-3 font-mono">? :</td></tr>
<tr><td class="px-6 py-3 border-r font-bold bg-gray-50/50">Bitwise/Shift</td><td class="px-6 py-3 border-r">Bit manipulation</td><td class="px-6 py-3 font-mono">~ &amp; | ^ &lt;&lt; &gt;&gt; &gt;&gt;&gt;</td></tr>
</tbody>`) },
                { type: 'section_heading', value: '5. Evaluation order (preview)' },
                { type: 'text', value: 'Parentheses override everything. Without them, * / % bind tighter than + -. We cover full precedence in the article “Operator Precedence in Java”.' },
                { type: 'code_block', language: 'java', value: 'int x = 2 + 3 * 4;   // 14, not 20\nint y = (2 + 3) * 4; // 20' },
                { type: 'section_heading', value: '6. Practical Examples' },
                { type: 'text', value: '<strong>Basic operator example:</strong>' },
                { type: 'code_block', language: 'java', value: 'int sum = 10 + 5; // Basic addition' },
                { type: 'text', value: '<strong>Expression evaluation example:</strong>' },
                { type: 'code_block', language: 'java', value: 'int total = sum * 2; // Expression relies on variables' },
                { type: 'text', value: '<strong>Multiple operator example:</strong>' },
                { type: 'code_block', language: 'java', value: 'int complex = (10 + 5) * 2 - 4;' },
                
                { type: 'section_heading', value: '7. Operand Types & Expression Tree' },
                { type: 'text', value: 'Operands can be variables, literals, method calls, or other expressions. The Java compiler builds an expression tree internally to evaluate these in order of precedence.' },
                { type: 'code_block', language: 'java', value: 'int result = (5 + 3) * getNumber(); // Parens first, then method call, then multiply' },
                
                { type: 'section_heading', value: '8. Operator Categories Deep Explanation' },
                { type: 'text', value: '<strong>Arithmetic:</strong> Math computation. <strong>Relational:</strong> Comparing states boundaries. <strong>Logical:</strong> Combining boolean conditions. <strong>Assignment:</strong> Storing state in memory. <strong>Bitwise:</strong> Directly manipulating memory bits for peak performance.' },
                
                { type: 'section_heading', value: '9. Additional Real World Examples' },
                { type: 'text', value: 'Operators are the nervous system of algorithms. Real use cases: Price calculation (Arithmetic), Login validation (Relational & Logical), Score calculation (Assignment), Discount system (Ternary).' },

                { type: 'section_heading', value: '10. Common Beginner Mistakes' },
                { type: 'list', value: [ 'Confusing assignment <code>=</code> with equality <code>==</code>. Writing <code class="font-mono">if (x = 10)</code> causes a compilation error (or bug if boolean).', 'Forgetting parentheses in complex math.' ] },
                
                { type: 'section_heading', value: '11. Best Practices & Debugging' },
                { type: 'list', value: [ '<strong>Best Practice:</strong> Always use parentheses for clarity even when precedence rules apply.', '<strong>Debugging:</strong> Break down complex expressions into multiple lines and print intermediate variables.'] },
                
                { type: 'section_heading', value: '12. Interview Questions' },
                { type: 'list', value: [ 'Q: What is the difference between = and == in Java?', 'Q: How are expressions parsed internally by the JVM (expression trees)?' ] },

                { type: 'section_heading', value: 'Instructions' },
                { type: 'checkpoint', index: 1, points: 6, value: '<strong>Task 1</strong><br/>Declare <code class="font-mono">int a = 7</code>, <code class="font-mono">int b = 8</code>. Print <code class="font-mono">Sum: 15</code>.', content: [H({ type: 'text', value: 'Use + and println with label Sum:' })] },
                { type: 'checkpoint', index: 2, points: 6, value: '<strong>Task 2</strong><br/>Print the value of <code class="font-mono">(10 + 20) * 2</code> with label <code class="font-mono">Expr: 60</code>.', content: [H({ type: 'text', value: 'Parentheses first, then multiply.' })] },
                { type: 'checkpoint', index: 3, points: 8, value: '<strong>Task 3</strong><br/>Print <code class="font-mono">Precedence demo: 14</code> for expression <code class="font-mono">2 + 3 * 4</code> (no parens).', content: [H({ type: 'code_block', language: 'java', value: 'System.out.println("Precedence demo: " + (2 + 3 * 4));' })] },
                { type: 'checkpoint', index: 4, points: 7, value: '<strong>Task 4</strong><br/>Declare <code class="font-mono">boolean isValid = false</code>. Update it using an assignment operator <code class="font-mono">isValid = true</code>. Print <code class="font-mono">Valid: true</code>.', content: [H({ type: 'text', value: 'isValid = true;' })] },
                { type: 'checkpoint', index: 5, points: 7, value: '<strong>Task 5</strong><br/>Write an expression that uses parens first: <code class="font-mono">(10 - 2) * 3</code>. Print <code class="font-mono">ParenCalc: 24</code>.', content: [H({ type: 'text', value: 'System.out.println("ParenCalc: " + ((10 - 2) * 3));' })] },
                { type: 'checkpoint', index: 6, points: 15, value: '<strong>Challenge Task</strong><br/>Combine assignment, arithmetic, and relational: Create <code class="font-mono">int total = 50</code>, add <code class="font-mono">10</code> to it directly, then print <code class="font-mono">IsPassed: true</code> if <code class="font-mono">total == 60</code>.', content: [H({ type: 'text', value: 'total = total + 10; println("IsPassed: " + (total == 60));' })] },
            ], [
                { index: 1, match: 'Sum:\\s*15', matchCode: '\\+' },
                { index: 2, match: 'Expr:\\s*60', matchCode: '\\*' },
                { index: 3, match: 'Precedence demo:\\s*14', matchCode: '3 \\* 4' },
                { index: 4, match: 'Valid:\\s*true', matchCode: 'true' },
                { index: 5, match: 'ParenCalc:\\s*24', matchCode: '\\*' },
                { index: 6, match: 'IsPassed:\\s*true', matchCode: '==' },
            ]),

            L('Arithmetic Operators', '50 min', [
                { type: 'label', value: label },
                { type: 'heading', value: 'Arithmetic Operators' },
                { type: 'duration', value: '50 min' },
                { type: 'text', value: 'Arithmetic operators apply to numeric types. Master int vs double division and modulo—they appear constantly in interviews and real code.' },
                { type: 'section_heading', value: '1. Operator reference (table)' },
                { type: 'rich_text', value: T(`<thead><tr class="bg-gray-50 border-b"><th class="px-6 py-3 border-r font-semibold">Op</th><th class="px-6 py-3 border-r font-semibold">Name</th><th class="px-6 py-3 border-r font-semibold">int example</th><th class="px-6 py-3 font-semibold">Notes</th></tr></thead><tbody class="divide-y">
<tr><td class="px-6 py-3 border-r font-mono font-bold">+</td><td class="px-6 py-3 border-r">Add</td><td class="px-6 py-3 border-r">3+2 → 5</td><td class="px-6 py-3">String + is concat</td></tr>
<tr><td class="px-6 py-3 border-r font-mono font-bold">-</td><td class="px-6 py-3 border-r">Subtract</td><td class="px-6 py-3 border-r">5-2 → 3</td><td class="px-6 py-3">Unary minus: -x</td></tr>
<tr><td class="px-6 py-3 border-r font-mono font-bold">*</td><td class="px-6 py-3 border-r">Multiply</td><td class="px-6 py-3 border-r">4*3 → 12</td><td class="px-6 py-3">Widening to double OK</td></tr>
<tr><td class="px-6 py-3 border-r font-mono font-bold">/</td><td class="px-6 py-3 border-r">Divide</td><td class="px-6 py-3 border-r">7/2 → 3</td><td class="px-6 py-3 text-amber-700">int truncates</td></tr>
<tr><td class="px-6 py-3 border-r font-mono font-bold">%</td><td class="px-6 py-3 border-r">Modulo</td><td class="px-6 py-3 border-r">17%5 → 2</td><td class="px-6 py-3">Sign follows dividend (Java)</td></tr>
</tbody>`) },
                { type: 'section_heading', value: '2. Sub-concept: integer division' },
                { type: 'text', value: 'Two int operands → int result. Decimal part discarded toward zero.' },
                { type: 'code_block', language: 'java', value: 'System.out.println(9 / 2);    // 4\nSystem.out.println(-9 / 2);   // -4' },
                { type: 'section_heading', value: '3. Sub-concept: true decimal division' },
                { type: 'code_block', language: 'java', value: 'System.out.println(9.0 / 2);   // 4.5\nSystem.out.println((double) 9 / 2); // 4.5' },
                { type: 'section_heading', value: '4. Sub-concept: modulo use cases' },
                { type: 'list', value: [
                    '<strong>Even / odd</strong> — <code class="font-mono">n % 2 == 0</code>',
                    '<strong>Circular index</strong> — <code class="font-mono">(i + 1) % length</code>',
                    '<strong>Extract digit</strong> — <code class="font-mono">n % 10</code> (last digit base 10)' ] },
                { type: 'code_block', language: 'java', value: 'boolean even = (14 % 2) == 0; // true' },
                { type: 'section_heading', value: '5. Common mistakes' },
                { type: 'list', value: [
                    'Expecting 2.5 from <code class="font-mono">5/2</code> with int.',
                    'Using <code class="font-mono">%</code> with double without knowing floating-point quirks (prefer int for discrete math).' ] },
                { type: 'section_heading', value: '6. Practical Examples' },
                { type: 'text', value: '<strong>Simple calculator example:</strong> Utilizing +, -, *, / inside a switch statement is common for basic calculators.' },
                { type: 'code_block', language: 'java', value: 'int a = 10, b = 5;\nSystem.out.println("Add: " + (a + b));\nSystem.out.println("Sub: " + (a - b));' },
                { type: 'text', value: '<strong>Percentage calculation:</strong> Multiplying by the percentage and dividing by 100.' },
                { type: 'code_block', language: 'java', value: 'double salary = 50000;\ndouble bonus = (salary * 15) / 100; // 15% bonus' },
                { type: 'text', value: '<strong>Area calculation:</strong> Using multiplication for geometry.' },
                { type: 'code_block', language: 'java', value: 'double length = 10.5, width = 4.0;\ndouble area = length * width;' },

                { type: 'section_heading', value: '7. Numeric Type Promotion & Bounds' },
                { type: 'text', value: 'Mixing types forces promotion to the larger type: <code class="font-mono">int + double → double</code>. Similarly, smaller types like <code class="font-mono">byte + byte</code> automatically promote to <code class="font-mono">int</code> in Java arithmetic. Be wary of <strong>Overflow and Underflow</strong>.' },
                { type: 'code_block', language: 'java', value: 'int x = Integer.MAX_VALUE;\nx = x + 1; // Overflows to negative (Integer.MIN_VALUE)' },
                
                { type: 'section_heading', value: '8. Deep Dive: Integer vs Floating Division' },
                { type: 'text', value: 'Integer division discards any remainder completely (truncation toward zero). By contrast, floating-point division preserves decimal precision. Always ensure at least one operand is a float or double to trigger floating division.' },
                
                { type: 'section_heading', value: '9. Expanded Mathematical Applications' },
                { type: 'text', value: '<strong>Real Programming Apps:</strong> Area of a circle (<code class="font-mono">Math.PI * r * r</code>), BMI calculation (<code class="font-mono">weight / (height * height)</code>), Interest calculation, and Average scores.' },
                { type: 'code_block', language: 'java', value: 'double discount = price * 0.1; // 10% discount on cart' },

                { type: 'section_heading', value: '10. Beginner Mistakes & Debugging' },
                { type: 'list', value: [ '<strong>Mistake:</strong> Division by zero with integers throws <code class="font-mono">ArithmeticException</code>.', '<strong>Debugging:</strong> If <code class="font-mono">5 / 2 -> 2</code> instead of 2.5, cast one element to double: <code class="font-mono">(double) 5 / 2</code>.' ] },
                
                { type: 'section_heading', value: '11. Best Practices & Interview Tips' },
                { type: 'list', value: [ '<strong>Best Practice:</strong> Use <code class="font-mono">double</code> for engineering math, but <code class="font-mono">BigDecimal</code> for strict financial monetary values to avoid rounding issues.', '<strong>Interview Question:</strong> What happens when you add 1 to Integer.MAX_VALUE?' ] },

                { type: 'section_heading', value: 'Instructions' },
                { type: 'checkpoint', index: 1, points: 5, value: '<strong>Task 1</strong><br/>Print <code class="font-mono">Remainder: 2</code> for <code class="font-mono">17 % 5</code>.', content: [H({ type: 'text', value: '% operator' })] },
                { type: 'checkpoint', index: 2, points: 5, value: '<strong>Task 2</strong><br/>int <code class="font-mono">25/4</code> → print <code class="font-mono">IntDiv: 6</code>.', content: [H({ type: 'text', value: 'truncation' })] },
                { type: 'checkpoint', index: 3, points: 8, value: '<strong>Task 3</strong><br/>Print <code class="font-mono">Precise: 6.25</code> using double division <code class="font-mono">25.0 / 4</code>.', content: [H({ type: 'text', value: '25.0 or (double)25' })] },
                { type: 'checkpoint', index: 4, points: 8, value: '<strong>Task 4</strong><br/>Print <code class="font-mono">Even: true</code> for <code class="font-mono">n = 8</code> using <code class="font-mono">%</code>.', content: [H({ type: 'text', value: 'n % 2 == 0' })] },
                { type: 'checkpoint', index: 5, points: 15, value: '<strong>Challenge Task</strong><br/>Demonstrate numeric promotion: add <code class="font-mono">int 5</code> and <code class="font-mono">double 2.5</code>. Print <code class="font-mono">PromoResult: 7.5</code>.', content: [H({ type: 'text', value: 'System.out.println("PromoResult: " + (5 + 2.5));' })] },
            ], [
                { index: 1, match: 'Remainder:\\s*2', matchCode: '%' },
                { index: 2, match: 'IntDiv:\\s*6', matchCode: '/' },
                { index: 3, match: 'Precise:\\s*6\\.25', matchCode: '25\\.0|double' },
                { index: 4, match: 'Even:\\s*true', matchCode: '%' },
                { index: 5, match: 'PromoResult:\\s*7\\.5', matchCode: '\\+' },
            ]),

            L('Relational Operators', '45 min', [
                { type: 'label', value: label },
                { type: 'heading', value: 'Relational Operators' },
                { type: 'duration', value: '45 min' },
                { type: 'text', value: 'Relational operators compare two values and always produce a boolean. They are the bridge between data and control flow (if, while, for).' },
                { type: 'section_heading', value: '1. Full operator table' },
                { type: 'rich_text', value: T(`<thead><tr class="bg-gray-50 border-b"><th class="px-6 py-3 border-r font-semibold">Op</th><th class="px-6 py-3 border-r font-semibold">Meaning</th><th class="px-6 py-3 font-semibold">Typical use</th></tr></thead><tbody class="divide-y">
<tr><td class="px-6 py-3 border-r font-mono">==</td><td class="px-6 py-3 border-r">equal</td><td class="px-6 py-3">Primitives: value</td></tr>
<tr><td class="px-6 py-3 border-r font-mono">!=</td><td class="px-6 py-3 border-r">not equal</td><td class="px-6 py-3">Guards, validation</td></tr>
<tr><td class="px-6 py-3 border-r font-mono">&lt;</td><td class="px-6 py-3 border-r">strictly less</td><td class="px-6 py-3">Ranges, sorting</td></tr>
<tr><td class="px-6 py-3 border-r font-mono">&gt;</td><td class="px-6 py-3 border-r">strictly greater</td><td class="px-6 py-3">Thresholds</td></tr>
<tr><td class="px-6 py-3 border-r font-mono">&lt;=</td><td class="px-6 py-3 border-r">less or equal</td><td class="px-6 py-3">Inclusive bounds</td></tr>
<tr><td class="px-6 py-3 border-r font-mono">&gt;=</td><td class="px-6 py-3 border-r">greater or equal</td><td class="px-6 py-3">Min age, min score</td></tr>
</tbody>`) },
                { type: 'section_heading', value: '2. Examples (ordered)' },
                { type: 'code_block', language: 'java', value: '// Example A\nSystem.out.println(10 == 10); // true\n// Example B\nSystem.out.println(3 < 5);      // true\n// Example C\nSystem.out.println("a".equals("A")); // false (use equals for String content)' },
                { type: 'section_heading', value: '3. == vs = (critical)' },
                { type: 'rich_text', value: T(`<thead><tr class="bg-gray-50 border-b"><th class="px-6 py-3 border-r font-semibold">Symbol</th><th class="px-6 py-3 font-semibold">Role</th></tr></thead><tbody>
<tr><td class="px-6 py-3 border-r font-mono">=</td><td class="px-6 py-3">Assignment — stores value</td></tr>
<tr><td class="px-6 py-3 border-r font-mono">==</td><td class="px-6 py-3">Comparison — yields boolean</td></tr>
</tbody>`) },
                { type: 'section_heading', value: '4. Chaining comparisons (pitfall)' },
                { type: 'text', value: 'Do not write <code class="font-mono">a &lt; b &lt; c</code> like in math. Use <code class="font-mono">a &lt; b && b &lt; c</code>.' },
                { type: 'section_heading', value: '5. Practical Examples' },
                { type: 'text', value: '<strong>Age comparison program:</strong>' },
                { type: 'code_block', language: 'java', value: 'int userAge = 20;\nboolean isAdult = userAge >= 18;' },
                { type: 'text', value: '<strong>Number comparison program:</strong>' },
                { type: 'code_block', language: 'java', value: 'int num1 = 100, num2 = 200;\nboolean isGreater = num1 > num2;' },
                { type: 'text', value: '<strong>Login validation example:</strong>' },
                { type: 'code_block', language: 'java', value: 'int attempts = 3;\nboolean accountLocked = attempts >= 3;' },

                { type: 'section_heading', value: '6. Boolean Logic Explanation & Comparing Different Types' },
                { type: 'text', value: 'The result of any relational operator is always <code class="font-mono">boolean</code> (true or false). You can compare primitives safely: <code class="font-mono">int vs double</code> promotes the int; <code class="font-mono">char vs char</code> compares their ASCII/Unicode numeric values.' },
                { type: 'code_block', language: 'java', value: 'System.out.println(5 == 5.0); // true (promotes)\nSystem.out.println(\\\'a\\\' < \\\'z\\\'); // true (97 < 122)' },

                { type: 'section_heading', value: '7. String Comparison (Critical)' },
                { type: 'text', value: 'Never use <code class="font-mono">==</code> to compare string content. Java might reuse string literals but separate objects reside at different memory addresses. Use <code class="font-mono">equals()</code> or <code class="font-mono">equalsIgnoreCase()</code>.' },
                { type: 'code_block', language: 'java', value: 'String s1 = new String("Java");\nString s2 = "Java";\nSystem.out.println(s1 == s2); // false (different objects)\nSystem.out.println(s1.equals(s2)); // true (same content)' },

                { type: 'section_heading', value: '8. Nested Comparisons & Real World Logic' },
                { type: 'text', value: 'We combine multiple relations with logical operators instead of chaining in math style. Real world uses: UI age validation bounds, Bank balance checks against overdrafts.' },
                { type: 'code_block', language: 'java', value: 'if (age >= 18 && age <= 60) { /* Active labor force bound */ }' },
                
                { type: 'section_heading', value: '9. Beginner Mistakes & Best Practices' },
                { type: 'list', value: [ '<strong>Mistake:</strong> Chaining like <code class="font-mono">1 < x < 10</code>. This is illegal in Java—evaluate pairs with &&.', '<strong>Best Practice:</strong> Always use <code class="font-mono">.equals()</code> for String, and reserve <code class="font-mono">==</code> strictly for primitives and verifying object reference identity.' ] },
                
                { type: 'section_heading', value: '10. Interview Questions & Debugging' },
                { type: 'list', value: [ '<strong>Interview:</strong> What does <code class="font-mono">"hello" == new String("hello")</code> return and why?', '<strong>Debugging:</strong> If an equality check on double or float fails, due to precision issues like <code class="font-mono">0.1 + 0.2 == 0.3</code> (false), compare the absolute difference to an epsilon instead.' ] },

                { type: 'section_heading', value: 'Instructions' },
                { type: 'checkpoint', index: 1, points: 6, value: '<strong>Task 1</strong><br/><code class="font-mono">int age = 20</code>; print <code class="font-mono">Adult: true</code> if <code class="font-mono">age >= 18</code>.', content: [H({ type: 'text', value: '>=' })] },
                { type: 'checkpoint', index: 2, points: 6, value: '<strong>Task 2</strong><br/>Compare <code class="font-mono">"Java"</code> and <code class="font-mono">"java"</code> with <code class="font-mono">==</code> (two string literals in code); print <code class="font-mono">SameRef: false</code> or print result—goal: show <code class="font-mono">false</code> in output.', content: [H({ type: 'text', value: 'System.out.println(("Java" == "java"));' })] },
                { type: 'checkpoint', index: 3, points: 8, value: '<strong>Task 3</strong><br/>Print <code class="font-mono">InBand: true</code> for int <code class="font-mono">x = 5</code> if <code class="font-mono">1 &lt;= x && x &lt;= 10</code>.', content: [H({ type: 'text', value: '&& chain' })] },
                { type: 'checkpoint', index: 4, points: 15, value: '<strong>Challenge Task</strong><br/>Create <code class="font-mono">String p1 = "pwd"</code> and <code class="font-mono">String p2 = new String("pwd")</code>. Print <code class="font-mono">SameRef: false</code> testing with <code class="font-mono">==</code> and <code class="font-mono">SameContent: true</code> using <code class="font-mono">equals()</code>.', content: [H({ type: 'text', value: 'System.out.println("SameRef: " + (p1 == p2)); System.out.println("SameContent: " + (p1.equals(p2)));' })] },
            ], [
                { index: 1, match: 'Adult:\\s*true', matchCode: '>=' },
                { index: 2, match: 'false', matchCode: '==' },
                { index: 3, match: 'InBand:\\s*true', matchCode: '&&' },
                { index: 4, match: 'SameContent:\\s*true', matchCode: 'equals' },
            ]),

            L('Logical Operators', '48 min', [
                { type: 'label', value: label },
                { type: 'heading', value: 'Logical Operators' },
                { type: 'duration', value: '48 min' },
                { type: 'text', value: 'Logical operators combine boolean expressions. Short-circuit evaluation avoids redundant work and prevents null dereference when used carefully.' },
                { type: 'section_heading', value: '1. Truth tables' },
                { type: 'rich_text', value: T(`<thead><tr class="bg-gray-50 border-b"><th class="px-4 py-2 border-r">A</th><th class="px-4 py-2 border-r">B</th><th class="px-4 py-2 border-r">A &amp;&amp; B</th><th class="px-4 py-2">A || B</th></tr></thead><tbody>
<tr><td class="px-4 py-2">T</td><td class="px-4 py-2">T</td><td class="px-4 py-2">T</td><td class="px-4 py-2">T</td></tr>
<tr><td class="px-4 py-2">T</td><td class="px-4 py-2">F</td><td class="px-4 py-2">F</td><td class="px-4 py-2">T</td></tr>
<tr><td class="px-4 py-2">F</td><td class="px-4 py-2">F</td><td class="px-4 py-2">F</td><td class="px-4 py-2">F</td></tr>
</tbody>`) },
                { type: 'section_heading', value: '2. Short-circuit (sub-concept)' },
                { type: 'list', value: [
                    '<strong>&&</strong> — if left is false, right is not evaluated.',
                    '<strong>||</strong> — if left is true, right is not evaluated.',
                    '<strong>Idiom</strong> — <code class="font-mono">if (s != null && s.length() &gt; 0)</code> safe on null s' ] },
                { type: 'code_block', language: 'java', value: 'boolean a = false && expensive(); // expensive() never called\nboolean b = true || expensive();  // never called' },
                { type: 'section_heading', value: '3. NOT operator' },
                { type: 'code_block', language: 'java', value: 'boolean ok = true;\nSystem.out.println(!ok); // false' },
                { type: 'section_heading', value: '4. De Morgan (pro)' },
                { type: 'text', value: '!(A && B) is equivalent to !A || !B. Refactoring conditions often clarifies intent.' },
                { type: 'section_heading', value: '5. Practical Examples' },
                { type: 'text', value: '<strong>Login validation example (Combining conditions):</strong>' },
                { type: 'code_block', language: 'java', value: 'boolean isValidUser = true;\nboolean correctPass = true;\nboolean loggedIn = isValidUser && correctPass;' },
                { type: 'text', value: '<strong>Scholarship eligibility check:</strong>' },
                { type: 'code_block', language: 'java', value: 'double gpa = 3.8;\nint extracurriculars = 3;\nboolean eligible = (gpa >= 3.5) && (extracurriculars >= 2);' },
                { type: 'text', value: '<strong>Range checking program:</strong>' },
                { type: 'code_block', language: 'java', value: 'int temperature = 25;\nboolean isComfortable = (temperature >= 20) && (temperature <= 25);' },

                { type: 'section_heading', value: '6. Boolean Algebra Deep Dive' },
                { type: 'text', value: '<strong>AND (&&):</strong> true only if both are true. <strong>OR (||):</strong> true if at least one is true. <strong>NOT (!):</strong> inverts true to false and vice-versa.' },
                
                { type: 'section_heading', value: '7. Short Circuit Evaluation (Deep)' },
                { type: 'text', value: 'Java evaluates expressions from left to right. With <code class="font-mono">&&</code>, if the left side is <code class="font-mono">false</code>, the entire expression is guaranteed false, hence Java bypasses evaluating the right side.' },
                { type: 'code_block', language: 'java', value: 'if (user != null && user.isActive()) { \n    // Prevents NullPointerException since user.isActive() won\\\'t run if user is null\n}' },
                
                { type: 'section_heading', value: '8. De Morgan\\\'s Law' },
                { type: 'text', value: 'A powerful logical rule to simplify negated expressions: <code class="font-mono">!(A && B)</code> transforms into <code class="font-mono">!A || !B</code>. Similarly, <code class="font-mono">!(A || B)</code> = <code class="font-mono">!A && !B</code>.' },

                { type: 'section_heading', value: '9. Real-World Systems & Beginner Mistakes' },
                { type: 'list', value: [ '<strong>Real-world:</strong> Login validation, Permission systems, Security boundary checks.', '<strong>Mistake:</strong> Using bitwise <code class="font-mono">&</code> and <code class="font-mono">|</code> instead of logical <code class="font-mono">&&</code> and <code class="font-mono">||</code> on booleans; this removes the short-circuit safeguard and forces both sides to evaluate.' ] },
                
                { type: 'section_heading', value: '10. Best Practices & Interview Questions' },
                { type: 'list', value: [ '<strong>Best Practice:</strong> Place the most likely false condition or the fastest-to-check condition on the left side of an <code class="font-mono">&&</code> to maximize short-circuit efficiency.', '<strong>Interview:</strong> What is difference between & and && ? How do you prevent NPE inside an if-statement?' ] },
                
                { type: 'section_heading', value: 'Instructions' },
                { type: 'checkpoint', index: 1, points: 6, value: '<strong>Task 1</strong><br/><code class="font-mono">boolean pwd=true, mfa=true</code>; print <code class="font-mono">LoginOK: true</code> only if both (&&).', content: [H({ type: 'text', value: 'pwd && mfa' })] },
                { type: 'checkpoint', index: 2, points: 6, value: '<strong>Task 2</strong><br/><code class="font-mono">boolean sat=false, sun=true</code>; print <code class="font-mono">Weekend: true</code> if either (||).', content: [H({ type: 'text', value: 'sat || sun' })] },
                { type: 'checkpoint', index: 3, points: 8, value: '<strong>Task 3</strong><br/><code class="font-mono">boolean rain=true</code>; print <code class="font-mono">Dry: false</code> using <code class="font-mono">!</code> on rain.', content: [H({ type: 'text', value: '!rain → false for “not raining” is wrong label; use Dry: false when rain true' })] },
                { type: 'checkpoint', index: 4, points: 8, value: '<strong>Task 4</strong><br/>Print <code class="font-mono">Safe: true</code> for <code class="font-mono">String s = "hi"</code> with short-circuit: s non-null and length &gt; 0.', content: [H({ type: 'code_block', language: 'java', value: 'String s = "hi";\nSystem.out.println("Safe: " + (s != null && s.length() > 0));' })] },
                { type: 'checkpoint', index: 5, points: 15, value: '<strong>Challenge Task</strong><br/>Create <code class="font-mono">String name = null</code>. Avoid NullPointerException using short-circuit <code class="font-mono">&&</code>: Check if <code class="font-mono">name != null</code> AND <code class="font-mono">name.isEmpty()</code>. Print the expression result directly with label <code class="font-mono">IsEmpty: false</code>.', content: [H({ type: 'text', value: 'System.out.println("IsEmpty: " + (name != null && name.isEmpty()));' })] },
            ], [
                { index: 1, match: 'LoginOK:\\s*true', matchCode: '&&' },
                { index: 2, match: 'Weekend:\\s*true', matchCode: '\\|\\|' },
                { index: 3, match: 'Dry:\\s*false', matchCode: '!' },
                { index: 4, match: 'Safe:\\s*true', matchCode: '&&' },
                { index: 5, match: 'IsEmpty:\\s*false', matchCode: '&&' },
            ]),

            L('Assignment Operators', '42 min', [
                { type: 'label', value: label },
                { type: 'heading', value: 'Assignment Operators' },
                { type: 'duration', value: '42 min' },
                { type: 'text', value: '= stores a value. Compound assignment combines an operation with assignment—less typing and sometimes implicit casting on left-hand type.' },
                { type: 'section_heading', value: '1. Compound operators (table)' },
                { type: 'rich_text', value: T(`<thead><tr class="bg-gray-50 border-b"><th class="px-6 py-3 border-r font-semibold">Op</th><th class="px-6 py-3 border-r font-semibold">Equivalent</th><th class="px-6 py-3 font-semibold">Example start → after</th></tr></thead><tbody class="divide-y">
<tr><td class="px-6 py-3 border-r font-mono">+=</td><td class="px-6 py-3 border-r">x = x + y</td><td class="px-6 py-3">x=5; x+=3 → 8</td></tr>
<tr><td class="px-6 py-3 border-r font-mono">-=</td><td class="px-6 py-3 border-r">x = x - y</td><td class="px-6 py-3">x=10; x-=4 → 6</td></tr>
<tr><td class="px-6 py-3 border-r font-mono">*=</td><td class="px-6 py-3 border-r">x = x * y</td><td class="px-6 py-3">x=6; x*=2 → 12</td></tr>
<tr><td class="px-6 py-3 border-r font-mono">/=</td><td class="px-6 py-3 border-r">x = x / y</td><td class="px-6 py-3">x=20; x/=4 → 5</td></tr>
<tr><td class="px-6 py-3 border-r font-mono">%=</td><td class="px-6 py-3 border-r">x = x % y</td><td class="px-6 py-3">x=17; x%=5 → 2</td></tr>
</tbody>`) },
                { type: 'section_heading', value: '2. Examples in order' },
                { type: 'code_block', language: 'java', value: 'int score = 10;\nscore += 5;  // 15\nscore *= 2;  // 30\nscore -= 10; // 20' },
                { type: 'section_heading', value: '3. byte += int (sub-concept)' },
                { type: 'text', value: '<code class="font-mono">byte b = 1; b += 2;</code> compiles (compound casts back). <code class="font-mono">b = b + 2;</code> may not—int widens. Prefer int for arithmetic.' },
                { type: 'section_heading', value: '4. Chained assignment' },
                { type: 'text', value: 'You can chain assignments from right to left (<code class="font-mono">a = b = c = 10;</code>).' },
                { type: 'section_heading', value: '5. Practical Examples' },
                { type: 'text', value: '<strong>Counter example:</strong>' },
                { type: 'code_block', language: 'java', value: 'int counter = 0;\ncounter += 1; // Increment counter' },
                { type: 'text', value: '<strong>Score updating system:</strong>' },
                { type: 'code_block', language: 'java', value: 'int score = 100;\nscore *= 2; // Double the score on power-up' },
                { type: 'text', value: '<strong>Balance update program:</strong>' },
                { type: 'code_block', language: 'java', value: 'double balance = 1500.0;\nbalance -= 200.0; // Withdraw' },

                { type: 'section_heading', value: '6. Deep Dive: Memory and Operators' },
                { type: 'text', value: 'Compound assignments evaluate the left side only once. For example, <code class="font-mono">arr[expensiveFunc()] += 1</code> calls the expensive function once, whereas <code class="font-mono">arr[expensiveFunc()] = arr[expensiveFunc()] + 1</code> calls it twice.' },
                
                { type: 'section_heading', value: '7. Internal Casting (Important Detail)' },
                { type: 'text', value: 'Compound assignment operators implicitly cast the result back to the left-hand type. <code class="font-mono">int i = 5; long l = 10; i += l;</code> compiles cleanly because it is converted effectively to <code class="font-mono">i = (int)(i + l)</code>, silently truncating the long.' },
                
                { type: 'section_heading', value: '8. Real-world uses with Loops' },
                { type: 'text', value: 'Accumulators heavily rely on assignment operators. Summing scores or tracking active connection counts.' },

                { type: 'section_heading', value: '9. Beginner Mistakes & Best Practices' },
                { type: 'list', value: [ '<strong>Mistake:</strong> Relying on implicit casting of <code class="font-mono">+=</code> when mixing double and int leading to precision loss.', '<strong>Best Practice:</strong> Use assignment chaining sparingly (e.g., <code class="font-mono">a = b = c = 0;</code>) as it can reduce code readability.' ] },
                
                { type: 'section_heading', value: '10. Interview Questions' },
                { type: 'list', value: [ '<strong>Interview:</strong> What happens internally when you write <code class="font-mono">byte b = 1; b *= 2;</code> compared to <code class="font-mono">b = b * 2;</code>?' ] },

                { type: 'section_heading', value: 'Instructions' },
                { type: 'checkpoint', index: 1, points: 6, value: '<strong>Task 1</strong><br/><code class="font-mono">int balance = 500</code>; <code class="font-mono">balance += 150</code>; print <code class="font-mono">Balance: 650</code>.', content: [H({ type: 'text', value: '+=' })] },
                { type: 'checkpoint', index: 2, points: 6, value: '<strong>Task 2</strong><br/>Then <code class="font-mono">balance *= 2</code>; print <code class="font-mono">Balance: 1300</code>.', content: [H({ type: 'text', value: '*=' })] },
                { type: 'checkpoint', index: 3, points: 8, value: '<strong>Task 3</strong><br/>int n=100; n%=3; print <code class="font-mono">ModAssign: 1</code>.', content: [H({ type: 'text', value: '100 % 3' })] },
                { type: 'checkpoint', index: 4, points: 15, value: '<strong>Challenge Task</strong><br/>Declare <code class="font-mono">short s = 10;</code> and use <code class="font-mono">s += 50000;</code>. Print <code class="font-mono">Overflow: -15526</code> to observe the implicit cast overflow behavior.', content: [H({ type: 'text', value: 'System.out.println("Overflow: " + s);' })] },
            ], [
                { index: 1, match: '650', matchCode: '\\+=' },
                { index: 2, match: '1300', matchCode: '\\*=' },
                { index: 3, match: 'ModAssign:\\s*1', matchCode: '%=' },
                { index: 4, match: 'Overflow:\\s*-15526', matchCode: '\\+=' },
            ]),

            L('Unary Operators', '48 min', [
                { type: 'label', value: label },
                { type: 'heading', value: 'Unary Operators' },
                { type: 'duration', value: '48 min' },
                { type: 'text', value: 'Unary operators act on one operand: increment/decrement, numeric sign, logical NOT. Prefix vs postfix is a frequent exam topic.' },
                { type: 'section_heading', value: '1. Prefix vs postfix (table)' },
                { type: 'rich_text', value: T(`<thead><tr class="bg-gray-50 border-b"><th class="px-6 py-3 border-r font-semibold">Form</th><th class="px-6 py-3 border-r font-semibold">When value updates</th><th class="px-6 py-3 font-semibold">Value used in expression</th></tr></thead><tbody>
<tr><td class="px-6 py-3 border-r font-mono">++x</td><td class="px-6 py-3 border-r">Before</td><td class="px-6 py-3">New value</td></tr>
<tr><td class="px-6 py-3 border-r font-mono">x++</td><td class="px-6 py-3 border-r">After</td><td class="px-6 py-3">Old value</td></tr>
</tbody>`) },
                { type: 'section_heading', value: '2. Example A — postfix' },
                { type: 'code_block', language: 'java', value: 'int a = 5;\nSystem.out.println(a++); // 5\nSystem.out.println(a);   // 6' },
                { type: 'section_heading', value: '3. Example B — prefix' },
                { type: 'code_block', language: 'java', value: 'int b = 5;\nSystem.out.println(++b); // 6\nSystem.out.println(b);   // 6' },
                { type: 'section_heading', value: '4. Unary + - on numbers' },
                { type: 'code_block', language: 'java', value: 'int x = 3;\nSystem.out.println(-x); // -3' },
                { type: 'section_heading', value: '5. Prefixes and Decrements' },
                { type: 'text', value: 'Similar to increment (++), decrement (--) reduces the value by 1. Pre-decrement tracks the new value instantly, post-decrement evaluates with the old value first.' },
                { type: 'section_heading', value: '6. Practical Examples' },
                { type: 'text', value: '<strong>Counter program / Loop increment example:</strong>' },
                { type: 'code_block', language: 'java', value: 'for (int i = 0; i < 5; i++) {\n    // i++ is heavily used in loops\n}' },
                { type: 'text', value: '<strong>Increment difference example:</strong>' },
                { type: 'code_block', language: 'java', value: 'int x = 10;\nint y = ++x; // x=11, y=11\n\nint a = 10;\nint b = a++; // a=11, b=10' },

                { type: 'section_heading', value: '7. Deep Memory Mechanics' },
                { type: 'text', value: 'Postfix (<code class="font-mono">x++</code>) creates a temporary copy of the old value to return for the expression, then increments memory. Prefix (<code class="font-mono">++x</code>) increments memory immediately and returns the new value. Prefix is theoretically faster in older languages, but Java optimizes both.' },
                
                { type: 'section_heading', value: '8. Unary NOT and Negation' },
                { type: 'text', value: 'The <code class="font-mono">-</code> operator negates numbers (two\\\'s complement internally). The <code class="font-mono">!</code> operator inverts boolean values. Another operator <code class="font-mono">~</code> performs a bitwise complement.' },
                { type: 'code_block', language: 'java', value: 'int depth = 50;\nint upwardForce = -depth; // Negation' },

                { type: 'section_heading', value: '9. Beginner Mistakes & Best Practices' },
                { type: 'list', value: [ '<strong>Mistake:</strong> Writing expressions like <code class="font-mono">x = x++</code>. This assigns the OLD value back to x, completely undoing the increment in Java.', '<strong>Best Practice:</strong> Never use multiple increments on the same variable in a single statement (e.g., <code class="font-mono">int y = x++ + ++x;</code>) as it destroys readability.' ] },
                
                { type: 'section_heading', value: '10. Interview Question' },
                { type: 'list', value: [ '<strong>Interview:</strong> What is the output of <code class="font-mono">int i = 0; i = i++; System.out.println(i);</code>?' ] },
                
                { type: 'section_heading', value: 'Instructions' },
                { type: 'checkpoint', index: 1, points: 6, value: '<strong>Task 1</strong><br/><code class="font-mono">int count = 10</code>; <code class="font-mono">count++</code>; print <code class="font-mono">Count: 11</code>.', content: [H({ type: 'text', value: 'postfix ok' })] },
                { type: 'checkpoint', index: 2, points: 8, value: '<strong>Task 2</strong><br/>Reproduce postfix: print two lines <code class="font-mono">First: 5</code> then <code class="font-mono">Second: 6</code> using <code class="font-mono">int a=5</code> and <code class="font-mono">a++</code>.', content: [H({ type: 'text', value: 'println(a++) then println(a)' })] },
                { type: 'checkpoint', index: 3, points: 8, value: '<strong>Task 3</strong><br/>int i=0; three times <code class="font-mono">i++</code> in separate statements; print <code class="font-mono">i: 3</code>.', content: [H({ type: 'text', value: 'i++; i++; i++;' })] },
                { type: 'checkpoint', index: 4, points: 15, value: '<strong>Challenge Task</strong><br/>Demonstrate the <code class="font-mono">x = x++</code> trap. Create <code class="font-mono">int trap = 5;</code>. Execute <code class="font-mono">trap = trap++;</code>. Print <code class="font-mono">Trap: 5</code>.', content: [H({ type: 'text', value: 'System.out.println("Trap: " + trap);' })] },
            ], [
                { index: 1, match: 'Count:\\s*11', matchCode: '\\+\\+' },
                { index: 2, match: 'First:\\s*5[\\s\\S]*Second:\\s*6', matchCode: '\\+\\+' },
                { index: 3, match: 'i:\\s*3', matchCode: '\\+\\+' },
                { index: 4, match: 'Trap:\\s*5', matchCode: 'trap\\+\\+' },
            ]),

            L('Ternary Operator', '45 min', [
                { type: 'label', value: label },
                { type: 'heading', value: 'Ternary Operator' },
                { type: 'duration', value: '45 min' },
                { type: 'text', value: 'The conditional operator <code class="font-mono">? :</code> is Java’s only ternary operator. It selects one of two expressions; both branches must be type-compatible in context.' },
                { type: 'section_heading', value: '1. Syntax (sub-concepts)' },
                { type: 'list', value: [
                    '<strong>Condition</strong> — boolean (or boolean-like in context).',
                    '<strong>Then</strong> — evaluated if true.',
                    '<strong>Else</strong> — evaluated if false.',
                    '<strong>Nesting</strong> — possible but hurts readability.' ] },
                { type: 'code_block', language: 'java', value: 'String msg = (score >= 60) ? "Pass" : "Fail";\nint abs = (n < 0) ? -n : n;' },
                { type: 'section_heading', value: '2. vs if-else (when to use)' },
                { type: 'rich_text', value: T(`<thead><tr class="bg-gray-50 border-b"><th class="px-6 py-3 border-r font-semibold">Ternary</th><th class="px-6 py-3 font-semibold">if-else</th></tr></thead><tbody>
<tr><td class="px-6 py-3 border-r">One expression value</td><td class="px-6 py-3">Multiple statements</td></tr>
<tr><td class="px-6 py-3 border-r">Compact</td><td class="px-6 py-3">Clear for complex logic</td></tr>
</tbody>`) },
                { type: 'section_heading', value: '3. Nested example (careful)' },
                { type: 'code_block', language: 'java', value: 'String grade = (s>=90)?"A":(s>=80)?"B":"C";' },
                { type: 'section_heading', value: '4. Readability considerations' },
                { type: 'text', value: 'Using nested ternary operators can quickly make code unreadable. In enterprise codebases, prefer standard if-else chains when the logic goes beyond a single condition.' },
                { type: 'section_heading', value: '5. Practical Examples' },
                { type: 'text', value: '<strong>Maximum of two numbers:</strong>' },
                { type: 'code_block', language: 'java', value: 'int max = (a > b) ? a : b;' },
                { type: 'text', value: '<strong>Grade decision example:</strong>' },
                { type: 'code_block', language: 'java', value: 'char grade = (marks >= 90) ? \\\'A\\\' : \\\'B\\\';' },
                { type: 'text', value: '<strong>Pass or fail program:</strong>' },
                { type: 'code_block', language: 'java', value: 'String result = (score >= 40) ? "Pass" : "Fail";' },

                { type: 'section_heading', value: '6. Why use Ternary?' },
                { type: 'text', value: 'Ternary operators are expressions, meaning they evaluate to a single value. This makes them ideal for inline assignments and return statements where a full <code class="font-mono">if-else</code> block would unnecessarily expand the code by several lines.' },
                
                { type: 'section_heading', value: '7. Deep Dive: Nested Ternary Logic' },
                { type: 'text', value: 'While generally discouraged for readability, nested ternaries execute right-to-left by default. They can be visualized as an <code class="font-mono">if-else if-else</code> chain. Always use parentheses if you must nest them to clarify intent.' },
                { type: 'code_block', language: 'java', value: 'String tier = (sales > 1000) ? "Gold" : ((sales > 500) ? "Silver" : "Bronze");' },
                
                { type: 'section_heading', value: '8. UI Display Examples' },
                { type: 'text', value: 'Extremely popular in frontend logic or string building. Example: Pluralizing words.' },
                { type: 'code_block', language: 'java', value: 'System.out.println(count + " item" + (count == 1 ? "" : "s"));' },

                { type: 'section_heading', value: '9. Beginner Mistakes & Best Practices' },
                { type: 'list', value: [ '<strong>Mistake:</strong> Trying to execute statements (like <code class="font-mono">System.out.println()</code>) directly inside the branches of a ternary. The branches must resolve to values, not void statements.', '<strong>Best Practice:</strong> Keep ternary operations single-level. If you need two or more conditions, revert to <code class="font-mono">if-else</code>.' ] },
                
                { type: 'section_heading', value: '10. Interview Question' },
                { type: 'list', value: [ '<strong>Interview:</strong> Can a ternary operator return different data types in its branches? (Answer: Yes, but they must be compatible via promotion/boxing to a common supertype or Object)' ] },

                { type: 'section_heading', value: 'Instructions' },
                { type: 'checkpoint', index: 1, points: 6, value: '<strong>Task 1</strong><br/><code class="font-mono">int score = 75</code>; ternary print <code class="font-mono">Result: Pass</code> if &gt;=60 else <code class="font-mono">Fail</code>.', content: [H({ type: 'text', value: '? "Pass" : "Fail"' })] },
                { type: 'checkpoint', index: 2, points: 8, value: '<strong>Task 2</strong><br/><code class="font-mono">int n = 7</code>; print <code class="font-mono">Parity: Odd</code> using % and ternary.', content: [H({ type: 'text', value: '(n%2==0)?"Even":"Odd"' })] },
                { type: 'checkpoint', index: 3, points: 8, value: '<strong>Task 3</strong><br/>int a=3,b=9; print <code class="font-mono">Max: 9</code> with ternary.', content: [H({ type: 'text', value: 'a > b ? a : b' })] },
                { type: 'checkpoint', index: 4, points: 15, value: '<strong>Challenge Task</strong><br/>Use a ternary operator to print a pluralized string. <code class="font-mono">int n = 0;</code> Print <code class="font-mono">0 coins</code>. (If it were 1, it should print <code class="font-mono">1 coin</code>).', content: [H({ type: 'text', value: 'System.out.println(n + " coin" + (n == 1 ? "" : "s"));' })] },
            ], [
                { index: 1, match: 'Result:\\s*Pass', matchCode: '\\?' },
                { index: 2, match: 'Parity:\\s*Odd', matchCode: '\\?' },
                { index: 3, match: 'Max:\\s*9', matchCode: '\\?' },
                { index: 4, match: '0 coins', matchCode: '\\?' },
            ]),

            L('Bitwise and Shift Operators', '50 min', [
                { type: 'label', value: label },
                { type: 'heading', value: 'Bitwise and Shift Operators' },
                { type: 'duration', value: '50 min' },
                { type: 'text', value: 'Bitwise operators manipulate individual bits of integer types. They are essential for low-level programming, cryptography, and performance-critical operations.' },
                { type: 'section_heading', value: '1. Bitwise Operators (table)' },
                { type: 'rich_text', value: T(`<thead><tr class="bg-gray-50 border-b"><th class="px-6 py-3 border-r font-semibold">Op</th><th class="px-6 py-3 border-r font-semibold">Name</th><th class="px-6 py-3 font-semibold">Description</th></tr></thead><tbody class="divide-y">
<tr><td class="px-6 py-3 border-r font-mono">&amp;</td><td class="px-6 py-3 border-r">AND</td><td class="px-6 py-3">1 if both bits are 1</td></tr>
<tr><td class="px-6 py-3 border-r font-mono">|</td><td class="px-6 py-3 border-r">OR</td><td class="px-6 py-3">1 if either bit is 1</td></tr>
<tr><td class="px-6 py-3 border-r font-mono">^</td><td class="px-6 py-3 border-r">XOR</td><td class="px-6 py-3">1 if bits are different</td></tr>
<tr><td class="px-6 py-3 border-r font-mono">~</td><td class="px-6 py-3 border-r">NOT</td><td class="px-6 py-3">Inverts all bits</td></tr>
</tbody>`) },
                { type: 'section_heading', value: '2. Shift Operators (table)' },
                { type: 'rich_text', value: T(`<thead><tr class="bg-gray-50 border-b"><th class="px-6 py-3 border-r font-semibold">Op</th><th class="px-6 py-3 border-r font-semibold">Name</th><th class="px-6 py-3 font-semibold">Description</th></tr></thead><tbody class="divide-y">
<tr><td class="px-6 py-3 border-r font-mono">&lt;&lt;</td><td class="px-6 py-3 border-r">Left Shift</td><td class="px-6 py-3">Shifts bits left (multiplies by 2^n)</td></tr>
<tr><td class="px-6 py-3 border-r font-mono">&gt;&gt;</td><td class="px-6 py-3 border-r">Signed Right Shift</td><td class="px-6 py-3">Shifts right, preserves sign (divides by 2^n)</td></tr>
<tr><td class="px-6 py-3 border-r font-mono">&gt;&gt;&gt;</td><td class="px-6 py-3 border-r">Unsigned Right Shift</td><td class="px-6 py-3">Shifts right, fills with zeros (Java specific)</td></tr>
</tbody>`) },
                { type: 'section_heading', value: '3. Example: Bitwise AND' },
                { type: 'code_block', language: 'java', value: 'int a = 5; // 0101 in binary\nint b = 3; // 0011 in binary\nSystem.out.println(a & b); // 0001 in binary -> 1' },
                { type: 'section_heading', value: '4. Example: Left Shift' },
                { type: 'code_block', language: 'java', value: 'int x = 2; // 0010\nSystem.out.println(x << 2); // 1000 -> 8 (2 * 2^2)' },
                { type: 'section_heading', value: '5. Binary number basics' },
                { type: 'text', value: 'At the lowest level, all data is stored in bits (0s and 1s). The bitwise operators perform operations directly on these binary representations.' },
                { type: 'section_heading', value: '6. Practical Examples' },
                { type: 'text', value: '<strong>Binary comparison example:</strong>' },
                { type: 'code_block', language: 'java', value: 'int flags = 0b0101;\nint mask = 0b0001;\nboolean isSet = (flags & mask) != 0;' },
                { type: 'text', value: '<strong>Bit masking example (XOR toggle):</strong>' },
                { type: 'code_block', language: 'java', value: 'int state = 0b1010;\nstate ^= 0b0010; // Toggles the 2nd bit' },
                { type: 'text', value: '<strong>Shift multiplication example:</strong>' },
                { type: 'code_block', language: 'java', value: 'int base = 5;\nint multBy8 = base << 3; // Equivalent to base * 8' },

                { type: 'section_heading', value: '7. Deep Dive: Binary Number System' },
                { type: 'text', value: 'The decimal system is Base-10. Computers use Base-2 (Binary). For example, the decimal number <code class="font-mono">13</code> is <code class="font-mono">8 + 4 + 1</code>, which translates to binary <code class="font-mono">1101</code>. Operations like <code class="font-mono">&</code> and <code class="font-mono">|</code> align these bits vertically and apply truth tables to each column.' },
                
                { type: 'section_heading', value: '8. Real-world uses (Flag Systems and Masks)' },
                { type: 'text', value: 'In OS file permissions (Read/Write/Execute), bit masks are used to compactly store states. <code class="font-mono">0b100</code> (read), <code class="font-mono">0b010</code> (write), <code class="font-mono">0b001</code> (execute). Checking if write is enabled: <code class="font-mono">(perms & 0b010) != 0</code>.' },
                
                { type: 'section_heading', value: '9. Performance Benefits' },
                { type: 'text', value: 'Bitwise operations execute directly on the ALU (Arithmetic Logic Unit) of the CPU in a single clock cycle. They are dramatically faster than standard multiplication/division or modulo logic, heavily used in game engines and cryptography.' },

                { type: 'section_heading', value: '10. Beginner Mistakes & Best Practices' },
                { type: 'list', value: [ '<strong>Mistake:</strong> Confusing the signed right shift <code class="font-mono">>></code> with the unsigned right shift <code class="font-mono">>>></code>. The former preserves negative signs by padding 1s, the latter strictly pads 0s.', '<strong>Best Practice:</strong> Use hexadecimal (<code class="font-mono">0x</code>) or binary (<code class="font-mono">0b</code>) literals when working with masks to make the intent obvious.' ] },
                
                { type: 'section_heading', value: '11. Interview Question' },
                { type: 'list', value: [ '<strong>Interview:</strong> How do you swap two integer variables without using a temporary third variable? (Answer: Using XOR thrice <code class="font-mono">a^=b; b^=a; a^=b;</code>)' ] },

                { type: 'section_heading', value: 'Instructions' },
                { type: 'checkpoint', index: 1, points: 6, value: '<strong>Task 1</strong><br/>Create <code class="font-mono">int n = 4</code>. Left shift it by 1 (<code class="font-mono">n &lt;&lt; 1</code>). Print <code class="font-mono">Shifted: 8</code>.', content: [H({ type: 'text', value: 'n << 1' })] },
                { type: 'checkpoint', index: 2, points: 8, value: '<strong>Task 2</strong><br/>Perform Bitwise OR on <code class="font-mono">int a = 6</code> and <code class="font-mono">int b = 1</code>. Print <code class="font-mono">Result OR: 7</code>.', content: [H({ type: 'text', value: 'a | b' })] },
                { type: 'checkpoint', index: 3, points: 15, value: '<strong>Challenge Task</strong><br/>Swap two numbers using XOR. <code class="font-mono">int x = 10, y = 20;</code> Apply <code class="font-mono">x^=y; y^=x; x^=y;</code>. Print <code class="font-mono">Swapped x: 20</code> and <code class="font-mono">y: 10</code>.', content: [H({ type: 'text', value: 'x^=y; y^=x; x^=y; System.out.println("Swapped x: " + x); System.out.println("y: " + y);' })] },
            ], [
                { index: 1, match: 'Shifted:\\s*8', matchCode: '<<' },
                { index: 2, match: 'Result OR:\\s*7', matchCode: '\\|' },
                { index: 3, match: 'Swapped x:\\s*20[\\s\\S]*y:\\s*10', matchCode: '\\^=' },
            ]),

            L('Advanced Operators', '30 min', [
                { type: 'label', value: label },
                { type: 'heading', value: 'Advanced Operators' },
                { type: 'duration', value: '30 min' },
                { type: 'text', value: 'Beyond math and logic, Java uses specialized operators for object manipulation and type checking. These are foundational for Object-Oriented Programming.' },
                { type: 'section_heading', value: '1. The instanceof Operator' },
                { type: 'text', value: 'The <code class="font-mono">instanceof</code> operator checks if an object is an instance of a specific class or interface. It returns a boolean.' },
                { type: 'code_block', language: 'java', value: 'String name = "Java";\nboolean isString = name instanceof String; // true' },
                { type: 'section_heading', value: '2. The new Operator' },
                { type: 'text', value: 'Creates new objects or arrays, allocating memory on the heap. You will use this constantly for classes.' },
                { type: 'code_block', language: 'java', value: 'int[] arr = new int[5];\nScanner sc = new Scanner(System.in);' },
                { type: 'section_heading', value: '3. Member Access (.) and Array Index ([])' },
                { type: 'text', value: 'The dot operator accesses methods or fields of an object. The bracket operator accesses array elements. These have the highest precedence in Java.' },
                { type: 'code_block', language: 'java', value: 'int len = name.length();\narr[0] = len;' },
                { type: 'section_heading', value: '4. Operator Precedence & Associativity' },
                { type: 'text', value: 'When multiple operators appear, Java uses <strong>Precedence</strong> (e.g. * before +) and <strong>Associativity</strong> (Left-to-Right or Right-to-Left) to evaluate them.' },
                { type: 'section_heading', value: '5. Type Promotion' },
                { type: 'text', value: 'Mixing data types (e.g., byte + int) causes smaller types to be automatically promoted to int or larger before calculation.' },
                { type: 'section_heading', value: '6. Practical Examples' },
                { type: 'text', value: '<strong>Complex expression evaluation & Mistakes:</strong>' },
                { type: 'code_block', language: 'java', value: 'int result = 10 + 5 * 2; // = 20 (not 30)' },
                { type: 'text', value: '<strong>Type promotion example:</strong>' },
                { type: 'code_block', language: 'java', value: 'byte b1 = 10, b2 = 20;\nint sum = b1 + b2; // Promoted to int' },

                { type: 'section_heading', value: '7. The Method Call and Array Access Operators' },
                { type: 'text', value: 'The parentheses <code class="font-mono">()</code> evaluate arguments and invoke methods. The brackets <code class="font-mono">[]</code> calculate memory offsets to fetch elements. These operators ensure OOP and Data Structures operate seamlessly in the language.' },
                
                { type: 'section_heading', value: '8. Full Operator Precedence Hierarchy' },
                { type: 'text', value: '1. Postfix/Prefix arrays, methods <code class="font-mono">() [] . ++ --</code><br/>2. Unary <code class="font-mono">+ - ! ~</code><br/>3. Multiplicative <code class="font-mono">* / %</code><br/>4. Additive <code class="font-mono">+ -</code><br/>5. Shift <code class="font-mono"><&lt; >> >>></code><br/>6. Relational <code class="font-mono">< > &lt;= >= instanceof</code><br/>7. Equality <code class="font-mono">== !=</code><br/>8. Bitwise <code class="font-mono">& ^ |</code><br/>9. Logical AND/OR <code class="font-mono">&& ||</code><br/>10. Ternary <code class="font-mono">? :</code><br/>11. Assignment <code class="font-mono">= += -=</code> etc.' },
                
                { type: 'section_heading', value: '9. Beginner Mistakes & Best Practices' },
                { type: 'list', value: [ '<strong>Mistake:</strong> Forgetting that assignment operators have the lowest precedence, leading to compiling errors like <code class="font-mono">boolean flag = x == y == true;</code> without parentheses.', '<strong>Best Practice:</strong> Never memorize the entire precedence table; use parentheses liberally to make the evaluation order unequivocally clear to standard human readers.' ] },
                
                { type: 'section_heading', value: '10. Interview Question' },
                { type: 'list', value: [ '<strong>Interview:</strong> What is operator associativity and why does <code class="font-mono">a = b = c = 10;</code> work? (Answer: Assignment is Right-to-Left associative, resolving <code class="font-mono">c = 10</code> first.)' ] },

                { type: 'section_heading', value: 'Instructions' },
                { type: 'checkpoint', index: 1, points: 5, value: '<strong>Task 1</strong><br/>Create <code class="font-mono">String str = "Hello"</code>. Evaluate <code class="font-mono">str instanceof String</code> and print its value with label <code class="font-mono">Type check: true</code>.', content: [H({ type: 'text', value: 'instanceof' })] },
                { type: 'checkpoint', index: 2, points: 15, value: '<strong>Challenge Task</strong><br/>Demonstrate associativity. Set <code class="font-mono">int p, q;</code>. Assign <code class="font-mono">p = q = 100;</code> on one line. Print <code class="font-mono">Assoc: 100</code>.', content: [H({ type: 'text', value: 'int p, q; p = q = 100; System.out.println("Assoc: " + p);' })] },
            ], [
                { index: 1, match: 'Type check:\\s*true', matchCode: 'instanceof' },
                { index: 2, match: 'Assoc:\\s*100', matchCode: '=' },
            ]),
        ];

        for (const lesson of lessons) {
            const { validationCriteria, ...doc } = lesson;
            await lessonsCol.updateOne({ _id: lesson._id }, { $set: { ...doc, validationCriteria } }, { upsert: true });
        }

        const article1Id = new ObjectId();
        const article2Id = new ObjectId();
        const proj1 = new ObjectId();
        const proj2 = new ObjectId();
        const proj3 = new ObjectId();

        const article1 = {
            _id: article1Id,
            moduleId,
            courseId,
            order: 1,
            type: 'article',
            title: 'Java Arithmetic and Assignment Operators',
            duration: '22 min',
            language: 'java',
            content: [
                { type: 'label', value: 'ARTICLE' },
                { type: 'heading', value: 'Java Arithmetic and Assignment Operators' },
                { type: 'text', value: 'Arithmetic operators transform numeric values. Assignment operators bind names to values or update them in place. Together they cover most everyday computation in Java.' },
                { type: 'section_heading', value: 'Arithmetic deep dive' },
                { type: 'list', value: [
                    '<strong>Promotion</strong> — int + double → double.',
                    '<strong>Integer division</strong> — truncates; use double for ratios.',
                    '<strong>Modulo</strong> — remainder; sign follows dividend in Java.' ] },
                { type: 'code_block', language: 'java', value: 'double avg = (double) sum / count;\nint lastDigit = value % 10;' },
                { type: 'section_heading', value: 'Compound assignment' },
                { type: 'text', value: '+= -= *= /= %= rewrite the left variable. Handy for accumulators and counters.' },
                { type: 'code_block', language: 'java', value: 'int total = 0;\nfor (int p : prices) total += p;' },
                { type: 'section_heading', value: 'Pitfalls' },
                { type: 'list', value: [
                    'Mixing String + with math—concatenation wins left-to-right unless parenthesized.',
                    'Overflow on int—large products need long or BigInteger.' ] },
            ],
        };
        const article2 = {
            _id: article2Id,
            moduleId,
            courseId,
            order: 2,
            type: 'article',
            title: 'Operator Precedence in Java',
            duration: '20 min',
            language: 'java',
            content: [
                { type: 'label', value: 'ARTICLE' },
                { type: 'heading', value: 'Operator Precedence in Java' },
                { type: 'text', value: 'Precedence decides which operator binds first when parentheses are omitted. Associativity (left vs right) breaks ties at the same level.' },
                { type: 'rich_text', value: T(`<thead><tr class="bg-gray-50 border-b"><th class="px-4 py-2 border-r">Precedence (high → low)</th><th class="px-4 py-2">Operators</th></tr></thead><tbody>
<tr><td class="px-4 py-2 border-r">1</td><td class="px-4 py-2 font-mono">() [] . postfix ++ --</td></tr>
<tr><td class="px-4 py-2 border-r">2</td><td class="px-4 py-2 font-mono">unary ++ -- + - ! ~</td></tr>
<tr><td class="px-4 py-2 border-r">3</td><td class="px-4 py-2 font-mono">* / %</td></tr>
<tr><td class="px-4 py-2 border-r">4</td><td class="px-4 py-2 font-mono">+ -</td></tr>
<tr><td class="px-4 py-2 border-r">5</td><td class="px-4 py-2 font-mono">&lt;&lt; &gt;&gt; &gt;&gt;&gt;</td></tr>
<tr><td class="px-4 py-2 border-r">6</td><td class="px-4 py-2 font-mono">&lt; &gt; &lt;= &gt;= instanceof</td></tr>
<tr><td class="px-4 py-2 border-r">7</td><td class="px-4 py-2 font-mono">== !=</td></tr>
<tr><td class="px-4 py-2 border-r">8</td><td class="px-4 py-2 font-mono">&amp; (Bitwise AND)</td></tr>
<tr><td class="px-4 py-2 border-r">9</td><td class="px-4 py-2 font-mono">^ (Bitwise XOR)</td></tr>
<tr><td class="px-4 py-2 border-r">10</td><td class="px-4 py-2 font-mono">| (Bitwise OR)</td></tr>
<tr><td class="px-4 py-2 border-r">11</td><td class="px-4 py-2 font-mono">&amp;&amp;</td></tr>
<tr><td class="px-4 py-2 border-r">12</td><td class="px-4 py-2 font-mono">||</td></tr>
<tr><td class="px-4 py-2 border-r">13</td><td class="px-4 py-2 font-mono">? :</td></tr>
<tr><td class="px-4 py-2 border-r">14</td><td class="px-4 py-2 font-mono">= += -= *= /= %= &amp;= ^= |= &lt;&lt;= &gt;&gt;= &gt;&gt;&gt;=</td></tr>
</tbody>`) },
                { type: 'text', value: 'Example: a || b && c parses as a || (b && c) because && binds tighter than ||.' },
                { type: 'code_block', language: 'java', value: 'boolean r = true || false && false; // true' },
                { type: 'section_heading', value: 'Best practice' },
                { type: 'text', value: 'When readability matters, add parentheses even if redundant. Future you (and reviewers) will thank you.' },
            ],
        };

        await lessonsCol.updateOne({ _id: article1Id }, { $set: article1 }, { upsert: true });
        await lessonsCol.updateOne({ _id: article2Id }, { $set: article2 }, { upsert: true });

        const projectStub = (id, title, order) => ({
            _id: id,
            moduleId,
            courseId,
            order,
            type: 'project',
            title,
            duration: '45 min',
            language: 'java',
            content: [
                { type: 'label', value: 'PROJECT' },
                { type: 'heading', value: title },
                { type: 'text', value: 'Apply arithmetic, relational, logical, assignment, unary, and ternary operators in a small program (menu calculator, band checker, or grade formatter).' },
                { type: 'list', value: ['Use compound += in a loop', 'Guard null/String with && short-circuit', 'At least one ternary for display text'] },
            ],
        });
        await lessonsCol.updateOne({ _id: proj1 }, { $set: projectStub(proj1, 'Operators: Calculator Drill', 1) }, { upsert: true });
        await lessonsCol.updateOne({ _id: proj2 }, { $set: projectStub(proj2, 'Operators: Comparison Lab', 2) }, { upsert: true });
        await lessonsCol.updateOne({ _id: proj3 }, { $set: projectStub(proj3, 'Operators: Ternary & Logic Challenge', 3) }, { upsert: true });

        const items = [
            { type: 'lesson', title: 'Introduction to Operators' },
            { type: 'lesson', title: 'Arithmetic Operators' },
            { type: 'lesson', title: 'Relational Operators' },
            { type: 'lesson', title: 'Logical Operators' },
            { type: 'lesson', title: 'Assignment Operators' },
            { type: 'lesson', title: 'Unary Operators' },
            { type: 'lesson', title: 'Ternary Operator' },
            { type: 'lesson', title: 'Bitwise and Shift Operators' },
            { type: 'lesson', title: 'Advanced Operators' },
            { type: 'article', title: 'Java Arithmetic and Assignment Operators' },
            { type: 'article', title: 'Operator Precedence in Java' },
            { type: 'project', title: 'Operators: Calculator Drill' },
            { type: 'project', title: 'Operators: Comparison Lab' },
            { type: 'project', title: 'Operators: Ternary & Logic Challenge' },
        ];

        const toEmbed = lessons.map((L) => ({
            _id: L._id,
            moduleId,
            courseId,
            order: L.order,
            type: 'lesson',
            title: L.title,
            duration: L.duration,
            language: 'java',
        }));

        await coursesCol.updateOne(
            { _id: courseId, 'modules._id': moduleId },
            {
                $set: {
                    'modules.$.description': 'Learn about operators in Java.',
                    'modules.$.lessons': toEmbed,
                    'modules.$.lessonsCount': 9,
                    'modules.$.articlesCount': 2,
                    'modules.$.projectsCount': 3,
                    'modules.$.conceptsCount': items.length,
                    'modules.$.items': items,
                },
            }
        );

        console.log('✅ Operators module seeded (expanded content).');
    } catch (e) {
        console.error('❌', e);
    } finally {
        await client.close();
    }
}

seed();
