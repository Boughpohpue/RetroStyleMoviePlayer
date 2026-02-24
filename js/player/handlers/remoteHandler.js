$(".remoteContainer").on("mouseover", function (e) {
	if (!$(".remoteController").hasClass("focus")) {
		$(".remoteController").addClass("focus");
		$(".remoteContainer").addClass("open");
	}
});
$(".remoteContainer").on("mouseout", function (e) {
	if (!$("#remoteLock").hasClass("locked")) {
		$(".remoteController").removeClass("focus");
		$(".remoteContainer").removeClass("open");
	}
});

$(".remoteController").mousedown(function (e) {
	//dragger.drag($(this), e.pageX, e.pageY, true, false);
});
$(".remoteController").mouseup(function (e) {
	//dragger.drop();
});
$(".remoteControllerButton").on("mousedown", function () {
	$(this).addClass("pushed");
	$(".remoteControllerLed").removeClass("off").addClass("on");
	$(".tvIrdaLed").removeClass("off").addClass("on");
});

$(".remoteControllerButton").on("mouseup", function () {
	$(".remoteControllerLed").removeClass("on").addClass("off");
	$(".tvIrdaLed").removeClass("on").addClass("off");
	$(this).removeClass("pushed");
});

$("#remoteLock").on("mouseover", function () {
	$("#remoteLockIcon").addClass("fa-beat-fade");
});
$("#remoteLock").on("mouseout", function () {
	$("#remoteLockIcon").removeClass("fa-beat-fade");
});

$("#remoteLock").on("mousedown", function () {
	$("#remoteLock").toggleClass("locked");
	$("#remoteLockIcon").removeClass("fa-beat-fade");
	if ($("#remoteLock").hasClass("locked")) {
		$("#remoteLockIcon").removeClass("fa-lock-open").addClass("fa-lock");
	} else {
		$("#remoteLockIcon").removeClass("fa-lock").addClass("fa-lock-open");
	}
});
