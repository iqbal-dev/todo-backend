const Joi = require("joi");
const validationMessageFormatter = require("../helpers/validationMessageFormatter");
const { ObjectId } = require("mongodb");
const { HTTP_BAD_REQUEST } = require("../config/constants");

// single todo schema
const todoSchema = Joi.object()
  .options({ abortEarly: false, stripUnknown: true })
  .keys({
    title: Joi.string().required(),
    description: Joi.string(),
    status: Joi.string().valid("active", "inactive"),
    date: Joi.date().default(Date.now()),
  });

// single todo validator
const createTodoValidator = (req, res, next) => {
  const schema = todoSchema;
  const { error } = schema.validate(req.body);
  if (error) {
    const message = validationMessageFormatter(error?.details);
    return res.status(400).json({ error: message });
  }
  next();
};
//  multi todo validator
const createMultiTodoValidator = (req, res, next) => {
  const schema = Joi.array().items(todoSchema);
  const { error } = schema.validate(req.body);
  if (error) {
    const message = validationMessageFormatter(error?.details);
    return res.status(400).json({ error: message });
  }
  next();
};

// update todo validator
const updateTodoValidator = (req, res, next) => {
  const schema = Joi.object()
    .options({ abortEarly: false, stripUnknown: true })
    .keys({
      id: Joi.string()
        .custom((value, helpers) => {
          if (!ObjectId.isValid(value)) {
            return helpers.message("Invalid id");
          }
          return value;
        })
        .required(),
      title: Joi.string(),
      description: Joi.string(),
      status: Joi.string().valid("active", "inactive"),
      date: Joi.date().default(Date.now()),
    });
  const { error } = schema.validate({ ...req.body, ...req.params });
  if (error) {
    const message = validationMessageFormatter(error?.details);
    return res.status(HTTP_BAD_REQUEST.code).json({ error: message });
  }
  next();
}; // update todo validator
const todoIdValidator = (req, res, next) => {
  const schema = Joi.object()
    .options({ abortEarly: false, stripUnknown: true })
    .keys({
      id: Joi.string()
        .custom((value, helpers) => {
          if (!ObjectId.isValid(value)) {
            return helpers.message("Invalid id");
          }
          return value;
        })
        .required(),
    });
  const { error } = schema.validate({ ...req.body, ...req.params });
  if (error) {
    const message = validationMessageFormatter(error?.details);
    return res.status(HTTP_BAD_REQUEST.code).json({ error: message });
  }
  next();
};

module.exports = {
  createTodoValidator,
  createMultiTodoValidator,
  updateTodoValidator,
  todoIdValidator,
};
