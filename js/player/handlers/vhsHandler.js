$(".tape").mousedown(function (e) {
	// if ($(this).hasClass("onShelf") && player.Vcr.VhsTape != null) {
	// 	return;
	// }

	console.log("I will drag tape!");

	$(this).removeClass("zoom");
	$(this).removeClass("onShelf");
	$(this).removeClass("readyToDrag");
	$(this).addClass("dragging");
	dragger.drag($(this), e.pageX, e.pageY, true);
});
$(".tape").mouseover(function (e) {
	if ($(this).hasClass("onShelf")) {
		$(this).addClass("zoom");
	}
});
$(".tape").mouseout(function (e) {
	if ($(this).hasClass("onShelf")) {
		$(this).removeClass("zoom");
	}
});
