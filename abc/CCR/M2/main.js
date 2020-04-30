let mic
let micLevelSmooth = 0;
let posX = 0;
let posXI = 0;
let x;
let x1;
let pt = 0

function setup(){
	createCanvas(windowWidth, windowHeight)
  	mic = new p5.AudioIn()
  	mic.start();
}

function draw(){
	background(0)
	fill(255)
	noStroke()
	drawM();
}

function drawM(){
	let micLevel = mic.getLevel() * 100;
    micLevelSmooth = micLevelSmooth + (micLevel - micLevelSmooth) * 0.05;
	const scale = min(width, height) / 50
	const d = scale * micLevel * 100 + 30.0
	const e = scale * micLevelSmooth * 300 + 100;

	fill(255)
	noStroke()
	rectMode(CENTER);

	// --------------------------------------
	if(mouseX < width/2){
		if(posX+scale > width/2-scale){
			posX = 0;
		} else {
			posX = posX + micLevelSmooth;
		}
		let posRectX = posX+scale;
		rect(posRectX, height/2, scale*2, scale*20);

		beginShape();
		if(x > width/2){
			x = posX;
		} else {
			x = posRectX+scale;
		}
		vertex(x, height/2-scale*10);
		vertex(width/2, height/2+scale);
		vertex(width/2, height/2+scale*3);
		vertex(x, height/2-scale*10+scale*2);
		endShape(CLOSE);	
	} else {
		posX = posX;
		let posRectX = posX+scale;
		rect(posRectX, height/2, scale*2, scale*20);

		beginShape();
		if(x > width/2){
			x = posX;
		} else {
			x = posRectX+scale;
		}
		vertex(x, height/2-scale*10);
		vertex(width/2, height/2+scale);
		vertex(width/2, height/2+scale*3);
		vertex(x, height/2-scale*10+scale*2);
		endShape(CLOSE);	
	}

	// --------------------------------------
	if(mouseX > width/2){
		if(posXI+scale > width/2-scale){
			posXI = 0;
		} else {
			posXI = posXI + micLevelSmooth;
		}
		let posRectXI = width - posXI - scale;
		rect(posRectXI, height/2, scale*2, scale*20);

		beginShape();
		if(x1 < width/2){
			x1 = posRectXI-scale;
		} else {
			x1 = posRectXI-scale;
		}
		vertex(x1, height/2-scale*10);
		vertex(width/2, height/2+scale);
		vertex(width/2, height/2+scale*3);
		vertex(x1, height/2-scale*10+scale*2);
		endShape(CLOSE);
	} else {
		posXI = posXI;
		let posRectXI = width - posXI - scale;
		rect(posRectXI, height/2, scale*2, scale*20);

		beginShape();
		if(x1 < width/2){
			x1 = posRectXI-scale;
		} else {
			x1 = posRectXI-scale;
		}
		vertex(x1, height/2-scale*10);
		vertex(width/2, height/2+scale);
		vertex(width/2, height/2+scale*3);
		vertex(x1, height/2-scale*10+scale*2);
		endShape(CLOSE);
	}
}

// -- EVENTI ----------------------------------

function windowResized(){
	resizeCanvas(windowWidth, windowHeight)
}

function keyPressed(){
	if (key == 's' || key == 'S') {
		saveCanvas('M', 'png');
	} else if (key == 'x' || key == 'X'){
		setup()
	}

	return false;
}
