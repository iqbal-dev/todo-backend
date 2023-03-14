const express = require("express");
const cors = require("cors");
require("dotenv").config({ path: `${__dirname}/.env` });
const mongoose = require("mongoose");
const { todoRouters } = require("./route");
const swaggerUi = require("swagger-ui-express");
const swaggerApiDoc = require("./config/swagger.json");
const config = require("./config/environments");
const notFoundError = require("./helpers/notFoundError");
const globalErrorHandler = require("./helpers/globalErrorHandler");
const logger = require("morgan");
// express app initialization
const app = express();
app.use(cors());

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// database connection with mongoose
mongoose
  .connect("mongodb://localhost:27017/todos")
  .then(function () {
    console.info("connection established");
  })
  .catch(function (err) {
    console.error(err);
  });

// application routes

app.use("/v1/todo", todoRouters);

app.use("/v1/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerApiDoc));

// default error handler
// function errorHandler(err, req, res, next) {
//   if (res.headersSent) {
//     return next(err);
//   }
//   res.status(500).json({ error: err });
// }

app.use(notFoundError);
app.use(globalErrorHandler);
app.listen({ port: config.app.port }, async () => {
  console.info(`listening on port ${config.app.port}`);
});

module.exports = {
  server: app,
};
