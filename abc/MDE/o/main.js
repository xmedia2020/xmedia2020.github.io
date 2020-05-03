let nr
let r, rings
let off = 0.0

function setup() {
    createCanvas(windowWidth, windowHeight)
    init()
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
            x *= _r + offset 
            y *= _r + offset 

            x+= ((mouseX-width/2) * 0.04 * j)
            y+=((mouseY-height/2) * 0.04 * j)

            vertex(x, y)
            off += 0.00007

        }
        pop()
        const startValue = 15
        let fadeValue = j * (255-startValue)/rings
        stroke(255, 255, 255, startValue + fadeValue)
        //stroke(255, 255, 255)
        noFill()
        endShape(CLOSE)
    }
}


function windowResized() {
    resizeCanvas(windowWidth, windowHeight)
    init()
}

function init(){
    background(0)
    if(width >= 1200){
        //Desktop
        nr = 50
        r = 300
        rings = 16
    } else if (width < 1200 && width >= 400){
        //tablet
        nr = 50
        r = 260
        rings = 16
    } else {
        //phone
        nr = 47
        r = 180
        rings = 13
    }


}
