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

function setup() { 
  createCanvas(windowWidth, windowHeight);
  rectMode(CENTER)

  tSize = Math.min(height/2, width/2)

  

  particles(lettere[index])
  console.log(lettere[index])

}

function draw() {
  background(0);

  tSize = Math.min(height/2, width/2)
  
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

function particles (val){

  const points = lettere[index]

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



function mousePressed() {

  index = (index + 1) % words.length
  particles(lettere[index])
  
  
}

function keyPressed() {


}


function windowResized(){
  resizeCanvas(windowWidth, windowHeight)
}