/**
 * Steering Behaviors
 * Reference: https://www.youtube.com/watch?v=4hA7G3gup-4&vl=en
 */


let index = 0;
let font;
let vehicles = [];
let density= 0.12;
let textBool = true;
let bounds
let tSize = 400


let words = ["B", "b","P", "p", "F", "f",];
//let words = ["A", "a", "B", "b", "C", "c","I", "i"];

function preload() {
  font = loadFont ('fonts/MaisonMono-Regular.otf');
}

function setup() { 
  createCanvas(windowWidth, windowHeight);
  rectMode(CENTER)

  tSize = Math.min(height/2, width/2)

  const raw_points = font.textToPoints(words[index], 0, 0, tSize, {sampleFactor: density});

  const bb = getBB(raw_points)

  const points = []

  for (let i = 0; i<raw_points.length; i++) {
    points[i] = {
      x : (raw_points[i].x - bb.x - bb.width/2) / bb.height,
      y : (raw_points[i].y  - bb.y - bb.height/2) / bb.height,
    }
  }


  translate(width/2, height/2)
  for (const p of points) {
    let vehicle = new Vehicle(p.x *tSize, p.y*tSize);
    vehicles.push(vehicle);
  }

}

function draw() {
  background(0);

  tSize = Math.min(height/2, width/2)

  if (index >= words.length) { index = 0;}
  
  
  push()
  translate(width/2, height/2)
  for (let i = 0; i < vehicles.length; i++) {
    let v = vehicles[i];
    v.behaviors();
    v.update();
    v.show();

  }
  pop();

}

function getBB(punti) {

  const bb = {
    min_x :  Number.MAX_VALUE,
    min_y :  Number.MAX_VALUE,
    max_x : -Number.MAX_VALUE,
    max_y : -Number.MAX_VALUE
  }

  for (const p of punti) {
    if (p.x < bb.min_x) bb.min_x = p.x
    if (p.x > bb.max_x) bb.max_x = p.x
    if (p.y < bb.min_y) bb.min_y = p.y
    if (p.y > bb.max_y) bb.max_y = p.y
  }

  bb.width = bb.max_x - bb.min_x
  bb.height = bb.max_y - bb.min_y
  bb.x = bb.min_x
  bb.y = bb.min_y

  return bb
}

function particles (val){

  const raw_points = font.textToPoints(words[index], 0, 0, tSize, {sampleFactor: density});

  const bb = getBB(raw_points)

  const points = []

  for (let i = 0; i<raw_points.length; i++) {
    points[i] = {
      x : (raw_points[i].x - bb.x - bb.width/2) / bb.height,
      y : (raw_points[i].y  - bb.y - bb.height/2) / bb.height,
    }
  }
  //console.log(points.length);

  if (points.length > vehicles.length) {
    for (let i =0; i < vehicles.length; i++) {
      let p = points[i];
      let v = vehicles[i];
      v.newTarget(p.x *tSize, p.y*tSize);
    }
    for (let i = vehicles.length; i < points.length; i++) {
      let p = points[i];
      let vehicle = new Vehicle(p.x *tSize, p.y*tSize);
      vehicles.push(vehicle);
    }
  } else if (points.length < vehicles.length){
    for (let i = points.length; i < vehicles.length; i++) {
      let v = vehicles[i];
      v.newTarget(random(-width*20,width*20), random(-height*20,height*20));
    }
    for (let i =0; i < points.length; i++) {
      let p = points[i];
      let v = vehicles[i];
      v.newTarget(p.x *tSize, p.y*tSize);
    }
  } else {
    for (let i =0; i < points.length; i++) {
      let p = points[i];
      let v = vehicles[i];
      v.newTarget(p.x *tSize, p.y*tSize);
    }
  }
}

// function isOdd(num) { return num % 2;}

function mousePressed() {
  //console.log(random(-width*20,width*20), random(-height*20,height*20))
  index = index +1;
  if (index >= words.length) {
    index = 0;
  }
  particles(words[index])
  
  
}


function keyPressed() {
  // index = index +2;  
  // if (index >= words.length) {
  //   index = 0;
  // }
  // particles(words[index])
  
}

function windowResized(){
  resizeCanvas(windowWidth, windowHeight)
}