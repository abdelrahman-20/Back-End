const express = require("express");
const bodyParser = require("body-parser");
const app = express();

// Parse Variables From Text-Inputs
app.use(bodyParser.urlencoded({ extended: true }));

// Manage Different Routes of The Server
app.get("/", (req, res) => {
	res.sendFile(`${__dirname}/index.html`);
});

app.get("/bmi", (req, res) => {
	res.sendFile(`${__dirname}/bmi.html`);
});

app.post("/", (req, res) => {
	let num1 = Number(req.body.number1);
	let num2 = Number(req.body.number2);

	let result = num1 + num2;
	res.send(`<h2>The Result is: ${result}</h2>`);
});

app.post("/bmicalculator", (req, res) => {
	let weight = Number(req.body.weight);
	let height = Number(req.body.height);

	let bmi = weight / (height * height);

	res.send(`<h2>BMI Result : ${bmi}</h2>`);
});

// Enable Server At A Specific Port
app.listen(3000, function () {
	console.log("Server is Running on Port: 3000");
});
