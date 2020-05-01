 
//GLOBAL
let rectHeight;
let rectWidht;


let fatherCircle;
let babyCircle;

function setup(){
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

	//GLOBAL DIMENSION
	rectHeight 	= height * 2/3
	rectWidht 	= rectHeight * 0.20

	fatherCircle = rectWidht * 2;
	babyCircle = fatherCircle / 3;

	//POSITION
	// 100% == 1
	// 50% == 0.5
	// 30% == 0.3
	let  paddingTop = ((height - rectHeight)/2)/height;
	let  paddingBottom =  ((height - rectHeight)/2)/height;
	let  paddingLeft = 0.5 - (fatherCircle/width);
	let  paddingRight = 0.5 - (fatherCircle/width);


	background(0)
	translate(width/2, height/2)
	
	push();

	noStroke()

	fill(255)
	rectMode(CENTER)
	rect(0, 0, rectWidht, rectHeight)

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

