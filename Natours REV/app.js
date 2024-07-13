const express = require("express");
const morgan = require("morgan");
const app = express();

// MiddleWares:
app.use(morgan("dev"));
app.use(express.json());
app.use(express.static(`${__dirname}/public`));
app.use((req, res, next) => {
  console.log("⭐ Hello From The MiddleWare ⭐");
  next();
});
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  console.log(`⭐ Request Time: ${req.requestTime} ⭐`);
  next();
});

const tourRouter = require(`${__dirname}/routes/tourRoutes`);
const userRouter = require(`${__dirname}/routes/userRoutes`);

app.use("/api/v1/tours", tourRouter);
app.use("/api/v1/users", userRouter);

module.exports = app;
