class Setting {
	Name = "_setting_name";
	Value;
	Minimum;
	Maximum;

	constructor(n, min, max, v) {
		this.Name = n;
		this.Minimum = min;
		this.Maximum = max;
		this.Value = min;
		this.setValue(v);
	}
	getMin() {
		return this.Minimum;
	}
	getMax() {
		return this.Maximum;
	}
	getValue() {
		return this.Value;
	}
	setValue(v) {
		if (v < this.Minimum || v > this.Maximum) {
			return;
		}
		this.Value = v;
	}
}

class SettingsContainer {
	Settings = [];

	constructor() {}
	add(s) {
		this.Settings.push(s);
	}
	get(n) {
		for (var i = 0; i < this.Settings.length; i++) {
			if (this.Settings[i].Name == n) {
				return this.Settings[i];
			}
		}
		return null;
	}
	getValue(n) {
		for (var i = 0; i < this.Settings.length; i++) {
			if (this.Settings[i].Name == n) {
				return this.Settings[i].Value;
			}
		}
		return null;
	}
	set(n, v) {
		for (var i = 0; i < this.Settings.length; i++) {
			if (this.Settings[i].Name == n) {
				if (v < this.Settings[i].MinValue || v > this.Settings[i].MaxValue) {
					return;
				}
				this.Settings[i].setValue(v);
			}
		}
	}
}
