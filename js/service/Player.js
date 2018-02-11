/* exported Player */
var Player = (function() {
	
	var c;
	var s;
	var ship;
	var alive;
	
	return {

		init: function() {
			c = Core.getCanvas();
			s = Core.getStage();
		},

		create: function() {
			alive = true;
			ship = new Ship();
			ship.x = c.width / 2;
			ship.y = c.height / 2;	
		},

		tick: function(event) {
			ship.tick(event);
		},

		isAlive: function() {
			return alive;
		},

		getShip: function() {
			return ship;
		},

		die: function() {
			alive = false;
			s.removeChild(ship);

			Sound.play("death", {interrupt: createjs.Sound.INTERRUPT_ANY});
			MainMenu.showMessage("You're dead:  Click or hit enter to play again");
			
			MainMenu.waitForClickToPlay();
		},
	};
})();