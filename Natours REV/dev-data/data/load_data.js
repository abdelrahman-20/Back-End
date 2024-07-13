const fs = require("fs");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const Tour = require(`${__dirname}/../../models/tourModel`);

dotenv.config({ path: `${__dirname}/../../config.env` });

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/tours-simple.json`, "utf-8")
);
const DB = process.env.DATABASE_CONNECTION;

mongoose
  .connect(DB, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() =>
    console.log("Database Connection Successful")
  );

//* Import All The Data:
const importData = async () => {
  try {
    await Tour.create(tours);
    console.log("Data Loaded Successfully");
    process.exit();
  } catch (err) {
    console.log(`Error: ${err}`);
  }
};

//! Delete All The Data:
const deleteDate = async () => {
  try {
    await Tour.deleteMany();
    console.log("Data Deleted Successfully");
    process.exit();
  } catch (err) {
    console.log(`Error: ${err}`);
  }
};

if (process.argv[2] == "import") importData();
else if (process.argv[2] == "delete") deleteDate();
