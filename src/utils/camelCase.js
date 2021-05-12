export default (rows) => rows.map((row) => {
  const replaced = {};

  Object.keys(row).forEach((key) => {
    if (Object.hasOwnProperty.call(row, key)) {
      const camelCase = key.replace(/([-_][a-z])/gi, ($1) => $1.toUpperCase().replace("_", ""));
      replaced[camelCase] = row[key];
    }
  });

  return replaced;
});
