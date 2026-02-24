let customCssClasses = [];

function createCustomCssClass(className, classDefinition) {
	if (customCssClassExists(className)) {
		return;
	}

	var cssClass = document.createElement("style");
	cssClass.type = "text/css";
	cssClass.innerHTML = classDefinition;
	document.getElementsByTagName("head")[0].appendChild(cssClass);
	customCssClasses.push(className);
}

function customCssClassExists(searchClassName) {
	return customCssClasses.includes(searchClassName);
}

function hasNoFullScreen(elem) {
	return (
		(document.fullScreenElement !== undefined &&
			document.fullScreenElement === null) ||
		(document.msFullscreenElement !== undefined &&
			document.msFullscreenElement === null) ||
		(document.mozFullScreen !== undefined && !document.mozFullScreen) ||
		(document.webkitIsFullScreen !== undefined && !document.webkitIsFullScreen)
	);
}

var isFullscreenOn = false;
function fullScreenOn(elem) {
	if (hasNoFullScreen(elem)) {
		if (elem.requestFullScreen) {
			elem.requestFullScreen();
		} else if (elem.mozRequestFullScreen) {
			elem.mozRequestFullScreen();
		} else if (elem.webkitRequestFullScreen) {
			elem.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
		} else if (elem.msRequestFullscreen) {
			elem.msRequestFullscreen();
		}
		isFullscreenOn = true;
	}
}
function fullScreenOff(elem) {
	if (!hasNoFullScreen(elem)) {
		if (document.cancelFullScreen) {
			document.cancelFullScreen();
		} else if (document.mozCancelFullScreen) {
			document.mozCancelFullScreen();
		} else if (document.webkitCancelFullScreen) {
			document.webkitCancelFullScreen();
		} else if (document.msExitFullscreen) {
			document.msExitFullscreen();
		}
		isFullscreenOn = false;
	}
}

function checkIfAnyElementHasClasses(classesName) {
	var found = false;
	$("*").each(function () {
		if (!found) {
			for (var i = 0; i < classesName.length; i++) {
				if ($(this).hasClass(classesName[i])) {
					found = true;
				}
			}
		}
	});

	return found;
}

function checkIfAnyElementHasClass(className) {
	var found = false;
	$("*").each(function () {
		if (!found) {
			if ($(this).hasClass(className)) {
				found = true;
			}
		}
	});

	return found;
}

function detectBrowser() {
	if (bowser.msie && bowser.version <= 6) {
		alert("Hello IE");
	} else if (bowser.firefox) {
		alert("Hello Foxy");
	} else if (bowser.chrome) {
		alert("Hello Chrome");
	} else if (bowser.safari) {
		alert("Hello Safari");
	} else if (bowser.iphone || bowser.android) {
		alert("Hello mobile");
	}
}
