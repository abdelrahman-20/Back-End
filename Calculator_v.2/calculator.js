const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
	res.sendFile(`${__dirname}/index.html`);
});

app.get("/bmi_calculator", (req, res) => {
	res.sendFile(`${__dirname}/bmi_calculator.html`);
});

app.post("/", (req, res) => {
	let number1 = Number(req.body.number1);
	let number2 = Number(req.body.number2);
	let result = number1 + number2;

	res.send(`<h2>The Result Is: ${result}</h2>`);
});

app.post("/bmi_calculator", (req, res) => {
	let weight = parseFloat(req.body.weight);
	let height = parseFloat(req.body.height);
	let bmi = weight / height ** 2;

	res.send(`<h2>BMI Result Is: ${bmi.toFixed(2)}</h2>`);
});

app.listen(port, () => {
	console.log("---".repeat(10));
	console.log(`Server Started on Port: ${port}`);
	console.log("---".repeat(10));
});
