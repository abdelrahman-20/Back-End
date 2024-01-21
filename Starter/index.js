const fs = require("fs");
const http = require("http");
const url = require("url");

// --------------------------------------------------------------
// FILES:

// Blocking, Synchronous Way:
// const textIn = fs.readFileSync("./txt/input.txt", "utf-8");
// console.log(textIn);
// const textOut = `This is What We Know About Avcado: ${textIn}\nCreate On ${Date.now()}`;
// fs.writeFileSync("./txt/output.txt", textOut);
// console.log("File Written");

// Non-Blocking, Asynchronous Way:
// fs.readFile("./txt/starts.txt", "utf-8", (err, data1) => {
// 	if (err) return console.log("ERROR! 🔥🔥");

// 	fs.readFile(`./txt/${data1}.txt`, "utf-8", (err, data2) => {
// 		fs.readFile(`./txt/append.txt`, "utf-8", (err, data3) => {
// 			console.log(data3);

// 			fs.writeFile(
// 				"./txt/final.txt",
// 				`${data2}\n${data3}`,
// 				"utf-8",
// 				(err) => {
// 					console.log("Your File Has Been Written!");
// 				}
// 			);
// 		});
// 	});
// });
// console.log("Will Read File!");

// --------------------------------------------------------------
// SERVER

const replaceTemplate = (temp, product) => {
	let output = temp;
	output = temp.replace(/{%PRODUCTNAME%}/g, product.productName);
	output = output.replace(/{%IMAGE%}/g, product.image);
	output = output.replace(/{%PRICE%}/g, product.price);
	output = output.replace(/{%FROM%}/g, product.from);
	output = output.replace(/{%NUTRIENTS%}/g, product.nutrients);
	output = output.replace(/{%QUANTITY%}/g, product.quantity);
	output = output.replace(/{%DESCRIPTION%}/g, product.description);
	output = output.replace(/{%ID%}/g, product.id);

	if (!product.organic)
		output = output.replace(/{%NOT_ORGANIC%}/g, `not-organic`);

	return output;
};

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
const dataObject = JSON.parse(data);

const tempCard = fs
	.readFileSync(`${__dirname}/templates/template-card.html`)
	.toString();
const tempOverview = fs
	.readFileSync(`${__dirname}/templates/template-overview.html`)
	.toString();
const tempPorduct = fs
	.readFileSync(`${__dirname}/templates/template-product.html`)
	.toString();

// Creating The Server:
const server = http.createServer((req, res) => {
	const pathName = req.url;

	// Overview Page
	if (pathName == "/overview" || pathName == "/") {
		res.writeHead(200, { "Content-type": "text/html" });

		const cardsHTML = dataObject
			.map((el) => replaceTemplate(tempCard, el))
			.join("");

		const output = tempOverview.replace(`{%PRODUCT_CARD%}`, cardsHTML);

		console.log(cardsHTML);

		res.end(output);
	}
	// Product Page
	else if (pathName == "/product") {
		res.end("This is The Product");
	}
	// API Page
	else if (pathName == "/api") {
		res.writeHead(200, { "Content-type": "application/json" });
		res.end(data);
	}
	// Not Found !
	else {
		res.writeHead(404, {
			"Content-type": "text/html",
			"my-own-header": "Hello-world",
		});

		res.end("<h1>Page Not Found ! </h1>");
	}
});

server.listen(8000, "127.0.0.1", () => {
	console.log("Listenning to requests on port 8000 ...");
});
