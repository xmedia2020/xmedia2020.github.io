/**
 * e
 * MDE
 * Reference: https://p5js.org/reference/
 *
 * Ispirato a:
 * - Rewind, Pauline Saglio (https://vimeo.com/channels/832315/74715354)
 *
 */

let img;
let spritesheet;
let particles = []
const radius = 30;

let anim = [];

function preload() {
    img = loadImage("assets/e.png");
    spritesheet = loadImage('assets/eyeStroke1.png');
}

function setup() {
    createCanvas(windowWidth, windowHeight)
    reset()
}

function draw() {
    background(0, 0, 0)
    fill(255)
    noStroke()

    for (let p of particles) {
        p.animate()
        p.hover(mouseX, mouseY)
        p.click(mouseIsPressed)
        p.show()
    }

    noFill()
    stroke(255, 0, 0)
    //ellipse(mouseX, mouseY, radius, radius)
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight)
    reset()
}

function mousePressed() {}


class Particle {
    constructor(animation, x, y, size, rot) {
        this.animation = animation; //array di immagini
        let r = random(-20, 20); //displacement iniziale
        this.pos = createVector(x + r, y + r);
        this.length = this.animation.length;
        this.rot = rot;
        let frameStart = floor(random(4, 12));
        this.frameStart = frameStart; //memorizzo la posizione iniziale
        this.idx = frameStart; //index dell'array di frames, sfasamento dell'animazione
        this.speed = 0;
        this.size = map(size, 0, 1, 9, 75)
    }

    animate() {
        this.idx += this.speed;
    }

    show() {
        push()
        translate(this.pos.x, this.pos.y);
        rotate(this.rot);
        let index = floor(this.idx) % this.length;
        image(this.animation[index], -this.size / 2, -this.size / 2, this.size, this.size);
        pop()
    }

    hover(mouseX, mouseY) {
        let index = floor(this.idx) % this.length
        //console.log(index)
        let d = dist(this.pos.x, this.pos.y, mouseX, mouseY)
        if (d < radius) {
            if (index != 50) { 									//incrementa speed se l'index non è 50
                if (this.speed < 1.0) { this.speed += 0.4 } 	//incrementa la velocità
            } else {
                this.speed = 0; 								//fermati se raggiungi frame #50, se lo sorpassa, fa un'altro giro...
            }
        } else {
            if (index != this.frameStart) {						//Se sorpassa frameStart, allora fa un'altro giro....
                this.speed = 0.4;
            } else { this.speed = 0.0 }
        }
    }
    click(mouseIsPressed) {
        let index = floor(this.idx) % this.length;
        if (mouseIsPressed) {
            if (index != 50) {
                if (this.speed < 1.0) { this.speed += 0.6 }
            } else {
                this.speed = 0;
            }
        }
    }

    // Gli arrotondamenti per interi a volte non fanno arrivare
    // l'index a frame di destinazione (es f50). Controllo quindi un 
    // range di frames. 
    // condizione da usare: if (!this.notInRange(index))
    notInRange(currentIndex) {
        let safeRange = []					//range di tutti i frame "salvi"
        for (let i = 47; i < 67; i++) {
            safeRange.push(i)
        }
        for (let n of safeRange) {
            if (n === currentIndex) {
                return true
            }
        }
        return false
    }

}

function reset() {
    particles = []
    const num_x = 16
    const num_y = 7
    const sprite_w = 128
    const sprite_h = 128

    for (let j = 0; j < num_y; j++) {
        for (let i = 0; i < num_x; i++) {
            const x = i * sprite_w
            const y = j * sprite_w
            let img = spritesheet.get(x, y, sprite_w, sprite_h);
            img.resize(128, 128)
            anim.push(img);
        }
    }

    //calcolo il nro di particelle con la prima img
    let off = 0.0;
    const grid = min(width, height) / 60
    const ox = (width - (img.width - 1) * grid) / 2
    const oy = (height - (img.height - 1) * grid) / 2
    for (let j = 0; j < img.height; j++) {
        for (let i = 0; i < img.width; i++) {
            let c = img.get(i, j)
            let x = ox + i * grid
            let y = oy + j * grid
            if (c[0] > 200) {
                //let d = map(c[0], 0, 255, 1, grid)
                particles.push(new Particle(anim, x, y, noise(off), random(TAU)));
                off += 1.3;
            }
        }
    }
}