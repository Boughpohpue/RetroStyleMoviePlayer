function intersects(rect1, rect2) {
	if (
		rect1.bottom < rect2.top ||
		rect1.top > rect2.bottom ||
		rect1.left > rect2.right ||
		rect1.rights < rect2.left
	) {
		return false;
	}

	return true;
}
