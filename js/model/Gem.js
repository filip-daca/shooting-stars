/* exported Gem */
var Gem = (function (window) {

	function Gem(x, y, vX, vY) {
		this.Shape_constructor();
		this.x = x;
		this.y = y;
		this.vX = vX / 2;
		this.vY = vY / 2;
		this.size = 5;
		this.hit = 20;
		this.activate();
	}
	var p = createjs.extend(Gem, createjs.Shape);

	Gem.COLOR = "#00FF00";
	Gem.GLOW_INTERVAL = 20;
	Gem.GLOW_SIZE = 30;

	p.size;
	p.bounds;
	p.active;
	p.glowTimer;
	p.gemGlow;
	p.hit;

	p.activate = function() {
		this.bounds = this.size;
		this.glowTimer = Gem.GLOW_INTERVAL;
		this.getShape();
		this.active = true;
	};

	p.getShape = function() {
		this.graphics
			.beginStroke(Gem.COLOR)
			.drawCircle(0, 0, this.size);
		
		this.cache(-this.bounds * 2, -this.bounds * 2, this.bounds * 4, this.bounds * 4);
	};

	p.tick = function() {
		this.move();
		this.glow();
	};

	p.move = function() {
		this.x += this.vX;
		this.y += this.vY;
	};

	p.glow = function() {
		if (this.glowTimer == 0) {
			this.gemGlow = new RoundGlow(this.x, this.y, Gem.GLOW_SIZE, Gem.COLOR);
			this.glowTimer = Gem.GLOW_INTERVAL;
		} else {
			this.glowTimer--;
		}
	};

	p.collect = function() {
		Gems.setGemSpawned(false);
		Hud.addGemScore();
	};

	window.Gem = createjs.promote(Gem, "Shape");
	return Gem;
}(window));