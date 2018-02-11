/* exported Core */
var Core = (function() {
	
	var DEBUG = true;

	var canvas;
	var stage;
	
	return {
		init: function() {
			canvas = document.getElementById("gameCanvas");
			stage = new createjs.Stage(canvas);
		},

		getCanvas: function() {
			return canvas;
		},

		getStage: function() {
			return stage;
		},

		debug: function(jqSelector, value) {
			if (DEBUG) {
				$(jqSelector).text(value);
			}
		},
	};
})();