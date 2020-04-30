/**
 * Template per P5JS
 * Reference: https://p5js.org/reference/
 */

let puntiL = [
	-0.967, -1.518,
	-0.556, -1.518,
	-0.556,  1.157,
 	 0.967,  1.157,
 	 0.967,  1.518,
	-0.967,  1.518,
];

// funzione d’inizio
function setup(){
	// creiamo un'applicazione della dimensione della finestra
	createCanvas(windowWidth, windowHeight);
}

// funzione di loop
function draw(){
	background(0)
	// fill(255);

	translate(width/2, height/2);

	const scale = min(width, height) / 100;
	const d = scale * 15.0;
	const n = scale * 2.5;

	strokeWeight(2+mouseY*0.0001*d);
	stroke(255);

	let i = mouseX/3 + (puntiL[0]*d);
	let j = mouseY/1.5+(puntiL[1]*d);

	let mx = map(mouseX, width/2+puntiL[0]*d, (puntiL[9]*d)/2+width/2, 0, 12*n, true);

	if(mouseX<width/2+puntiL[0]*d){
		beginShape(LINES);
		vertex(puntiL[0]*d, puntiL[1]*d);
		vertex(puntiL[10]*d, puntiL[11]*d);
		vertex(puntiL[10]*d, puntiL[11]*d);
		vertex(puntiL[8]*d, puntiL[9]*d);
		endShape();
	 }

	for( i=1; i < mx; i = i+n){
		beginShape(LINES);
		vertex(puntiL[0]*d + i, puntiL[1]*d);
		vertex(puntiL[10]*d + i, puntiL[11]*d - i);
		vertex(puntiL[10]*d + i, puntiL[11]*d - i);
		vertex(puntiL[8]*d, puntiL[9]*d - i);
		endShape();
	}
}	


// -- EVENTI ----------------------------------

function windowResized(){
	// importante: il canvas deve essere ridimensionato assieme alla finestra
	resizeCanvas(windowWidth, windowHeight)
}

function keyPressed(){
	if (key == 's' || key == 'S') {
		saveCanvas('L', 'png');
	} else if (key == 'x' || key == 'X'){
		setup()
	}

	return false;
}