function setup() {
createCanvas(windowWidth, windowHeight);
frameRate(20)
}

function draw() {
  background(0);
  noFill()
  stroke(255)
  strokeWeight(28)
  ellipse( windowWidth/2, windowHeight/2, 300, 340);

  let a = atan2(mouseY - height / 2, mouseX - width / 2);
  translate(width / 2, height / 2);
  
  angleMode(RADIANS); 
  rotate(a); 
  rect(-215, -4, 90, 3); 

}
