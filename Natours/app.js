//? ----- Declaration & Modules & Middlewares ----- ?//

const express = require("express");
const morgan = require("morgan");
const app = express();

const tourRouter = require("./routes/tourRoutes");
const userRouter = require("./routes/userRoutes");

//? -------------- Code Middlewares -------------- ?//

app.use(morgan("dev"));
app.use(express.json());
app.use((req, res, next) => {
  console.log(`Hello From Middleware 👋👋`);
  next();
});
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

//? --------------- Route Handlers --------------- ?//
app.use("/api/v1/tours", tourRouter);
app.use("/api/v1/users", userRouter);

module.exports = app;
//? ---------------------------------------------- ?//
