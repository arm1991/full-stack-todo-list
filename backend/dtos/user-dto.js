module.exports = class UserDto {
  email;
  id;
  fullname;
  todos;

  constructor(model) {
    this.email = model.email;
    this.id = model._id;
    this.fullname = model.fullname;
    this.todos = model.todos;
  }
};
