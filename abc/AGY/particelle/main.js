/**
 * Particelle
 *
 */


let particelle = [] // inizializziamo un array (vuoto)
const griglia = 20

function setup(){
	createCanvas(windowWidth, windowHeight)
}

function draw(){

	background(0)

	fill(255)
	noStroke()

	for (const part of particelle) {
		if (part.life % griglia == 0) {

			part.dir = (part.dir + 4 + floor(random(-1, 2))) % 4

			if (part.dir == 0) { 			// nord
				part.vx = 0
				part.vy = -part.vel
			} else if (part.dir == 1) { 	// est
				part.vx = part.vel
				part.vy = 0
			} else if (part.dir == 2) {		// sud
				part.vx = 0
				part.vy = part.vel
			} else {						//   ovest
				part.vx = -part.vel
				part.vy = 0
			}
		}
		const d = Math.min(part.life/50, part.diametro)
		part.life--
		part.px = part.px + part.vx
		part.py = part.py + part.vy



		rect(part.px-d/2, part.py-d/2, d, d)
	}

	// togliamo dall'array le particelle con una vita minore a 0 (frames)
	particelle = particelle.filter(function(e){
		return e.life > 0
	})

	stroke(255,0,0)
	noFill()

}

// -- EVENTI ----------------------------------

function windowResized(){
	// importante: il canvas deve essere ridimensionato assieme alla finestra
	resizeCanvas(windowWidth, windowHeight)
}

function mouseMoved(){

	for (let i=0; i<16; i++) {
		const part = {
		 	px 			: floor(mouseX / (griglia)) * griglia + griglia/2 , 	// posizione
		 	py 			: floor(mouseY / (griglia)) * griglia + griglia/2,
		 	vx 			: 0,		// velocità
		 	vy 			: 0,
		 	diametro 	: 5,		// diametro
		 	dir         : 0,
		 	life        : 400,		// contatore interno (meglio se multiplo di griglia)
		 	vel         : floor(random(0, 3)) / 2,
		}

		particelle.push(part)
	}
	return false
}

function touchMoved(e){
	mouseMoved(e)
	return false
}
