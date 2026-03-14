### Multithreading (The Parallel Universe)
Multithreading allows multiple parts of a program to execute concurrently, maximizing CPU utilization and improving application responsiveness.

#### 1. PROCESS VS THREAD
- **Process:** An executing program with its own memory space (Heavyweight).
- **Thread:** A subset of a process that shares memory with other threads (Lightweight).

&nbsp;
#### 2. CREATING THREADS IN JAVA
1. **Extending Thread Class:** Simple, but you cannot inherit from any other class.
2. **Implementing Runnable Interface:** More flexible; allows your class to inherit from a business base class.

&nbsp;
#### 3. THREAD LIFECYCLE (STATES)
- **New:** Thread object is created but `start()` is not called.
- **Runnable:** Calling `start()` moves it here. JVM decides when to run it.
- **Blocked/Waiting:** Waiting for a lock or I/O.
- **Timed Waiting:** Waiting for a specific duration (`sleep(1000)`).
- **Terminated:** Execution is complete.

&nbsp;
#### 4. THREAD SYNCHRONIZATION
When multiple threads access shared resources, data inconsistency occurs (**Race Condition**).
- **Synchronized Method/Block:** Ensures only one thread can access the code at a time using a lock.
- **Volatile:** Ensures a variable is read directly from main memory, not from a thread's cache.

&nbsp;
#### 5. INTER-THREAD COMMUNICATION (wait, notify, notifyAll)
Threads communicate using the `wait()` and `notify()` methods of the `Object` class. This must be done inside a synchronized context.

&nbsp;
#### 6. COMPARISON TABLE: SLEEP VS WAIT
| Feature | Thread.sleep() | Object.wait() |
|---------|----------------|---------------|
| **Source Class** | `Thread` | `Object` |
| **Lock Release?** | No | **Yes** |
| **Wake Up** | Auto (after time) | Manual (`notify()`) |
| **Context** | Anywhere | Synchronized block only |

&nbsp;
#### 7. INTERVIEW MASTER TIPS
1. **Start vs Run:** Always call `start()`. Calling `run()` directly doesn't create a new thread; it just runs the code in the current thread.
2. **Deadlock:** Occurs when two threads are waiting for each other to release locks. Avoid by using fixed lock ordering.

#### 8. AI LEARNING LAB
Featured Prompt: Race Condition Auditor
"Explain a 'Race Condition' in Java with a code example involving a shared Bank Account object. How does the `synchronized` keyword resolve this issue?"
