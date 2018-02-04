/**
 * 
 */
var Engine = {
	
	init: function() {
		
	},
	
	remove: function(o) {
		o.graphics.clear();
		stage.removeChild(o);
		o.active = false;
	},
	
	outOfBounds: function(o, bounds) {
		// is it visibly off screen
		return o.x < bounds * -2 || o.y < bounds * -2 || o.x > canvas.width + bounds * 2 || o.y > canvas.height + bounds * 2;
	},

	placeInBounds: function(o, bounds) {
		//if its visual bounds are entirely off screen place it off screen on the other side
		if (o.x > canvas.width + bounds * 2) {
			o.x = bounds * -2;
		} else if (o.x < bounds * -2) {
			o.x = canvas.width + bounds * 2;
		}

		//if its visual bounds are entirely off screen place it off screen on the other side
		if (o.y > canvas.height + bounds * 2) {
			o.y = bounds * -2;
		} else if (o.y < bounds * -2) {
			o.y = canvas.height + bounds * 2;
		}
	},
	
};