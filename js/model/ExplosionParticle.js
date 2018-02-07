(function (window) {
	
	function ExplosionParticle() {
		this.Shape_constructor();		
		this.activate();
	}
	var p = createjs.extend(ExplosionParticle, createjs.Shape);
	
	ExplosionParticle.COLOR = "#888888";
	ExplosionParticle.ENTROPY = 40;
	ExplosionParticle.TIME = 60;
	ExplosionParticle.SPEED = 10;
	ExplosionParticle.THRUST = 0.92;
	ExplosionParticle.SIZE = 1;
	
	p.size;
	p.bounds;
	p.active;
	
	p.activate = function(x, y) {
		this.size = ExplosionParticle.SIZE;
		this.bounds = this.size;
		this.x = x;
		this.y = y;
		this.rotation = (Math.random() * 360);
		this.entropy = ExplosionParticle.ENTROPY * Math.random();
		this.vX = -Math.sin(this.rotation * (Math.PI / -180)) * ExplosionParticle.SPEED * Math.random();
		this.vY = -Math.cos(this.rotation * (Math.PI / -180)) * ExplosionParticle.SPEED * Math.random();
		
		this.getShape();
		
		this.active = true;
	};
	
	p.getShape = function() {
		this.graphics
			.beginStroke(ExplosionParticle.COLOR)
			.moveTo(-1, 0)
			.lineTo(0, 0);
	};
	
	p.tick = function(event) {
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
		
		this.vX *= ExplosionParticle.THRUST;
		this.vY *= ExplosionParticle.THRUST;
	};
	
	window.ExplosionParticle = createjs.promote(ExplosionParticle, "Shape");
	
}(window));