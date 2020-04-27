/**
 * Template per P5JS
 * Reference: https://p5js.org/reference/
 */





 //console.log(punti[])
 //console.table crea una tabella
 //console.log( "numero di punti" + punti.lenght /2 ) dice quanti sono



// funzione d’inizio
function setup() {
   createCanvas( windowWidth, windowHeight, WEBGL );
   angleMode(DEGREES)
}

function draw() {
   background(0);
   stroke(255);
   const s = min(width, height)/2;
  	ambientLight(0);
   //specularMaterial( 200,200,200 )
   //pointLight( 230,230,230, -60,0,90 );

  	let rot = map(mouseX-width/2,0, width, 0,90)
   //camera( 100,100,200, 0,0,0, 0,1,0 );
   translate(0,height/4)
   push()
   rotate((-rot))
   push()
   rotateX(-30)
   rotateY(frameCount*0.5)
   translate(0,-s/2)
   cone( 50, s );
   pop()
   pop()
   stroke(255);
   push()
   rotate((rot))
   push()
   rotateX(-30)
   rotateY(-frameCount*0.5)
   translate(0,-s/2)
   cone( 50, s );
   pop()
   pop()
}
	



// -- EVENTI ----------------------------------

function windowResized(){
	// importante: il canvas deve essere ridimensionato assieme alla finestra
	resizeCanvas(windowWidth, windowHeight)
}

function keyPressed(){

}

function keyReleased(){

}

function mousePressed(){

}

function mouseReleased(){

}

function mouseMoved(){

}