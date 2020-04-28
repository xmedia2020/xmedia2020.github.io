/**
 * m
 * MDE
 * Reference: https://p5js.org/reference/
 */

let stepX, stepY;
let img;
let values = []; //carico in una tab

function preload() {
    img = loadImage("assets/m.png")
}

function setup() {
    createCanvas(windowWidth, windowHeight)

    //questi due definiscono quanto è fitta la griglia
    stepX = width / 62;
    stepY = height / 27;

    init()
}

// funzione di loop
function draw() {
    background(0)
    stroke(255);
    for (let j = 0; j < height; j += stepY) {
        if ((j / stepY) % stepY == 0) {
            fill(0);
        } else {
            fill(255, 255, 255, 255)
        }
        beginShape();
        for (let i = 0; i < width + 6 * stepX; i += stepX) { //allungo di 6*stepX, per nascondere la fine delle linee
            //mappo la i e j, per farli entrare come indice della tabella values che è 64x64
            let mx = floor(map(i, 0, width, 0, 64))
            let my = floor(map(j, 0, height, 0, 64))
            let index = mx + 64 * my;

            //mouse per aggiungere interazione
            let mMouse = map(mouseY, 0, height, 3, -3)

            //varia l'altezza della y del vertice in base alla brightness del pixel che sta "sotto"
            let deltaY = map(values[index].b, 0, 255, 0, 60 * mMouse);

            //un fattore che dice quanto è forte l'animazione
            let f = map(j, 0, height, 0, TAU)
            let x = -40 + i + 20 * sin(frameCount * f * 0.02); //-40 è il punto di partenza più indietro, per allungare le linee
            let y = j - deltaY;
            curveVertex(x, y);
        }
        endShape()
    }

}

function init() {
    for (let j = 0; j < img.height; j++) {
        for (let i = 0; i < img.width; i++) {
            let c = img.get(i, j)[0]
            let x = i / 64; //normalizzo...
            let y = j / 64;
            values.push({
                x: x * height, //lo metto già nella scala che uso
                y: y * height,
                b: c
            })
        }
    }
}
// -- EVENTI ----------------------------------

function windowResized() {
    resizeCanvas(windowWidth, windowHeight)
    init()
}
