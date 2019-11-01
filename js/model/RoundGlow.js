/* exported RoundGlow */
const RoundGlow = (function (window) {
	function RoundGlow(x, y, size, color) {
		this.Shape_constructor();
		this.size = size;
		this.color = color;
		this.x = x;
		this.y = y;
		this.activate();
	}
	const p = createjs.extend(RoundGlow, createjs.Shape);

	p.activate = function() {
		this.getShape();
		Core.getStage().addChild(this);
		this.active = true;

		createjs.Tween
			.get(this)
			.to({scale: 1.7, alpha: 0,}, 400, createjs.Ease.getPowIn(1))
			.call(function() {Engine.remove(this);});
	};

	p.getShape = function() {
		this.graphics.clear();
		this.graphics
			.beginStroke(Gem.COLOR)
			.drawCircle(0, 0, this.size * 1.5);
	};

	window.RoundGlow = createjs.promote(RoundGlow, "Shape");
	return RoundGlow;
})(window);