let currentCursorPosition = { x: undefined, y: undefined };
window.addEventListener("mousemove", (event) => {
	currentCursorPosition = { x: event.clientX, y: event.clientY };
});
