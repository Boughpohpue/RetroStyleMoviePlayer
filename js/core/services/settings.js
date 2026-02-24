class Settings {
	Settings = [];

	constructor() {}

	add(s) {
		this.Settings.push(s);
	}
	get(name) {
		for (var i = 0; i < this.Settings.length; i++) {
			if (this.Settings[i].Name == name) {
				return this.Settings[i];
			}
		}
		return null;
	}
	getValue(name) {
		for (var i = 0; i < this.Settings.length; i++) {
			if (this.Settings[i].Name == name) {
				return this.Settings[i].Value;
			}
		}
		return null;
	}
	set(name, val) {
		for (var i = 0; i < this.Settings.length; i++) {
			if (this.Settings[i].Name == name) {
				this.Settings[i].setValue(val);
			}
		}
	}
}
