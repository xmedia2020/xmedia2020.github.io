/**
 * Template per P5JS
 * Reference: https://p5js.org/reference/
 */
var mic;
let micInit = false;
const multiplSize = 15 

let punti = [

//	x	  y
	0.00, 	0.00,
	15.534, 0.00,
	15.534, 3.375,
	4.114,	21.962,
	15.534, 21.962,
	15.534, 25.115,
	0.00,	25.115,
	0.00,	21.962,
	11.029,	3.375,
	0.00,	3.375,
]

//console.log (punti)

// funzione d’inizio
function setup(){
	// creiamo un'applicazione della dimensione della finestra
	createCanvas(windowWidth, windowHeight)
	mic = new p5.AudioIn();
    mic.start();
}

// COORDINATE PUNTI SUPERIORI A ZERO!!!
function redefine_Center(){
	max_X = 0;
	max_Y = 0;

	for( let i = 0 ; i < punti.length ; i++){
		if(i % 2 == 0){ // X
			if ( punti[i] > max_X ){
				max_X = punti[i];
			}		
		}
		else{ // Y
			if ( punti[i] > max_Y ){
				max_Y = punti[i];
			}	
		}
	}

	translate((-max_X * multiplSize)/2 , (-max_Y*multiplSize)/2);
	
}

// funzione di loop
function draw(){
	background(0)
	translate(width/2, height/2)

    redefine_Center()

	noFill()
	stroke(255)
	strokeWeight(3)




    let minVal = 0;
    let maxVal = 50;

	let vol = mic.getLevel() * 1000;
    

	for(let j=0; j<20; j++){
		push()
		
			//rotate(mouseX * 0.001 * j )
			//scale(mouseY * 0.001 * j)
		    let m = map(vol, minVal, maxVal, 0 ,20);

			
		beginShape()
			for(let i=0; i<punti.length; i=i+2){
				let x = punti[i  ] * multiplSize + random(-m , m) 
				let y = punti[i+1] * multiplSize + random(-m , m) 
				vertex(x, y)
			}
		endShape(CLOSE)
		pop()
	}

}

// -- EVENTI ----------------------------------

function mousePressed() {
    getAudioContext().resume()
}

function touchStarted() {
    getAudioContext().resume()
}


function windowResized(){
	// importante: il canvas deve essere ridimensionato assieme alla finestra
	resizeCanvas(windowWidth, windowHeight)
}



function keyPressed(){
	if (key == 's' || key == 'S') {
    saveCanvas('z', 'png');
  } else if (key == 'x' || key == 'X'){
    setup()
  }

  return false;

}
