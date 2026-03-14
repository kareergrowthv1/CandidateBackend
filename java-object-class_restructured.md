### The Object Class (The Universal Ancestor)
In Java, every single class (directly or indirectly) inherits from the `Object` class. It resides in the `java.lang` package and serves as the root of the class hierarchy.

#### 1. WHY THE OBJECT CLASS EXISTS?
The `Object` class provides a common behavior for all Java objects, such as memory management support, thread synchronization, and object comparison.

#### 2. CORE METHODS & THEIR DEPTH
The `Object` class defined 11 methods. Here are the most critical ones:

- **toString():**
  - **Default:** Returns `ClassName@HashCode`.
  - **Recommendation:** Always override to provide a human-readable representation of the object's state.
- **equals(Object obj):**
  - **Default:** Compares memory addresses (Reference equality `==`).
  - **Contract:** If you override `equals`, you **MUST** override `hashCode`.
- **hashCode():**
  - Returns an integer representation of the object's memory address (by default).
  - Used in `HashMap`, `HashSet`, and `Hashtable`.
- **getClass():** Returns a `Class` object representing the runtime class. Used for Reflection.
- **finalize():** (Deprecated since Java 9). Called by GC before destruction.
- **clone():** Creates a field-for-field copy. Requires the class to implement the `Cloneable` interface.

&nbsp;
#### 3. THREAD SYNCHRONIZATION METHODS
These methods are defined in `Object`, not `Thread`, because every object carries a monitor (lock).
- **wait():** Causes the current thread to wait until notified.
- **notify():** Wakes up a single thread waiting on the object's monitor.
- **notifyAll():** Wakes up all threads waiting on the object's monitor.

&nbsp;
#### 4. THE CONTRACT: equals() & hashCode()
This is the most common interview question. 

| Rule | Explanation |
|------|-------------|
| **Equality implies Hash** | If `obj1.equals(obj2)` is true, then `obj1.hashCode() == obj2.hashCode()` must be true. |
| **Hash does NOT imply Equality** | If two objects have the same hash code, they aren't necessarily equal (this is called a **Collision**). |

&nbsp;
#### 5. COMPARISON TABLE: == vs equals()
| Feature | == Operator | equals() Method |
|---------|-------------|-----------------|
| Type | Comparison Operator | Method in `Object` class |
| Purpose | Compares memory addresses (References). | Compares content (if overridden). |
| Compatibility | Primitive & Objects. | Objects only. |
| Null Safety | Safe. | Can throw `NullPointerException`. |

&nbsp;
#### 6. INTERVIEW MASTER TIPS
1. **Immutable classes:** When creating immutable classes, ensure `equals` and `hashCode` use the same fields to maintain the contract.
2. **Reflection:** `getClass()` is the entry point for Java Reflection API.

#### 7. AI LEARNING LAB
Featured Prompt: Contract Auditor
"Explain the 'Object Contract' between `equals()` and `hashCode()`. Provide a code example where failing to override `hashCode()` while overriding `equals()` leads to a bug in a `HashMap`."
