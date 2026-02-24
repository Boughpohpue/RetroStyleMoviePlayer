class tvScreenModel {
	Id = null;
	ParentId = null;
	Container = null;
	ScreenContainer = null;
	ScreenTextContainer = null;
	ScreenInputTextContainer = null;
	TrailerContainer = null;

	constructor(el, id) {
		this.Id = newGuid();
		this.ParentId = id;
		this.Container = el;

		var $screen = $("<div>", {
			id: "tvScreen",
			class: "tvScreen",
		});
		var $screenInput = $("<div>", {
			id: "tvScreenInput",
			class: "tvScreenInput",
		});
		var $screenText = $("<div>", {
			id: "tvScreenText",
			class: "tvScreenText tv-blur",
		});
		var $screenInputText = $("<div>", {
			id: "tvScreenInputText",
			class: "tvScreenInputText tv-blur",
		});

		var $trailerContainer = $("<div>", {
			id: "MyTrailerContainer",
			class: "trailerContainer",
		});
		var $trailerVideo = $("<video>", {
			id: "MovieTrailerVideo",
			width: LayoutMeasures.tvScreenWidth,
		});
		var $trailerVideoSource = $("<source>", {
			id: "TrailerVideoSource",
			src: "",
			type: "video/mp4",
		});

		var $bottom = $("<div>", {
			id: "SignalBottom",
			class: "signalBottom active",
		});
		var $bottomLineWhite = $("<div>", {
			id: "SignalBottomLineWhite",
			class: "signalBottomLine white",
		});
		var $bottomLineRed = $("<div>", {
			id: "SignalBottomLineRed",
			class: "signalBottomLine red",
		});
		var $bottomLineGreen = $("<div>", {
			id: "SignalBottomLineGreen",
			class: "signalBottomLine green",
		});
		$bottom.append($bottomLineWhite);
		$bottom.append($bottomLineRed);
		$bottom.append($bottomLineGreen);

		$trailerVideo.append($trailerVideoSource);
		$trailerContainer.append($trailerVideo);
		//$screen.append($trailerContainer);
		$screen.append($screenInput);
		$screen.append($screenText);
		$screen.append($screenInputText);
		$screen.append($bottom);
		$(this.Container).append($screen);
		//$(this.Container).append($trailerContainer);
		this.ScreenContainer = $(this.Container).find("#tvScreen");
		this.ScreenTextContainer = $(this.Container).find("#tvScreenText");
		this.ScreenInputTextContainer = $(this.Container).find(
			"#tvScreenInputText"
		);
		//this.TrailerContainer = $(this.Container).find("#MyTrailerContainer");
	}

	updateHeight() {
		$(this.ScreenContainer).css("top", LayoutMeasures.tvScreenTop + "px");
		$(this.ScreenContainer).css("left", LayoutMeasures.tvScreenLeft + "px");
		$(this.ScreenContainer).css(
			"min-width",
			LayoutMeasures.tvScreenWidth + "px"
		);
		$(this.ScreenContainer).css(
			"max-width",
			LayoutMeasures.tvScreenWidth + "px"
		);
		$(this.ScreenContainer).css(
			"min-height",
			LayoutMeasures.tvScreenHeight + "px"
		);
		$(this.ScreenContainer).css(
			"max-height",
			LayoutMeasures.tvScreenHeight + "px"
		);

		$(this.TrailerContainer).css("top", LayoutMeasures.tvScreenTop + "px");
		$(this.TrailerContainer).css("left", LayoutMeasures.tvScreenLeft + "px");
		$(this.TrailerContainer).css(
			"min-width",
			LayoutMeasures.tvScreenWidth + "px"
		);
		$(this.TrailerContainer).css(
			"max-width",
			LayoutMeasures.tvScreenWidth + "px"
		);
		$(this.TrailerContainer).css(
			"min-height",
			LayoutMeasures.tvScreenHeight + "px"
		);
		$(this.TrailerContainer).css(
			"max-height",
			LayoutMeasures.tvScreenHeight + "px"
		);

		// $(this.ScreenTextContainer).css(
		// 	"font-size",
		// 	LayoutMeasures.tvScreenTextFontSize + "px"
		// );
		// $(this.ScreenInputTextContainer).css(
		// 	"font-size",
		// 	Math.ceil(LayoutMeasures.tvScreenInputTextFontSize * 2.5) + "px"
		// );
	}

	activate() {
		$(this.ScreenContainer).addClass("on");

		//this.printOutputText("NO TAPE", 10000, 1000);
	}
	deactivate() {
		$(this.ScreenContainer).removeClass("on");
	}

	printText(t) {
		$(this.ScreenTextContainer).text(t);
		$(this.ScreenTextContainer).addClass("on");
		setTimeout(() => {
			if ($(this.ScreenTextContainer).text() != t) {
				return;
			}
			$(this.ScreenTextContainer).text("");
			$(this.ScreenTextContainer).removeClass("on");
		}, 5000);
	}

	printOutputText(t, duration = 5000, delay = 1) {
		$(this.ScreenInputTextContainer).text(t);
		$(this.ScreenInputTextContainer).addClass("active");
		setTimeout(() => {
			if ($(this.ScreenInputTextContainer).text() != t) {
				return;
			}
			$(this.ScreenInputTextContainer).text("");
			$(this.ScreenInputTextContainer).removeClass("active");
		}, duration);
	}

	getWidth() {
		return $(this.ScreenContainer).css("width");
	}
	getHeight() {
		return $(this.ScreenContainer).css("height");
	}
}
