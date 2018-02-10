var MiniGun = {
	bulletTime: 10,
	nextBullet: 0,
	
	fire: function(ship) {
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
};

var ShotGun = {
	bulletTime: 20,
	nextBullet: 0,
	
	fire: function(ship) {
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
};

var ChainGun = {
	bulletTime: 1,
	nextBullet: 0,
	
	fire: function(ship) {
		//create the bullet
		var o = Weapons.bulletStream[Weapons.getBullet()];
		o.x = ship.x;
		o.y = ship.y;
		o.rotation = ship.rotation + (Math.random() * 12 - 6);
		o.entropy = Weapons.Config.BULLET_ENTROPY;
		o.active = true;

		//draw the bullet
		o.graphics.beginStroke("#FF33FF").beginFill("#FF33FF").drawCircle(0,0,1);

		// play the shot sound
		createjs.Sound.play("laser", {interrupt: createjs.Sound.INTERUPT_LATE, volume: Sound.VOLUME});
	}, 	
};


var Weapons = {
		
	Config: {
		BULLET_ENTROPY: 100,
		BULLET_SPEED: 9,
	},
		
	allWeapons: [],
	bulletStream: [],
	nextBullet: 0,
	
	init: function() {
		Weapons.bulletStream = [];
		Weapons.nextBullet = 0;
		Weapons.allWeapons[0] = MiniGun;
		Weapons.allWeapons[1] = ShotGun;
		Weapons.allWeapons[2] = ChainGun;
	},
	
	tick: function(event) {	
		//handle bullet movement
		for (var bullet in Weapons.bulletStream) {
			var o = Weapons.bulletStream[bullet];
			if (!o || !o.active) {
				continue;
			}
			o.x += Math.sin(o.rotation * (Math.PI / -180)) * Weapons.Config.BULLET_SPEED;
			o.y += Math.cos(o.rotation * (Math.PI / -180)) * Weapons.Config.BULLET_SPEED;

			if (--o.entropy <= 0) {
				Engine.remove(o);
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
};