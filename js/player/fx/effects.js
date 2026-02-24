const filterMinVal = 0.0;
const filterMaxVal = 2.0;
const filterStep = 0.1;

function applyBrightnessFilter(el, doubleVal) {
	el.css("-webkit-filter", "brightness(" + doubleVal + ")");
}
function applyContrastFilter(el, doubleVal) {
	el.css("-webkit-filter", "contrast(" + doubleVal + ")");
}
function applySaturationFilter(el, doubleVal) {
	el.css("-webkit-filter", "saturate(" + doubleVal + ")");
}
function applyGrayscaleFilter(el, doubleVal) {
	el.css("-webkit-filter", "grayscale(" + doubleVal + ")");
}

function applyBlurFilter(el, pxVal) {
	el.css("-webkit-filter", "blur(" + pxVal + "px)");
}
function applyInvertFilter(el, percentVal) {
	el.css("-webkit-filter", "invert(" + percentVal + "%)");
}
function applySepiaFilter(el, percentVal) {
	el.css("-webkit-filter", "sepia(" + percentVal + "%)");
}
function applyOpacityFilter(el, percentVal) {
	el.css("-webkit-filter", "opacity(" + percentVal + "%)");
}
function applyHueRotateFilter(el, degVal) {
	el.css("-webkit-filter", "hue-rotate(" + degVal + "deg)");
}

function getCurrentFilters(el) {}

// var SELECTOR_SCREEN_ELEMENT = ".signalScreenVcr";
// var isTurnedOn = true;
// var timeline;

// function buildTvSwitchTimeline() {
// 	timeline = new TimelineMax({
// 		paused: true,
// 	});

// 	timeline
// 		.to(SELECTOR_SCREEN_ELEMENT, 0.2, {
// 			width: "100vw",
// 			height: "2px",
// 			background: "#ffffff",
// 			ease: Power2.easeOut,
// 		})
// 		.to(SELECTOR_SCREEN_ELEMENT, 0.2, {
// 			width: "0",
// 			height: "0",
// 			background: "#ffffff",
// 		});
// }

// function toggleSwitcherTV() {
// 	if (isTurnedOn) {
// 		timeline.restart();
// 	}

// 	if (!isTurnedOn) {
// 		timeline.reverse();
// 	}

// 	isTurnedOn = !isTurnedOn;
// }

function animateBlink(el, duration) {
	if (!el.hasClass("canBlink")) {
		return;
	}

	var opacity = el.css("opacity");

	if (opacity == "1" || opacity == "1.0") {
		el.css("opacity", "0");
	} else if (opacity == "0" || opacity == "0.0") {
		el.css("opacity", "1");
	}

	setTimeout(() => {
		animateBlink(el, duration);
	}, duration);
}

function animateAutoTracking() {
	setTimeout(() => {
		$(".signalScreenVcr").addClass("tv-blur3");
	}, 333);
	animateVideoSkip(5);
	setTimeout(() => {
		$(".signalScreenVcr").removeClass("tv-blur3");
		$(".signalScreenVcr").addClass("tv-blur2");
	}, 1333);
	setTimeout(() => {
		$(".signalScreenVcr").removeClass("tv-blur2");
		$(".signalScreenVcr").addClass("tv-hue1");
	}, 1833);
	setTimeout(() => {
		$(".signalScreenVcr").removeClass("tv-hue1");
		$(".signalScreenVcr").addClass("tv-gray2");
	}, 2111);
	animateVideoSkip(5);
	setTimeout(() => {
		$(".signalScreenVcr").removeClass("tv-gray2");
		$(".signalScreenVcr").addClass("tv-saturate2");
	}, 2333);
	setTimeout(() => {
		$(".signalScreenVcr").removeClass("tv-saturate2");
		$(".signalScreenVcr").addClass("tv-blur");
	}, 2666);
	setTimeout(() => {
		$(".signalScreenVcr").removeClass("tv-blur");
		$(".signalScreenVcr").addClass("tv-hue2");
	}, 3333);
	animateVideoSkip(5);
	setTimeout(() => {
		$(".signalScreenVcr").removeClass("tv-hue2");
		$(".signalScreenVcr").addClass("tv-hue3");
	}, 3666);
	setTimeout(() => {
		$(".signalScreenVcr").removeClass("tv-hue3");
		$(".signalScreenVcr").addClass("tv-hue");
	}, 3888);
	animateVideoSkip(5);
	setTimeout(() => {
		$(".signalScreenVcr").removeClass("tv-hue");
		$(".signalScreenVcr").addClass("tv-blur");
	}, 4000);
	setTimeout(() => {
		$(".signalScreenVcr").removeClass("tv-blur");
		$(".signalScreenVcr").addClass("tv-blur2");
	}, 4333);
	animateVideoSkip(5);
	setTimeout(() => {
		$(".signalScreenVcr").removeClass("tv-blur2");
		$(".signalScreenVcr").addClass("tv-blur");
	}, 4666);
	animateVideoSkip(5);
	setTimeout(() => {
		$(".signalScreenVcr").removeClass("tv-blur");
		$(".signalScreenVcr").removeClass("tv-blur");
	}, 5000);
}

function animateAutoTracking2() {
	setTimeout(() => {
		$(".signalScreenVcr").addClass("tv-blur3");
	}, 333);
	setTimeout(() => {
		$(".signalScreenVcr").removeClass("tv-blur3");
		$(".signalScreenVcr").addClass("tv-blur2");
		animateVideoSkip(3);
	}, 1333);
	setTimeout(() => {
		$(".signalScreenVcr").removeClass("tv-blur2");
		$(".signalScreenVcr").addClass("tv-hue1");
	}, 1833);
	setTimeout(() => {
		$(".signalScreenVcr").removeClass("tv-hue1");
		$(".signalScreenVcr").addClass("tv-gray2");
	}, 2111);
	setTimeout(() => {
		$(".signalScreenVcr").removeClass("tv-gray2");
		$(".signalScreenVcr").addClass("tv-saturate2");
	}, 2333);
	setTimeout(() => {
		$(".signalScreenVcr").removeClass("tv-saturate2");
		$(".signalScreenVcr").addClass("tv-blur");
		animateVideoSkip(5);
	}, 2666);

	setTimeout(() => {
		$(".signalScreenVcr").removeClass("tv-blur");
		$(".signalScreenVcr").addClass("tv-hue2");
	}, 3333);
	setTimeout(() => {
		$(".signalScreenVcr").removeClass("tv-hue2");
		$(".signalScreenVcr").addClass("tv-hue3");
	}, 3666);
	setTimeout(() => {
		$(".signalScreenVcr").removeClass("tv-hue3");
		$(".signalScreenVcr").addClass("tv-hue");
	}, 3888);
	setTimeout(() => {
		$(".signalScreenVcr").removeClass("tv-hue");
		$(".signalScreenVcr").addClass("tv-blur");
		animateVideoSkip(3);
	}, 4000);
	setTimeout(() => {
		$(".signalScreenVcr").removeClass("tv-blur");
		$(".signalScreenVcr").addClass("tv-blur2");
	}, 4333);
	setTimeout(() => {
		$(".signalScreenVcr").removeClass("tv-blur2");
		$(".signalScreenVcr").addClass("tv-blur");
	}, 4666);
	setTimeout(() => {
		$(".signalScreenVcr").removeClass("tv-blur");
		$(".signalScreenVcr").removeClass("tv-blur");
	}, 5000);
}

function animateVideoSkip(count) {
	if (count <= 0) {
		return;
	}

	$(".signalScreenVcr").addClass("skip");
	setTimeout(() => {
		$(".signalScreenVcr").removeClass("skip");
		setTimeout(() => {
			animateVideoSkip(count - 1);
		}, 66);
	}, 133);
}
