class soundModel {
	Name = "_name";
	Path = "_path";

	constructor(name, path) {
		this.Name = name;
		this.Path = path;
	}
}

class soundsContainer {
	Items = [];

	constructor(items) {
		for (var i = 0; i < items.length; i++) {
			this.Items[items[i].Name] = items[i];
		}
	}

	add(item) {
		this.Items[item.Name] = item;
	}

	get(name) {
		return this.Items[name];
	}

	getPath(name) {
		return this.Items[name].Path;
	}
}
