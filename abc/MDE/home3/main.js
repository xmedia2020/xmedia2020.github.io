/**
 * home
 * MDE
 * Reference: http://www.generative-gestaltung.de/2/sketches/?02_M/M_6_1_03
 *
 * todo:
 * - Portare fuori da p5 l'elemento cliccato?
 * - Rendere univoco il clic per il point... non che "raccoglie" anche gli altri
 *
 */

let json, nodes
let sim
let bMargin

let picked = null

function preload() {
    json = loadJSON("dati.json")
}


function setup() {
    init()
    sim = new Sim()
    sim.gravity.y = 0.0

    const data = {}
    for (let key in json) {
        const nome = json[key].nome
        data[nome] = data[nome] || []
        data[nome].push(json[key])
    }
    // console.log(data)

    nodes = []
    const root = sim.addPoint(0,-45,5)
    root.pinned = true
    for(const key in data){
        const p1 = sim.addPoint(random(-20, 20), random(-20, 20), 5)
        const n = {
            point:  p1,
            type:   1,
            nome:   key,
            fill:   255,   
        }
        sim.addLink(root, p1, 175, 0.05)
        nodes.push(n)

        for(const l of data[key]){
            const p2 = sim.addPoint(random(-20, 20), random(-20, 20), 5)
            const n = {
                point:  p2,
                type:   2,
                data:   l,
                fill:   255,   
            }
            sim.addLink(p1, p2, 52, 0.05)
            nodes.push(n)
        }
    }

    console.log(nodes)
    rectMode(CENTER)
    ellipseMode(CENTER)


}

function draw() {
    // sim.bounds(-width/2+bMargin,-height/2+bMargin,width-bMargin, height-bMargin)
    sim.bounds(-width/2+bMargin,-height/2+bMargin,width/2-bMargin, height/2-bMargin)
    if(picked != null){
        picked.point.pos.set(mouseX-width/2, mouseY-height/2)
    }
    sim.update(1)

    const min_radius_sq = 25 * 25 // distanza minima per applicare la forza
    for (let k = 0; k < 5; k++) {
        for (let j = 0; j < sim.points.length; j++) {
            const a = sim.points[j]
            for (let i=j+1; i<sim.points.length; i++) {
                const b = sim.points[i]
                const v  = p5.Vector.sub(a.pos, b.pos)
                // const m_sq  = v.magSq()
                // const rs = a.radius + b.radius
                // if (m_sq < min_radius_sq) {
                    const m = v.mag() //è la distanza in pixel fra un punto e l'altro
                    const f = Math.exp(-m*0.09)*15.0
                    v.normalize()
                    v.mult(f)
                    a.pos.add(v)
                    b.pos.sub(v)
                // }
            }
        }
    }

    background(0)
    // noStroke()
    // fill(0, 30)
    // rect(0, 0, width, height)

    translate(width/2, height/2)

    // linee
    stroke(255)
    for (const l of sim.links) {
        stroke(255,255,255,90)
        line(l.a.pos.x, l.a.pos.y, l.b.pos.x, l.b.pos.y)
    }

    // punti
    noStroke()
    let asc = textAscent() * 0.8            //calcola ascend
    for (const n of nodes) {
        if(n.type == 1){
            push()
            fill(0)
            rect(n.point.pos.x, n.point.pos.y-2, 37, 17)
            textSize(16)
            let txtW = textWidth(n.nome)
            translate(-txtW/2, asc/2)
            fill(n.fill)
            text(n.nome, n.point.pos.x, n.point.pos.y)
            pop()
        } else if(n.type == 2){
            push()
            fill(0)
            ellipse(n.point.pos.x, n.point.pos.y-6, 32, 32)
            textSize(26)
            let txtW = textWidth(n.data.lettera)
            translate(-txtW/2, asc/2)
            fill(n.fill)
            text(n.data.lettera, n.point.pos.x, n.point.pos.y)
            pop()
        }
    }

}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight)
}

function mousePressed(){
    picked = null
    for(const n of nodes){
        const d = dist(mouseX-width/2, mouseY-height/2, n.point.pos.x, n.point.pos.y)
        if(d < 25){
            picked = n
            console.log(`you have picked: ${picked}`)
            if(n.type == 1){
                //caso parent
                for(const n of nodes){
                    n.fill = 255
                } 
                updateData(null)
            } else if (n.type == 2) {
                //caso lettera
                console.log("passo questo: " + n.data)
                updateData(n.data)
                for(const o of nodes){
                    o.fill = 90
                } 
                n.fill = 255
            }
            return
        }
    }
    console.log("background")
    if(mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height){
    for(const n of nodes){
        n.fill = 255
    } 
    updateData(null)
    }
}

function mouseReleased(){
    picked = null
}


function init(){
    document.querySelector("canvas").innerHTML = " "
    let w, h
    if(windowWidth <= 540){
        w = floor(windowWidth-3);
        h = floor((windowHeight / 100) * 80)
        bMargin = 15
    } else {
        w = floor(windowWidth);
        h = floor((windowHeight / 100) * 86)
        bMargin = 20
    }

    let cnv = createCanvas(w, h)
    cnv.parent("canvas")
}