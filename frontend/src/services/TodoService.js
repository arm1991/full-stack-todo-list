import $api from "../api";

export default class TodoService {
  static async getTodos(userId) {
    return $api.post("/todo/get", { userId });
  }

  static async addTodo(userId, todo) {
    return $api.post("/todo/add", { userId, ...todo });
  }

  static async deleteTodo(userId, todoId) {
    return $api.post("/todo/delete", { userId, todoId });
  }

  static async editTodo(userId, todoId, propertyName, value) {
    return $api.patch("/todo/update", { userId, todoId, propertyName, value });
  }
}
