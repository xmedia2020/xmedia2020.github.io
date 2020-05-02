let x = 0;
let hu = 0;

function setup() {
  myFont = loadFont('ProspectusSBlk.otf');
  createCanvas(windowWidth, windowHeight);
  colorMode(RGB, 255);
  background(0);
}

function draw() {
  
  let wave = (sin(frameCount * 0.01 + (0.005) * 0.005) * 600);
  
  fill(0);
  stroke(255);
  strokeWeight(5);
  stroke(RGB, 255,255);
  fill(RGB, 255,255);
  ellipse(width/2,height/2,36,36);
  fill(0);
  if (RGB > 255){
   RGB = 0;
  }
  textFont("helvetica");
  translate(width/2,height/2);
  rotate(x);
  textSize(wave);
  textAlign(CENTER,CENTER);
  text('M',0,0);
  hu ++;
  x = x + 0.1;

}



function mousePressed() {
 
    save('Alessandra_Riva_M.jpg');
  
  }
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  marginX = windowWidth - int((windowWidth / slotSize)) * slotSize;
  marginY = windowHeight - int((windowHeight / slotSize)) * slotSize;
}