const mongoose = require("mongoose");
const dotenv = require("dotenv");
const port = 7000;

dotenv.config({ path: "./config.env" });

const app = require("./app");

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD,
);

mongoose.connect(DB).then((connection) => {
  // console.log(connection.connections);
  console.log("DB Connection Successful");
});

app.listen(port, () => {
  console.log(`Server Started on Port: ${port}`);
});
