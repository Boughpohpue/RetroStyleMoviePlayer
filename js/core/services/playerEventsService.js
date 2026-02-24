class PlayerEventsService {
	Events = [];
	addEvent(e) {
		this.Events.push(e);
	}
	raiseEvent(name, sender, args) {
		for (var i = 0; i < this.Events.length; i++) {
			if (this.Events[i].Name == name) {
				this.Events[i].raise(sender, args);
				break;
			}
		}
	}
	addEventListener(name, listener) {
		for (var i = 0; i < this.Events.length; i++) {
			if (this.Events[i].Name == name) {
				this.Events[i].addListener(listener);
				break;
			}
		}
	}
}

const playerEventsService = new PlayerEventsService();
