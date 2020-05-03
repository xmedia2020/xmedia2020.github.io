/**
 * Template per P5JS
 * Reference: https://p5js.org/reference/
 */

// funzione d’inizio
function setup(){
	// creiamo un'applicazione della dimensione della finestra
	createCanvas(windowWidth, windowHeight)
}

// funzione di loop
function draw(){
	background(0)

	let relativeX = mouseX-width/2
	let relativeY = mouseY-height/2

	translate(width/2, height/2)
	stroke(255)
	noFill()
	beginShape();
	for(let i =0; i< TWO_PI; i+=0.2){
		let r = random(relativeX*0.9,relativeY*0.9);
		let x = r * (cos(i));
		let y = r * (sin(i));
		vertex(x,y);
	}
	endShape(CLOSE);
}

// -- EVENTI ----------------------------------

function windowResized(){
	// importante: il canvas deve essere ridimensionato assieme alla finestra
	resizeCanvas(windowWidth, windowHeight)
}

function keyPressed(){

}

function keyReleased(){

}

function mousePressed(){

}

function mouseReleased(){

}

function mouseMoved(){

}

