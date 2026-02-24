function getRandom(min, max) {
	return Math.random() * (max - min) + min;
}

function getRandomInt(min, max) {
	return Math.round(Math.random() * (max - min) + min);
}

function toInt(str) {
	var numsRex = /[0-9]+/;
	var numeric = str.match(numsRex);
	if (numeric == null) {
		return undefined;
	}

	return parseInt(numeric);
}

function toPx(v) {
	return v + "px";
}
