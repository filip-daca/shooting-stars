/* exported SpaceRocks */
var SpaceRocks = (function() {
	
	var config = {
		ROCK_TIME: 220,
		SUB_ROCK_COUNT: 4,
	};
		
	var allRocks = new Set();
	var timeToRock;
	var nextRock;
	var c;
	var s;

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

				// handle spaceRock ship collisions
				if (Player.isAlive() && spaceRock.hitRadius(Player.getShip().x, Player.getShip().y, Player.getShip().hit)) {
					breakRock(spaceRock);
					continue;
				}
				
				// handle spaceRock bullet collisions
				for (const bullet of Bullets.getAllBullets()) {
					if (bullet.active) {
						if (spaceRock.hitPoint(bullet.x, bullet.y)) {
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
		var newSpaceRock = new SpaceRock(size);
	
		allRocks.add(newSpaceRock);
		s.addChild(newSpaceRock);
		newSpaceRock.activate(size);

		Core.debug("#space-rock-count", allRocks.size);

		return newSpaceRock;
	}
	
	function breakRock(o) {
		var newSize;
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

		// score
		if (Player.isAlive()) {
			Hud.addScore(o.score);
		}

		// create more
		if (newSize > 0) {
			var i;
			var offSet;

			for (i = 0; i < config.SUB_ROCK_COUNT; i++) {
				var newSpaceRock = createNewSpaceRock(newSize, o.x, o.y);
				offSet = (Math.random() * o.size * 2) - o.size;
				newSpaceRock.x = o.x + offSet;
				newSpaceRock.y = o.y + offSet;
			}
		}
		
		o.explode();
		
		// play sound
		Sound.playEffect("break", {offset: 0.8});

		//remove
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