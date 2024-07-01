const fs = require("fs");
const tours = JSON.parse(
  fs.readFileSync(
    `${__dirname}/../dev-data/data/tours-simple.json`
  )
);

// Tours Route Middleware:
exports.checkID = (req, res, next, val) => {
  console.log(`⭐ Tour ID: ${val} ⭐`);
  if (val >= tours.length - 1) {
    return res.status(404).json({
      status: "Failed",
      message: "Invalid ID",
    });
  }
  next();
};

exports.checkBody = (req, res, next) => {
  if (!req.body.name || !req.body.price) {
    return res.status(400).json({
      status: "Failed",
      message: "Missing Name or Price.",
    });
  }
  next();
};

// Tours Route Handlers:
exports.getAllTours = (req, res) => {
  res.status(200).json({
    status: "Success",
    results: tours.length,
    requestedAt: req.requestTime,
    data: {
      tours,
    },
  });
};
exports.getTour = (req, res) => {
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
exports.createTour = (req, res) => {
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
exports.deleteTour = (req, res) => {
  res.status(204).json({
    status: "Success",
    data: null,
  });
};
exports.updateTour = (req, res) => {
  res.status(200).json({
    status: "Success",
    data: {
      tour: "Updated Tour ...",
    },
  });
};
