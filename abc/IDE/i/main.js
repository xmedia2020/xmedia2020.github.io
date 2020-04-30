let d = 0

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
}

function draw() {
  background(0)

  let locX = mouseX - height / 2;
  let locY = mouseY - width / 2;

  ambientLight(200);
  pointLight(200,200,200,10);


  push();
  translate(d, d, d);
  rotateZ(mouseX * -0.01);
  rotateX(frameCount * 0.01);
  //rotateY(mouseY  * -0.01);
  ambientMaterial(255,255,255);
  box(150, 350, 50, 600);
  pop();

  push();
  translate(d, d-225, d);
  rotateZ(mouseX * -0.01);
  rotateX(frameCount * 0.01);
  //rotateY(mouseY  * -0.01);
  ambientMaterial(255,255,255);
  torus(50, 20, 50, 600);
  pop();
}



function windowResized(){
    resizeCanvas(windowWidth, windowHeight)
}
