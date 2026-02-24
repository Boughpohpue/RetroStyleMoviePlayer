class TvAntennaChannelModel {
	Id = null;
	ParentId = null;
	ChannelSignal = null;

	constructor(parentId, channel) {
		this.Id = newGuid();
		this.ParentId = parentId;
		this.ChannelSignal = new TvSignalModel(this.Id, channel);
	}

	activate() {
		if (this.ChannelSignal == null) {
			return;
		}
		this.ChannelSignal.activate();
	}

	deactivate() {
		if (this.ChannelSignal == null) {
			return;
		}
		this.ChannelSignal.deactivate();
	}

	play() {
		if (this.ChannelSignal == null) {
			return;
		}
		this.ChannelSignal.play();
	}
	stop() {
		if (this.ChannelSignal == null) {
			return;
		}
		this.ChannelSignal.pause();
	}
}
