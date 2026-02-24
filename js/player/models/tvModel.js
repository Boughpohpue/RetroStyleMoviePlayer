class tvModel {
	Id = null;
	ParentId = null;
	Parent = null;
	Container = null;
	TvScreen = null;
	TrailerScreen = null;
	Antenna = null;
	IrdaLed = null;
	PowerLed = null;
	PowerButton = null;

	IsMutted = false;
	Settings = new SettingsContainer();
	Sources = ["TV", "AV"];
	Configs = ["volume", "contrast", "brightness", "saturation"];
	ConfigsAbbrvs = ["VOL", "CON", "BRI", "SAT"];
	ConfigClass = "";

	constructor(el, id, parent) {
		this.Id = newGuid();
		this.ParentId = id;
		this.Parent = parent;
		this.Container = el;

		this.Settings.add(new Setting("power", 0, 1, 0));
		this.Settings.add(new Setting("channel", 0, 255, 0));
		this.Settings.add(new Setting("fullscreen", 0, 1, 0));
		this.Settings.add(new Setting("muteon", 0, 1, 0));
		this.Settings.add(new Setting("mutevol", 0, 20, 3));
		this.Settings.add(new Setting("volume", 0, 20, 3));
		this.Settings.add(new Setting("contrast", 1, 20, 10));
		this.Settings.add(new Setting("brightness", 1, 20, 10));
		this.Settings.add(new Setting("saturation", 1, 20, 10));
		this.Settings.add(new Setting("source", 0, this.Sources.length - 1, 0));
		this.Settings.add(new Setting("config", 0, this.Configs.length - 1, 0));

		var $tv = $("<div>", {
			id: "playerTv",
			class: "tv",
		});
		this.PowerButton = $("<div>", {
			id: "playerTvPowerButton",
			class: "tvPowerButton",
			title: "POWER ON/OFF",
		});
		this.VolumeDownButton = $("<div>", {
			id: "playerTvVolumeDownButton",
			class: "tvVolumeDownButton",
			title: "VOLUME DOWN",
		});
		this.VolumeUpButton = $("<div>", {
			id: "playerTvVolumeUpButton",
			class: "tvVolumeUpButton",
			title: "VOLUME UP",
		});
		this.ChannelDownButton = $("<div>", {
			id: "playerTvChannelDownButton",
			class: "tvChannelDownButton",
			title: "CHANNEL DOWN",
		});
		this.ChannelUpButton = $("<div>", {
			id: "playerTvChannelUpButton",
			class: "tvChannelUpButton",
			title: "CHANNEL UP",
		});
		this.PowerLed = $("<div>", {
			id: "playerTvPowerLed",
			class: "tvPowerLed off",
		});
		this.IrdaLed = $("<div>", {
			id: "playerTvIrdaLed",
			class: "tvIrdaLed off",
		});
		$($tv).append(this.VolumeDownButton);
		$($tv).append(this.VolumeUpButton);
		$($tv).append(this.ChannelDownButton);
		$($tv).append(this.ChannelUpButton);
		$($tv).append(this.PowerButton);
		$($tv).append(this.PowerLed);
		$($tv).append(this.IrdaLed);

		$(this.Container).append($tv);

		this.TvScreen = new tvScreenModel(
			$(this.Container).find("#playerTv"),
			this.Id
		);

		this.Antenna = new TvAntennaModel(this);

		this.updateHeight();
	}

	updateHeight() {
		$(this.Container).css("min-width", LayoutMeasures.tvWidth + "px");
		$(this.Container).css("max-width", LayoutMeasures.tvWidth + "px");
		$(this.Container).css("min-height", LayoutMeasures.tvHeight + "px");
		$(this.Container).css("max-height", LayoutMeasures.tvHeight + "px");

		this.TvScreen.updateHeight();
	}

	getContainerWidth() {
		return $(this.Container).width();
	}

	loadChannels(channels) {
		this.Antenna.loadChannels(channels);
	}

	printText(t) {
		if (this.TvScreen == null) {
			return;
		}
		if (this.Settings.getValue("power") == 0) {
			return;
		}

		this.TvScreen.printText(t);
	}

	printOutputText(t, duration = 5000, delay = 1) {
		if (
			this.TvScreen == null ||
			this.Settings.getValue("power") == 0 ||
			this.Settings.getValue("source") == 0
		) {
			return;
		}

		this.TvScreen.printOutputText(t, duration, delay);
	}

	power(autoPlayAntenna = true) {
		//toggleSwitcherTV();

		if (this.Settings.getValue("power") == 0) {
			$(this.PowerLed).removeClass("off").addClass("on");

			setTimeout(() => {
				this.TvScreen.activate();
			}, 666);

			if (
				this.Settings.getValue("source") == 1 &&
				this.Parent.Vcr.Settings.getValue("power") == 1
			) {
				setTimeout(() => {
					if (this.Parent.Vcr.VhsPlaying) {
						this.Parent.Vcr.Signal.activate();
						this.applyConfig();
					}
				}, 1333);
			} else if (autoPlayAntenna) {
				setTimeout(() => {
					this.playAntenna();
					if (this.Settings.getValue("channel") == 0) {
						this.Antenna.channelRand();
						this.Settings.set("channel", this.Antenna.CurrentChannelId);
					} else {
						this.Antenna.changeChannel(this.Antenna.CurrentChannelId);
					}
					this.applyConfig();
				}, 1333);
			}

			setTimeout(() => {
				this.Settings.set("power", 1);
			}, 1666);
		} else {
			this.stopAntenna();
			this.Parent.Vcr.Signal.deactivate();
			setTimeout(() => {
				this.TvScreen.deactivate();
			}, 333);

			setTimeout(() => {
				$(this.PowerLed).removeClass("on").addClass("off");
			}, 666);

			this.Settings.set("power", 0);
		}
	}

	toggleSource() {
		if (this.Settings.getValue("power") == 0) {
			return;
		}

		var src = this.Settings.get("source");
		var newSrcId = src.getValue() + 1;
		if (newSrcId > src.getMax()) {
			newSrcId = src.getMin();
		}

		this.Settings.set("source", newSrcId);
		setTimeout(() => {
			this.printText(this.Sources[newSrcId]);
		}, 444);

		if (newSrcId == 0) {
			this.Parent.Vcr.Signal.deactivate();
			setTimeout(() => {
				this.playAntenna(true);
			}, 333);
		} else if (newSrcId == 1) {
			this.stopAntenna();
			setTimeout(() => {
				this.Parent.Vcr.Signal.activate();
			}, 999);
			setTimeout(() => {
				this.printText(this.Sources[newSrcId]);
			}, 999);
		}
	}

	channelUp() {
		if (this.Settings.getValue("power") == 0) {
			return;
		}

		this.Antenna.channelUp();
		this.Settings.set("channel", this.Antenna.CurrentChannelId);
	}
	channelDown() {
		if (this.Settings.getValue("power") == 0) {
			return;
		}

		this.Antenna.channelDown();
		this.Settings.set("channel", this.Antenna.CurrentChannelId);
	}

	updateSignalVolume() {
		if (this.Settings.getValue("source") == 0) {
			this.Antenna.updateSignalVolume();
		} else if (this.Settings.getValue("source") == 1) {
			this.Parent.Vcr.updateSignalVolume();
		}
	}

	mute() {
		var isMuted = this.Settings.getValue("muteon");
		if (isMuted == 1) {
			var vol = this.Settings.getValue("mutevol");
			this.Settings.set("volume", vol);
			this.Settings.set("muteon", 0);
			this.printText("VOL " + this.Settings.getValue("volume"));
		} else {
			var vol = this.Settings.getValue("volume");
			this.Settings.set("mutevol", vol);
			this.Settings.set("volume", 0);
			this.Settings.set("muteon", 1);
			this.printText("MUTE");
		}

		this.updateSignalVolume();
	}

	volumeUp() {
		if (this.Settings.getValue("power") == 0) {
			return;
		}

		if (this.Settings.getValue("muteon")) {
			var cur = this.Settings.get("mutevol");
			var newVol = cur.getValue() + 1;
			if (newVol <= cur.getMax()) {
				this.Settings.set("mutevol", newVol);
			}
			this.printText("MUTE " + this.Settings.getValue("mutevol"));
		} else {
			var cur = this.Settings.get("volume");
			var newVol = cur.getValue() + 1;
			if (newVol <= cur.getMax()) {
				this.Settings.set("volume", newVol);
			}
			this.printText("VOL " + this.Settings.getValue("volume"));
			this.updateSignalVolume();
		}
	}

	volumeDown() {
		if (this.Settings.getValue("power") == 0) {
			return;
		}
		if (this.Settings.getValue("muteon")) {
			var cur = this.Settings.get("mutevol");
			var newVol = cur.getValue() - 1;
			if (newVol > cur.getMin()) {
				this.Settings.set("mutevol", newVol);
			}
			this.printText("MUTE " + this.Settings.getValue("mutevol"));
		} else {
			var cur = this.Settings.get("volume");
			var newVol = cur.getValue() - 1;
			if (newVol > cur.getMin()) {
				this.Settings.set("volume", newVol);
			}
			this.printText("VOL " + this.Settings.getValue("volume"));
			this.updateSignalVolume();
		}
	}

	toggleConfigs() {
		if (this.Settings.getValue("power") == 0) {
			return;
		}

		var config = this.Settings.get("config");
		var newVal = config.getValue() + 1;
		if (newVal > config.getMax()) {
			newVal = config.getMin();
			newVal++;
		}
		this.Settings.set("config", newVal);
		this.printText(this.getCurrentConfigPrint());
	}

	configUp() {
		if (this.Settings.getValue("power") == 0) {
			return;
		}

		var cfgId = this.Settings.getValue("config");
		var config = this.Settings.get(this.Configs[cfgId]);
		if (config.getValue() < config.getMax()) {
			this.Settings.set(this.Configs[cfgId], config.getValue() + 1);
		}

		this.printText(this.getCurrentConfigPrint());
		this.applyConfig();
	}

	configDown() {
		if (this.Settings.getValue("power") == 0) {
			return;
		}

		var cfgId = this.Settings.getValue("config");
		var config = this.Settings.get(this.Configs[cfgId]);
		if (config.getValue() > config.getMin()) {
			this.Settings.set(this.Configs[cfgId], config.getValue() - 1);
		}

		this.printText(this.getCurrentConfigPrint());
		this.applyConfig();
	}

	configsDefaults() {
		if (this.Settings.getValue("power") == 0) {
			return;
		}

		var cfg = this.Settings.get("config");
		for (var i = 0; i <= this.Configs.length; i++) {
			this.Settings.set(this.Configs[i], 10);
		}
		this.applyConfig();
		this.printText(this.getCurrentConfigPrint());
	}

	toggleFullscreen() {
		if (this.Settings.getValue("power") == 0) {
			return;
		}

		var className = `myScreenFullScale`;
		if (this.Settings.getValue("fullscreen") == 1) {
			if ($(this.Container).hasClass("fullscreen")) {
				$(this.Container).removeClass("fullscreen");
			}

			// $("#tvScreen").removeClass(className);
			$("#myPlayerVcr").removeClass("hidden");
			$("#myPlayerShelf").removeClass("hidden");
			this.Settings.set("fullscreen", 0);
			fullScreenOff(document.body);
			isFullscreenOn = false;

			// $("#SignalVideo").addClass("fs");

			return;
		}

		isFullscreenOn = true;

		var bodyWidth = $(document.body).width();
		var bodyHeight = $(document.body).height();
		var screenWidth = $("#tvScreen").width();
		var screenHeight = $("#tvScreen").height();
		var ratio = 1;
		var scale = "";
		if (this.Antenna.Playing) {
			var chnnl = this.Antenna.CurrentChannelId;
			screenWidth = $("#SignalScreen_" + chnnl).width();
			screenHeight = $("#SignalScreen_" + chnnl).height();

			console.log(screenWidth + " x " + screenHeight);

			var ratioW = bodyWidth / screenWidth;
			var ratioH = bodyHeight / screenHeight;

			ratio = ratioH;
			if (ratioH > ratioW) {
				ratio = ratioW;
			}
			scale = " scale(" + ratio + ", " + ratio + ")";

			this.Antenna.updateSize();
		} else {
			screenWidth = $("#SignalScreen").width();
			screenHeight = $("#SignalScreen").height();

			console.log(screenWidth + " x " + screenHeight);

			// this should be reworked!!!
			var ratioW = bodyWidth / screenWidth;
			var ratioH = bodyHeight / screenHeight;
			scale = " scale(" + ratioW + ", " + ratioH + ")";
			this.Parent.Vcr.updateSize();

			// $("#SignalVideo").addClass("fs");
		}

		var translate = " translate(0, 15%)"; // ??? why?
		var classBody = "." + className + " { ";
		classBody += " transform: " + scale + translate + ";";
		classBody += " }";

		fullScreenOn(document.body);
		// createCustomCssClass(className, classBody);
		// $("#tvScreen").addClass(className);
		$("#myPlayerVcr").addClass("hidden");
		$("#myPlayerShelf").addClass("hidden");
		if ($(this.Container).hasClass("onside")) {
			$(this.Container).addClass("fullscreen");
		}
		this.Settings.set("fullscreen", 1);
	}

	getCurrentConfigPrint() {
		var cfg = this.Settings.getValue("config");
		var abrev = this.ConfigsAbbrvs[cfg];
		var value = this.Settings.getValue(this.Configs[cfg]);
		return abrev + " " + value;
	}

	applyConfig() {
		var contrast = this.Settings.getValue("contrast");
		var brightness = this.Settings.getValue("brightness");
		var saturation = this.Settings.getValue("saturation");
		var contrastFilter = "contrast(" + contrast * 0.1 + ")";
		var brightnessFilter = "brightness(" + brightness * 0.1 + ")";
		var saturationFilter = "saturate(" + saturation * 0.1 + ")";
		var filters = `${contrastFilter} ${brightnessFilter} ${saturationFilter};`;
		var className = `screen_filter_con${contrast}_bri${brightness}_sat${saturation}`;

		var classBody = "." + className + " { ";
		classBody += "  -webkit-filter: " + filters;
		//classBody += "  filter: " + filters;
		//classBody += "  -moz-filter: " + filters;
		//classBody += "  -o-filter: " + filters;
		//classBody += "  -ms-filter: " + filters;
		classBody += "}";

		createCustomCssClass(className, classBody);

		if (this.ConfigClass != "") {
			$("#tvScreen").removeClass(this.ConfigClass);
		}
		this.ConfigClass = className;
		$("#tvScreen").addClass(this.ConfigClass);
	}

	playAntenna(showChannelId = false) {
		if (this.Settings.getValue("power") == 0) {
			return;
		}
		this.Settings.set("source", 0);
		this.Antenna.play(showChannelId);
	}
	stopAntenna() {
		if (this.Settings.getValue("power") == 0) {
			return;
		}
		//this.Settings.set("source", 1);
		this.Antenna.stop();
	}

	getScreenWidth() {
		return this.TvScreen.getWidth();
	}
	getScreenHeight() {
		return this.TvScreen.getHeight();
	}

	onCommand(sender, args) {
		if (args === null) {
			return;
		}

		switch (args.Subject) {
			case "tvpower":
				this.power();
				break;

			case "source":
				this.toggleSource();
				break;

			case "mute":
				this.mute();
				break;

			case "volumeup":
				this.volumeUp();
				break;

			case "volumedown":
				this.volumeDown();
				break;

			case "channelup":
				this.channelUp();
				break;

			case "channeldown":
				this.channelDown();
				break;

			case "toggleconfigs":
				this.toggleConfigs();
				break;

			case "configup":
				this.configUp();
				break;

			case "configdown":
				this.configDown();
				break;

			case "configsdefault":
				this.configsDefaults();
				break;

			case "fullscreen":
				this.toggleFullscreen();
				break;

			default:
				console.log("unknown tv command - " + args.Subject);
		}
	}
}
