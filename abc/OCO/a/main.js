let font

function preload(){
	font = loadFont("Verdana.ttf")

}

// funzione d’inizio
function setup(){
	createCanvas(windowWidth, windowHeight)
    background(0)


}

// funzione di loop
function draw(){
	background(0)
	fill(255)
    noStroke()
    let letterSize = min(width,height)/2

    const dim = 100

	const raw_points = font.textToPoints('a', 0, 0, dim, {sampleFactor:1.0})

	const bb = getBB(raw_points)

	const points = []

	let out = "const punti = [\n"

	for (let i = 0; i<raw_points.length; i++) {
		points[i] = {
			x : (raw_points[i].x - bb.x - bb.width/2) / bb.height,
			y : (raw_points[i].y  - bb.y - bb.height/2) / bb.height,
		}

		out += "\t{x:" + points[i].x + ", y:"+points[i].x + "},\n"
	}

	out += "]\n"
	const w = bb.width/bb.height 
	const h = bb.height/bb.height 

	translate(width/2, height/2)
	
	console.log(out)

	push()
	translate(width/32-mouseX*0.05,height/32-mouseY*0.05)
	stroke(255)
	fill(255)
	beginShape()
    for (const p of points) {
    	vertex(p.x * letterSize, p.y * letterSize)
    }
    endShape()
    pop()

    push()
    //translate(width/2, height/2)
    stroke(0)
	fill(0)
	beginShape()
    for (const p of points) {
    	vertex(p.x * letterSize, p.y * letterSize)
    }
    endShape()
    pop()

    console.log(width-mouseX)


}

function getBB(punti) {

	const bb = {
		min_x :  Number.MAX_VALUE,
		min_y :  Number.MAX_VALUE,
		max_x : -Number.MAX_VALUE,
		max_y : -Number.MAX_VALUE
	}

	for (const p of punti) {
		if (p.x < bb.min_x) bb.min_x = p.x
		if (p.x > bb.max_x) bb.max_x = p.x
		if (p.y < bb.min_y) bb.min_y = p.y
		if (p.y > bb.max_y) bb.max_y = p.y
	}

	bb.width = bb.max_x - bb.min_x
	bb.height = bb.max_y - bb.min_y
	bb.x = bb.min_x
	bb.y = bb.min_y

	return bb
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

