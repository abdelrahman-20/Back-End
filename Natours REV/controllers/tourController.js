const Tour = require(`${__dirname}/../models/tourModel`);

// Tours Route Handlers:
exports.getAllTours = async (req, res) => {
  try {
    // Filtering:
    const queryObject = { ...req.query };
    const excludedFields = [
      "page",
      "sort",
      "limit",
      "fields",
    ];
    excludedFields.forEach((el) => delete queryObject[el]);

    // Advanced Filtering:
    const queryString = JSON.stringify(queryObject).replace(
      /\b(gte|gt|lte|lt)\b/g,
      (match) => `$${match}`
    );

    const parsedQuery = JSON.parse(
      queryString,
      (key, value) => {
        if (key.match(/\b(lt|gt|gte|lte)\b/g)) {
          return parseInt(value);
        } else {
          return value;
        }
      }
    );

    console.log(req.query, queryObject, parsedQuery); // Done
    const tours = await Tour.find(parsedQuery);

    res.status(200).json({
      status: "Success",
      results: tours.length,
      requestedAt: req.requestTime,
      data: {
        tours,
      },
    });
  } catch (err) {
    console.log(`Error Getting Tours: ${err}`);
    res.status(404).json({
      status: "Failure",
      message: `Error Getting Tours: ${err}`,
    });
  }
};
exports.getTour = async (req, res) => {
  try {
    const id = req.params.id;
    const tour = await Tour.findById(id);

    res.status(200).json({
      status: "Success",
      data: {
        tour,
      },
    });
  } catch (err) {
    console.log(`Error Getting Tours: ${err}`);
    res.status(404).json({
      status: "Failure",
      message: `Error Getting Tours: ${err}`,
    });
  }
};
exports.createTour = async (req, res) => {
  try {
    const newTour = await Tour.create(req.body);
    res.status(201).json({
      status: "Success",
      data: {
        tour: newTour,
      },
    });
  } catch (err) {
    console.log(`Error Creating New Tour: ${err}`);
    res.status(400).json({
      status: "Failure",
      message: `Error Creating New Tour: ${err}`,
    });
  }
};
exports.deleteTour = async (req, res) => {
  try {
    const id = req.params.id;
    await Tour.findByIdAndDelete(id);

    res.status(204).json({
      status: "Success",
      data: null,
    });
  } catch (err) {
    console.log(`Error Getting Tours: ${err}`);
    res.status(404).json({
      status: "Failure",
      message: `Error Getting Tours: ${err}`,
    });
  }
};
exports.updateTour = async (req, res) => {
  try {
    const id = req.params.id;
    const tour = await Tour.findByIdAndUpdate(
      id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json({
      status: "Success",
      data: {
        tour,
      },
    });
  } catch (err) {
    console.log(`Error Getting Tours: ${err}`);
    res.status(404).json({
      status: "Failure",
      message: `Error Getting Tours: ${err}`,
    });
  }
};
