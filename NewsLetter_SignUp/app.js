const bodyParser = require("body-parser");
const express = require("express");
const request = require("request");
const https = require("https");

const app = express();
let port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
	res.sendFile(`${__dirname}/signup.html`);
});

app.post("/", (req, res) => {
	const firstName = req.body.fName;
	const lastName = req.body.lName;
	const email = req.body.email;

	let data = {
		members: [
			{
				email_address: email,
				status: "subscribed",
				merge_fields: {
					FNAME: firstName,
					LNAME: lastName,
				},
			},
		],
	};

	let jsonData = JSON.stringify(data);
	const url = "https://us13.api.mailchimp.com/3.0/lists/fbde955526";
	const options = {
		method: "POST",
		auth: "anon1:277ec3f58649c56e33908b8a0d0b48ba-us13",
	};

	const request = https.request(url, options, function (response) {
		response.on("data", (data) => {
			console.log(JSON.parse(data));
		});
	});

	request.write(jsonData);
	request.end();
	// console.log(firstName + " " + lastName + " => " + email);
});

app.listen(port, () => {
	console.log(`Server is running on port: ${port}`);
});

// API Key
// 277ec3f58649c56e33908b8a0d0b48ba-us13

// List ID
// fbde955526
