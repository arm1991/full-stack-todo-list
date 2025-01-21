const UserModel = require("../models/user-model");
const bcrypt = require("bcrypt");
const tokenService = require("./token-service");
const todoService = require("./todo-service");
const UserDto = require("../dtos/user-dto");
const ApiError = require("../exceptions/api-error");

class UserService {
  async getUserData(userId) {
    const userData = await UserModel.findById(userId);
    if (!userData) {
      throw ApiError.UnauthorizedError();
    }
    return userData;
  }

  async registration(email, password, fullname) {
    // check if candidate exists
    const candidate = await UserModel.findOne({ email });
    if (candidate) {
      throw ApiError.badRequest(`User with ${email} email already exists`);
    }

    // hashing password
    const hashPassword = await bcrypt.hash(password, 3);

    // save user in db
    const defaultTodo = await todoService.createTodo();
    const user = await UserModel.create({
      email,
      password: hashPassword,
      fullname,
      todos: [defaultTodo],
    });

    // generating token for user without credentials (thats why dto)
    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({ ...userDto });

    // save refresh token in db
    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    // returning info about user and tokens
    return { ...tokens, user: userDto };
  }

  async login(email, password) {
    // check if candidate exists
    const candidate = await UserModel.findOne({ email });
    if (!candidate) {
      throw ApiError.badRequest(`User with ${email} email does not exist`);
    }

    // comparing passwords
    const isPasswordEqal = await bcrypt.compare(password, candidate.password);
    if (!isPasswordEqal) {
      throw ApiError.badRequest(`Incorrect password`);
    }

    // generating token for user without credentials (thats why dto)
    const userDto = new UserDto(candidate);
    const tokens = tokenService.generateTokens({ ...userDto });

    // save refresh token in db
    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    // returning info about user and tokens
    return { ...tokens, user: userDto };
  }

  async logout(refreshToken) {
    // removing token from db
    const token = await tokenService.removeToken(refreshToken);
    return token;
  }

  async refresh(refreshToken) {
    if (!refreshToken) {
      throw ApiError.UnauthorizedError();
    }

    const userData = tokenService.validateRefreshToken(refreshToken);
    const tokenFromDb = await tokenService.findToken(refreshToken);

    if (!userData || !tokenFromDb) {
      throw ApiError.UnauthorizedError();
    }

    // generating token for user without credentials (thats why dto)
    const user = await UserModel.findById(userData.id);
    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({ ...userDto });

    // save refresh token in db
    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    // returning info about user and tokens
    return { ...tokens, user: userDto };
  }

  async addTodoToUser(userId, todo) {
    const userData = await this.getUserData(userId);

    userData.todos.push(todo);

    await userData.save();

    return userData;
  }

  async updateTodo(userId, todoId, propertyName, value) {
    const userData = await this.getUserData(userId);

    const todo = userData.todos.find((todo) => todo?.id === todoId);

    if (!todo) {
      throw ApiError.UnauthorizedError();
    }

    todo[propertyName] = value;
    userData.markModified("todos");

    await userData.save();

    return userData;
  }

  async deleteTodo(userId, todoId) {
    const userData = await this.getUserData(userId);

    userData.todos = userData.todos.filter((todo) => todo?.id !== todoId);

    if (userData.todos.length === 0) {
      userData.todos = [];
    }
    console.log(userData);

    await userData.save();
    return userData;
  }
}

module.exports = new UserService();
