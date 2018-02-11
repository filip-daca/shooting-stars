/* exported Bullets */
var Bullets = (function() {
				
	var allBullets = new Set();
	var s;

	return {
		init: function() {
			s = Core.getStage();
			Bullets.reinit();
		},

		reinit: function() {
			allBullets.clear();
		},

		tick: function(event) {	
			for (const bullet of allBullets) {
				if (bullet.active) {
					bullet.tick(event);
				} else {
					allBullets.delete(bullet);
				}
			}
		},

		addBullet: function(newBullet) {	
			allBullets.add(newBullet);
			s.addChild(newBullet);

			Core.debug("#bullet-count", allBullets.size);
		},

		getAllBullets: function() {
			return allBullets;
		},
	};
})();