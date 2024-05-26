import "dotenv/config";
import { getNeoDriver } from "../neo4j.driver.js";

import * as readline from "readline/promises";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

async function link() {
  const driver = getNeoDriver();

  const fromNodeTitle = await rl.question(
    `Введите название варианта, который ссылается: `
  );
  const toNodesTitles = await rl.question(
    `Введите через запятую названия вариантов, на которые нужно сослаться: `
  );

  const nodesTitles = toNodesTitles.split(",");
  const session = driver.session();
  for (const nodeTitle of nodesTitles) {
    await session.executeWrite(async (tx) => {
      return await tx.run(`MATCH (u1:UseCase { title: "${fromNodeTitle}"})
      MATCH (u2:UseCase { title: "${nodeTitle}"})
      CREATE (u1)-[:USES]->(u2)`);
    });
  }
  console.log("Связи созданы!");

  await driver.close();
}

link().finally(process.exit);
