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

	noFill()
	stroke(255)
	translate(width/2, height/2)

	const scale = min(width, height) / 100

	const cx = map(mouseX, 0, width, -1, 1)
	const cy = map(mouseY, 0, height, -1, 1)

	const s1 = map(sin(frameCount * 0.030), -1, 1, scale * 20, scale * 30)
	const s2 = map(sin(frameCount * 0.035), -1, 1, scale * 30, scale * 60)
	const num = 40
	for (let i=0; i<num; i++){
		const d = map(i, 0, num-1, s1, s2)
		const ex = cx * i * scale * 0.5
		const ey = cy * i * scale * 0.5
		ellipse(ex, ey, d, d)
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

