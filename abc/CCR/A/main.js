// https://www.youtube.com/watch?v=fBqaA7zRO58
// https://www.youtube.com/watch?v=TaN5At5RWH8
// https://www.youtube.com/watch?v=tA_ZgruFF9k
// 

let img;
let circles = [];
let spots = [];
let nc = 0;
let click = false;

// carico inizialmente l'immagine
function preload() {
    img = loadImage("assets/A.png");
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    // calcolo la misura min del canvas
    let p = min(width, height) / 50;
    let maxWidth = p * img.width;
    let maxHeight = p * img.height;

    // trovo i pixel bianchi per trovare i punti nell'immagine
    for (let j = 0; j < img.height; j++) {
        for (let i = 0; i < img.width; i++) {
            let c = img.get(i, j);
            let x = -maxWidth / 2 + i * p;
            let y = -maxHeight / 2 + j * p;

            if (c[0] > 0) {
                let d = map(c[0], 0, 255, 1, p);
                spots.push({
                    x: x,
                    y: y,
                });
            }
        }
    }
}

function draw() {
    background(0);
    strokeWeight(0.5);

    for (let i = 0; i < circles.length; i++) {
        let c = circles[i];
        // mostro i cerchi
         c.show();

        if (c.growing) {
            // l'aumento dei cerchi
            c.grow();
            for (let j = 0; j < circles.length; j++) {
                let other = circles[j];
                // si fermano quando si toccano
                if (other != c) {
                    let d = dist(c.x, c.y, other.x, other.y);
                    if (d - 1 < c.r + other.r) {
                        c.growing = false;
                    }
                }
            }
            if (c.growing) {
                //c.growing = !c.edges();
            }
        }
        if(mouseIsPressed){
            c.clicked();
        }
    }
    let target = 1 + constrain(floor(frameCount / 120), 0, 20);
    let count = 0;
    for (let i = 0; i < spots.length; i++) {
        let r = floor(random(spots.length));
        if (addCircle(spots[r].x, spots[r].y)) {
            count++;
        }
        if (count == target) {
            break;
        }
    }
}  

// funzione che per disegnare bolle
class Circle {
    constructor(x, y, r, g) {
        this.growing = true;
        this.x = x;
        this.y = y;
        this.r = r;
        this.g = g;
        this.brightnessE = 255;
        this.brightnessR = 0;
        this.brightnessT = 0;
    }

    grow() {
        this.r += this.g;
    }

    // disegno bolle e rettangoli
    show() {
        push();
        stroke(this.brightnessR);
        noFill();
        rectMode(CENTER);
        rect(width/2+this.x, height/2+this.y, this.r*1.414, this.r*1.414);
        pop();

        push();
        stroke(this.brightnessE);
        noFill();
        translate(width / 2, height / 2);
        ellipse(this.x, this.y, this.r * 2);
        pop() 
    }

    // funzione al click
    clicked() {
        let dis = dist(mouseX, mouseY, width/2 + this.x, height/2 + this.y);
        if(dis < this.r){
            if(click=true){
                click=false;
                this.brightnessE = 0;
                this.brightnessR = 255;
            } else if(click=false){
                click=true;
                this.brightnessE = 255;
                this.brightnessR = 0;
            }
        }
        console.log(click);
    }

}

// funzione aggiungi cerchi e ferma la crescita
function addCircle(spotx, spoty) {
    let newCircle = new Circle(spotx, spoty, 1, random(0.15, 0.9));
    for (let i = 0; i < circles.length; i++) {
        let other = circles[i];
        let d = dist(newCircle.x, newCircle.y, other.x, other.y);
        if (d < other.r + 4) {
            newCircle = undefined;
            break;
        }
    }
    if (newCircle) { 
        circles.push(newCircle);
        return true;
    } else {
        return false;
    }
}

// -- EVENTI ----------------------------------

function windowResized() {
    resizeCanvas(windowWidth, windowHeight)
    background(0)
}

// funzione mouse click
function mousePressed(){
    if(click){
        click=true;
    } else {
        click=false;
    }
}

// funzione dalva immagine
function keyPressed(){
    if (key == 's' || key == 'S') {
        saveCanvas('A', 'png');
    }
    return false;
}