const { Schema, model } = require("mongoose");

const UserSchema = new Schema({
  email: { type: String, unique: true, required: true },
  fullname: { type: String, required: true },
  password: { type: String, required: true },
  todos: { type: [], default: [] },
});

module.exports = model("User", UserSchema);
