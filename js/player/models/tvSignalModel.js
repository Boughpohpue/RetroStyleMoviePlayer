class TvSignalModel {
	Id = null;
	ParentId = null;
	Channel = null;
	Container = null;
	SignalVideo = null;
	SignalScreen = null;
	OutputDevice = null;
	TimeSet = false;

	constructor(id, channel) {
		this.Id = newGuid();
		this.ParentId = id;
		this.Channel = channel;

		var $screen = $("<div>", {
			id: "SignalScreen_" + this.Channel.Id,
			class: "signalScreen",
		});

		var $video = $("<video>", {
			id: "SignalVideo_" + this.Channel.Id,
			width: LayoutMeasures.tvScreenWidth,
			class: "signalVideo",
		});

		var $src = $("<source>", {
			id: "SignalVideoSource_" + this.Channel.Id,
			src: this.Channel.SignalFilePath,
			type: "video/mp4",
		});
		$video.prop("loop", true);
		$video.append($src);
		$screen.append($video);
		this.Container = $screen;

		this.SignalScreen = $screen;
		this.SignalVideo = $video;
	}

	connectOutput(outputDev) {
		this.OutputDevice = outputDev;
		jQuery($(this.SignalScreen))
			.detach()
			.appendTo($(this.OutputDevice.TvScreen.ScreenContainer));
	}

	activate() {
		if (this.OutputDevice == null) {
			return;
		}

		$(this.SignalScreen).addClass("on");
		var video = document.getElementById("SignalVideo_" + this.Channel.Id);
		var volSetting = this.OutputDevice.Settings.get("volume");
		video.volume = volSetting.Value / volSetting.Maximum;
	}
	deactivate() {
		if (this.OutputDevice == null) {
			return;
		}

		var video = document.getElementById("SignalVideo_" + this.Channel.Id);
		video.volume = 0.0;
		$(video).removeClass("on");
		$(this.SignalScreen).removeClass("on");
	}

	play() {
		if (this.OutputDevice == null) {
			return;
		}

		var video = document.getElementById("SignalVideo_" + this.Channel.Id);
		$(video).addClass("on");
		video.volume = 0.0;

		if (!this.TimeSet) {
			video.currentTime = getRandomInt(
				Math.round(video.duration * 0.15),
				Math.round(video.duration * 0.85)
			);
			video.play();
			this.TimeSet = true;
		}
	}

	updateVolume() {
		var video = document.getElementById("SignalVideo_" + this.Channel.Id);
		var volSetting = this.OutputDevice.Settings.get("volume");
		video.volume = volSetting.Value / volSetting.Maximum;
	}

	updateSize() {
		var screen = document.getElementById("tvScreen");
		var video = document.getElementById("SignalVideo_" + this.Channel.Id);
		if (!hasNoFullScreen()) {
			$(video).css("top", null);
			$(video).css("width", null);
			$(video).css("height", null);
			return;
		}

		var screenWidth = $(screen).width();
		var screenHeight = $(screen).height();
		var movieWidth = this.getCurrentMovieWidth();
		var movieHeight = this.getCurrentMovieHeight();

		var videoWidth = screenWidth;
		var videoHeight = movieHeight * (screenWidth / movieWidth);
		if (videoHeight > screenHeight) {
			videoHeight = screenHeight;
			videoWidth = movieWidth * (screenHeight / movieHeight);
		}

		$(video).width(videoWidth);
		$(video).height(videoHeight);
		var top = Math.floor((screenHeight - videoHeight) / 2);
		$(video).css("top", top);
	}

	updateFullScreenSize() {
		var video = document.getElementById("SignalVideo_" + this.Channel.Id);
		$(video).css("top", null);
		$(video).css("width", null);
		$(video).css("height", null);
	}
}
