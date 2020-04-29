let cg, pg, img

function preload(){
	img = loadImage("bodoni_m.png")
}

function setup(){
	cg = createCanvas(windowWidth, windowHeight)
	pg = createGraphics(width, height)
}

function draw(){

	// feedback 1:

	const rot = sin(frameCount * 0.0023) * 0.015
	const sca = map(sin(frameCount * 0.0033), -1, 1, 0.98, 1.1)

	push()
	translate(width/2, height/2)
	rotate(rot)
	scale(sca)
	image(pg, -pg.width/2, -pg.height/2)
	pop()

	// paint "normale"
	push()

	const min_s = min(width, height) * 0.3
	const max_s = min(width, height) * 1.8
	console.log(min_s)

	const s = map(sin(frameCount * 0.013), -1, 1, min_s, max_s)
	const a = sin(frameCount * 0.017) * 2

	const f = map(sin(frameCount * 0.001), -1, 1, 0.1, 0.8)
	const r = map(sin(frameCount * f), -1, 1, 0, 255)
	// const g = map(sin(frameCount * 0.12), -1, 1, 0, 255)
	// const b = map(sin(frameCount * 0.13), -1, 1, 0, 255)
	tint(r)
	translate(mouseX, mouseY)
	//rotate(a)
	image(img, -s/2, -s/2, s, s)
	noTint()
	pop()


	/*
	// const r = frameCount % 2 * 255
	// const g = frameCount % 2 * 255
	// const b = frameCount % 2 * 255
	const r = map(sin(frameCount * 0.011), -1, 1, 0, 255)
	const g = map(sin(frameCount * 0.012), -1, 1, 0, 255)
	const b = map(sin(frameCount * 0.013), -1, 1, 0, 255)
	stroke(r,g,b)
	strokeWeight(40)
	line(mouseX, mouseY, pmouseX, pmouseY)

	fill(r,g,b)
	noStroke()
	ellipse(mouseX, mouseY, 40, 40)
	*/

	// feedback 2:
	pg.copy(cg, 0, 0, width, height, 0, 0, width, height)


}


function windowResized(){
	resizeCanvas(windowWidth, windowHeight)
	pg.resizeCanvas(width, height)

}

