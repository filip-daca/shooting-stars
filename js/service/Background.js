/* exported Background */
const Background = (function() {

	let s;
	let timeToStar;
	let nextStar;
	const allStars = new Set();

	function reinit() {
		timeToStar = 2;
		nextStar = 0;
		allStars.clear();
	}

	function tickNewStars() {
		if (nextStar <= 0) {
			timeToStar -= 2;
			Background.addStar();
			nextStar = timeToStar + timeToStar * Math.random();
		} else {
			nextStar--;
		}
	}
	
	function tickAllStars(event) {
		for (const star of allStars) {
			if (star.active) {
				star.tick(event);
			} else {
				allStars.delete(star);
			}
		}
	}

	return {
		init: function() {
			s = Core.getStage();
			reinit();
		},

		tick: function(event) {
			tickNewStars();
			tickAllStars(event);
		},

		addStar: function() {
			const newStar = new BackgroundStar();
	
			allStars.add(newStar);
			s.addChild(newStar);
			newStar.activate();

			Core.debug("#background-star-count", allStars.size);
		},
	};
})();