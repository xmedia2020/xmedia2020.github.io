/**
 * K2
 *
 */



let circles = []


function setup(){
	createCanvas(windowWidth, windowHeight)
	background(0)
  noFill();
  
  stroke(255);
}

function draw(){
  background(0);
  translate(width/2, height/2)
      //translate(tW, tH);
    //scale(1, tH / tW);


    let x = map(mouseX, 0, width, -200, 200)
    let y = map(mouseY, 0, height, -200, 200)

    // creo un nuovo cerchio
    if(frameCount%10 === 0){

      let precedente = circles[0]
      const s = 5


      //spostare solo di s non di piu, cerchio non segue proprio il mouse ma va piano e si basa sul cerchio precedente
      if (precedente !== undefined) {

        if (x > precedente.x+s) {
          x = precedente.x + s
        } else if (x < precedente.x-s){
          x = precedente.x-s
        }

        if (y > precedente.y+s) {
          y = precedente.y + s
        } else if (y < precedente.y-s){
          y = precedente.y-s
        }
      }

      //sposta tutto e inserisce il nuovo cerchio
      circles.unshift({x:x, y:y, diametro:30})
    }
    

    // disegno i cerchi
    for (let i = 0; i < circles.length; i++) {
        const circle = circles[i]
        const d = circle.diametro

        ellipse(circle.x, circle.y, d, d);
        circles[i].diametro *=1.01
        const  s = 0.3

        //sposto cerchi piano piano verso il centro
        if (circles[i].x > 0 ){
          circles[i].x -=s
        } 
        else if (circles[i].x < 0 ){
          circles[i].x +=s
        }
        if (circles[i].y > 0 ){
          circles[i].y -=s
        }
        else if (circles[i].y < 0 ){
          circles[i].y +=s
        }

    }

    //pulizia lista quando cerchio diventa piÙ grande dello schermo
    circles = circles.filter( (c) => c.diametro < 1600 )
	 
    //console.log(circles.length)


}







// -- EVENTI ----------------------------------

function windowResized(){
	// importante: il canvas deve essere ridimensionato assieme alla finestra
	resizeCanvas(windowWidth, windowHeight)
}

function keyPressed(){

}

function keyReleased(){
	 if (key == 's' || key == 'S') {
    saveCanvas('O', 'png');
  } else if (key == 'x' || key == 'X'){
    setup()
  }

  return false;

}

function mousePressed(){
	

}

function mouseReleased(){

}

function mouseMoved(){

}

