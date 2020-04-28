/**
 * Template per P5JS
 * Reference: https://p5js.org/reference/
 */
let value = 0;
const s = 15;

let punti_1 = [

//	x	  y
	0.00, 	0.00,
	12.282, 0.00,
	12.282, 5.581,	
	7.252, 	5.581,	
	7.252,	10.896,	
	12.282,	10.896,	
	12.282,	16.175,
	7.252,	16.175,
	7.252,	27.888,
	0.00,	27.888,
]

let punti_2 = [

//	x	  y
	12.282, 0.00,
 	24.554,	0.00,
	24.554,	27.888,
	17.302,	27.888,
	17.311,	16.175,
	12.281,	16.175,
	12.281,	10.899,
	17.311,	10.869,
	17.311, 5.581,
	12.281,	5.581,
	12.281,	0.00,
]

//console.log (punti)

// funzione d’inizio
function setup(){
	// creiamo un'applicazione della dimensione della finestra
	createCanvas(windowWidth, windowHeight)
}

// COORDINATE PUNTI SUPERIORI A ZERO!!!
function redefine_Center(){
	max_X = 0;
	max_Y = 0;

	for (let i = 0; i < punti_1.length ; i++){
		if (i % 2 == 0){ // X
			if (punti_1[i] > max_X){
				max_X = punti_1[i];
			}		
		}
		else { // Y
			if (punti_1[i] > max_Y){
				max_Y = punti_1[i];
			}	
		}
	}

	for (let i = 0; i < punti_2.length ; i++){
		if(i % 2 == 0){ // X
			if ( punti_2[i] > max_X){
				max_X = punti_2[i];
			}		
		}
		else{ // Y
			if ( punti_2[i] > max_Y ){
				max_Y = punti_2[i];
			}	
		}
	}

	translate((-max_X * s) /2, (-max_Y * s ) /2);
	
}

// funzione di loop
function draw(){
    redefine_Center()


	background(0)
	translate(width/2, height/2)


	
	stroke(255)

	const s = 15

	for(let j=0; j<20; j++){
		push()

		beginShape()
		switch(value) {
			case 0:
				fill(0);
				stroke(0);
			break;

			case 1:
				fill(255);
				stroke(255);
			break;

		    case 2:
		    	fill(255);
				stroke(255);
		    break;

		    case 3:
		    	fill(0);
				stroke(255);
		    break;

		    case 4:
		    	fill(0);
				stroke(255);
		    break;

		    case 5:
		    	fill(0);
				stroke(0);
		    break;

			default:
		    	fill(255);
				stroke(255);
		}



		for(let i=0; i<punti_2.length; i=i+2){
			let x = punti_2[i  ] * s 
			let y = punti_2[i+1] * s 
			vertex(x, y)
		}
		endShape(CLOSE)
		
		
		beginShape()
		switch(value) {
			case 0:
				fill(255);
				stroke(255);
			break;

			case 1:
				fill(0);
				stroke(0);
			break;

		    case 2:
		    	fill(255);
				stroke(255);
		    break;

		    case 3:
		    	fill(255);
				stroke(255);
		    break;

		    case 4:
		    	fill(0);
				stroke(255);
		    break;

		    case 5:
		    	fill(0);
				stroke(255);
		    break;

			default:
		    	fill(255);
				stroke(255);
		}

		for(let i=0; i<punti_1.length; i=i+2){
			let x = punti_1[i  ] * s 
			let y = punti_1[i+1] * s 
			vertex(x, y)
		}
		endShape(CLOSE)

		pop()

	}

}
// -- EVENTI ----------------------------------


function mousePressed() {
  	if (value === 5) {
 	   	value = 0;
	} else {
	    value++;
  	}
}


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
