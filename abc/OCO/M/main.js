/**
 * Template per P5JS
 * Reference: https://p5js.org/reference/
 */

let img;
let pg;
let textTexture;
let boxSize = 400;
let tSize = 500


let indexWord = 0;
let words = ["M"];


// funzione d’inizio
function setup(){
	// creiamo un'applicazione della dimensione della finestra
	//createCanvas(windowWidth, windowHeight)

	createCanvas(windowWidth, windowHeight,WEBGL);
	pg = createGraphics(100, 100);

	pg.image = (img);

	//let boxSize = min(height, width)/2
	//let tSize = min(height, width)/2
	textTexture = createGraphics(boxSize,boxSize);
	textTexture.background(0);
	textTexture.fill(255);
	textTexture.textAlign(CENTER);
	textTexture.textSize(tSize);



}

// funzione di loop
function draw(){
	background(0)
	noStroke()

	let wave = (sin(frameCount * 0.05 +350)*3);

	textTexture.background(0);
	textTexture.translate(0,wave);
	
	
	textTexture.text(words[indexWord], 200,400);
	
	let rotX = map(mouseX, 0,width, 0, 720)
	let rotY = map(mouseY, height,0, 0, 720)

	push();
	rotateZ(radians(45));
		push();
		rotateX(rotX * 0.01);
		rotateY(rotY * 0.01);
		texture(textTexture);
		box(boxSize);
		pop();
	pop();

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