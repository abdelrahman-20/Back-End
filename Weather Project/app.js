const bodyParser = require("body-parser");
const express = require("express");
const https = require("https");

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
	res.sendFile(`${__dirname}/index.html`);
});

app.post("/", (req, res) => {
	console.log("Post Recieved");

	const city = req.body.cityName;
	const ID = "40860f39ae1effa5268b2de0bee2c820";
	const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${ID}&units=metric`;

	https.get(url, (response) => {
		response.on("data", (date) => {
			const weatherData = JSON.parse(date);
			const temp = weatherData.main.temp;
			const desc = weatherData.weather[0].description;
			const icon = `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`;

			console.log(temp);
			console.log(desc);
			console.log(weatherData);
			res.send(`
				<center style="background-color:slateblue;">
				<h1>The Temperature In ${city} Is ${temp} The Weather is ${desc}</h1>
				<img src="${icon}">
				</center>
			`);
		});
	});
});

app.listen(port, () => console.log(`Running on Port: ${port}`));
