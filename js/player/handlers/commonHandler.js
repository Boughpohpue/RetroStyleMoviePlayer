/* !!! UPDATE UI ON WINDOW RESIZE !!! */
$(window).on("resize", function () {
	player.updateHeight();
	var win = $(this); //this = window
	if (win.height() >= 820) {
		/* ... */
	}
	if (win.width() >= 1280) {
		/* ... */
	}
});

/* !!! DRAGGER -> MOVE AND DROP OBJECTS !!! */
$(document.body).mousemove(function (e) {
	if (typeof dragger === "undefined" || dragger === null) {
		return;
	}
	if (dragger.dragElement == null) {
		return;
	}

	// var dX = e.pageX - dragger.dragElementGrabX;
	// var dY = e.pageY - dragger.dragElementGrabY;
	$(dragger.dragElement).css("transition", "width 0s !important");
	$(dragger.dragElement).css("right", "");
	$(dragger.dragElement).css("bottom", "");

	$(dragger.dragElement).css(
		"top",
		e.pageY - Math.round(dragger.dragElementHeight / 2) + "px"
	);
	$(dragger.dragElement).css(
		"left",
		e.pageX - Math.round(dragger.dragElementWidth / 2) + "px"
	);

	var dragElBounds = document
		.getElementById($(dragger.dragElement).attr("id"))
		.getBoundingClientRect();

	for (var i = 0; i < dragger.dropElements.length; i++) {
		var dropElBounds = document
			.getElementById($(dragger.dropElements[i]).attr("id"))
			.getBoundingClientRect();

		if (intersects(dragElBounds, dropElBounds)) {
			//console.log(
			//"Drag over element: " + $(dragger.dropElements[i]).attr("id")
			//);
		}
	}
});

$(document.body).mouseup(function (e) {
	if (typeof dragger === "undefined" || dragger === null) {
		return;
	}
	if (dragger.dragElement == null) {
		return;
	}

	var dragElBounds = document
		.getElementById($(dragger.dragElement).attr("id"))
		.getBoundingClientRect();

	for (var i = 0; i < dragger.dropElements.length; i++) {
		var dropElBounds = document
			.getElementById($(dragger.dropElements[i]).attr("id"))
			.getBoundingClientRect();

		if (intersects(dragElBounds, dropElBounds)) {
			playerEventsService.raiseEvent(
				"draggerDrop",
				dragger.dragElement,
				new PlayerEventArgs(dragger.dropElements[i])
			);

			dragger.drop();
			break;
		}
	}

	dragger.dragPointX = undefined;
	dragger.dragPointY = undefined;
	dragger.dragElementTop = undefined;
	dragger.dragElementLeft = undefined;
	dragger.dragElementGrabX = undefined;
	dragger.dragElementGrabY = undefined;
});
