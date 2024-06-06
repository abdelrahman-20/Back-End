const Tour = require("../../models/tourModel");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const fs = require("fs");
const port = 7000;

dotenv.config({ path: "./config.env" });

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD,
);

mongoose.connect(DB).then((connection) => {
  //   console.log(connection.connections);
  console.log("DB Connection Successful");
});

// Read JSON File:
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/tours-simple.json`, "utf-8"),
);

// Import Data Into Database:
const importData = async () => {
  try {
    await Tour.create(tours);
    console.log("Data Successfully Loaded.");
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

// Delete All Data From DB:
const deleteData = async () => {
  try {
    await Tour.deleteMany();
    console.log("Data Successfully Deleted.");
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

if (process.argv[2] === "--import") {
  importData();
} else if (process.argv[2] === "--delete") {
  deleteData();
}

console.log(process.argv);
