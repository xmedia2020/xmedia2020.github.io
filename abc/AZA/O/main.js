/**
 * Template per P5JS
 * Reference: https://p5js.org/reference/
 */


function setup(){
	createCanvas(windowWidth, windowHeight)
}

// funzione di loop
function draw(){
	background(0)
	translate(width/2, height/2)

	fill(255)
	noStroke()
	rectMode(CENTER)
	ellipse(0,0,500,500)

	fill(0)
	noStroke()
	rectMode(CENTER)
	ellipse(0, 0, (mouseX-width/2)*2, (mouseY-height/2)*2, 50, 50)
}


// -- EVENTI ----------------------------------

function windowResized(){
	resizeCanvas(windowWidth, windowHeight)
}


function keyPressed(){
	if (key == 's' || key == 'S') {
    saveCanvas('o', 'png');
  } else if (key == 'x' || key == 'X'){
    setup()
  }

  return false;

}
