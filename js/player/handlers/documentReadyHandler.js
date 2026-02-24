const player = new playerModel(
	$("#myPlayerTv"),
	$("#myPlayerVcr"),
	$("#myPlayerShelf"),
	$("#myPlayerRemote"),
	$("#myPlayerPoster")
);

$(document).ready(function () {
	welcome();
	player.assembly();
	player.loadChannels(myChannels);
	player.loadTapes(vhsMoviesCollection);

	dragger.registerDropElement($("#myPlayerVcr"));
	dragger.registerDropElement($("#myPlayerShelf"));

	playerEventsService.addEvent(new PlayerEvent("draggerDrop"));
	playerEventsService.addEvent(new PlayerEvent("tvCommand"));
	playerEventsService.addEvent(new PlayerEvent("vcrCommand"));
	playerEventsService.addEvent(new PlayerEvent("vcrVhsTimeTimerTick"));
	playerEventsService.addEvent(new PlayerEvent("vcrDateTimeTimerTick"));
	playerEventsService.addEvent(new PlayerEvent("vcrVhsRewTimeTimerTick"));

	playerEventsService.addEventListener("draggerDrop", (e, s) => {
		player.Vcr.onDrop(e, s);
	});
	playerEventsService.addEventListener("draggerDrop", (e, s) => {
		player.Shelf.onDrop(e, s);
	});
	playerEventsService.addEventListener("tvCommand", (e, s) => {
		player.Tv.onCommand(e, s);
	});
	playerEventsService.addEventListener("vcrCommand", (e, s) => {
		player.Vcr.onCommand(e, s);
	});
	playerEventsService.addEventListener("vcrVhsTimeTimerTick", (e, s) => {
		player.Vcr.onVhsTimeTimerTick(e, s);
	});
	playerEventsService.addEventListener("vcrDateTimeTimerTick", (e, s) => {
		player.Vcr.onDateTimeTimerTick(e, s);
	});
	playerEventsService.addEventListener("vcrVhsRewTimeTimerTick", (e, s) => {
		player.Vcr.onVhsRewTimeTimerTick(e, s);
	});

	$("#mySplashScreen").click(function () {
		hideSplashTitle();
	});

	$("#myTitleScreen").click(function () {
		hideSplashTitle();
	});
});

function welcome() {
	console.log("welcome");
	if (isdebug) {
		$("#myForeground").addClass("off");
		$("#myTitleScreen").addClass("off");
		$("#mySplashScreen").addClass("off");
		$("#mySplashScreen").addClass("out");
		$("#myTitleScreen").addClass("out");
		$("#myForeground").addClass("out");
	} else {
		setTimeout(() => {
			$("#mySplashScreen").removeClass("off");

			setTimeout(() => {
				hideSplashTitle();
			}, 5333);
		}, 133);
	}
}

function hideSplashTitle() {
	if (
		isdebug ||
		new Date().getTime() - appStartTime < 5333 ||
		$("#myTitleScreen").hasClass("off")
	) {
		return;
	}

	$("#myTitleScreen").addClass("off");
	$("#mySplashScreen").addClass("off");
	setTimeout(() => {
		$("#myTitleScreen").addClass("out");
		$("#mySplashScreen").addClass("out");
		setTimeout(() => {
			$("#myForeground").addClass("off");
			setTimeout(() => {
				$("#myForeground").addClass("out");
			}, 1333);
		}, 144);
	}, 1333);
}
