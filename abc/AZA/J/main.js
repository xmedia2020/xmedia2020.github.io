
var a = 0;
var isRotate = true;


function setup(){
	createCanvas(windowWidth, windowHeight)
	textSize(350);
} 

function draw() { 	
	background (0);
 	rectMode(CENTER);
 	translate(width/2, height/2);

	fill(0);
 	stroke(255)
 	strokeWeight(5)

	text('J', 0, 0);

	rotate(PI);

 	text('J', 0, 0);

 	if(isRotate == true){
 		a = a + 0.05
 	}

 	rotate(a);	

	fill(255);
	text('J', 0, 0);  
}


function mouseClicked() {
//il negato, l'opposto (il punto esclamativo davanti variante di true/false)
	isRotate = !isRotate 		
}


// -- EVENTI ----------------------------------

function windowResized(){
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

