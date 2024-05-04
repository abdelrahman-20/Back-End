const port = 3000;
const fs = require("fs");
const server = require("http").createServer();

server.on("request", (req, res) => {
	//* Solution 1:
	fs.readFile("./test-file.txt", "utf-8", (err, data) => {
		if (err) console.log(err);
		res.end(data);
	});

	//* Solution 2: Streams
	const readable1 = fs.createReadStream("./test-file11.txt", "utf-8");
	readable1.on("data", (data) => {
		res.write(data);
	});
	readable1.on("end", () => {
		res.end();
	});
	readable1.on("error", (err) => {
		console.log(err);
		res.end("File Not Found !!");
	});

	//* Solution 3: PIPE()
	const readable2 = fs.createReadStream("./test-file.txt", "utf-8");
	readable2.pipe(res);
});

server.listen(port, () => {
	console.log(`Server Started On Port: ${port}`);
});
