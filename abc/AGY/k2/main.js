/**
 * K2
 *
 */


const punti = [
	0.00, 0.00,
	2.14, 0.00,
	2.14, 5.14,
	4.53, 2.61,
	7.15, 2.61,
	4.60, 5.24,
	7.48, 10.0,
	4.96, 10.0,
	3.06, 6.81,
	2.12, 7.96,
	2.12, 10.0,
	0.00, 10.0,
]

const bb = calcBB(punti)
console.table(bb)

function setup(){
	createCanvas(windowWidth, windowHeight)
}

function draw(){
	background(0)
	translate(width/2, height/2)

	noFill()
	strokeWeight(1)

	const num = Math.floor(map(sin(frameCount*0.01), -1,1,10,40))

	const mouseScale = (height/2 - mouseY) * 0.01
	const mouseRotate = (mouseX-width/2) * 0.0002
	for (let j=0; j<num; j++){

		const s = mouseScale * j + 15 			// scale

		push()									// push() salva la trasformazione attuale della matrice
		rotate(mouseRotate * j)
		translate(-bb.w/2 * s, -bb.h/2 * s) 	// centriamo la lettera

		stroke(255, 180)
		beginShape()							// disegno dei piunti connessi
		for(let i=0; i<punti.length; i=i+2){	// NOTA: l'indice viene incrementato di 2
			let x = punti[i  ] * s 				//       la struttura dell'array è "intercalata"
			let y = punti[i+1] * s              //       [x0, y0, x1, y1, x2, y2, x3, y3...]
			vertex(x, y)
		}
		endShape(CLOSE)							// connette ultimo vertice al primo


		if (j==0 || j==num-1) {					// disegno della BB
			stroke(0, 180, 255)
			rect(bb.x*s, bb.y*s, bb.w*s, bb.h*s)
		}
		pop()									// pop() ripristina la matrice "salvata" con push()
	}
}


// funzione che calcola la "bounding box" di un set di coordinate
function calcBB(p){
	const bb = { 								// Creiamo al volo un oggetto arbitrario
		min_x :  Number.MAX_VALUE,
		min_y :  Number.MAX_VALUE,
		max_x : -Number.MAX_VALUE,
		max_y : -Number.MAX_VALUE,
	}

	for(let i=0; i<p.length; i=i+2){
		const  x = p[i]
		const  y = p[i+1]
		bb.min_x = Math.min(bb.min_x, x)
		bb.max_x = Math.max(bb.max_x, x)
		bb.min_y = Math.min(bb.min_y, y)
		bb.max_y = Math.max(bb.max_y, y)
	}
	bb.x = bb.min_x
	bb.y = bb.min_y
	bb.w = bb.max_x-bb.min_x
	bb.h = bb.max_y-bb.min_y
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

