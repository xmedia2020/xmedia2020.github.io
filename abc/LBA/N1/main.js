/**
 * N1
 *
 */


let count = 0;

let tW = 400
let tH = 600

function setup(){
	createCanvas(windowWidth, windowHeight)
	background(0)
}

function draw(){
	background(0)
	
	translate(width/2- tH/4, height/2-tW/2)

	noFill()
	stroke(255)
	strokeWeight(0.8)


	count = mouseX / 20 + 5;



	for (let i=0; i<=count; i++){
		let x_end = (i / count - 0.5) *tH
		if(x_end >= 0)
		line(0,0, x_end, tW)
	}



	for (let j=0; j<=count; j++){
		let y_end = (j / count - 0.5) * tH
		if(y_end >= 0)
			line(tH/2,tW, y_end,0)
	}

	push()
	strokeWeight(0.8)	
	line(0,0, 0, tW)
	line(0,0,tH/2,tW)
	line(tH/2,tW, 300, 0)
	pop()
		
}



// -- EVENTI ----------------------------------

function windowResized(){
	// importante: il canvas deve essere ridimensionato assieme alla finestra
	resizeCanvas(windowWidth, windowHeight)
}

function keyPressed(){
	if (key == 's' || key == 'S') {
    saveCanvas('N', 'png');
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

