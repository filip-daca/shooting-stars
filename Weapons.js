/**
 * 
 */
var Weapons = {
		
	Config: {
		BULLET_TIME: 5,
		BULLET_ENTROPY: 100,
		BULLET_SPEED: 17,
	},
		
	bulletStream: [],
	nextBullet: 0,
	
	init: function() {
		Weapons.bulletStream = [];
		Weapons.nextBullet = 0;
	},
	
	tick: function(event) {	
		//handle bullet movement
		for (bullet in Weapons.bulletStream) {
			var o = Weapons.bulletStream[bullet];
			if (!o || !o.active) {
				continue;
			}
			o.x += Math.sin(o.rotation * (Math.PI / -180)) * Weapons.Config.BULLET_SPEED;
			o.y += Math.cos(o.rotation * (Math.PI / -180)) * Weapons.Config.BULLET_SPEED;

			if (--o.entropy <= 0) {
				stage.removeChild(o);
				o.active = false;
			}
		}
	},
	
	getBullet: function() {
		var i = 0;
		var len = Weapons.bulletStream.length;

		//pooling approach
		while (i <= len) {
			if (!Weapons.bulletStream[i]) {
				Weapons.bulletStream[i] = new createjs.Shape();
				break;
			} else if (!Weapons.bulletStream[i].active) {
				Weapons.bulletStream[i].active = true;
				break;
			} else {
				i++;
			}
		}

		if (len == 0) {
			Weapons.bulletStream[0] = new createjs.Shape();
		}

		stage.addChild(Weapons.bulletStream[i]);
		return i;
	},
	
	fireBullet: function(ship) {
		//create the bullet
		var o = Weapons.bulletStream[Weapons.getBullet()];
		o.x = ship.x;
		o.y = ship.y;
		o.rotation = ship.rotation;
		o.entropy = Weapons.Config.BULLET_ENTROPY;
		o.active = true;

		//draw the bullet
		o.graphics.beginStroke("#FF33FF").drawCircle(0,0,3);

		// play the shot sound
		createjs.Sound.play("laser", {interrupt: createjs.Sound.INTERUPT_LATE, volume: Sound.VOLUME});
	},

	fireShotgun: function(ship) {
		var i = 5;
		while (i > 0) {
			//create the bullet
			var o = Weapons.bulletStream[Weapons.getBullet()];
			o.x = ship.x;
			o.y = ship.y;
			o.rotation = ship.rotation + i*3 - 9;
			o.entropy = Weapons.Config.BULLET_ENTROPY;
			o.active = true;

			//draw the bullet
			o.graphics.beginStroke("#FF33FF").drawCircle(0,0,3);
			i--;
		}
		
		// play the shot sound
		createjs.Sound.play("laser", {interrupt: createjs.Sound.INTERUPT_LATE, volume: Sound.VOLUME});
	},

	fireLaser: function(ship) {
		//create the bullet
		var o = Weapons.bulletStream[Weapons.getBullet()];
		o.x = ship.x;
		o.y = ship.y;
		o.rotation = ship.rotation;
		o.entropy = Weapons.Config.BULLET_ENTROPY;
		o.active = true;

		//draw the bullet
		o.graphics.beginStroke("#FF33FF").beginFill("#FF33FF").drawCircle(0,0,5);

		// play the shot sound
		createjs.Sound.play("laser", {interrupt: createjs.Sound.INTERUPT_LATE, volume: Sound.VOLUME});
	},	
};