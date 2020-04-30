/**
 * Particelle
 *
 */

 const punti = [
	0.00, 0.00,
	8.90, 0.00,
	8.90, 14.05,
	24.55,14.05,
	24.55,0.00,
	33.30,0.00,
	33.30,36.05,
	24.50,36.05,
	24.50,20.85,
	8.80, 20.85,
	8.80, 36.05,
	0.00, 36.05,
	0.00, 0.00,
	]

const bBox = calcBBox(punti)
let count = 100



let particelle = []

function setup(){
	createCanvas(windowWidth, windowHeight)
	background(0)


	
}

function draw(){

	//background(0)

	//translate(width/2, height/2)

	fill(255)
	noStroke()

	for (const part of particelle) { //per tutte le particelle di particelle e assegna questa varibile a ogni ciclo

		if (frameCount %10 == 0){

			part.dir = (part.dir + 4 + floor(random(-1,2))) % 4
			//floor taglia via parte con la virgola verso il basso floor=pavimento quindi verso basso
			
			if (part.dir == 0) { 		// nord
				part.vx = 0
				part.vy = -1
			} else if (part.dir == 1) { 	// est
				part.vx = 1
				part.vy = 0
			} else if (part.dir == 2) {	// sud
				part.vx = 0
				part.vy = 1
			} else {				//   ovest
				part.vx = -1
				part.vy = 0
			}
		}

		part.px = part.px + part.vx
		part.py = part.py + part.vy


		rect(part.px, part.py, part.diametro, part.diametro)

	}


	// let s = 10
		
		
	
	



		//scale(j)
		beginShape()

		let s = 10
		noStroke()
		fill(0)
		translate(width/2, height/2)
		translate(-bBox.w/2 * s, -bBox.h/2 * s) 
		for(let i=0; i<punti.length; i=i+2){
			let x = punti[i  ] * s 
			let y = punti[i+1] * s 
			vertex(x, y)
		}
		endShape(CLOSE)



	
}



function calcBBox(p){
	const bBox = {
		min_x :  Number.MAX_VALUE,
		min_y :  Number.MAX_VALUE,
		max_x : -Number.MAX_VALUE,
		max_y : -Number.MAX_VALUE,
	}

	for(let i=0; i<p.length; i=i+2){
		const  x = p[i]
		const  y = p[i+1]
		bBox.min_x = Math.min(bBox.min_x, x)
		bBox.max_x = Math.max(bBox.max_x, x)
		bBox.min_y = Math.min(bBox.min_y, y)
		bBox.max_y = Math.max(bBox.max_y, y)
	}
	bBox.x = bBox.min_x
	bBox.y = bBox.min_y
	bBox.w = bBox.max_x-bBox.min_x
	bBox.h = bBox.max_y-bBox.min_y

	return bBox
}





// -- EVENTI ----------------------------------

function windowResized(){
	// importante: il canvas deve essere ridimensionato assieme alla finestra
	resizeCanvas(windowWidth, windowHeight)
	background(0);
	s = winsowWidth/6;
}

function keyPressed(){
	if (key == 's' || key == 'S') {
    saveCanvas('E', 'png');
  } else if (key == 'x' || key == 'X'){
    setup()
    particelle = []


  }

  return false;

}

function keyReleased(){

}

function mousePressed(){

}

function mouseReleased(){

}

function mouseMoved(){

		const part = {
			px 			: (mouseX/10) *10,	//posizione
			py 			: (mouseY/10) *10,
			vx 			: 0,	//velocità
			vy 			: 0,
			diametro 	: 1,
			dir 		: 0,
		}
		particelle.push(part)

		while (particelle.lenght > 100) {
			particelle.shift()
		}

}





