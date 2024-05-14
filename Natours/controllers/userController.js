exports.getAllUsers = (req, res) => {
  res.status(500).json({
    status: "Error",
    message: "This Route Isn't Defined Yet",
  });
};

exports.getUser = (req, res) => {
  const id = req.params.id * 1; // Convert String To Number

  if (id < 1) {
    res.status(500).json({
      status: "Error",
      message: "This Route Isn't Defined Yet",
    });
  } else {
    res.status(200).json({
      status: "Success",
      data: {
        id,
      },
    });
  }
};

exports.createUsers = (req, res) => {
  res.status(500).json({
    status: "Error",
    message: "This Route Isn't Defined Yet",
  });
};

exports.updateUser = (req, res) => {
  res.status(500).json({
    status: "Error",
    message: "This Route Isn't Defined Yet",
  });
};

exports.deleteUser = (req, res) => {
  res.status(500).json({
    status: "Error",
    message: "This Route Isn't Defined Yet",
  });
};
