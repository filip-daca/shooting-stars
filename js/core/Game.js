/* exported Game */
const Game = (function() {

	const difficulty = 2;
	let stage = null;

	function hasAnyInitErrors() {
		if (!createjs.Sound.initializeDefaultPlugins()) {
			document.getElementById("error").style.display = "block";
			document.getElementById("content").style.display = "none";
			return true;
		}
		if (createjs.BrowserDetect.isIOS || createjs.BrowserDetect.isAndroid || createjs.BrowserDetect.isBlackberry) {
			document.getElementById("mobile").style.display = "block";
			document.getElementById("content").style.display = "none";
			return true;
		}
		return false;
	}

	function tick(event) {
		Background.tick(event);
		Bullets.tick(event);
		ExhaustParticles.tick(event);
		ExplosionParticles.tick(event);
		Gems.tick(event);
		Player.tick(event);
		SpaceRocks.tick(event);

		stage.update(event);
	}

	function initAllModules() {
		Core.init();

		Controller.init();
		Engine.init();
		Hud.init();
		Loader.init();
		MainMenu.init();
		Sound.init();

		Background.init();
		Bullets.init();
		ExhaustParticles.init();
		ExplosionParticles.init();
		Gems.init();
		Player.init();
		SpaceRocks.init();
		Weapons.init();
	}

	return {
		init: function() {
			initAllModules();
			if (hasAnyInitErrors()) {
				return;
			}
			stage = Core.getStage();
			MainMenu.loadGame();
		},

		// reset all game logic
		restart: function() {
			// hide anything on stage and show the score
			stage.removeAllChildren();

			Hud.create();
			Hud.clearScore();
			
			Bullets.reinit();
			ExhaustParticles.reinit();
			ExplosionParticles.reinit();
			Gems.reinit();
			SpaceRocks.reinit();

			// create the player
			Player.create();

			// reset key presses
			Controller.clearState();

			// ensure stage is blank and add the ship
			stage.clear();
			stage.addChild(Player.getShip());

			// start game timer
			createjs.Ticker.framerate = 60;
			if (!createjs.Ticker.hasEventListener("tick")) {
				createjs.Ticker.addEventListener("tick", tick);
			}
		},

		getDifficulty: function() {
			return difficulty;
		},
	};
})();

$(function() {
	Game.init();
});