class SignalSource {
	Id = null;
	Name = null;
	Input = null;
	Output = null;
	Signals = [];
	CurrentSignalId = null;

	constructor(name) {
		this.Id = newGuid();
		this.Name = name;
	}

	addSignal(signal) {
		this.Signals.push(signal);
		this.CurrentSignalId = 0;
	}

	connectInput(device) {
		this.Input = device;
	}

	connectOutput(device) {
		this.Output = device;
	}
}

class SignalInput {}

class SignalOutput {}

class Antenna {
	Id = null;

	constructor() {
		this.Id = newGuid();
	}
}

class Vcr {
	Id = null;

	constructor() {
		this.Id = newGuid();
	}
}

class Tv {
	Id = null;

	constructor() {
		this.Id = newGuid();
	}
}

class Signal {
	Id = null;
	Name = null;
	Container = null;
	FilePath = "";

	constructor(id, parent, source) {
		this.Id = id;
		this.Name = parent.Id + "_" + id;
		this.FilePath = source;

		var $screen = $("<div>", {
			id: "SignalScreen_" + this.Name,
			class: "signalScreenVcr",
		});
		var $text = $("<div>", {
			id: "SignalText_" + this.Name,
			class: "signalText",
		});
		var $video = $("<video>", {
			id: "SignalVideo_" + this.Name,
			width: LayoutMeasures.tvScreenWidth,
			class: "signalVideo",
		});
		var $src = $("<source>", {
			id: "SignalVideoSource_" + this.Name,
			src: this.FilePath,
			type: "video/mp4",
		});
		$video.append($src);
		$screen.append($video);
		$screen.append($text);
		this.Container = $screen;
	}
}
