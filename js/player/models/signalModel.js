class signalModel {
	Id = null;
	ParentId = null;
	Container = null;
	SignalScreen = null;
	OutputDevice = null;
	Settings = new SettingsContainer();

	constructor(el, id) {
		this.Id = newGuid();
		this.ParentId = id;
		this.Container = el;

		var $screen = $("<div>", {
			id: "SignalScreen",
			class: "signalScreenVcr",
		});
		var $text = $("<div>", {
			id: "SignalText",
			class: "signalText",
		});
		var $video = $("<video>", {
			id: "SignalVideo",
			// width: LayoutMeasures.tvScreenWidth,
			class: "signalVideo",
		});
		var $src = $("<source>", {
			id: "SignalVideoSource",
			src: "",
			type: "video/mp4",
		});

		this.updateHeight();

		$video.append($src);
		$screen.append($video);

		$screen.append($text);
		this.SignalScreen = $screen;
		$(this.Container).append(this.SignalScreen);
	}

	connectOutput(outputDev) {
		this.OutputDevice = outputDev;

		jQuery($(this.SignalScreen))
			.detach()
			.appendTo(this.OutputDevice.TvScreen.ScreenContainer);

		console.log("VCR signal output connected!");
		this.printOutputText("yooo");
	}

	initVhsTape(tape) {}

	loadVhsMovie(moviePath) {
		var video = document.getElementById("SignalVideo");
		var source = document.getElementById("SignalVideoSource");
		source.src = moviePath;
		video.load();
	}

	unloadVhsMovie() {
		var video = document.getElementById("SignalVideo");
		var source = document.getElementById("SignalVideoSource");
		video.pause();
		source.src = "";
		video.load();
	}

	getCurrentMovieDuration() {
		var video = document.getElementById("SignalVideo");
		if (isNaN(video.duration)) {
			return 0;
		}

		return video.duration;
	}

	getCurrentMovieTime() {
		var video = document.getElementById("SignalVideo");
		if (isNaN(video.currentTime)) {
			return 0;
		}

		return video.currentTime;
	}

	setCurrentMovieTime(t) {
		var video = document.getElementById("SignalVideo");
		// if (isNaN(video.currentTime)) {
		// 	return;
		// }

		video.currentTime = t;
	}

	getCurrentMovieWidth() {
		var video = document.getElementById("SignalVideo");
		if (video == null) {
			return 0;
		}

		return video.videoWidth;
	}

	getCurrentMovieHeight() {
		var video = document.getElementById("SignalVideo");
		if (video == null) {
			return 0;
		}
		return video.videoHeight;
	}

	fsOn() {
		// var video = document.getElementById("SignalVideo");
		// if (video == null) {
		// 	return 0;
		// }

		jQuery($("#SignalVideo")).detach().appendTo($("#myForeground")); ////document.body);
		// $(video).addClass("fs");
	}
	fsOff() {
		// var video = document.getElementById("SignalVideo");
		// if (video == null) {
		// 	return 0;
		// }

		// $(video).removeClass("fs");
		jQuery($("#SignalVideo")).detach().appendTo($("#tvScreen"));
	}

	updateSize() {
		return;

		var screen = document.getElementById("tvScreen");
		var video = document.getElementById("SignalVideo");

		console.log("updating size");
		console.log("fs=" + isFullscreenOn);

		if (isFullscreenOn) {
			console.log("fs on!");
			var screenWidth = window.screen.width; //availWidth;
			var screenHeight = window.screen.height; //.availHeight;
			var movieWidth = this.getCurrentMovieWidth();
			var movieHeight = this.getCurrentMovieHeight();

			var videoWidth = screenWidth;
			var videoHeight = Math.floor(movieHeight * (screenWidth / movieWidth));
			if (videoHeight > screenHeight) {
				videoHeight = screenHeight;
				videoWidth = Math.floor(movieWidth * (screenHeight / movieHeight));
			}
			var top = Math.floor((screenHeight - videoHeight) / 2);
			if (top < 0) {
				top = 0;
			}

			$(video).css("top", top + "px");
			$(video).css("width", videoWidth + "px");
			$(video).css("height", videoHeight + "px");
			this.fsOn();
			// $(video).addClass("fs");
			// $(video).css("top", "0%");
			// $(video).css("width", "100%");
			// $(video).css("height", "100%");
			return;
		}

		//$(video).removeClass("fs");

		var screenWidth = $(screen).width();
		var screenHeight = $(screen).height();
		var movieWidth = this.getCurrentMovieWidth();
		var movieHeight = this.getCurrentMovieHeight();

		var videoWidth = screenWidth;
		var videoHeight = Math.floor(movieHeight * (screenWidth / movieWidth));
		if (videoHeight > screenHeight) {
			videoHeight = screenHeight;
			videoWidth = Math.floor(movieWidth * (screenHeight / movieHeight));
		}

		var top = Math.floor((screenHeight - videoHeight) / 2);
		if (top < 0) {
			top = 0;
		}

		$(video).css("top", top + "px");
		$(video).css("width", videoWidth + "px");
		$(video).css("height", videoHeight + "px");
		this.fsOff();
	}

	updateHeight() {
		// this.updateSize();
		// return;
		var video = document.getElementById("SignalVideo");
		var screen = document.getElementById("tvScreen");

		var screenHeight = $(screen).height();
		var videoHeight = $(video).height();

		var top = Math.round((screenHeight - videoHeight) / 2);
		$(video).css("top", top);
	}

	activate() {
		if (this.OutputDevice == null) {
			return;
		}

		$(this.SignalScreen).addClass("on");
		this.updateVolume();
	}
	deactivate() {
		if (this.OutputDevice == null) {
			return;
		}

		var video = document.getElementById("SignalVideo");
		video.volume = 0.0;
		$(this.SignalScreen).removeClass("on");
	}

	play() {
		$(this.SignalScreen).addClass("play");
		this.updateSize();
		setTimeout(() => {
			//this.activate();
			var video = document.getElementById("SignalVideo");
			$(video).addClass("on");
			video.play();
		}, 666);
	}

	pause() {
		var video = document.getElementById("SignalVideo");
		video.pause();
	}

	stop() {
		var video = document.getElementById("SignalVideo");
		video.pause();
		$(video).removeClass("on");
		$(this.SignalScreen).removeClass("play");
		//this.deactivate();
	}

	updateVolume() {
		var volSetting = this.OutputDevice.Settings.get("volume");
		var video = document.getElementById("SignalVideo");
		video.volume = volSetting.Value / volSetting.Maximum;
	}

	updatePlaybackRate(rate) {
		var video = document.getElementById("SignalVideo");

		if (rate == 1) {
			this.updateVolume();
		} else {
			video.volume = 0;
		}

		//video.volume = volSetting.Value / volSetting.Maximum;
		video.playbackRate = rate;
	}

	printText(t, duration, delay) {
		this.printOutputText(t, duration, delay);
		return;
		setTimeout(() => {
			var signalText = $(this.OutputElementSelector).find("#SignalText");
			$(signalText).text(t);
			$(signalText).addClass("on");
			setTimeout(() => {
				$(signalText).removeClass("on");
				$(signalText).text("");
			}, duration);
		}, delay);
	}

	printOutputText(t, duration, delay) {
		if (this.OutputDevice == null) {
			return;
		}

		setTimeout(() => {
			this.OutputDevice.printOutputText(t);
			setTimeout(() => {
				//this.OutputDevice.printOutputText("");
			}, duration);
		}, delay);

		this.OutputDevice.printOutputText(t);
	}
}
