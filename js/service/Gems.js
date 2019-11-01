/* exported Gems */
const Gems = (function() {

	const allGems = new Set();
	let s;
	let gemSpawned;

	return {
		init: function() {
			s = Core.getStage();
			Gems.reinit();
		},

		reinit: function() {
			allGems.clear();
			gemSpawned = false;
		},

		tick: function(event) {	
			for (const gem of allGems) {
				if (gem.active) {
					gem.tick(event);

					// Handle gem ship collisions
					if (Player.isAlive() && Engine.hitsRadius(gem, Player.getShip())) {
						gem.collect();
						Engine.remove(gem);
						Sound.playEffect("powerup", {offset: 0.8});
						Player.changeRandomWeapon();
					}
				} else {
					allGems.delete(gem);
				}
			}
		},

		spawnGem: function(x, y, vX, vY) {
			const newGem = new Gem(x, y, vX, vY);
			newGem.activate();
			allGems.add(newGem);
			
			s.addChild(newGem);
		},

		isGemSpawned: function() {
			return gemSpawned;
		},

		setGemSpawned: function(value) {
			gemSpawned = value;
		},
	};
})();