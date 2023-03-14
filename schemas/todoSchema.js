const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const todoSchema = Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  status: {
    type: String,
    enum: ["active", "inactive"],
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = todoSchema;
