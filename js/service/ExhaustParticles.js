/**
 * 
 */
var ExhaustParticles = {
		
	Config: {
		SMOKE_ENTROPY: 40,		//how much energy a bullet has before it runs out.
		SMOKE_TIME: 60,			//ticks between bullets
		SMOKE_SPEED: 10,		//how fast the bullets move
		SMOKE_THRUST: 0.92,		//how fast the bullets move
	},
		
	allParticles: [],
	nextBullet: 0,
	
	init: function() {
		ExhaustParticles.allParticles = [];
		Weapons.nextBullet = 0;
	},
	
	tick: function(event) {	
		//handle smoke
		for (particle in ExhaustParticles.allParticles) {
			var o = ExhaustParticles.allParticles[particle];
			if (!o || !o.active) {
				continue;
			}
			o.tick();
		}
	},
	
	addParticle: function(x, y, rotation) {	
		var i = 0;
		var len = ExhaustParticles.allParticles.length;
		var newParticle;

		// pooling approach
		while (i <= len) {
			if (!ExhaustParticles.allParticles[i]) {
				ExhaustParticles.allParticles[i] = new ExhaustParticle();
				newParticle = ExhaustParticles.allParticles[i];
				break;
			} else if (!ExhaustParticles.allParticles[i].active) {
				newParticle = ExhaustParticles.allParticles[i];
				break;
			} else {
				i++;
			}
		}
		
		if (DEBUG) {
			$("#exhaust-particle-count").text(len);
		}

		stage.addChild(newParticle);
		newParticle.activate(x, y, rotation);
	},
};