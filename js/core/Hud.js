/* exported Hud */
var Hud = (function() {

	var c;
	var s;
	var scoreField;
	var gemScoreField;

	function initScoreField() {
		scoreField = new createjs.Text("0", "bold 18px Arial", "#FFFFFF");
		scoreField.textAlign = "right";
		scoreField.x = c.width - 20;
		scoreField.y = 20;
		scoreField.maxWidth = 1000;
		s.addChild(scoreField);
	}

	function initGemScoreField() {
		gemScoreField = new createjs.Text("0", "bold 42px Courier New", "#FFFFFF");
		gemScoreField.textAlign = "center";
		gemScoreField.x = c.width / 2;
		gemScoreField.y = 20;
		gemScoreField.maxWidth = 1000;
		s.addChild(gemScoreField);
	}

	return {
		init: function() {
			c = Core.getCanvas();
			s = Core.getStage();
		},

		create: function() {
			initScoreField();
			initGemScoreField();
		},

		clearScore: function() {
			scoreField.text = (0).toString();
			s.update();
		},

		addScore: function(value) {
			scoreField.text = (Number(scoreField.text) + Number(value)).toString();
		},

		addGemScore: function() {
			gemScoreField.text = (Number(gemScoreField.text) + 1).toString();
		}
	};
})();