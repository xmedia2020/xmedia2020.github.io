/**
 * Particelle
 *
 */


let particelle = [] // inizializziamo un array (vuoto)
const griglia = 15
let values
let letterW, letterH
let stepX, stepY;
let radius = 100

function preload() {
    //json = loadJSON("g_coord.json")
    img = loadImage("assets/g6.png")
}

function setup() {
    createCanvas(windowWidth, windowHeight)
    letterW = width/2 
    letterH = letterW
    stepX = letterW / griglia
    stepY = stepX
    values = getValues()
    console.log(values)
}

function draw() {

    background(0)

    push()
    translate(width/2-letterW/2, height/2-letterH/2)

    fill(255)
    noStroke()

    for (const part of particelle) {
        if (part.life % griglia == 0) {

            part.dir = (part.dir + 4 + floor(random(-1, 2))) % 4

            if (part.dir == 0) { // nord
                part.vx = 0
                part.vy = -part.vel
            } else if (part.dir == 1) { // est
                part.vx = part.vel
                part.vy = 0
            } else if (part.dir == 2) { // sud
                part.vx = 0
                part.vy = part.vel
            } else { //   ovest
                part.vx = -part.vel
                part.vy = 0
            }
        }
        const d = Math.min(part.life / 50, part.diametro)
        part.life--
        part.px = part.px + part.vx
        part.py = part.py + part.vy



        rect(part.px - d / 2, part.py - d / 2, d, d)
    }

    // togliamo dall'array le particelle con una vita minore a 0 (frames)
    particelle = particelle.filter(function(e) {
        return e.life > 0
    })

    stroke(255, 0, 0)
    noFill()

    pop()
    //noLoop()
}

// -- EVENTI ----------------------------------

function windowResized() {
    // importante: il canvas deve essere ridimensionato assieme alla finestra
    resizeCanvas(windowWidth, windowHeight)
}

function mouseMoved() {
	let nMouseX = mouseX - (width/2-letterW/2)
	let nMouseY = mouseY - (height/2-letterH/2)
	if(values != undefined){
 	let matches = values.filter((e) => {
 		if(e.b == 255){
 			let dx = e.x - nMouseX
 			let dy = e.y - nMouseY
 			if(dx>-radius && dx<radius && dy>-radius && dy<radius){
        		return e //ritorna oggetti!
        	}
    	}
    }) 

    //console.log(matches)	

    for(let m of matches){
            for (let i = 0; i < 1; i++) {
                const part = {
                    px: floor(m.x / (griglia)) * griglia + griglia / 2, // posizione
                    py: floor(m.y / (griglia)) * griglia + griglia / 2,
                    vx: 0, // velocità
                    vy: 0,
                    diametro: 5, // diametro
                    dir: 0,
                    life: 200, // contatore interno (meglio se multiplo di griglia)
                    vel: floor(random(0, 3)) / 2,
                }

                particelle.push(part)
            }
        
    }
	}
}


function getValues() {
    let values = []
    for (let j = 0; j < img.height; j++) {
        for (let i = 0; i < img.width; i++) {
            let c = img.get(i, j)[0]
            let x = i / 64; //normalizzo...
            let y = j / 64;
            values.push({
                x: x * letterW,
                y: y * letterH,
                b: c
            })
        }
    }

    return values
}