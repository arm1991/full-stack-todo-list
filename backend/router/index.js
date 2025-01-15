const Router = require("express").Router;
const { body } = require("express-validator");
const authMiddleWare = require("../middlewares/auth-middleware.js");
const userController = require("../controllers/user-controller");
const todoController = require("../controllers/todo-controller.js");
const router = new Router();

router.post(
  "/registration",
  [body("email").isEmail(), body("password").isLength({ min: 6, max: 32 })],
  userController.registration
);
router.post(
  "/login",
  [body("email").isEmail(), body("password").isLength({ min: 6, max: 32 })],
  userController.login
);
router.post("/logout", userController.logout);
router.get("/refresh", userController.refresh);
router.post("/todo/get", [authMiddleWare], todoController.getTodos);
router.post("/todo/add", [authMiddleWare], todoController.addTodo);
router.post("/todo/delete", [authMiddleWare], todoController.deleteTodo);
router.patch("/todo/update", [authMiddleWare], todoController.updateTodo);

module.exports = router;
