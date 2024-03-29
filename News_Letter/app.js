const port = 3000;
const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
	res.sendFile(`${__dirname}/signup.html`);
});

app.post("/", (req, res) => {
	const firstName = req.body.fName;
	const lastName = req.body.lName;
	const email = req.body.email;

	const data = {
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
	const url = "https://us13.api.mailchimp.com/3.0/lists/fbde955526";
	const options = {
		method: "POST",
		auth: "anon:c77e06bd50dc11c719b40fc4d4e744f7-us13",
	};

	let jsonData = JSON.stringify(data);
	const request = https.request(url, options, function (response) {
		response.on("data", (data) => {
			console.log(JSON.parse(data));
		});

		if (response.statusCode == 200) {
			res.sendFile(`${__dirname}/success.html`);
		} else {
			res.sendFile(`${__dirname}/failure.html`);
		}
	});

	request.write(jsonData);
	request.end();
});

app.listen(process.env.PORT || port, () =>
	console.log(`Server Has Started.`)
);
