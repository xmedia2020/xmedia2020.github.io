/**
 * Template per P5JS
 * Reference: https://p5js.org/reference/
 */


// let part_h =  [
// 	 0.000, 0.000,
// 	 0.000, 1.000,
// 	 1.000, 1.000,
// 	 1.000, 0.000,
// 	 ]

let x = 0
let y = 0
let space = 20
let size = 50
// funzione d’inizio
function setup(){
	// creiamo un'applicazione della dimensione della finestra
	createCanvas(windowWidth, windowHeight)

}

// funzione di loop
function draw(){
	background(0)

	// stroke(255)
	// noFill()
	// beginShape();
	// for(let i = 0; i < part_h.length; i = i + 2){
	// 	let x = part_h[i]
	// 	let y = part_h[i+1]
	// 	vertex(x *10,y*10);
	// }
	// endShape();

	if (mouseIsPressed){
		size = map(mouseY,0,height,500,50)
	} 
	// if(frameCount % 1000 == 0){
	
	// let n = (int(random(0,4)))

	// switch (n){
	// 	case 0:
	// 	size = 50
	// 	break;
	// 	case 1:
	// 	size = 125
	// 	break;
	// 	case 2:
	// 	size = 250
	// 	break;
	// 	case 3:
	// 	size = 500
	// 	break;

	// 	}
	// }
	
	for(y=0 ; y<height ; y+=size){
		for(x=0;x<width; x+=size){
			letter_n(x,y)
		}
	}
	
}


// -- EVENTI ----------------------------------

function windowResized(){
	// importante: il canvas deve essere ridimensionato assieme alla finestra
	resizeCanvas(windowWidth, windowHeight)
}

function letter_n (x,y){

	space = map(mouseX,0,width,10,size)
			
	noFill()
	stroke(255)

	for (let j = 0; j < size; j+= space/2) {	
			line(x, y, x+j, y+size);
	}
	beginShape()
		for (let i = size; i > 0; i-= space/2) {
			vertex(size+x, size+y)
			vertex(i+x,y)			
	}
	endShape()


}



function keyPressed(){

  if(key == 's'){
    save("N");
  }

}

function keyReleased(){

}

function mousePressed(){

}

function mouseReleased(){

}

function mouseMoved(){

}

