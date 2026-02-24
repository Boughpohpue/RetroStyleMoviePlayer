class vhsShelfModel {
	Id = null;
	Parent = null;
	ParentId = null;
	Container = null;
	Shelf = null;
	Lock = null;
	LockIcon = null;
	Tapes = [];
	Video = null;
	Tester = null;
	TesterContainer = null;

	constructor(el, id, parent) {
		this.Id = newGuid();
		this.ParentId = id;
		this.Parent = parent;
		this.Container = el;

		this.Shelf = $("<div>", {
			id: "shelf",
			class: "shelf",
		});
		this.Lock = $("<div>", {
			id: "shelfLock",
			class: "shelfLock",
		});
		this.LockIcon = $("<i>", {
			id: "shelfLockIcon",
			class: "fa-solid fa-lock-open fa-2xl",
		});

		this.TesterContainer = $("<div>", {
			id: "shelfTestTester",
			class: "shelfTestTester",
		});

		$(this.Lock).append(this.LockIcon);
		$(this.Shelf).append(this.Lock);
		$(this.Container).append(this.Shelf);
		$(this.Container).append(this.TesterContainer);

		//this.Tester = new vhsTapeTester(this, this.TesterContainer);

		this.updateHeight();
	}

	loadTapesFromData(data, localized = false) {
		console.log(`Loading shelf tapes from data - localized=(${localized})`);
		this.loadTapes(
			data.movies.map((f) =>
		  	new VhsMovie(f.id, f.year, f.title, f.locTitle, f.genres, f.locGenres, f.movieFilePath)),
			localized);
	}

	loadTapes(movies, localized = false) {
		var shelf = $(this.Container).find("#shelf");

		console.log(`Loading shelf tapes - localized=(${localized})`);

		var tapesCounter = 0;
		var moviesCounter = 0;
		for (var i = 0; i < movies.length; i++) {
			var movie1 = movies[i];
			var movie2 = i + 1 === movies.length ? null : movies[++i];
			moviesCounter += movie2 ? 2 : 1;

			// testVideoSource.src = movie1.localPath;
			// testVideo.load();
			// movie1.updateDuration(testVideo.duration);

			// if (movie2 != null) {
			// 	testVideoSource.src = movie2.localPath;
			// 	testVideo.load();
			// 	movie2.updateDuration(testVideo.duration);
			// }

			var tape = new vhsTapeModel(this.Id, ++tapesCounter, movie1, movie2, localized);

			var $shelfTapePlaceholder = $("<div>", {
				id: "shelfTapePlaceholder_" + tapesCounter,
				class: "shelfTapePlaceholder",
			});
			var $shelfTapeTray = $("<div>", {
				id: "shelfTapeTray_" + tapesCounter,
				class: "shelfTapeTray",
			});
			var $shelfTapeHolderLeft = $("<div>", {
				id: "shelfTapeHolderLeft_" + tapesCounter,
				class: "shelfTapeHolder",
			});
			var $shelfTapeHolderRight = $("<div>", {
				id: "shelfTapeHolderRight_" + tapesCounter,
				class: "shelfTapeHolder",
			});

			$(shelf).append($shelfTapePlaceholder);
			$(shelf).append($shelfTapeTray);
			$(shelf).append($shelfTapeHolderLeft);
			$(shelf).append($shelfTapeHolderRight);
			$(shelf).append(tape.Container);

			$(tape.Container).addClass("onShelf");
			this.Tapes.push(tape);

			console.log(`Loaded ${moviesCounter}/${movies.length} movies.`);
		}

		console.log(movies.length + " movies loaded ok!");
		console.log(this.Tapes.length + " VHS tapes loaded ok!");

		this.updateHeight();
	}

	updateHeight() {
		var bodyBounds = new Bounds(document.body);
		var shelfWidth = Math.ceil(LayoutMeasures.vhsTapeWidth * 2.22);
		var shelfTapeTrayWidth = LayoutMeasures.shelfTapeTrayWidth;
		var shelfTapeTrayHeight = LayoutMeasures.shelfTapeTrayHeight;
		var shelfTapeHolderWidth = LayoutMeasures.shelfTapeHolderWidth;
		var shelfTapeHolderHeight = LayoutMeasures.shelfTapeHolderHeight;

		var tapeWidth = LayoutMeasures.vhsTapeWidth;
		var tapeHeight = LayoutMeasures.vhsTapeHeight;
		var tapeLeft = Math.floor(tapeWidth * 0.2);

		var leftHolderLeft = tapeLeft + Math.floor(tapeWidth * 0.2);
		var rightHolderLeft =
			tapeLeft + Math.floor(tapeWidth * 0.8) - shelfTapeHolderWidth;

		var shelfTapeTrayLeft = tapeLeft - Math.floor(shelfTapeTrayWidth * 0.1);

		$(".shelfContainer").css(
			"min-height",
			LayoutMeasures.tvHeight + LayoutMeasures.vcrHeight + "px"
		);
		$(".shelfContainer").css(
			"max-height",
			LayoutMeasures.tvHeight + LayoutMeasures.vcrHeight + "px"
		);

		// $(".shelfLock").css("top", Math.ceil(tapeHeight * 0.66) + "px");
		//$(".shelfLock").css("left", Math.ceil(tapeLeft * 2) + tapeWidth + "px");
		//$(".shelfLock").css("right", "420px");

		$("#shelf").css("min-width", shelfWidth + "px");
		$("#shelf").css("max-width", shelfWidth + "px");
		$(this.Container).css("min-width", shelfWidth + 33 + "px");
		$(this.Container).css("max-width", shelfWidth + 33 + "px");

		for (var i = 0; i < this.Tapes.length; i++) {
			var tapeTop = Math.ceil(tapeHeight * 0.66 + i * tapeHeight * 1.55);
			var trayTop = tapeTop + tapeHeight + 1;
			var holderTop = trayTop + shelfTapeTrayHeight;

			var tapeTray = $("#shelfTapeTray_" + (i + 1));
			var tapeHolderLeft = $("#shelfTapeHolderLeft_" + (i + 1));
			var tapeHolderRight = $("#shelfTapeHolderRight_" + (i + 1));
			var tapePlaceholder = $("#shelfTapePlaceholder_" + (i + 1));

			$(tapePlaceholder).css("top", tapeTop + "px");
			$(tapePlaceholder).css("left", tapeLeft + "px");
			$(tapePlaceholder).css("min-width", tapeWidth + "px");
			$(tapePlaceholder).css("max-width", tapeWidth + "px");
			$(tapePlaceholder).css("min-height", tapeHeight + "px");
			$(tapePlaceholder).css("max-height", tapeHeight + "px");

			$(tapeTray).css("top", trayTop + "px");
			$(tapeTray).css("left", shelfTapeTrayLeft + "px");
			$(tapeTray).css("min-width", shelfTapeTrayWidth + "px");
			$(tapeTray).css("max-width", shelfTapeTrayWidth + "px");
			$(tapeTray).css("min-height", shelfTapeTrayHeight + "px");
			$(tapeTray).css("max-height", shelfTapeTrayHeight + "px");

			$(tapeHolderLeft).css("top", holderTop + "px");
			$(tapeHolderLeft).css("left", leftHolderLeft + "px");
			$(tapeHolderLeft).css("min-width", shelfTapeHolderWidth + "px");
			$(tapeHolderLeft).css("max-width", shelfTapeHolderWidth + "px");
			$(tapeHolderLeft).css("min-height", shelfTapeHolderHeight + "px");
			$(tapeHolderLeft).css("max-height", shelfTapeHolderHeight + "px");

			$(tapeHolderRight).css("top", holderTop + "px");
			$(tapeHolderRight).css("left", rightHolderLeft + "px");
			$(tapeHolderRight).css("min-width", shelfTapeHolderWidth + "px");
			$(tapeHolderRight).css("max-width", shelfTapeHolderWidth + "px");
			$(tapeHolderRight).css("min-height", shelfTapeHolderHeight + "px");
			$(tapeHolderRight).css("max-height", shelfTapeHolderHeight + "px");

			var tape = this.Tapes[i];
			$(tape.Container).css("top", tapeTop + "px");
			$(tape.Container).css("left", tapeLeft + "px");
			if ($(tape.Container).hasClass("onShelf")) {
				tape.updateHeight();
			}
		}
	}

	getTape(order) {
		return this.Tapes[order - 1];
	}

	onDrop(sender, args) {
		if ($(args.Subject).attr("id") != "myPlayerShelf") {
			return;
		}

		var tapeOrder = $(sender).attr("order");
		var tape = this.getTape(tapeOrder);
		var tapePlaceholder = $("#shelfTapePlaceholder_" + tapeOrder);
		// var tapePlaceholder = $(this.Shelf).find(
		// 	"#shelfTapePlaceholder_" + tapeOrder
		// );
		var tapePlaceholderBounds = new ElementBounds(tapePlaceholder);

		console.log(tape);
		console.log(tapeOrder);
		console.log(tapePlaceholder);
		console.log(tapePlaceholderBounds);

		jQuery($(tape.Container)).detach();
		$(tape.Container).css("top", tapePlaceholderBounds.top + "px");
		$(tape.Container).css("left", tapePlaceholderBounds.left + "px");
		$(tape.Container).css("min-width", tapePlaceholderBounds.width + "px");
		$(tape.Container).css("max-width", tapePlaceholderBounds.width + "px");
		$(tape.Container).css("min-height", tapePlaceholderBounds.height + "px");
		$(tape.Container).css("max-height", tapePlaceholderBounds.height + "px");
		$(tape.Container).removeClass("dragging");
		$(tape.Container).addClass("onShelf");
		jQuery($(tape.Container)).appendTo($("#shelf"));
	}
}
