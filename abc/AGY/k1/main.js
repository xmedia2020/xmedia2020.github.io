/**
 * Template per P5JS
 * Reference: https://p5js.org/reference/
 */


let img
const dots = []

function preload(){
	img = loadImage("assets/k_blur.png")
}

function setup(){
	createCanvas(windowWidth, windowHeight)
	reset(dots, img)
	background(0)
}

function draw(){

	fill(255)
	stroke(0)
	//noStroke()

	//image(img, 0, 0)

	const raggio = min(width, height) / 10
	const raggio2 = raggio * raggio 				// raggio al quadrato

	for (const d of dots){
		let dx = d.x - mouseX
		let dy = d.y - mouseY

		const distanza2 = dx*dx + dy*dy				// distanza al quadrato
		if (distanza2 < raggio2 & distanza2 > 0.001) {
			const dist = Math.sqrt(distanza2)
			d.dx = d.x + dx / dist * (raggio - dist)
			d.dy = d.y + dy / dist * (raggio - dist)
		}

		d.x += (d.dx - d.x) * 0.06
		d.y += (d.dy - d.y) * 0.06

		ellipse(d.x, d.y, d.d, d.d)
	}
}

function reset(arr, img){
	arr.length = 0 	// tronca l’array senza peredere il riferimento
	const grid = min(width, height) / 60
	const ox = (width - (img.width-1) * grid) / 2
	const oy = (height - (img.height-1) * grid) / 2
	for(let j=0; j<img.height; j++){
		for(let i=0; i<img.width; i++){
			let c = img.get(i, j)
			let x = ox + i * grid
			let y = oy + j * grid
			if (c[0] > 1) {
				let d = map(c[0], 0, 255, 1, grid)
				arr.push({
					x:x,
					y:y,
					dx:x,
					dy:y,
					d:d,
					ox:x,
					oy:y,
				})
			}
		}
	}
}

function windowResized(){
	resizeCanvas(windowWidth, windowHeight)
	reset(dots, img)
	background(0)
}

function mousePressed(){
	for (const d of dots){
		d.dx = d.ox
		d.dy = d.oy
	}
}
