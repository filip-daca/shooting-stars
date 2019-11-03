/* exported Hud */
const Hud = (function() {

	let c;
	let s;
	let scoreField;
	let gemScoreField;
	let healthField;

	function initScoreField() {
		scoreField = new createjs.Text("0", "bold 18px Arial", "#FFFFFF");
		scoreField.textAlign = "right";
		scoreField.x = c.width - 20;
		scoreField.y = 20;
		scoreField.maxWidth = 1000;
		s.addChild(scoreField);
	}

	function initGemScoreField() {
		gemScoreField = new createjs.Text("0", "bold 42px 'Courier New'", "#FFFFFF");
		gemScoreField.textAlign = "center";
		gemScoreField.x = c.width / 2;
		gemScoreField.y = 20;
		gemScoreField.maxWidth = 1000;
		s.addChild(gemScoreField);
	}

	function initHealthField() {
		healthField = new createjs.Text("0", "bold 18px Arial", "#FF0000");
		healthField.textAlign = "left";
		healthField.x = 20;
		healthField.y = 20;
		healthField.maxWidth = 1000;
		s.addChild(healthField);
	}

	return {
		init: function() {
			c = Core.getCanvas();
			s = Core.getStage();
		},

		create: function() {
			initScoreField();
			initGemScoreField();
			initHealthField();
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
		},

		updateHealth: function(value) {
			healthField.text = value;
		}
	};
})();