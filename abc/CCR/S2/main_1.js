/**
 * Template per P5JS
 * Reference: https://p5js.org/reference/
 */
 
// funzione d’inizio
function setup(){
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

  translate(0,0);

  noFill();
  stroke(255);

  let mx = map(mouseX, width/2, width, width/2, width);
  let my = mouseY;

  if(mouseX < width/2){
    mx = width/2;
  } 

  if(mouseY > height/2-radius/2){
    my = height/2-radius/2;
  }

  // C1
  push();
  translate(mx, my);
  line(0, 0,radius,0);
  for ( angle=270; angle<360; angle=angle+pointAngle){
    x = cos(radians(angle)) * radius;
    y = sin(radians(angle)) * radius;
    line(0, 0, x, y);
  }
  pop();

  // 1IO
  push();
  translate(width/2, my);
  for(let i=0; i<mx-width/2; i=i+10){
    line(i, 0, i, -d);
    line(-i, 0, -i, -d);
  }
  line(width/2-mx,0,width/2-mx,-radius);
  pop();

  // C2
  push();
  translate(width-mx, my);
  for ( angle=180; angle<270; angle=angle+pointAngle){
    x = cos(radians(angle)) * radius;
    y = sin(radians(angle)) * radius;
    line(0, 0, x, y);
  }
  pop();

  // 2IV
  push();
  translate(width-mx, my);
  for(let i=0; i<height/2-mouseY-radius/2; i=i+10){
    line(0, i, -d, i);
  }
  pop();

  // C3
  push();
  translate(width-mx, height/2-radius/2);
  for ( angle=90; angle<180; angle=angle+pointAngle){
    x = cos(radians(angle)) * radius;
    y = sin(radians(angle)) * radius;
    line(0, 0, x, y);
  }
  line(0,0,-radius,0);
  pop();

  // I3O
  push();
  translate(width/2, height/2+radius/2);
  for(let i=0; i<mx-width/2; i=i+10){
    line(i, 0, i, -d);
    line(-i, 0, -i, -d);
  }
  pop();

  // C4
  push();
  translate(mx, height/2+radius/2);
  for ( angle=270; angle<360; angle=angle+pointAngle){
    x = cos(radians(angle)) * radius;
    y = sin(radians(angle)) * radius;
    line(0, 0, x, y);
  }
  line(0,0,radius,0);
  pop();

  // 4IV
  push();
  translate(mx+radius, height/2+radius/2);
  for(let i=0; i<height/2-my-radius/2; i=i+10){
    line(0, i, -d, i);
  }
  pop();

  // C5
  push();
  translate(mx, height/2-my+height/2);
  for ( angle=0; angle<90; angle=angle+pointAngle){
    x = cos(radians(angle)) * radius;
    y = sin(radians(angle)) * radius;
    line(0, 0, x, y);
  }
  line(0,0,0,radius);
  pop();


  // I5O
  push();
  translate(width/2, height/2-my+height/2+radius);
  for(let i=0; i<mx-width/2; i=i+10){
    line(i, 0, i, -d);
    line(-i, 0, -i, -d);
  }
  pop();

  // C6
  push();
  // translate(width-mx, height/2+d/2+mouseY/3)
  translate(width-mx, height/2+d/2+height/2-my-radius/2)
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

