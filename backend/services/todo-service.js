const { v4: uuidv4 } = require("uuid");

class TodoService {
  async createTodo(title, done, isEditing) {
    const todo = {
      id: uuidv4(),
      title: title || "Get Started",
      done: done || false,
      isEditing: isEditing || false,
    };

    return todo;
  }
}

module.exports = new TodoService();
