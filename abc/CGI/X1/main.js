function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(20);
}

function draw() {
  background(0,140);

  angleMode(DEGREES); 
  let a = atan2(mouseY - height / 2, mouseX - width / 2);
  translate(width / 2, height / 2);
  push();
  rotate(a);
  noStroke()
  rect(-350, -5, 700, 65); 
  pop();
  angleMode(DEGREES); 
  rotate(-a);
  noStroke() 
  rect(-350, -5, 700, 65); 
}