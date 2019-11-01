/* exported ExhaustParticle */
const ExhaustParticle = (function (window) {
	
	function ExhaustParticle() {
		this.Shape_constructor();		
		this.activate();
	}
	const p = createjs.extend(ExhaustParticle, createjs.Shape);
	
	ExhaustParticle.COLOR = "#666666";
	ExhaustParticle.ENTROPY = 40;
	ExhaustParticle.TIME = 60;
	ExhaustParticle.SPEED = 10;
	ExhaustParticle.THRUST = 0.92;
	ExhaustParticle.SIZE = 2;
	
	p.size;
	p.bounds;
	p.active;
	
	p.activate = function(x, y, rotation) {
		this.size = ExhaustParticle.SIZE;
		this.bounds = this.size;
		this.x = x - Math.sin(rotation * (Math.PI / -180)) * 13;
		this.y = y - Math.cos(rotation * (Math.PI / -180)) * 13;
		this.rotation = rotation + (Math.random() * 12 - 6);
		this.entropy = ExhaustParticle.ENTROPY;
		this.vX = -Math.sin(this.rotation * (Math.PI / -180)) * ExhaustParticle.SPEED;
		this.vY = -Math.cos(this.rotation * (Math.PI / -180)) * ExhaustParticle.SPEED;
		
		this.getShape();
		
		this.active = true;
	};
	
	p.getShape = function() {
		this.graphics
			.beginStroke(ExhaustParticle.COLOR)
			.beginFill(ExhaustParticle.COLOR)
			.drawCircle(0,0,ExhaustParticle.SIZE);

		this.cache(-this.bounds*2, -this.bounds*2, this.bounds*4, this.bounds*4);
	};
	
	p.tick = function() {
		if (Engine.outOfBounds(this, this.bounds)) {
			Engine.placeInBounds(this, this.bounds);
		}
		
		this.move();
		
		if (--this.entropy <= 0) {
			Engine.remove(this);
		}
	};
	
	p.move = function () {
		this.x += this.vX;
		this.y += this.vY;
		
		this.vX *= ExhaustParticle.THRUST;
		this.vY *= ExhaustParticle.THRUST;
	};
	
	window.ExhaustParticle = createjs.promote(ExhaustParticle, "Shape");
	
	return ExhaustParticle;
}(window));