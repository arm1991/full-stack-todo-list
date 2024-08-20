const { db } = require("../config/config");
const { getFileData, setFileData } = require("../helpers/index");

module.exports = async function deleteAllTodos() {
    try {
        const entityName = "todos";

        const data = await getFileData(db.path);

        data[entityName] = [];

        await setFileData(db.path, data);
    } catch (err) {
        console.error(err);
    }
};
