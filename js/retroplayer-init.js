(function () {
	var injectScript = function (targetContainerElement, path, fireLoaded) {
		var script = document.createElement("script");
		script.src = path;
		script.type = "text/javascript";
		if (fireLoaded) {
			script.onreadystatechange = onLoadOrReady;
			script.onload = onLoadOrReady;
		}
		targetContainerElement.appendChild(script);
	};
	var injectScripts = function (targetContainerElement, scripts) {
		for (var i = 0; i < scripts.length; i++) {
			injectScript(targetContainerElement, scripts[i], false);
		}
	};
	var injectStyle = function (headElement, path) {
		var style = document.createElement("link");
		style.href = path;
		style.rel = "stylesheet";
		headElement.appendChild(style);
	};
	var injectStyles = function (styles) {
		var head = document.getElementsByTagName("head")[0];
		for (var i = 0; i < styles.length; i++) {
			injectStyle(head, styles[i]);
		}
	};

	var onLoadOrReady = function () {
		setTimeout(() => {
			// var rp = document.getElementsByTagName("retro-player")[0];
			// if (rp === undefined || rp === null) {
			// 	return;
			// }

			injectStyles([
				"css/fonts.css",
				"css/main.css",
				"css/effects.css",
				"css/layers.css",
				"css/tv.css",
				"css/vcr.css",
				"css/signal.css",
				"css/remote.css",
				"css/vhs.css",
				"css/shelf.css",
			]);

			injectScripts(document.getElementsByTagName("head")[0], [
				"js/core/helpers/text.js",
				"js/core/helpers/guid.js",
				"js/core/helpers/math.js",
				"js/core/helpers/geometry.js",
				"js/core/helpers/datetime.js",
				"js/core/helpers/cursor.js",
				"js/core/helpers/low.js",
				"js/core/models/bounds.js",
				"js/core/models/browser.js",
				"js/core/models/playerEventArgs.js",
				"js/core/models/playerEvent.js",
				"js/core/models/event.js",
				"js/core/models/events.js",
				"js/core/services/dragger.js",
				"js/core/services/playerEventsService.js",
				"js/core/services/eventsService.js",
				"js/core/services/storageService.js",
				"js/core/services/ajaxService.js",
				"js/player/design/layout.js",
				"js/player/design/layoutMeasures.js",
				"js/player/fx/effects.js",
				"js/player/models/settingsModel.js",
				"js/player/models/elementBoundsModel.js",
				"js/player/models/textInfo.js",
				"js/player/models/playerTimer.js",
				"js/player/models/soundModel.js",
				"js/player/models/vhsMovieModel.js",
				"js/player/models/vhsTapeModel.js",
				"js/player/models/vhsShelfModel.js",
				"js/player/models/signalModel.js",
				"js/player/models/vcrModel.js",
				"js/player/models/channelModel.js",
				"js/player/models/tvSignalModel.js",
				"js/player/models/tvAntennaChannelModel.js",
				"js/player/models/tvAntennaModel.js",
				"js/player/models/tvScreenModel.js",
				"js/player/models/tvModel.js",
				"js/player/models/remoteControllerModel.js",
				"js/player/models/playerModel.js",
				"js/player/lib/channels.js",
				"js/player/lib/collection2.js",
				"js/player/lib/sounds.js",
			]);

			injectScripts(document.getElementsByTagName("body")[0], [
				"js/player/handlers/documentInitHandler.js",
				"js/player/handlers/documentReadyHandler.js",
				"js/player/handlers/signalHandler.js",
				"js/player/handlers/vhsHandler.js",
				"js/player/handlers/tvHandler.js",
				"js/player/handlers/vcrHandler.js",
				"js/player/handlers/shelfHandler.js",
				"js/player/handlers/remoteHandler.js",
			]);
		}, 333);
	};

	//onLoadOrReady();

	injectScript(
		document.getElementsByTagName("head")[0],
		"lib/jQuery/jquery-3.6.4.min.js",
		true
	);
})();
