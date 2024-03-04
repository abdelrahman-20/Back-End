exports.getDate = function () {
	const today = new Date();
	const options = {
		weekday: "long",
		month: "long",
		day: "numeric",
		hour: "numeric",
		hour12: true,
	};

	return today.toLocaleDateString("en-EG", options);
};

exports.getDay = function () {
	const today = new Date();
	const options = {
		weekday: "long",
	};

	return today.toLocaleDateString("en-EG", options);
};
