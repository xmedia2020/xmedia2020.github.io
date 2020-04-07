
function setup(){
	// creiamo un'applicazione della dimensione della finestra
	createCanvas(windowWidth, windowHeight)
}



// funzione di loop
function draw(){
	background(0)
	translate(width/2, height/2)
	
	push();
		let fixedRectHeight = 350
		let rectWidth = 50

		noStroke()
		fill(255)
		rectMode(CENTER)


		rect(0, 0, rectWidth, fixedRectHeight)

		let mouseRelativeX = (mouseX-width/2)
		let mouseRelativeY = (mouseY-height/2)


		if(mouseRelativeY < -fixedRectHeight/2 + rectWidth/2){
			rect(0 , -fixedRectHeight/2 + rectWidth/2, abs(mouseRelativeX)*2, rectWidth)
		}
		else if(mouseRelativeY > fixedRectHeight/2 - rectWidth/2){
			rect(0 , fixedRectHeight/2 - rectWidth/2, abs(mouseRelativeX)*2, rectWidth)
		}
		else{
			rect(0 , mouseRelativeY, abs(mouseRelativeX)*2, rectWidth)
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
    saveCanvas('t', 'png');
  } else if (key == 'x' || key == 'X'){
    setup()
  }

  return false;

}
