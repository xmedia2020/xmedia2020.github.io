function setup(){
	createCanvas(windowWidth, windowHeight);
}

function draw(){
	background(0);
	noFill();
	stroke(255);
	strokeWeight(1.5);

	const centro_x = width / 2
	const centro_y = height / 2

	let s = min(width, height)/ 35;

	// console.log(s)

	for (let i=0; i<TAU*7; i++){
		const raggio =  s + 10 * s/2
		const raggio1 = raggio + s*5

        const angolo = mouseX * 0.001 * mouseY * 0.001
		const angolo1 = mouseX * 0.001*  mouseY * -0.001

		const x = centro_x/1.05 + cos(angolo+i) * raggio /1.5
		const x1 = centro_x/1.05 + cos(angolo+i) * raggio1 /1.5
		const y = centro_y + sin(angolo+i) * raggio /1.5
		const y1 = centro_y + sin(angolo+i) * raggio1 /1.5
		line(x,y,x1,y1);

		line (x,y,centro_x+200,centro_y+170)

	}
}

function windowResized(){
	resizeCanvas(windowWidth, windowHeight)

}
