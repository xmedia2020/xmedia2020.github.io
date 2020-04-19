/**
 * Template per P5JS
 * Reference: https://p5js.org/reference/
 */
 
 
//GLOBAL
let fatherCircle = 150;
let babyCircle = 50;



// 100% == 1
// 50% == 0.5
// 30% == 0.3
let  paddingTop = 0.3;
let  paddingBottom = 0.27;
let  paddingLeft = 0.4;
let  paddingRight = 0.4;



// funzione d’inizio
function setup(){
	// creiamo un'applicazione della dimensione della finestra
	createCanvas(windowWidth, windowHeight)
	

}

function drawCircle(x, y){
	push()
		fill(255)	
		ellipse(x -width/2,y - height/2,fatherCircle,fatherCircle)
		fill(0)
		ellipse(x -width/2,y - height/2,babyCircle,babyCircle)
	pop()
}

// funzione di loop
function draw(){
	background(0)
	translate(width/2, height/2)
	
	push();

	noStroke()



	fill(255)
	rectMode(CENTER)
//	rotate(TAU / 8 + mouseX * 0.01)
	rect(0, 0, 70, 330)

	// Draw Circle
	if( mouseX < fatherCircle/2 + (width * paddingLeft)){
		if( mouseY < fatherCircle/2 + (height * paddingTop)){
			drawCircle( fatherCircle/2 + (width * paddingLeft), fatherCircle/2 + (height * paddingTop));
		}
		else if( mouseY > height - fatherCircle/2 - (height * paddingBottom)){
			drawCircle(fatherCircle/2 + (width * paddingLeft), height - fatherCircle/2 - (height * paddingBottom));
		}
		else{
			drawCircle(fatherCircle/2 + (width * paddingLeft), mouseY);
		}
	}
	else if( mouseX > width - fatherCircle/2 - (width * paddingRight)){
		if( mouseY < fatherCircle/2 + (height * paddingTop)){
			drawCircle(width - fatherCircle/2 - (width * paddingRight), fatherCircle/2 + (height * paddingTop));
		}
		else if( mouseY > height - fatherCircle/2 - (height * paddingBottom)){
			drawCircle( width - fatherCircle/2 - (width * paddingRight), height - fatherCircle/2 - (height * paddingBottom));
		}
		else{
			drawCircle(width - fatherCircle/2 - (width * paddingRight), mouseY);
		}
	}
	else if( mouseY < fatherCircle/2 + (height * paddingTop)){
		drawCircle( mouseX, fatherCircle/2 + (height * paddingTop));
	}
	else if( mouseY > height - fatherCircle/2 - (height * paddingBottom)){
		drawCircle( mouseX, height - fatherCircle/2 - (height * paddingBottom));
	}
	else{
		drawCircle(mouseX , mouseY);
	}
	
	pop()
	
	
//	const scale = min(width, height) / 100
//	const d = scale * 40 + sin(frameCount*0.01) * scale*10

}





// -- EVENTI ----------------------------------

function windowResized(){
	// importante: il canvas deve essere ridimensionato assieme alla finestra
	resizeCanvas(windowWidth, windowHeight)
}


function keyPressed(){
	if (key == 's' || key == 'S') {
    saveCanvas('b', 'png');
  } else if (key == 'x' || key == 'X'){
    setup()
  }

  return false;

}

