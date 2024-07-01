const morgan = require("morgan");
const express = require("express");

const app = express();

// MiddleWares:
app.use(morgan("dev"));
app.use(express.json());
app.use((req, res, next) => {
  console.log("⭐ Hello From The MiddleWare ⭐");
  next();
});
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  console.log(`⭐ Request Time: ${req.requestTime} ⭐`);
  next();
});
app.use(express.static(`${__dirname}/public`));

const tourRouter = require(`${__dirname}/routes/tourRoutes`);
const userRouter = require(`${__dirname}/routes/userRoutes`);

app.use("/api/v1/tours", tourRouter);
app.use("/api/v1/users", userRouter);

module.exports = app;
