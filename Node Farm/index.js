const fs = require("fs");
const http = require("http");

//* ------------------------------------------------------------------------------------------ *//
// Blocking, Synch Way: //
// let textInput = fs.readFileSync("./txt/input.txt", "utf-8");
// let textOutput = `This is the information we have: ${textInput}\nCreated On ${Date.now()}`;
// fs.writeFileSync("./txt/output.txt", textOutput, "utf-8");
// console.log("File Written Successfully");

// Non-Blocking, Asynch Way: //
// fs.readFile(`./txt/start.txt`, `utf-8`, (err, data1) => {
// 	fs.readFile(`./txt/${data1}.txt`, `utf-8`, (err, data2) => {
// 		console.log(data2);
// 		fs.readFile(`./txt/append.txt`, `utf-8`, (err, data3) => {
// 			console.log(data3);
// 			fs.writeFile(
// 				`./txt/final.txt`,
// 				`${data2}\n${data3}`,
// 				"utf-8",
// 				(err) => {
// 					console.log("Your File Has Been Written 😂😂");
// 				}
// 			);
// 		});
// 	});
// });
// console.log("Will Read File");

//* ------------------------------------------------------------------------------------------ *//
//* Server:

const server = http.createServer((req, res) => {
	res.end("<h1>Hello From The Server Side</h1>");
});

server.listen(3000, "localhost", () => {
	console.log("Server is Started");
});
