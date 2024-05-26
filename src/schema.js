/**
 * Рекомендуется добавлять нативные JS-типы
 * из-за их поддержки драйвером Neo4j
 */
export const ParametersSchema = Object.freeze({
  // ! обязательные
  title: (val) => String(val),
  // * необязательные
  averageLatency: (val) => Number(val),
  algorithmicComplexity: (val) => String(val),
  flexibilityNodes: (val) => Number(val),
  failurePoints: (val) => Number(val),
  testedFailurePoints: (val) => Number(val),
  // Показатели ниже можно получить из графа
  // used: (val) => Number(val),
  // usedBy: (val) => Number(val),
});
