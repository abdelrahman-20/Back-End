const port = 3000;
const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.get("/", (req, res) => {
	let today = new Date();
	let currentDay = today.getDay();

	if (currentDay == 6 || currentDay == 0) {
		res.send(`<h1>Yay, It's The Weekend</h1>`);
	} else {
		res.send(`<h1>I Have To Go To Work Today </h1>`);
	}
});

app.listen(port, () => console.log(`Server Started On Port ${port}`));
