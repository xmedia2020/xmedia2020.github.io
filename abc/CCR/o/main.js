// https://p5js.org/reference/
// https://www.instagram.com/p/BwS4TcxHtk8/

function setup(){
	createCanvas(windowWidth, windowHeight);
}

function draw(){
	background(0);
	noFill();
	stroke(255);
	strokeWeight(1);

	// trovo il centro
	const centro_x = width / 2
	const centro_y = height / 2

	let s = min(width, height)/ 80;
	// console.log(s)

	// disegno raggi
	for (let i=0; i<TAU*7; i++){
		const raggio =  s + 10 * s/2
		const raggio1 = raggio + s*5
		const raggio2 = raggio1+ s*5
		const raggio3 = raggio2+ s*5
		const raggio4 = raggio3+ s*5
		const raggio5 = raggio4+ s*5

		const angolo = mouseX * 0.001 * mouseY * 0.001
		const angolo1 = mouseX * 0.001*  mouseY * -0.001

		const x = centro_x + cos(angolo+i) * raggio
		const x1 = centro_x + cos(angolo+i) * raggio1
		const y = centro_y + sin(angolo+i) * raggio
		const y1 = centro_y + sin(angolo+i) * raggio1
		line(x,y,x1,y1);

		const x2 = centro_x + cos(angolo1+i) * raggio1
		const x3 = centro_x + cos(angolo1+i) * raggio2
		const y2 = centro_y + sin(angolo1+i) * raggio1
		const y3= centro_y + sin(angolo1+i) * raggio2
		line(x2,y2,x3,y3);

		const x4 = centro_x + cos(angolo+i) * raggio2
		const x5 = centro_x + cos(angolo+i) * raggio3
		const y4 = centro_y + sin(angolo+i) * raggio2
		const y5= centro_y + sin(angolo+i) * raggio3
		line(x4,y4,x5,y5);

		const x6 = centro_x + cos(angolo1+i) * raggio3
		const x7 = centro_x + cos(angolo1+i) * raggio4
		const y6 = centro_y + sin(angolo1+i) * raggio3
		const y7= centro_y + sin(angolo1+i) * raggio4
		line(x6,y6,x7,y7);		

		const x8 = centro_x + cos(angolo+i) * raggio4
		const x9 = centro_x + cos(angolo+i) * raggio5
		const y8 = centro_y + sin(angolo+i) * raggio4
		const y9 = centro_y + sin(angolo+i) * raggio5
		line(x8,y8,x9,y9);
	}
}

// -- EVENTI ----------------------------------

function windowResized(){
	resizeCanvas(windowWidth, windowHeight)
}

// funzione salva
function keyPressed(){
	if (key == 's' || key == 'S') {
		saveCanvas('o', 'png');
	}
}
