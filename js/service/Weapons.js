const MiniGun = {

	bulletSpeed: 11,
	bulletSize: 3,
	bulletColor: "#FF33FF",
	bulletTime: 10,
	nextBullet: 0,
	name: "Minigun",
	
	fire: function(ship) {
		var bullet = new Bullet(this.bulletSpeed, this.bulletSize, this.bulletColor);
		bullet.activate(ship.x, ship.y, ship.rotation);
		Bullets.addBullet(bullet);
		Sound.playEffect("minigun");
	}, 	
};

const ShotGun = {

	bulletSpeed: 9,
	bulletSize: 3,
	bulletColor: "#AA66FF",
	bulletTime: 20,
	nextBullet: 0,
	name: "Shotgun",
	
	fire: function(ship) {
		var i = 5;
		while (i > 0) {
			var bullet = new Bullet(this.bulletSpeed, this.bulletSize, this.bulletColor);
			bullet.activate(ship.x, ship.y, ship.rotation + i * 3 - 9);
			Bullets.addBullet(bullet);
			i--;
		}

		Sound.playEffect("shotgun");
	}, 	
};

const ChainGun = {

	bulletSpeed: 9,
	bulletSize: 1,
	bulletColor: "#88AAFF",
	bulletTime: 1,
	nextBullet: 0,
	name: "Chaingun",
	
	fire: function(ship) {
		let bullet = new Bullet(this.bulletSpeed, this.bulletSize, this.bulletColor);
		bullet.activate(ship.x, ship.y, ship.rotation + (Math.random() * 12 - 6));
		Bullets.addBullet(bullet);
		Sound.playEffect("chaingun");
	}, 	
};

const RailGun = {

	bulletSpeed: 30,
	bulletSize: 5,
	bulletColor: "#2d4cff",
	bulletTime: 40,
	nextBullet: 0,
	name: "Railgun",

	fire: function(ship) {
		let bullet = new Bullet(this.bulletSpeed, this.bulletSize, this.bulletColor);
		bullet.collideWithRock = function () {};
		bullet.activate(ship.x, ship.y, ship.rotation);
		Bullets.addBullet(bullet);
	},
};

const FlameThrower = {

	bulletSpeed: 11,
	bulletSize: 4,
	bulletColor: "#ff7700",
	bulletTime: 1,
	nextBullet: 0,
	name: "FlameThrower",

	fire: function(ship) {
		let bullet = new Bullet(this.bulletSpeed, this.bulletSize, this.bulletColor);
		bullet.collideWithRock = function () {};
		bullet.entropy = 20;
		bullet.activate(ship.x, ship.y, ship.rotation + (Math.random() * 20 - 10));
		Bullets.addBullet(bullet);
	},
};


const Weapons = {

	allWeapons: [],
	
	init: function() {
		Weapons.allWeapons[0] = MiniGun;
		Weapons.allWeapons[1] = ShotGun;
		Weapons.allWeapons[2] = ChainGun;
		Weapons.allWeapons[3] = RailGun;
		Weapons.allWeapons[4] = FlameThrower;
	},

};