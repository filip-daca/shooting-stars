/**
 * 
 */
var ExplosionParticles = {
		
	Config: {
		SMOKE_ENTROPY: 40,		//how much energy a bullet has before it runs out.
		SMOKE_TIME: 60,			//ticks between bullets
		SMOKE_SPEED: 10,		//how fast the bullets move
		SMOKE_THRUST: 0.92,		//how fast the bullets move
	},
		
	allParticles: [],
	nextBullet: 0,
	
	init: function() {
		ExplosionParticles.allParticles = [];
		Weapons.nextBullet = 0;
	},
	
	tick: function(event) {	
		//handle smoke
		for (particle in ExplosionParticles.allParticles) {
			var o = ExplosionParticles.allParticles[particle];
			if (!o || !o.active) {
				continue;
			}
			o.tick();
		}
	},
	
	addExplosion: function(x, y) {
		var i = 50;
		while (i > 0) {
			ExplosionParticles.addParticle(x, y);
			i-=1;
		}
	},
	
	addParticle: function(x, y) {	
		var i = 0;
		var len = ExplosionParticles.allParticles.length;
		var newParticle;

		// pooling approach
		while (i <= len) {
			if (!ExplosionParticles.allParticles[i]) {
				ExplosionParticles.allParticles[i] = new ExplosionParticle();
				newParticle = ExplosionParticles.allParticles[i];
				break;
			} else if (!ExplosionParticles.allParticles[i].active) {
				newParticle = ExplosionParticles.allParticles[i];
				break;
			} else {
				i++;
			}
		}
		
		if (DEBUG) {
			$("#explosion-particle-count").text(len);
		}

		stage.addChild(newParticle);
		newParticle.activate(x, y);
	},
};