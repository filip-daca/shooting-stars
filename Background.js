var Background = {
	
	timeToStar: 2,
	nextStar: 0,
	starBelt: [],
	
	tick: function(event) {
		//handle new stars
		if (Background.nextStar <= 0) {
			Background.timeToStar -= 2;
			Background.addStar();
			Background.nextStar = Background.timeToStar + Background.timeToStar * Math.random();
		} else {
			Background.nextStar--;
		}
		
		//handle stars
		for (star in Background.starBelt) {
			var o = Background.starBelt[star];
			if (!o || !o.active) {
				continue;
			}
			
			//handle stars movement and looping
			if (outOfBounds(o, o.bounds)) {
				stage.removeChild(o);
				o.active = false;
			}
			
			//move by velocity
			o.x -= o.v;
		}
	},
	
	addStar: function() {
		var i = 0;
		var len = Background.starBelt.length;

		//pooling approach
		while (i <= len) {
			if (!Background.starBelt[i]) {
				Background.starBelt[i] = new createjs.Shape();
				break;
			} else if (!Background.starBelt[i].active) {
				Background.starBelt[i].active = true;
				break;
			} else {
				i++;
			}
		}

		if (len == 0) {
			Background.starBelt[0] = new createjs.Shape();
		}

		stage.addChild(Background.starBelt[i]);
		
		var o = Background.starBelt[i];
		var size = Math.random() * 4;
		o.x = canvas.width;
		o.y = canvas.height * Math.random();
		o.v = 5 * Math.random() + size*10;
		o.active = true;

		//draw smoke particle
		o.graphics.beginStroke("#666666").beginFill("#666666").drawCircle(0,0,size);
		
		o.cache(-size-1,-size-1,size*2+2,size*2+2);
	},
};