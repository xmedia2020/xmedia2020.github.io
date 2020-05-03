let value1 = 100 ;
let value2 = 0;
let stato1 = false;

function setup() {
    createCanvas(windowWidth, windowHeight);

}
 
function draw() {
  background(0,50);
  
  if (stato1==true) {
      var wave1 = (sin(frameCount * 0.02) * 200);
    if (wave1 < 0) {
    wave1 = -wave1;
  }
  
  var wave2 = (cos(frameCount * 0.02) * 200);
    if (wave2 < 0) {
    wave2 = -wave2;
  }

  
fill(255);
noStroke();
// stroke(0);
// strokeWeight(1);
   translate(windowWidth/2-150, windowHeight/2-100);

  rectMode(LEFT);
  rect(0,-50,10+wave1,300);
  rect(0,250,300,-wave2,0);
  
  
  }
  }
function mousePressed() {

 
        if (stato1 == true) {
            stato1 = false;
        } else {
            stato1 = true;
        }
    }

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  marginX = windowWidth - int((windowWidth / slotSize)) * slotSize;
  marginY = windowHeight - int((windowHeight / slotSize)) * slotSize;
}

function keyPressed(){
  if (key == 's' || key == 'S') {
    saveCanvas('ARI_L', 'png');
  } 
  }
