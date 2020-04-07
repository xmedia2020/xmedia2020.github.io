/**
 * 
 * Reference: https://p5js.org/reference/
 * generative geometric letters 
 * inspired by IG @duane_dalton
 * Mouse interaction
 */
 let size = 500
 let space = 20


let punti = [{	p1x : 0,
				p1y : 0,
				p4x : size/2,
				p4y : size/2,

				},
			{	p1x : size/2,
				p1y : 0,
				p4x : size,
				p4y : size/2,

				},
			{	p1x : 0,
				p1y : size/2,
				p4x : size/2,
				p4y : size,

				},
			{	p1x : size/2,
				p1y : size/2,
				p4x : size,
				p4y : size,

				}

			]


// funzione d’inizio
function setup(){
	// creiamo un'applicazione della dimensione della finestra
	createCanvas(windowWidth, windowHeight)

	rectMode(CORNER)
	background(0)
	frameRate(10)
	randomSeed(51)

	translate(width/2-size/2, height/2-size/2)
	arcLines(0)
	arcLines(1)
	arcLines(2)
	arcLines(3)




}

// funzione di loop
function draw(){
	//background(0)
	
	translate(width/2-size/2, height/2-size/2)

		if(mouseIsPressed){
	 		
			if (mouseX-(width/2-size/2) >= punti[0].p1x && mouseX-(width/2-size/2) <= punti[0].p4x && mouseY-(height/2-size/2) >= punti[0].p1y && mouseY-(height/2-size/2) <= punti[0].p4y) {
    			arcLines(0)
 	 		} else if (mouseX-(width/2-size/2) >= punti[1].p1x && mouseX-(width/2-size/2) <= punti[1].p4x && mouseY-(height/2-size/2) >= punti[1].p1y && mouseY-(height/2-size/2) <= punti[1].p4y) {
    			arcLines(1)
 	 		} else if (mouseX-(width/2-size/2) >= punti[2].p1x && mouseX-(width/2-size/2) <= punti[2].p4x && mouseY-(height/2-size/2) >= punti[2].p1y && mouseY-(height/2-size/2) <= punti[2].p4y) {
    			arcLines(2)
 	 		} else if (mouseX-(width/2-size/2) >= punti[3].p1x && mouseX-(width/2-size/2) <= punti[3].p4x && mouseY-(height/2-size/2) >= punti[3].p1y && mouseY-(height/2-size/2) <= punti[3].p4y) {
    			arcLines(3)
 	 		} else {
 	 			arcLines(0)
				arcLines(1)
				arcLines(2)
				arcLines(3)
 	 		}
 	 		
		}
	

	
}



function arcLines(arrayIndex){
	//let space = map(mouseX,0,width,0,500)
	let n = (int(random(0,8)))
	let x = punti[arrayIndex].p1x
	let y =	punti[arrayIndex].p1y

		if (n==0){
			//arc 3h-6h
			push()
			noStroke()
			fill(0)
			rect(x,y,size/2,size/2)
			noFill()
			stroke(255)
			for (let j = 0; j < size/2+space/2; j+= space/2) {
	  			line(x, y+j, x+size/2, y+j);
			}
			fill(255)
			stroke(0)
			for (let i = size; i > 0; i-= space) {
				arc(x, y, i, i,0,HALF_PI);
			}
			pop()
		} else if (n==1){
			//arc 12h-3h
			push()
			noStroke()
			fill(0)
			rect(x,y,size/2,size/2)
			translate(0,size/2)
			noFill()
			stroke(255)
			for (let j = -size/2; j < 0+space/2; j+= space/2) {
		  		line(x, y+j, x+size/2, y+j);
			}
			fill(255)
			stroke(0)
			for (let i = size; i > 0; i-= space) {
				arc(x, y, i, i, PI+HALF_PI,0);
			}
			pop()
		} else if (n==2){
			//orizontal lines whiteRect
			push()
			fill(255)
			noStroke()
			rect(x,y,size/2,size/2)
			noFill()
			stroke(0)
			for (let j = 0; j < size/2+space/2; j+= space/2) {
  				line(x, y+j, x+size/2, y+j);
			}
			pop()
		} else if (n==3){
			//vertical lines blackBG
			push()	
			stroke(0)
			fill(0)
			rect(x,y,size/2,size/2)	
			noFill()
			stroke(255)
			for (let j = 0; j < size/2+space/2; j+= space/2) {
  				line(x+j, y, x+j, y+size/2);
			}
			pop()
		} else if (n==4){
			//orizontal lines blackBG
			push()	
			stroke(0)
			fill(0)
			rect(x,y,size/2,size/2)	
			noFill()
			stroke(255)
			for (let j = 0; j < size/2+space/2; j+= space/2) {
  				line(x, y+j, x+size/2, y+j);
			}
			pop()
		} else if (n==5){
			//vertical lines whiteRect
			push()
			noStroke()
			fill(255)
			rect(x,y,size/2,size/2)
			noFill()
			stroke(0)
			for (let j = 0; j < size/2+space/2; j+= space/2) {
  				line(x+j, y, x+j, y+size/2);
			}
			pop()
		} else if (n==6){
			//arc 6h-9h
			push()
			noStroke()
			fill(0)
			rect(x,y,size/2,size/2)
			translate(size/2,0)
			noFill()
			stroke(255)
			for (let j = 0; j < size/2+space/2; j+= space/2) {
	  			line(x, y+j, x-size/2, y+j);
			}
			fill(255)
			stroke(0)
			for (let i = size; i > 0; i-= space) {
				arc(x, y, i, i,HALF_PI,PI);
			}
			pop()
		} else if (n==7){
			//arc 9h-12h
			push()
			noStroke()
			fill(0)
			rect(x,y,size/2,size/2)
			translate(size/2,size/2)
			noFill()
			stroke(255)
			for (let j = -size/2; j < 0+space/2; j+= space/2) {
	  			line(x, y+j, x-size/2, y+j);
			}
			fill(255)
			stroke(0)
			for (let i = size; i > 0; i-= space) {
				arc(x, y, i, i,PI,PI+HALF_PI);
			}
			pop()
		}

	
}


// -- EVENTI ----------------------------------

function windowResized(){
	// importante: il canvas deve essere ridimensionato assieme alla finestra
	resizeCanvas(windowWidth, windowHeight)
	background(0)

	arcLines(0)
	arcLines(1)
	arcLines(2)
	arcLines(3)
}



function keyPressed(){

	//if the key is a s
	if(key == 's'){
		//save out to a file
		save("letter");
	}

}

function keyReleased(){

}

function mousePressed(){


}

function mouseReleased(){

}

function mouseMoved(){

}

