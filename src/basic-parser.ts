import * as fs from "fs";
import * as readline from "readline";
import { ZodError, ZodType } from "zod";

// Interface for structured row validation errors
export interface RowError<T> {
  // number of row that failed
  rowIndex: number;    
  // the row contents
  rowData: string[]; 
  // the Zod validation error message
  errorMessage: string; 
}

/**
 * This is a JSDoc comment. Similar to JavaDoc, it documents a public-facing
 * function for others to use. Most modern editors will show the comment when 
 * mousing over this function name. Try it in run-parser.ts!
 * 
 * File I/O in TypeScript is "asynchronous", meaning that we can't just
 * read the file and return its contents. You'll learn more about this 
 * in class. For now, just leave the "async" and "await" where they are. 
 * You shouldn't need to alter them.
 * 
 * @param path The path to the file being loaded.
 * @returns a "promise" to produce a 2-d array of cell values
 */
export async function parseCSV<T>(path: string, schema?: ZodType<T> | undefined): Promise< T[] | RowError<T>[] | string[][]> {
  // This initial block of code reads from a file in Node.js. The "rl"
  // value can be iterated over in a "for" loop. 
  const fileStream = fs.createReadStream(path);
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity, // handle different line endings
  });

  // If no Zod schema is provided, the parser defaults to returning a string[][]:
  // It reads each CSV row, splits it by commas, trims whitespace,
  // and returns a simple array of string arrays (string[][]) without validation or transformation.
  if (!schema) {
    const rawRows: string[][] = [];
    for await (const line of rl) {
      rawRows.push(line.split(",").map((v) => v.trim()));
    }
    return rawRows;
  }

  // Create an empty array to hold the transformed data
  const data: T[] = [];
  // Create an empty array to hold the errors
  const errors: RowError<T>[] = [];
  // Counter for row index
  let rowIndex = 0;
  for await (const line of rl) {
    if (rowIndex === 0) {  // first row is header
        rowIndex++;
        continue;           // skip header
    }
    // Split the line by commas and trim whitespace from each field
    const values = line.split(",").map((v) => v.trim());
    // Validate and transform the row using the provided Zod schema
    const parsed = schema.safeParse(values);

    if (parsed.success) {
      // If the row is valid, push the transformed data into the "data" array
      data.push(parsed.data);
    } else {
      // If the row is invalid, record the row index, data and Zod Error in the "error" array
      errors.push({
        rowIndex,
        rowData: values,
        errorMessage: parsed.error.issues.map(e => e.message).join(", ")
      });
    }
    // Increment the row index for tracking errors
    rowIndex++;
  }

  // Return the arrays of valid data and
  if(errors.length > 0){
    return errors;
  }
  else{
    return data;
  }
}

