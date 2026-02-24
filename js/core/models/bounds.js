class Bounds {
	top;
	left;
	right;
	bottom;
	width;
	height;
	centerX;
	centerY;

	constructor(element) {
		this.top = toInt($(element).css("top"));
		this.left = toInt($(element).css("left"));
		this.width = toInt($(element).css("width"));
		this.height = toInt($(element).css("height"));
		this.right = this.left + this.width;
		this.bottom = this.top + this.height;
		this.centerX = this.left + Math.round(this.width / 2);
		this.centerY = this.top + Math.round(this.height / 2);
	}

	intersects(bounds) {
		if (
			this.bottom < bounds.top ||
			this.top > bounds.bottom ||
			this.left > bounds.right ||
			this.rights < bounds.left
		) {
			return false;
		}

		return true;
	}

	getString() {
		return `Element bounds: position=(${this.left},${this.top}) size=(${this.width},${this.height})`;
	}
}
