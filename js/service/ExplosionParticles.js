/* exported ExplosionParticles */
const ExplosionParticles = (function() {

	let s;
	const allParticles = new Set();

	function addParticle(x, y) {
		const newParticle = new ExplosionParticle();
	
		allParticles.add(newParticle);
		s.addChild(newParticle);
		newParticle.activate(x, y);

		Core.debug("#explosion-particle-count", allParticles.size);
	}

	return {
		init: function() {
			s = Core.getStage();
			ExplosionParticles.reinit();
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

		addExplosion: function(x, y) {
			let i = 50;
			while (i > 0) {
				addParticle(x, y);
				i-=1;
			}
		},
	};
})();