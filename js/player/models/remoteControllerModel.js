class remoteControllerModel {
	Id = null;
	ParentId = null;
	Parent = null;
	Container = null;

	VcrPowerButton = null;

	constructor(el, id, parent) {
		this.Id = newGuid();
		this.ParentId = id;
		this.Parent = parent;
		this.Container = el;

		var $remote = $("<div>", {
			id: "myPlayerRemoteController",
			class: "remoteController",
		});

		var $led = $("<div>", {
			id: "rcLed",
			class: "remoteControllerLed off",
		});
		var $logo = $("<div>", {
			id: "rcLogo",
			class: "remoteControllerLogo",
		});
		var $lock = $("<div>", {
			id: "remoteLock",
			class: "remoteLock",
		});
		var $lockIcon = $("<i>", {
			id: "remoteLockIcon",
			class: "fa-solid fa-lock-open fa-2xl",
		});

		$($lock).append($lockIcon);
		$($remote).append($lock);
		$($remote).append($led);
		$($remote).append($logo);

		var $buttonsPanel = $("<div>", {
			id: "rcButtonsPanel",
			class: "remoteControllerButtonsPanel",
		});

		// BUTTONS ROW 6
		var $rcTvPowerButton = $("<div>", {
			id: "rcTvPowerButton",
			class: "remoteControllerButton red medium",
			style: "top: 16px; left: 12px;",
		}).append('<span class="remoteControllerButtonSpan">TV</span>');
		$($rcTvPowerButton).click(function () {
			playerEventsService.raiseEvent(
				"tvCommand",
				this,
				new PlayerEventArgs("tvpower")
			);
		});

		var $rcTvSourceButton = $("<div>", {
			id: "rcTvSourceButton",
			class: "remoteControllerButton red small",
			style: "top: 16px; right: 65px;",
		}).append('<span class="remoteControllerButtonSpan">SRC</span>');
		$($rcTvSourceButton).click(function () {
			playerEventsService.raiseEvent(
				"tvCommand",
				this,
				new PlayerEventArgs("source")
			);
		});

		var $rcTvMuteButton = $("<div>", {
			id: "rcTvMuteButton",
			class: "remoteControllerButton gray small",
			style: "top: 16px; right: 12px;",
		}).append('<span class="remoteControllerButtonSpan">MUTE</span>');
		$($rcTvMuteButton).click(function () {
			playerEventsService.raiseEvent(
				"tvCommand",
				this,
				new PlayerEventArgs("mute")
			);
		});

		$($buttonsPanel).append($rcTvPowerButton);
		$($buttonsPanel).append($rcTvSourceButton);
		$($buttonsPanel).append($rcTvMuteButton);

		// BUTTONS ROW 7
		var $rcTvSettingButton = $("<div>", {
			id: "rcTvSettingButton",
			class: "remoteControllerButton gray small",
			style: "top: 56px; left: 12px;",
		}).append('<span class="remoteControllerButtonSpan">ADJST</span>');
		$($rcTvSettingButton).click(function () {
			playerEventsService.raiseEvent(
				"tvCommand",
				this,
				new PlayerEventArgs("toggleconfigs")
			);
		});
		$($buttonsPanel).append($rcTvSettingButton);

		var $rcTvSettingDownButton = $("<div>", {
			id: "rcTvSettingDownButton",
			class: "remoteControllerButton gray small",
			style: "top: 56px; left: 65px;",
		}).append('<span class="remoteControllerButtonSpan">-</span>');
		$($rcTvSettingDownButton).click(function () {
			playerEventsService.raiseEvent(
				"tvCommand",
				this,
				new PlayerEventArgs("configdown")
			);
		});
		$($buttonsPanel).append($rcTvSettingDownButton);

		var $rcTvSettingUpButton = $("<div>", {
			id: "rcTvSettingUpButton",
			class: "remoteControllerButton gray small",
			style: "top: 56px; right: 65px;",
		}).append('<span class="remoteControllerButtonSpan">+</span>');
		$($rcTvSettingUpButton).click(function () {
			playerEventsService.raiseEvent(
				"tvCommand",
				this,
				new PlayerEventArgs("configup")
			);
		});
		$($buttonsPanel).append($rcTvSettingUpButton);

		var $rcTvSettingResetButton = $("<div>", {
			id: "rcTvSettingResetButton",
			class: "remoteControllerButton gray small",
			style: "top: 56px; right: 12px;",
		}).append('<span class="remoteControllerButtonSpan">DEFLT</span>');
		$($rcTvSettingResetButton).click(function () {
			playerEventsService.raiseEvent(
				"tvCommand",
				this,
				new PlayerEventArgs("configsdefault")
			);
		});
		$($buttonsPanel).append($rcTvSettingResetButton);

		// BUTTONS ROW 8
		var $rcChanUpButton = $("<div>", {
			id: "rcChanUpButton",
			class: "remoteControllerButton gray medium",
			style: "top: 96px; left: 12px;",
		}).append('<span class="remoteControllerButtonSpan">CH+</span>');
		$($rcChanUpButton).click(function () {
			playerEventsService.raiseEvent(
				"tvCommand",
				this,
				new PlayerEventArgs("channelup")
			);
		});
		$($buttonsPanel).append($rcChanUpButton);

		var $rcVolUpButton = $("<div>", {
			id: "rcVolUpButton",
			class: "remoteControllerButton gray medium",
			style: "top: 96px; right: 12px;",
		}).append('<span class="remoteControllerButtonSpan">VOL+</span>');
		$($rcVolUpButton).click(function () {
			playerEventsService.raiseEvent(
				"tvCommand",
				this,
				new PlayerEventArgs("volumeup")
			);
		});
		$($buttonsPanel).append($rcVolUpButton);

		// BUTTONS ROW 9
		var $rcChanDownButton = $("<div>", {
			id: "rcChanDownButton",
			class: "remoteControllerButton gray medium",
			style: "top: 136px; left: 12px;",
		}).append('<span class="remoteControllerButtonSpan">CH-</span>');
		$($rcChanDownButton).click(function () {
			playerEventsService.raiseEvent(
				"tvCommand",
				this,
				new PlayerEventArgs("channeldown")
			);
		});
		$($buttonsPanel).append($rcChanDownButton);

		var $rcVolDownButton = $("<div>", {
			id: "rcVolDownButton",
			class: "remoteControllerButton gray medium",
			style: "top: 136px; right: 12px;",
		}).append('<span class="remoteControllerButtonSpan">VOL-</span>');
		$($rcVolDownButton).click(function () {
			playerEventsService.raiseEvent(
				"tvCommand",
				this,
				new PlayerEventArgs("volumedown")
			);
		});
		$($buttonsPanel).append($rcVolDownButton);

		// BUTTONS ROW 10
		var $rcFullScreenButton = $("<div>", {
			id: "rcFullScreenButton",
			class: "remoteControllerButton gray big",
			style: "top: 176px; right: 12px;",
		}).append('<span class="remoteControllerButtonSpan">FULLSCREEN</span>');
		$($rcFullScreenButton).click(function () {
			playerEventsService.raiseEvent(
				"tvCommand",
				this,
				new PlayerEventArgs("fullscreen")
			);
		});
		$($buttonsPanel).append($rcFullScreenButton);

		// BUTTONS ROW 1
		var $rcVcrPowerButton = $("<div>", {
			id: "rcVcrPowerButton",
			class: "remoteControllerButton red medium",
			style: "top: 266px; left: 12px;",
		}).append('<span class="remoteControllerButtonSpan">VCR</span>');
		$($rcVcrPowerButton).click(function () {
			playerEventsService.raiseEvent(
				"vcrCommand",
				this,
				new PlayerEventArgs("vcrpower")
			);
		});
		$($buttonsPanel).append($rcVcrPowerButton);

		var $rcVcrEjectButton = $("<div>", {
			id: "rcVcrEjectButton",
			class: "remoteControllerButton gray small",
			style: "top: 266px; right: 12px;",
		}).append('<span class="remoteControllerButtonSpan">EJECT</span>');
		$($rcVcrEjectButton).click(function () {
			playerEventsService.raiseEvent(
				"vcrCommand",
				this,
				new PlayerEventArgs("eject")
			);
		});
		$($buttonsPanel).append($rcVcrEjectButton);

		// BUTTONS ROW 2
		var $rcVcrPlayButton = $("<div>", {
			id: "rcVcrPlayButton",
			class: "remoteControllerButton gray medium",
			style: "top: 306px; left: 12px;",
		}).append('<span class="remoteControllerButtonSpan">PLAY</span>');
		$($rcVcrPlayButton).click(function () {
			playerEventsService.raiseEvent(
				"vcrCommand",
				this,
				new PlayerEventArgs("play")
			);
		});
		$($buttonsPanel).append($rcVcrPlayButton);

		var $rcVcrPauseButton = $("<div>", {
			id: "rcVcrPauseButton",
			class: "remoteControllerButton gray small",
			style: "top: 306px; right: 65px;",
		}).append('<span class="remoteControllerButtonSpan">PAUSE</span>');
		$($rcVcrPauseButton).click(function () {
			playerEventsService.raiseEvent(
				"vcrCommand",
				this,
				new PlayerEventArgs("pause")
			);
		});
		$($buttonsPanel).append($rcVcrPauseButton);

		var $rcVcrStopButton = $("<div>", {
			id: "rcVcrStopButton",
			class: "remoteControllerButton gray small",
			style: "top: 306px; right: 12px;",
		}).append('<span class="remoteControllerButtonSpan">STOP</span>');
		$($rcVcrStopButton).click(function () {
			playerEventsService.raiseEvent(
				"vcrCommand",
				this,
				new PlayerEventArgs("stop")
			);
		});
		$($buttonsPanel).append($rcVcrStopButton);

		// BUTTONS ROW 3
		var $rcFastRewButton = $("<div>", {
			id: "rcFastRewButton",
			class: "remoteControllerButton gray small",
			style: "top: 346px; left: 12px;",
		}).append('<span class="remoteControllerButtonSpan">F.REW</span>');
		$($rcFastRewButton).click(function () {
			playerEventsService.raiseEvent(
				"vcrCommand",
				this,
				new PlayerEventArgs("fastrewind")
			);
		});
		$($buttonsPanel).append($rcFastRewButton);

		var $rcRewButton = $("<div>", {
			id: "rcRewButton",
			class: "remoteControllerButton gray small",
			style: "top: 346px; left: 65px;",
		}).append('<span class="remoteControllerButtonSpan">REW</span>');
		$($rcRewButton).click(function () {
			playerEventsService.raiseEvent(
				"vcrCommand",
				this,
				new PlayerEventArgs("rewind")
			);
		});
		$($buttonsPanel).append($rcRewButton);

		var $rcFwdButton = $("<div>", {
			id: "rcFwdButton",
			class: "remoteControllerButton gray small",
			style: "top: 346px; right: 65px;",
		}).append('<span class="remoteControllerButtonSpan">FWD</span>');
		$($rcFwdButton).click(function () {
			playerEventsService.raiseEvent(
				"vcrCommand",
				this,
				new PlayerEventArgs("forward")
			);
		});
		$($buttonsPanel).append($rcFwdButton);

		var $rcFastFwdButton = $("<div>", {
			id: "rcFastFwdButton",
			class: "remoteControllerButton gray small",
			style: "top: 346px; right: 12px;",
		}).append('<span class="remoteControllerButtonSpan">F.FWD</span>');
		$($rcFastFwdButton).click(function () {
			playerEventsService.raiseEvent(
				"vcrCommand",
				this,
				new PlayerEventArgs("fastforward")
			);
		});
		$($buttonsPanel).append($rcFastFwdButton);

		// BUTTONS ROW 4
		var $rcSlowMotionButton = $("<div>", {
			id: "rcSlowMotionButton",
			class: "remoteControllerButton gray medium",
			style: "top: 386px; left: 12px;",
		}).append('<span class="remoteControllerButtonSpan">SLOW</span>');
		$($rcSlowMotionButton).click(function () {
			playerEventsService.raiseEvent(
				"vcrCommand",
				this,
				new PlayerEventArgs("slowmo")
			);
		});
		$($buttonsPanel).append($rcSlowMotionButton);

		var $rcSlowMinusButton = $("<div>", {
			id: "rcSlowMinusButton",
			class: "remoteControllerButton gray small",
			style: "top: 386px; right: 65px;",
		}).append('<span class="remoteControllerButtonSpan">SLO-</span>');
		$($rcSlowMinusButton).click(function () {
			playerEventsService.raiseEvent(
				"vcrCommand",
				this,
				new PlayerEventArgs("slowmodown")
			);
		});
		$($buttonsPanel).append($rcSlowMinusButton);

		var $rcSlowPlusButton = $("<div>", {
			id: "rcSlowPlusButton",
			class: "remoteControllerButton gray small",
			style: "top: 386px; right: 12px;",
		}).append('<span class="remoteControllerButtonSpan">SLO+</span>');
		$($rcSlowPlusButton).click(function () {
			playerEventsService.raiseEvent(
				"vcrCommand",
				this,
				new PlayerEventArgs("slowmoup")
			);
		});
		$($buttonsPanel).append($rcSlowPlusButton);

		// BUTTONS ROW 5
		var $rcAutoTrackingButton = $("<div>", {
			id: "rcAutoTrackingButton",
			class: "remoteControllerButton gray medium",
			style: "top: 176px; left: 12px;",
		}).append('<span class="remoteControllerButtonSpan">A.TRACKNG</span>');
		// $($buttonsPanel).append($rcAutoTrackingButton);
		var $rcTrackingMinusButton = $("<div>", {
			id: "rcTrackingMinusButton",
			class: "remoteControllerButton gray small",
			style: "top: 176px; right: 65px;",
		}).append('<span class="remoteControllerButtonSpan">TRCK-</span>');
		// $($buttonsPanel).append($rcTrackingMinusButton);
		var $rcTrackingPlusButton = $("<div>", {
			id: "rcTrackingPlusButton",
			class: "remoteControllerButton gray small",
			style: "top: 176px; right: 12px;",
		}).append('<span class="remoteControllerButtonSpan">TRCK+</span>');
		// $($buttonsPanel).append($rcTrackingPlusButton);

		$($remote).append($buttonsPanel);
		$(this.Container).append($remote);

		$(".remoteLock").css("left", "-30px");
	}
}
