class TvAntennaModel {
	Id = null;
	ParentId = null;
	Channels = [];
	CurrentChannelId;
	OutputDevice = null;
	Playing = false;
	Init = true;

	constructor(parent) {
		this.Id = newGuid();
		this.ParentId = parent.Id;
		this.OutputDevice = parent;
	}

	loadChannels(channels) {
		this.Channels = [];
		for (var i = 0; i < channels.length; i++) {
			this.Channels.push(new TvAntennaChannelModel(this.Id, channels[i]));
			this.Channels[i].ChannelSignal.connectOutput(this.OutputDevice);
		}

		this.CurrentChannelId = 0;

		console.log("TV antenna loaded ok!");
	}

	channelUp() {
		if (this.Channels == null || this.Channels.length == 0) {
			return;
		}

		var newChannel = this.CurrentChannelId + 1;
		if (newChannel >= this.Channels.length) {
			newChannel = 0;
		}
		this.changeChannel(newChannel);
	}

	channelDown() {
		if (this.Channels == null || this.Channels.length == 0) {
			return;
		}

		var newChannel = this.CurrentChannelId - 1;
		if (newChannel < 0) {
			newChannel = this.Channels.length - 1;
		}
		this.changeChannel(newChannel);
	}

	channelRand() {
		if (this.Channels == null || this.Channels.length == 0) {
			return;
		}

		var newChannel = getRandomInt(1, this.Channels.length - 1);
		this.changeChannel(newChannel);
	}

	changeChannel(newChannel) {
		this.Channels[this.CurrentChannelId].deactivate();
		this.Channels[0].activate();
		setTimeout(() => {
			this.CurrentChannelId = newChannel;
			this.Channels[0].deactivate();
			this.play();
			this.OutputDevice.printText("CH " + this.CurrentChannelId);
		}, 500);
	}

	play(showChannelId = false) {
		if (this.Playing) {
			//return;
		}

		this.Playing = true;
		this.Channels[this.CurrentChannelId].ChannelSignal.play();
		this.Channels[this.CurrentChannelId].activate();
		this.updateSignalVolume();

		if (showChannelId) {
			this.OutputDevice.printText("CH " + this.CurrentChannelId);
		}
	}

	stop() {
		if (!this.Playing) {
			return;
		}

		for (var i = 0; i < this.Channels.length; i++) {
			this.Channels[i].deactivate();
		}
		this.Playing = false;
		setTimeout(() => {
			//this.OutputDevice.printText("NO SIGNAL");
		}, 333);
	}

	updateSignalVolume() {
		this.Channels[this.CurrentChannelId].ChannelSignal.updateVolume();
	}

	updateSize() {
		this.Channels[this.CurrentChannelId].ChannelSignal.updateSize();
	}
}
