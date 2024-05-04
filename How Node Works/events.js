// const EventEmitter = require("events");
// class Sales extends EventEmitter {
// 	constructor() {
// 		super();
// 	}
// }
// const myEmitter = new Sales();

// myEmitter.on("newSale", () => {
// 	console.log("There Was A New Sale !!");
// });

// myEmitter.on("newSale", () => {
// 	console.log("New Customer: JONAS !!");
// });

// myEmitter.on("newSale", (stock) => {
// 	console.log(`There Are Now ${stock} Items Left in Stock.`);
// });

// myEmitter.emit("newSale", 9);

// -------------------------------------------------------------

const http = require("http");
const server = http.createServer();

server.on("request", (req, res) => {
	console.log("Request Recieved");
	res.end("Request Recieved");
});

server.on("request", (req, res) => {
	console.log("Anoter Request Recieved");
});

server.on("close", () => {
	console.log("Server Closed");
});

server.listen(8000, "localhost", () => {
	console.log("Waiting For Request ...");
});
