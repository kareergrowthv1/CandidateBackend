### Java Loop Statements (Advanced Guide)
Loops are control flow statements that allow code to be executed repeatedly based on a given boolean condition. They are essential for processing collections, automating tasks, and implementing repetitive logic.

#### 1. THE WHILE LOOP (ENTER-CONTROLLED)
The `while` loop is the most fundamental loop. It repeats a statement or block as long as its controlling expression is true.

&nbsp;
Execution Logic:
1. The condition is evaluated.
2. If `true`, the body executes. If `false`, the loop terminates.
3. This is called a **Pre-test Loop** because the condition is checked before the first iteration.

```java
int i = 1;
while (i <= 5) {
    System.out.println("Count: " + i);
    i++; // Increment is crucial to avoid infinite loops
}
```

#### 2. THE DO-WHILE LOOP (EXIT-CONTROLLED)
The `do-while` loop always executes its body at least once, because its conditional expression is at the bottom of the loop.

&nbsp;
Execution Logic:
1. The body executes first.
2. The condition is evaluated.
3. If `true`, the loop repeats.
4. This is a **Post-test Loop**.

```java
int i = 10;
do {
    System.out.println("This runs once even if 10 < 5 is false");
} while (i < 5);
```

#### 3. THE FOR LOOP (ITERATION-CONTROLLED)
The `for` loop is most useful when you know exactly how many times you want to iterate. It collects the initialization, condition, and increment/decrement in one line.

&nbsp;
The 3 Parts:
Initialization: Executed only once at the start.
Condition: Checked before every iteration.
Update: Executed after every iteration body.

```java
for (int i = 0; i < 5; i++) {
    System.out.println("Iteration: " + i);
}
```

#### 4. ENHANCED FOR LOOP (FOR-EACH)
Introduced to provide a simpler way to iterate through elements of a collection or array. It eliminates the need for an index variable.
```java
int[] array = {10, 20, 30};
for (int val : array) {
    System.out.println(val);
}
```
**Limitation:** You cannot use it to modify the array or access elements by index.

#### 5. THE 'BREAK' & 'CONTINUE' MECHANICS
These keywords provide granular control over the loop's execution.

&nbsp;
Break:
Used to exit from a loop or switch statement immediately. It "breaks" the loop.
Example: Searching for a value and stopping as soon as it is found.

&nbsp;
Continue:
Used to skip the current iteration and move directly to the next condition check/update.
Example: Printing only odd numbers by skipping even ones.

&nbsp;
Labeled Loops:
Unique to Java/C++, labels allow you to break/continue an outer loop from an inner nested loop.
```java
outer: for(int i=0; i<3; i++) {
    for(int j=0; j<3; j++) {
        if(i == 1 && j == 1) break outer;
    }
}
```

#### 6. LOOP PERFORMANCE & OPTIMIZATION
| Loop Type | Pros | Cons |
|-----------|------|------|
| While | Best for unknown iteration count | Easy to create infinite loops |
| For | Very readable and compact | Best for ranges only |
| For-each | Most expressive and safe | No access to index |

&nbsp;
Optimization Tips:
1. **Loop Unrolling:** Reducing the overhead of the loop control code by increasing the work done in each iteration.
2. **Loop Invariant Hoisting:** Moving calculations that don't change during the loop (like `array.length`) outside the loop to save CPU cycles.

#### 7. INFINITE LOOPS & STACK OVERFLOW
An infinite loop consumes CPU resources and can hang an application. 
- Ensure your condition eventually becomes `false`.
- In recursion (which acts like a loop), ensure a "Base Case" exists, otherwise, you'll hit a `StackOverflowError`.

#### 8. AI LEARNING LAB: INTERACTIVE LOOPS
Master efficiency and logic by using our expert-verified AI prompts.

Featured Prompt: Loop Optimization Expert
"Act as a Senior Software Engineer. I have a nested loop processing a million records. Show me how to use Java Streams as a modern alternative to for-loops and explain the performance benefits of parallel streams."
