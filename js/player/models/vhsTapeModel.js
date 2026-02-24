class vhsTapeModel {
	Id = null;
	ParentId = null;
	Container = null;

	Top = 0;
	Order = 0;
	Movie1 = null;
	Movie2 = null;
	CurrentTime = 0;
	CurrentMovieId = 0;
	Movie1Duration = 0;
	Movie2Duration = 0;

	constructor(id, order, movie1, movie2, localized = false) {
		this.Id = newGuid();
		this.ParentId = id;
		this.Movie1 = movie1;
		this.Movie2 = movie2;
		this.Order = order;
		this.CurrentTime = 0;
		this.CurrentMovieId = 0;

		var frontId = getRandomInt(1, 14);
		if (frontId < 10) {
			frontId = "0" + frontId;
		}

		var $tape = $("<div>", {
			id: "tape_" + order,
			order: order,
			class: "tape",
			style: 'background-image: url("img/vhs/vhs_front_' + frontId + '.jpg");',
		});

		var $titleMovie1 = $("<div>", {
			id: "tape_" + order + "_title1",
			class: "tapeTitle1",
			title: movie1.id,
		});
		var $infoMovie1 = $("<div>", {
			id: "tape_" + order + "_info1",
			class: "tapeInfo1",
		});

		$($titleMovie1).text("1. " + movie1.getTitle(localized));
		$($infoMovie1).html(movie1.getGenresAndYear(localized, "<br/>"));
		$($tape).append($titleMovie1);
		$($tape).append($infoMovie1);

		if (movie2 != null) {
			var $titleMovie2 = $("<div>", {
				id: "tape_" + order + "_title2",
				class: "tapeTitle2",
				title: movie2.id,
			});
			var $infoMovie2 = $("<div>", {
				id: "tape_" + order + "_info2",
				class: "tapeInfo2",
			});

			$($titleMovie2).text("2. " + movie2.getTitle(localized));
			$($infoMovie2).html(movie2.getGenresAndYear(localized, "<br/>"))
			$($tape).append($titleMovie2);
			$($tape).append($infoMovie2);
		}

		var $sticker1 = $("<div>", {
			id: "tape_" + order + "_sticker1",
			class: "tapeSticker tapeSticker1",
			style: "",
		});
		var $sticker2 = $("<div>", {
			id: "tape_" + order + "_sticker1",
			class: "tapeSticker tapeSticker2",
			style: "",
		});
		var $sticker3 = $("<div>", {
			id: "tape_" + order + "_sticker1",
			class: "tapeSticker tapeSticker3",
			style: "",
		});

		var orderStr = "" + order;
		if (orderStr.length == 3) {
			$($sticker1).text(orderStr[0]);
			$($sticker2).text(orderStr[1]);
			$($sticker3).text(orderStr[2]);
		} else if (orderStr.length == 2) {
			$($sticker1).text("0");
			$($sticker2).text(orderStr[0]);
			$($sticker3).text(orderStr[1]);
		} else if (orderStr.length == 1) {
			$($sticker1).text("0");
			$($sticker2).text("0");
			$($sticker3).text(orderStr[0]);
		}

		this.addRandomTransformStyle($sticker1);
		this.addRandomTransformStyle($sticker2);
		this.addRandomTransformStyle($sticker3);

		$($tape).append($sticker1);
		$($tape).append($sticker2);
		$($tape).append($sticker3);

		// $($titleMovie1).mousedown(function (e) {
		// 	//$(".posterContainer").removeClass("on");
		// });
		// $($titleMovie1).mouseover(function (e) {
		// 	return;
		// 	var mdbid = $(this).attr("title");
		// 	if (mdbid != null) {
		// 		var lsItem = localStorageService.getItem(mdbid);
		// 		if (lsItem != null && lsItem.length > 0) {
		// 			// console.log("Got item from storage!");
		// 			// console.log(lsItem);
		// 			var movieData = JSON.parse(lsItem);
		// 			// console.log(movieData);

		// 			$(".posterContainer").css(
		// 				"background-image",
		// 				"url(" + movieData.imageUrl + ")"
		// 			);
		// 			$(".posterContainer").addClass("on");
		// 		} else {
		// 			//ajaxService.sendGetMovieRequest(mdbid);
		// 		}
		// 	}
		// });
		// $($titleMovie1).mouseout(function (e) {
		// 	//$(".posterContainer").removeClass("on");
		// 	//$(".posterContainer").css("background-image", "none");
		// });
		// $($titleMovie2).mousedown(function (e) {
		// 	//$(".posterContainer").removeClass("on");
		// });
		// $($titleMovie2).mouseover(function (e) {
		// 	return;
		// 	var mdbid = $(this).attr("title");
		// 	if (mdbid != null) {
		// 		var lsItem = localStorageService.getItem(mdbid);
		// 		if (lsItem != null && lsItem.length > 0) {
		// 			// console.log("Got item from storage!");
		// 			// console.log(lsItem);
		// 			var movieData = JSON.parse(lsItem);
		// 			//console.log(movieData);

		// 			$(".posterContainer").css(
		// 				"background-image",
		// 				"url(" + movieData.imageUrl + ")"
		// 			);
		// 			$(".posterContainer").addClass("on");
		// 		} else {
		// 			//ajaxService.sendGetMovieRequest(mdbid);
		// 		}
		// 	}
		// });
		// $($titleMovie2).mouseout(function (e) {
		// 	//$(".posterContainer").removeClass("on");
		// 	//$(".posterContainer").css("background-image", "none");
		// });

		this.Container = $tape;

		$(this.Container).mousedown(function (e) {
			var test = checkIfAnyElementHasClasses([
				"vcrTapeClosed",
				"vcrTapeLoaded",
				"vcrTapeInside",
				"vcrTapeOnRails",
			]);

			if (test) {
				return;
			} else if (
				!$(this).hasClass("readyToDrag") &&
				checkIfAnyElementHasClass("readyToDrag")
			) {
				return;
			} else if ($(this).hasClass("readyToDrag")) {
				$(".shelfContainer").addClass("open");
				$(".shelf").addClass("open");
			}

			$(this).removeClass("zoom");
			$(this).removeClass("onShelf");
			$(this).removeClass("readyToDrag");
			$(this).addClass("dragging");
			dragger.drag($(this), e.pageX, e.pageY, false);
		});
		$(this.Container).mouseover(function (e) {
			if ($(this).hasClass("onShelf")) {
				$(this).addClass("zoom");
			}
		});
		$(this.Container).mouseout(function (e) {
			if ($(this).hasClass("onShelf")) {
				$(this).removeClass("zoom");
			}
		});

		this.updateHeight();
	}

	updateHeight() {
		var tapeWidth = LayoutMeasures.vhsTapeWidth;
		var tapeHeight = LayoutMeasures.vhsTapeHeight;
		var titleWidth = LayoutMeasures.vhsTapeTitleWidth;
		var titleHeight = LayoutMeasures.vhsTapeTitleHeight;
		var titleLeft = LayoutMeasures.vhsTapeTitleLeft;
		var title1Top = LayoutMeasures.vhsTapeTitle1Top;
		var title2Top = LayoutMeasures.vhsTapeTitle2Top;
		var infoLeft = LayoutMeasures.vhsTapeInfoLeft;
		var infoWidth = LayoutMeasures.vhsTapeInfoWidth;
		var infoHeight = LayoutMeasures.vhsTapeInfoHeight;
		var info1Top = LayoutMeasures.vhsTapeInfo1Top;
		var info2Top = LayoutMeasures.vhsTapeInfo2Top;
		var sticker1Top = LayoutMeasures.vhsTapeSticker1Top;
		var sticker2Top = LayoutMeasures.vhsTapeSticker2Top;
		var sticker3Top = LayoutMeasures.vhsTapeSticker3Top;
		var stickerLeft = LayoutMeasures.vhsTapeStickerLeft;
		var stickerWidth = LayoutMeasures.vhsTapeStickerWidth;
		var stickerHeight = LayoutMeasures.vhsTapeStickerHeight;

		this.Top = tapeHeight * 0.66 + tapeHeight * 1.55 * (this.Order - 1);
		//var tapeLeft = Math.floor(tapeWidth * 0.2);

		$(this.Container).css("top", this.Top + "px");
		$(this.Container).css("min-width", tapeWidth + "px");
		$(this.Container).css("max-width", tapeWidth + "px");
		$(this.Container).css("min-height", tapeHeight + "px");
		$(this.Container).css("max-height", tapeHeight + "px");

		var title1 = $(this.Container).find(".tapeTitle1");
		$(title1).css("top", title1Top + "px");
		$(title1).css("left", titleLeft + "px");
		$(title1).css("min-width", titleWidth + "px");
		$(title1).css("max-width", titleWidth + "px");
		$(title1).css("min-height", titleHeight + "px");
		$(title1).css("max-height", titleHeight + "px");

		var title2 = $(this.Container).find(".tapeTitle2");
		$(title2).css("top", title2Top + "px");
		$(title2).css("left", titleLeft + "px");
		$(title2).css("min-width", titleWidth + "px");
		$(title2).css("max-width", titleWidth + "px");
		$(title2).css("min-height", titleHeight + "px");
		$(title2).css("max-height", titleHeight + "px");

		var info1 = $(this.Container).find(".tapeInfo1");
		$(info1).css("top", info1Top + "px");
		$(info1).css("left", infoLeft + "px");
		$(info1).css("min-width", infoWidth + "px");
		$(info1).css("max-width", infoWidth + "px");
		$(info1).css("min-height", infoHeight + "px");
		$(info1).css("max-height", infoHeight + "px");

		var info2 = $(this.Container).find(".tapeInfo2");
		$(info2).css("top", info2Top + "px");
		$(info2).css("left", infoLeft + "px");
		$(info2).css("min-width", infoWidth + "px");
		$(info2).css("max-width", infoWidth + "px");
		$(info2).css("min-height", infoHeight + "px");
		$(info2).css("max-height", infoHeight + "px");

		var sticker1 = $(this.Container).find(".tapeSticker1");
		$(sticker1).css("top", sticker1Top + "px");
		$(sticker1).css("left", stickerLeft + "px");
		$(sticker1).css("min-width", stickerWidth + "px");
		$(sticker1).css("max-width", stickerWidth + "px");
		$(sticker1).css("min-height", stickerHeight + "px");
		$(sticker1).css("max-height", stickerHeight + "px");

		var sticker2 = $(this.Container).find(".tapeSticker2");
		$(sticker2).css("top", sticker2Top + "px");
		$(sticker2).css("left", stickerLeft + "px");
		$(sticker2).css("min-width", stickerWidth + "px");
		$(sticker2).css("max-width", stickerWidth + "px");
		$(sticker2).css("min-height", stickerHeight + "px");
		$(sticker2).css("max-height", stickerHeight + "px");

		var sticker3 = $(this.Container).find(".tapeSticker3");
		$(sticker3).css("top", sticker3Top + "px");
		$(sticker3).css("left", stickerLeft + "px");
		$(sticker3).css("min-width", stickerWidth + "px");
		$(sticker3).css("max-width", stickerWidth + "px");
		$(sticker3).css("min-height", stickerHeight + "px");
		$(sticker3).css("max-height", stickerHeight + "px");
	}

	drag() {}

	addRandomTransformStyle(el) {
		var stickerColors = ["#000099", "#000000", "#3d3d3d", "#a60000"];

		var randomColorIdx = getRandomInt(0, 4);
		if (randomColorIdx >= stickerColors.length) {
			randomColorIdx = stickerColors.length - 1;
		}
		var randomTranslateX =
			getRandomInt(1, 100) % 2 == 0
				? getRandomInt(0, 1)
				: getRandomInt(0, 1) * -1;
		var randomTranslateY =
			getRandomInt(1, 100) % 2 == 0
				? getRandomInt(0, 1)
				: getRandomInt(0, 1) * -1;
		var randomRotateAngle = 270;
		randomRotateAngle +=
			getRandomInt(1, 100) % 2 == 0
				? getRandomInt(0, 6)
				: getRandomInt(0, 6) * -1;

		randomTranslateX = 0;
		randomTranslateY = 0;

		var styleBody =
			"color: " +
			stickerColors[randomColorIdx] +
			"; " +
			"transform: rotate(" +
			randomRotateAngle +
			"deg) " +
			"translate(" +
			randomTranslateX +
			"px," +
			randomTranslateY +
			"px);";

		$(el).attr("style", styleBody);
	}

	updateMovie1Duration(t) {
		this.Movie1Duration = t;
		this.Movie1.duration = t;
	}
	updateMovie2Duration(t) {
		this.Movie2Duration = t;
		this.Movie2.duration = t;
	}
	updateCurrentTime(t) {
		this.CurrentTime = t;
	}

	getMoviesCount() {
		if (this.Movie2 != null) {
			return 2;
		} else if (this.Movie1 != null) {
			return 1;
		}

		return 0;
	}

	getCurrentTapeTime() {
		return this.CurrentTime;
	}

	setCurrentTapeTime(t) {
		if (this.CurrentMovieId == 1) {
			this.CurrentTime = t;
		} else if (this.CurrentMovieId == 2) {
			this.CurrentTime = t + this.Movie1.duration;
		}
	}

	getCurrentMovieTime() {
		if (this.isInitRequired()) {
			return 0;
		}

		var currentTime = this.getCurrentTapeTime();
		if (currentTime > this.Movie1.duration) {
			return currentTime - this.Movie1.duration;
		} else {
			return currentTime;
		}
	}

	isInitRequired() {
		if (this.Movie1.duration == 0) {
			return true;
		}

		if (this.Movie2 != null && this.Movie2.duration == 0) {
			return true;
		}

		return false;
	}

	testTape() {}
}

class vhsTapeTester {
	Parent = null;
	VideoDock = null;
	Testing = false;

	constructor(parent, videoDock) {
		this.Parent = parent;
		this.VideoDock = videoDock;
		this.Testing = false;

		this.Video = $("<video>", {
			id: "vhsTapeTesterVideo",
			class: "shelfTestVideo",
		});
		var $videosrc = $("<source>", {
			id: "vhsTapeTesterVideoSource",
			src: "",
			type: "video/mp4",
		});

		$(this.Video).append($videosrc);
		$(this.VideoDock).append(this.Video);
	}

	test(tape) {
		if (this.Testing) {
			setTimeout(() => {
				this.test(tape);
			}, 100);
			return;
		}

		console.log("testing tape");
		console.log(tape);

		var video = document.getElementById("vhsTapeTesterVideo");
		var source = document.getElementById("vhsTapeTesterVideoSource");
		source.src = tape.Movie1.localPath;
		video.load();

		setTimeout(() => {
			tape.Movie1.duration = video.duration;
			console.log(
				"tape #" + tape.Order + ", movie 1 duration = " + tape.Movie1.duration
			);
			if (tape.Movie2 == null) {
				this.Testing = false;
				return;
			}

			setTimeout(() => {
				video.pause();
				source.src = tape.Movie2.localPath;
				video.load();
				setTimeout(() => {
					tape.Movie2.duration = video.duration;
					console.log(
						"tape #" +
							tape.Order +
							", movie 2 duration = " +
							tape.Movie2.duration
					);
					this.Testing = false;
				}, 200);
			}, 100);
		}, 250);
	}
}
