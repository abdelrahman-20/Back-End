const fs = require("fs");
const crypto = require("crypto");

const time = Date.now();
process.env.UV_THREADPOOL_SIZE = 2;

setTimeout(() => console.log("Timer 1 Finished"), 0);
setImmediate(() => console.log("Immediate 1 Finished"));

fs.readFile("./test-file.txt", "utf8", (err, data) => {
	console.log("File Read Finished");
	console.log("------------------");

	setTimeout(() => console.log("Timer 2 Finished"), 0);
	setTimeout(() => console.log("Timer 3 Finished"), 3000);
	setImmediate(() => console.log("Immediate 2 Finished"));

	process.nextTick(() => console.log("Process.NextTick"));

	crypto.pbkdf2("password", "salt", 10000, 1024, "sha512", () => {
		console.log(Date.now() - time, "Password Encrypted");
	});
	crypto.pbkdf2("password", "salt", 10000, 1024, "sha512", () => {
		console.log(Date.now() - time, "Password Encrypted");
	});
	crypto.pbkdf2("password", "salt", 10000, 1024, "sha512", () => {
		console.log(Date.now() - time, "Password Encrypted");
	});
	crypto.pbkdf2("password", "salt", 10000, 1024, "sha512", () => {
		console.log(Date.now() - time, "Password Encrypted");
	});
});

console.log("Hello From Top Level Code");
