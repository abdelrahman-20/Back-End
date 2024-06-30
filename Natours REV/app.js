const PORT = 3000;
const fs = require("fs");
const morgan = require("morgan");
const express = require("express");

const app = express();
const tours = JSON.parse(
  fs.readFileSync(
    `${__dirname}/dev-data/data/tours-simple.json`
  )
);

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

// Tours Route Handlers:

const getAllTours = (req, res) => {
  res.status(200).json({
    status: "Success",
    results: tours.length,
    requestedAt: req.requestTime,
    data: {
      tours,
    },
  });
};
const getTour = (req, res) => {
  const id = req.params.id * 1;
  const tour = tours.find((item) => item.id === id);

  if (!tour) {
    return res.status(404).json({
      status: "Failed",
      message: "Invalid ID",
    });
  }

  console.log(req.params);
  res.status(200).json({
    status: "Success",
    data: {
      tour,
    },
  });
};
const createTour = (req, res) => {
  const newID = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newID }, req.body);

  tours.push(newTour);
  fs.writeFile(
    `./dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: "Success",
        data: {
          tour: newTour,
        },
      });
    }
  );
};
const deleteTour = (req, res) => {
  const id = req.params.id * 1;

  if (id >= tours.length - 1) {
    return res.status(404).json({
      status: "Failed",
      message: "Invalid ID",
    });
  }

  res.status(204).json({
    status: "Success",
    data: null,
  });
};
const updateTour = (req, res) => {
  const id = req.params.id * 1;

  if (id >= tours.length - 1) {
    return res.status(404).json({
      status: "Failed",
      message: "Invalid ID",
    });
  }

  res.status(200).json({
    status: "Success",
    data: {
      tour: "Updated Tour ...",
    },
  });
};

// Users Route Handlers:

const getAllUsers = (req, res) => {
  res.status(500).json({
    status: "Error",
    message: "This Route Is Not Defined Yet !!",
  });
};

const getUser = (req, res) => {
  res.status(500).json({
    status: "Error",
    message: "This Route Is Not Defined Yet !!",
  });
};

const createUser = (req, res) => {
  res.status(500).json({
    status: "Error",
    message: "This Route Is Not Defined Yet !!",
  });
};

const deleteUser = (req, res) => {
  res.status(500).json({
    status: "Error",
    message: "This Route Is Not Defined Yet !!",
  });
};

const updateUser = (req, res) => {
  res.status(500).json({
    status: "Error",
    message: "This Route Is Not Defined Yet !!",
  });
};

// Mounting Multiple Routers:
const tourRouter = express.Router();
const userRouter = express.Router();

app.use("/api/v1/tours", tourRouter);
app.use("/api/v1/users", userRouter);

// Tours Routes-Handlers:
tourRouter.route("/").get(getAllTours).post(createTour);
tourRouter
  .route("/:id")
  .get(getTour)
  .patch(updateTour)
  .delete(deleteTour);

// Users Route-Handlers:
userRouter.route("/").get(getAllUsers).post(createUser);
userRouter
  .route("/:id")
  .get(getUser)
  .patch(updateUser)
  .delete(deleteUser);

// Starting The Server:

app.listen(PORT, () => {
  console.log(`\nServer Started on Port: ${PORT} 🚀🚀\n`);
});
