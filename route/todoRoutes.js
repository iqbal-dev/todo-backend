const express = require("express");
const router = express.Router();
const {
  getAllTodos,
  getTodoById,
  postTodo,
  postMultipleTodos,
  putTodo,
  deleteTodo,
} = require("../controller/todoController");
const {
  createTodoValidator,
  createMultiTodoValidator,
  updateTodoValidator,
  todoIdValidator,
} = require("../todos/todos.validator");

const withErrorHandling = require("../helpers/controllerErrorHandler");
// GET ALL TODO ROUTES
router.get("/", withErrorHandling(getAllTodos));

//GET TODO BY ID ROUTES
router.get("/:id", todoIdValidator, withErrorHandling(getTodoById));

//POST TODO ROUTES
router.post("/", createTodoValidator, withErrorHandling(postTodo));

//POST ALL TODO ROUTES
router.post(
  "/all",
  createMultiTodoValidator,
  withErrorHandling(postMultipleTodos)
);

//PUT TODO ROUTES
router.put("/:id", updateTodoValidator, withErrorHandling(putTodo));

// DELETE TODO ROUTES
router.delete("/:id", todoIdValidator, withErrorHandling(deleteTodo));

module.exports = router;
