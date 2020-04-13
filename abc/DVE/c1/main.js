/**
 * c_01
 * Reference: https://p5js.org/reference/
 * Possibilità di sketch con audio da perfezionare
 */

// funzione d’inizio

let frameNumber = 0;
let	cRadius
let d = 5
let switchOn = false;
// let mic
// let micLevelSmooth = 0

function setup() {
	createCanvas(windowWidth, windowHeight);
	// mic = new p5.AudioIn()
	// //userStartAudio()
	// mic.start();
  	frameRate(30);
	smooth();
	
	stroke(255);
	strokeWeight(2);
}

function draw() {
	// let micLevel = mic.getLevel()
	// micLevelSmooth = micLevelSmooth + (micLevel - micLevelSmooth) * 0.08
	//let scale = min(width, height) *0.7
	
	//let cRadius_smooth = scale * micLevelSmooth * 300.0 + 10
	let	cRadius = floor(map(mouseX, 0, width, 0, 1000))
	background(0);
	translate(width / 2, height / 2);
		
	if(switchOn){
		for(let radius = 100; radius < 250; radius += 10){
			for(let deg = 320; deg > 360 * noise(cRadius * 0.025 + radius * 0.005); deg -= 1){
			line(radius * cos(radians(deg)), radius * sin(radians(deg)), radius * cos(radians(deg + 1)), radius * sin(radians(deg + 1)));
			}
			//ellipse(radius * cos(radians(360 * noise(cRadius * 0.025 + radius * 0.005))), radius * sin(radians(360 * noise(cRadius * 0.025 + radius * 0.005))), d, d);
		}

		// for(let radius = 100; radius < 250; radius += 10){
		// 	for(let deg = 320; deg > 360 * noise(cRadius_smooth * 0.025 + radius * 0.005); deg -= 1){
		// 	line(radius * cos(radians(deg)), radius * sin(radians(deg)), radius * cos(radians(deg + 1)), radius * sin(radians(deg + 1)));
		// 	}
		// 	ellipse(radius * cos(radians(360 * noise(cRadius_smooth * 0.025 + radius * 0.005))), radius * sin(radians(360 * noise(cRadius_smooth * 0.025 + radius * 0.005))), d, d);
		// }
	} else {
		for(let radius = 100; radius < 250; radius += 10){
			for(let deg = 320; deg > 360 * noise(frameNumber * 0.025 + radius * 0.005); deg -= 1){
			line(radius * cos(radians(deg)), radius * sin(radians(deg)), radius * cos(radians(deg + 1)), radius * sin(radians(deg + 1)));
			}
			//ellipse(radius * cos(radians(360 * noise(frameNumber * 0.025 + radius * 0.005))), radius * sin(radians(360 * noise(frameNumber * 0.025 + radius * 0.005))), d, d);
		}
	}
	
	frameNumber += 1;


}

// -- EVENTI ----------------------------------

function windowResized(){
	// importante: il canvas deve essere ridimensionato assieme alla finestra
	resizeCanvas(windowWidth, windowHeight)
}

function keyPressed(){




}

function keyReleased(){

}

function mousePressed(){
	switchOn = !switchOn;

}

function mouseReleased(){

}

function mouseMoved(){

}

