import { parseCSV } from "../src/basic-parser";
import * as path from "path";

const PEOPLE_CSV_PATH = path.join(__dirname, "../data/people.csv");
const DISHES_CSV_PATH = path.join(__dirname, "../data/seasia-dishes.csv");

test("parseCSV yields arrays", async () => {
  const results = await parseCSV(PEOPLE_CSV_PATH)
  
  expect(results).toHaveLength(5);
  expect(results[0]).toEqual(["name", "age"]);
  expect(results[1]).toEqual(["Alice", "23"]);
  expect(results[2]).toEqual(["Bob", "thirty"]); // why does this work? :(
  expect(results[3]).toEqual(["Charlie", "25"]);
  expect(results[4]).toEqual(["Nim", "22"]);
});

test("parseCSV yields only arrays", async () => {
  const results = await parseCSV(PEOPLE_CSV_PATH)
  for(const row of results) {
    expect(Array.isArray(row)).toBe(true);
  }
});

test("parse header correctly", async () => {
  const results = await parseCSV(DISHES_CSV_PATH);
  expect(results[0]).toEqual(["dish", "price", "origin", "notes"]);
});

test("parse row with empty field correctly", async () => {
  const results = await parseCSV(DISHES_CSV_PATH);
  expect(results[1]).toEqual(["Pad Thai", "12", "", "Empty origin field"]);
  expect(results[2]).toEqual(["Nasi Goreng", "", "Indonesia", "Missing price"]);
});

test("parse row with quoted field containing a comma correctly", async () => {
  const results = await parseCSV(DISHES_CSV_PATH);
  expect(results[3]).toEqual(["Bun, Cha", "10", "Vietnam", "Dish name contains comma"]);
  expect(results[5]).toEqual(["Laksa", "9", "Singapore, Malaysia", "Origin contains comma"]);
});

test("parse row with escaped quotes inside a field correctly", async () => {
  const results = await parseCSV(DISHES_CSV_PATH);
  expect(results[4]).toEqual(["Rendang \"Beef\"", "15", "Indonesia", "Dish name contains quotes"]);
});

test("parse row with leading/trailing spaces inside quotes correctly", async () => {
  const results = await parseCSV(DISHES_CSV_PATH);
  expect(results[6]).toEqual(["Adobo", "8", "Philippines", "  leading and trailing spaces  "]);
});

test("parse row with multiple missing fields", async () => {
  const results = await parseCSV(DISHES_CSV_PATH);
  expect(results[8]).toEqual(["Satay", "", "", "Multiple missing fields"]);
});

test("All rows are arrays", async () => {
  const results = await parseCSV(DISHES_CSV_PATH);
  for (const row of results) {
    expect(Array.isArray(row)).toBe(true);
  }
});