const { Schema, model } = require("mongoose");

const TodoSchema = new Schema({
  id: { type: String, required: true },
  title: { type: String, required: true },
  done: { type: Boolean, required: true },
  isEditing: { type: Boolean, required: true },
});

const UserSchema = new Schema({
  email: { type: String, unique: true, required: true },
  fullname: { type: String, required: true },
  password: { type: String, required: true },
  todos: { type: [TodoSchema], default: [] },
});

module.exports = model("User", UserSchema);
