class PlayerTimer {
	Interval = 1000;
	IsEnabled = false;
	TickEventName = "_tickEventName";

	constructor(interval, tickEventName) {
		this.Interval = interval;
		this.TickEventName = tickEventName;
	}

	start() {
		if (this.IsEnabled) {
			return;
		}
		this.IsEnabled = true;
		this.tick();
	}

	stop() {
		this.IsEnabled = false;
	}

	updateInterval(i) {
		this.Interval = i;
	}

	tick() {
		if (!this.IsEnabled) {
			return;
		}

		playerEventsService.raiseEvent(this.TickEventName, this, new PlayerEventArgs(""));

		setTimeout(() => {
			this.tick();
		}, this.Interval);
	}
}
