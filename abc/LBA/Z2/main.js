




let punti = [
	0.46, 0.00,
	27.73, 0.00,
	27.73, 6.03,
	9.10, 29.64,
	27.78, 29.64,
	27.78, 35.99,
	0.00, 35.99,
	0.00, 29.64,
	18.39, 6.37,
	0.46, 6.37,
	
]
const bBox = calcBBox(punti)

function setup(){
	createCanvas(windowWidth, windowHeight)
	background(0)
}

function draw(){
	//background(0)
	//noStroke()
	translate(width/2, height/2)

	noFill()
	stroke(255)
	strokeWeight(0.01)


	for (let j=0; j<20; j++){
		push()
		rotate(map(mouseX * 0.001,0,width,-500,500 ))
		//scale(mouseY * 0.01 * j)
		const s = map(mouseY, height/2, height, 0, 90)
		translate(-bBox.w/2 * s, -bBox.h/2 * s) // centriamo la lettera
		let old_x = 0
		beginShape()
		for(let i=0; i<punti.length; i=i+2){
			let x = punti[i] * s
			let y = punti[i+1] * s

			ellipse(x,y, 5, 5)
			vertex(x, y)

			


		}
		endShape(CLOSE)
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
	background(0)
}

function keyPressed(){
	if (key == 's' || key == 'S') {
		saveCanvas('Z', 'png');
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

