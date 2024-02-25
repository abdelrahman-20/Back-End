// const experss = require("express");
// const app = experss();
// const port = 3000;

// // Response Home Page "Route":
// app.get("/", (req, res) => {
// 	res.send(`<h1 style="font-family: arial">Hello From Server Side !!</h1>`);
// });

// app.get("/contact", (req, res) => {
// 	res.send("Contact Me At: Anon@Anonymous.com");
// });

// app.get("/about", (req, res) => {
// 	res.send(`
//         <center>
//             <h1>I am Abdelrahman</h1>
//             <h2>Software Engineer & Web Developer</h2>
//             <h3>I Can Help You Building Your Own Website</h3>
//         </center>
//     `);
// });

// // Start Server on Specific Port:
// app.listen(port, () => {
// 	console.log(`Express Server is Running on Port: ${port}`);
// });

// ---------------------------------------------------------------

const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
	res.send(`<h1>Hello World From Express JS</h1>`);
});

app.get("/contact", (req, res) => {
	res.send(`
        <center>
        <br><br>
        <h2>Contact Us At Our <a href="mailto:AA@gmail.com">E-Mail</a></h2>
        </center>
    `);
});

app.get("/about", (req, res) => {
	res.send(`
        <center>
        <br><br>
        <h2>Programming League</h2>
        <h3>We A Software Company</h3>
        </center>
    `);
});

app.listen(port, () => {
	console.log("---".repeat(10));
	console.log(`Server Started on Port: ${port}`);
	console.log("---".repeat(10));
});
