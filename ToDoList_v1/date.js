module.exports = getDate;
// console.log(module);

function getDate() {
	let today = new Date();
	let options = {
		weekday: "long",
		month: "long",
		day: "numeric",
		hour: "numeric",
		hour12: true,
	};

	let day = today.toLocaleDateString("en-EG", options);

	return day;
}
