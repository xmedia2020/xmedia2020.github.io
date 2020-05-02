//con questo esercizio la "o" diventa un sound reconizer che si anima in base al volume percepito del microfono
// "o" come onda sonora

const n = 300;
let levels = new Array(n).fill().map(_ => 50),
    colors = new Array(n).fill(),
    input;

function setup() {
  createCanvas(windowWidth, windowHeight);
  strokeCap(PROJECT);
  strokeWeight(250/n);
  colorMode(0);
  color(0);
  let seed = random(255);
  colors = colors.map((_, i) => color(255,255,255));
  input = new p5.AudioIn();
  input.start();
}

function draw() {
  background(0);
  if(frameCount % 1 === 0){
    levels.shift();
    levels.push(input.getLevel()*2500+50);
  }
  push();
  translate(width/2, height/2);
  for(let i = 0; i < levels.length; i ++){
    stroke(colors[i]);
    line(170, 0, 170+levels[i], 0);
    rotate(TWO_PI/n);
  }
  pop();
}

function debug(val) {
    document.querySelector("#debug").textContent = "Debug : " + val;
}

function onClick() {
    // feature detect
    if (typeof DeviceMotionEvent.requestPermission === 'function') {
      DeviceMotionEvent.requestPermission()
        .then(permissionState => {
          if (permissionState === 'granted') {
            window.addEventListener('devicemotion', () => {});
          }
        })
        .catch(console.error);
    } else {
      // handle regular non iOS 13+ devices
    }
  }

  function noScroll() {
  window.scrollTo(0, 0);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  marginX = windowWidth - int((windowWidth / slotSize)) * slotSize;
  marginY = windowHeight - int((windowHeight / slotSize)) * slotSize;
}


function keyPressed(){
  if (key == 's' || key == 'S') {
    saveCanvas('F', 'png');
  } else if (key == 'x' || key == 'X'){
    setup()
  }

  return false;

}
function keyPressed(){
  if (key == 's' || key == 'S') {
    saveCanvas('ARI_o', 'png');
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