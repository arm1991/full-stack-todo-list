module.exports = async function getTodoByID(todos, id) {
    try {
        if (typeof id !== "number") {
            throw new Error("Invalid Params");
        }

        const returnValue = todos.find((todo) => todo.id === id);

        return returnValue;
    } catch (err) {
        console.error(err);
    }
};
