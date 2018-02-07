/**
 * 
 */
var SpaceRocks = {
	
	Config: {
		ROCK_TIME: 220,
	},
		
	allRocks: [],
	timeToRock: undefined,
	nextRock: undefined,
	
	init: function() {
		SpaceRocks.allRocks = [];
		SpaceRocks.timeToRock = SpaceRocks.Config.ROCK_TIME;
		SpaceRocks.nextRock = 0;
	},
	
	tickNewRocks: function(event) {
		if (SpaceRocks.nextRock <= 0) {
			if (alive) {
				SpaceRocks.timeToRock -= DIFFICULTY;	//reduce spaceRock spacing slowly to increase difficulty with time
				var newSpaceRock = SpaceRocks.createNewSpaceRock(SpaceRock.LRG_ROCK);
				newSpaceRock.floatOnScreen(canvas.width, canvas.height);
				SpaceRocks.nextRock = SpaceRocks.timeToRock + SpaceRocks.timeToRock * Math.random();
			}
		} else {
			SpaceRocks.nextRock--;
		}
	},
	
	tickAllRocks: function(event) {
		for (spaceRock in SpaceRocks.allRocks) {
			var o = SpaceRocks.allRocks[spaceRock];
			if (!o || !o.active) {
				continue;
			}

			//handle spaceRock movement and looping
			if (Engine.outOfBounds(o, o.bounds)) {
				Engine.placeInBounds(o, o.bounds);
			}
			o.tick(event);

			//handle spaceRock ship collisions
			if (alive && o.hitRadius(ship.x, ship.y, ship.hit)) {
				SpaceRocks.breakRock(o);
				continue;
			}
			
			//handle spaceRock bullet collisions
			for (bullet in Weapons.bulletStream) {
				var p = Weapons.bulletStream[bullet];
				if (!p || !p.active) {
					continue;
				}

				if (o.hitPoint(p.x, p.y)) {
					SpaceRocks.breakRock(o);
					Engine.remove(p);
				}
			}
		}
	},
		
	tick: function(event) {
		SpaceRocks.tickNewRocks(event);
		SpaceRocks.tickAllRocks(event);
	},
	
	createNewSpaceRock: function(size) {
		var i = 0;
		var len = SpaceRocks.allRocks.length;
		var newSpaceRock;
		
		//pooling approach
		while (i <= len) {
			if (!SpaceRocks.allRocks[i]) {
				SpaceRocks.allRocks[i] = new SpaceRock(size);
				newSpaceRock = SpaceRocks.allRocks[i];
				break;
			} else if (!SpaceRocks.allRocks[i].active) {
				newSpaceRock = SpaceRocks.allRocks[i];
				break;
			} else {
				i++;
			}
		}
		
		if (DEBUG) {
			$("#space-rock-count").text(len);
		}

		stage.addChild(newSpaceRock);
		newSpaceRock.activate(size);
		return newSpaceRock;
	},
	
	breakRock: function(o) {
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

		//score
		if (alive) {
			addScore(o.score);
		}

		//create more
		if (newSize > 0) {
			var i;
			var index;
			var offSet;

			for (i = 0; i < SUB_ROCK_COUNT; i++) {
				var newSpaceRock = SpaceRocks.createNewSpaceRock(newSize);
				offSet = (Math.random() * o.size * 2) - o.size;
				newSpaceRock.x = o.x + offSet;
				newSpaceRock.y = o.y + offSet;
			}
		}
		
		o.explode();
		
		// play sound
		createjs.Sound.play("break", {interrupt: createjs.Sound.INTERUPT_LATE, offset: 0.8, volume: Sound.VOLUME});

		//remove
		Engine.remove(o);
	},
};