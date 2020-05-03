
let heart = 0


function setup() {
   createCanvas( windowWidth, windowHeight, WEBGL );
   angleMode(DEGREES)
}

function draw() {
   background(0);
   stroke(255);
   const s = min(width, height)/2;
   ambientLight(heart);
   //specularMaterial( 200,200,200 )
   //pointLight( 230,230,230, -60,0,90 );

   let rot = map(mouseX-width/2,0, width, 0,25)
   //camera( 100,100,200, 0,0,0, 0,1,0 );
   translate(0,height/4)
   push()
   rotate((-rot))
   push()
   rotateX(-55)
   rotateY(frameCount*0.5)
   translate(0,-s/2)
   cone( 60, s );
   pop()
   pop()
   stroke(255);
   push()
   rotate((rot))
   push()
   rotateX(-55)
   rotateY(-frameCount*0.5)
   translate(0,-s/2)
   cone( 60, s );
   pop()
   pop()
}
   



// -- EVENTI ----------------------------------

function windowResized(){
   // importante: il canvas deve essere ridimensionato assieme alla finestra
   resizeCanvas(windowWidth, windowHeight)
}

function keyPressed(){

   if (key == "h"){
      heart = 255

   } else if (key == "g"){
      heart = 0
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