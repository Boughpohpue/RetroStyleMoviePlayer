const vhsVideo = document.querySelector("#SignalVideo");

$(vhsVideo).bind("loadedmetadata", function () {
	var time = new Date().getTime();
	//console.log(time + " - video metadata loaded");
	//vcrUpdateMovieDuration();
});
