/**
 * c_01
 * Reference: https://p5js.org/reference/
 */


let frameNumber = 0;
let	cRadius
let switchOn = false;
let radius
let musica = 0
let b = 2
let	rot


function setup() {
	createCanvas(windowWidth, windowHeight);
  	frameRate(30);
	smooth();
	strokeCap(PROJECT)

	
	stroke(255);
	strokeWeight(b);

}

function draw() {


	let	cRadius = floor(map(mouseX, 0, width, 400, 600))

	background(0);
	translate(width / 2, height / 2);

	rot = floor(map(mouseY, 0, height, 50, 140))
		
	if(switchOn){
		for(let radius = min(width,height)/6; radius < min(width,height)/3; radius += min(width,height)/50){
			strokeWeight(b)
			rotate(musica) //musica viva muller-brockmann
		for(let deg = 320; deg > 360 * noise(cRadius * 0.025 + radius * 0.005); deg -= 1){
			line(radius * cos(radians(deg)), radius * sin(radians(deg)), radius * cos(radians(deg + 1)), radius * sin(radians(deg + 1)));
			}
		}

	} else {
		for(let radius = min(width,height)/6; radius < min(width,height)/3; radius += min(width,height)/50){
			strokeWeight(b)
			for(let deg = 320; deg > 360 * noise(frameNumber * 0.025 + radius * 0.005); deg -= 1){
			line(radius * cos(radians(deg)), radius * sin(radians(deg)), radius * cos(radians(deg + 1)), radius * sin(radians(deg + 1)));
			}
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
	
	if(key == 'b'){
		musica = 741
		b = min(width,height)/65

	} else if (key == 'x'){
		musica = 0
		b = 2
	} else if (key == 's'){
		save("letter");
	}

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

