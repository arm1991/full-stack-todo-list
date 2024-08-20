const { db } = require("../config/config");
const { getFileData, setFileData } = require("../helpers/index");

module.exports = async function updateTodo({ id, title }) {
    const entityName = "todos";
    if (typeof id !== "number" || typeof title !== "string") {
        throw new Error("Invalid Params");
    }

    const data = await getFileData(db.path);
    const todos = data[entityName];

    const itemWithThisIDExists = todos.find((todo) => todo.id === id);

    if (!itemWithThisIDExists) {
        throw new Error("There is no such item with this ID");
    }

    const todosWithUpdatedTodo = todos.map((todoItem) => {
        if (todoItem.id === id) {
            todoItem.title = title;
        }
        return todoItem;
    });

    data[entityName] = todosWithUpdatedTodo;
    await setFileData(db.path, data);
};
