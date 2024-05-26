import neo4j from "neo4j-driver";
import { getConfig } from "./config.js";

export function getNeoDriver() {
  const config = getConfig();
  try {
    const driver = neo4j.driver(
      config.URI,
      neo4j.auth.basic(config.USER, config.PASSWORD)
    );
    console.log("Подключение установлено\n\n");
    return driver;
  } catch (err) {
    throw new Error(`Ошибка подключения\n${err}\nПричина: ${err.cause}`);
  }
}
