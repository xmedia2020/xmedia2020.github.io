let punti = []

function setup() {
  createCanvas(windowWidth, windowHeight)
  background(0)

  for (let i = 0; i < 100; i++) {
    punti[i] = new crescita(random(width)+2, random(height))
  }
}

function draw() {
  for (let i = 0; i < punti.length; i++) {
    punti[i].update()
    punti[i].show()
  }
}


function crescita(x, y) {
  this.pos = createVector(x, y)
  this.angle = 2
  this.s = 20

  this.update = function() {
   
    this.pos.x += cos(this.angle);
    this.pos.y += sin(this.angle);
    this.angle += random(-0.2, 0.2);
    this.s += 0.1

    this.pos.add(this.acc)


    if (this.x > width) this.x = 0
    if (this.x < 0) this.x = width
    if (this.y > height) y = 0
    if (this.y < 0) y = height
  }

  this.show = function() {
  
    stroke(255)
    textSize(mouseX)
    text("C", this.pos.x, this.pos.y)
    
  }

}

function windowResized(){
	resizeCanvas(windowWidth, windowHeight)
}




