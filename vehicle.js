// Based on code by Daniel Shiffman

function Vehicle(x, y, px, py) {
	if (px === null && py === null) {
		this.pos = createVector(width / 2, height / 2);
	} else {
		this.pos = createVector(px, py);
	}
	this.target = createVector(x, y);
	this.vel = p5.Vector.random2D();
	this.acc = createVector();
	this.r = 8;
	this.maxspeed = 10;
	this.maxforce = 1;
}

Vehicle.prototype.behaviors = function() {
	var arrive = this.arrive(this.target);
	var mouse = createVector(mouseX, mouseY);
	if (mouseIsPressed) {
		var flee = this.flee(mouse);
		flee.mult(5);
		this.applyForce(flee);
	}

	arrive.mult(1);

	this.applyForce(arrive);
};

Vehicle.prototype.applyForce = function(f) {
	this.acc.add(f);
};

Vehicle.prototype.update = function() {
	this.pos.add(this.vel);
	this.vel.add(this.acc);
	this.acc.mult(0);
};

Vehicle.prototype.show = function() {
	stroke(0);
	strokeWeight(this.r);
	point(this.pos.x, this.pos.y);
};

Vehicle.prototype.arrive = function(target) {
	var desired = p5.Vector.sub(target, this.pos);
	var d = desired.mag();
	var speed = this.maxspeed;
	if (d < 100) {
		speed = map(d, 0, 100, 0, this.maxspeed);
	}
	desired.setMag(speed);
	var steer = p5.Vector.sub(desired, this.vel);
	steer.limit(this.maxforce);
	return steer;
};

Vehicle.prototype.flee = function(target) {
	var desired = p5.Vector.sub(target, this.pos);
	var d = desired.mag();
	if (d < 50) {
		desired.setMag(this.maxspeed);
		desired.mult(-1);
		var steer = p5.Vector.sub(desired, this.vel);
		steer.limit(this.maxforce);
		return steer;
	} else {
		return createVector(0, 0);
	}
};
