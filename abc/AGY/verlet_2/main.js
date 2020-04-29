
let sim
let mouse_force = true

const punti = [
	{x : 0.00, y : 0.00},
	{x : 2.14, y : 0.00},
	{x : 2.14, y : 5.14},
	{x : 4.53, y : 2.61},
	{x : 7.15, y : 2.61},
	{x : 4.60, y : 5.24},
	{x : 7.48, y : 10.0},
	{x : 4.96, y : 10.0},
	{x : 3.06, y : 6.81},
	{x : 2.12, y : 7.96},
	{x : 2.12, y : 10.0},
	{x : 0.00, y : 10.0}
]


const linksToDraw = []
const pointsToDraw = []

const frames = []

function setup(){
	createCanvas(windowWidth, windowHeight)
	sim = new Sim()


	const bb = calcBB(punti)
	const s  = 25  // scale
	const ox = - bb.width*s / 2
	const oy = - bb.height*s / 2

	for (const p of punti){
	    const x = p.x * s + ox
	    const y = p.y * s + oy
	    pointsToDraw.push(sim.addPoint(x, y, 2))
	}

	for (let i=0; i<pointsToDraw.length; i++){
	    const a = pointsToDraw[i]
	    const b = pointsToDraw[(i+1) % sim.points.length]
	    const l = sim.addLink(a, b, null, 0.02)
	    linksToDraw.push(l)
	}

	for (let i=0; i<pointsToDraw.length; i++){
	    const a = pointsToDraw[i]
	    const b = sim.addPoint(a.pos.x + Math.random(), a.pos.y + Math.random(), a.radius)
	    const l = sim.addLink(a, b, 0, 0.001)
	    b.pinned = true
	}
	background(128)
}

function draw(){

    if (mouseIsPressed) {
    	const mf = Math.min(width, height) * 0.2
        for (const a of sim.points) {
            const m = createVector(mouseX-width/2, mouseY-height/2)
            const v = p5.Vector.sub(a.pos, m)
            if (v.mag() < mf) {
                v.normalize()
                v.mult(2.5)
                a.pos.add(v)
            }
        }
    }

    sim.update(1)

    // facciamo una copia:
    const frame = []
    for (const p of pointsToDraw) {
        frame.push({x:p.pos.x, y:p.pos.y})
    }
    frames.push(frame)
    if (frames.length > 70) frames.shift()

   	// rendering:
   	background(0)
   	translate(width/2, height/2)
    strokeJoin(ROUND)
    stroke(255)
    noFill()
    strokeWeight(3)

    // linee
    const s1 = map(sin(frameCount * 0.003), -1, 1, 0.25, 4)
    const l = frames.length
    for (let i=0; i<l; i++) {
    	const s = (l + i) % 2 * 255
    	const a = Math.exp(4.0 * ( i / (frames.length-1)-1))
    	const scale = map(i, 0, l-1, s1, 1)
    	stroke(s * a)
	    beginShape()
	 	for (const p of frames[i]) {
	        vertex(p.x*scale, p.y*scale)
	    }
	    endShape(CLOSE)
	}
}

function mousePressed(){
	background(0)
}

function windowResized(){
	resizeCanvas(windowWidth, windowHeight)
	background(0)
}

// Funzione che calcola la "bounding box"
// di un set di coordinate
function calcBB(pts){

	const bb = {
		min_x :  Number.MAX_VALUE,
		min_y :  Number.MAX_VALUE,
		max_x : -Number.MAX_VALUE,
		max_y : -Number.MAX_VALUE,
	}

	for(const p of pts){
		bb.min_x = Math.min(bb.min_x, p.x)
		bb.max_x = Math.max(bb.max_x, p.x)
		bb.min_y = Math.min(bb.min_y, p.y)
		bb.max_y = Math.max(bb.max_y, p.y)
	}

	bb.x = bb.min_x
	bb.y = bb.min_y
	bb.width = bb.max_x - bb.min_x
	bb.height = bb.max_y - bb.min_y
	return bb
}

