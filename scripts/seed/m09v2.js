const {
    Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
    HeadingLevel, AlignmentType, BorderStyle, WidthType, ShadingType,
    LevelFormat, PageBreak
} = require('docx');
const fs = require('fs');

// ── helpers ──────────────────────────────────────────────────────────────────

function pageBreak() {
    return new Paragraph({ children: [new PageBreak()] });
}

function gap(pt = 120) {
    return new Paragraph({ spacing: { before: pt, after: pt }, children: [new TextRun('')] });
}

// plain paragraph
function para(text, { bold = false, size = 22, color = '222222', indent = false } = {}) {
    return new Paragraph({
        indent: indent ? { left: 360 } : undefined,
        spacing: { before: 60, after: 100 },
        children: [new TextRun({ text, bold, size, color, font: 'Calibri' })]
    });
}

// mixed-run paragraph: array of { text, bold?, italic?, color? }
function mixedPara(runs) {
    return new Paragraph({
        spacing: { before: 60, after: 100 },
        children: runs.map(r => new TextRun({
            text: r.text,
            bold: r.bold || false,
            italic: r.italic || false,
            size: r.size || 22,
            font: r.font || 'Calibri',
            color: r.color || '222222',
        }))
    });
}

// lesson title banner (just a styled heading paragraph, no table)
function lessonTitle(num, title) {
    return [
        new Paragraph({
            spacing: { before: 0, after: 60 },
            border: { bottom: { style: BorderStyle.SINGLE, size: 4, color: '2E74B5' } },
            children: [
                new TextRun({ text: `Lesson ${num}  |  `, font: 'Calibri', size: 28, bold: true, color: '2E74B5' }),
                new TextRun({ text: title, font: 'Calibri', size: 28, bold: true, color: '1F3864' }),
            ]
        }),
        gap(80),
    ];
}

// section heading
function secHead(text) {
    return new Paragraph({
        spacing: { before: 280, after: 80 },
        children: [new TextRun({ text, font: 'Calibri', size: 24, bold: true, color: '2E74B5' })]
    });
}

// sub-heading
function subHead(text) {
    return new Paragraph({
        spacing: { before: 200, after: 60 },
        children: [new TextRun({ text, font: 'Calibri', size: 22, bold: true, color: '1F3864' })]
    });
}

// bullet item  (level 0 = main, level 1 = sub)
function b(text, level = 0) {
    return new Paragraph({
        numbering: { reference: level === 0 ? 'bullets' : 'subbullets', level: 0 },
        spacing: { before: 40, after: 40 },
        children: [new TextRun({ text, font: 'Calibri', size: 21, color: '222222' })]
    });
}

// bold label bullet  e.g.  "Syntax:"  rest of text
function bb(label, text) {
    return new Paragraph({
        numbering: { reference: 'bullets', level: 0 },
        spacing: { before: 40, after: 40 },
        children: [
            new TextRun({ text: label + ' ', font: 'Calibri', size: 21, bold: true, color: '1F3864' }),
            new TextRun({ text, font: 'Calibri', size: 21, color: '222222' }),
        ]
    });
}

// code block
function codeBlock(lines) {
    const bdr = { style: BorderStyle.SINGLE, size: 1, color: '999999' };
    const rows = lines.map(line =>
        new TableRow({
            children: [new TableCell({
                borders: { top: { style: BorderStyle.NONE }, bottom: { style: BorderStyle.NONE }, left: { style: BorderStyle.NONE }, right: { style: BorderStyle.NONE } },
                width: { size: 9360, type: WidthType.DXA },
                margins: { top: 0, bottom: 0, left: 200, right: 200 },
                shading: { fill: 'F3F3F3', type: ShadingType.CLEAR },
                children: [new Paragraph({
                    spacing: { before: 10, after: 10 },
                    children: [new TextRun({ text: line === '' ? ' ' : line, font: 'Courier New', size: 18, color: '1A1A1A' })]
                })]
            })]
        })
    );
    return new Table({
        width: { size: 9360, type: WidthType.DXA },
        columnWidths: [9360],
        borders: { top: { style: BorderStyle.SINGLE, size: 2, color: '999999' }, bottom: { style: BorderStyle.SINGLE, size: 2, color: '999999' }, left: { style: BorderStyle.SINGLE, size: 2, color: '999999' }, right: { style: BorderStyle.SINGLE, size: 2, color: '999999' } },
        rows,
    });
}

// note / tip box
function noteBox(label, text, fillColor = 'EBF3FB', borderColor = '2E74B5') {
    const bdr = { style: BorderStyle.SINGLE, size: 2, color: borderColor };
    return new Table({
        width: { size: 9360, type: WidthType.DXA },
        columnWidths: [9360],
        rows: [new TableRow({
            children: [new TableCell({
                borders: { top: bdr, bottom: bdr, left: { style: BorderStyle.THICK, size: 16, color: borderColor }, right: bdr },
                shading: { fill: fillColor, type: ShadingType.CLEAR },
                margins: { top: 100, bottom: 100, left: 160, right: 160 },
                width: { size: 9360, type: WidthType.DXA },
                children: [new Paragraph({
                    children: [
                        new TextRun({ text: label + '  ', font: 'Calibri', size: 21, bold: true, color: borderColor }),
                        new TextRun({ text, font: 'Calibri', size: 21, color: '222222' }),
                    ]
                })]
            })]
        })]
    });
}

function divider() {
    return new Paragraph({
        spacing: { before: 160, after: 160 },
        border: { bottom: { style: BorderStyle.SINGLE, size: 2, color: 'CCCCCC' } },
        children: [new TextRun('')]
    });
}

// ── LESSON 1 : Static Variables ───────────────────────────────────────────────
function lesson1() {
    return [
        ...lessonTitle('01', 'Static Variables'),

        secHead('What is a Static Variable?'),
        para('A static variable is a variable that belongs to the class itself — not to any individual object. It is declared using the static keyword inside the class but outside any method.'),
        para('No matter how many objects you create, there is always only ONE copy of a static variable in memory.'),
        gap(60),
        codeBlock([
            'class Student {',
            '    static int totalStudents = 0;  // static variable',
            '    String name;                   // instance variable',
            '}',
        ]),
        gap(100),

        secHead('Key Points'),
        b('Declared with the static keyword inside a class.'),
        b('Only one copy exists in memory — shared by all objects.'),
        b('Stored in the Method Area of JVM memory (not the Heap).'),
        b('Created when the class is loaded, destroyed when the program ends.'),
        b('Accessed using the class name:  ClassName.variableName'),
        b('Can also be accessed via an object reference, but this is NOT recommended.'),
        gap(100),

        secHead('Memory — How It Compares to Instance Variables'),
        para('Understanding memory is important. Look at this side-by-side:'),
        gap(60),
        codeBlock([
            'class Student {',
            '    static int totalStudents = 0; // ONE copy — Method Area',
            '    String name;                  // PER OBJECT — Heap',
            '}',
            '',
            'Student s1 = new Student();  // s1 gets its own "name"',
            'Student s2 = new Student();  // s2 gets its own "name"',
            '// But both share the SAME totalStudents',
        ]),
        gap(100),

        secHead('Example 1 — Object Counter'),
        para('The most common use of static variables is counting how many objects have been created.'),
        gap(60),
        codeBlock([
            'class Student {',
            '    static int totalStudents = 0;  // shared counter',
            '    String name;',
            '    int rollNo;',
            '',
            '    Student(String name, int rollNo) {',
            '        this.name   = name;',
            '        this.rollNo = rollNo;',
            '        totalStudents++;           // every new object increments this',
            '    }',
            '',
            '    void display() {',
            '        System.out.println("Name: " + name + ", Roll: " + rollNo);',
            '    }',
            '}',
            '',
            'class Main {',
            '    public static void main(String[] args) {',
            '        Student s1 = new Student("Alice", 101);',
            '        Student s2 = new Student("Bob",   102);',
            '        Student s3 = new Student("Carol", 103);',
            '',
            '        s1.display();  // Name: Alice, Roll: 101',
            '        s2.display();  // Name: Bob,   Roll: 102',
            '        s3.display();  // Name: Carol, Roll: 103',
            '',
            '        System.out.println("Total: " + Student.totalStudents); // 3',
            '    }',
            '}',
        ]),
        gap(100),

        secHead('Example 2 — Constants with static final'),
        para('When you combine static with final, you get a constant — a value that belongs to the class and never changes. Convention: use ALL_CAPS names.'),
        gap(60),
        codeBlock([
            'class AppConfig {',
            '    static final String APP_NAME   = "MyApp";',
            '    static final int    MAX_USERS  = 500;',
            '    static final double TAX_RATE   = 0.18;',
            '}',
            '',
            'class Main {',
            '    public static void main(String[] args) {',
            '        System.out.println(AppConfig.APP_NAME);  // MyApp',
            '        System.out.println(AppConfig.TAX_RATE);  // 0.18',
            '',
            '        // AppConfig.MAX_USERS = 1000; // ERROR — cannot change final',
            '    }',
            '}',
        ]),
        gap(100),

        secHead('Example 3 — Shared Configuration'),
        para('Static variables are perfect when all objects need to read the same setting, like an interest rate for all bank accounts.'),
        gap(60),
        codeBlock([
            'class BankAccount {',
            '    static double interestRate = 3.5;  // same for all accounts',
            '    String owner;',
            '    double balance;',
            '',
            '    BankAccount(String owner, double balance) {',
            '        this.owner   = owner;',
            '        this.balance = balance;',
            '    }',
            '',
            '    void applyInterest() {',
            '        balance += balance * (interestRate / 100);',
            '    }',
            '',
            '    void show() {',
            '        System.out.println(owner + " -> Rs." + balance);',
            '    }',
            '}',
            '',
            'class Main {',
            '    public static void main(String[] args) {',
            '        BankAccount a1 = new BankAccount("Ravi",  10000);',
            '        BankAccount a2 = new BankAccount("Priya", 25000);',
            '',
            '        a1.applyInterest();',
            '        a2.applyInterest();',
            '        a1.show();  // Ravi  -> Rs.10350.0',
            '        a2.show();  // Priya -> Rs.25875.0',
            '',
            '        // Change rate for ALL accounts at once',
            '        BankAccount.interestRate = 5.0;',
            '        System.out.println("New rate: " + BankAccount.interestRate);',
            '    }',
            '}',
        ]),
        gap(100),

        noteBox('Remember:', 'Always use ClassName.variableName to access static variables. Never use objectRef.variableName — it works but is misleading and bad practice.', 'FFF8E1', 'E6A817'),
        gap(100),

        secHead('When to Use Static Variables'),
        b('When the value must be shared across all objects of a class.'),
        b('For counting objects (e.g., totalStudents, totalAccounts).'),
        b('For constants that do not change (static final).'),
        b('For configuration values that apply to all instances (e.g., interestRate).'),
        b('Do NOT use static variables for data that is unique to each object.'),

        divider(),
    ];
}

// ── LESSON 2 : Static Methods ─────────────────────────────────────────────────
function lesson2() {
    return [
        pageBreak(),
        ...lessonTitle('02', 'Static Methods'),

        secHead('1. What are Static Methods?'),
        para('Static methods are methods that belong to the class itself, not to any specific object.'),
        b('You can call them without creating an object'),
        b('They are shared across all instances'),
        b('They are loaded into memory once when the class is loaded'),
        para('A static method represents behavior related to the class as a whole, not individual objects.'),
        gap(100),

        secHead('2. Why Static Methods Exist?'),
        para('In real-world systems, not all operations depend on object data.'),
        b('Mathematical calculations'),
        b('Parsing data'),
        b('Utility/helper logic'),
        b('Factory object creation'),
        para('Instead of creating unnecessary objects, Java allows class-level behavior using static methods.'),
        gap(100),

        secHead('2.1 Accessing Static Methods'),
        para('Belongs to the class. No object required. Examples: Math.sqrt(16); Integer.parseInt("123");'),
        para('You can also call static methods using: ClassName.methodName();'),
        gap(60),
        codeBlock([
            'class MathUtils {',
            '    static int square(int n) { return n * n; }',
            '    static int cube(int n) { return n * n * n; }',
            '}',
            '',
            'public class Main {',
            '    public static void main(String[] args) {',
            '        int result1 = MathUtils.square(5);',
            '        int result2 = MathUtils.cube(3);',
            '        System.out.println("Square: " + result1);',
            '        System.out.println("Cube: " + result2);',
            '    }',
            '}'
        ]),
        gap(100),

        secHead('2.2 Utility Logic Example'),
        para('Perfect for logic that doesn\'t need personal object \'state\'. These are called Utility Methods.'),
        gap(60),
        codeBlock([
            'class StringUtils {',
            '    static boolean isEmpty(String str) { return str == null || str.length() == 0; }',
            '    static String toUpper(String str) { return str.toUpperCase(); }',
            '}',
            '',
            'public class Main {',
            '    public static void main(String[] args) {',
            '        String name = "java";',
            '        System.out.println(StringUtils.toUpper(name));',
            '        System.out.println(StringUtils.isEmpty(name));',
            '    }',
            '}'
        ]),
        gap(100),

        secHead('2.3 The Two Golden Rules'),
        noteBox('RULE 1', 'Static methods can only access static data directly. To access instance data, you must pass an object reference.', 'EBF3FB', '2E74B5'),
        gap(60),
        codeBlock([
            '// ❌ Wrong:',
            'class Test {',
            '    int x = 10;',
            '    static void show() { System.out.println(x); } // ERROR',
            '}',
            '',
            '// ✅ Correct:',
            'class Test {',
            '    int x = 10;',
            '    static void show(Test obj) { System.out.println(obj.x); } // OK',
            '}'
        ]),
        gap(80),
        noteBox('RULE 2', 'Static methods cannot use this or super. Reason: this refers to current object, and static methods have no object context.', 'EBF3FB', '2E74B5'),
        gap(100),

        secHead('2.4 Factory Methods (Static Constructors)'),
        para('Control object creation with named methods. Improves readability and is used heavily in frameworks.'),
        gap(60),
        codeBlock([
            'class Temperature {',
            '    double value;',
            '    private Temperature(double value) { this.value = value; }',
            '    static Temperature fromCelsius(double c) { return new Temperature(c); }',
            '    static Temperature fromFahrenheit(double f) { return new Temperature((f - 32) * 5 / 9); }',
            '}',
            '',
            'public class Main {',
            '    public static void main(String[] args) {',
            '        Temperature t1 = Temperature.fromCelsius(25);',
            '        Temperature t2 = Temperature.fromFahrenheit(77);',
            '        System.out.println("Temp1: " + t1.value);',
            '        System.out.println("Temp2: " + t2.value);',
            '    }',
            '}'
        ]),
        gap(100),

        secHead('2.5 Static Method Hiding (Inheritance)'),
        para('Static methods are NOT overridden. They are hidden. This uses Compile-Time Binding. Behavior depends on reference type, not object.'),
        gap(60),
        codeBlock([
            'class Animal { static void sound() { System.out.println("Animal sound"); } }',
            'class Dog extends Animal { static void sound() { System.out.println("Dog sound"); } }',
            '',
            'public class Main {',
            '    public static void main(String[] args) {',
            '        Animal a = new Dog();',
            '        a.sound(); // Animal version (depends on reference type)',
            '    }',
            '}'
        ]),
        gap(100),

        secHead('2.6 Method Chaining / Fluent API'),
        para('Building complex commands through static start points:'),
        gap(60),
        codeBlock([
            'class Query {',
            '    String data = "";',
            '    static Query select(String fields) {',
            '        Query q = new Query();',
            '        q.data = "SELECT " + fields;',
            '        return q;',
            '    }',
            '    Query from(String table) {',
            '        data += " FROM " + table;',
            '        return this;',
            '    }',
            '    String build() { return data; }',
            '}',
            '',
            'public class Main {',
            '    public static void main(String[] args) {',
            '        String sql = Query.select("*").from("users").build();',
            '        System.out.println(sql);',
            '    }',
            '}'
        ]),
        gap(100),

        secHead('3. Additional Concepts'),
        para('Memory Behavior: Stored in Method Area, loaded once per class, shared across all objects.'),
        gap(60),
        new Table({
            width: { size: 9360, type: WidthType.DXA },
            columnWidths: [3120, 3120, 3120],
            rows: [
                new TableRow({
                    children: [
                        ['Feature', 3120], ['Static Method', 3120], ['Instance Method', 3120]
                    ].map(([t, w]) => new TableCell({
                        borders: { top: { style: BorderStyle.SINGLE, size: 2, color: '1F3864' }, bottom: { style: BorderStyle.SINGLE, size: 2, color: '1F3864' }, left: { style: BorderStyle.SINGLE, size: 2, color: '1F3864' }, right: { style: BorderStyle.SINGLE, size: 2, color: '1F3864' } },
                        shading: { fill: '1F3864', type: ShadingType.CLEAR },
                        width: { size: w, type: WidthType.DXA },
                        margins: { top: 80, bottom: 80, left: 120, right: 120 },
                        children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: t, font: 'Calibri', size: 21, bold: true, color: 'FFFFFF' })] })]
                    }))
                }),
                ...[
                    ['Belongs to', 'Class', 'Object'],
                    ['Object Required', 'No', 'Yes'],
                    ['Access Instance Data', 'No', 'Yes'],
                    ['Uses this', 'No', 'Yes']
                ].map(([a, b, c], i) => new TableRow({
                    children: [
                        [a, 3120], [b, 3120], [c, 3120]
                    ].map(([t, w]) => new TableCell({
                        borders: { top: { style: BorderStyle.SINGLE, size: 1, color: 'CCCCCC' }, bottom: { style: BorderStyle.SINGLE, size: 1, color: 'CCCCCC' }, left: { style: BorderStyle.SINGLE, size: 1, color: 'CCCCCC' }, right: { style: BorderStyle.SINGLE, size: 1, color: 'CCCCCC' } },
                        shading: { fill: i % 2 === 0 ? 'F5F5F5' : 'FFFFFF', type: ShadingType.CLEAR },
                        width: { size: w, type: WidthType.DXA },
                        margins: { top: 70, bottom: 70, left: 120, right: 120 },
                        children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: t, font: 'Calibri', size: 20 })] })]
                    }))
                }))
            ]
        }),
        gap(100),

        divider(),
    ];
}

// ── LESSON 3 : Static Blocks (Class Initializers) ───────────────────────────
function lesson3() {
    return [
        pageBreak(),
        ...lessonTitle('03', 'Static Blocks (Class Initializers)'),

        secHead('1. What is a Static Block?'),
        para('A static block is a block of code inside a class that runs automatically when the class is loaded into memory.'),
        gap(20),
        codeBlock(['static {', '    // code', '}']),
        gap(100),

        secHead('3.1 What is a Static Block?'),
        para('A block of code that runs ONCE exactly when the class is loaded, before any object exists or main() runs.'),
        gap(40),
        b('👉 Important:'),
        para('• Runs only one time per class'),
        para('• Runs automatically'),
        para('• Used for initial setup logic'),
        gap(100),

        secHead('2. Why Static Blocks Exist?'),
        para('Sometimes you need to:'),
        para('• Initialize static variables with complex logic'),
        para('• Load configuration'),
        para('• Prepare resources before program starts'),
        gap(40),
        para('Static blocks solve this problem.'),
        gap(100),

        secHead('3.2 Execution Order'),
        para('1. Static variables initialized'),
        para('2. Static blocks run (top to bottom)'),
        para('3. main() starts'),
        para('4. Objects created (constructors run)'),
        gap(100),

        secHead('Complete Execution Flow Example'),
        codeBlock([
            'class Demo {',
            '    static int x = 10;',
            '    static { System.out.println("Static Block 1"); }',
            '    static { System.out.println("Static Block 2"); }',
            '    Demo() { System.out.println("Constructor"); }',
            '}',
            '',
            'public class Main {',
            '    public static void main(String[] args) {',
            '        System.out.println("Main Method");',
            '        Demo d1 = new Demo();',
            '        Demo d2 = new Demo();',
            '    }',
            '}',
        ]),
        gap(40),
        b('Output:'),
        para('Static Block 1'),
        para('Static Block 2'),
        para('Main Method'),
        para('Constructor'),
        para('Constructor'),
        gap(40),
        b('👉 Static blocks run once, constructors run every time'),
        gap(100),

        secHead('3. Static Block Memory Behavior'),
        para('• Stored in Method Area'),
        para('• Executed when class is loaded by JVM ClassLoader'),
        para('• Not tied to any object'),
        gap(100),

        secHead('3.3 Complex Map Initialization'),
        para('Static blocks are ideal for setting up final static collections:'),
        gap(20),
        codeBlock([
            'import java.util.HashMap;',
            'import java.util.Map;',
            'class CountryCodes {',
            '    static final Map<String, String> CODES = new HashMap<>();',
            '    static {',
            '        CODES.put("IN", "India");',
            '        CODES.put("US", "USA");',
            '        CODES.put("UK", "United Kingdom");',
            '    }',
            '}',
        ]),
        gap(40),
        b('👉 Why static block here?'),
        para('You cannot use loops or complex logic directly in variable declaration'),
        para('Static block allows multi-step initialization'),
        gap(60),
        b('Alternative (Advanced Clean Approach)'),
        codeBlock([
            'static final Map<String, String> CODES = Map.of(',
            '    "IN", "India",',
            '    "US", "USA"',
            ');',
        ]),
        gap(40),
        b('👉 But static block is still needed for:'),
        para('• large datasets'),
        para('• dynamic logic'),
        para('• external configuration'),
        gap(100),

        secHead('3.4 Static Blocks in Inheritance'),
        para('Parent static blocks always fire before Child static blocks.'),
        para('Objects and constructors are subsequent.'),
        gap(60),
        b('Complete Example'),
        codeBlock([
            'class Parent {',
            '    static { System.out.println("Parent Static Block"); }',
            '    Parent() { System.out.println("Parent Constructor"); }',
            '}',
            'class Child extends Parent {',
            '    static { System.out.println("Child Static Block"); }',
            '    Child() { System.out.println("Child Constructor"); }',
            '}',
        ]),
        gap(40),
        b('Output:'),
        para('Parent Static Block'),
        para('Child Static Block'),
        para('Parent Constructor'),
        para('Child Constructor'),
        gap(40),
        b('👉 Order:'),
        para('1. Parent static'),
        para('2. Child static'),
        para('3. Parent constructor'),
        para('4. Child constructor'),
        gap(100),

        secHead('4. Multiple Static Blocks'),
        para('Java allows multiple static blocks.'),
        gap(20),
        codeBlock([
            'class Test {',
            '    static { System.out.println("Block 1"); }',
            '    static { System.out.println("Block 2"); }',
            '}',
        ]),
        gap(20),
        para('👉 Executes in top-to-bottom order'),
        gap(100),

        secHead('5. Static Block Without Main Method'),
        para('Yes — Java allows execution without main() (older versions).'),
        gap(20),
        codeBlock([
            'class Test {',
            '    static {',
            '        System.out.println("Static Block Executed");',
            '        System.exit(0);',
            '    }',
            '}',
        ]),
        gap(40),
        b('👉 Used in:'),
        para('• tricky interview questions'),
        para('• JVM behavior understanding'),
        gap(100),

        secHead('6. Exception Handling Guide'),
        para('Catch errors inside blocks to prevent ExceptionInInitializerError which crashes class loading.'),
        gap(20),
        codeBlock([
            'class ConfigLoader {',
            '    static {',
            '        try {',
            '            int x = 10 / 0; // risky',
            '        } catch (Exception e) {',
            '            System.out.println("Handled Exception");',
            '        }',
            '    }',
            '}',
        ]),
        gap(40),
        b('👉 If not handled:'),
        codeBlock(['static {', '    int x = 10 / 0;', '}']),
        para('➡ JVM throws: ExceptionInInitializerError'),
        gap(100),

        secHead('7. Real-World Use Cases'),
        para('Static blocks are used in:'),
        para('• Database driver loading'),
        para('• Configuration loading'),
        para('• Cache initialization'),
        para('• Logging setup'),
        para('• Constant preparation'),
        gap(100),

        secHead('8. Static Block vs Constructor'),
        new Table({
            width: { size: 9360, type: WidthType.DXA },
            rows: [
                new TableRow({
                    children: [['Feature', 3120], ['Static Block', 3120], ['Constructor', 3120]].map(([t, w]) => new TableCell({
                        shading: { fill: '2E74B5', type: ShadingType.CLEAR },
                        children: [new Paragraph({ children: [new TextRun({ text: t, bold: true, color: 'FFFFFF' })] })]
                    }))
                }),
                ...[
                    ['Runs', 'Once', 'Every object'],
                    ['Belongs to', 'Class', 'Object'],
                    ['Trigger', 'Class load', 'Object creation'],
                    ['Purpose', 'Initialization', 'Object setup'],
                ].map(([a, b, c]) => new TableRow({
                    children: [a, b, c].map(t => new TableCell({
                        children: [new Paragraph({ children: [new TextRun({ text: t })] })]
                    }))
                }))
            ]
        }),
        gap(100),

        secHead('9. When to Use Static Blocks'),
        para('Use when:'),
        para('• Initialization is complex'),
        para('• Depends on multiple steps'),
        para('• Needed only once'),
        gap(40),
        para('Avoid when:'),
        para('• Logic depends on object data'),
        para('• Simple assignment is enough'),
        gap(100),

        secHead('Final Understanding'),
        para('Static blocks are part of class initialization phase in JVM.'),
        gap(40),
        b('They are powerful for:'),
        para('• one-time setup'),
        para('• preparing shared resources'),
        para('• controlling class loading behavior'),
        gap(40),
        b('Used correctly, they make your code:'),
        para('• cleaner'),
        para('• faster'),
        para('• more structured'),

        divider(),
    ];
}

// ── LESSON 4 : Ultimate Comparison — Static vs Instance (Full Deep Version) ───
function lesson4() {
    return [
        pageBreak(),
        ...lessonTitle('04', 'Static vs Instance (Deep Comparison)'),

        secHead('4.1 Mental Model: Blueprint vs House'),
        para('Think of a class as a blueprint and objects as actual houses.'),
        gap(20),
        b('Static (Class Level)'),
        para('→ Shared across ALL objects'),
        para('→ Created once when class loads'),
        para('→ Same value for everyone'),
        gap(40),
        b('Instance (Object Level)'),
        para('→ Unique per object'),
        para('→ Created when object is created'),
        para('→ Each object has its own copy'),
        gap(40),
        b('👉 Example Thinking:'),
        para('Static → Company Name (same for all employees)'),
        para('Instance → Employee Name (different for each)'),
        gap(100),

        secHead('4.2 Deep Comparison Table'),
        new Table({
            width: { size: 9360, type: WidthType.DXA },
            columnWidths: [2000, 3680, 3680],
            rows: [
                new TableRow({
                    children: [['Aspect', 2000], ['Static', 3680], ['Instance', 3680]].map(([t, w]) => new TableCell({
                        shading: { fill: '2E74B5', type: ShadingType.CLEAR },
                        width: { size: w, type: WidthType.DXA },
                        children: [new Paragraph({ children: [new TextRun({ text: t, bold: true, color: 'FFFFFF' })] })]
                    }))
                }),
                ...[
                    ['Belongs To', 'Class', 'Object'],
                    ['Memory Location', 'Method Area (MetaSpace)', 'Heap'],
                    ['Creation Time', 'Class Loading', 'Object Creation'],
                    ['Access Style', 'ClassName.member', 'object.member'],
                    ['Copies', 'Single Shared Copy', 'Multiple Copies'],
                    ['Polymorphism', '❌ No (Method Hiding)', '✅ Yes (Method Overriding)'],
                    ['this/super', '❌ Not Allowed', '✅ Allowed'],
                    ['Lifecycle', 'Until class unload', 'Until object GC'],
                    ['Thread Impact', 'Shared → needs caution', 'Isolated → safer'],
                ].map(([a, b, c]) => new TableRow({
                    children: [a, b, c].map(t => new TableCell({
                        children: [new Paragraph({ children: [new TextRun({ text: t })] })]
                    }))
                }))
            ]
        }),
        gap(100),

        secHead('4.3 Internal JVM Understanding (Important for Pro Level)'),
        para('When JVM runs:'),
        gap(40),
        b('Class Loads → Static comes first'),
        para('→ Static variables created'),
        para('→ Static blocks executed'),
        gap(40),
        b('Object Created → Instance comes next'),
        para('→ Instance variables allocated in Heap'),
        para('→ Constructor initializes values'),
        gap(60),
        b('👉 Key Insight:'),
        para('Static lives before objects even exist'),
        gap(100),

        secHead('4.4 Unified Example (Complete Working Code)'),
        codeBlock([
            'class Employee {',
            '',
            '    // Static Variable (Shared)',
            '    static String company = "TechCorp";',
            '',
            '    // Instance Variables (Unique)',
            '    String name;',
            '    int id;',
            '',
            '    // Constructor',
            '    Employee(String name, int id) {',
            '        this.name = name;',
            '        this.id = id;',
            '    }',
            '',
            '    // Static Method',
            '    static void changeCompany(String newCompany) {',
            '        company = newCompany;',
            '    }',
            '',
            '    // Instance Method',
            '    void display() {',
            '        System.out.println(name + " (" + id + ") works at " + company);',
            '    }',
            '}',
            '',
            'public class Main {',
            '    public static void main(String[] args) {',
            '',
            '        Employee e1 = new Employee("Sharan", 101);',
            '        Employee e2 = new Employee("Rahul", 102);',
            '',
            '        e1.display();',
            '        e2.display();',
            '',
            '        // Change shared data',
            '        Employee.changeCompany("Google");',
            '',
            '        e1.display();',
            '        e2.display();',
            '    }',
            '}',
        ]),
        gap(40),
        b('Output:'),
        para('Sharan (101) works at TechCorp'),
        para('Rahul (102) works at TechCorp'),
        para('Sharan (101) works at Google'),
        para('Rahul (102) works at Google'),
        gap(60),
        b('👉 Insight:'),
        para('Changing static affects ALL objects instantly'),
        gap(100),

        secHead('4.5 Memory Visualization (Very Important)'),
        codeBlock([
            'Method Area:',
            '-----------------------',
            'Employee.company = "TechCorp"',
            'Employee.changeCompany()',
            '',
            'Heap:',
            '-----------------------',
            'e1 → { name: "Sharan", id: 101 }',
            'e2 → { name: "Rahul", id: 102 }',
            '',
            'Stack:',
            '-----------------------',
            'e1 reference',
            'e2 reference',
        ]),
        gap(100),

        secHead('4.6 Behavior Difference (Real Thinking)'),
        b('Static Behavior'),
        para('Global/shared'),
        para('Used for constants, utilities'),
        para('One change → affects entire system'),
        gap(40),
        b('Instance Behavior'),
        para('Personal/object-specific'),
        para('Used for state/data'),
        para('Change affects only that object'),
        gap(100),

        secHead('4.7 Method Difference (Critical Interview Concept)'),
        b('Static Method'),
        codeBlock([
            'static void show() {',
            '    System.out.println("Static Method");',
            '}',
        ]),
        para('→ Called using class'),
        para('→ No object needed'),
        para('→ Cannot access instance variables directly'),
        gap(40),
        b('Instance Method'),
        codeBlock([
            'void show() {',
            '    System.out.println(name);',
            '}',
        ]),
        para('→ Requires object'),
        para('→ Can access both static + instance'),
        gap(100),

        secHead('4.8 Polymorphism Difference (VERY IMPORTANT)'),
        b('Static → Method Hiding'),
        codeBlock([
            'class A {',
            '    static void show() { System.out.println("A"); }',
            '}',
            'class B extends A {',
            '    static void show() { System.out.println("B"); }',
            '}',
            '',
            'A obj = new B();',
            'obj.show(); // A',
        ]),
        para('👉 Based on reference type'),
        gap(40),
        b('Instance → Method Overriding'),
        codeBlock([
            'class A {',
            '    void show() { System.out.println("A"); }',
            '}',
            'class B extends A {',
            '    void show() { System.out.println("B"); }',
            '}',
            '',
            'A obj = new B();',
            'obj.show(); // B',
        ]),
        para('👉 Based on object type'),
        gap(100),

        secHead('4.9 Access Rules (Very Important)'),
        b('Static Context Can Access:'),
        para('Static variables ✅'),
        para('Static methods ✅'),
        gap(40),
        b('Static Context Cannot Access:'),
        para('Instance variables ❌'),
        para('Instance methods ❌'),
        gap(40),
        b('Unless:'),
        codeBlock([
            'Employee e = new Employee("A",1);',
            'System.out.println(e.name);',
        ]),
        gap(100),

        secHead('4.10 Real-World Use Cases'),
        b('Static Used For:'),
        para('Constants'),
        para('static final double PI = 3.14;'),
        para('Utility Classes'),
        para('Math.sqrt(16);'),
        para('Shared Configurations'),
        para('static String DB_URL;'),
        gap(40),
        b('Instance Used For:'),
        para('User Data'),
        para('Business Logic'),
        para('Object-specific states'),
        gap(100),

        secHead('4.11 Quick Decision Guide (Improved)'),
        para('Ask yourself:'),
        para('Is data shared across all objects? → YES → Static'),
        para('Is data unique per object? → YES → Instance'),
        para('Does method depend on object data? → YES → Instance'),
        para('Is method just utility logic? → YES → Static'),
        gap(100),

        secHead('4.12 Common Mistakes (Deep Explanation)'),
        para('❌ 1. Accessing instance inside static'),
        codeBlock([
            'static void test() {',
            '    System.out.println(name); // ERROR',
            '}',
        ]),
        para('❌ 2. Using this in static'),
        codeBlock([
            'static void test() {',
            '    this.name = "A"; // ERROR',
            '}',
        ]),
        para('❌ 3. Expecting overriding'),
        para('Static does NOT override → it hides'),
        para('❌ 4. Modifying static unintentionally'),
        para('Employee.company = "XYZ"; // affects ALL objects'),
        gap(100),

        secHead('4.13 Advanced Insight (Senior Level)'),
        para('Static is loaded once → improves memory efficiency'),
        para('Instance increases memory usage per object'),
        gap(40),
        b('👉 That’s why:'),
        para('Static → scalable systems'),
        para('Instance → flexible systems'),
        gap(100),

        secHead('4.14 Final Concept Summary'),
        para('Static = Class Level / Shared / One Copy'),
        para('Instance = Object Level / Unique / Multiple Copies'),
        para('Static loads first, instance later'),
        para('Static methods → no object context'),
        para('Instance methods → full access'),

        divider(),
    ];
}

// ── BUILD ─────────────────────────────────────────────────────────────────────
const doc = new Document({
    numbering: {
        config: [
            {
                reference: 'bullets',
                levels: [{
                    level: 0, format: LevelFormat.BULLET, text: '\u2022',
                    alignment: AlignmentType.LEFT,
                    style: { paragraph: { indent: { left: 540, hanging: 300 } } }
                }]
            },
            {
                reference: 'subbullets',
                levels: [{
                    level: 0, format: LevelFormat.BULLET, text: '\u25E6',
                    alignment: AlignmentType.LEFT,
                    style: { paragraph: { indent: { left: 900, hanging: 300 } } }
                }]
            },
        ]
    },
    styles: {
        default: { document: { run: { font: 'Calibri', size: 22 } } },
        paragraphStyles: [
            {
                id: 'Heading1', name: 'Heading 1', basedOn: 'Normal', next: 'Normal', quickFormat: true,
                run: { size: 32, bold: true, font: 'Calibri', color: '1F3864' },
                paragraph: { spacing: { before: 320, after: 120 }, outlineLevel: 0 }
            },
            {
                id: 'Heading2', name: 'Heading 2', basedOn: 'Normal', next: 'Normal', quickFormat: true,
                run: { size: 26, bold: true, font: 'Calibri', color: '2E74B5' },
                paragraph: { spacing: { before: 240, after: 80 }, outlineLevel: 1 }
            },
        ]
    },
    sections: [{
        properties: {
            page: { size: { width: 12240, height: 15840 }, margin: { top: 1260, right: 1260, bottom: 1260, left: 1260 } }
        },
        children: [
            // Cover
            gap(600),
            new Paragraph({
                alignment: AlignmentType.CENTER,
                spacing: { before: 0, after: 120 },
                children: [new TextRun({ text: 'Java Programming', font: 'Calibri', size: 28, color: '2E74B5', bold: true })]
            }),
            new Paragraph({
                alignment: AlignmentType.CENTER,
                spacing: { before: 0, after: 60 },
                border: { bottom: { style: BorderStyle.SINGLE, size: 4, color: '2E74B5', space: 6 } },
                children: [new TextRun({ text: 'Static vs Instance — Complete Lesson Notes', font: 'Calibri', size: 40, bold: true, color: '1F3864' })]
            }),
            gap(80),
            new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [new TextRun({ text: 'Lesson 01: Static Variables   |   Lesson 02: Static Methods   |   Lesson 03: Static Blocks   |   Lesson 04: Static vs Instance', font: 'Calibri', size: 20, color: '595959' })]
            }),
            gap(600),

            ...lesson1(),
            ...lesson2(),
            ...lesson3(),
            ...lesson4(),
        ]
    }]
});

Packer.toBuffer(doc).then(buf => {
    fs.writeFileSync('/home/claude/java_lessons.docx', buf);
    console.log('Done');
}); l