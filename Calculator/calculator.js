const express = require("express");
const bodyParser = require("body-parser");
const APP = express();

// Parse Variables From Text-Inputs
APP.use(bodyParser.urlencoded({ extended: true }));

// Manage Different Routes of The Server
APP.get("/", function (req, res) {
	res.sendFile(`${__dirname}/index.html`);
});

// Manage Different Routes of The Server
APP.post("/", function (req, res) {
	let num1 = Number(req.body.number1);
	let num2 = Number(req.body.number2);

	let result = num1 + num2;

	res.send(`<h1>The Result : ${result}</h1>`);
});

// Enable Server At A Specific Port
APP.listen(3000, function () {
	console.log("Server is Running on Port: 3000");
});
