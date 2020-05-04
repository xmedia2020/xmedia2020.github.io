/**
 * K2
 *
 */
 let mic

let micLevelSmooth = 0



const punti = [
	0.00, 0.00,
	25.00, 0.00,
	23.65, 6.60,
	8.80, 6.60,
	8.80, 14.10,
	22.50, 14.10,
	22.50, 20.70,
	8.80, 20.70,
	8.80, 36.05,
	0.00, 36.05,
	0.00, 0.00,
]



const mList = []

const bBox = calcBBox(punti)
let count = 100
const s = 10


function setup(){
	// creiamo un'applicazione della dimensione della finestra
	createCanvas(windowWidth, windowHeight)
	background(0)

	mic = new p5.AudioIn()
  	userStartAudio()
  	mic.start();
}

// funzione di loop
function draw(){

	let minVal = 0;
    let maxVal = 50;

	let vol = mic.getLevel() * 500;

	background(0)
	fill(255)
	noStroke()
	translate(width/2, height/2)

	stroke(255)
	strokeWeight(0.5)
	noFill(0)

//-----lineee----
	let m = map(vol, minVal, maxVal, 0, 250);
	mList.unshift(m)
	mList.unshift(m)
	


	let x0 = -width/2
	let y0 = -height/2

	let x1 = x0
	let y1 = height/2

	let rapX = (x1 - x0) / count
	let rapY = (y1 - y0) / count

	for (let k = 0; k < count; k++) {
	stroke(255)
	let myM = mList[k] === undefined? 0:mList[k]
	let fx = (x0+rapX*k)+myM
	fx = fx > 500? 500: fx 
		line(
				(x0+rapX*k),
				(y0+rapY*k),
				fx,
				(y0+rapY*k)
			)
	}


		const s = 10
		push()
		translate(-bBox.w/2 * s, -bBox.h/2 * s)
		fill(0)
		noStroke()
		beginShape()
		for(let i=0; i<punti.length; i=i+2){
				let x = punti[i  ] * s
				let y = punti[i+1] * s
				vertex(x, y)
			}
			endShape()
		pop()

		



	



	
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
    saveCanvas('F', 'png');
  } else if (key == 'x' || key == 'X'){
    setup()
  }

  return false;

}

function keyReleased(){

}

function mousePressed(){
  	userStartAudio()

}

function mouseReleased(){

}

function mouseMoved(){

}

