var Background = {
	
	Config: {
	},
		
	timeToStar: 2,
	nextStar: 0,
	allStars: [],
	
	tick: function(event) {
		Background.tickNewStars();
		Background.tickAllStars(event);
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
	
	tickAllStars: function(event) {
		for (star in Background.allStars) {
			var o = Background.allStars[star];
			if (!o || !o.active) {
				continue;
			}
			o.tick(event)
		}
	},
		
	addStar: function() {
		var i = 0;
		var len = Background.allStars.length;
		var newStar;

		// pooling approach
		while (i <= len) {
			if (!Background.allStars[i]) {
				Background.allStars[i] = new BackgroundStar();
				newStar = Background.allStars[i];
				break;
			} else if (!Background.allStars[i].active) {
				newStar = Background.allStars[i];
				break;
			} else {
				i++;
			}
		}
		
		if (DEBUG) {
			$("#background-star-count").text(len);
		}

		stage.addChild(newStar);
		newStar.activate();
	},
};