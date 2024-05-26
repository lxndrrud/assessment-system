import "dotenv/config";
import { getNeoDriver } from "../neo4j.driver.js";
import { ParametersSchema } from "../schema.js";

import * as readline from "readline/promises";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

async function add() {
  const driver = getNeoDriver();
  const querySchema = [];
  for (const key of Object.keys(ParametersSchema)) {
    const val = await rl.question(`Введите параметр ${key}: `);
    const parsedValue = ParametersSchema[key](val);
    querySchema.push(`${key}: ${JSON.stringify(parsedValue)}`);
  }
  const result = await driver.executeQuery(
    `CREATE (u:UseCase { ${querySchema.join(", ")}  }) RETURN u`
  );
  console.log("Вариант использования успешно добавлен!");

  await driver.close();
}

add().finally(process.exit);
