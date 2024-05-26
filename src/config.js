export function getConfig() {
  const URI = process.env.NEO4J_URI;
  if (!URI) {
    throw new Error("NEO4J_URI не указан!");
  }
  const USER = process.env.NEO4J_USER;
  if (!USER) {
    throw new Error("NEO4J_USER не указан!");
  }
  const PASSWORD = process.env.NEO4J_PASSWORD;
  if (!PASSWORD) {
    throw new Error("NEO4J_PASSWORD не указан!");
  }
  return {
    URI,
    USER,
    PASSWORD,
  };
}
