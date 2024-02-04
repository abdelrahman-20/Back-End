const bodyParser = require("body-parser");
const express = require("express");
const https = require("https");

const app = express();
let port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the "Images" directory
app.use("/Images", express.static(`${__dirname}/Images`));

// Setting Main Route:
app.get("/", (req, res) => {
	res.sendFile(`${__dirname}/index.html`);
});

app.post("/", (req, res) => {
	// Building Our API Request URL:
	const units = "metric";
	const query = req.body.cityName;
	const apiKey = "40860f39ae1effa5268b2de0bee2c820";
	const url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&units=${units}&appid=${apiKey}`;

	// Getting Response From Our API Request URL:
	https.get(url, (response) => {
		console.log("---".repeat(10));
		console.log(`Status Code: ${response.statusCode}`);

		// Getting Weather Data As JSON String:
		response.on("data", (data) => {
			// Parsing "Tokenizing" The Response JSON File:
			const weatherData = JSON.parse(data);
			const temp = weatherData.main.temp;
			const desc = weatherData.weather[0].description;
			const image = "/Images/rainy-day.png";

			// Sending The Response To Our Web Site:
			res.send(
				`<center><h1 style="height: 500px; background-color: slateblue; padding-top: 100px; border-radius: 10px;">
			The Temp In ${query} is ${temp} Degree Celesius<br /><br />
			The Weather is Currently ${desc}<br /><br />
			<img src="${image}" alt="Weather-Icon" width="150px">
			</h1></center>`
			);
		});
	});
});

// Starting The Server:
app.listen(port, () => {
	console.log(`Server is running on port: ${port}`);
});
