const fs = require("fs");

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

// --------------------------------------------------------------
