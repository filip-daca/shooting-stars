/* exported SpaceRock */
const SpaceRock = (function (window) {

	function SpaceRock(size) {
		this.Shape_constructor();
		this.activate(size);
	}

	const p = createjs.extend(SpaceRock, createjs.Shape);

	SpaceRock.COLOR = "#FFFFFF";
	SpaceRock.LRG_ROCK = 40;
	SpaceRock.MED_ROCK = 20;
	SpaceRock.SML_ROCK = 10;

	p.bounds;
	p.hit;
	p.size;
	p.spin;
	p.score;
	p.hasGem;
	p.gemGlow;
	p.glowTimer;
	p.vX;
	p.vY;
	p.active;

	// Handle drawing a spaceRock
	p.getShape = function (size) {
		var angle = 0;
		var radius = size;

		this.size = size;
		this.hit = size;
		this.bounds = 0;

		// Setup
		this.graphics.clear();
		this.graphics.beginStroke(SpaceRock.COLOR);
		this.graphics.moveTo(0, size);

		// Draw spaceRock
		while (angle < (Math.PI * 2 - .5)) {
			angle += .25 + (Math.random() * 100) / 500;
			radius = size + (size / 2 * Math.random());
			this.graphics.lineTo(Math.sin(angle) * radius, Math.cos(angle) * radius);

			// track visual depiction for interaction
			if (radius > this.bounds) {
				this.bounds = radius;
			}	// furthest point

			this.hit = (this.hit + radius) / 2; // running average
		}
		this.graphics.closePath(); // draw the last line segment back to the start point.
		
		this.cache(-this.bounds, -this.bounds, 2 * this.bounds, 2 * this.bounds, 2);
		this.hit *= 1.1; //pad a bit
	};

	// Handle reinit for poolings sake
	p.activate = function (size) {
		this.getShape(size);

		// Pick a random direction to move in and base the rotation off of speed
		var angle = Math.random() * (Math.PI * 2);
		this.vX = Math.sin(angle) * (2 - size / 15);
		this.vY = Math.cos(angle) * (2 - size / 15);
		this.spin = (Math.random() + 0.2 ) * this.vX;

		if (this.hasGem) {
			this.glowTimer = Gem.GLOW_INTERVAL;
		}

		// Associate score with size
		this.score = (5 - size / 10) * 100;
		this.active = true;
	};

	// Handle what a spaceRock does to itself every frame
	p.tick = function () {
		// Handle spaceRock movement and looping
		if (Engine.outOfBounds(this, this.bounds)) {
			Engine.placeInBounds(this, this.bounds);
		}
		this.move();

		if (this.hasGem) {
			this.glow();
		}
	};

	p.move = function() {
		this.rotation += this.spin;
		this.x += this.vX;
		this.y += this.vY;
	};

	p.glow = function() {
		if (this.glowTimer == 0) {
			this.gemGlow = new RoundGlow(this.x, this.y, this.size, Gem.COLOR);
			this.glowTimer = Gem.GLOW_INTERVAL;
		} else {
			this.glowTimer--;
		}
	};

	// Position the spaceRock so it floats on screen
	p.floatOnScreen = function (width, height) {
		// Base bias on real estate and pick a side or top/bottom
		if (Math.random() * (width + height) > width) {
			// Side; ensure velocity pushes it on screen
			if (this.vX > 0) {
				this.x = -2 * this.bounds;
			} else {
				this.x = 2 * this.bounds + width;
			}
			// Randomly position along other dimension
			if (this.vY > 0) {
				this.y = Math.random() * height * 0.5;
			} else {
				this.y = Math.random() * height * 0.5 + 0.5 * height;
			}
		} else {
			// Top/bottom; ensure velocity pushes it on screen
			if (this.vY > 0) {
				this.y = -2 * this.bounds;
			} else {
				this.y = 2 * this.bounds + height;
			}
			// Randomly position along other dimension
			if (this.vX > 0) {
				this.x = Math.random() * width * 0.5;
			} else {
				this.x = Math.random() * width * 0.5 + 0.5 * width;
			}
		}
	};
	
	p.explode = function() {
		if (this.hasGem) {
			Gems.spawnGem(this.x, this.y, this.vX, this.vY);
		}
		ExplosionParticles.addExplosion(this.x, this.y);
	};

	window.SpaceRock = createjs.promote(SpaceRock, "Shape");

	return SpaceRock;
}(window));
