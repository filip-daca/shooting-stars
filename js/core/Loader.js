/* exported Loader */
var Loader = (function() {

	var preload;

	return {
		init: function() {},

		startPreload: function(doneCallback, updateCallback) {
			var assetsPath = "sounds/";
			var manifest = [
				{id: "begin", src: "start_game.mp3"},
				{id: "break", src: "explosion.wav", data: 6},
				{id: "death", src: "death.ogg"},
				{id: "laser", src: "laser.wav", data: 6},
				{id: "music", src: "music.mp3"}
			];
	
			createjs.Sound.alternateExtensions = ["mp3", "wav"];
			preload = new createjs.LoadQueue(true, assetsPath);
			preload.installPlugin(createjs.Sound);
			preload.addEventListener("complete", doneCallback);
			preload.addEventListener("progress", updateCallback);
			preload.loadManifest(manifest);
		},

		getProgress: function() {
			return preload.progress;
		}
	};
})();