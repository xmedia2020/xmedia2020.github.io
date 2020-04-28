/**
 * b 
 * MDE, costruito su k3_a AGY
 *
 */
let json;
let punti

const s = 90;
const r = 40;
const limit =50;
let bb, len; 
let step;

let snakes = []
//const step = 20 // 0.05
const intersections = [];
//console.log(step)



function preload(){
    json = loadJSON("g_coord.json")
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    punti = json.points;
    bb = calcBB(punti)
    len = calcLen(punti)
    step = Math.floor(bb.w * s * 0.028); //20, a0.05, b0.028
    for (let j = 0; j < bb.h * s; j += step) {
        for (let i = 0; i < bb.w * s; i += step) {
            intersections.push({
                x: Math.floor(i),
                y: Math.floor(j)
            });
        }
    }

    rectMode(CENTER);
}

function draw() {
    background(0)
    translate(width / 2, height / 2)

    push() // push() salva la trasformazione attuale della matrice
    translate(-bb.w / 2 * s, -bb.h / 2 * s) // centriamo la lettera

    const p = getP(punti, len, frameCount / 150.0) //punto che segue il perimetro della k

    let px = 0;
    let py = 0;

    for(let i=0; i<intersections.length; i++){
        let d = dist(p.x*s, p.y*s,intersections[i].x, intersections[i].y)
        if(d < r){
            px = intersections[i].x;
            py = intersections[i].y;
        }
    }

    if (frameCount%1==0 && px != 0 && py != 0) {
        snakes.push(new Snake(px, py))
    }

    for (let s of snakes) {
        s.giveDir();
        s.move(mouseIsPressed);
        s.erase();
        s.stop();
        s.show();
    }

    stroke(255, 0, 0);
    noFill();
    //ellipse(p.x * s, p.y * s, 2*r, 2*r)


    pop()

    // togliamo dall'array le particelle con una vita minore a 0 (frames)
    snakes = snakes.filter(function(e){
        return e.life > 0
    })

    //noLoop();
}

class Snake {
    constructor(x, y) {
        this.pos = createVector(x, y);
        this.inc = createVector(0, 0);
        this.des = createVector(0, 0);
        this.path = [];
        this.ori = createVector(x, y);
        this.life = 500;
        
        this.des = this.pos.copy()
    }


    giveDir() {
        //debugger
        let reached = this.hasReached(this.pos, this.des);
        if (reached) {
            let r = floor(random(4));

            switch (r) {
                case 0:               //left
                    this.des.x -= step;
                    break;
                case 1:               //right
                    this.des.x += step;
                    break;
                case 2:               //up
                    this.des.y += step;
                    break;
                case 3:               //down
                    this.des.y -= step;
                    break;
            }

            //imposto quanto deve essere l'incremento
            this.inc.x = lerp(this.pos.x, this.des.x, 0.1); // a0.07 b0.01
            this.inc.y = lerp(this.pos.y, this.des.y, 0.1);
            this.inc.sub(this.pos) //bestia... solo la differenza, non l'accumularsi di destinazioni!
        }
    }

    move(mouseIsPressed) {
        this.pos.x += this.inc.x; //aumento di tot incremento...
        this.pos.y += this.inc.y;
        this.pos.x = floor(this.pos.x)
        this.pos.y = floor(this.pos.y)

        //salvo la posizione corrente nella history
        let temp = {
            x: this.pos.x,
            y: this.pos.y,
        }
        this.path.push(temp);
        if (!mouseIsPressed){
            this.life--
        } else {
            this.life -= 4
        }
    }

    show() {
        const d = map(this.life, 400, 0, 3,0)
        stroke(255);
        noFill();
        beginShape();
        for (let p of this.path) {
            vertex(p.x, p.y) //non è un'operazione troppo pesante?
        }
        endShape();
        fill(255);
        rect(this.pos.x, this.pos.y, d, d);
    }

    hasReached(vecA, vecB) {
        if (vecA.equals(vecB)) {
            return true;
        } else {
            return false
        }
    }

    erase() {
        if (this.path.length > this.life*0.10) {
            this.path.shift();
        }
    }

    stop() {
        //aggiungere che il path non si cancella...
        let d = p5.Vector.sub(this.pos, this.ori)
        if (abs(d.x) > limit || abs(d.y) > limit) {
            this.inc.mult(0);
            this.life -= 2;
        }
    }
}

// funzione che calcola la "bounding box" di un set di coordinate
function calcBB(pts) {
    const bb = { // Creiamo al volo un oggetto arbitrario
        min_x: Number.MAX_VALUE,
        min_y: Number.MAX_VALUE,
        max_x: -Number.MAX_VALUE,
        max_y: -Number.MAX_VALUE,
    }

    for (const p of pts) {
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
function calcLen(pts) {
    const segments = []
    const offsets = []
    let total = 0
    for (let i = 0; i < pts.length; i++) {
        const a = pts[i]
        const b = pts[(i + 1) % pts.length]
        const l = Math.sqrt(Math.pow(b.x - a.x, 2) + Math.pow(b.y - a.y, 2))
        segments.push(l)
        offsets.push(total)
        total += l
    }
    return {
        segments, // lunghezza di ogni segmento
        offsets, // lunghezza fino a quel punto
        total, // lunghezza totale
        num: pts.length // numero di segmenti
    }
}

function getP(pts, len, t) {
    const tl = (t * len.total) % len.total //una distanza in funzione del tempo? 


    //len.offset è un'array che dice ogni punto a che distanza si trova sul perimetro
    const i = binarySearch(len.offsets, tl) //ritorna l'indice dell'elemento che è la distanza più vicina al tempo
    const d = tl - len.offsets[i] //la differenza fra la distanza attuale e quella più vicina... quello che ancora manca al prossimo punto? 
    const ts = d / len.segments[i] //la distanza mancante fratto tutta la distanza.

    const p = pointLerp(pts[i], pts[(i + 1) % pts.length], ts) //Lerp fra un punto e l'altro? con incremento ts... what...


    //ritorna la coordinata a cui si deve trovare il punto.
    return {
        index: i,
        delta: d,
        x: p.x,
        y: p.y
    }
}

function pointLerp(a, b, t) {

    return {
        x: a.x + (b.x - a.x) * t,
        y: a.y + (b.y - a.y) * t,
    }
}

// Funzione che trova il valore più vicino a val nella tabella arr
// NOTA: arrotondato sempre verso il basso
function binarySearch(arr, val) {

    if (arr.length < 2) return 0

    let lower = 0
    let upper = arr.length
    let mid = Math.floor((upper - lower) / 2)
    let idx = -1

    let count = 100 // sicurezza

    while (true) {
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

function windowResized() {
    // importante: il canvas deve essere ridimensionato assieme alla finestra
    resizeCanvas(windowWidth, windowHeight)
}

function keyPressed() {

}

function keyReleased() {

}

function mousePressed() {

}

function mouseReleased() {

}

function mouseMoved() {

}