const { db } = require("../config/config");
const { getFileData } = require("../helpers/index");

module.exports = async function getAllTodos() {
    try {
        const entityName = "todos";
        const data = await getFileData(db.path);

        const todos = data[entityName];

        if (!todos) {
            throw new Error("There is no Data!");
        }

        return todos;
    } catch (err) {
        console.error(err);
    }
};
