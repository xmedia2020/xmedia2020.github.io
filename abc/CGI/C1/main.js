let r;
let factor = 2;


function setup() {
  createCanvas(windowWidth, windowHeight);
  r = height / 2 - 20;
}
 
function getVector(index, total) {
  const angle = map(index % total, width/2, total, 0, PI);
  const v = p5.Vector.fromAngle(angle + PI);
  v.mult(r);
  return v;
}

function draw() {
  background(0);
  const total = (map(mouseX, 0, 500, 0, 162));
  
  
  translate(width / 2, height / 2);
  stroke(255, 100);
  strokeWeight(2);
  noFill();
  //ellipse(0, 0, r * 2);

  strokeWeight(2);
  for (let i = 0; i < total; i++) {
    const a = getVector(i, total);
    const b = getVector(i * factor, total);
    line(a.x, a.y, b.x, b.y);
  }
}