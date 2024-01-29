const experss = require("express");
const app = experss();
const port = 3000;

// Response Home Page "Route":
app.get("/", (req, res) => {
	res.send(`<h1 style="font-family: arial">Hello From Server Side !!</h1>`);
});

app.get("/contact", (req, res) => {
	res.send("Contact Me At: Anon@Anonymous.com");
});

app.get("/about", (req, res) => {
	res.send(`
        <center>
            <h1>I am Abdelrahman</h1>
            <h2>Software Engineer & Web Developer</h2>
            <h3>I Can Help You Building Your Own Website</h3>
        </center>
    `);
});

// Start Server on Specific Port:
app.listen(port, () => {
	console.log(`Express Server is Running on Port: ${port}`);
});
