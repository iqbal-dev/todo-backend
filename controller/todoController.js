const {
  HTTP_CREATED,
  HTTP_OK,
  HTTP_NOT_FOUND,
} = require("../config/constants");
const { Todo } = require("../models");
const { createTodo } = require("../todos/todo.services");
//GET ALL TODO
const getAllTodos = async (req, res) => {
  const todos = await Todo.find()
    .select({
      __v: 0,
    })
    .exec();
  return res
    .status(HTTP_OK.code)
    .json({ message: HTTP_OK.message, data: todos });
};

//GET  TODO BY ID
const getTodoById = async (req, res) => {
  const { id } = req.params;
  const todo = await Todo.findById({ _id: id })
    .select({
      __v: 0,
    })
    .exec();
  if (!todo) {
    return res
      .status(HTTP_NOT_FOUND.code)
      .json({ message: HTTP_NOT_FOUND.message, data: todo });
  }
  return res
    .status(HTTP_OK.code)
    .json({ message: HTTP_OK.message, data: todo });
};

//POST A TODO
const postTodo = async (req, res) => {
  // create todo instance
  const todo = await createTodo(req.body);
  // after creating send message
  return res
    .status(HTTP_CREATED.code)
    .json({ message: HTTP_CREATED.message, data: todo });
};

//POST MULTIPLE TODO
const postMultipleTodos = async (req, res) => {
  const reqData = req.body;
  let todos = await Todo.insertMany(reqData);

  // inserted data and after that find
  todos = await Todo.find({
    _id: { $in: todos.map((doc) => doc._id) },
  }).select("-__v");
  return res
    .status(HTTP_CREATED.code)
    .json({ message: HTTP_CREATED.message, data: todos });
};

//PUT  TODO
const putTodo = async (req, res) => {
  const { id } = req.params;
  const reqData = req.body;
  const todo = await Todo.findByIdAndUpdate({ _id: id }, reqData, {
    new: true,
  });
  if (!todo) {
    return res
      .status(HTTP_NOT_FOUND.code)
      .json({ message: HTTP_NOT_FOUND.message, data: todo });
  }
  return res
    .status(HTTP_OK.code)
    .json({ message: HTTP_OK.message, data: todo });
};

//DELETE TODO
const deleteTodo = async (req, res) => {
  const { id } = req.params;
  const todo = await Todo.findByIdAndDelete(id);
  if (!todo) {
    return res
      .status(HTTP_NOT_FOUND.code)
      .json({ message: HTTP_NOT_FOUND.message, data: todo });
  }
  return res
    .status(HTTP_OK.code)
    .json({ message: HTTP_OK.message, data: !!todo });
};

module.exports = {
  getAllTodos,
  getTodoById,
  postTodo,
  postMultipleTodos,
  putTodo,
  deleteTodo,
};
