let link = document.createElement('link'); // on crée un nouvel 'élément link'
let fontList = "https://fonts.googleapis.com/css?family=Abril+Fatface|News+Cycle|Playfair+Display|Righteous"
let slotSize = 100;
let marginX;
let marginY;

let fonts = ["Abril Fatface", "News Cycle", "Playfair Display","Righteous"]
let ch = "I"


function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);
  pixelDensity(1);
  rectMode(CENTER);

  marginX = windowWidth - int((windowWidth / slotSize)) * slotSize;
  marginY = windowHeight - int((windowHeight / slotSize)) * slotSize;
  
  textFont("Playfair Display")
}


function draw() {
  background(0)
  for (let i = marginX / 2 + slotSize / 2; i < width - marginX / 2; i += slotSize) {
    for (let j = marginY / 2 + slotSize / 2; j < height - marginY / 2; j += slotSize) {
      let angle = map(mouseX, 0, width, 0, TWO_PI)
      push()

      textSize(slotSize)
      textAlign(CENTER,CENTER)

      fill(255)
      noStroke()
      strokeWeight(3)

      translate(i, j)
      rotate(angle)
      text(ch,0,0)
      

      pop()

    }
  }
}

function noScroll() {
  window.scrollTo(0, 0);
}

function keyTyped() {
    ch = key
}


function mousePressed() {
  slotSize = random(10, 200);
  let fontIndex = int(random(fonts.length))
  textFont(fonts[fontIndex])
  
  marginX = windowWidth - int((windowWidth / slotSize)) * slotSize;
  marginY = windowHeight - int((windowHeight / slotSize)) * slotSize;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  marginX = windowWidth - int((windowWidth / slotSize)) * slotSize;
  marginY = windowHeight - int((windowHeight / slotSize)) * slotSize;
}

function keyPressed(){
  if (key == 's' || key == 'S') {
    saveCanvas('ARI_I', 'png');
  } 
  }