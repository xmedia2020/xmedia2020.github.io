const nr = 100
const r = 200
let off = 0.0
const rings = 70

function preload() {
    //img = loadImage("assets/k.png")
}

function setup() {
    createCanvas(windowWidth, windowHeight)
}

function draw() {
    background(0)
    translate(width / 2, height / 2)

    for (let j = 0; j < rings; j++) {
    	let _r = (r/rings) * (rings - j)
        beginShape()
        for (let i = 0; i < nr; i++) {
            let x = cos(i * TAU / nr)
            let y = sin(i * TAU / nr)
            const offset = noise(x, y + j*0.03, off) * (_r*0.5)

            push()
            //translate(((mouseX-width/2) * 0.00001 * j), ((mouseY-height/2) * 0.00001 * j))
            x *= _r + offset 
            y *= _r + offset

            vertex(x, y)
            off += 0.000007
        }
        pop()
        const startValue = 15
        let fadeValue = j * (255-startValue)/rings
        stroke(255, 255, 255, startValue + fadeValue)
        //stroke(255, 255, 255)
        noFill()
        endShape(CLOSE)
    }

    //noLoop();
}


function windowResized() {
    resizeCanvas(windowWidth, windowHeight)
}

function mousePressed() {

}