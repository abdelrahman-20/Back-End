// --------------------------------------------------------------
// const fs = require("fs");

// --------------------------------------------------------------
// Synchronous, Blocking Way:
// const textInput = fs.readFileSync("./txt/input.txt", "utf-8");
// console.log(textInput);

// --------------------------------------------------------------
// Asynchronous, Non-Blocking Way:
// Call-Back HELL !!
// fs.readFile("./txt/start111.txt", "utf-8", (err, data1) => {
// 	if (err) console.error("Error Reading The File 🔥🔥");
// 	fs.readFile(`./txt/${data1}.txt`, "utf-8", (err, data2) => {
// 		if (err) console.error("Error Reading The File 🔥🔥");
// 		console.log(data2 + `\n`);
// 		fs.readFile(`./txt/append.txt`, "utf-8", (err, data3) => {
// 			if (err) console.error("Error Reading The File 🔥🔥");
// 			console.log(data3 + `\n`);
// 			fs.writeFile(
// 				"./txt/final.txt",
// 				`${data2}\n\n${data3}`,
// 				"utf-8",
// 				(err) => {
// 					if (!err) console.log("WRITE FILE SUCCESS ✅✅");
// 				}
// 			);
// 		});
// 	});
// });
// console.log("HELLO FROM JS FILE !!" + `\n`);

/**/
// Creating A Web Server:

//* Declaring Variables & Used Modules *//
const port = 3000;
const fs = require("fs");
const url = require("url");
const http = require("http");

//* READING DATA FROM FILES *//
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
const dataObject = JSON.parse(data);

const tempCard = fs.readFileSync(
	`${__dirname}/templates/temp_card.html`,
	"utf-8"
);
const tempProducts = fs.readFileSync(
	`${__dirname}/templates/temp_product.html`,
	"utf-8"
);
const tempOverview = fs.readFileSync(
	`${__dirname}/templates/temp_overview.html`,
	"utf-8"
);

/*
ID
PRODUCTNAME
FROM
NUTRIENTS
QUANTITY
PRICE
DESCRIPTION
IMAGE
NOT_ORGANIC

PRODUCT_CARDS
*/

//* Functions *//
const replaceTemplate = (template, product) => {
	let output = template.replace(/{%ID%}/g, product.id);
	output = output.replace(/{%FROM%}/g, product.from);
	output = output.replace(/{%IMAGE%}/g, product.image);
	output = output.replace(/{%PRICE%}/g, product.price);
	output = output.replace(/{%QUANTITY%}/g, product.quantity);
	output = output.replace(/{%NUTRIENTS%}/g, product.nutrients);
	output = output.replace(/{%PRODUCTNAME%}/g, product.productName);
	output = output.replace(/{%DESCRIPTION%}/g, product.description);

	if (!product.organic)
		output = output.replace(/{%NOT_ORGANIC%}/g, "not-organic");

	return output;
};

//* Creating The Server *//
const server = http.createServer((req, res) => {
	//! Get The Required Path (Route):
	const pathName = req.url;

	//! Overview Page:
	if (pathName === "/" || pathName === "/overview") {
		const cardsHTML = dataObject
			.map((el) => {
				return replaceTemplate(tempCard, el);
			})
			.join("");
		let output = tempOverview.replace(/{%PRODUCT_CARDS%}/, cardsHTML);

		res.writeHead(200, {
			"content-type": "text/html",
		});
		res.end(output);
	}
	//! Products Page:
	else if (pathName === "/products") {
		res.writeHead(200, {
			"Content-type": "text/html",
		});
		res.end(`This is Products Page`);
	}
	//! API Page:
	else if (pathName === "/api") {
		// Response Header: "First"
		res.writeHead(200, { "content-type": "application/json" });
		// Response Content: "Second"
		res.end(data);
	}
	//! ERROR Page:
	else {
		// Response Header: "First"
		res.writeHead(404, {
			"content-type": "text/html",
			"custom-header": "Error, Can't Find This Page.",
		});
		// Response Content: "Second"
		res.end(`<center><h1>Hello From Server Side</h1></center>`);
	}
});

//* Starting The Server *//
server.listen(port, "localhost", () => {
	console.log(`Listening On Port: ${port}`);
});
