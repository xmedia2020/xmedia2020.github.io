function Vehicle(x, y) {
  this.pos = createVector(random(width), height);
  this.target = createVector(x, y);
  this.vel = p5.Vector.random2D();
  this.acc = createVector();
  this.r = 1;
  this.maxspeed = 10;
  this.maxforce = 1;
  this.col = color(255);
  this.size = 5
}

Vehicle.prototype.behaviors = function() {
  var arrive = this.arrive(this.target)
  var mouse = createVector(mouseX-width/2, mouseY-height/2);
  var flee = this.flee(mouse);

  arrive.mult(1);
  flee.mult(3);

  this.applyForce(arrive);
  this.applyForce(flee);

}

Vehicle.prototype.applyForce = function(f) {
  this.acc.add(f);
}

Vehicle.prototype.update = function() {
    this.pos.add(this.vel);
    this.vel.add(this.acc);
    this.acc.mult(0);
}

Vehicle.prototype.newTarget = function(x, y) {
  this.target = createVector(x, y);
}


Vehicle.prototype.show = function() {
  stroke(this.col);
  strokeWeight(this.r*0.5);
  noFill()
  textSize(this.size*2)
  textAlign(CENTER, CENTER)
  text(words[index],this.pos.x,this.pos.y)
  //text(index,this.pos.x,this.pos.y)
}


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
}

Vehicle.prototype.flee = function (target) {
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
}