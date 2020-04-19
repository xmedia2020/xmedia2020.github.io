
function setup(){
	// creiamo un'applicazione della dimensione della finestra
	createCanvas(windowWidth, windowHeight)
}



// funzione di loop
function draw(){
	background(0)
	translate(width/2, height/2)
	
	push();
		let fixedRectHeightDX = 350
		let rectWidth = 50

		noStroke()
		fill(255)
		rectMode(CENTER)

		let mouseRelativeX = (mouseX-width/2)
		let mouseRelativeY = (mouseY-height/2)



		let innerRectY

		// inner Rect Y bound
		if(mouseRelativeY < -fixedRectHeightDX/2 + rectWidth/2){
			innerRectY = -fixedRectHeightDX/2 + rectWidth/2

		}
		else if(mouseRelativeY > fixedRectHeightDX/2 - rectWidth/2){
			innerRectY = fixedRectHeightDX/2 - rectWidth/2
			
		}
		else{
			innerRectY = mouseRelativeY
		}


		let innerPaddingMIN = 50
		let innerPaddingMAX = 1000

		// inner Rect RelativeX bound
		if(abs(mouseRelativeX) < rectWidth/2 + innerPaddingMIN/2){
			mouseRelativeX = rectWidth/2 + innerPaddingMIN/2

		}
		else if(abs(mouseRelativeX) > rectWidth/2 + innerPaddingMAX/2){
			mouseRelativeX = rectWidth/2 + innerPaddingMAX/2
			
		}


		//outer
		rect(-mouseRelativeX, 0, rectWidth, fixedRectHeightDX)
		rect(mouseRelativeX, 0, rectWidth, fixedRectHeightDX)


		// inner
		rect(0, innerRectY, abs(mouseRelativeX)*2, rectWidth)
		
	pop()

}


// -- EVENTI ----------------------------------

function windowResized(){
	// importante: il canvas deve essere ridimensionato assieme alla finestra
	resizeCanvas(windowWidth, windowHeight)
}


function keyPressed(){
	if (key == 's' || key == 'S') {
    saveCanvas('t', 'png');
  } else if (key == 'x' || key == 'X'){
    setup()
  }

  return false;

}
