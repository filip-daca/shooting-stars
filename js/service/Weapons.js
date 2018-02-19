var MiniGun = {

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

var ShotGun = {

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

var ChainGun = {

	bulletSpeed: 9,
	bulletSize: 1,
	bulletColor: "#88AAFF",
	bulletTime: 1,
	nextBullet: 0,
	name: "Chaingun",
	
	fire: function(ship) {
		var bullet = new Bullet(this.bulletSpeed, this.bulletSize, this.bulletColor);
		bullet.activate(ship.x, ship.y, ship.rotation + (Math.random() * 12 - 6));
		Bullets.addBullet(bullet);
		Sound.playEffect("chaingun");
	}, 	
};


var Weapons = {

	allWeapons: [],
	
	init: function() {
		Weapons.allWeapons[0] = MiniGun;
		Weapons.allWeapons[1] = ShotGun;
		Weapons.allWeapons[2] = ChainGun;
	},

};