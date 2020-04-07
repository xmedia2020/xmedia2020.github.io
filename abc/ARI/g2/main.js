// con questo skatch le lettere "m" grazie all'interazione si possono ruotare creando pattern
// "m" come modulo


let link = document.createElement('link'); // on crée un nouvel 'élément link
let fontList = "https://fonts.googleapis.com/css?family=Kanit|Rajdhani|Source+Code+Pro"; // on ajoute en source la lib (lien cdn)
link.href = fontList
link.rel = "stylesheet"
document.body.appendChild(link);

let fonts = ["Kanit", "Rajdhani", "Source Code Pro"]
let colors = ["00.00.00"]
let c = "0";

let slotSize = 100;
let marginX;
let marginY;


let ch = "g"

function setup() {
	createCanvas(windowWidth, windowHeight);
	background(180);
	pixelDensity(1);

	marginX = windowWidth - int((windowWidth / slotSize)) * slotSize;
	marginY = windowHeight - int((windowHeight / slotSize)) * slotSize;

	rectMode(CENTER); // carré au milieu

	textFont("eurostile")
}

function draw() {
	background(0)
	fill(c);
	stroke(c);


	strokeWeight(3);
	for (let i = marginX / 2 + slotSize / 2; i < width - marginX / 2; i += slotSize) {
		for (let j = marginY / 2 + slotSize / 2; j < height - marginY / 2; j += slotSize) {
			// code here

			push()
			translate(i, j);


			let angle = map(mouseX, 0, width, 0, TWO_PI); //relation de proportionnalité entre une grandeur et une grandeur
			let xOffset = map(mouseY, 0, height, -slotSize, slotSize)

			textSize(slotSize)
			textAlign(CENTER, CENTER)

			push(); // push et pop ouvre et ferme le code , rien dans les parenthese
			translate(xOffset, 0)
			rotate(angle);
			text(ch, 0, 0)
			pop()

			push()
			scale(-1, 1)
			translate(xOffset, 0)
			rotate(angle);
			text(ch, 0, 0)
			pop();

			pop()
		}
	}
}

function keyTyped() {
	ch = key

}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
	marginX = windowWidth - int((windowWidth / slotSize)) * slotSize;
	marginY = windowHeight - int((windowHeight / slotSize)) * slotSize;
}

function mousePressed(){
  if (mouseX < width / 2){
    save('Ale.jpg');
  }
  getAudioContext().resume()
}

function debug(val) {
    document.querySelector("#debug").textContent = "Debug : " + val;
}

  function onClick() {
    // feature detect
    if (typeof DeviceMotionEvent.requestPermission === 'function') {
      DeviceMotionEvent.requestPermission()
        .then(permissionState => {
          if (permissionState === 'granted') {
            window.addEventListener('devicemotion', () => {});
          }
        })
        .catch(console.error);
    } else {
      // handle regular non iOS 13+ devices
    }
  }

  function noScroll() {
  window.scrollTo(0, 0);
}