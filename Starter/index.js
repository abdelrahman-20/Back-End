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

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
const dataObject = JSON.parse(data);

const server = http.createServer((req, res) => {
	const pathName = req.url;

	if (pathName == "/overview") {
		res.end("This is OverView");
	} else if (pathName == "/product") {
		res.end("This is The Product");
	} else if (pathName == "/api") {
		res.writeHead(200, { "Content-type": "application/json" });
		res.end(data);
	} else {
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