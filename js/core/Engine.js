/* exported Engine */
var Engine = (function() {
	
	var c;
	var s;

	return {
		init: function() {
			c = Core.getCanvas();
			s = Core.getStage();
		},

		remove: function(o) {
			o.graphics.clear();
			o.active = false;
			s.removeChild(o);
		},
		
		outOfBounds: function(o, bounds) {
			// is it visibly off screen
			return o.x < bounds * -2 || o.y < bounds * -2 || o.x > c.width + bounds * 2 || o.y > c.height + bounds * 2;
		},

		placeInBounds: function(o, bounds) {
			// if its visual bounds are entirely off screen place it off screen on the other side
			if (o.x > c.width + bounds * 2) {
				o.x = bounds * -2;
			} else if (o.x < bounds * -2) {
				o.x = c.width + bounds * 2;
			}

			// if its visual bounds are entirely off screen place it off screen on the other side
			if (o.y > c.height + bounds * 2) {
				o.y = bounds * -2;
			} else if (o.y < bounds * -2) {
				o.y = c.height + bounds * 2;
			}
		},

		hitsRadius: function(o1, o2) {
			// Early returns speed it up
			if (o2.x - o2.hit > o1.x + o1.hit) {
				return;
			}
			if (o2.x + o2.hit < o1.x - o1.hit) {
				return;
			}
	
			if (o2.y - o2.hit > o1.y + o1.hit) {
				return;
			}
	
			if (o2.y + o2.hit < o1.y - o1.hit) {
				return;
			}
	
			// Now do the circle distance test
			return o1.hit + o2.hit > Math.sqrt(Math.pow(Math.abs(o1.x - o2.x), 2) + Math.pow(Math.abs(o1.y - o2.y), 2));
		},
	};
})();