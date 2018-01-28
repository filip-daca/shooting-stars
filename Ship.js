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
	}
	var p = createjs.extend(Ship, createjs.Container);

// public properties:
	Ship.TOGGLE = 60;
	Ship.MAX_THRUST = 2;
	Ship.MAX_VELOCITY = 7;
	Ship.PUSH_AMMOUNT = 0.5;

// public properties:
	p.shipFlame;
	p.shipBody;

	p.timeout;
	p.thrust;

	p.vX;
	p.vY;

	p.bounds;
	p.hit;
	

// public methods:
	p.makeShape = function () {
		//draw ship body
		var g = this.shipBody.graphics;
		g.clear();
		g.beginStroke("#FFFFFF");

		g.moveTo(0, 10);	//nose
		g.lineTo(5, -6);	//rfin
		g.lineTo(0, -2);	//notch
		g.lineTo(-5, -6);	//lfin
		g.closePath(); // nose


		//draw ship flame
		var o = this.shipFlame;
		o.scaleX = 0.5;
		o.scaleY = 0.5;
		o.y = -5;

		g = o.graphics;
		g.clear();
		g.beginStroke("#FFFFFF");

		g.moveTo(2, 0);		//ship
		g.lineTo(4, -3);	//rpoint
		g.lineTo(2, -2);	//rnotch
		g.lineTo(0, -5);	//tip
		g.lineTo(-2, -2);	//lnotch
		g.lineTo(-4, -3);	//lpoint
		g.lineTo(-2, -0);	//ship

		//furthest visual element
		this.bounds = 10;
		this.hit = this.bounds;
	}

	p.tick = function (event) {
		//move by velocity
		this.x += this.vX;
		this.y += this.vY;

		//with thrust flicker a flame every Ship.TOGGLE frames, attenuate thrust
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
		
		//handle firing
		if (Weapons.nextBullet <= 0) {
			if (alive && Controller.State.shootHeld) {
				Weapons.nextBullet = Weapons.Config.BULLET_TIME;
				Weapons.fireShotgun(this);
			}
		} else {
			Weapons.nextBullet--;
		}
	}

	p.accelerate = function () {
		//increase push ammount for acceleration
		this.thrust += this.thrust + Ship.PUSH_AMMOUNT;
		if (this.thrust >= Ship.MAX_THRUST) {
			this.thrust = Ship.MAX_THRUST;
		}

		//accelerate
		this.vX += Math.sin(this.rotation * (Math.PI / -180)) * this.thrust;
		this.vY += Math.cos(this.rotation * (Math.PI / -180)) * this.thrust;

		//cap max speeds
		this.vX = Math.min(Ship.MAX_VELOCITY, Math.max(-Ship.MAX_VELOCITY, this.vX));
		this.vY = Math.min(Ship.MAX_VELOCITY, Math.max(-Ship.MAX_VELOCITY, this.vY));
		
		//add animation
		p._addSmoke();
	}
	
	p._addSmoke = function() {
		//create smoke particle
		var o = smokeParticles[getSmokeParticle()];
		o.x = ship.x;
		o.y = ship.y;
		o.rotation = ship.rotation + (Math.random() * 16 - 8);
		o.entropy = SMOKE_ENTROPY;
		o.vX = -Math.sin(o.rotation * (Math.PI / -180)) * SMOKE_SPEED;
		o.vY = -Math.cos(o.rotation * (Math.PI / -180)) * SMOKE_SPEED;
		o.active = true;

		//draw smoke particle
		o.graphics.beginStroke("#888888").beginFill("#888888").drawCircle(0,0,2);
	}

	window.Ship = createjs.promote(Ship, "Container");

}(window));