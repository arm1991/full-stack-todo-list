const { db } = require("../config/config");
const { getFileData, setFileData } = require("../helpers/index");
const getTodoByID = require("../validators/index");

module.exports = async function deleteTodo(id) {
    try {
        const entityName = "todos";

        if (typeof id !== "number") {
            throw new Error("Invalid Params");
        }

        const data = await getFileData(db.path);
        const todos = data[entityName];

        if (!todos) {
            throw new Error("No Data!");
        }
        const itemWithThisIDExists = getTodoByID(todos, id);

        if (!itemWithThisIDExists) {
            throw new Error("There is no such item with this ID");
        }

        const filteredTodos = todos.filter((todo) => todo.id !== id);
        data[entityName] = filteredTodos;

        await setFileData(db.path, data);
    } catch (err) {
        console.error(err);
    }
};
