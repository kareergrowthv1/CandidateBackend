### Java Operators (The Complete Masterclass)
Operators in Java are more than just symbols; they are the fundamental building blocks of program logic and data manipulation. This module provides a deep dive into every operator category, supported by practical examples and "Twist Questions" designed for interview readiness.

#### 1. ARITHMETIC OPERATORS (Mathematical Foundations)
Used to perform standard mathematical calculations.

| Operator | Description | Example (a=10, b=3) | Result |
|----------|-------------|---------------------|--------|
| + | Addition | a + b | 13 |
| - | Subtraction | a - b | 7 |
| * | Multiplication | a * b | 30 |
| / | Division (Integer) | a / b | 3 |
| % | Modulo (Remainder) | a % b | 1 |

&nbsp;
Expert Deep Dive:
- **Integer Division:** `10 / 3` is `3`, not `3.333`. Java truncates the decimal. To get a precise result, use `(double) 10 / 3`.
- **String Concatenation:** If one operand is a String, the `+` operator performs concatenation.
`System.out.println("Result: " + 10 + 20);` // Output: Result: 1020

#### 2. UNARY OPERATORS (Single-Operand Power)
Operators that act upon only one operand.

| Operator | Action | Logic |
|----------|--------|-------|
| ++x | Pre-increment | Increment first, then use. |
| x++ | Post-increment | Use first, then increment. |
| ! | Logical NOT | Reverses `true` to `false`. |
| ~ | Bitwise NOT | Inverts all bits (One's complement). |

&nbsp;
⚡ **TWIST QUESTION: The Increment Maze**
```java
int a = 10;
int result = a++ + ++a + a--;
// Step 1: a++ uses 10, then a becomes 11.
// Step 2: ++a increments 11 to 12, then uses 12.
// Step 3: a-- uses 12, then a becomes 11.
// Final Calculation: 10 + 12 + 12 = 34.
```

#### 3. RELATIONAL & LOGICAL OPERATORS
Used to build complex decision-making logic.

&nbsp;
**Short-Circuiting (The Critical Difference):**
- **&& (Logical AND):** If the left side is `false`, it doesn't even look at the right side.
- **& (Bitwise AND):** Always evaluates both sides, even if the first is `false`.

&nbsp;
⚡ **TWIST QUESTION: Logical AND vs Bitwise AND**
```java
int x = 10;
if (false && (++x > 10)) { /* nothing */ }
System.out.println(x); // Output: 10 (Short-circuited!)

if (false & (++x > 10)) { /* nothing */ }
System.out.println(x); // Output: 11 (Both evaluated!)
```

⚡ **TWIST QUESTION: The instanceof Mystery**
```java
String str = null;
boolean result = str instanceof String;
System.out.println(result); // Output: false (null is not an instance of any class)
```

⚡ **TWIST QUESTION: Shift Overflow**
```java
int val = 1;
System.out.println(val << 31); // Output: -2147483648 (Moves to most significant bit/sign bit)
System.out.println(val << 32); // Output: 1 (Shift amount is modulo 32 for ints)
```

#### 4. BITWISE & SHIFT OPERATORS (Binary Precision)
Manipulate data at the bit level for high performance.

| Operator | Logic | Usage |
|----------|-------|-------|
| & | AND | Bitwise intersection. |
| \| | OR | Bitwise union. |
| ^ | XOR | Only 1 if bits are different. |
| << | Left Shift | Multiply by $2^n$. |
| >> | Right Shift | Divide by $2^n$ (Preserves sign). |
| >>> | Unsigned Right Shift | Fills with 0 (Doesn't preserve sign). |

#### 5. THE TERNARY OPERATOR (Compact Logic)
A shorthand for `if-else` that returns a value.
`String status = (marks >= 35) ? "Passed" : "Failed";`

&nbsp;
⚡ **TWIST QUESTION: Nested Ternary**
`int max = (a > b) ? (a > c ? a : c) : (b > c ? b : c);`
(This logic finds the largest of three numbers in a single line.)

#### 6. COMPLETE PRECEDENCE & ASSOCIATIVITY TABLE
When multiple operators appear, they are evaluated in this strict order:

| Priority | Category | Operators | Associativity |
|----------|----------|-----------|---------------|
| 1 | Postfix | `x++`, `x--` | Left to Right |
| 2 | Unary | `++x`, `--x`, `!`, `~` | Right to Left |
| 3 | Math (High) | `*`, `/`, `%` | Left to Right |
| 4 | Math (Low) | `+`, `-` | Left to Right |
| 5 | Shift | `<<`, `>>`, `>>>` | Left to Right |
| 6 | Comparison | `<`, `>`, `<=`, `>=`, `instanceof` | Left to Right |
| 7 | Equality | `==`, `!=` | Left to Right |
| 8 | Logical AND | `&&` | Left to Right |
| 9 | Logical OR | `||` | Left to Right |
| 10 | Assignment | `=`, `+=`, `-=`, etc. | **Right to Left** |

&nbsp;
⚡ **TWIST QUESTION: Assignment Chains**
```java
int a, b, c;
a = b = c = 50; 
// Due to Right-to-Left associativity:
// 1. c = 50
// 2. b = c (50)
// 3. a = b (50)
```

#### 7. INTERVIEW MASTER TIPS (NO-FAIL RULES)
1. **Never use `==` for String comparison:** It compares memory addresses, not characters. Use `.equals()`.
2. **Modulo sign rule:** `(-10 % 3)` is `-1`. The result always carries the sign of the left operand.
3. **Compound Assignment Optimization:** `x += 5` is not exactly `x = x + 5`. Compound operators include an **implicit cast**, which prevents compilation errors for smaller types (e.g., `byte b = 1; b += 1;` works, but `b = b + 1;` fails).

#### 8. AI LEARNING LAB: INTERACTIVE OPERATORS
Build your logic muscles with our expert-verified AI prompts.

Featured Prompt: Tricky Expression Solver
"Act as a Java Logic Auditor. Evaluate the following expression step-by-step using precedence and associativity: `int z = 5 + ++x * --y / 2 % 3;`. Explain which operator wins at each step."
