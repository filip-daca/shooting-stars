/* exported Sound */
const Sound = (function() {

	let volume = 0.5;

	return {
		init: function() {
			$("#toggle-volume").bind("click", Sound.toggleVolume);
		},

		toggleVolume: function() {
			if (volume === 0) {
				volume = 0.5;
				$("#toggle-volume i").removeClass("glyphicon-volume-off");
				$("#toggle-volume i").addClass("glyphicon-volume-up");
				Sound.startMusic();
			} else {
				volume = 0;
				$("#toggle-volume i").removeClass("glyphicon-volume-up");
				$("#toggle-volume i").addClass("glyphicon-volume-off");
				Sound.stopMusic();
			}
		},

		startMusic: function() {
			createjs.Sound.play("music", {interrupt: createjs.Sound.INTERRUPT_NONE, loop: -1, volume: volume});
		},

		stopMusic: function() {
			createjs.Sound.stop("music");
		},

		playEffect: function(effectName, options) {
			if (!options) {
				options = {};
			}
			createjs.Sound.play(effectName, {
				interrupt: options.interrupt ? options.interrupt : createjs.Sound.INTERUPT_LATE, 
				volume: volume,
				offset: options.offset ? options.offset : 0,
			});
		},
	};
})();