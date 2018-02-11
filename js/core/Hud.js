/* exported Hud */
var Hud = (function() {

	var c;
	var s;
	var scoreField;

	function initScoreField() {
		scoreField = new createjs.Text("0", "bold 18px Arial", "#FFFFFF");
		scoreField.textAlign = "right";
		scoreField.x = c.width - 20;
		scoreField.y = 20;
		scoreField.maxWidth = 1000;
		s.addChild(scoreField);
	}

	return {
		init: function() {
			c = Core.getCanvas();
			s = Core.getStage();
		},

		create: function() {
			initScoreField();
		},

		clearScore: function() {
			scoreField.text = (0).toString();
			s.update();
		},

		addScore: function(value) {
			scoreField.text = (Number(scoreField.text) + Number(value)).toString();
		}
	};
})();