import "dotenv/config";
import { getNeoDriver } from "../neo4j.driver.js";
import { int, isInt } from "neo4j-driver";

import * as readline from "readline/promises";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

async function get() {
  const driver = getNeoDriver();
  try {
    const nodeTitle = await rl.question(
      "Введите название искомого варианта использования: "
    );
    const [main, mainUses, mainIsUsedBy] = await Promise.all([
      driver.executeQuery(
        `MATCH (u:UseCase { title: "${nodeTitle}" }) RETURN u`
      ),
      driver.executeQuery(
        `MATCH (u1:UseCase { title: "${nodeTitle}" })-[:USES]->(u2:UseCase) RETURN u2.title`
      ),
      driver.executeQuery(
        `MATCH (u1:UseCase { title: "${nodeTitle}" })<-[:USES]-(u2:UseCase) RETURN u2.title`
      ),
    ]);

    await driver.close();

    if (main.records.length === 0) {
      console.log("Не найдено!");
      return;
    }
    console.log(
      "\n\nВариант использования:",
      main.records[0]._fields[0].properties.title
    );
    const keys = Object.keys(main.records[0]._fields[0].properties);
    for (const key of keys.sort((a, b) => a.localeCompare(b))) {
      if (key === "title") continue;
      let value = main.records[0]._fields[0].properties[key];
      if (isInt(value)) value = int(value);
      console.log(`${key}: ${value}`);
    }
    console.log(`\nИспользует варианты (${mainUses.records.length}):`);
    let counter = 1;
    for (const record of mainUses.records) {
      console.log(`${counter}. ${record._fields[0]}`);
      counter++;
    }

    console.log(`\nИспользуется вариантами (${mainIsUsedBy.records.length}):`);
    counter = 1;
    for (const record of mainIsUsedBy.records) {
      console.log(`${counter}. ${record._fields[0]}`);
      counter++;
    }
    console.log("\n");
  } catch (error) {
    console.log(error);
  }
}

get().finally(process.exit);
