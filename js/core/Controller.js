var Controller = {

	Keys: {
		KEYCODE_ENTER: 	13,
		KEYCODE_SPACE: 	32,
		KEYCODE_UP: 	38,
		KEYCODE_LEFT: 	37,
		KEYCODE_RIGHT:	39,
		KEYCODE_W:	 	87,
		KEYCODE_A: 		65,
		KEYCODE_D: 		68,
	},

	State: {
		shootHeld: false,
		lfHeld: false,
		rtHeld: false,
		fwdHeld: false,
	},
	
	clearState: function() {
		for (var s in Controller.State) {
			Controller.State[s] = false;
		}
	},
	
	handleKeyDown: function(e) {
		//cross browser issues exist
		if (!e) {
			var e = window.event;
		}
		switch (e.keyCode) {
			case Controller.Keys.KEYCODE_SPACE:
				Controller.State.shootHeld = true;
				return false;
			case Controller.Keys.KEYCODE_A:
			case Controller.Keys.KEYCODE_LEFT:
				Controller.State.lfHeld = true;
				return false;
			case Controller.Keys.KEYCODE_D:
			case Controller.Keys.KEYCODE_RIGHT:
				Controller.State.rtHeld = true;
				return false;
			case Controller.Keys.KEYCODE_W:
			case Controller.Keys.KEYCODE_UP:
				Controller.State.fwdHeld = true;
				return false;
			case Controller.Keys.KEYCODE_ENTER:
				if (canvas.onclick == Controller.handleClick) {
					Controller.handleClick();
				}
				return false;
		}
	},

	handleKeyUp: function(e) {
		//cross browser issues exist
		if (!e) {
			var e = window.event;
		}
		switch (e.keyCode) {
			case Controller.Keys.KEYCODE_SPACE:
				Controller.State.shootHeld = false;
				break;
			case Controller.Keys.KEYCODE_A:
			case Controller.Keys.KEYCODE_LEFT:
				Controller.State.lfHeld = false;
				break;
			case Controller.Keys.KEYCODE_D:
			case Controller.Keys.KEYCODE_RIGHT:
				Controller.State.rtHeld = false;
				break;
			case Controller.Keys.KEYCODE_W:
			case Controller.Keys.KEYCODE_UP:
				Controller.State.fwdHeld = false;
				break;
		}
	},

	handleClick: function() {
		//prevent extra clicks and hide text
		canvas.onclick = null;
		stage.removeChild(messageField);

		// indicate the player is now on screen
		createjs.Sound.play("begin", {volume: Sound.VOLUME});

		restart();
	},
};