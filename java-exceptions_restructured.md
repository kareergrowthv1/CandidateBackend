### Exception Handling (The Crash-Proof Guide)
Exceptions are unexpected events that occur during program execution. Robust software must gracefully handle these events to prevent system failure.

#### 1. EXCEPTION HIERARCHY
The `Throwable` class is the root. It branches into two categories:
- **Error:** Serious problems that applications should NOT try to catch (e.g., `OutOfMemoryError`, `StackOverflowError`).
- **Exception:** Conditions that an application might want to catch.

&nbsp;
#### 2. CHECKED VS UNCHECKED EXCEPTIONS
| Feature | Checked Exception | Unchecked (RuntimeException) |
|---------|-------------------|-----------------------------|
| **Checked at** | Compile-time | Runtime |
| **Handling**| Required (try-catch or throws) | Optional |
| **Logic** | Recoverable issues (File missing) | Programming errors (null pointers) |
| **Examples** | `IOException`, `SQLException` | `NullPointerException`, `ArithmeticException` |

&nbsp;
#### 3. THE try-catch-finally TRIO
- **try:** Encloses code that might throw an exception.
- **catch:** Handles the specific exception.
- **finally:** (Always executes) Used for resource cleanup (closing DB connections, files).

&nbsp;
#### 4. throw VS throws
- **throw:** Used to explicitly throw a single exception *instance* from a method body.
- **throws:** Used in a method *signature* to declare that this method might throw one or more exceptions.

&nbsp;
#### 5. CUSTOM EXCEPTIONS
You can create your own exception classes by extending `Exception` (checked) or `RuntimeException` (unchecked). 
`class InvalidAgeException extends Exception { ... }`

&nbsp;
#### 6. EXCEPTION PROPAGATION
If an exception is not caught, it "bubbles up" the call stack until it finds a handler. If it reaches the `main()` method and is still not caught, the JVM terminates the program.

&nbsp;
#### 7. INTERVIEW MASTER TIPS (NO-FAIL RULES)
1. **Never swallow exceptions:** Don't leave catch blocks empty. At least log the error.
2. **Specific catch first:** Always catch subclasses before parent classes (e.g., catch `FileNotFoundException` before `IOException`).
3. **Try-with-resources:** Use `try(Resource r = ...) { ... }` (Java 7+) to auto-close resources. It's cleaner than `finally`.

#### 8. AI LEARNING LAB
Featured Prompt: Clean Code Auditor
"Analyze this code block: `try { ... } catch (Exception e) { e.printStackTrace(); } finally { ... }`. Why is catching the base `Exception` class considered a 'Code Smell'? Suggest a refactored version using specific exceptions."
