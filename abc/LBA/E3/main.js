/**
 * E3
 *
 */
let back = false

const punti = [
	0.00, 0.00,
	25.00, 0.00,
	23.65, 6.60,
	8.80, 6.60,
	8.80, 14.10,
	22.50, 14.10,
	22.50, 20.70,
	8.80, 20.70,
	8.80, 29.45,
	24.05, 29.45,
	25.40, 36.05,
	0.00, 36.05,
	0.00, 0.00,
]

const bBox = calcBBox(punti)
let count = 80
const s = 10


function setup(){
	// creiamo un'applicazione della dimensione della finestra
	createCanvas(windowWidth, windowHeight)
	background(0)
}

// funzione di loop
function draw(){
	background(0)
	fill(255)
	noStroke()
	translate(width/2, height/2)



		const s = 10
		translate(-bBox.w/2 * s, -bBox.h/2 * s) // centriamo la lettera

		for(let i=0; i<punti.length; i=i+2){
			let x = punti[i  ] * s 
			let y = punti[i+1] * s
			let x1 = punti[i+2  ] * s 
			let y1 = punti[i+3] * s
			
			line(x,y,x1,y1)
			
		}

	stroke(255)
	strokeWeight(0.5)
	noFill(0)
	let mX = map(mouseX, 0, width,50,-50)	
	let mY = map(mouseY, 0, height,50,-50)	

	for(let i=0; i<punti.length; i=i+2){
			let rapX = (punti[i+2] - punti[i]) / count
			let rapY = (punti[i+3] - punti[i+1]) / count

			for (let k = 0; k < count; k++) {
		 		line(
		 				(punti[i]+rapX*k)*s,
		 				(punti[i+1]+rapY*k)*s, 
		 				(punti[i]+rapX*k)*s+mX,
		 				(punti[i+1]+rapY*k)*s+mY
		 			)
			}
	}

	if (!back) {
		push()
		fill(0)
		stroke(0)

		beginShape()
		for(let i=0; i<punti.length; i=i+2){
				let x = punti[i  ] * s
				let y = punti[i+1] * s
				vertex(x, y)
			}
			endShape()
		
		pop()
	}
	
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
}

function keyPressed(){
	if (key == 's' || key == 'S') {
    saveCanvas('E', 'png');
  } else if (key == 'x' || key == 'X'){
    setup()
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

}

function mouseClicked() {

  back = !back

  	
}



