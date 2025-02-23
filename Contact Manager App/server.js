const express = require("express");
const dotenv = require("dotenv").config();
const contactRouter = require(`${__dirname}/routes/contactRoutes`);

const app = express();
const PORT = process.env.PORT;

app.use("/api/contacts", contactRouter);

app.listen(PORT, () => {
	console.log(`Server Started On Port: ${PORT}`);
});
