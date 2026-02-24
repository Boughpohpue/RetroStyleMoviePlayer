class vcrModel {
	Id = null;
	ParentId = null;
	Parent = null;
	Container = null;
	Settings = new SettingsContainer();

	DateTimeTimer = null;
	VhsTimeTimer = null;
	VhsRewTimeTimer = null;

	Cover = null;
	Display = null;
	DisplayInfo = null;
	DisplayDateTime = null;

	PowerButton = null;
	EjectButton = null;
	PlayButton = null;
	StopButton = null;

	Signal = null;
	VhsTape = null;

	VhsPlaying = false;
	VhsInitiating = false;

	SoundsAudio = null;
	InsertTapeAudio = null;
	EjectTapeAudio = null;
	PlayTapeAudio = null;
	StopTapeAudio = null;
	StartRewFwdTapeAudio = null;
	RewFwdTapeAudio = null;
	StopRewFwdTapeAudio = null;

	constructor(el, id, parent) {
		this.Id = newGuid();
		this.ParentId = id;
		this.Parent = parent;
		this.Container = el;
		this.initSettings();

		var $vcr = $("<div>", {
			id: "playerVcr",
			class: "vcr",
		});
		var $head = $("<div>", {
			id: "playerVcrHead",
			class: "vcrHead",
		});
		this.Cover = $("<div>", {
			id: "playerVcrCover",
			class: "vcrInjectCover",
		});
		this.Display = $("<div>", {
			id: "playerVcrDisplay",
			class: "vcrDisplay",
		});
		this.DisplayDateTime = $("<div>", {
			id: "playerVcrDisplayDateTime",
			class: "vcrDisplayDateTime",
		});
		this.DisplayInfo = $("<div>", {
			id: "playerVcrDisplayInfo",
			class: "vcrDisplayInfo",
		});
		this.PowerButton = $("<div>", {
			id: "playerVcrPowerButton",
			class: "vcrPowerButton",
		});
		this.EjectButton = $("<div>", {
			id: "playerVcrEjectButton",
			class: "vcrEjectButton elementDisabled",
		});
		this.PlayButton = $("<div>", {
			id: "playerVcrPlayButton",
			class: "vcrPlayButton",
		});
		this.StopButton = $("<div>", {
			id: "playerVcrStopButton",
			class: "vcrStopButton",
		});

		this.SoundsAudio = $("<audio>", {
			id: "playerVcrSoundsAudio",
		});

		$(this.Display).append(this.DisplayDateTime);
		$(this.Display).append(this.DisplayInfo);
		$($vcr).append(this.PowerButton);
		$($vcr).append(this.EjectButton);
		$($vcr).append(this.PlayButton);
		$($vcr).append(this.StopButton);
		//$($vcr).append($head);
		$($vcr).append(this.Cover);
		$($vcr).append(this.Display);
		$(this.Container).append($vcr);
		$(this.Container).append(this.SoundsAudio);

		var $signal = $("<div>", {
			id: "vcrSignal",
			class: "signal",
		});
		$(this.Container).append($signal);
		this.Signal = new signalModel(
			$(this.Container).find("#vcrSignal"),
			this.Id
		);

		this.updateHeight();

		this.DateTimeTimer = new PlayerTimer(1000, "vcrDateTimeTimerTick");
		this.DateTimeTimer.start();
		this.VhsTimeTimer = new PlayerTimer(1000, "vcrVhsTimeTimerTick");
		this.VhsTimeTimer.start();
		this.VhsRewTimeTimer = new PlayerTimer(67, "vcrVhsRewTimeTimerTick");
	}

	// priv

	initSettings() {
		this.Settings = new SettingsContainer();
		this.Settings.add(new Setting("power", 0, 1, 0));
		this.Settings.add(new Setting("isPlaying", 0, 1, 0));
		this.Settings.add(new Setting("isPaused", 0, 1, 0));
		this.Settings.add(new Setting("isForward", 0, 1, 0));
		this.Settings.add(new Setting("isFastForward", 0, 1, 0));
		this.Settings.add(new Setting("isRewind", 0, 1, 0));
		this.Settings.add(new Setting("isFastRewind", 0, 1, 0));
		this.Settings.add(new Setting("isSlow", 0, 1, 0));
		this.Settings.add(new Setting("slowSpeed", 1.5, 4, 1.5));
		this.Settings.add(new Setting("rewFwdSpeed", 8, 8, 8));
		this.Settings.add(new Setting("fastRewFwdSpeed", 16, 16, 16));
	}

	updateHeight() {
		var CurrentRatio = getCurrentRatio();

		var vcrWidth = Math.round(CurrentRatio * DesignVcrWidth);
		var vcrHeight = Math.round(CurrentRatio * DesignVcrHeight);
		$(this.Container).css("min-width", vcrWidth + "px");
		$(this.Container).css("max-width", vcrWidth + "px");
		$(this.Container).css("min-height", vcrHeight + "px");
		$(this.Container).css("max-height", vcrHeight + "px");

		var powerButtonTop = LayoutMeasures.vcrPowerButtonTop;
		var powerButtonLeft = LayoutMeasures.vcrPowerButtonLeft;
		var powerButtonWidth = LayoutMeasures.vcrPowerButtonWidth;
		var powerButtonHeight = LayoutMeasures.vcrPowerButtonHeight;
		$(this.PowerButton).css("top", powerButtonTop + "px");
		$(this.PowerButton).css("left", powerButtonLeft + "px");
		$(this.PowerButton).css("min-width", powerButtonWidth + "px");
		$(this.PowerButton).css("max-width", powerButtonWidth + "px");
		$(this.PowerButton).css("min-height", powerButtonHeight + "px");
		$(this.PowerButton).css("max-height", powerButtonHeight + "px");

		var ejectButtonTop = LayoutMeasures.vcrEjectButtonTop;
		var ejectButtonLeft = LayoutMeasures.vcrEjectButtonLeft;
		var ejectButtonWidth = LayoutMeasures.vcrEjectButtonWidth;
		var ejectButtonHeight = LayoutMeasures.vcrEjectButtonHeight;
		$(this.EjectButton).css("top", ejectButtonTop + "px");
		$(this.EjectButton).css("left", ejectButtonLeft + "px");
		$(this.EjectButton).css("min-width", ejectButtonWidth + "px");
		$(this.EjectButton).css("max-width", ejectButtonWidth + "px");
		$(this.EjectButton).css("min-height", ejectButtonHeight + "px");
		$(this.EjectButton).css("max-height", ejectButtonHeight + "px");

		var playButtonTop = LayoutMeasures.vcrPlayButtonTop;
		var playButtonLeft = LayoutMeasures.vcrPlayButtonLeft;
		var playButtonWidth = LayoutMeasures.vcrPlayButtonWidth;
		var playButtonHeight = LayoutMeasures.vcrPlayButtonHeight;
		$(this.PlayButton).css("top", playButtonTop + "px");
		$(this.PlayButton).css("left", playButtonLeft + "px");
		$(this.PlayButton).css("min-width", playButtonWidth + "px");
		$(this.PlayButton).css("max-width", playButtonWidth + "px");
		$(this.PlayButton).css("min-height", playButtonHeight + "px");
		$(this.PlayButton).css("max-height", playButtonHeight + "px");

		var stopButtonTop = LayoutMeasures.vcrStopButtonTop;
		var stopButtonLeft = LayoutMeasures.vcrStopButtonLeft;
		var stopButtonWidth = LayoutMeasures.vcrStopButtonWidth;
		var stopButtonHeight = LayoutMeasures.vcrStopButtonHeight;
		$(this.StopButton).css("top", stopButtonTop + "px");
		$(this.StopButton).css("left", stopButtonLeft + "px");
		$(this.StopButton).css("min-width", stopButtonWidth + "px");
		$(this.StopButton).css("max-width", stopButtonWidth + "px");
		$(this.StopButton).css("min-height", stopButtonHeight + "px");
		$(this.StopButton).css("max-height", stopButtonHeight + "px");

		var headTop = Math.round(DesignVcrHeadTop * CurrentRatio);
		var headLeft = Math.round(DesignVcrHeadLeft * CurrentRatio);
		var headWidth = Math.round(DesignVcrHeadWidth * CurrentRatio);
		var headHeight = Math.round(DesignVcrHeadHeight * CurrentRatio);
		$(".vcrHead").css("top", headTop + "px");
		$(".vcrHead").css("left", headLeft + "px");
		$(".vcrHead").css("min-width", headWidth + "px");
		$(".vcrHead").css("max-width", headWidth + "px");
		$(".vcrHead").css("min-height", headHeight + "px");
		$(".vcrHead").css("max-height", headHeight + "px");

		var coverTop = Math.round(DesignVcrCoverTop * CurrentRatio);
		var coverLeft = Math.round(DesignVcrCoverLeft * CurrentRatio);
		var coverWidth = Math.round(DesignVcrCoverWidth * CurrentRatio);
		var coverHeight = Math.round(DesignVcrCoverHeight * CurrentRatio);
		$(this.Cover).css("top", coverTop + "px");
		$(this.Cover).css("left", coverLeft + "px");
		$(this.Cover).css("min-width", coverWidth + "px");
		$(this.Cover).css("max-width", coverWidth + "px");
		$(this.Cover).css("min-height", coverHeight + "px");
		$(this.Cover).css("max-height", coverHeight + "px");

		var displayTop = Math.round(DesignVcrDisplayTop * CurrentRatio);
		var displayLeft = Math.round(DesignVcrDisplayLeft * CurrentRatio);
		var displayWidth = Math.round(DesignVcrDisplayWidth * CurrentRatio);
		var displayHeight = Math.round(DesignVcrDisplayHeight * CurrentRatio);
		$(this.Display).css("top", displayTop + "px");
		$(this.Display).css("left", displayLeft + "px");
		$(this.Display).css("min-width", displayWidth + "px");
		$(this.Display).css("max-width", displayWidth + "px");
		$(this.Display).css("min-height", displayHeight + "px");
		$(this.Display).css("max-height", displayHeight + "px");

		var displayDateTimeTop = Math.round(
			DesignVcrDisplayDateTimeTop * CurrentRatio
		);
		var displayDateTimeRight = Math.round(
			DesignVcrDisplayDateTimeRight * CurrentRatio
		);
		var displayDateTimeWidth = Math.round(
			DesignVcrDisplayDateTimeWidth * CurrentRatio
		);
		var displayDateTimeHeight = Math.round(
			DesignVcrDisplayDateTimeHeight * CurrentRatio
		);
		$(this.DisplayDateTime).css("top", displayDateTimeTop + "px");
		$(this.DisplayDateTime).css("right", displayDateTimeRight + "px");
		$(this.DisplayDateTime).css("min-width", displayDateTimeWidth + "px");
		$(this.DisplayDateTime).css("max-width", displayDateTimeWidth + "px");
		$(this.DisplayDateTime).css("min-height", displayDateTimeHeight + "px");
		$(this.DisplayDateTime).css("max-height", displayDateTimeHeight + "px");

		var displayInfoTop = Math.round(DesignVcrDisplayDateTimeTop * CurrentRatio);
		var displayInfoLeft = Math.round(DesignVcrDisplayInfoLeft * CurrentRatio);
		var displayInfoWidth = Math.round(DesignVcrDisplayInfoWidth * CurrentRatio);
		var displayInfoHeight = Math.round(
			DesignVcrDisplayInfoHeight * CurrentRatio
		);
		$(this.DisplayInfo).css("top", displayInfoTop + "px");
		$(this.DisplayInfo).css("left", displayInfoLeft + "px");
		$(this.DisplayInfo).css("min-width", displayInfoWidth + "px");
		$(this.DisplayInfo).css("max-width", displayInfoWidth + "px");
		$(this.DisplayInfo).css("min-height", displayInfoHeight + "px");
		$(this.DisplayInfo).css("max-height", displayInfoHeight + "px");
	}

	connectOutput(outputDev) {
		this.Signal.connectOutput(outputDev);
	}

	updateSignalVolume() {
		this.Signal.updateVolume();
	}

	updateSize() {
		this.Signal.updateSize();
	}

	printVcrInfos(infos) {
		infos.print(this.DisplayInfo);
	}

	printVcrInfo(vcrDisplayText, vcrSignalText) {
		$(this.DisplayInfo).text(vcrDisplayText);
		setTimeout(() => {
			if ($(this.DisplayInfo).text() == vcrDisplayText) {
				$(this.DisplayInfo).text("");
			}
		}, 5000);

		if (
			vcrSignalText !== null &&
			vcrSignalText !== undefined &&
			vcrSignalText.length > 0
		) {
			this.Signal.printText(vcrSignalText);
		}
	}

	initVhsTape() {
		if (!this.VhsTape.isInitRequired()) {
			if (this.VhsTape.CurrentMovieId == 1) {
				this.Signal.loadVhsMovie(this.VhsTape.Movie1.localPath);
			} else if (this.VhsTape.CurrentMovieId == 2) {
				this.Signal.loadVhsMovie(this.VhsTape.Movie2.localPath);
			}

			setTimeout(() => {
				this.Signal.setCurrentMovieTime(this.VhsTape.getCurrentMovieTime());
			}, 250);

			this.VhsInitiating = false;
			return;
		}

		this.VhsInitiating = true;

		if (this.VhsTape.Movie2 != null && this.VhsTape.Movie2.duration == 0) {
			if (this.VhsTape.CurrentMovieId != 2) {
				//console.log("Initializing movie 2...");
				this.Signal.loadVhsMovie(this.VhsTape.Movie2.localPath);
				this.VhsTape.CurrentMovieId = 2;
			}

			this.updateTapeDurations();
		} else if (this.VhsTape.Movie1.duration == 0) {
			//console.log("Initializing movie 1...");
			if (this.VhsTape.CurrentMovieId != 1) {
				this.Signal.loadVhsMovie(this.VhsTape.Movie1.localPath);
				this.VhsTape.CurrentMovieId = 1;
			}

			this.updateTapeDurations();
		}

		setTimeout(() => {
			this.Signal.setCurrentMovieTime(this.VhsTape.getCurrentMovieTime());
			this.initVhsTape();
		}, 250);
	}

	playNext() {
		if (!this.canPlayNext()) {
			return;
		}

		// stop
		// do forward
		// and after that perform play next

		this.VhsTimeTimer.stop();
		this.Signal.unloadVhsMovie();
		setTimeout(() => {
			this.Signal.loadVhsMovie(this.VhsTape.Movie2.localPath);
			this.VhsTape.CurrentMovieId = 2;

			setTimeout(() => {
				this.Signal.play();
				this.VhsTimeTimer.start();
			}, 750);
		}, 250);
	}

	playPrev() {
		if (!this.canPlayPrev()) {
			return;
		}

		// stop
		// do rewind
		// and after that perform play prev

		this.VhsTimeTimer.stop();
		this.Signal.unloadVhsMovie();
		setTimeout(() => {
			this.Signal.loadVhsMovie(this.VhsTape.Movie1.localPath);
			this.VhsTape.CurrentMovieId = 1;

			setTimeout(() => {
				this.Signal.play();
				this.VhsTimeTimer.start();
			}, 750);
		}, 250);
	}

	updateTapeDurations() {
		if (this.VhsTape == null || this.VhsTape.CurrentMovieId == 0) {
			return;
		}

		var duration = this.Signal.getCurrentMovieDuration();
		if (duration == 0) {
			return;
		}

		var width = this.Signal.getCurrentMovieWidth();
		var height = this.Signal.getCurrentMovieHeight();

		if (this.VhsTape.CurrentMovieId == 1 && this.VhsTape.Movie1.duration == 0) {
			this.VhsTape.Movie1.duration = duration;
			this.VhsTape.Movie1.updateSize(width, height);
			// console.log(
			// 	"Movie1 duration set to " +
			// 		duration +
			// 		" (" +
			// 		secondsToTimeString(duration) +
			// 		")"
			// );
			// console.log("Movie1 size set to " + width + "x" + height);
			// console.log(this.VhsTape.Movie1);
			//secondsToTimeString(duration);
		} else if (
			this.VhsTape.CurrentMovieId == 2 &&
			this.VhsTape.Movie2.duration == 0
		) {
			this.VhsTape.Movie2.duration = duration;
			this.VhsTape.Movie2.updateSize(width, height);
			// console.log(
			// 	"Movie2 duration set to " +
			// 		duration +
			// 		" (" +
			// 		secondsToTimeString(duration) +
			// 		")"
			// );
			// console.log("Movie2 size set to " + width + "x" + height);
			// console.log(this.VhsTape.Movie2);
		}
	}

	updateFullscreen() {
		this.Signal.updateSize();
	}

	// command actions
	power() {
		if (this.Settings.get("power").Value == 0) {
			this.Settings.set("power", 1);
			$("#playerVcrDisplay").addClass("on");
			$("#playerVcrPowerButton").addClass("on");
			this.Signal.activate();

			if (this.Parent.Tv.Settings.getValue("power") == 0) {
				this.Parent.Tv.power(false);
			}

			if (this.Parent.Tv.Settings.getValue("source") == 0) {
				this.Parent.Tv.toggleSource();
			}

			this.Signal.printOutputText("ON", 5000, 1000);
			if (this.VhsTape == null) {
				this.printVcrInfos(
					new TextInfos([
						new TextInfo("ON", 2000, 0),
						//new TextInfo("NO TAPE", 0, 1000),
					])
				);
				setTimeout(() => {
					this.Signal.printOutputText("NO TAPE");
				}, 3000);
			} else {
				// setTimeout(() => {
				this.printVcrInfos(
					new TextInfos([
						new TextInfo("ON", 2000, 0),
						new TextInfo("TAPE IN", 2000, 1000),
						new TextInfo("STOP", 0, 1000),
					])
				);
				setTimeout(() => {
					this.Signal.printOutputText("TAPE IN");
				}, 3000);
			}
		} else {
			this.stop();
			this.Settings.set("power", 0);
			$("#playerVcrDisplay").removeClass("on");
			$("#playerVcrPowerButton").removeClass("on");
			this.Signal.deactivate();
			this.printVcrInfos(
				new TextInfos([new TextInfo("OFF", 2000, 0)]),
				new TextInfos([new TextInfo("", 0, 1000)])
			);
			// this.printVcrInfos(new TextInfos([new TextInfo("", 0, 3000)]));

			// if (this.VhsTape == null) {
			// 	setTimeout(() => {
			// 		this.printVcrInfos(new TextInfos([new TextInfo("NO TAPE", 3000, 0)]));
			// 	}, 3100);
			// } else {
			// 	setTimeout(() => {
			// 		this.printVcrInfos(new TextInfos([new TextInfo("TAPE IN", 3000, 0)]));
			// 	}, 3100);
			// }

			setTimeout(() => {
				if (
					this.Parent.Tv.Settings.getValue("power") == 1 &&
					this.Parent.Tv.Settings.getValue("source") == 1
				) {
					this.Parent.Tv.toggleSource();
				}
			}, 1333);
		}
	}

	insertTape(tape) {
		if (this.VhsTape != null) {
			return;
		}

		$(tape.Container).addClass("vcrTapeReady");
		setTimeout(() => {
			$("#playerVcrCover").addClass("open");
			$(".shelf").removeClass("open");
			$(".shelfContainer").removeClass("open");
			if ($(this.Parent.Tv.Container).hasClass("onside")) {
				$(this.Parent.Tv.Container).removeClass("onside");
			}
			if ($(this.Parent.Vcr.Container).hasClass("onside")) {
				$(this.Parent.Vcr.Container).removeClass("onside");
			}

			$(tape.Container).removeClass("vcrTapeReady");
			$(tape.Container).addClass("vcrTapeOnRails");
		}, 999);
		setTimeout(() => {
			if (this.Settings.get("power").Value == 0) {
				this.power();
			} else if (this.Parent.Tv.Settings.getValue("power") == 0) {
				this.Parent.Tv.power(false);
			} else if (this.Parent.Tv.Settings.getValue("source") == 0) {
				this.Parent.Tv.toggleSource();
			}

			$(tape.Container).removeClass("vcrTapeOnRails");
			$(tape.Container).addClass("vcrTapeInside");

			var audio = document.getElementById("playerVcrSoundsAudio");
			audio.src = playerSounds.get("InsertTapeAudio").Path;
			audio.play();
		}, 2333);
		setTimeout(() => {
			$(tape.Container).removeClass("vcrTapeInside");
			$(tape.Container).addClass("vcrTapeLoaded");
		}, 3333);
		setTimeout(() => {
			$(tape.Container).removeClass("vcrTapeLoaded");
			$(tape.Container).addClass("vcrTapeClosed");
			$("#playerVcrCover").removeClass("open");
			$("#playerVcrEjectButton").removeClass("elementDisabled");

			this.VhsTape = tape;
			this.initVhsTape();
			// this.VhsTimeTimer.start();
			this.Signal.printOutputText("TAPE IN");
			this.printVcrInfos(
				new TextInfos([
					new TextInfo("TAPE IN", 3000, 0),
					new TextInfo("STOP", 0, 0),
				])
			);
			//this.printVcrInfos(new TextInfos([new TextInfo("STOP", 0, 3100)]));
		}, 3888);
		setTimeout(() => {}, 4333);
	}

	ejectTape() {
		if (this.Settings.get("power").Value == 0 || this.VhsTape == null) {
			return;
		}

		var startEjectDelay = 0;
		if (this.VhsPlaying) {
			startEjectDelay = 2000;
			this.stop();
		}

		var tape = this.VhsTape;
		this.VhsTape = null;
		//this.VhsTimeTimer.stop();
		$("#playerVcrEjectButton").addClass("elementPending");
		var audio = document.getElementById("playerVcrSoundsAudio");
		audio.src = playerSounds.getPath("EjectTapeAudio");

		setTimeout(() => {
			this.Signal.printOutputText("EJECT");
			this.printVcrInfos(new TextInfos([new TextInfo("EJECT", 3000, 333)]));
			$("#playerVcrCover").addClass("openEject");
			$(tape.Container).removeClass("vcrTapeClosed");
			$(tape.Container).addClass("vcrTapeLoaded");
			this.Signal.unloadVhsMovie();
		}, 666 + startEjectDelay);

		setTimeout(() => {
			$(tape.Container).removeClass("vcrTapeLoaded");
			$(tape.Container).addClass("vcrTapeInside");
			audio.play();
		}, 1666 + startEjectDelay);

		setTimeout(() => {
			$(tape.Container).removeClass("vcrTapeInside");
			$(tape.Container).addClass("vcrTapeOnRails");
			this.Signal.printText("NO TAPE");
		}, 2999 + startEjectDelay);

		setTimeout(() => {
			this.printVcrInfos(new TextInfos([new TextInfo("NO TAPE", 0, 12)]));
			$(tape.Container).removeClass("vcrTapeOnRails");
			$(tape.Container).addClass("readyToDrag");
			$(".shelfContainer").addClass("open");
			$(".shelf").addClass("open");
			if (!$(this.Parent.Tv.Container).hasClass("onside")) {
				$(this.Parent.Tv.Container).addClass("onside");
			}
			if (!$(this.Parent.Vcr.Container).hasClass("onside")) {
				$(this.Parent.Vcr.Container).addClass("onside");
			}
			//this.VhsTape = null;
		}, 4666 + startEjectDelay);

		setTimeout(() => {
			$("#playerVcrCover").removeClass("openEject");
		}, 4999 + startEjectDelay);
	}

	play() {
		if (!this.canPlay()) {
			return;
		}

		this.Signal.printOutputText("PLAY", 3000, 12);
		this.printVcrInfos(new TextInfos([new TextInfo("PLAY", 0, 0)]));
		$("#playerVcrPlayButton").addClass("active");

		if (this.VhsPlaying) {
			if (this.Settings.getValue("isSlow") == 1) {
				this.Settings.set("isSlow", 0);
				this.Signal.updatePlaybackRate(1);
			} else if (this.Settings.getValue("isPaused") == 1) {
				this.pause();
			} else if (this.Settings.getValue("isForward") == 1) {
				this.makeSound(soundVcrRewFwdStop);

				setTimeout(() => {
					this.Settings.set("isForward", 0);
					this.Signal.updatePlaybackRate(1);
					this.VhsTimeTimer.updateInterval(1000);
				}, 666);
			} else if (this.Settings.getValue("isRewind") == 1) {
				this.makeSound(soundVcrRewFwdStop);

				setTimeout(() => {
					this.Settings.set("isRewind", 0);
					this.Signal.updatePlaybackRate(1);
					this.VhsTimeTimer.updateInterval(1000);
				}, 666);
			}

			//this.resetActionSettings();
			return;
		}

		this.resetActionSettings();
		this.makeSound(soundVcrPlay);
		setTimeout(() => {
			// setTimeout(() => {
			// 	this.Signal.setCurrentMovieTime(this.VhsTape.Movie1.duration - 20);
			// }, 1000);

			this.Signal.play();
			this.VhsPlaying = true;
			this.Settings.set("isPlaying", 1);
			//this.animateTracking();
		}, 6333);
	}

	pause() {
		if (!this.canPerformPlayableAction()) {
			return;
		}

		//this.makeSound(soundVcrPause);
		if (this.Settings.getValue("isPaused") == 1) {
			$(this.PlayButton).removeClass("blinking").addClass("active");
			this.printVcrInfos(new TextInfos([new TextInfo("PLAY", 0, 0)]));
			this.Settings.set("isPaused", 0);
			//$("#SignalBottom").removeClass("active");
			this.Signal.play();
		} else {
			this.Signal.pause();
			this.Settings.set("isPaused", 1);
			//$("#SignalBottom").addClass("active");
			$(this.PlayButton).removeClass("active").addClass("blinking");
			this.printVcrInfos(new TextInfos([new TextInfo("PAUSE", 0, 0)]));
		}

		setTimeout(() => {}, 133);
	}

	stop() {
		if (this.Settings.get("power").Value == 0 || this.VhsTape == null) {
			return;
		}
		if (!this.VhsPlaying) {
			return;
		}

		this.Signal.printOutputText("STOP");
		this.printVcrInfos(new TextInfos([new TextInfo("STOP", 0, 0)]));
		var audio = document.getElementById("playerVcrSoundsAudio");
		this.makeSound(soundVcrStop);

		if (this.Settings.getValue("isSlow") == 1) {
			this.Settings.set("isSlow", 0);
			this.Signal.updatePlaybackRate(1);
			this.Signal.stop();
		} else if (this.Settings.getValue("isForward") == 1) {
			this.Settings.set("isForward", 0);
			audio.pause();
			setTimeout(() => {
				this.Signal.updatePlaybackRate(1);
				this.VhsTimeTimer.updateInterval(1000);
			}, 666);
		} else if (this.Settings.getValue("isFastForward") == 1) {
			this.Settings.set("isFastForward", 0);
			audio.pause();
			setTimeout(() => {
				this.Signal.updatePlaybackRate(1);
				this.VhsTimeTimer.updateInterval(1000);
			}, 666);
		} else {
		}

		setTimeout(() => {
			this.Signal.stop();
			this.VhsPlaying = false;
			this.Settings.set("isPlaying", 0);

			$(this.PlayButton).removeClass("active");
			$("#playerVcrPlayButtonIcon").removeClass("active");

			setTimeout(() => {
				this.resetActionSettings();
			}, 500);
		}, 333);
	}

	fastRewind() {
		if (this.Settings.get("power").Value == 0 || this.VhsTape == null) {
			return;
		}
		// if (this.Settings.getValue("isFastRewind") == 1) {
		// 	return;
		// }

		this.playPrev();
	}

	rewind() {
		if (this.Settings.get("power").Value == 0 || this.VhsTape == null) {
			return;
		}

		if (this.VhsTape.getCurrentTapeTime() == 0) {
			return;
		}

		if (this.Settings.getValue("isRewind") == 1) {
			this.Settings.set("isRewind", 0);
			this.VhsRewTimeTimer.stop();
			this.Signal.play();
		} else {
			this.Signal.pause();
			this.Settings.set("isRewind", 1);
			this.VhsRewTimeTimer.start();
		}
	}

	forward() {
		if (
			this.Settings.get("power").Value == 0 ||
			this.VhsTape == null ||
			this.VhsPlaying == false
		) {
			return;
		}

		if (this.Settings.getValue("isForward") == 1) {
			return;
		}

		this.resetActionSettings();
		var speed = this.Settings.getValue("rewFwdSpeed");

		// var startFwdAudio = document.getElementById(
		// 	"playerVcrStartRewFwdTapeAudio"
		// );

		// var fwdAudio = document.getElementById("playerVcrRewFwdTapeAudio");
		// fwdAudio.setAttribute("loop", "");

		// startFwdAudio.play();

		//this.makeSound(soundVcrRewFwd, true);

		setTimeout(() => {
			this.Signal.updatePlaybackRate(speed);
			this.VhsTimeTimer.updateInterval(1000 / speed);
			this.Settings.set("isForward", 1);
			this.printVcrInfos(new TextInfos([new TextInfo("FWD")]));
		}, 666);

		setTimeout(() => {
			//fwdAudio.play();
		}, 4200);
	}

	fastForward() {
		if (this.Settings.get("power").Value == 0 || this.VhsTape == null) {
			return;
		}
		// if (this.Settings.getValue("isFastForward") == 1) {
		// 	return;
		// }

		// this.resetActionSettings();
		// var speed = this.Settings.getValue("fastRewFwdSpeed");
		// this.Signal.updatePlaybackRate(speed);
		// this.VhsTimeTimer.updateInterval(1000 / speed);
		// this.Settings.set("isFastForward", 1);
		// this.printVcrInfos(new TextInfos([new TextInfo("F.FWD")]));
		// $(this.PlayButton).removeClass("active");
		// $(this.PlayButton).addClass("blinking");
		this.playNext();
	}

	toggleSlowMotion() {
		if (
			this.Settings.get("power").Value == 0 ||
			this.VhsTape == null ||
			!this.VhsPlaying
		) {
			return;
		}

		var isSlow = this.Settings.getValue("isSlow");
		var slowSpeed = this.Settings.getValue("slowSpeed");

		this.resetActionSettings();

		if (isSlow) {
			this.Signal.updatePlaybackRate(1);
			this.printVcrInfos(new TextInfos([new TextInfo("PLAY")]));
		} else {
			this.Settings.set("isSlow", 1);
			this.Signal.updatePlaybackRate(1 / slowSpeed);
			var speed = "X" + slowSpeed;
			if (speed.length == 2) {
				speed += ".0";
			}
			this.printVcrInfos(new TextInfos([new TextInfo("SLOW " + speed)]));
		}
	}

	slowMotionDown() {
		if (
			this.Settings.get("power").Value == 0 ||
			this.VhsTape == null ||
			!this.VhsPlaying
		) {
			return;
		}

		if (this.Settings.getValue("isSlow") == 0) {
			return;
		}

		var slowSpeed = this.Settings.get("slowSpeed");
		var newSpeed = slowSpeed.getValue() - 0.5;
		if (newSpeed < slowSpeed.getMin()) {
			newSpeed = slowSpeed.getMax();
		}

		this.Settings.set("slowSpeed", newSpeed);
		this.Signal.updatePlaybackRate(1 / newSpeed);
		var speed = "X" + slowSpeed.getValue();
		if (speed.length == 2) {
			speed += ".0";
		}
		this.printVcrInfos(new TextInfos([new TextInfo("SLOW " + speed)]));
	}

	slowMotionUp() {
		if (
			this.Settings.get("power").Value == 0 ||
			this.VhsTape == null ||
			!this.VhsPlaying
		) {
			return;
		}

		if (this.Settings.getValue("isSlow") == 0) {
			return;
		}

		var slowSpeed = this.Settings.get("slowSpeed");
		var newSpeed = slowSpeed.getValue() + 0.5;
		if (newSpeed > slowSpeed.getMax()) {
			newSpeed = slowSpeed.getMin();
		}

		this.Settings.set("slowSpeed", newSpeed);
		this.Signal.updatePlaybackRate(1 / newSpeed);
		var speed = "X" + slowSpeed.getValue();
		if (speed.length == 2) {
			speed += ".0";
		}
		this.printVcrInfos(new TextInfos([new TextInfo("SLOW " + speed)]));
	}

	isPerformingPlayableAction() {
		if (
			this.Settings.get("isPaused").Value == 1 ||
			this.Settings.get("isSlow").Value == 1 ||
			this.Settings.get("isFastForward").Value == 1 ||
			this.Settings.get("isForward").Value == 1 ||
			this.Settings.get("isRewind").Value == 1 ||
			this.Settings.get("isFastRewind").Value == 1
		) {
			return true;
		}

		return false;
	}

	canPerformTapeAction() {
		if (
			this.Settings.getValue("power") == 0 ||
			this.VhsTape == null ||
			this.VhsInitiating
		) {
			return false;
		}

		return true;
	}

	canPerformPlayableAction() {
		return this.canPerformTapeAction() && this.VhsPlaying;
	}

	canPlay() {
		if (this.isPerformingPlayableAction()) {
			return true;
		}

		return !this.VhsPlaying && this.canPerformTapeAction();
	}

	canPlayNext() {
		if (!this.canPerformTapeAction()) {
			return false;
		}

		return (
			this.VhsTape.CurrentMovieId == 1 && this.VhsTape.getMoviesCount() > 1
		);
	}

	canPlayPrev() {
		if (!this.canPerformTapeAction()) {
			return false;
		}

		return this.VhsTape.CurrentMovieId > 1;
	}

	resetActionSettings() {
		this.Settings.set("isPaused", 0);
		this.Settings.set("isSlow", 0);
		this.Settings.set("isForward", 0);
		this.Settings.set("isFastForward", 0);
		this.Settings.set("isRewind", 0);
		this.Settings.set("isFastRewind", 0);
	}

	resetActionSounds() {}

	autoTracking() {}

	trackingDown() {}

	trackingUp() {}

	animateTracking() {
		console.log("tracking");
		animateAutoTracking2();
		setTimeout(() => {
			this.animateTracking();
		}, 5000);
	}

	// Sounds
	makeSound(soundName, loop = false) {
		var audio = document.getElementById("playerVcrSoundsAudio");
		this.stopSound(audio);
		audio.src = playerSounds.getPath(soundName);
		// if (loop) {
		// 	audio.setAttribute("loop", "");
		// }
		audio.play();
	}

	stopSound(audio) {
		var currentSource = $(audio).attr("src");
		if (
			currentSource === null ||
			currentSource === undefined ||
			currentSource.length <= 0
		) {
			return;
		}

		if (audio.currentTime < audio.duration) {
			audio.pause();
		}
		audio.src = "";
	}

	// Events
	onDrop(sender, args) {
		if ($(args.Subject).attr("id") != "myPlayerVcr") {
			return;
		}

		var tape = this.Parent.Shelf.getTape(toInt($(sender).attr("id")));

		var vcrTapeTop = Math.round(DesignVcrTapeTop * getCurrentRatio());
		var vcrTapeLeft = Math.round(DesignVcrTapeLeft * getCurrentRatio());
		var vcrTapeWidth = Math.round(DesignVcrTapeWidth * getCurrentRatio());
		var vcrTapeHeight = Math.round(DesignVcrTapeHeight * getCurrentRatio());

		$(tape.Container).css("top", vcrTapeTop + "px");
		$(tape.Container).css("left", vcrTapeLeft + "px");
		$(tape.Container).css("min-width", vcrTapeWidth + "px");
		$(tape.Container).css("max-width", vcrTapeWidth + "px");
		$(tape.Container).css("min-height", vcrTapeHeight + "px");
		$(tape.Container).css("max-height", vcrTapeHeight + "px");
		$(tape.Container).removeClass("dragging");
		jQuery($(tape.Container)).appendTo(this.Container);

		this.insertTape(tape);
	}

	onCommand(sender, args) {
		if (args === null) {
			return;
		}

		switch (args.Subject) {
			case "vcrpower":
				this.power();
				break;
			case "eject":
				this.ejectTape();
				break;
			case "play":
				this.play();
				break;
			case "pause":
				this.pause();
				break;
			case "stop":
				this.stop();
				break;
			case "rewind":
				this.rewind();
				break;
			case "fastrewind":
				this.fastRewind();
				break;
			case "forward":
				this.forward();
				break;
			case "fastforward":
				this.fastForward();
				break;
			case "slowmo":
				this.toggleSlowMotion();
				break;
			case "slowmoup":
				this.slowMotionUp();
				break;
			case "slowmodown":
				this.slowMotionDown();
				break;
			default:
				console.log("unknown vcr command - " + args.Subject);
		}
	}

	onDateTimeTimerTick(sender, args) {
		if (this.Settings.get("power").Value == 1 && this.VhsTape != null) {
			return;
		}

		$(this.DisplayDateTime).text(dateToTimeString(new Date()));
	}

	onVhsTimeTimerTick(sender, args) {
		if (this.Settings.get("power").Value == 0 || this.VhsTape == null) {
			return;
		}

		if (this.VhsInitiating || this.VhsTape.isInitRequired()) {
			return;
		}

		if (this.Settings.get("isRewind").Value == 1) {
			return;
		}

		if (this.VhsPlaying) {
			var currentSignalTime = this.Signal.getCurrentMovieTime();
			this.VhsTape.setCurrentTapeTime(currentSignalTime);

			if (
				this.VhsTape.CurrentMovieId == 1 &&
				currentSignalTime > this.VhsTape.Movie1.duration - 2.5
			) {
				// switch to movie 2
				this.playNext();
			} else if (
				this.VhsTape.CurrentMovieId == 2 &&
				currentSignalTime > this.VhsTape.Movie2.duration - 2.5
			) {
				// stop and rewind?
				this.stop();
			}
		}
		$(this.DisplayDateTime).text(
			secondsToTimeString(this.VhsTape.getCurrentTapeTime())
		);
	}

	onVhsRewTimeTimerTick(sender, args) {
		if (this.Settings.get("power").Value == 0 || this.VhsTape == null) {
			return;
		}

		if (this.Settings.getValue("isRewind") == 0) {
			return;
		}

		var currentSignalTime = this.Signal.getCurrentMovieTime();
		currentSignalTime -= 1;
		if (currentSignalTime < 0) {
			currentSignalTime = 0;
		}

		this.Signal.setCurrentMovieTime(currentSignalTime);
		this.VhsTape.setCurrentTapeTime(currentSignalTime);
		$(this.DisplayDateTime).text(secondsToTimeString(this.VhsTape.CurrentTime));
	}

	onVhsFastRewFwdTimeTimerTick(sender, args) {
		if (this.Settings.get("power").Value == 0 || this.VhsTape == null) {
			return;
		}

		if (this.Settings.getValue("isRewind") == 0) {
			return;
		}

		var currentSignalTime = this.Signal.getCurrentMovieTime();
		currentSignalTime -= 1;
		if (currentSignalTime < 0) {
			currentSignalTime = 0;
		}

		this.Signal.setCurrentMovieTime(currentSignalTime);
		this.VhsTape.setCurrentTapeTime(currentSignalTime);
		$(this.DisplayDateTime).text(secondsToTimeString(this.VhsTape.CurrentTime));
	}
}
