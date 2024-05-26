import "dotenv/config";
import { getNeoDriver } from "../neo4j.driver.js";

async function list() {
  const driver = getNeoDriver();
  const result = await driver.executeQuery(`MATCH (u:UseCase) RETURN u.title`);

  console.log(`Варианты использования (${result.records.length}):\n`);
  let counter = 1;
  for (const record of result.records) {
    console.log(`${counter}. ${record._fields[0]}`);
    counter++;
  }

  await driver.close();
}

list().finally(process.exit);
