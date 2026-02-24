const soundVcrInsert = "InsertTapeAudio";
const soundVcrEject = "EjectTapeAudio";
const soundVcrPlay = "PlayTapeAudio";
const soundVcrPause = "PauseTapeAudio";
const soundVcrStop = "StopTapeAudio";
const soundVcrRewFwdStart = "StartRewFwdTapeAudio";
const soundVcrRewFwd = "RewFwdTapeAudio";
const soundVcrRewFwdStop = "StopRewFwdTapeAudio";

const playerSounds = new soundsContainer([
	new soundModel(soundVcrInsert, "snd/vhs_insert_fx.wav"),
	new soundModel(soundVcrEject, "snd/vhs_eject_fx.wav"),
	new soundModel(soundVcrPlay, "snd/vhs_play_fx.wav"),
	new soundModel(soundVcrPause, "snd/vhs_pause.wav"),
	new soundModel(soundVcrStop, "snd/vhs_stop.wav"),
	new soundModel(soundVcrRewFwdStart, "snd/vhs_rewfwd_start.wav"),
	new soundModel(soundVcrRewFwd, "snd/vhs_rewfwd_fxx.wav"),
	new soundModel(soundVcrRewFwdStop, "snd/vhs_rewfwd_stop.wav"),
]);
