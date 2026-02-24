class Event {
	Name = null;
	Listeners = [];

	constructor(name) {
		this.Name = name;
	}

	addListener(listener) {
		this.Listeners.push(listener);
	}
	raise(sender, args) {
		for (var i = 0; i < this.Listeners.length; i++) {
			this.Listeners[i](sender, args);
		}
	}
}
