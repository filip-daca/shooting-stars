/**
 * 
 */
var ExhaustParticles = {
		
	Config: {
		SMOKE_ENTROPY: 20,		//how much energy a bullet has before it runs out.
		SMOKE_TIME: 1,			//ticks between bullets
		SMOKE_SPEED: 15,		//how fast the bullets move
		SMOKE_THRUST: 0.8,		//how fast the bullets move
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
			
			//handle spaceRock movement and looping
			if (Engine.outOfBounds(o, o.bounds)) {
				Engine.placeInBounds(o, o.bounds);
			}
			
			//move by velocity
			o.x += o.vX;
			o.y += o.vY;
			
			//accelerate
			o.vX *= ExhaustParticles.Config.SMOKE_THRUST;
			o.vY *= ExhaustParticles.Config.SMOKE_THRUST;
			
			if (--o.entropy <= 0) {
				stage.removeChild(o);
				o.active = false;
			}
		}
	},
	
	getSmokeParticle: function() {
		var i = 0;
		var len = ExhaustParticles.allParticles.length;

		//pooling approach
		while (i <= len) {
			if (!ExhaustParticles.allParticles[i]) {
				ExhaustParticles.allParticles[i] = new createjs.Shape();
				break;
			} else if (!ExhaustParticles.allParticles[i].active) {
				ExhaustParticles.allParticles[i].active = true;
				break;
			} else {
				i++;
			}
		}

		if (len == 0) {
			ExhaustParticles.allParticles[0] = new createjs.Shape();
		}

		stage.addChild(ExhaustParticles.allParticles[i]);
		return i;
	},
};