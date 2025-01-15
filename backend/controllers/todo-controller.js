const ApiError = require("../exceptions/api-error");
const { validateItems } = require("../helpers");
const todoService = require("../services/todo-service");
const userService = require("../services/user-service");

class TodoController {
  async addTodo(req, res, next) {
    try {
      const { userId, title, done, isEditing } = req.body;
      const invalidParams = validateItems(userId, title, done, isEditing);

      if (invalidParams) {
        throw ApiError.badRequest("Invalid params");
      }

      const todo = await todoService.createTodo(title, done, isEditing);
      const userData = await userService.addTodoToUser(userId, todo);

      return res.json(userData.todos);
    } catch (e) {
      next(e);
    }
  }

  async deleteTodo(req, res, next) {
    try {
      const { userId, todoId } = req.body;

      const invalidParams = validateItems(userId, todoId);
      if (invalidParams) {
        throw ApiError.badRequest("Invalid params");
      }

      const userData = await userService.deleteTodo(userId, todoId);

      return res.json(userData.todos);
    } catch (e) {
      next(e);
    }
  }

  async updateTodo(req, res, next) {
    try {
      const { userId, todoId, propertyName, value } = req.body;
      const invalidParams = validateItems(userId, todoId, propertyName, value);

      if (invalidParams) {
        throw ApiError.badRequest("Invalid params");
      }

      const userData = await userService.updateTodo(
        userId,
        todoId,
        propertyName,
        value
      );

      return res.json(userData.todos);
    } catch (e) {
      next(e);
    }
  }

  async getTodos(req, res, next) {
    try {
      const { userId } = req.body;
      const invalidParams = validateItems(userId);

      if (invalidParams) {
        throw ApiError.badRequest("Invalid params");
      }

      const userData = await userService.getUserData(userId);

      return res.json(userData.todos);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new TodoController();
