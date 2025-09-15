# Sprint 1: TypeScript CSV

### Task C: Proposing Enhancement

- #### Step 1: Brainstorm on your own.

    1. There could be an issue when fields contain commas
    2. Currently there is no error handling in the function. It would be nice if the parse function tells you what errors are there.
    3. What if there is a missing field? And what if there's no comma to tell you which field is    missing.
    4. What if there are leading/trailing white spaces? 
    5. What if there is a duplicate comma?

- #### Step 2: Use an LLM to help expand your perspective.

    First Session: "I’m working on a CSV parser in TypeScript that currently accepts a filename as input and converts rows into strings or objects. What are some missing features or edge cases that I should consider? What improvements would make it easier for other developers to use in different kinds of apps?”

    ChatGPT suggested these edge cases/possible issues: 
    1. Quoted fields with commas or newlines: "Rendang, Beef"
    2. Escaped quotes inside quotes: "Rendang ""Beef""" → Rendang "Beef"
    3. Empty fields / trailing commas: a,,c
    4. Different line endings: \n, \r\n
    5. Variable row lengths or empty files

    It also suggested these features:
    1. Accept strings, file paths or streams as input
    2. Header row → objects with keys
    3. Type coercion (numbers, booleans, dates)
    4. Async / streaming support for large files
    5. Error reporting with row/column info
    6. Option for strict vs lenient parsing

    Second Session: "I’m designing a CSV parser in TypeScript. Beyond simply converting rows to strings or objects, what features or safeguards would make it reliable for real-world datasets and easy for other developers to adopt in different settings?"

    ChatGPT suggested these features:
    1. Handle quoted fields, commas, newlines, and escaped quotes.
    2. Support custom delimiters and flexible header options.
    3. Validate rows, report errors, and optionally enforce types.
    4. Stream large files to save memory and improve performance.
    5. Offer sync/async APIs and multiple output formats.
    6. Support different encodings, line endings, and inconsistent rows.
    7. Provide hooks for row transformations and optional type inference.

    Third Session: "I have a TypeScript CSV parser that reads files into strings or objects. What are some edge cases or potential enhancements I might overlook that could make it more robust, flexible, or developer-friendly?"

    ChatGPT responded with these features: 
    1. Handle quoted Fields with Newlines or Escaped Quotes
    2. Support or flag rows with missing or extra fields.
    3. Convert strings like "42" or "true" to numbers/booleans if enabled.
    4. Define expected types per column and validate on parse.
    5. Process files line-by-line or via streams to handle big data sets.
    6. Option to either throw on errors or skip bad rows with warnings.

- #### Step 3: use an LLM to help expand your perspective.

    Include a list of the top 4 enhancements or edge cases you think are most valuable to explore in the next week’s sprint. Label them clearly by category (extensibility vs. functionality), and include whether they came from you, the LLM, or both. Describe these using the User Story format—see below for a definition. 

    Include your notes from above: what were your initial ideas, what did the LLM suggest, and how did the results differ by prompt? What resonated with you, and what didn’t? (3-5 sentences.) 

    1. Fields with Quotes, Commas or Newlines
        Category: Functionality
        Source: Both
        User Story:
        As an end user of the application, I want the parser to correctly handle quotes, commas and newlines inside CSV fields, so that information like names or addresses is not split across columns or rows.
        Acceptance Criteria:
        1) Fields like "Rendang, Beef" are parsed as a single value.
        2) Fields with newlines (e.g., Line1\nLine2) remain part of the same row.
        3) Empty quoted fields ("") are parsed as empty strings, not null or undefined.

    2. Error Reporting & Row Validation
        Category: Functionality
        Source: Both
        User Story:
        As a developer, I want the parser to detect and report malformed rows, missing fields, or duplicate commas with detailed row and column information, so that I can easily identify and fix issues in CSV data.
        Acceptance Criteria:
        1) Rows with missing fields or extra fields are detected and reported as error messages.
        2) Duplicate commas causing empty fields are also reported.
        3) Error messages include the row number and column index of the error.

    3. Type Coercion
        Category: Extensibility
        Source: LLM
        User Story: As an end user of the application, I want numbers and booleans in the CSV to be interpreted as their correct types, so that data is displayed and filtered accurately. Acceptance Criteria: 
        1) The user can specity expected data types (e.g., integers, boolean, string) per column in a schema.
        2) If there are empty fields or invalid types, the CSV parser uses default values if configured. 
        3) Strings that represent numbers such as "42" are treated as numbers while booleans are treated as true/false. 

    4. Parse CSV Data from Files, Strings, or Streams
        Category: Extensibility
        Source: LLM
        As a developer, I want the CSV parser to accept input in multiple forms so that I can easily use it in different environments.
        Acceptance Criteria:
        1) The parser accepts input as a file path (string), a raw CSV string or a readable stream (Node.js stream or browser stream).
        2) The parser processes each input type correctly and consistently.
        3) Error handling and features works well regardless of input source.

    I was thinking about basic edge cases like fields with commas, missing values, and lack of error handling. The LLM also talked about those and helped me figure out other features like how the CSV parser should handle errors, async/stream parsing, type coercion, and accepting different input types. What resonated most was the fact that users can provide a schema to tell the CSV file what data types are expected in the fields. I also loved the multiple input feature and auto type coercion because they are convenient. Suggestions like plugin hooks or mapping header rows to fields didn't resonate as much because they are not that important compared to other features.

### Design Choices

### 1340 Supplement

- #### 1. Correctness

- #### 2. Random, On-Demand Generation

- #### 3. Overall experience, Bugs encountered and resolved
#### Errors/Bugs:
#### Tests:
#### How To…

#### Team members and contributions (include cs logins):

#### Collaborators (cslogins of anyone you worked with on this project and/or generative AI):
#### Total estimated time it took to complete project:
#### Link to GitHub Repo:  
