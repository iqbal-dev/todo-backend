const mongoose = require("mongoose");
const { todoSchema } = require("../schemas");
const Todo = new mongoose.model("Todo", todoSchema);
module.exports = Todo;
