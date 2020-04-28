/**
 * Template per P5JS
 * Reference: https://p5js.org/reference/
 */

let px = 0
let py = 0
let d = 0

let value = 0

const hasTouch = 'ontouchstart' in window


let puntiV = [
	-0.208, -1.157,
	 0.208, -1.157,
	 0.208,  1.518,
	-0.208,  1.518,
];

let puntiO = [
	-1.231, -1.518,
	 1.231, -1.518,
	 1.231, -1.157,
	-1.231, -1.157, 
];

// funzione d’inizio
function setup(){
	// creiamo un'applicazione della dimensione della finestra
	createCanvas(windowWidth, windowHeight);
	background(0);

	fill (255);
	noStroke();
	// textAlign(CENTER, CENTER);
  	textSize(20);
  	text ('Doppio touch', 20, 40);

	push();
	translate(width/2, height/2);
	const scale = min(width, height) / 100;
	const d = scale * 15.0;
	beginShape();
	for(let z = 0; z < puntiO.length; z = z + 2){
		let x = puntiO[z] * d;
		let y = puntiO[z+1] * d;
		vertex(x ,y);
	}
	endShape(CLOSE);
	pop();

	push()
	translate(width/2, height/2);
	for(let j=0; j<10; j++){
		push();
		beginShape();
		for(let i = 0; i < puntiV.length; i = i + 2){
			let x = puntiV[i] * d;
			let y = puntiV[i+1] * d;
			vertex(x ,y);
		}
		endShape(CLOSE);
		pop();
	}
}

// funzione di loop
function draw(){
	// background(0)
	fill(255)
	noStroke();

	push();
	translate(width/2, height/2);
	const scale = min(width, height) / 100;
	const d = scale * 15.0;

	let yO = (puntiV[5] - puntiV[1])* d;
	// console.log(yO);
	pop();


	if (hasTouch) {
		if (touches.length >= 2) {
			background(0);
			// condizioni punti touch
			let px= touches[0].x
			let py= touches[0].y
			let dx= touches[1].x
			let dy= touches[1].y

			// distanza tra i due punti
			let deltaX = dx - px
			let deltaY = dy - py

			// distanza tra i due punti
			let d = dist (dx, dy, px, py)

			push();
			translate(width/2, height/2);
			fill(255)
			rectMode(CENTER);
			rect(0, 0 - yO/2, deltaX, deltaY);
			pop();
		}

		push()
		translate(width/2, height/2);
		for(let j=0; j<10; j++){
		push();
		beginShape();
		for(let i = 0; i < puntiV.length; i = i + 2){
			let x = puntiV[i] * d;
			let y = puntiV[i+1] * d;
			vertex(x ,y);
		}
		endShape(CLOSE);
		pop();
		}
	}	
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