const date = require(`${__dirname}/date.js`);

const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const port = 3000;

const items = ["Buy Food", "Make Food", "Eat Food"];
const workItems = [];

console.log(date);

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
	const day = date.getDay();
	// const day = date.getDate();

	res.render("list", {
		listTitle: day,
		newListItems: items,
	});
});

app.get("/work", (req, res) => {
	res.render("list", { listTitle: "Work", newListItems: workItems });
});

app.get("/about", (req, res) => {
	res.render("about");
});

app.post("/", (req, res) => {
	console.log(req.body);
	const item = req.body.newItem;

	if (req.body.button == "Work") {
		workItems.push(item);
		res.redirect("/work");
	} else {
		items.push(item);
		res.redirect("/");
	}
});

app.listen(port, () => console.log(`Server Started On Port ${port}`));
