var Sound = {
	
	VOLUME: 0.5,
	
	toggleVolume: function() {
		if (Sound.VOLUME === 0) {
			Sound.VOLUME = 0.5;
			$("#toggle-volume i").removeClass("glyphicon-volume-off");
			$("#toggle-volume i").addClass("glyphicon-volume-up");
			Sound.startMusic();
		} else {
			Sound.VOLUME = 0
			$("#toggle-volume i").removeClass("glyphicon-volume-up");
			$("#toggle-volume i").addClass("glyphicon-volume-off");
			Sound.stopMusic();
		}
	},
	
	stopMusic: function() {
		createjs.Sound.stop("music");
	},

	startMusic: function() {
		createjs.Sound.play("music", {interrupt: createjs.Sound.INTERRUPT_NONE, loop: -1, volume: Sound.VOLUME});
	},
};