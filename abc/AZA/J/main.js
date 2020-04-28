

var a = 0;
var isRotate = true;


function setup(){
	// creiamo un'applicazione della dimensione della finestra
	createCanvas(windowWidth, windowHeight)
	textSize(250);
   	// textSize(width / 18);
} 

function draw() { 	
	//push();
	background (0);
 	rectMode(CENTER);
 	translate(width/2, height/2);

 	//translate(100, 100);


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
 
	
	//pop();
  
}


function mouseClicked() {
	isRotate = !isRotate 		//il negato l'opposto (il punto esclamativo davanti variante true/false)
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

