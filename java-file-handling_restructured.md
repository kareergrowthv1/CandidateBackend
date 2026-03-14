### File Handling & I/O (The Data Bridge)
File handling in Java allows programs to interact with the file system—reading data from files and writing data to them.

#### 1. THE FILE CLASS
The `java.io.File` class represents a file or directory path. It doesn't read/write content; it manages metadata (exists, rename, delete, permissions).

#### 2. STREAMS: THE CORE MECHANISM
Java uses **Streams** to transfer data.
- **Byte Streams (`InputStream`/`OutputStream`):** Handles binary data (Images, PDFs). Uses `8-bit` bytes.
- **Character Streams (`Reader`/`Writer`):** Handles text data. Uses `16-bit` Unicode.

&nbsp;
#### 3. READING & WRITING TEXT FILES
- **FileReader / FileWriter:** The simplest way to read/write characters.
- **BufferedReader / BufferedWriter:** Wraps another stream for efficiency. It reads data in "chunks" instead of one bypass at a time.
  - *Method:* `readLine()` is a game-changer for text processing.

&nbsp;
#### 4. SERIALIZATION (Object I/O)
The process of converting an object's state into a byte stream to save to a file or send over a network.
- **Requirement:** Class must implement `java.io.Serializable`.
- **transient Keyword:** Used to mark fields that should NOT be serialized (e.g., passwords).

&nbsp;
#### 5. JAVA NIO (NEW I/O) - JAVA 7+
NIO uses **Channels** and **Buffers** for non-blocking I/O, which is significantly faster for high-volume data.
`Files.write(Path, Bytes)` and `Files.readAllLines(Path)` are modern, cleaner alternatives.

&nbsp;
#### 6. COMPARISON TABLE: IO VS NIO
| Feature | Java IO (Old) | Java NIO (New) |
|---------|---------------|----------------|
| **Core Concept** | Stream-based | Buffer/Channel-based |
| **Blocking?** | Yes | No (Non-blocking) |
| **Suitability** | Simple File Ops | High Scalability/Network |

&nbsp;
#### 7. INTERVIEW MASTER TIPS
1. **Always Close Streams:** Use **Try-with-resources** to prevent memory leaks.
2. **Buffered vs Unbuffered:** Always prefer `BufferedReader` for reading large text files to avoid excessive disk I/O.

#### 8. AI LEARNING LAB
Featured Prompt: Serialization Auditor
"Define 'Serialization' in Java. What is the role of `serialVersionUID`? Explain why static and transient variables are not serialized."
