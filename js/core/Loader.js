/* exported Loader */
const Loader = (function() {

	let preload;

	return {
		init: function() {},

		startPreload: function(doneCallback, updateCallback) {
			let assetsPath = "sounds/";
			let manifest = [
				{id: "chaingun", src: "Chaingun.wav", data: 6},
				{id: "explosion", src: "Explosion.wav", data: 6},
				{id: "minigun", src: "Minigun.wav", data: 6},
				{id: "music", src: "music.mp3"},
				{id: "powerup", src: "Powerup.wav", data: 6},
				{id: "shotgun", src: "Shotgun.wav", data: 6},
				{id: "start", src: "Start.wav", data: 6},
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