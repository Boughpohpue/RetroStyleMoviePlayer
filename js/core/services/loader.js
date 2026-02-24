class ScriptLoader {
	constructor() {}

	loadHeadScript(url, type = "text/javascript", prefix = "   -> ") {
		console.log(prefix + url);
		var $head = document.getElementsByTagName("head")[0];
		$head.appendChild(this.createScript(url, type));
	}
	loadBodyScript(url, type = "text/javascript", prefix = "   -> ") {
		return this.loadHeadScript(url, type, prefix);

		console.log(prefix + url);
		var $body = document.getElementById("RetroPlayerBody");
		console.log($body);
		$body.appendChild(this.createScript(url, type));
	}

	createScript(url, type) {
		var script = document.createElement("script");
		script.type = type;
		script.src = url;
		script.async = false;

		script.onload = () => {
			console.log(url + " ok");
		};
		script.onerror = () => {
			console.log(url + " fail");
		};
		return script;
	}
}

const scriptLoader = new ScriptLoader();
