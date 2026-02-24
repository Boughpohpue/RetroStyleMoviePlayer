const _timerServiceEventName = "timerTick";
class Timer {
	Id = null;
	Interval = 0;
	EventName = null;
	EventsService = null;
	IsEnalbed = false;

	constructor(eventName, interval = 1000) {
		this.Id = Guid.newGuid();
		this.Interval = interval;
		this.EventName = eventName;
	}

	applyEventsService(eventsService) {
		this.EventsService = eventsService;
		this.EventsService.addEvent(new Event("timerTick"));
		this.EventsService.addEventListener("timerTick", (s, e) => {
			onTimerTick(s, e);
		});
	}

	start() {
		if (this.IsEnabled) {
			return;
		}

		this.IsEnalbed = true;
		this.tick();
	}
	stop() {
		this.IsEnalbed = false;
	}
	tick() {
		if (!this.IsEnalbed) {
			if (this.Interval == 0) {
				this.IsEnalbed = false;
			}
			return;
		}

		this.EventsService.raiseEvent(
			"timerTick",
			this,
			new EventArgs(new Date().toTimeString().substring(0, 8))
		);

		setTimeout(() => {
			this.tick();
		}, this.Interval);
	}
}

const timer = new Timer();
timer.applyEventsService(eventsService);
