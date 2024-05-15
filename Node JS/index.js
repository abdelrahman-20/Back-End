// const superHeroes = require("superheroes");
// const supervillains = require("supervillains");
// let mySuperHero = superHeroes.random();
// let myVillain = supervillains.random();
// console.log(mySuperHero);
// console.log(myVillain);

// const os = require("os");
// const path = require("path");
// const math = require("./math");

// console.log(math.add(10, 3));
// console.log(math.sub(10, 3));
// console.log(math.mul(10, 3));
// console.log(Number(math.div(10, 3).toFixed(2)));

// console.log(os.type());
// console.log(os.version());
// console.log(os.homedir());

// console.log(__dirname);
// console.log(__filename);

// console.log(path.dirname(__filename));
// console.log(path.basename(__filename));
// console.log(path.extname(__filename));

const path = require("path");
const fsPromises = require("fs").promises;

const fileOps = async () => {
	try {
		const data = await fsPromises.readFile(
			path.join(__dirname, "files", "starter.txt"),
			"utf-8"
		);
		console.log(data);

		await fsPromises.unlink(path.join(__dirname, "files", "starter.txt"));

		await fsPromises.writeFile(
			path.join(__dirname, "files", "promiseWrite.txt"),
			data
		);

		await fsPromises.appendFile(
			path.join(__dirname, "files", "promiseWrite.txt"),
			"\n\nNice To Meet you"
		);

		await fsPromises.rename(
			path.join(__dirname, "files", "promiseWrite.txt"),
			path.join(__dirname, "files", "promiseComplete.txt")
		);

		const newData = await fsPromises.readFile(
			path.join(__dirname, "files", "promiseComplete.txt"),
			"utf-8"
		);

		console.log(newData);
	} catch (err) {
		console.error(err);
	}
};

fileOps();

// This is Call-Back Hell: //
// ----------------------- //
// fs.writeFile(
// 	path.join(__dirname, "files", "reply.txt"),
// 	"Nice To Meet You!\n\n",
// 	(err) => {
// 		if (err) throw err;
// 		console.log("Write Completed");

// 		fs.appendFile(
// 			path.join(__dirname, "files", "reply.txt"),
// 			"Yes It Is\n",
// 			(err) => {
// 				if (err) throw err;
// 				console.log("Append Completed");

// 				fs.rename(
// 					path.join(__dirname, "files", "reply.txt"),
// 					path.join(__dirname, "files", "newReply.txt"),
// 					(err) => {
// 						if (err) throw err;
// 						console.log("Rename Completed");
// 					}
// 				);
// 			}
// 		);
// 	}
// );

process.on("uncaughtException", (err) => {
	console.error(`There was uncaught error: ${err}`);
	process.exit(1);
});
