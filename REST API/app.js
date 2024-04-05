const ejs = require("ejs");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const port = 3000;
const app = express();

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect("mongodb://localhost:27017/wikiDB", { useNewUrlParser: true });

const articleSchema = {
	title: String,
	content: String,
};
const Article = mongoose.model("Article", articleSchema);

app.get("/articles", (req, res) => {
	Article.find(function (err, result) {
		if (!err) {
			console.log(result);
		}
	});
});

app.get("/", (req, res) => {
	res.send(`<center><h2>Hello From Server Side</h2></center>`);
});

app.listen(port, function () {
	console.log(`Server Started on Port: ${port}`);
});
