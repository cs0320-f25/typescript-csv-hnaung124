import { RowError, parseCSV } from "./basic-parser";
import * as path from "path";
import z from "zod";

const DATA_FILE = path.join(__dirname, "../data/soccer-players.csv")
const PlayerRowSchema = z
  .tuple([
    z.string(),                   // name
    z.string(),                   // team
    z.string(),                   // position
    z.number(),            // age
    z.boolean(),           // isCaptain
    z.email(),           // email
    z.date(),                   // contractEndDate 
    z.enum(["active", "inactive"])      // status
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

async function main() {
  // Because the parseCSV function needs to "await" data, we need to do the same here.
  const results = await parseCSV(DATA_FILE, PlayerRowSchema)

  // Notice the difference between "of" and "in". One iterates over the entries, 
  // another iterates over the indexes only.
  for(const record of results)
    console.log(record)
  for(const record in results)
    console.log(record)
}

main();