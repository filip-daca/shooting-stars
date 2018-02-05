var DEBUG = true;

var DIFFICULTY = 2;			//how fast the game gets more difficult
var SUB_ROCK_COUNT = 4;		//how many small rocks to make on rock death

var manifest;           // used to register sounds for preloading
var preload;

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

	SpaceRocks.init();
	Weapons.init();
	ExhaustParticles.init();

	//create the player
	alive = true;
	ship = new Ship();
	ship.x = canvas.width / 2;
	ship.y = canvas.height / 2;

	//reset key presses
	Controller.clearState();

	//ensure stage is blank and add the ship
	stage.clear();
	stage.addChild(ship);

	//start game timer
	createjs.Ticker.framerate = 60;
	if (!createjs.Ticker.hasEventListener("tick")) {
		createjs.Ticker.addEventListener("tick", tick);
	}
}

function tick(event) {
	ship.tick(event);
	SpaceRocks.tick(event);
	Weapons.tick(event);
	Background.tick(event);
	ExhaustParticles.tick(event);
	ExplosionParticles.tick(event);
	
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

function addScore(value) {
	//trust the field will have a number and add the score
	scoreField.text = (Number(scoreField.text) + Number(value)).toString();
}