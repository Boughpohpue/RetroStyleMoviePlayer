const LayoutMeasures = {
	get currentViewHeight() {
		var html = document.documentElement;
		return Math.round(
			Math.max(html.clientHeight, html.scrollHeight, html.offsetHeight)
		);
	},
	get currentRatio() {
		return (this.currentViewHeight - 10) / DesignViewHeight;
	},
	get shelfTapeTrayWidth() {
		return Math.round(DesignShelfTapeTrayWidth * this.currentRatio);
	},
	get shelfTapeTrayHeight() {
		return Math.round(DesignShelfTapeTrayHeight * this.currentRatio);
	},

	get shelfTapeHolderWidth() {
		return Math.round(DesignShelfTapeHolderWidth * this.currentRatio);
	},
	get shelfTapeHolderHeight() {
		return Math.round(DesignShelfTapeHolderHeight * this.currentRatio);
	},

	get vhsTapeWidth() {
		return Math.round(DesignVhsTapeWidth * this.currentRatio);
	},
	get vhsTapeHeight() {
		return Math.round(DesignVhsTapeHeight * this.currentRatio);
	},

	get vhsTapeTitleWidth() {
		return Math.round(DesignVhsTapeTitleWidth * this.currentRatio);
	},
	get vhsTapeTitleHeight() {
		return Math.round(DesignVhsTapeTitleHeight * this.currentRatio);
	},
	get vhsTapeTitleLeft() {
		return Math.round(DesignVhsTapeTitleLeft * this.currentRatio);
	},
	get vhsTapeTitle1Top() {
		return Math.round(DesignVhsTapeTitle1Top * this.currentRatio);
	},
	get vhsTapeTitle2Top() {
		return Math.round(DesignVhsTapeTitle2Top * this.currentRatio);
	},

	get vhsTapeInfoWidth() {
		return Math.round(DesignVhsTapeInfoWidth * this.currentRatio);
	},
	get vhsTapeInfoHeight() {
		return Math.round(DesignVhsTapeInfoHeight * this.currentRatio);
	},
	get vhsTapeInfoLeft() {
		return Math.round(DesignVhsTapeInfoLeft * this.currentRatio);
	},
	get vhsTapeInfo1Top() {
		return Math.round(DesignVhsTapeInfo1Top * this.currentRatio);
	},
	get vhsTapeInfo2Top() {
		return Math.round(DesignVhsTapeInfo2Top * this.currentRatio);
	},

	get vhsTapeStickerWidth() {
		return Math.round(DesignVhsTapeStickerWidth * this.currentRatio);
	},
	get vhsTapeStickerHeight() {
		return Math.round(DesignVhsTapeStickerHeight * this.currentRatio);
	},
	get vhsTapeStickerLeft() {
		return Math.round(DesignVhsTapeStickerLeft * this.currentRatio);
	},
	get vhsTapeSticker1Top() {
		return Math.round(DesignVhsTapeSticker1Top * this.currentRatio);
	},
	get vhsTapeSticker2Top() {
		return Math.round(DesignVhsTapeSticker2Top * this.currentRatio);
	},
	get vhsTapeSticker3Top() {
		return Math.round(DesignVhsTapeSticker3Top * this.currentRatio);
	},

	get vcrPowerButtonTop() {
		return Math.round(DesignVcrPowerButtonTop * this.currentRatio);
	},
	get vcrPowerButtonLeft() {
		return Math.round(DesignVcrPowerButtonLeft * this.currentRatio);
	},
	get vcrPowerButtonWidth() {
		return Math.round(DesignVcrPowerButtonWidth * this.currentRatio);
	},
	get vcrPowerButtonHeight() {
		return Math.round(DesignVcrPowerButtonHeight * this.currentRatio);
	},

	get vcrEjectButtonTop() {
		return Math.round(DesignVcrEjectButtonTop * this.currentRatio);
	},
	get vcrEjectButtonLeft() {
		return Math.round(DesignVcrEjectButtonLeft * this.currentRatio);
	},
	get vcrEjectButtonWidth() {
		return Math.round(DesignVcrEjectButtonWidth * this.currentRatio);
	},
	get vcrEjectButtonHeight() {
		return Math.round(DesignVcrEjectButtonHeight * this.currentRatio);
	},

	get vcrPlayButtonTop() {
		return Math.round(DesignVcrPlayButtonTop * this.currentRatio);
	},
	get vcrPlayButtonLeft() {
		return Math.round(DesignVcrPlayButtonLeft * this.currentRatio);
	},
	get vcrPlayButtonWidth() {
		return Math.round(DesignVcrPlayButtonWidth * this.currentRatio);
	},
	get vcrPlayButtonHeight() {
		return Math.round(DesignVcrPlayButtonHeight * this.currentRatio);
	},

	get vcrStopButtonTop() {
		return Math.round(DesignVcrStopButtonTop * this.currentRatio);
	},
	get vcrStopButtonLeft() {
		return Math.round(DesignVcrStopButtonLeft * this.currentRatio);
	},
	get vcrStopButtonWidth() {
		return Math.round(DesignVcrStopButtonWidth * this.currentRatio);
	},
	get vcrStopButtonHeight() {
		return Math.round(DesignVcrStopButtonHeight * this.currentRatio);
	},

	get posterWidth() {
		return Math.round(DesignPosterWidth * this.currentRatio);
	},
	get posterHeight() {
		return Math.round(DesignPosterHeight * this.currentRatio);
	},

	get vcrWidth() {
		return Math.round(DesignVcrWidth * this.currentRatio);
	},
	get vcrHeight() {
		return Math.round(DesignVcrHeight * this.currentRatio);
	},

	get tvWidth() {
		return Math.round(DesignTvWidth * this.currentRatio);
	},
	get tvHeight() {
		return Math.round(DesignTvHeight * this.currentRatio);
	},

	get tvScreenTextFontSize() {
		return Math.round(DesignTvScreenTextFontSize * this.currentRatio);
	},

	get tvScreenInputTextFontSize() {
		return Math.round(DesignTvScreenInputTextFontSize * this.currentRatio);
	},

	get tvScreenTop() {
		return Math.round(DesignTvScreenTop * this.currentRatio);
	},
	get tvScreenLeft() {
		return Math.round(DesignTvScreenLeft * this.currentRatio);
	},
	get tvScreenWidth() {
		return Math.round(DesignTvScreenWidth * this.currentRatio);
	},
	get tvScreenHeight() {
		return Math.round(DesignTvScreenHeight * this.currentRatio);
	},
};
