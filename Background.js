var Background = {
	
	Config: {
		COLOR: "#666666",
		SIZE: 4,
		SPEED: 0.7,
		DEPTH_SPEED_FACTOR: 3,
	},
		
	timeToStar: 2,
	nextStar: 0,
	allStars: [],
	
	tick: function(event) {
		Background.tickNewStars();
		Background.tickAllStars();
	},
	
	tickNewStars: function() {
		if (Background.nextStar <= 0) {
			Background.timeToStar -= 2;
			Background.addStar();
			Background.nextStar = Background.timeToStar + Background.timeToStar * Math.random();
		} else {
			Background.nextStar--;
		}
	},
	
	tickAllStars: function() {
		for (star in Background.allStars) {
			var o = Background.allStars[star];
			if (!o || !o.active) {
				continue;
			}
			
			//handle stars movement and looping
			if (Engine.outOfBounds(o, o.bounds)) {
				Engine.remove(o);
			}
			
			//move by velocity
			o.x -= o.v;
		}
	},
		
	addStar: function() {
		var i = 0;
		var len = Background.allStars.length;

		// pooling approach
		while (i <= len) {
			if (!Background.allStars[i]) {
				Background.allStars[i] = new createjs.Shape();
				break;
			} else if (!Background.allStars[i].active) {
				Background.allStars[i].active = true;
				break;
			} else {
				i++;
			}
		}
		
		if (len == 0) {
			Background.allStars[0] = new createjs.Shape();
		}

		stage.addChild(Background.allStars[i]);
		
		var o = Background.allStars[i];
		var size = Math.random() * Background.Config.SIZE;
		o.x = canvas.width;
		o.y = canvas.height * Math.random();
		o.v = Background.Config.SPEED * Math.random() + size * Background.Config.DEPTH_SPEED_FACTOR;
		o.active = true;

		// draw star
		o.graphics
			.beginStroke(Background.Config.COLOR)
			.beginFill(Background.Config.COLOR)
			.drawCircle(0,0,size);
		
		o.cache(-size-1,-size-1,size*2+2,size*2+2);
	},
};