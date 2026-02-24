class AjaxService {
	EventsService = null;

	mdbUrl = "http://infertus.pl/mdbv8_a1/api/query";
	movieUrl = `${this.mdbUrl}/movies/getbymdbid.php?im=me&mdbId=`;

	constructor() {}

	applyEventsService(eventsService) {
		this.EventsService = eventsService;
		this.EventsService.addEvent(new Event(ajaxRequestFailed));
		this.EventsService.addEvent(new Event(ajaxResponseReceived));
	}

	sendGetRequest(url) {
		$.ajax({
			url: url,
			success: function (response) {
				console.log(this);
				responseReceived(response);
			},
			error: function (response) {
				requestFailed(response);
			},
		});
	}
	sendGetMovieRequest(mdbid) {
		$.ajax({
			url: this.movieUrl + mdbid,
			success: function (response) {
				console.log(this);
				responseReceived(response);
			},
			error: function (response) {
				requestFailed(response);
			},
		});
	}
}

const ajaxService = new AjaxService();
ajaxService.applyEventsService(eventsService);

function responseReceived(response) {
	//localStorageService.setItem(e.EventData.mdbId, JSON.stringify(e.EventData), 1);

	eventsService.raiseEvent(
		ajaxResponseReceived,
		ajaxService,
		new EventArgs(response)
	);
}
function requestFailed(response) {
	eventsService.raiseEvent(
		ajaxRequestFailed,
		ajaxService,
		new EventArgs(response)
	);
}
