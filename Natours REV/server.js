// Starting The Server:
const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config({ path: `${__dirname}/config.env` });

const PORT = 5000;
const app = require(`${__dirname}/app`);
const DB = process.env.DATABASE_CONNECTION;

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then((connection) => {
    // console.log(connection.connections);
    console.log("DB Connection Successful");
  });

app.listen(PORT, () => {
  console.log(`Server Started on Port: ${PORT} 🚀🚀\n`);
});
