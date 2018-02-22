/* exported Controller */
var Controller = (function() {

	var Keys = {
		KEYCODE_1:		49,
		KEYCODE_0:		58,
		KEYCODE_ENTER: 	13,
		KEYCODE_SPACE: 	32,
		KEYCODE_UP: 	38,
		KEYCODE_LEFT: 	37,
		KEYCODE_RIGHT:	39,
		KEYCODE_W:	 	87,
		KEYCODE_A: 		65,
		KEYCODE_D: 		68,
	};

	var confirmHandler;
	
	function handleKeyDown(e) {
		// cross browser issues exist
		if (!e) {
			e = window.event;
		}
		
		Core.debug("#key-code-pressed", e.keyCode);
		
		switch (e.keyCode) {
		case Keys.KEYCODE_SPACE:
			Controller.state.shootHeld = true;
			return false;
		case Keys.KEYCODE_A:
		case Keys.KEYCODE_LEFT:
			Controller.state.lfHeld = true;
			return false;
		case Keys.KEYCODE_D:
		case Keys.KEYCODE_RIGHT:
			Controller.state.rtHeld = true;
			return false;
		case Keys.KEYCODE_W:
		case Keys.KEYCODE_UP:
			Controller.state.fwdHeld = true;
			return false;
		case Keys.KEYCODE_ENTER:
			handleConfirm();
			return false;
		}
		
		if (e.keyCode >= Keys.KEYCODE_1 && e.keyCode <= Keys.KEYCODE_0) {
			Player.getShip().changeWeapon(e.keyCode - Keys.KEYCODE_1);
		}
	}

	function handleKeyUp(e) {
		//cross browser issues exist
		if (!e) {
			e = window.event;
		}
		switch (e.keyCode) {
		case Keys.KEYCODE_SPACE:
			Controller.state.shootHeld = false;
			break;
		case Keys.KEYCODE_A:
		case Keys.KEYCODE_LEFT:
			Controller.state.lfHeld = false;
			break;
		case Keys.KEYCODE_D:
		case Keys.KEYCODE_RIGHT:
			Controller.state.rtHeld = false;
			break;
		case Keys.KEYCODE_W:
		case Keys.KEYCODE_UP:
			Controller.state.fwdHeld = false;
			break;
		}
	}

	function handleConfirm() {
		if (typeof confirmHandler === "function") {
			confirmHandler();
		}
	}

	return {
		init: function() {
			document.onkeydown = handleKeyDown;
			document.onkeyup = handleKeyUp;
		},

		state: {
			shootHeld: false,
			lfHeld: false,
			rtHeld: false,
			fwdHeld: false,
		},

		clearState: function() {
			for (var s in Controller.state) {
				Controller.state[s] = false;
			}
		},

		setConfirmHandle: function(callback) {
			confirmHandler = callback;
		},
	};
})();