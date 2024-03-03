const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const port = 3000;

let items = ["Buy Food", "Make Food", "Eat Food"];
let workItems = [];

app.set("view engine", "ejs");
app.use(
	bodyParser.urlencoded({
		extended: true,
	})
);

app.use(express.static("public"));

app.get("/", (req, res) => {
	let today = new Date();
	let options = {
		weekday: "long",
		month: "long",
		day: "numeric",
		hour: "numeric",
		hour12: true,
	};

	let day = today.toLocaleDateString("en-EG", options);

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
	let item = req.body.newItem;

	if (req.body.button == "Work") {
		workItems.push(item);
		res.redirect("/work");
	} else {
		items.push(item);
		res.redirect("/");
	}
});

app.listen(port, () => console.log(`Server Started On Port ${port}`));
