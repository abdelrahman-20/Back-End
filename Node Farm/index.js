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

/*
 * Node Farm Project
 */

//* Using Modules *//
const fs = require("fs");
const url = require("url");
const http = require("http");
const slugify = require("slugify");
const replaceTemplate = require("./modules/replaceTemplate");

//* Declaring Variables *//
const port = 3000;

//* READING DATA FROM FILES *//

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

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
const dataObject = JSON.parse(data);

const slugs = dataObject.map((el) => {
  return slugify(el.productName, { lower: true });
});

console.log(slugs);

//* Creating The Server *//
const server = http.createServer((req, res) => {
  //? Get The Required Path (Route):
  // const pathName = req.url;
  const { query, pathname } = url.parse(req.url, true);

  //? Overview Page:
  if (pathname === "/" || pathname === "/overview") {
    const cardsHTML = dataObject
      .map((el) => replaceTemplate(tempCard, el))
      .join("");
    let output = tempOverview.replace(/{%PRODUCT_CARDS%}/, cardsHTML);

    res.writeHead(200, {
      "content-type": "text/html",
    });
    res.end(output);
  }
  //? Products Page:
  else if (pathname === "/product") {
    const product = dataObject[query.id];
    const output = replaceTemplate(tempProducts, product);

    res.writeHead(200, {
      "Content-type": "text/html",
    });
    res.end(output);
  }
  //? API Page:
  else if (pathname === "/api") {
    res.writeHead(200, { "content-type": "application/json" });
    res.end(data);
  }
  //? ERROR Page:
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
