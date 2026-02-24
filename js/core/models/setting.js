class Setting {
	Name = "_setting_name";
	Value;
	Minimum;
	Maximum;

	constructor(name, val, min = null, max = null) {
		this.Name = name;
		this.Minimum = min;
		this.Maximum = max;
		this.Value = min;
		this.setValue(val);
	}
	getValue() {
		return this.Value;
	}
	setValue(val) {
		if (
			(this.Minimum != null && val < this.Minimum) ||
			(this.Maximum != null && val > this.Maximum)
		) {
			return;
		}
		this.Value = val;
	}
}
