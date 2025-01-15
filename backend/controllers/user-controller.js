const ApiError = require("../exceptions/api-error");
const { validateItems } = require("../helpers");
const userService = require("../services/user-service");
const { validationResult } = require("express-validator");

class UserController {
  async registration(req, res, next) {
    try {
      // checking express-middleware errors
      const { email, password, fullname } = req.body;
      const invalidParams = validateItems(email, password, fullname);

      if (invalidParams) {
        return next(ApiError.badRequest("Invalid params"));
      }

      // creating user
      const userData = await userService.registration(
        email,
        password,
        fullname
      );

      // setting refresh token in cookies
      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });

      return res.json(userData);
    } catch (e) {
      next(e);
    }
  }

  async login(req, res, next) {
    try {
      // checking custom-middleware errors
      const { email, password } = req.body;
      const invalidParams = validateItems(email, password);

      if (invalidParams) {
        return next(ApiError.badRequest("Invalid params"));
      }

      const userData = await userService.login(email, password);

      // setting refresh token in cookies
      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });

      return res.json(userData);
    } catch (e) {
      next(e);
    }
  }

  async logout(req, res, next) {
    try {
      // getting refreshToken from cookies
      const { refreshToken } = req.cookies;
      const token = await userService.logout(refreshToken);

      // removing cookies);
      res.clearCookie("refreshToken");
      res.json(token /* 200 */);
    } catch (e) {
      next(e);
    }
  }

  async refresh(req, res, next) {
    try {
      // getting refreshToken from cookies
      const { refreshToken } = req.cookies;
      const tokensData = await userService.refresh(refreshToken);

      // setting refresh token in cookies
      res.cookie("refreshToken", tokensData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      res.json(tokensData /* 200 */);
    } catch (e) {
      next(e);
    }
  }

  async getUsers(req, res, next) {
    try {
      const users = await userService.getAllUsers();
      res.json(users);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new UserController();
