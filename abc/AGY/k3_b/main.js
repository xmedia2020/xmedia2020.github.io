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

const bb  = calcBB(punti)  // calcoliamo la BB della shape
const len = calcLen(punti) // calcoliamo le lunghezze dei segmenti

// TODO: si potrebbe pensare ad un oggetto 'shape' con:
// {
//		punti   : [{x, y},...],
//		closed  : true / false,
//	    length  :  <-- calcLen()
//		aabb    :  <-- calcBB()
//		sides   : opzionale, connettività tra vertici
//		scavato : se è una shape da scavare
// }
// ... forse troppo complicato e inutile

function setup(){
	createCanvas(windowWidth, windowHeight, WEBGL)
	smooth()
}

function draw(){

	background(0)

	const num_frames = 800 // Durata della loop in frames
	// Marker per export in loop
	// if (frameCount % num_frames < 5) {
	// 	rectMode(CENTER)
	// 	rect(0, 0, height-2, height-2)
	// }
	// const a = frameCount / num_frames * TAU

	const a = (mouseX - width/2) * 0.003
	rotateY(a)

	stroke(255)
	strokeWeight(1)
	noFill()

	const s = 30			// Scala della shape
	const num = 100
	const d = map(mouseY, 0, height, 1, 1000)

	for (let i=0; i<num; i++){

		push()
		translate(-bb.w/2 * s, -bb.h/2 * s) 		// Centriamo la lettera (con bb precalcolato)

		// const z = map(i, 0, num, -s*2.5, s*2.5) 	// Offset in profondità
		const z = map(i, 0, num, -d, d) 	// Offset in profondità

		const t1 = frameCount / num_frames * 2 + i * 0.02
		const t2 = t1 + 0.2
		const pts_sub = getSub(punti, len, t1, t2)	// Disegno interpolato
		for(let i=0; i<pts_sub.length-1; i++){
			const a = pts_sub[i  ]
			const b = pts_sub[i+1]
			beginShape() 							// C'è un  bug nella libreria di P5JS:
			vertex(a.x * s, a.y * s, z)				// on si reiscono a costruire shapes
			vertex(b.x * s, b.y * s, z)				// senza 'fill'
			endShape()
		}
		pop()
	}
}


// Funzione che calcola la "bounding box"
// di un set di coordinate
function calcBB(pts){

	const bb = {
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
	bb.w = bb.max_x - bb.min_x
	bb.h = bb.max_y - bb.min_y
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

// Ritorna un punto nella posizione t (0...1) nella shape pts
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

// Ritorna un frammento della shape compresa tra t1 e t2
function getSub(pts, len, t1, t2){
	// if (t1 > t2) [t1, t2] = [t2, t1]
	// t1 = t1 % 1.0
	// t2 = t2 % 1.0

	const a = getP(pts, len, t1)
	const b = getP(pts, len, t2)
	let ia = (a.index + 1) % pts.length
	let ib = (b.index + 1) % pts.length
	let out
	if (ia <= ib) {
		out = pts.slice(ia, ib)
	} else {
		out = pts.slice(ia, pts.length).concat(pts.slice(0, ib))
	}
	out.unshift(a) 	// primo punto (interpolato)
	out.push(b)		// ultimo punto (interpolato)

	return out
}

// Funzione che trova (via binary search)
// il valore più vicino a val nella tabella arr
// NOTA: arrotondato sempre verso il basso
function binarySearch(arr, val){
	if  (arr.length < 2) return 0
	let lower = 0
	let upper = arr.length
	let mid   = Math.floor((upper - lower) / 2)
	let idx   = -1

	while(true){
		if (val > arr[mid]) {
			lower = mid
		} else if (val < arr[mid]){
			upper = mid
		} else {
			break						// val corrisponde a un valore dell'array
		}
		mid = lower + Math.floor((upper - lower) / 2)
		if (upper - lower == 1) break 	// I due estremi si sono avvicinati, trovato!
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

