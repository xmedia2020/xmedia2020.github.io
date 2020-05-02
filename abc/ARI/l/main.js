
var x = 0, y = 0;
var stepSize = 5.0;
var letters = "I";
var fontSizeMin = 3;
var angleDistortion = 0.0;
var counter = 0;


function setup() { 
  createCanvas(windowWidth, windowHeight);
  background(0);
  colorMode(RGB, 0);
  smooth();
  cursor(CROSS);
 
  x = mouseX;
  y = mouseY;

  textAlign(LEFT);
  fill(0);

}

function draw() {
  if (mouseIsPressed) {
    var d = dist(x,y, mouseX,mouseY);
    textFont('helvetica');
    textSize(fontSizeMin+d/2)
    var newLetter = letters.charAt(counter);;
    stepSize = textWidth(newLetter);

    if (d > stepSize) {
      var angle = atan2(mouseY-y, mouseX-x); 

      push();
      translate(x, y);
      rotate(angle + random(angleDistortion));
      text(newLetter, 0, 0);
      pop();

      counter++;
     if (counter > letters.length-1) counter = 0;

      x = x + cos(angle) * stepSize;
      y = y + sin(angle) * stepSize; 
    }
  }
}

function mousePressed() {
  x = mouseX;
  y = mouseY;
}
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  marginX = windowWidth - int((windowWidth / slotSize)) * slotSize;
  marginY = windowHeight - int((windowHeight / slotSize)) * slotSize;
}

