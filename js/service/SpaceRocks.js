/* exported SpaceRocks */
const SpaceRocks = (function() {

	const config = {
		ROCK_TIME: 220,
		SUB_ROCK_COUNT: 4,
	};

	let allRocks = new Set();
	let timeToRock;
	let nextRock;
	let c;
	let s;

	function tickNewRocks() {
		if (nextRock <= 0) {
			if (Player.isAlive()) {
				timeToRock -= Game.getDifficulty();
				var newSpaceRock = createNewSpaceRock(SpaceRock.LRG_ROCK);
				newSpaceRock.floatOnScreen(c.width, c.height);
				nextRock = timeToRock + timeToRock * Math.random();
			}
		} else {
			nextRock--;
		}
	}
	
	function tickAllRocks(event) {
		for (const spaceRock of allRocks) {
			if (spaceRock.active) {
				spaceRock.tick(event);

				// Handle spaceRock ship collisions
				if (Player.isAlive() && Engine.hitsRadius(spaceRock, Player.getShip())) {
					breakRock(spaceRock);
					continue;
				}
				
				// Handle spaceRock bullet collisions
				for (const bullet of Bullets.getAllBullets()) {
					if (bullet.active) {
						if (Engine.hitsRadius(spaceRock, bullet)) {
							breakRock(spaceRock);
							Engine.remove(bullet);
						}
					}
				}
			} else {
				allRocks.delete(spaceRock);
			}
		}
	}
		
	function createNewSpaceRock(size) {
		const newSpaceRock = new SpaceRock(size);

		// Rock will carry Gem if it can spawn
		if (!Gems.isGemSpawned()) {
			newSpaceRock.hasGem = true;
			Gems.setGemSpawned(true);
		}
	
		allRocks.add(newSpaceRock);
		s.addChild(newSpaceRock);
		newSpaceRock.activate(size);

		Core.debug("#space-rock-count", allRocks.size);

		return newSpaceRock;
	}
	
	function breakRock(o) {
		let newSize;
		switch (o.size) {
		case SpaceRock.LRG_ROCK:
			newSize = SpaceRock.MED_ROCK;
			break;
		case SpaceRock.MED_ROCK:
			newSize = SpaceRock.SML_ROCK;
			break;
		case SpaceRock.SML_ROCK:
			newSize = 0;
			break;
		}

		// Score
		if (Player.isAlive()) {
			Hud.addScore(o.score);
		}

		// Create more
		if (newSize > 0) {
			let i;
			let offSet;

			for (i = 0; i < config.SUB_ROCK_COUNT; i++) {
				const newSpaceRock = createNewSpaceRock(newSize, o.x, o.y);
				offSet = (Math.random() * o.size * 2) - o.size;
				newSpaceRock.x = o.x + offSet;
				newSpaceRock.y = o.y + offSet;
			}
		}
		
		o.explode();
		
		// Play sound
		Sound.playEffect("explosion", {offset: 0.8});

		// Remove
		Engine.remove(o);
	}

	return {
		init: function() {
			c = Core.getCanvas();
			s = Core.getStage();
			SpaceRocks.reinit();
		},

		reinit: function() {
			allRocks.clear();
			timeToRock = config.ROCK_TIME;
			nextRock = 0;
		},

		tick: function(event) {
			tickNewRocks(event);
			tickAllRocks(event);
		},
	};
})();