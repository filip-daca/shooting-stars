(function (window) {

	function Ship() {
		this.Container_constructor();

		this.shipFlame = new createjs.Shape();
		this.shipBody = new createjs.Shape();

		this.addChild(this.shipFlame);
		this.addChild(this.shipBody);

		this.makeShape();
		this.timeout = 0;
		this.thrust = 0;
		this.vX = 0;
		this.vY = 0;
		
		this.changeWeapon(0);
	}
	var p = createjs.extend(Ship, createjs.Container);

	Ship.COLOR = "#FFFFFF";
	Ship.TURN_FACTOR = 4;
	Ship.TOGGLE = 60;
	Ship.MAX_THRUST = 0.6;
	Ship.MAX_VELOCITY = 5;
	Ship.PUSH_AMMOUNT = 0.3;

	p.shipFlame;
	p.shipBody;
	p.timeout;
	p.thrust;
	p.vX;
	p.vY;
	p.bounds;
	p.hit;
	p.weapon;
	
	p.makeShape = function () {
		this.makeBody();
		this.makeFlame();
		this.bounds = 10;
		this.hit = this.bounds;
	};
	
	p.makeBody = function() {
		var g = this.shipBody.graphics;
		g.clear();
		g.beginStroke(Ship.COLOR);

		g.moveTo(0, 10);
		g.lineTo(5, -6);
		g.lineTo(0, -2);
		g.lineTo(-5, -6);
		g.closePath();

		this.shipBody.cache(-10, -10, 2*10, 2*10, 2);
	};
	
	p.makeFlame = function() {
		var o = this.shipFlame;
		o.scaleX = 0.5;
		o.scaleY = 0.5;
		o.y = -5;

		var g = o.graphics;
		g.clear();
		g.beginStroke(Ship.COLOR);

		g.moveTo(2, 0);
		g.lineTo(4, -3);
		g.lineTo(2, -2);
		g.lineTo(0, -5);
		g.lineTo(-2, -2);
		g.lineTo(-4, -3);
		g.lineTo(-2, -0);

		this.shipFlame.cache(-5, -5, 2*5, 2*5, 2);
	};

	p.tick = function (event) {
		// move by velocity
		this.x += this.vX;
		this.y += this.vY;

		// with thrust flicker a flame every Ship.TOGGLE frames, attenuate thrust
		if (this.thrust > 0) {
			this.timeout++;
			this.shipFlame.alpha = 1;

			if (this.timeout > Ship.TOGGLE) {
				this.timeout = 0;
				if (this.shipFlame.scaleX == 1) {
					this.shipFlame.scaleX = 0.5;
					this.shipFlame.scaleY = 0.5;
				} else {
					this.shipFlame.scaleX = 1;
					this.shipFlame.scaleY = 1;
				}
			}
			this.thrust -= 0.5;
		} else {
			this.shipFlame.alpha = 0;
			this.thrust = 0;
		}
		
		// handle firing
		if (this.weapon.nextBullet <= 0) {
			if (alive && Controller.State.shootHeld) {
				this.weapon.nextBullet = this.weapon.bulletTime;
				this.weapon.fire(this);
			}
		} else {
			this.weapon.nextBullet--;
		}
		
		// handle ship looping
		if (alive && Engine.outOfBounds(this, this.bounds)) {
			Engine.placeInBounds(this, this.bounds);
		}
		
		// handle turning
		if (alive && Controller.State.lfHeld) {
			this.rotation -= Ship.TURN_FACTOR;
		} else if (alive && Controller.State.rtHeld) {
			this.rotation += Ship.TURN_FACTOR;
		}

		// handle thrust
		if (alive && Controller.State.fwdHeld) {
			this.accelerate();
			ExhaustParticles.addParticle(this.x, this.y, this.rotation);
		}
	};

	p.accelerate = function () {
		// increase push amount for acceleration
		this.thrust += this.thrust + Ship.PUSH_AMMOUNT;
		if (this.thrust >= Ship.MAX_THRUST) {
			this.thrust = Ship.MAX_THRUST;
		}

		// accelerate
		this.vX += Math.sin(this.rotation * (Math.PI / -180)) * this.thrust;
		this.vY += Math.cos(this.rotation * (Math.PI / -180)) * this.thrust;

		// cap max speeds
		this.vX = Math.min(Ship.MAX_VELOCITY, Math.max(-Ship.MAX_VELOCITY, this.vX));
		this.vY = Math.min(Ship.MAX_VELOCITY, Math.max(-Ship.MAX_VELOCITY, this.vY));
	};
	
	p.changeWeapon = function (weaponIndex) {
		this.weapon = Weapons.allWeapons[weaponIndex];
	};

	window.Ship = createjs.promote(Ship, "Container");

}(window));