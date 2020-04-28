/**
 * Template per P5JS
 * Reference: https://p5js.org/reference/
 */
// funzione d’inizio
function setup(){
	// creiamo un'applicazione della dimensione della finestra
	createCanvas(windowWidth, windowHeight)
}

// funzione di loop
function draw(){
	background(0);

	let minVal = 0;
  let maxVal = 200;
	const scale = min(width, height) / 100;
	const d= scale * 20;

  let points      = d/2
  let pointAngle  = 360/points;
  let radius      = d;

  translate(0,0-mouseY/6);

  noFill();
  stroke(255);

  // C1
  push();
  translate(width/2+mouseX/6, height/2-d/2)
  line(0, 0,radius,0);
  for ( angle=270; angle<360; angle=angle+pointAngle){
    x = cos(radians(angle)) * radius;
    y = sin(radians(angle)) * radius;
    line(0, 0, x, y);
  }
  pop();

  // 1IO
  push();
  translate(width/2, height/2-d/2);
  for(let i=0; i<mouseX/6; i=i+10){
    line(i, 0, i, -d);
    line(-i, 0, -i, -d);
  }
  pop();

  // C2
  push();
  translate(width/2-mouseX/6, height/2-d/2)
  for ( angle=180; angle<270; angle=angle+pointAngle){
    x = cos(radians(angle)) * radius;
    y = sin(radians(angle)) * radius;
    line(0, 0, x, y);
  }
  pop();

  // 2IV
  push();
  translate(width/2-mouseX/6, height/2-d/2);
  for(let i=0; i<mouseY/6; i=i+10){
    line(0, i, -d, i);
  }
  pop();

  // C3
  push();
  translate(width/2-mouseX/6, height/2+mouseY/6-d/2)
  for ( angle=90; angle<180; angle=angle+pointAngle){
    x = cos(radians(angle)) * radius;
    y = sin(radians(angle)) * radius;
    line(0, 0, x, y);
  }
  pop();

  // I3O
  push();
  translate(width/2, height/2-d/2+d+mouseY/6);
  for(let i=0; i<mouseX/6; i=i+10){
    line(i, 0, i, -d);
    line(-i, 0, -i, -d);
  }
  pop();

  // C4
  push();
  translate(width/2+mouseX/6, height/2+d/2+mouseY/6)
  for ( angle=270; angle<360; angle=angle+pointAngle){
    x = cos(radians(angle)) * radius;
    y = sin(radians(angle)) * radius;
    line(0, 0, x, y);
  }
  pop();

  // I4V
  push();
  translate(width/2+d+mouseX/6, height/2+d/2+mouseY/6);
  for(let i=0; i<mouseY/6; i=i+10){
    line(0, i, -d, i);
  }
  pop();

  // C5
  push();
  translate(width/2+mouseX/6, height/2+d/2+mouseY/3)
  for ( angle=0; angle<90; angle=angle+pointAngle){
    x = cos(radians(angle)) * radius;
    y = sin(radians(angle)) * radius;
    line(0, 0, x, y);
  }
  pop();


  // I5O
  push();
  translate(width/2, height/2-d/2+2*d+mouseY/3);
  for(let i=0; i<mouseX/6; i=i+10){
    line(i, 0, i, -d);
    line(-i, 0, -i, -d);
  }
  pop();

  // C6
  push();
  translate(width/2-mouseX/6, height/2+d/2+mouseY/3)
  line(0, 0,-radius,0);
  for ( angle=90; angle<180; angle=angle+pointAngle){
    x = cos(radians(angle)) * radius;
    y = sin(radians(angle)) * radius;
    line(0, 0, x, y);
  }
  pop();

}

// -- EVENTI ----------------------------------
// l'interazione tra il browser e il file funziona attraverso eventi 

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

// window.addEventListener("deviceorientation", function(event) {
//     alpha = event.alpha;
//     beta = event.beta;
//     gamma = event.gamma;
// });

// window.addEventListener('devicemotion', function(e) {
//     x = parseInt(e.accelerationIncludingGravity.x);
//     y = parseInt(e.accelerationIncludingGravity.y);
//     z = parseInt(e.accelerationIncludingGravity.z);
// });

// function touchStarted() {
//     getAudioContext().resume();
// }

