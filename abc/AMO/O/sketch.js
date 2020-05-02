/**
Referenze
http://www.generative-gestaltung.de

 
INPUT MOUSE
position x          : size
position y          : position
drag                : draw

 */
//'use strict';

//var font = 'sans-serif';
var letter = 'O';

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);
  fill(255,255,255, a); //riempie la lettera
  

 // textFont(font);
  textAlign(CENTER, CENTER);
}

function mouseMoved() {
  //clear(0);
  textSize((mouseX - width / 2) * 5 + 1);
  text(letter, width / 2, mouseY);
  background(0);
}
////https://editor.p5js.org/aferriss/sketches/rJf3luXdG
//imposto colore random da definire in scala di grigi
var r;
var g;
var b;
var a;




function mouseDragged() {
  //clear(0);
//  r = random(255); // r is a random number between 0 - 255
//  g = random(100,200); // g is a random number betwen 100 - 200
//  b = random(100); // b is a random number between 0 - 100
  a = random(90,100); // a is a random number between 90 - 100
  
  
  textSize((mouseX - width / 2) * 5 + 1);
  text(letter, width / 2, mouseY);
 // fill(0,0,0, a);
   fill(255,255,255, a);
  //background(0,200,0);

}

//function keyReleased() {
 // if (keyCode == CONTROL) saveCanvas(gd.timestamp(), 'png');
//}

//function keyTyped() {
  //letter = key;
//}

//function mouseReleased() {
//clear ()
//}
