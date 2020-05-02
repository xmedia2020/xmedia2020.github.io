/**
 * m
 * MDE
 * Inspiration:
 * https://www.instagram.com/p/B9h6hyLIc2a/
 */

let stepX, stepY;
let bleedBefore, bleedAfter
let img;
let values = []; //carico in una tab

function preload() {
    img = loadImage("assets/m.png")
}

function setup() {
    createCanvas(windowWidth, windowHeight)
    init()
}

// funzione di loop
function draw() {
    background(0)
    stroke(255);
    translate((-stepX * bleedAfter)/2, 0)
    for (let j = 0; j < height; j += stepY) {
        let myColor = map(mouseX, 0, width, 0, 255)
        if ((j / stepY) % stepY == 0) {
            fill(0,0,0,myColor);
        } else {
            fill(myColor,myColor,myColor,myColor)
        }
        beginShape();
        for (let i = bleedBefore * stepX; i < width + bleedAfter * stepX; i += stepX) { //allungo di 6*stepX, per nascondere la fine delle linee
            //mappo la i e j, per farli entrare come indice della tabella values che è 64x64
            let mx = floor(map(i, 0, width + bleedAfter * stepX, 0, 64))
            let my = floor(map(j, 0, height, 0, 64))
            let index = mx + 64 * my;

            //se l'indice è negativo (siccome devo partire prima per nascondere inizio linea) allora 
            //trova un'errore perchè non esiste nell'array dei valori
            if (index <= 0) {
                index = 0;
            }

            //mouse per aggiungere interazione
            let mMouse = map(mouseY / height, 0, 1, 3, -3)

            //varia l'altezza della y del vertice in base alla brightness del pixel che sta "sotto"
            //console.log(index)
            let deltaY = map(values[index].b, 0, 255, 0, 60 * mMouse);

            //un fattore che dice quanto è forte l'animazione
            let f = map(j, 0, height, 0, TAU)
            let x = i + 15 * sin(frameCount * f * 0.02);
            let y = j - deltaY;
            curveVertex(x, y);
        }
        endShape()
    }

}

function init() {
    background(0)
    //questi due definiscono quanto è fitta la griglia
    // if(height>width){
    //     stepX = width / 27
    //     stepY = height / 62
    // } else {
    //     stepX = width / 62
    //     stepY = height / 27
    // }

    if(width >= 1200){
        //Desktop
        stepX = width / 27;
        stepY = height / 26;
        bleedBefore = -4
        bleedAfter = 6
    } else if (width < 1200 && width >= 400){
        //tablet
        stepX = width / 24
        stepY = height / 28
        bleedBefore = -2
        bleedAfter = 6
    } else {
        //phone
        stepX = width / 19
        stepY = height / 37
        bleedBefore = -2
        bleedAfter = 6
    }

    values = []
    for (let j = 0; j < img.height; j++) {
        for (let i = 0; i < img.width; i++) {
            let c = img.get(i, j)[0]
            let x = i / 128; //normalizzo...
            let y = j / 128;
            values.push({
                x: x, //lo metto già nella scala che uso
                y: y,
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