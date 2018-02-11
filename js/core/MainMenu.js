/* exported MainMenu */
var MainMenu = (function() {

	var c;
	var s;
	var messageField;

	function initMessageField() {
		messageField = new createjs.Text("Loading", "bold 24px Arial", "#FFFFFF");
		messageField.maxWidth = 1000;
		messageField.textAlign = "center";
		messageField.textBaseline = "middle";
		messageField.x = c.width / 2;
		messageField.y = c.height / 2;
		s.addChild(messageField);
	}

	function updateLoading() {
		MainMenu.showMessage("Loading " + (Loader.getProgress() * 100 | 0) + "%");
	}
	
	function doneLoading() {
		clearInterval(0);
		Hud.create();

		MainMenu.showMessage("Click to play");
		Sound.startMusic();
		
		MainMenu.waitForClickToPlay();
	}

	function handleClickToPlay() {
		// prevent extra clicks and hide text
		c.onclick = null;
		Controller.setConfirmHandle(c.onclick);

		s.removeChild(messageField);

		// indicate the player is now on screen
		createjs.Sound.play("begin", {volume: Sound.VOLUME});

		Game.restart();
	}

	return {
		init: function() {
			c = Core.getCanvas();
			s = Core.getStage();
		},

		loadGame: function() {
			initMessageField();
			MainMenu.showMessage("Loading");
			Loader.startPreload(doneLoading, updateLoading);
		},

		waitForClickToPlay: function() {
			c.onclick = handleClickToPlay;
			Controller.setConfirmHandle(c.onclick);
		},

		showMessage(text) {
			messageField.text = text;
			s.update();
		},
	};
})();