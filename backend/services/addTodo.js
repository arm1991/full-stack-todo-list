const { db } = require("../config/config");
const { getFileData, setFileData } = require("../helpers/index");

module.exports = async function addTodo({ id, title, done, isEditing }) {
    try {
        const entityName = "todos";

        if (
            typeof id !== "number" ||
            typeof title !== "string" ||
            typeof done !== "boolean" ||
            typeof isEditing !== "boolean"
        ) {
            throw new Error("Invalid Params");
        }

        const data = await getFileData(db.path);
        const todos = data[entityName];

        if (!todos) {
            throw new Error("No data!");
        }

        todos.push({ id, title, done, isEditing });
        data[entityName] = todos;

        await setFileData(db.path, data);
    } catch (err) {
        console.error(err);
    }
};
