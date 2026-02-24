$(".shelfContainer").on("mouseover", function (e) {
	if (!hasNoFullScreen()) {
		return;
	}

	

	if (!$("#shelf").hasClass("open")) {
		$("#shelf").addClass("open");
		$("#myPlayerTv").addClass("onside");
		$("#myPlayerVcr").addClass("onside");
		$("#myPlayerShelf").addClass("open");
	}
});

$(".shelfContainer").on("mouseout", function (e) {
	if (!hasNoFullScreen()) {
		return;
	}

	if (!$(".shelfLock").hasClass("locked") && $("#shelf").hasClass("open")) {
		$("#myPlayerShelf").removeClass("open");
		$("#myPlayerTv").removeClass("onside");
		$("#myPlayerVcr").removeClass("onside");
		$("#shelf").removeClass("open");
	}
});

$("#shelfLock").on("mouseover", function () {
	$("#shelfLockIcon").addClass("fa-beat-fade");
});
$("#shelfLock").on("mouseout", function () {
	$("#shelfLockIcon").removeClass("fa-beat-fade");
});

$("#shelfLock").on("mousedown", function () {
	$("#shelfLock").toggleClass("locked");
	$("#shelfLockIcon").removeClass("fa-beat-fade");
	if ($("#shelfLock").hasClass("locked")) {
		$("#shelfLockIcon").removeClass("fa-lock-open").addClass("fa-lock");
	} else {
		$("#shelfLockIcon").removeClass("fa-lock").addClass("fa-lock-open");
	}
});
