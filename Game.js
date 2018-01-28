var DIFFICULTY = 2;			//how fast the game gets mor difficult
var ROCK_TIME = 110;		//aprox tick count until a new asteroid gets introduced
var SUB_ROCK_COUNT = 4;		//how many small rocks to make on rock death

var SMOKE_ENTROPY = 20;		//how much energy a bullet has before it runs out.
var SMOKE_TIME = 1;			//ticks between bullets
var SMOKE_SPEED = 15;		//how fast the bullets move
var SMOKE_THRUST = 0.8;		//how fast the bullets move

var TURN_FACTOR = 9;		//how far the ship turns per frame

var manifest;           // used to register sounds for preloading
var preload;

var timeToRock;			//difficulty adjusted version of ROCK_TIME
var nextRock;			//ticks left until a new space rock arrives
var nextStar;

var rockBelt;			//space rock array
var smokeParticles;		//smoke particles array

var canvas;			//Main canvas
var stage;			//Main display stage

var ship;			//the actual ship
var alive;			//wheter the player is alive

var messageField;		//Message display field
var scoreField;			//score Field

var loadingInterval = 0;

//register key functions
document.onkeydown = Controller.handleKeyDown;
document.onkeyup = Controller.handleKeyUp;

function init() {
	if (!createjs.Sound.initializeDefaultPlugins()) {
		document.getElementById("error").style.display = "block";
		document.getElementById("content").style.display = "none";
		return;
	}

	if (createjs.BrowserDetect.isIOS || createjs.BrowserDetect.isAndroid || createjs.BrowserDetect.isBlackberry) {
		document.getElementById("mobile").style.display = "block";
		document.getElementById("content").style.display = "none";
		return;
	}

	canvas = document.getElementById("gameCanvas");
	stage = new createjs.Stage(canvas);
	messageField = new createjs.Text("Loading", "bold 24px Arial", "#FFFFFF");
	messageField.maxWidth = 1000;
	messageField.textAlign = "center";
	messageField.textBaseline = "middle";
	messageField.x = canvas.width / 2;
	messageField.y = canvas.height / 2;
	stage.addChild(messageField);
	stage.update(); 	//update the stage to show text

	// begin loading content (only sounds to load)
	var assetsPath = "sounds/";
	manifest = [
		{id: "begin", src: "start_game.mp3"},
		{id: "break", src: "explosion.wav", data: 6},
		{id: "death", src: "death.ogg"},
		{id: "laser", src: "laser.wav", data: 6},
		{id: "music", src: "music.mp3"}
	];

	createjs.Sound.alternateExtensions = ["mp3", "wav"];
	preload = new createjs.LoadQueue(true, assetsPath);
	preload.installPlugin(createjs.Sound);
	preload.addEventListener("complete", doneLoading); // add an event listener for when load is completed
	preload.addEventListener("progress", updateLoading);
	preload.loadManifest(manifest);
	
	$("#toggle-volume").bind("click", Sound.toggleVolume);
}

function stop() {
	if (preload != null) {
		preload.close();
	}
	createjs.Sound.stop();
}

function updateLoading() {
	messageField.text = "Loading " + (preload.progress * 100 | 0) + "%";
	stage.update();
}

function doneLoading(event) {
	clearInterval(loadingInterval);
	scoreField = new createjs.Text("0", "bold 18px Arial", "#FFFFFF");
	scoreField.textAlign = "right";
	scoreField.x = canvas.width - 20;
	scoreField.y = 20;
	scoreField.maxWidth = 1000;

	messageField.text = "LET'S GO EBIN ADVENTURE: Click to play";

	// start the music
	Sound.startMusic();
	
	watchRestart();
}

function watchRestart() {
	//watch for clicks
	stage.addChild(messageField);
	stage.update(); 	//update the stage to show text
	canvas.onclick = Controller.handleClick;
}

//reset all game logic
function restart() {
	//hide anything on stage and show the score
	stage.removeAllChildren();
	scoreField.text = (0).toString();
	stage.addChild(scoreField);

	//new arrays to dump old data
	rockBelt = [];
	Weapons.init();
	smokeParticles = [];

	//create the player
	alive = true;
	ship = new Ship();
	ship.x = canvas.width / 2;
	ship.y = canvas.height / 2;

	//log time untill values
	timeToRock = ROCK_TIME;
	nextRock = 0;

	//reset key presses
	Controller.clearState();

	//ensure stage is blank and add the ship
	stage.clear();
	stage.addChild(ship);

	//start game timer
	if (!createjs.Ticker.hasEventListener("tick")) {
		createjs.Ticker.addEventListener("tick", tick);
	}
}

function tick(event) {

	//handle turning
	if (alive && Controller.State.lfHeld) {
		ship.rotation -= TURN_FACTOR;
	} else if (alive && Controller.State.rtHeld) {
		ship.rotation += TURN_FACTOR;
	}

	//handle thrust
	if (alive && Controller.State.fwdHeld) {
		ship.accelerate();
	}

	//handle new spaceRocks
	if (nextRock <= 0) {
		if (alive) {
			timeToRock -= DIFFICULTY;	//reduce spaceRock spacing slowly to increase difficulty with time
			var index = getSpaceRock(SpaceRock.LRG_ROCK);
			rockBelt[index].floatOnScreen(canvas.width, canvas.height);
			nextRock = timeToRock + timeToRock * Math.random();
		}
	} else {
		nextRock--;
	}

	//handle ship looping
	if (alive && outOfBounds(ship, ship.bounds)) {
		placeInBounds(ship, ship.bounds);
	}

	//handle spaceRocks (nested in one loop to prevent excess loops)
	for (spaceRock in rockBelt) {
		var o = rockBelt[spaceRock];
		if (!o || !o.active) {
			continue;
		}

		//handle spaceRock movement and looping
		if (outOfBounds(o, o.bounds)) {
			placeInBounds(o, o.bounds);
		}
		o.tick(event);

		//handle spaceRock ship collisions
		if (alive && o.hitRadius(ship.x, ship.y, ship.hit)) {
			breakRock(o);
			continue;
		}
		
		//handle spaceRock bullet collisions
		for (bullet in Weapons.bulletStream) {
			var p = Weapons.bulletStream[bullet];
			if (!p || !p.active) {
				continue;
			}

			if (o.hitPoint(p.x, p.y)) {
				breakRock(o);

				// remove
				stage.removeChild(p);
				Weapons.bulletStream[bullet].active = false;
			}
		}
	}
	
	//handle smoke
	for (particle in smokeParticles) {
		var o = smokeParticles[particle];
		if (!o || !o.active) {
			continue;
		}
		
		//handle spaceRock movement and looping
		if (outOfBounds(o, o.bounds)) {
			placeInBounds(o, o.bounds);
		}
		
		//move by velocity
		o.x += o.vX;
		o.y += o.vY;
		
		//accelerate
		o.vX *=  SMOKE_THRUST;
		o.vY *=  SMOKE_THRUST;
		
		if (--o.entropy <= 0) {
			stage.removeChild(o);
			o.active = false;
		}
	}

	//call sub ticks
	Weapons.tick(event);
	ship.tick(event);
	Background.tick(event);
	stage.update(event);
}

function playerDies() {
	alive = false;

	stage.removeChild(ship);
	messageField.text = "You're dead:  Click or hit enter to play again";
	stage.addChild(messageField);
	watchRestart();

	//play death sound
	createjs.Sound.play("death", {interrupt: createjs.Sound.INTERRUPT_ANY, volume: Sound.VOLUME});
}

function outOfBounds(o, bounds) {
	//is it visibly off screen
	return o.x < bounds * -2 || o.y < bounds * -2 || o.x > canvas.width + bounds * 2 || o.y > canvas.height + bounds * 2;
}

function placeInBounds(o, bounds) {
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
}

function breakRock(o) {
	var newSize;
	switch (o.size) {
		case SpaceRock.LRG_ROCK:
			newSize = SpaceRock.MED_ROCK;
			break;
		case SpaceRock.MED_ROCK:
			newSize = SpaceRock.SML_ROCK;
			break;
		case SpaceRock.SML_ROCK:
			newSize = 0;
			break;
	}

	//score
	if (alive) {
		addScore(o.score);
	}

	//create more
	if (newSize > 0) {
		var i;
		var index;
		var offSet;

		for (i = 0; i < SUB_ROCK_COUNT; i++) {
			index = getSpaceRock(newSize);
			offSet = (Math.random() * o.size * 2) - o.size;
			rockBelt[index].x = o.x + offSet;
			rockBelt[index].y = o.y + offSet;
		}
	}
	
	o.explode();
	
	// play sound
	createjs.Sound.play("break", {interrupt: createjs.Sound.INTERUPT_LATE, offset: 0.8, volume: Sound.VOLUME});

	//remove
	stage.removeChild(o);
	rockBelt[spaceRock].active = false;
}



function getSpaceRock(size) {
	var i = 0;
	var len = rockBelt.length;

	//pooling approach
	while (i <= len) {
		if (!rockBelt[i]) {
			rockBelt[i] = new SpaceRock(size);
			break;
		} else if (!rockBelt[i].active) {
			rockBelt[i].activate(size);
			break;
		} else {
			i++;
		}
	}

	if (len == 0) {
		rockBelt[0] = new SpaceRock(size);
	}

	stage.addChild(rockBelt[i]);
	return i;
}

function getSmokeParticle() {
	var i = 0;
	var len = smokeParticles.length;

	//pooling approach
	while (i <= len) {
		if (!smokeParticles[i]) {
			smokeParticles[i] = new createjs.Shape();
			break;
		} else if (!smokeParticles[i].active) {
			smokeParticles[i].active = true;
			break;
		} else {
			i++;
		}
	}

	if (len == 0) {
		smokeParticles[0] = new createjs.Shape();
	}

	stage.addChild(smokeParticles[i]);
	return i;
}

function addScore(value) {
	//trust the field will have a number and add the score
	scoreField.text = (Number(scoreField.text) + Number(value)).toString();
}