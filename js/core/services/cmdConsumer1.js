class CmdConsumer1 {
	Id = null;
	Name = null;

	constructor(name) {
		this.Id = newGuid();
		this.Name = name;
	}

	setupEventsService() {}

	executeCommand() {}

	onCommandRequestReceived(s, e) {}

	notifyRequestDelivered() {}

	sendCommandRequest() {}
}

const cmdc1 = new CmdConsumer1("Consumer 1");
