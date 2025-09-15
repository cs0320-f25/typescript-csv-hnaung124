# Sprint 1: TypeScript CSV

### Task C: Proposing Enhancement

- #### Step 1: Brainstorm on your own.

    1. There could be an issue when fields contain commas
    2. Currently there is no error handling in the function. It would be nice if the parse function tells you what errors are there.
    3. What if there is a missing field? And what if there's no comma to tell you which field is    missing.
    4. What if there are leading/trailing white spaces? 
    5. What if there is a duplicate comma?

- #### Step 2: Use an LLM to help expand your perspective.

    First Prompt: "I’m working on a CSV parser in TypeScript that currently accepts a filename as input and converts rows into strings or objects. What are some missing features or edge cases that I should consider? What improvements would make it easier for other developers to use in different kinds of apps?”

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

    Second Prompt: 

- #### Step 3: use an LLM to help expand your perspective.

    Include a list of the top 4 enhancements or edge cases you think are most valuable to explore in the next week’s sprint. Label them clearly by category (extensibility vs. functionality), and include whether they came from you, the LLM, or both. Describe these using the User Story format—see below for a definition. 

    Include your notes from above: what were your initial ideas, what did the LLM suggest, and how did the results differ by prompt? What resonated with you, and what didn’t? (3-5 sentences.) 


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
