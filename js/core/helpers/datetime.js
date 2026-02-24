function dateToTimeString(date) {
	return getPrettyTimeString(date, true);
}
function secondsToTimeString(seconds) {
	return getPrettyTimeString(new Date(seconds * 1000), false);
}
function getPrettyTimeString(date, includeOffset) {
	if (includeOffset) {
		date = getDateWithAddedMinutes(date, date.getTimezoneOffset() * -1);
	}

	return date.toISOString().slice(11, 19);
}
function getDateWithAddedMinutes(date, minutes) {
	return new Date(date.getTime() + minutes * 60000);
}
