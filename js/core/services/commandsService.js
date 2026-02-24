class CommandsService {
	Id = null;	
	Listeners = [];

	constructor() {
		this.Id = Guid.newGuid();
		this.setupEventsService();
	}

	setupEventsService() {
		eventsService.addEvent(new Event(commandRequested));
		eventsService.addEvent(new Event(commandRequestDelivered));
		eventsService.addEvent(new Event(commandRequestExecuted));
		eventsService.addEventListener(commandRequested, (s, e) => {
			onCommandRequested(s, e);
		});
		eventsService.addEventListener(commandRequestDelivered, (s, e) => {
			onCommandRequestDelivered(s, e);
		});
		eventsService.addEventListener(commandRequestExecuted, (s, e) => {
			onRequestedCommandExecuted(s, e);
		});				
	}

	onCommandRequested(s, e) {

	}

	forwardCommandRequest() {

	}

	onCommandRequestDelivered(s, e) {

	}

	notifyCommandRequestDelivered() {

	}

	onRequestedCommandExecuted(s, e) {

	}

	notifyRequestedCommandExecuted() {

	}
}

const commandsService = new CommandsService();
