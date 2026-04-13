const {
    Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
    HeadingLevel, AlignmentType, BorderStyle, WidthType, ShadingType,
    LevelFormat, PageBreak
} = require('docx');
const fs = require('fs');

// Color palette
const C = {
    blue: "1E3A5F",
    lightBlue: "2E75B6",
    accent: "00B0F0",
    darkGray: "2F2F2F",
    midGray: "595959",
    lightGray: "F2F2F2",
    codeBg: "1E1E1E",
    codeText: "D4D4D4",
    green: "107C10",
    orange: "C55A11",
    yellow: "FFF2CC",
    yellowBdr: "F4B942",
    white: "FFFFFF",
    headerBg: "1E3A5F",
    lessonBg: "E8F4FD",
    lessonBdr: "2E75B6",
};

const border1 = { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" };
const borders = { top: border1, bottom: border1, left: border1, right: border1 };
const noBorder = { style: BorderStyle.NONE, size: 0, color: "FFFFFF" };
const noBorders = { top: noBorder, bottom: noBorder, left: noBorder, right: noBorder };

function h(text, level, color = C.blue) {
    const sizes = { 1: 40, 2: 32, 3: 26, 4: 24 };
    return new Paragraph({
        heading: level === 1 ? HeadingLevel.HEADING_1 : level === 2 ? HeadingLevel.HEADING_2 : level === 3 ? HeadingLevel.HEADING_3 : HeadingLevel.HEADING_4,
        spacing: { before: level === 1 ? 400 : level === 2 ? 320 : 200, after: level === 1 ? 200 : 160 },
        children: [new TextRun({ text, bold: true, size: sizes[level], color, font: "Arial" })]
    });
}

function p(text, options = {}) {
    const runs = typeof text === 'string' ? [new TextRun({ text, size: 22, font: "Arial", color: C.darkGray, ...options })] : text;
    return new Paragraph({ spacing: { before: 80, after: 140 }, children: runs });
}

function code(lines) {
    const rows = lines.map(line => new TableRow({
        children: [new TableCell({
            borders: noBorders,
            width: { size: 9360, type: WidthType.DXA },
            margins: { top: 0, bottom: 0, left: 160, right: 160 },
            shading: { fill: C.codeBg, type: ShadingType.CLEAR },
            children: [new Paragraph({
                spacing: { before: 20, after: 20 },
                children: [new TextRun({ text: line === '' ? ' ' : line, font: "Courier New", size: 18, color: C.codeText })]
            })]
        })]
    }));
    return new Table({
        width: { size: 9360, type: WidthType.DXA },
        columnWidths: [9360],
        rows
    });
}

function codeGap() {
    return new Paragraph({ spacing: { before: 20, after: 20 }, children: [new TextRun('')] });
}

function keyPoint(label, text) {
    return new Paragraph({
        spacing: { before: 80, after: 80 },
        children: [
            new TextRun({ text: `⚡ ${label}: `, bold: true, size: 22, color: C.lightBlue, font: "Arial" }),
            new TextRun({ text, size: 22, font: "Arial", color: C.darkGray })
        ]
    });
}

function noteBox(text) {
    return new Table({
        width: { size: 9360, type: WidthType.DXA },
        columnWidths: [9360],
        rows: [new TableRow({
            children: [new TableCell({
                borders: { top: { style: BorderStyle.SINGLE, size: 4, color: C.yellowBdr }, bottom: { style: BorderStyle.SINGLE, size: 4, color: C.yellowBdr }, left: { style: BorderStyle.THICK, size: 12, color: C.yellowBdr }, right: { style: BorderStyle.SINGLE, size: 4, color: C.yellowBdr } },
                shading: { fill: C.yellow, type: ShadingType.CLEAR },
                margins: { top: 100, bottom: 100, left: 160, right: 160 },
                children: [new Paragraph({ children: [new TextRun({ text: `📝 NOTE: ${text}`, size: 21, font: "Arial", color: "7A5C00" })] })]
            })]
        })]
    });
}

function lessonHeader(num, title) {
    return new Table({
        width: { size: 9360, type: WidthType.DXA },
        columnWidths: [9360],
        rows: [new TableRow({
            children: [new TableCell({
                borders: { top: { style: BorderStyle.SINGLE, size: 6, color: C.lightBlue }, bottom: { style: BorderStyle.SINGLE, size: 6, color: C.lightBlue }, left: { style: BorderStyle.THICK, size: 20, color: C.lightBlue }, right: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" } },
                shading: { fill: C.lessonBg, type: ShadingType.CLEAR },
                margins: { top: 140, bottom: 140, left: 200, right: 200 },
                children: [
                    new Paragraph({ children: [new TextRun({ text: `LESSON ${num}`, size: 18, bold: true, color: C.accent, font: "Arial", allCaps: true })] }),
                    new Paragraph({ children: [new TextRun({ text: title, size: 30, bold: true, color: C.blue, font: "Arial" })] })
                ]
            })]
        })]
    });
}

function sectionTitle(text) {
    return new Paragraph({
        spacing: { before: 200, after: 80 },
        border: { bottom: { style: BorderStyle.SINGLE, size: 2, color: C.lightBlue } },
        children: [new TextRun({ text, bold: true, size: 24, color: C.lightBlue, font: "Arial" })]
    });
}

function compareTwoCol(leftTitle, leftLines, rightTitle, rightLines) {
    const maxLines = Math.max(leftLines.length, rightLines.length);
    const L = [...leftLines];
    const R = [...rightLines];
    while (L.length < maxLines) L.push('');
    while (R.length < maxLines) R.push('');

    const headerRow = new TableRow({
        children: [
            new TableCell({
                borders, shading: { fill: C.lightBlue, type: ShadingType.CLEAR },
                width: { size: 4680, type: WidthType.DXA },
                margins: { top: 80, bottom: 80, left: 120, right: 120 },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: leftTitle, bold: true, size: 22, color: C.white, font: "Arial" })] })]
            }),
            new TableCell({
                borders, shading: { fill: C.orange, type: ShadingType.CLEAR },
                width: { size: 4680, type: WidthType.DXA },
                margins: { top: 80, bottom: 80, left: 120, right: 120 },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: rightTitle, bold: true, size: 22, color: C.white, font: "Arial" })] })]
            })
        ]
    });

    const dataRows = L.map((lText, i) => new TableRow({
        children: [
            new TableCell({
                borders, shading: { fill: i % 2 === 0 ? "EBF5FF" : C.white, type: ShadingType.CLEAR },
                width: { size: 4680, type: WidthType.DXA },
                margins: { top: 60, bottom: 60, left: 120, right: 120 },
                children: [new Paragraph({ children: [new TextRun({ text: lText, size: 20, font: "Courier New", color: C.darkGray })] })]
            }),
            new TableCell({
                borders, shading: { fill: i % 2 === 0 ? "FFF5EB" : C.white, type: ShadingType.CLEAR },
                width: { size: 4680, type: WidthType.DXA },
                margins: { top: 60, bottom: 60, left: 120, right: 120 },
                children: [new Paragraph({ children: [new TextRun({ text: R[i], size: 20, font: "Courier New", color: C.darkGray })] })]
            })
        ]
    }));

    return new Table({ width: { size: 9360, type: WidthType.DXA }, columnWidths: [4680, 4680], rows: [headerRow, ...dataRows] });
}

function diffTable(rows) {
    const border2 = { style: BorderStyle.SINGLE, size: 1, color: "AAAAAA" };
    const b2 = { top: border2, bottom: border2, left: border2, right: border2 };
    const header = new TableRow({
        children: ["Aspect", "static", "Non-static (Instance)"].map((t, i) => new TableCell({
            borders: b2, shading: { fill: C.blue, type: ShadingType.CLEAR },
            width: { size: [2400, 3480, 3480][i], type: WidthType.DXA },
            margins: { top: 80, bottom: 80, left: 120, right: 120 },
            children: [new Paragraph({ children: [new TextRun({ text: t, bold: true, size: 21, color: C.white, font: "Arial" })] })]
        }))
    });
    const dataRows = rows.map(([a, s, n], idx) => new TableRow({
        children: [[a, 2400], [s, 3480], [n, 3480]].map(([txt, w]) => new TableCell({
            borders: b2,
            shading: { fill: idx % 2 === 0 ? C.lightGray : C.white, type: ShadingType.CLEAR },
            width: { size: w, type: WidthType.DXA },
            margins: { top: 60, bottom: 60, left: 120, right: 120 },
            children: [new Paragraph({ children: [new TextRun({ text: txt, size: 20, font: "Arial", color: C.darkGray })] })]
        }))
    }));
    return new Table({ width: { size: 9360, type: WidthType.DXA }, columnWidths: [2400, 3480, 3480], rows: [header, ...dataRows] });
}

function gap(space = 100) {
    return new Paragraph({ spacing: { before: space, after: space }, children: [new TextRun('')] });
}

function bullet(text, indent = 0) {
    return new Paragraph({
        spacing: { before: 40, after: 40 },
        numbering: { reference: "bullets", level: indent },
        children: [new TextRun({ text, size: 21, font: "Arial", color: C.darkGray })]
    });
}

function pageBreak() {
    return new Paragraph({ children: [new PageBreak()] });
}

// ─── COVER PAGE ───────────────────────────────────────────────────────────────
const coverSection = [
    gap(800),
    new Table({
        width: { size: 9360, type: WidthType.DXA }, columnWidths: [9360],
        rows: [new TableRow({
            children: [new TableCell({
                borders: noBorders,
                shading: { fill: C.blue, type: ShadingType.CLEAR },
                margins: { top: 400, bottom: 400, left: 400, right: 400 },
                children: [
                    new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "JAVA PROGRAMMING", size: 28, color: C.accent, bold: true, font: "Arial" })] }),
                    new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Complete Course Notes", size: 24, color: "AADDFF", font: "Arial" })] }),
                    gap(40),
                    new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Static vs Instance", size: 52, bold: true, color: C.white, font: "Arial" })] }),
                    gap(20),
                    new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Variables  •  Methods  •  Blocks  •  Comparison", size: 24, color: "AADDFF", font: "Arial" })] }),
                    gap(40),
                    new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "4 Lessons  |  Beginner to Advanced  |  With Full Examples", size: 20, color: "88BBDD", font: "Arial" })] }),
                ]
            })]
        })]
    }),
    gap(300),
    new Table({
        width: { size: 9360, type: WidthType.DXA }, columnWidths: [2340, 2340, 2340, 2340],
        rows: [new TableRow({
            children: [
                ["01", "Static\nVariables"], ["02", "Static\nMethods"], ["03", "Static\nBlocks"], ["04", "Static vs\nInstance"]
            ].map(([num, title]) => new TableCell({
                borders: { top: { style: BorderStyle.SINGLE, size: 6, color: C.accent }, bottom: border1, left: border1, right: border1 },
                shading: { fill: C.lightGray, type: ShadingType.CLEAR },
                margins: { top: 100, bottom: 100, left: 120, right: 120 },
                width: { size: 2340, type: WidthType.DXA },
                children: [
                    new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: num, size: 36, bold: true, color: C.lightBlue, font: "Arial" })] }),
                    new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: title, size: 18, color: C.midGray, font: "Arial" })] })
                ]
            }))
        })]
    }),
];

// ─── LESSON 1: STATIC VARIABLES ───────────────────────────────────────────────
const lesson1 = [
    pageBreak(),
    lessonHeader("01", "Static Variables"),
    gap(120),

    sectionTitle("1.1  What is a Static Variable?"),
    p("A static variable (also called a class variable) belongs to the class itself — not to any individual object. It is declared with the static keyword inside a class but outside all methods."),
    gap(60),
    code([
        "class ClassName {",
        "    static dataType variableName;   // static variable",
        "    dataType instanceVariable;      // instance variable (for comparison)",
        "}",
    ]),
    gap(100),

    sectionTitle("1.2  Memory — Where Does It Live?"),
    p("Static variables are stored in the Method Area (Class Area) of JVM memory. Only ONE copy exists regardless of how many objects you create. Instance variables live in the Heap — each object gets its own copy."),
    gap(60),
    compareTwoCol(
        "Static Variable (Method Area)",
        ["class Student {", "  static int count = 0;", "}", "", "// ONE copy in memory", "// shared by ALL objects"],
        "Instance Variable (Heap)",
        ["class Student {", "  String name;", "}", "", "// NEW copy per object", "// obj1.name ≠ obj2.name"]
    ),
    gap(100),

    sectionTitle("1.3  Basic Example — Object Counter"),
    p("The most common use of static variables is counting how many objects of a class have been created:"),
    gap(60),
    code([
        "class Student {",
        "    // Static variable — shared by all Student objects",
        "    static int totalStudents = 0;",
        "",
        "    // Instance variable — unique to each Student",
        "    String name;",
        "    int rollNumber;",
        "",
        "    // Constructor",
        "    Student(String name, int rollNumber) {",
        "        this.name = name;",
        "        this.rollNumber = rollNumber;",
        "        totalStudents++;   // increment shared counter",
        "    }",
        "",
        "    void display() {",
        "        System.out.println(\"Name: \" + name + \", Roll: \" + rollNumber);",
        "    }",
        "}",
        "",
        "class Main {",
        "    public static void main(String[] args) {",
        "        Student s1 = new Student(\"Alice\", 101);",
        "        Student s2 = new Student(\"Bob\",   102);",
        "        Student s3 = new Student(\"Carol\", 103);",
        "",
        "        s1.display();  // Name: Alice, Roll: 101",
        "        s2.display();  // Name: Bob,   Roll: 102",
        "        s3.display();  // Name: Carol, Roll: 103",
        "",
        "        // Access via class name (recommended)",
        "        System.out.println(\"Total: \" + Student.totalStudents);  // 3",
        "",
        "        // Access via object reference (works but not recommended)",
        "        System.out.println(\"Total: \" + s1.totalStudents);       // 3",
        "    }",
        "}",
    ]),
    gap(100),
    noteBox("Always access static variables using the CLASS NAME (Student.totalStudents), not through an object reference. Using object references is allowed but misleading."),
    gap(100),

    sectionTitle("1.4  Static Variable with Inheritance"),
    p("Static variables are inherited but NOT overridden. Subclasses share the same static variable unless they declare their own."),
    gap(60),
    code([
        "class Animal {",
        "    static String kingdom = \"Animalia\";",
        "    String name;",
        "",
        "    Animal(String name) { this.name = name; }",
        "}",
        "",
        "class Dog extends Animal {",
        "    Dog(String name) { super(name); }",
        "}",
        "",
        "class Main {",
        "    public static void main(String[] args) {",
        "        System.out.println(Animal.kingdom);   // Animalia",
        "        System.out.println(Dog.kingdom);      // Animalia (inherited)",
        "",
        "        // Change through subclass — affects ALL",
        "        Dog.kingdom = \"Changed\";",
        "        System.out.println(Animal.kingdom);   // Changed!",
        "    }",
        "}",
    ]),
    gap(100),

    sectionTitle("1.5  Constants with static final"),
    p("Combining static with final creates a constant — a value that belongs to the class and can never change. By convention, constants use ALL_CAPS with underscores."),
    gap(60),
    code([
        "class MathConstants {",
        "    static final double PI       = 3.14159265358979;",
        "    static final double E        = 2.71828182845904;",
        "    static final int    MAX_SIZE = 1000;",
        "}",
        "",
        "class Circle {",
        "    double radius;",
        "",
        "    Circle(double radius) { this.radius = radius; }",
        "",
        "    double area() {",
        "        return MathConstants.PI * radius * radius;",
        "    }",
        "",
        "    double circumference() {",
        "        return 2 * MathConstants.PI * radius;",
        "    }",
        "}",
        "",
        "class Main {",
        "    public static void main(String[] args) {",
        "        Circle c = new Circle(7.0);",
        "        System.out.println(\"Area: \"          + c.area());          // 153.93...",
        "        System.out.println(\"Circumference: \" + c.circumference()); // 43.98...",
        "",
        "        // MathConstants.PI = 3.0;  // ERROR! Cannot assign to final",
        "    }",
        "}",
    ]),
    gap(100),

    sectionTitle("1.6  Advanced — Singleton Pattern"),
    p("The Singleton pattern ensures only ONE instance of a class can ever exist. It relies heavily on a static variable to hold that single instance."),
    gap(60),
    code([
        "class DatabaseConnection {",
        "    // Static variable holds the one and only instance",
        "    private static DatabaseConnection instance = null;",
        "",
        "    private String url;",
        "    private boolean connected;",
        "",
        "    // Private constructor — prevents new DatabaseConnection()",
        "    private DatabaseConnection() {",
        "        this.url = \"jdbc:mysql://localhost/myDB\";",
        "        this.connected = false;",
        "        System.out.println(\"Connection object created.\");",
        "    }",
        "",
        "    // Static factory method",
        "    public static DatabaseConnection getInstance() {",
        "        if (instance == null) {",
        "            instance = new DatabaseConnection();",
        "        }",
        "        return instance;",
        "    }",
        "",
        "    public void connect() { this.connected = true; }",
        "    public boolean isConnected() { return connected; }",
        "}",
        "",
        "class Main {",
        "    public static void main(String[] args) {",
        "        DatabaseConnection db1 = DatabaseConnection.getInstance();",
        "        DatabaseConnection db2 = DatabaseConnection.getInstance();",
        "        DatabaseConnection db3 = DatabaseConnection.getInstance();",
        "",
        "        System.out.println(db1 == db2);  // true — same object!",
        "        System.out.println(db2 == db3);  // true",
        "",
        "        db1.connect();",
        "        System.out.println(db3.isConnected()); // true (same object)",
        "    }",
        "}",
    ]),
    gap(80),
    keyPoint("Key Insight", "static variable instance persists for the entire program lifetime. The first call creates it; all later calls return the same one."),
    gap(100),

    sectionTitle("1.7  Quick Summary — Static Variables"),
    gap(60),
    diffTable([
        ["Keyword", "static dataType var", "dataType var"],
        ["Memory", "Method Area (once)", "Heap (per object)"],
        ["Copies", "Exactly 1", "1 per object"],
        ["Access", "ClassName.var", "objectRef.var"],
        ["Lifetime", "Class load → unload", "Object creation → GC"],
        ["Default val", "Yes (0, null, false)", "Yes (same defaults)"],
        ["Use case", "Counters, constants, cache", "Object-specific data"],
    ]),
];

// ─── LESSON 2: STATIC METHODS ─────────────────────────────────────────────────
const lesson2 = [
    pageBreak(),
    lessonHeader("02", "Static Methods"),
    gap(120),

    sectionTitle("2.1  What is a Static Method?"),
    p("A static method belongs to the class, not to any object. You can call it without creating an instance of the class. Static methods are declared with the static keyword before the return type."),
    gap(60),
    code([
        "class ClassName {",
        "    // Static method — call via ClassName.methodName()",
        "    static returnType methodName(parameters) {",
        "        // body",
        "    }",
        "",
        "    // Instance method — need an object to call",
        "    returnType instanceMethod(parameters) {",
        "        // body",
        "    }",
        "}",
    ]),
    gap(100),

    sectionTitle("2.2  First Example — Utility Methods"),
    p("Java's built-in Math class is a perfect example — all methods are static, so you never need to create a Math object:"),
    gap(60),
    code([
        "class MathUtils {",
        "    // Static utility methods",
        "    static int add(int a, int b)      { return a + b; }",
        "    static int subtract(int a, int b) { return a - b; }",
        "    static int multiply(int a, int b) { return a * b; }",
        "    static double divide(int a, int b) {",
        "        if (b == 0) {",
        "            System.out.println(\"Cannot divide by zero!\");",
        "            return 0;",
        "        }",
        "        return (double) a / b;",
        "    }",
        "",
        "    static int max(int a, int b) { return (a > b) ? a : b; }",
        "    static int min(int a, int b) { return (a < b) ? a : b; }",
        "",
        "    static boolean isEven(int n)    { return n % 2 == 0; }",
        "    static boolean isPrime(int n) {",
        "        if (n < 2) return false;",
        "        for (int i = 2; i <= Math.sqrt(n); i++)",
        "            if (n % i == 0) return false;",
        "        return true;",
        "    }",
        "}",
        "",
        "class Main {",
        "    public static void main(String[] args) {",
        "        // Call without creating any object",
        "        System.out.println(MathUtils.add(10, 5));         // 15",
        "        System.out.println(MathUtils.divide(10, 3));      // 3.333...",
        "        System.out.println(MathUtils.isPrime(17));        // true",
        "        System.out.println(MathUtils.isEven(42));         // true",
        "    }",
        "}",
    ]),
    gap(100),

    sectionTitle("2.3  The Golden Rules of Static Methods"),
    p("These two rules are the most important things to understand about static methods:"),
    gap(60),
    noteBox("RULE 1: A static method can only directly access static variables and call other static methods. It CANNOT access instance variables or instance methods without an object reference."),
    gap(80),
    noteBox("RULE 2: A static method CANNOT use 'this' or 'super' keywords because these keywords refer to objects, and static methods have no associated object."),
    gap(80),
    code([
        "class Demo {",
        "    int instanceVar   = 10;   // instance",
        "    static int staticVar = 20;   // static",
        "",
        "    static void staticMethod() {",
        "        System.out.println(staticVar);          // OK",
        "        // System.out.println(instanceVar);     // ERROR!",
        "        // System.out.println(this.instanceVar);// ERROR! no 'this'",
        "",
        "        // To use instance var inside static method, need an object:",
        "        Demo obj = new Demo();",
        "        System.out.println(obj.instanceVar);    // OK via object",
        "    }",
        "",
        "    void instanceMethod() {",
        "        System.out.println(instanceVar);        // OK",
        "        System.out.println(staticVar);          // OK (can access both)",
        "        staticMethod();                         // OK (can call static method)",
        "    }",
        "}",
    ]),
    gap(100),

    sectionTitle("2.4  Factory Methods (static constructors)"),
    p("Factory methods are a powerful design pattern where static methods create and return objects. They give you more control over object creation than constructors:"),
    gap(60),
    code([
        "class Temperature {",
        "    private double celsius;",
        "",
        "    // Private constructor",
        "    private Temperature(double celsius) {",
        "        this.celsius = celsius;",
        "    }",
        "",
        "    // Static factory methods — named constructors",
        "    static Temperature fromCelsius(double c) {",
        "        return new Temperature(c);",
        "    }",
        "",
        "    static Temperature fromFahrenheit(double f) {",
        "        return new Temperature((f - 32) * 5.0 / 9.0);",
        "    }",
        "",
        "    static Temperature fromKelvin(double k) {",
        "        return new Temperature(k - 273.15);",
        "    }",
        "",
        "    // Conversion methods",
        "    double toCelsius()    { return celsius; }",
        "    double toFahrenheit() { return celsius * 9.0 / 5.0 + 32; }",
        "    double toKelvin()     { return celsius + 273.15; }",
        "",
        "    @Override",
        "    public String toString() {",
        "        return String.format(\"%.2f°C / %.2f°F / %.2fK\",",
        "            celsius, toFahrenheit(), toKelvin());",
        "    }",
        "}",
        "",
        "class Main {",
        "    public static void main(String[] args) {",
        "        Temperature t1 = Temperature.fromCelsius(100);",
        "        Temperature t2 = Temperature.fromFahrenheit(98.6);",
        "        Temperature t3 = Temperature.fromKelvin(0);",
        "",
        "        System.out.println(t1);  // 100.00°C / 212.00°F / 373.15K",
        "        System.out.println(t2);  // 37.00°C  / 98.60°F  / 310.15K",
        "        System.out.println(t3);  // -273.15°C / -459.67°F / 0.00K",
        "    }",
        "}",
    ]),
    gap(100),

    sectionTitle("2.5  Method Overloading in Static Methods"),
    p("Static methods can be overloaded just like instance methods — multiple methods with the same name but different parameter lists:"),
    gap(60),
    code([
        "class Formatter {",
        "    // Overloaded static format methods",
        "    static String format(int value) {",
        "        return \"Integer: \" + value;",
        "    }",
        "",
        "    static String format(double value) {",
        "        return String.format(\"Double: %.4f\", value);",
        "    }",
        "",
        "    static String format(String value) {",
        "        return \"String: \\\"\" + value + \"\\\"\";",
        "    }",
        "",
        "    static String format(int value, int width) {",
        "        return String.format(\"%\" + width + \"d\", value);",
        "    }",
        "}",
        "",
        "class Main {",
        "    public static void main(String[] args) {",
        "        System.out.println(Formatter.format(42));           // Integer: 42",
        "        System.out.println(Formatter.format(3.14159));      // Double: 3.1416",
        "        System.out.println(Formatter.format(\"hello\"));    // String: \"hello\"",
        "        System.out.println(Formatter.format(42, 8));        //       42",
        "    }",
        "}",
    ]),
    gap(100),

    sectionTitle("2.6  Advanced — Method Chaining with static"),
    p("Static methods can be used to build fluent APIs using method chaining. Here is a builder-style query builder:"),
    gap(60),
    code([
        "class QueryBuilder {",
        "    private static StringBuilder query = new StringBuilder();",
        "",
        "    static QueryBuilder select(String columns) {",
        "        query = new StringBuilder(\"SELECT \" + columns);",
        "        return new QueryBuilder();",
        "    }",
        "",
        "    QueryBuilder from(String table) {",
        "        query.append(\" FROM \").append(table);",
        "        return this;",
        "    }",
        "",
        "    QueryBuilder where(String condition) {",
        "        query.append(\" WHERE \").append(condition);",
        "        return this;",
        "    }",
        "",
        "    QueryBuilder orderBy(String column) {",
        "        query.append(\" ORDER BY \").append(column);",
        "        return this;",
        "    }",
        "",
        "    String build() {",
        "        return query.toString();",
        "    }",
        "}",
        "",
        "class Main {",
        "    public static void main(String[] args) {",
        "        String sql = QueryBuilder",
        "            .select(\"name, age, email\")",
        "            .from(\"users\")",
        "            .where(\"age > 18\")",
        "            .orderBy(\"name\")",
        "            .build();",
        "",
        "        System.out.println(sql);",
        "        // SELECT name, age, email FROM users WHERE age > 18 ORDER BY name",
        "    }",
        "}",
    ]),
    gap(100),

    sectionTitle("2.7  Quick Summary — Static Methods"),
    gap(60),
    diffTable([
        ["Keyword", "static returnType method()", "returnType method()"],
        ["Belongs to", "Class", "Object (instance)"],
        ["Call syntax", "ClassName.method()", "objRef.method()"],
        ["this/super", "NOT allowed", "Allowed"],
        ["Access inst.", "Only via object ref", "Directly"],
        ["Override", "No (method hiding)", "Yes (polymorphism)"],
        ["Best for", "Utility, factory, helpers", "Object behavior"],
    ]),
];

// ─── LESSON 3: STATIC BLOCKS ──────────────────────────────────────────────────
const lesson3 = [
    pageBreak(),
    lessonHeader("03", "Static Blocks"),
    gap(120),

    sectionTitle("3.1  What is a Static Block?"),
    p("A static block (also called a static initializer block) is a block of code that runs automatically when the class is loaded by the JVM — before any object is created and before the main method runs. It has no name and no return type."),
    gap(60),
    code([
        "class ClassName {",
        "    static {",
        "        // This code runs ONCE when class is loaded",
        "        // Perfect for complex static variable initialization",
        "    }",
        "}",
    ]),
    gap(100),

    sectionTitle("3.2  Execution Order — When Does It Run?"),
    p("Understanding when static blocks run is critical. The JVM follows this order:"),
    gap(60),
    code([
        "class OrderDemo {",
        "    // Step 1: static variable declaration (memory allocated)",
        "    static int x = 10;",
        "",
        "    // Step 2: static block runs",
        "    static {",
        "        System.out.println(\"Static block runs. x = \" + x);",
        "        x = 20;  // can modify static variables",
        "    }",
        "",
        "    // Instance variable",
        "    int y = 100;",
        "",
        "    // Instance initializer block",
        "    {",
        "        System.out.println(\"Instance block runs. y = \" + y);",
        "    }",
        "",
        "    // Constructor",
        "    OrderDemo() {",
        "        System.out.println(\"Constructor runs.\");",
        "    }",
        "}",
        "",
        "class Main {",
        "    public static void main(String[] args) {",
        "        System.out.println(\"main() starts.\");",
        "        OrderDemo o1 = new OrderDemo();",
        "        OrderDemo o2 = new OrderDemo();",
        "        System.out.println(\"Final x = \" + OrderDemo.x);",
        "    }",
        "}",
        "",
        "/* OUTPUT:",
        "   Static block runs. x = 10   <-- runs ONCE on class load",
        "   main() starts.",
        "   Instance block runs. y = 100 <-- runs each time",
        "   Constructor runs.",
        "   Instance block runs. y = 100",
        "   Constructor runs.",
        "   Final x = 20",
        "*/",
    ]),
    gap(100),

    sectionTitle("3.3  Multiple Static Blocks"),
    p("A class can have multiple static blocks. They execute in the ORDER they appear in the source code, top to bottom:"),
    gap(60),
    code([
        "class MultiStatic {",
        "    static int a;",
        "    static int b;",
        "    static int c;",
        "",
        "    static {",
        "        a = 10;",
        "        System.out.println(\"Block 1: a = \" + a);",
        "    }",
        "",
        "    static {",
        "        b = a * 2;",
        "        System.out.println(\"Block 2: b = \" + b);",
        "    }",
        "",
        "    static {",
        "        c = a + b;",
        "        System.out.println(\"Block 3: c = \" + c);",
        "    }",
        "}",
        "",
        "class Main {",
        "    public static void main(String[] args) {",
        "        System.out.println(\"Values: a=\" + MultiStatic.a +",
        "                           \", b=\" + MultiStatic.b +",
        "                           \", c=\" + MultiStatic.c);",
        "    }",
        "}",
        "",
        "/* OUTPUT:",
        "   Block 1: a = 10",
        "   Block 2: b = 20",
        "   Block 3: c = 30",
        "   Values: a=10, b=20, c=30",
        "*/",
    ]),
    gap(100),

    sectionTitle("3.4  Real-World Use Case — Loading Config/Resources"),
    p("The most common real-world use of static blocks is loading configuration files, database drivers, or setting up resources that must be ready before any object is created:"),
    gap(60),
    code([
        "import java.util.HashMap;",
        "",
        "class CountryCodes {",
        "    // Complex data structure — hard to initialize inline",
        "    private static final HashMap<String, String> CODES;",
        "",
        "    // Static block initializes the complex data",
        "    static {",
        "        CODES = new HashMap<>();",
        "        CODES.put(\"IN\", \"India\");",
        "        CODES.put(\"US\", \"United States\");",
        "        CODES.put(\"GB\", \"United Kingdom\");",
        "        CODES.put(\"JP\", \"Japan\");",
        "        CODES.put(\"DE\", \"Germany\");",
        "        CODES.put(\"FR\", \"France\");",
        "        CODES.put(\"AU\", \"Australia\");",
        "        System.out.println(\"Country codes loaded: \" + CODES.size() + \" entries\");",
        "    }",
        "",
        "    static String getCountry(String code) {",
        "        return CODES.getOrDefault(code, \"Unknown\");",
        "    }",
        "",
        "    static boolean isValidCode(String code) {",
        "        return CODES.containsKey(code);",
        "    }",
        "}",
        "",
        "class Main {",
        "    public static void main(String[] args) {",
        "        // Class loads here — static block fires",
        "        System.out.println(CountryCodes.getCountry(\"IN\"));  // India",
        "        System.out.println(CountryCodes.getCountry(\"JP\"));  // Japan",
        "        System.out.println(CountryCodes.isValidCode(\"XX\")); // false",
        "    }",
        "}",
    ]),
    gap(100),

    sectionTitle("3.5  Exception Handling in Static Blocks"),
    p("Static blocks can throw checked exceptions, but they must be wrapped. If an exception escapes a static block, the JVM throws an ExceptionInInitializerError and the class fails to load:"),
    gap(60),
    code([
        "class SafeConfig {",
        "    static String serverAddress;",
        "    static int port;",
        "    static boolean initialized;",
        "",
        "    static {",
        "        try {",
        "            // Simulate reading from a config file",
        "            serverAddress = System.getProperty(\"server.address\", \"localhost\");",
        "            String portStr = System.getProperty(\"server.port\", \"8080\");",
        "            port = Integer.parseInt(portStr);",
        "            initialized = true;",
        "            System.out.println(\"Config loaded: \" + serverAddress + \":\" + port);",
        "        } catch (NumberFormatException e) {",
        "            System.err.println(\"Invalid port in config, using default 8080\");",
        "            port = 8080;",
        "            initialized = false;",
        "        } catch (Exception e) {",
        "            System.err.println(\"Config error: \" + e.getMessage());",
        "            initialized = false;",
        "        }",
        "    }",
        "}",
    ]),
    gap(100),

    sectionTitle("3.6  Advanced — Static Block in Inheritance"),
    p("When a child class is loaded, Java first loads the parent class (if not already loaded). Static blocks fire in order: parent first, then child:"),
    gap(60),
    code([
        "class Parent {",
        "    static int parentVal;",
        "",
        "    static {",
        "        parentVal = 100;",
        "        System.out.println(\"Parent static block: parentVal = \" + parentVal);",
        "    }",
        "",
        "    Parent() {",
        "        System.out.println(\"Parent constructor\");",
        "    }",
        "}",
        "",
        "class Child extends Parent {",
        "    static int childVal;",
        "",
        "    static {",
        "        childVal = parentVal * 2;",
        "        System.out.println(\"Child static block: childVal = \" + childVal);",
        "    }",
        "",
        "    Child() {",
        "        super();",
        "        System.out.println(\"Child constructor\");",
        "    }",
        "}",
        "",
        "class Main {",
        "    public static void main(String[] args) {",
        "        System.out.println(\"--- Creating first Child ---\");",
        "        Child c1 = new Child();",
        "        System.out.println(\"--- Creating second Child ---\");",
        "        Child c2 = new Child();",
        "    }",
        "}",
        "",
        "/* OUTPUT:",
        "   Parent static block: parentVal = 100   <- runs once",
        "   Child static block: childVal = 200     <- runs once",
        "   --- Creating first Child ---",
        "   Parent constructor",
        "   Child constructor",
        "   --- Creating second Child ---",
        "   Parent constructor",
        "   Child constructor",
        "*/",
    ]),
    gap(100),

    sectionTitle("3.7  Quick Summary — Static Blocks"),
    gap(60),
    diffTable([
        ["Syntax", "static { ... }", "{ ... }"],
        ["Type", "Static initializer", "Instance initializer"],
        ["Runs when", "Class is first loaded", "Each object is created"],
        ["Runs how many", "Exactly once", "Once per object"],
        ["Can access", "Only static members", "Instance + static members"],
        ["this/super", "NOT allowed", "Allowed"],
        ["Use for", "Static field setup, config", "Object field setup"],
    ]),
];

// ─── LESSON 4: STATIC VS INSTANCE ─────────────────────────────────────────────
const lesson4 = [
    pageBreak(),
    lessonHeader("04", "Static vs Non-Static (Instance)"),
    gap(120),

    sectionTitle("4.1  The Core Difference — A Mental Model"),
    p("Think of a class as a blueprint for a house. Instance members are like the rooms inside each house — each house has its own rooms. Static members are like the street address rules for the neighbourhood — the same rule applies to every house."),
    gap(80),
    code([
        "class BankAccount {",
        "    // Static — belongs to the 'Bank', shared by all accounts",
        "    static double interestRate = 3.5;   // same rate for everyone",
        "    static int totalAccounts  = 0;",
        "",
        "    // Instance — belongs to each individual account",
        "    String accountHolder;",
        "    String accountNumber;",
        "    double balance;",
        "",
        "    BankAccount(String holder, String number, double initialDeposit) {",
        "        this.accountHolder = holder;",
        "        this.accountNumber = number;",
        "        this.balance = initialDeposit;",
        "        totalAccounts++;",
        "    }",
        "",
        "    // Instance method — operates on THIS account's balance",
        "    void addInterest() {",
        "        balance += balance * (interestRate / 100);",
        "    }",
        "",
        "    // Static method — changes rate for ALL accounts",
        "    static void setInterestRate(double rate) {",
        "        interestRate = rate;",
        "    }",
        "",
        "    void printStatement() {",
        "        System.out.printf(\"Account: %s | Holder: %s | Balance: %.2f%n\",",
        "            accountNumber, accountHolder, balance);",
        "    }",
        "}",
        "",
        "class Main {",
        "    public static void main(String[] args) {",
        "        BankAccount a1 = new BankAccount(\"Alice\", \"ACC001\", 10000);",
        "        BankAccount a2 = new BankAccount(\"Bob\",   \"ACC002\", 25000);",
        "        BankAccount a3 = new BankAccount(\"Carol\", \"ACC003\", 5000);",
        "",
        "        System.out.println(\"Total Accounts: \" + BankAccount.totalAccounts); // 3",
        "        System.out.println(\"Interest Rate: \" + BankAccount.interestRate);   // 3.5",
        "",
        "        a1.addInterest();  // 10000 + 350 = 10350",
        "        a2.addInterest();  // 25000 + 875 = 25875",
        "",
        "        // Change rate affects ALL future interest calculations",
        "        BankAccount.setInterestRate(4.0);",
        "        a3.addInterest();  // 5000 + 200 = 5200 (uses new rate)",
        "",
        "        a1.printStatement();  // Account: ACC001 | Holder: Alice | Balance: 10350.00",
        "        a2.printStatement();  // Account: ACC002 | Holder: Bob   | Balance: 25875.00",
        "        a3.printStatement();  // Account: ACC003 | Holder: Carol | Balance: 5200.00",
        "    }",
        "}",
    ]),
    gap(100),

    sectionTitle("4.2  Access Rules — What Can Access What?"),
    p("This is one of the most tested topics in Java. Learn this table by heart:"),
    gap(60),
    new Table({
        width: { size: 9360, type: WidthType.DXA }, columnWidths: [3120, 3120, 3120],
        rows: [
            new TableRow({
                children: ["From \\ Access", "Static Member", "Instance Member"].map((t, i) => new TableCell({
                    borders, shading: { fill: C.blue, type: ShadingType.CLEAR },
                    width: { size: [3120, 3120, 3120][i], type: WidthType.DXA },
                    margins: { top: 80, bottom: 80, left: 120, right: 120 },
                    children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: t, bold: true, size: 21, color: C.white, font: "Arial" })] })]
                }))
            }),
            ...[
                ["Static method", "✅  Direct access", "❌  Need object ref"],
                ["Static block", "✅  Direct access", "❌  Need object ref"],
                ["Instance method", "✅  Direct access", "✅  Direct access"],
                ["Instance block", "✅  Direct access", "✅  Direct access"],
                ["Constructor", "✅  Direct access", "✅  Direct access"],
            ].map(([a, b, c], i) => new TableRow({
                children: [[a, 3120], [b, 3120], [c, 3120]].map(([t, w]) => new TableCell({
                    borders,
                    shading: { fill: i % 2 === 0 ? C.lightGray : C.white, type: ShadingType.CLEAR },
                    width: { size: w, type: WidthType.DXA },
                    margins: { top: 60, bottom: 60, left: 120, right: 120 },
                    children: [new Paragraph({ children: [new TextRun({ text: t, size: 20, font: "Arial", color: C.darkGray })] })]
                }))
            }))
        ]
    }),
    gap(100),

    sectionTitle("4.3  Method Overriding — Static is NOT polymorphic"),
    p("This is a very common interview topic. Static methods cannot be overridden — they are 'hidden'. Instance methods can be overridden and demonstrate runtime polymorphism:"),
    gap(60),
    code([
        "class Vehicle {",
        "    // Static method — will be HIDDEN, not overridden",
        "    static void staticInfo() {",
        "        System.out.println(\"Vehicle: static method\");",
        "    }",
        "",
        "    // Instance method — will be OVERRIDDEN",
        "    void instanceInfo() {",
        "        System.out.println(\"Vehicle: instance method\");",
        "    }",
        "}",
        "",
        "class Car extends Vehicle {",
        "    // This HIDES the parent static method (not overrides)",
        "    static void staticInfo() {",
        "        System.out.println(\"Car: static method\");",
        "    }",
        "",
        "    // This OVERRIDES the parent instance method",
        "    @Override",
        "    void instanceInfo() {",
        "        System.out.println(\"Car: instance method\");",
        "    }",
        "}",
        "",
        "class Main {",
        "    public static void main(String[] args) {",
        "        Vehicle v = new Car();   // reference type = Vehicle, object = Car",
        "",
        "        // Static — resolved at COMPILE TIME based on reference type",
        "        v.staticInfo();          // Vehicle: static method (not Car!)",
        "        Vehicle.staticInfo();    // Vehicle: static method",
        "        Car.staticInfo();        // Car: static method",
        "",
        "        // Instance — resolved at RUNTIME based on actual object",
        "        v.instanceInfo();        // Car: instance method (polymorphism!)",
        "    }",
        "}",
    ]),
    gap(80),
    noteBox("Static binding (compile-time) vs Dynamic binding (runtime) — static methods use static binding; instance methods use dynamic binding. This is WHY static methods cannot participate in polymorphism."),
    gap(100),

    sectionTitle("4.4  Complete Side-by-Side Comparison"),
    gap(60),
    diffTable([
        ["Belongs to", "Class", "Object (instance)"],
        ["Memory", "Method Area — allocated on load", "Heap — allocated on new"],
        ["Access", "ClassName.member", "objectRef.member"],
        ["this keyword", "Not available", "Available"],
        ["super keyword", "Not available", "Available"],
        ["Overridable", "No (method hiding only)", "Yes (polymorphism)"],
        ["Lifetime", "Entire program (class load→unload)", "Object lifetime"],
        ["Shared", "Yes — one copy for all objects", "No — one copy per object"],
        ["Use case", "Utility, constants, counters", "Object state and behavior"],
    ]),
    gap(100),

    sectionTitle("4.5  Advanced — When to Choose Static vs Instance"),
    p("Follow these guidelines when designing classes:"),
    gap(60),
    code([
        "// USE STATIC when:",
        "// 1. The method/variable does not depend on object state",
        "// 2. You want shared data across all instances",
        "// 3. Writing utility/helper methods",
        "// 4. Implementing constants",
        "",
        "class StringUtils {",
        "    // Does not need any object state — perfect for static",
        "    static boolean isPalindrome(String s) {",
        "        String reversed = new StringBuilder(s).reverse().toString();",
        "        return s.equalsIgnoreCase(reversed);",
        "    }",
        "",
        "    static String capitalize(String s) {",
        "        if (s == null || s.isEmpty()) return s;",
        "        return Character.toUpperCase(s.charAt(0)) + s.substring(1).toLowerCase();",
        "    }",
        "",
        "    static int countVowels(String s) {",
        "        int count = 0;",
        "        for (char c : s.toLowerCase().toCharArray())",
        "            if (\"aeiou\".indexOf(c) >= 0) count++;",
        "        return count;",
        "    }",
        "}",
        "",
        "// USE INSTANCE when:",
        "// 1. The method/variable depends on object state",
        "// 2. You need different values per object",
        "// 3. You need polymorphism / overriding",
        "",
        "class Employee {",
        "    String name;",
        "    String department;",
        "    double baseSalary;",
        "    int yearsOfService;",
        "",
        "    Employee(String name, String dept, double salary, int years) {",
        "        this.name = name; this.department = dept;",
        "        this.baseSalary = salary; this.yearsOfService = years;",
        "    }",
        "",
        "    // Depends on THIS employee's data — must be instance",
        "    double calculateBonus() {",
        "        double rate = yearsOfService > 5 ? 0.20 : 0.10;",
        "        return baseSalary * rate;",
        "    }",
        "",
        "    double totalCompensation() {",
        "        return baseSalary + calculateBonus();",
        "    }",
        "",
        "    String getPayslipSummary() {",
        "        return String.format(\"%s (%s): Base=%.2f Bonus=%.2f Total=%.2f\",",
        "            name, department, baseSalary,",
        "            calculateBonus(), totalCompensation());",
        "    }",
        "}",
        "",
        "class Main {",
        "    public static void main(String[] args) {",
        "        // Static usage — no object needed",
        "        System.out.println(StringUtils.isPalindrome(\"Racecar\"));  // true",
        "        System.out.println(StringUtils.capitalize(\"jAVA\"));       // Java",
        "        System.out.println(StringUtils.countVowels(\"Hello World\")); // 3",
        "",
        "        // Instance usage — object holds state",
        "        Employee e1 = new Employee(\"Alice\", \"Engineering\", 80000, 7);",
        "        Employee e2 = new Employee(\"Bob\",   \"Marketing\",   60000, 3);",
        "",
        "        System.out.println(e1.getPayslipSummary());",
        "        // Alice (Engineering): Base=80000.00 Bonus=16000.00 Total=96000.00",
        "        System.out.println(e2.getPayslipSummary());",
        "        // Bob (Marketing): Base=60000.00 Bonus=6000.00 Total=66000.00",
        "    }",
        "}",
    ]),
    gap(100),

    sectionTitle("4.6  Common Mistakes & How to Avoid Them"),
    gap(60),
    code([
        "// ❌ MISTAKE 1: Accessing instance member from static context",
        "class Wrong1 {",
        "    int x = 10;",
        "    static void method() {",
        "        System.out.println(x);  // COMPILE ERROR: non-static x",
        "    }",
        "}",
        "",
        "// ✅ FIX: Either make x static, or use an object",
        "class Fixed1 {",
        "    int x = 10;",
        "    static void method() {",
        "        Fixed1 obj = new Fixed1();",
        "        System.out.println(obj.x);  // OK",
        "    }",
        "}",
        "",
        "// ❌ MISTAKE 2: Using 'this' in static method",
        "class Wrong2 {",
        "    String name = \"Test\";",
        "    static void print() {",
        "        System.out.println(this.name);  // COMPILE ERROR: no 'this'",
        "    }",
        "}",
        "",
        "// ❌ MISTAKE 3: Thinking static override = polymorphism",
        "class Parent { static void show() { System.out.println(\"Parent\"); } }",
        "class Child extends Parent { static void show() { System.out.println(\"Child\"); } }",
        "",
        "class Test {",
        "    public static void main(String[] args) {",
        "        Parent p = new Child();",
        "        p.show();  // Prints \"Parent\" — NOT \"Child\"!",
        "        // Static methods resolved by reference type, not object type",
        "    }",
        "}",
        "",
        "// ❌ MISTAKE 4: Mutating shared static state accidentally",
        "class Config {",
        "    static int[] data = {1, 2, 3};",
        "}",
        "// If any object modifies Config.data, ALL see the change!",
        "// Use static final for constants, or defensive copies for arrays.",
    ]),
];

// ─── BUILD DOCUMENT ───────────────────────────────────────────────────────────
const doc = new Document({
    numbering: {
        config: [
            { reference: "bullets", levels: [{ level: 0, format: LevelFormat.BULLET, text: "•", alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 720, hanging: 360 } } } }] }
        ]
    },
    styles: {
        default: { document: { run: { font: "Arial", size: 22 } } },
        paragraphStyles: [
            {
                id: "Heading1", name: "Heading 1", basedOn: "Normal", next: "Normal", quickFormat: true,
                run: { size: 40, bold: true, font: "Arial", color: C.blue }, paragraph: { spacing: { before: 400, after: 200 }, outlineLevel: 0 }
            },
            {
                id: "Heading2", name: "Heading 2", basedOn: "Normal", next: "Normal", quickFormat: true,
                run: { size: 32, bold: true, font: "Arial", color: C.lightBlue }, paragraph: { spacing: { before: 320, after: 160 }, outlineLevel: 1 }
            },
            {
                id: "Heading3", name: "Heading 3", basedOn: "Normal", next: "Normal", quickFormat: true,
                run: { size: 26, bold: true, font: "Arial", color: C.midGray }, paragraph: { spacing: { before: 200, after: 120 }, outlineLevel: 2 }
            },
        ]
    },
    sections: [{
        properties: {
            page: { size: { width: 12240, height: 15840 }, margin: { top: 1080, right: 1080, bottom: 1080, left: 1080 } }
        },
        children: [
            ...coverSection,
            ...lesson1,
            ...lesson2,
            ...lesson3,
            ...lesson4,
            gap(200),
        ]
    }]
});

Packer.toBuffer(doc).then(buf => {
    fs.writeFileSync('/home/claude/java_static_course.docx', buf);
    console.log('Done!');
});



