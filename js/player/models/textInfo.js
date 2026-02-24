class TextInfo {
	Text;
	Delay;
	Duration;

	constructor(text, duration, delay) {
		this.Text = text;
		this.Delay = delay;
		this.Duration = duration;
	}
}

class TextInfos {
	Infos = [];

	constructor(infos) {
		this.Infos = infos.reverse();
	}

	print(displayElement) {
		if (
			this.Infos === null ||
			this.Infos === undefined ||
			this.Infos.length == 0
		) {
			return;
		}

		var info = this.Infos.pop();

		var delay = info.Delay;
		if (delay == 0) {
			delay = 33;
		}

		setTimeout(() => {
			$(displayElement).text(info.Text);
			//console.log(info.Duration);
			if (info.Duration > 0) {
				setTimeout(() => {
					this.print(displayElement);
				}, info.Duration);
			}
		}, delay);
	}
}
