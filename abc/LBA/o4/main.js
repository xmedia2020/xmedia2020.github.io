let x;
let y;
let outsideRadius = 150;
let insideRadius = 100;

function setup(){
	// creiamo un'applicazione della dimensione della finestra
	createCanvas(windowWidth, windowHeight)

  	background(0);
  	x = width / 2;
  	y = height / 2;
}

// funzione di loop
function draw(){
	background(0)


  	let numPoints = int(map(mouseX, 0, width, 6, mouseY));
    
  	let angle = 0;
  	let angleStep = 180.0 / numPoints;

  	beginShape(TRIANGLE_STRIP);
  	fill(255)
  	stroke(0)
  	strokeWeight(1.5)

  	for (let i = 0; i <= numPoints; i++) {
	    let px = x + cos(radians(angle)) * outsideRadius 
	    let py = y + sin(radians(angle)) * outsideRadius 
	    angle += angleStep;
	    vertex(px, py);
	    px = x + cos(radians(angle)) * insideRadius + random(-0.5,0.5);;
	    py = y + sin(radians(angle)) * insideRadius + random(-0.5,0.5);;
	    vertex(px, py);
	    angle += angleStep;
  	}
  	endShape();


}

// -- EVENTI ----------------------------------

function windowResized(){
	// importante: il canvas deve essere ridimensionato assieme alla finestra
	resizeCanvas(windowWidth, windowHeight)
}

function keyPressed(){
	if (key == 's' || key == 'S') {
    saveCanvas('O', 'png');
  } else if (key == 'x' || key == 'X'){
    setup()
  }

  return false;

}

function keyReleased(){

}

function mousePressed(){

}

function mouseReleased(){

}

function mouseMoved(){

}

