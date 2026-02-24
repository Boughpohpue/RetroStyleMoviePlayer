class playerModel {
	Id = null;
	Tv = null;
	Vcr = null;
	Shelf = null;
	Remote = null;
	Poster = null;
	Name = "[VHS] Retro PLAYER";

	constructor(tv, vcr, shelf, remote, poster) {
		this.Id = newGuid();
		this.Tv = new tvModel(tv, this.Id, this);
		this.Vcr = new vcrModel(vcr, this.Id, this);
		this.Remote = new remoteControllerModel(remote, this.Id, this);
		this.Shelf = new vhsShelfModel(shelf, this.Id, this);
		this.Poster = poster;

		console.log("Player constructed!");
	}

	assembly() {
		this.Vcr.connectOutput(this.Tv);
		this.updateHeight();
		console.log("Player assembly ok!");
	}

	loadChannels(channels) {
		this.Tv.loadChannels(channels);
	}

	loadTapes(tapes, localized = false) {
		this.Shelf.loadTapes(tapes, localized);
	}

	loadTapesFromData(data, localized = false) {
		this.Shelf.loadTapesFromData(data, localized);
	}

	show() {
		$(this.Tv.Container).css("display", "block");
		$(this.Vcr.Container).css("display", "block");
		$(this.Shelf.Container).css("display", "block");
		$(this.Remote.Container).css("display", "block");
	}
	hide() {
		$(this.Tv.Container).css("display", "none");
		$(this.Vcr.Container).css("display", "none");
		$(this.Shelf.Container).css("display", "none");
		$(this.Remote.Container).css("display", "none");
	}

	updateSize() {
		this.hide();

		// heights
		this.Tv.updateHeight();
		this.Vcr.updateHeight();
		this.Shelf.updateHeight();

		// widths

		this.show();
	}

	updateHeight() {
		this.updateSize();
	}

	updateWidth() {
		this.updateSize();
	}

	getTvScreenWidth() {
		return this.Tv.getScreenWidth();
	}
	getTvScreenHeight() {
		return this.Tv.getScreenHeight();
	}
}
