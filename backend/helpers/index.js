module.exports.findTodoById = function (todos, id) {
  return todos.find((todo) => todo.id === id);
};

module.exports.validateItems = function (...args) {
  return !args.every((item) => item !== undefined);
};

module.exports.getTodosFromDb = async function (dbPath, entityName = "todos") {
  const data = await getFileData(dbPath);
  const todos = data[entityName];
  if (!todos) {
    throw new Error("No Data!");
  }
  return { data, todos };
};

module.exports.updateTodosInDb = async function (
  dbPath,
  todos,
  entityName = "todos"
) {
  const data = await getFileData(dbPath);
  data[entityName] = todos;
  await setFileData(dbPath, data);
  return todos;
};
