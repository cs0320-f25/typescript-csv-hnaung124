import { error } from "console";
import { RowError, parseCSV } from "../src/basic-parser";
import * as path from "path";
import z from "zod";

const PEOPLE_CSV_PATH = path.join(__dirname, "../data/people.csv");
const DISHES_CSV_PATH = path.join(__dirname, "../data/seasia-dishes.csv");
const SOCCER_CSV_PATH = path.join(__dirname, "../data/soccer-players.csv")
const PlayerRowSchema = z
  .tuple([
    z.string(),                   // name
    z.string(),                   // team
    z.string(),                   // position
    z.coerce.number(),            // age
    z.coerce.boolean(),           // isCaptain
    z.email(),           // email
    z.coerce.date(),                   // contractEndDate (string for now, can parse later)
    z.string()                    // status
  ])
  .transform(([name, team, position, age, isCaptain, email, contractEndDate, status]) => ({
    name,
    team,
    position,
    age,
    isCaptain,
    email,
    contractEndDate,
    status
  }));

test("ParseCSV flags only rows with errors", async () => {
  const errors = await parseCSV(SOCCER_CSV_PATH, PlayerRowSchema);
  //there are 3 players with invalid rows
  expect(errors).toHaveLength(3);
});

test("ParseCSV flags invalid number inputs", async () => {
  const errors = await parseCSV(SOCCER_CSV_PATH, PlayerRowSchema);
  if ("errorMessage" in errors[0]) {
  //First player has invalid age
  expect(errors[0].errorMessage).toEqual(
    "Invalid input: expected number, received NaN"
  );
  }
});

test("ParseCSV flags invalid email inputs", async () => {
  const errors = await parseCSV(SOCCER_CSV_PATH, PlayerRowSchema);
  if ("errorMessage" in errors[1]) {
  //First player has invalid age
  expect(errors[1].errorMessage).toEqual(
    "Invalid email address"
  );
  }
});

test("ParseCSV flags invalid multiple wrong inputs in a row", async () => {
  const errors = await parseCSV(SOCCER_CSV_PATH, PlayerRowSchema);
  expect(errors).toHaveLength(3);

  if ("errorMessage" in errors[2]) {
  //First player has invalid age
  expect(errors[2].errorMessage).toEqual(
    "Invalid input: expected number, received NaN, Invalid email address"
  );
  }
});

// test("parseCSV yields arrays", async () => {
//   const results = await parseCSV(PEOPLE_CSV_PATH);
  
//   expect(results).toHaveLength(5);
//   expect(results[0]).toEqual(["name", "age"]);
//   expect(results[1]).toEqual(["Alice", "23"]);
//   expect(results[2]).toEqual(["Bob", "thirty"]);
//   expect(results[3]).toEqual(["Charlie", "25"]);
//   expect(results[4]).toEqual(["Nim", "22"]);
// });

// test("parse row with empty field correctly", async () => {
//   const results = await parseCSV(DISHES_CSV_PATH);
//   expect(results[1]).toEqual(["Pad Thai", "12", "", "Empty origin field"]);
//   expect(results[2]).toEqual(["Nasi Goreng", "", "Indonesia", "Missing price"]);
// });

// test("parse row with quoted field containing a comma correctly", async () => {
//   const results = await parseCSV(DISHES_CSV_PATH);
//   expect(results[3]).toEqual(["Bun, Cha", "10", "Vietnam", "Dish name contains comma"]);
//   expect(results[5]).toEqual(["Laksa", "9", "Singapore, Malaysia", "Origin contains comma"]);
// });

// test("parse row with escaped quotes inside a field correctly", async () => {
//   const results = await parseCSV(DISHES_CSV_PATH);
//   expect(results[4]).toEqual(["Rendang \"Beef\"", "15", "Indonesia", "Dish name contains quotes"]);
// });

// test("parse row with leading/trailing spaces inside quotes correctly", async () => {
//   const results = await parseCSV(DISHES_CSV_PATH);
//   expect(results[6]).toEqual(["Adobo", "8", "Philippines", "  leading and trailing spaces  "]);
// });

// test("parse row with multiple missing fields", async () => {
//   const results = await parseCSV(DISHES_CSV_PATH);
//   expect(results[8]).toEqual(["Satay", "", "", "Multiple missing fields"]);
// });

// test("All rows are arrays", async () => {
//   const results = await parseCSV(DISHES_CSV_PATH);
//   for (const row of results) {
//     expect(Array.isArray(row)).toBe(true);
//   }
// });
