class Dragger {
	dragElement = null;
	dragElementToCenter = true;
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

	drag(element, x, y, showLog = false, center = true) {
		if (this.dragElement != null) {
			return;
		}

		// console.log("dragging");
		// console.log(element);

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
		jQuery($(this.dragElement)).appendTo($("#myBackground"));

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

const dragger = new Dragger();
