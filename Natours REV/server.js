// Starting The Server:
const dotenv = require("dotenv");
dotenv.config({ path: `${__dirname}/config.env` });

const PORT = 5000;
const app = require(`${__dirname}/app`);

app.listen(PORT, () => {
  console.log(`Server Started on Port: ${PORT} 🚀🚀\n`);
});
