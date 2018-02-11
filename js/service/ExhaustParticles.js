/* exported ExhaustParticles */
var ExhaustParticles = (function() {
		
	var s;
	var allParticles = new Set();

	return {
		init: function() {
			s = Core.getStage();
			ExhaustParticles.reinit();
		},

		reinit: function() {
			allParticles.clear();
		},

		tick: function(event) {	
			for (const particle of allParticles) {
				if (particle.active) {
					particle.tick(event);
				} else {
					allParticles.delete(particle);
				}
			}
		},

		addParticle: function(x, y, rotation) {	
			var newParticle = new ExhaustParticle();
	
			allParticles.add(newParticle);
			s.addChild(newParticle);
			newParticle.activate(x, y, rotation);

			Core.debug("#exhaust-particle-count", allParticles.size);
		},
	};
})();