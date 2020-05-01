/**
 * Template per P5JS
 * Reference: https://p5js.org/reference/
 */

// funzione d’inizio
function setup(){
	// creiamo un'applicazione della dimensione della finestra
	createCanvas(windowWidth, windowHeight)
	smooth()
}

// funzione di loop
function draw(){
	background(0)

	stroke(255)
	noFill()
	translate(width/2, height/2)

	const scale = min(width, height) / 100

	const cx = map(mouseX, 0, width, -1, 1) * scale * 0.02
	const cy = map(mouseY, 0, height, -1, 1) * scale * 0.02

	const s1 = map(sin(frameCount * 0.009), -1, 1, scale * 5, scale * 25)
	const num = 180
	const ang = sin(frameCount * 0.0013) * 0.02
	const lati = 5//map(sin(frameCount * 0.0011), -1, 1, 3, 12)
	for (let i=0; i<num; i++){
		const r = map(i*i, 0, pow(num-1, 2), s1, s1 * 40)
		const ex = cx * i * i
		const ey = cy * i * i
		poly(ex, ey, r, (num-i) * ang, lati)
	}
}

function poly(x, y, r, rot, res) {
	beginShape()
	for (let i=0; i<res; i++) {
		const a = TAU / res * i + rot - HALF_PI
		vertex(x + Math.cos(a) * r, y + Math.sin(a) * r)
	}
	endShape(CLOSE)
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

