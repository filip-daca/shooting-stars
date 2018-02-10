/**
 * 
 */
var Bullets = {
		
	Config: {
		SMOKE_ENTROPY: 40,
		SMOKE_TIME: 60,
		SMOKE_SPEED: 10,
		SMOKE_THRUST: 0.92,
	},
		
	allBullets: [],
	
	init: function() {
		Bullets.allBullets = [];
	},
	
	tick: function(event) {	
		//handle smoke
		for (var bullet in Bullets.allBullets) {
			var o = Bullets.allBullets[bullet];
			if (!o || !o.active) {
				continue;
			}
			o.tick(event);
		}
	},
	
	addBullet: function(bullet) {	
		var i = 0;
		var len = Bullets.allBullets.length;

		// pooling approach
		while (i <= len) {
			if (!Bullets.allBullets[i] || !Bullets.allBullets[i].active) {
				Bullets.allBullets[i] = bullet;
				break;
			} else {
				i++;
			}
		}
		
		if (DEBUG) {
			$("#bullet-count").text(len);
		}

		stage.addChild(newBullet);
		newBullet.activate(x, y, rotation);
	},
};