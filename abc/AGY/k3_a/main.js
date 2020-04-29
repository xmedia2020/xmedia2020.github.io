/**
 * K3
 *
 */


const punti = [
	{x : 0.00, y : 0.00},
	{x : 2.14, y : 0.00},
	{x : 2.14, y : 5.14},
	{x : 4.53, y : 2.61},
	{x : 7.15, y : 2.61},
	{x : 4.60, y : 5.24},
	{x : 7.48, y : 10.0},
	{x : 4.96, y : 10.0},
	{x : 3.06, y : 6.81},
	{x : 2.12, y : 7.96},
	{x : 2.12, y : 10.0},
	{x : 0.00, y : 10.0}
]

const bb = calcBB(punti)
const len = calcLen(punti)

// risultato:
console.log("Numero di segmenti (forma chiusa): " + len.num)
console.log("Lunghezza totale: " + len.total)
console.table(len.segments)
console.table(len.offsets)


function setup(){
	createCanvas(windowWidth, windowHeight)
}

function draw(){
	background(0)
	translate(width/2, height/2)

	noFill()
	strokeWeight(1.5)

	const s = 25

	push()									// push() salva la trasformazione attuale della matrice
	translate(-bb.w/2 * s, -bb.h/2 * s) 	// centriamo la lettera
	stroke(255)
	beginShape()							// disegno dei piunti connessi
	for(const p of punti){
		vertex(p.x * s, p.y * s)
	}
	endShape(CLOSE)							// CLOSE connette ultimo vertice al primo

	fill(255)
	noStroke();
	const p = getP(punti, len, frameCount / 500.0)
	ellipse(p.x * s, p.y * s, 7, 7)

	// disegno della BB
	stroke(0, 180, 255)
	noFill()
	const m = 5
	rect(bb.x*s - m, bb.y*s - m, bb.w*s + m*2, bb.h*s + m*2)

	pop()

}


// funzione che calcola la "bounding box" di un set di coordinate
function calcBB(pts){
	const bb = { 								// Creiamo al volo un oggetto arbitrario
		min_x :  Number.MAX_VALUE,
		min_y :  Number.MAX_VALUE,
		max_x : -Number.MAX_VALUE,
		max_y : -Number.MAX_VALUE,
	}

		for(const p of pts){
		bb.min_x = Math.min(bb.min_x, p.x)
		bb.max_x = Math.max(bb.max_x, p.x)
		bb.min_y = Math.min(bb.min_y, p.y)
		bb.max_y = Math.max(bb.max_y, p.y)
	}
	bb.x = bb.min_x
	bb.y = bb.min_y
	bb.w = bb.max_x-bb.min_x
	bb.h = bb.max_y-bb.min_y
	return bb
}

// funzione che calcola la lunghezza del tracciato
function calcLen(pts) {
	const segments = []
	const offsets  = []
	let total = 0
	for(let i=0; i<pts.length; i++){
		const  a = pts[i]
		const  b = pts[ (i+1) % pts.length]
		const l = Math.sqrt(Math.pow(b.x-a.x,2) + Math.pow(b.y-a.y,2))
		segments.push(l)
		offsets.push(total)
		total += l
	}
	return {
		segments,               // lunghezza di ogni segmento
		offsets,				// lunghezza fino a quel punto
		total,           		// lunghezza totale
		num : pts.length  		// numero di segmenti
	}
}

// Interpolazione lineare tra due punti in funzione di t (0...1)
function pointLerp(a, b, t){

	return {
		x : a.x + (b.x - a.x) * t,
		y : a.y + (b.y - a.y) * t,
	}
}


function getP(pts, len, t) {
	const tl = (t * len.total) % len.total

	const i  = binarySearch(len.offsets, tl)
	const d  = tl - len.offsets[i]
	const ts = d / len.segments[i]

	const p = pointLerp(pts[i], pts[(i + 1) % pts.length], ts)



	return {
		index : i,
		delta : d,
		x : p.x,
		y : p.y
	}
}



// Funzione che trova il valore più vicino a val nella tabella arr
// NOTA: arrotondato sempre verso il basso
function binarySearch(arr, val){

	if  (arr.length < 2) return 0

	let lower = 0
	let upper = arr.length
	let mid   = Math.floor((upper - lower) / 2)
	let idx   = -1

	let count = 100 // sicurezza

	while(true){
		if (val == arr[mid]) {
			break
		} else if (val > arr[mid]) {
			lower = mid
		} else {
			upper = mid
		}
		mid = lower + Math.floor((upper - lower) / 2)
		if (upper - lower == 1) break
		if (count-- == 0) break // sicurezza
	}

	return mid

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

