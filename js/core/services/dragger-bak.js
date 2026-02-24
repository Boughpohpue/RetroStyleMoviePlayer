class Dragger {
	dragElement = null;
	dragPointX;
	dragPointY;
	dragElementTop;
	dragElementLeft;
	dragElementGrabX;
	dragElementGrabY;
	dropElements = [];

	registerDropElement(el) {
		this.dropElements.push(el);
	}

	drag(element, x, y, showLog = false) {
		if (this.dragElement != null) {
			return;
		}

		this.dragPointX = x;
		this.dragPointY = y;
		this.dragElement = element;
		this.dragElementTop = toInt($(element).css("top"));
		this.dragElementLeft = toInt($(element).css("left"));
		this.dragElementWidth = toInt($(element).css("width"));
		this.dragElementHeight = toInt($(element).css("height"));
		this.dragElementGrabX = x - this.dragElementLeft;
		this.dragElementGrabY = y - this.dragElementTop;

		$(this.dragElement).css(
			"top",
			y - Math.round(this.dragElementHeight / 2) + "px"
		);
		$(this.dragElement).css(
			"left",
			x - Math.round(this.dragElementWidth / 2) + "px"
		);

		jQuery($(this.dragElement)).detach();
		jQuery($(this.dragElement)).appendTo($("#bgLayer"));

		if (showLog) {
			console.log("Starting new element drag...");
			console.log("Mouse down point: (" + x + "," + y + ")");
			console.log("Top: " + this.dragElementTop);
			console.log("Left: " + this.dragElementLeft);
			console.log("Width: " + this.dragElementWidth);
			console.log("Height: " + this.dragElementHeight);
			console.log(
				"Drag point: (" +
					this.dragElementGrabX +
					"," +
					this.dragElementGrabY +
					")"
			);
		}
	}

	drop() {
		this.dragElement = null;
	}
}

$(document.body).mouseup(function (e) {
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

$(document.body).mousemove(function (e) {
	if (dragger.dragElement == null) {
		return;
	}

	var dX = e.pageX - dragger.dragElementGrabX;
	var dY = e.pageY - dragger.dragElementGrabY;
	$(dragger.dragElement).css("transition", "width 0s !important");
	//$(dragger.dragElement).css("top", dY + "px");
	//$(dragger.dragElement).css("left", dX + "px");
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

const dragger = new Dragger();
