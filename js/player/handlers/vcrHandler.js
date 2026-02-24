$(".vcrInjectCover").on("mousedown", function () {
	$(this).addClass("open");

	var tape = $(".vcrTapeClosed");
	if (tape == null || tape === undefined) {
		return;
	}

	$(tape).removeClass("vcrTapeClosed");
	$(tape).addClass("vcrTapeLoadedPeek");
});

$(document).on("mouseup mouseout", ".vcrInjectCover", function (e) {
	$(".vcrInjectCover").removeClass("open");

	var tape = $(".vcrTapeLoadedPeek");
	if (tape == null || tape === undefined) {
		return;
	}

	$(tape).removeClass("vcrTapeLoadedPeek");
	$(tape).addClass("vcrTapeClosed");
});

$("#playerVcrPowerButton").on("click", function () {
	player.Vcr.power();
});

$("#playerVcrEjectButton").on("click", function () {
	player.Vcr.ejectTape();
});

$("#playerVcrPlayButton").on("click", function () {
	player.Vcr.play();
});

$("#playerVcrStopButton").on("click", function () {
	player.Vcr.stop();
});

$("#SignalVideo").bind("loadedmetadata", function () {
	//console.log("signal video bound");
	player.Vcr.Signal.updateHeight();
	setTimeout(() => {
		//player.Vcr.Signal.activate();
	}, 1666);

	//vcrUpdateMovieDuration();
});
