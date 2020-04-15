/**
 * e
 * MDE
 * Reference: https://p5js.org/reference/
 *
 * todo:
 * - Interattività: hover occhio sgranato, click = chiudi
 *
 */

let json, data
let sim

function preload() {
    json = loadJSON("dati.json")
}


function setup() {
    createCanvas(windowWidth, windowHeight)
    sim = new Sim()
    sim.gravity.y = 0.0


    for (let key in json) {
        if (!data) {
            data = [json[key]];
        } else {
            data.push(json[key]);
        }
    }

    for (let i = 0; i < data.length; i++) {
        if (data[i].lettera != "") {
            sim.addPoint(random(width), random(height), 10, data[i].lettera)
        }

    }
    console.log(sim.points)

    addLinks(sim.points)
    /*
    for (let i = 0; i < sim.points.length - 1; i++) {
        let cP = sim.points[i]
        let nP = sim.points[i + 1]
        sim.addLink(cP, nP, 100, 0.1)
    }

    //sim.addLink(p1, p2, 100, 0.1)
    */
}

function draw() {
    sim.update(1)
    sim.bounds(40, 40, width - 40, height - 40)

    if (mouseIsPressed) {
        for (let p of sim.points) {
            let d = dist(p.pos.x, p.pos.y, mouseX, mouseY)
            const treshold = 25
            if (d <= treshold && mouseIsPressed) {
                p.pos.x = mouseX
                p.pos.y = mouseY
            }

        }
    }

    background(0)
    noStroke()
    fill(255)

    //console.log(sim.points[0])
    for (const p of sim.points) {
        text(p.letter, p.pos.x, p.pos.y)
        //ellipse(p.pos.x, p.pos.y, 5, 5)
    }

    stroke(255);

    for (const l of sim.links) {
        line(l.a.pos.x, l.a.pos.y, l.b.pos.x, l.b.pos.y)
    }

    //noLoop()

}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight)
}

function addLinks(nodes){
    
}


function addLinks1(nodes) {
    let visitedLetters = []
    let previous
    for (let i = 0; i < nodes.length; i++) {
        console.log(visitedLetters)
        let current = nodes[i]
        current.isMaster = true;

        let letterIsVisited = visitedLetters.includes(current.letter)

        if (!letterIsVisited) {
            for (let j = 0; j < nodes.length; j++) { //controllo tutti gli altri nodi
                let other = nodes[j]
                if (current != other) { //solo se differente dal corrente nodo...
                    if (current.letter == other.letter) {
                        sim.addLink(current, other, 100, 0.1)
                    }
                }
            }
            visitedLetters.push(current.letter)

            if(previous != undefined){
                sim.addLink(previous, current, 200, 0.5)
            }

            previous = current;
        }
    }

}

