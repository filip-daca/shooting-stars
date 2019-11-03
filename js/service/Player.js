/* exported Player */
const Player = (function() {

	let c;
	let s;
	let ship;
	let alive;
	let health;
	
	return {

		init: function() {
			c = Core.getCanvas();
			s = Core.getStage();
		},

		create: function() {
			alive = true;
			health = 100;
			ship = new Ship();
			ship.x = c.width / 2;
			ship.y = c.height / 2;	
		},

		tick: function(event) {
			ship.tick(event);
			if (health < 100) {
				health += 0.5;
			}
			Hud.updateHealth(health);
		},

		isAlive: function() {
			return alive;
		},

		getShip: function() {
			return ship;
		},

		collideWithRock: function() {
			health -= 25;
			if (health <= 0) {
				this.die();
			}
		},

		die: function() {
			alive = false;
			s.removeChild(ship);
			ExplosionParticles.addExplosion(this.x, this.y);

			Sound.play("death", {interrupt: createjs.Sound.INTERRUPT_ANY});
			MainMenu.showMessage("You're dead:  Click or hit enter to play again");
			
			MainMenu.waitForClickToPlay();
		},

		changeRandomWeapon: function() {
			const currentWeapon = ship.getWeapon();
			while (ship.getWeapon() === currentWeapon) {
				ship.changeWeapon(Math.floor(Math.random() * 3));
			}
		},
	};
})();