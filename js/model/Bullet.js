/* exported Bullet */
const Bullet = (function (window) {

	function Bullet(speed, size, color) {
		this.Shape_constructor();
		this.speed = speed;
		this.size = size;
		this.color = color;
		this.hit = 0;
		this.activate();
	}
	const p = createjs.extend(Bullet, createjs.Shape);

	p.size;
	p.speed;
	p.color;
	p.bounds;
	p.active;
	p.hit;

	p.activate = function(x, y, rotation) {
		this.bounds = this.size;
		this.x = x + Math.sin(rotation * (Math.PI / -180)) * 18;
		this.y = y + Math.cos(rotation * (Math.PI / -180)) * 18;
		this.rotation = rotation;
		this.vX = Math.sin(this.rotation * (Math.PI / -180)) * this.speed;
		this.vY = Math.cos(this.rotation * (Math.PI / -180)) * this.speed;
		
		this.getShape();
		
		this.active = true;
	};

	p.getShape = function() {
		this.graphics
			.beginStroke(this.color)
			.drawCircle(0, 0, this.size);
		
		this.cache(-this.bounds * 2, -this.bounds * 2, this.bounds * 4, this.bounds * 4);
	};

	p.tick = function() {
		this.x += this.vX;
		this.y += this.vY;

		if (this.entropy === 0) {
			Engine.remove(this);
		} else {
			this.entropy--;
		}

		if (Engine.outOfBounds(this, this.bounds)) {
			Engine.remove(this);
		}
	};

	window.Bullet = createjs.promote(Bullet, "Shape");
	return Bullet;
}(window));