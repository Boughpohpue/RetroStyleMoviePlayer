const DesignViewHeight = 948;

// POSTER
const DesignPosterWidth = 416;
const DesignPosterHeight = 650;

// SHELF
const DesignShelfTapeTrayWidth = 412;
const DesignShelfTapeTrayHeight = 4;
const DesignShelfTapeHolderWidth = 16;
const DesignShelfTapeHolderHeight = 6;

// TV
const DesignTvWidth = 834;
const DesignTvHeight = 792;

const DesignTvScreenTop = 81;
const DesignTvScreenLeft = 70;
const DesignTvScreenWidth = 696;
const DesignTvScreenHeight = 495;

const DesignTvScreenTextFontSize = 72;
const DesignTvScreenInputTextFontSize = 36;

const DesignTvButtonWidth = 20;
const DesignTvButtonHeight = 10;
const DesignTvButtonTop = 710;
const DesignTvVolDownButtonLeft = 350;
const DesignTvVolUpButtonLeft = 375;
const DesignTvChnDownButtonLeft = 315;
const DesignTvChnUpButtonLeft = 440;

// VCR
const DesignVcrWidth = 717;
const DesignVcrHeight = 156;

const DesignVcrHeadTop = 40;
const DesignVcrHeadLeft = 266;
const DesignVcrHeadWidth = 88;
const DesignVcrHeadHeight = 23;

const DesignVcrCoverTop = 19;
const DesignVcrCoverLeft = 199;
const DesignVcrCoverWidth = 319;
const DesignVcrCoverHeight = 44;

const DesignVcrTapeTop = 23;
const DesignVcrTapeLeft = 195;
const DesignVcrTapeWidth = 328;
const DesignVcrTapeHeight = 40;

const DesignVcrDisplayTop = 75;
const DesignVcrDisplayLeft = 251;
const DesignVcrDisplayWidth = 212;
const DesignVcrDisplayHeight = 37;

const DesignVcrDisplayDateTimeTop = 7;
const DesignVcrDisplayDateTimeRight = 0;
const DesignVcrDisplayDateTimeWidth = 185;
const DesignVcrDisplayDateTimeHeight = 33;

const DesignVcrDisplayInfoTop = 7;
const DesignVcrDisplayInfoLeft = 0;
const DesignVcrDisplayInfoWidth = 233;
const DesignVcrDisplayInfoHeight = 33;

const DesignVcrPowerButtonTop = 31;
const DesignVcrPowerButtonLeft = 21;
const DesignVcrPowerButtonWidth = 34;
const DesignVcrPowerButtonHeight = 20;

const DesignVcrEjectButtonTop = 20;
const DesignVcrEjectButtonLeft = 533;
const DesignVcrEjectButtonWidth = 26;
const DesignVcrEjectButtonHeight = 26;

const DesignVcrPlayButtonTop = 25;
const DesignVcrPlayButtonLeft = 625;
const DesignVcrPlayButtonWidth = 52;
const DesignVcrPlayButtonHeight = 25;

const DesignVcrStopButtonTop = 51;
const DesignVcrStopButtonLeft = 625;
const DesignVcrStopButtonWidth = 52;
const DesignVcrStopButtonHeight = 25;

const DesignVcrRewButtonTop = 30;
const DesignVcrRewButtonLeft = 23;
const DesignVcrRewButtonWidth = 37;
const DesignVcrRewButtonHeight = 21;

const DesignVcrFwdButtonTop = 30;
const DesignVcrFwdButtonLeft = 23;
const DesignVcrFwdButtonWidth = 37;
const DesignVcrFwdButtonHeight = 21;

// TAPE
const DesignVhsTapeWidth = 344;
const DesignVhsTapeHeight = 42;
const DesignVhsTapeTitleLeft = 100;
const DesignVhsTapeTitleWidth = 150;
const DesignVhsTapeTitleHeight = 17;
const DesignVhsTapeTitle1Top = 6;
const DesignVhsTapeTitle2Top = 21;
const DesignVhsTapeInfoLeft = 250;
const DesignVhsTapeInfoWidth = 60;
const DesignVhsTapeInfoHeight = 17;
const DesignVhsTapeInfo1Top = 6;
const DesignVhsTapeInfo2Top = 21;

const DesignVhsTapeStickerLeft = 13;
const DesignVhsTapeSticker1Top = 24;
const DesignVhsTapeSticker2Top = 15;
const DesignVhsTapeSticker3Top = 6;
const DesignVhsTapeStickerWidth = 8;
const DesignVhsTapeStickerHeight = 11;

function getCurrentRatio() {
	return (getHeight() - 10) / DesignViewHeight;
}

function getHeight() {
	var html = document.documentElement;
	return Math.max(html.clientHeight, html.scrollHeight, html.offsetHeight);
}
