/**
 * Template per P5JS
 * Reference: https://p5js.org/reference/
 */

let img;
let pg;
let textTexture;
let boxSize = 400;
//let font1;
let t;

let indexWord = 0;
let words = ['L'];



 //console.log(punti[])
 //console.table crea una tabella
 //console.log( "numero di punti" + punti.lenght /2 ) dice quanti sono



// funzione d’inizio
function setup(){
	// creiamo un'applicazione della dimensione della finestra
	//createCanvas(windowWidth, windowHeight)

	createCanvas(windowWidth, windowHeight,WEBGL);
	pg = createGraphics(200, 200);

	pg.image = (img);

	textTexture = createGraphics(boxSize,boxSize);

	textTexture.background(0);
	textTexture.fill(255);
	//textTexture.textFont(font1);
	//textTexture.textAlign(CENTER);
	textTexture.textSize(30);
}

// funzione di loop
function draw(){
	background(0)
	//fill(255)
	noStroke()
	let wave = (sin(frameCount * 0.05 +350)*3);

	textTexture.background(0);
	textTexture.translate(0,wave);
	
	for(let i = 0; i <=30; i++){
		textTexture.text(words[indexWord], 0,i*50);
	}

	push();
	rotateZ(radians(45));
		push();
		rotateX(frameCount * 0.01);
		// textureWrap(wrapX, [wrapY])
		texture(textTexture);
		box(boxSize);
		pop();
	pop();
	
	//console.log(t)
	t+=40;

}
	

function changeWord() {
	indexWord++;
	if(indexWord > 4){
		indexWord = 0;
	}
	setTimeout(changeWord, 500)
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

}

function mouseReleased(){

}

function mouseMoved(){

}