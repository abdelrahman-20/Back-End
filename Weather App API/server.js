const ejs = require("ejs");
const axios = require("axios");
const dotenv = require("dotenv");
const express = require("express");

const port = 5000;
const app = express();

dotenv.config({ path: "./data.env" });

app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/", (req, res) => {
	res.render("index", { weather: null, error: null });
});

app.get("/weather", async (req, res) => {
	// Get the city from the query parameters
	// const APIKEY = `40860f39ae1effa5268b2de0bee2c820`;
	const city = req.query.city;
	const APIKEY = process.env.apiKey;
	const APIURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKEY}`;

	let weather;
	let error = null;

	try {
		const response = await axios.get(APIURL);
		console.log(response.data);
		weather = response.data;
	} catch (err) {
		weather = null;
		error = `Please Try Again`;
	}

	res.render("index", { weather, error });
});

app.get("/weather", (req, res) => {});

app.listen(port, () => {
	console.log(`App is running on Port: ${port}`);
});
