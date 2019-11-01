/* exported BackgroundStar */
const BackgroundStar = (function (window) {
	
	function BackgroundStar() {
		this.Shape_constructor();		
		this.activate();
	}
	const p = createjs.extend(BackgroundStar, createjs.Shape);
	
	BackgroundStar.COLOR = "#666666";
	BackgroundStar.MAX_SPEED = 0.7;
	BackgroundStar.MAX_SIZE = 4;
	BackgroundStar.DEPTH_SPEED_FACTOR = 3;
	
	p.size;
	p.bounds;
	p.active;
	
	p.activate = function() {
		this.size = Math.random() * BackgroundStar.MAX_SIZE;
		this.bounds = this.size;
		this.x = Core.getCanvas().width;
		this.y = Core.getCanvas().height * Math.random();
		this.v = BackgroundStar.MAX_SPEED * Math.random() + this.size * BackgroundStar.DEPTH_SPEED_FACTOR;
		
		this.getShape();
		
		this.active = true;
	};
	
	p.getShape = function() {
		this.graphics
			.beginStroke(BackgroundStar.COLOR)
			.beginFill(BackgroundStar.COLOR)
			.drawCircle(0, 0, this.size);
		
		this.cache(-this.size, -this.size, this.size*2, this.size*2);
	};
	
	p.tick = function() {
		if (Engine.outOfBounds(this, this.bounds)) {
			Engine.remove(this);
			return;
		} 
		this.move();
	};
	
	p.move = function () {
		this.x -= this.v;
	};
	
	window.BackgroundStar = createjs.promote(BackgroundStar, "Shape");
	
	return BackgroundStar;
}(window));