let SIZE = 120;
let t = 0.0;
let points = [];
let font;
let zPers = 400
let stato1 = false;

function preload() {
	font = loadFont('https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-medium-webfont.ttf');
}

function setup() {
    createCanvas(windowWidth, windowHeight, WEBGL);
    colorMode(255);
    background(0);
    let txtSize = 1000;
    textSize(txtSize);
    ortho(-width / 2, width / 2, -height / 2, height / 2, 0, 1000);

    let ps = font.textToPoints('P', txtSize/-3, txtSize/3, 0, {
        sampleFactor: 0.1,
        simplifyThreshold: 0
    });

    for (let i in ps) {
        points.push(createVector(ps[i].x, ps[i].y, random(zPers/-30, zPers/4)))
    }
}

let zC=0;
let r = 255, g = 255, b = 255;

function draw() {
  
  if (stato1==true) {
    colorMode(255);
    background(0);
    rotateY(frameCount * 0.010);
	noStroke();
    for (let i in points) {
        push();
        let pt = points[i];
        let z = (pt.z + zC) % zPers - zPers / 2
        fill(noise(r,i/1000)*255, noise(g,i/1000)*255, noise(b,i/1000)*255)
        translate(pt.x, pt.y, z);
        box(5, 5, 20);
        pop();
    }
	zC += 3;
	r += 0.0;
	g += 0.0;
	b += 0.0;
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