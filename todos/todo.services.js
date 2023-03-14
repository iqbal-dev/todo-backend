const { Todo } = require("../models");

module.exports = {
  createTodo: async (todoData) => {
    return Todo.create(todoData);
  },
  deleteTodo: async () => {
    return Todo.deleteMany({});
  },
};
