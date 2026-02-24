class MyBrowser {
	isOpera = false;
	isFirefox = false;
	isSafari = false;
	isIE = false;
	isEdge = false;
	isChrome = false;
	isBlink = false;

	constructor() {
		// Opera 8.0+ (UA detection to detect Blink/v8-powered Opera)
		this.isOpera = !!window.opera || navigator.userAgent.indexOf(" OPR/") >= 0;
		// Firefox 1.0+
		this.isFirefox = typeof InstallTrigger !== "undefined";
		// Safari 3.0+
		this.isSafari =
			/constructor/i.test(window.HTMLElement) ||
			(function (p) {
				return p.toString() === "[object SafariRemoteNotification]";
			})(!window["safari"] || safari.pushNotification);
		// Internet Explorer 6-11
		this.isIE = /*@cc_on!@*/ false || !!document.documentMode;
		// Edge 20+
		this.isEdge = !this.isIE && !!window.StyleMedia;
		// Chrome 1+
		this.isChrome = !!window.chrome && !!window.chrome.webstore;
		// Blink engine detection
		this.isBlink = (this.isChrome || this.isOpera) && !!window.CSS;
	}

	getName() {
		if (this.isOpera) {
			return "Opera";
		} else if (this.isSafari) {
			return "Safari";
		} else if (this.isFirefox) {
			return "Firefox";
		} else if (this.isIE) {
			return "IE";
		} else if (this.isEdge) {
			return "Edge";
		} else if (this.isChrome) {
			return "Chrome";
		} else {
			return "Unknown";
		}
	}
}
