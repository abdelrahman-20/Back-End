const express = require("express");
const app = express();

app.get("/", function (request, response) {
	// console.log(request);
	response.send(`<center><h1> Hello World !!</h1></center>`);
});

app.get("/contact", function (request, response) {
	response.send("<p>Contact Us At: programing.league.2001@gmail.com</p>");
});

app.get("/hobbies", function (request, response) {
	response.send(`
		<h3>My Hobbies</h3>
		<ul>
			<li>Coffee</li>
			<li>Reading</li>
			<li>Working-Out</li>
		</ul>
	`);
});

app.get("/about", function (request, response) {
	response.send(`
		<center>
		<h3>About Us</h3>
		<p>We Are A Software & A Tech Company That Helps You Build Your Own Website</p>
		<p>As We All Know Part of Being Successful In Your Field Area, You Should Have Your Own Portfoilo To Make A Brand of Yourself</p>
		<p><em>So, Feel Free To Contact Us At Any Time</em></p>
		<p><strong><em>Programming League</em></strong></p>
		</center>
	`);
});

app.listen(3000, function () {
	console.log("Server Started on Port : 3000");
});
