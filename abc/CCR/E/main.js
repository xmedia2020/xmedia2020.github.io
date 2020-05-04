// https://p5js.org/reference/

// punti array
let puntiE = [
	-1.117, -1.518,
 	 1.086, -1.518,
 	 1.086, -1.146,
	-0.716, -1.146,
	-0.716,  1.157,
 	 1.117,  1.157,
 	 1.117,  1.518,
	-1.117,  1.518,
];

let puntiO = [
	-0.716, -0.224,
 	 0.950, -0.224,
 	 0.950,  0.127,
	-0.716,  0.127, 
];

let yR;
let xR;

// funzione d’inizio
function setup(){
	// creiamo un'applicazione della dimensione della finestra
	createCanvas(windowWidth, windowHeight);
}

// funzione di loop
function draw(){
	background(0)
	fill(255);
	noStroke();

	// trovo dimensione minima del canvas
	const scale = min(width, height) / 100;
	const d = scale * 15.0;
	let dx = puntiO[0] * d;
	let dy = (puntiO[7] - puntiO[1]) * d;

	xR = dx - 2 + width/2;
	yR = (puntiE[9] - puntiE[1])*d - dy*4.5;
	// yR = puntiE[8] - puntiE[6];
	let mx = map(mouseX, xR, width, 0, width/2-dx, true);
	let my = map(mouseY, 0, height, -dy/2, height-dy, true);
	// if(mouseX > xR && mouseY < height/2+puntiE[11]*d+dy/2 && mouseY > height/2+puntiE[1]*d+dy){
	if(mouseX > xR){
		if(mouseY-dy/2 > height/2 + puntiE [11] *d -dy){
			my = height/2 + puntiE[11] * d - dy;
		} else if (mouseY-dy/2 < height/2 + puntiE[5]*d ){
			my = height/2+puntiE[1]*d + dy;
		}
		rect( xR, my, mx, dy);
	}
	
	// desegno serie di punti
	push();
	translate(width/2, height/2);
	beginShape();
	for(let z = 0; z < puntiE.length; z = z + 2){
		let x = puntiE[z] * d;
		let y = puntiE[z+1] * d;
		vertex(x ,y);
	}
	endShape(CLOSE);
	pop();
}

// -- EVENTI ----------------------------------

function windowResized(){
	// importante: il canvas deve essere ridimensionato assieme alla finestra
	resizeCanvas(windowWidth, windowHeight)
}

// funzione salva
function keyPressed(){
	if (key == 's' || key == 'S') {
		saveCanvas('E', 'png');
	}
	return false;
}