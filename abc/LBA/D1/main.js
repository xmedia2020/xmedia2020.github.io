/**
 * D1
 *
 */





function setup() {
  createCanvas(windowWidth, windowHeight)
  strokeCap(ROUND);
    stroke(255)

}

function draw() {
  background(0);
  

  translate(width / 2 - (Math.abs(map(mouseX,width/2,width, 0,250)))/2, height /2  );
  rotate(TAU-TAU/4)

  let raggi = int(map(mouseY, 0, height, 2, 50));
  let radius = Math.abs(map(mouseX,width/2,width, 0,250));
  let angle = TAU/2 / raggi;

  //strokeWeight(mouseY / 20);
  strokeWeight(map(mouseY, 0, height, 2,15));

  for (let i = 0; i <= raggi; i++) {
    let x = cos(angle * i) * radius;
    let y = sin(angle * i) * radius;
    line(0, 0, x, y);
  }
}





// -- EVENTI ----------------------------------

function windowResized(){
	// importante: il canvas deve essere ridimensionato assieme alla finestra
	resizeCanvas(windowWidth, windowHeight)
}

function keyPressed(){
	if (key == 's' || key == 'S') saveCanvas(gd.timestamp(), 'png');

}

function keyReleased(){

}

function mousePressed(){

}

function mouseReleased(){

}

function mouseMoved(){

}

