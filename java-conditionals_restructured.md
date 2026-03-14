### Java Condition Statements (Advanced Guide)
Conditional statements, or decision-making statements, allow a program to decide which block of code to execute based on whether a specific condition evaluates to `true` or `false`. In Java, this branching logic is fundamental to building dynamic and intelligent applications.

#### 1. THE IF-ELSE ECOSYSTEM
The `if` statement is the most basic control flow statement. It tells your program to execute a certain section of code only if a particular test evaluates to `true`.

&nbsp;
Basic If Statement:
Used when there is only one possibility.
```java
if (age >= 18) {
    System.out.println("You are eligible to vote.");
}
```

&nbsp;
If-Else Statement:
Used when there are two possibilities—one for `true` and one for `false`.
```java
if (number % 2 == 0) {
    System.out.println("Even Number");
} else {
    System.out.println("Odd Number");
}
```

&nbsp;
Else-If Ladder:
When you have multiple mutually exclusive conditions. The JVM checks each condition from top to bottom. As soon as one is `true`, its block executes, and the rest of the ladder is skipped.
```java
if (marks >= 90) System.out.println("Grade A");
else if (marks >= 75) System.out.println("Grade B");
else if (marks >= 50) System.out.println("Grade C");
else System.out.println("Fail");
```

#### 2. NESTED CONDITIONS & COMPLEX LOGIC
Nesting involves placing an `if` statement inside another. While powerful, deep nesting (more than 3 levels) can make code "spaghetti-like" and hard to read.

&nbsp;
Example (Nested If):
```java
if (country.equals("India")) {
    if (age >= 18) {
        System.out.println("Indian Voter");
    }
}
```
**Refactoring Tip:** Often, nested if statements can be simplified using Logical Operators (`&&`, `||`).
`if (country.equals("India") && age >= 18) { ... }`

#### 3. THE SWITCH STATEMENT (DEEP DIVE)
The `switch` statement is a multi-way branch statement. It provides an efficient way to transfer execution to different parts of code based on the value of an expression.

&nbsp;
How it Works:
1. The expression is evaluated once.
2. The value is compared with each `case` label.
3. If a match is found, the code following that case executes until a `break` is encountered.

&nbsp;
Rules of Switch:
- Duplicate case values are not allowed.
- The case value must be of the same data type as the variable in the switch.
- The case value must be a constant or a literal; variables are not allowed.
- The `break` statement is optional. If omitted, execution **falls through** to subsequent cases (Fall-through behavior).

&nbsp;
Supported Types:
Originally only supported `int`, `char`, `short`, and `byte`. Since Java 7, it supports `String`. Since Java 5, it supports `Enums` and **Wrapper Classes** (`Integer`, `Byte`, etc.).

#### 4. TERNARY OPERATOR (CONDITIONAL OPERATOR)
The only operator in Java that takes three operands. It is a concise shorthand for `if-else`.
```java
String result = (marks >= 35) ? "Pass" : "Fail";
```
**Advantage:** Reduces lines of code for simple assignments.
**Disadvantage:** Can become unreadable if used for complex logic.

#### 5. PERFORMANCE: IF-ELSE VS SWITCH
| Feature | If-Else Ladder | Switch Statement |
|---------|----------------|------------------|
| Logic Type | Logical (True/False) | Equality Check (Jump) |
| Speed | Linear (O(n)) | Constant (O(1) with Jump Tables) |
| Best For | Ranges (x > 10) | Fixed Constants (1, 2, 3) |
| Compilation | Compiled to conditional jumps | Compiled to `tableswitch` or `lookupswitch` |

#### 6. COMMON PITFALLS & BEST PRACTICES
1. **Forgeting the Break:** Leads to logical bugs where multiple blocks execute unexpectedly.
2. **Comparison with `==` for Strings:** In `if` statements, always use `.equals()` for strings to compare content, not memory addresses.
3. **Dead Code:** Ensure conditions are not redundant (e.g., `if(x > 10) ... else if(x > 5)` — if x is 15, the second block is unreachable).
4. **Default Case:** Always include a `default` block in `switch` to handle unexpected values.

#### 7. AI LEARNING LAB: INTERACTIVE CONDITIONALS
Master branching logic and performance by using our expert-verified AI prompts.

Featured Prompt: Code Refactor Assistant
"Act as a Clean Code Consultant. I have a 10-level nested if-else structure for processing user permissions. Suggest three ways to refactor this: using a Map, a Switch, and the Strategy Design Pattern. Explain the pros/cons of each."
