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

let json, data
let sim
let currentSelection
let smthSelected = false;

function preload() {
    //json = loadJSON("dati.json")
    json = loadJSON("dati.json")
}


function setup() {
    let cnv = createCanvas(windowWidth, (windowHeight / 100) * 90)
    cnv.parent("canvas")
    sim = new Sim()
    sim.gravity.y = 0.0

    for (let key in json) {
        if (!data) {
            data = [json[key]];
        } else {
            data.push(json[key]);
        }
    }
    // Attacco un'oggetto identico, che poi passo nella fuzione
    // updateData(letter) per poterlo mostrare nelle info.
    // Probabilmente c'è una via migliore. È per non caricare due volte il json!
    for (let i = 0; i < data.length; i++) {
        let current = data[i]
        current.obj = {
            letter: current.lettera,
            name: current.nome,
            fullName: current.nomeCompleto,
            path: current.cartella,
            date: current.data,
            input: current.input,
            technique: current.tecnica,
            description: current.descrizione
        }
    }

    // Ricavo gli "owner" dall'array 
    // e creo gli le istanze di PointOwner e Point sulla base dell array.
    let ownersList = []
    for (let i = 0; i < data.length; i++) {
        let currentOwner = data[i]

        let ownerIsVisited = ownersList.includes(currentOwner.nome)

        if (!ownerIsVisited) {
            //--Aggiungo i childs----------------
            let ownerChilds = data.filter((e) => {
                return e.nome == currentOwner.nome //ritorna oggetti!
            })
            for (let c of ownerChilds) {
                sim.addPoint(random(width), random(height), 20, c.lettera, currentOwner.nome, c.lettera, c.obj)
            }
            //--Aggiungo i childs----------------

            //--Aggiungo gli owners--------------
            sim.addPointOwner(random(width), random(height), 20, currentOwner.nome, currentOwner.nome) //si possono togliere i childs?
            ownersList.push(currentOwner.nome)
            //--Aggiungo gli owners--------------
        }
    }

    addLinks(sim.points)
    console.log(sim.points)
}

function draw() {
    sim.update(1)
    sim.bounds(40, 40, width - 40, height - 40)

    if (mouseIsPressed) {
        for (let p of sim.points) {
            p.letterFill = 90
            let d = dist(p.pos.x, p.pos.y, mouseX, mouseY)
            const treshold = 25
            if (d <= treshold && mouseIsPressed) {
                //se nulla è selezionato allora p lo diventa
                //e "accende l'interruttore"
                if (smthSelected == false) {
                    p.isSelected = true;
                }
                //finchè non rilascio il mouse rimane true... funzione infondo
                smthSelected = true;

                //se l'elemento non è un'owner lo mando nella scheda di info
                if (p.owner != undefined) {
                    updateData(p.obj)
                }
            } else {
                //perchè non funziona? se clicco in un punto che è fuori dal treshold allora dovrebbe
                //mettere tutto in bianco...
                //p.letterFill = 255 
            }
            //a questo punto posso anche draggare coontrollando se il punto è selezionato,
            //senza rimanere nella condizione "d <= treshold"... problematica
            if (p.isSelected == true) {
                p.letterFill = 255
                p.pos.x = mouseX
                p.pos.y = mouseY
            }
        }
    }

    background(0)
    noStroke()
    fill(255)

    for (const p of sim.points) {
        p.attractNodes(sim.points)
        p.update()
        p.display()
        //ellipse(p.pos.x, p.pos.y, 5, 5)
    }
    for (const l of sim.links) {
        stroke(255, 255, 255, 40)
        line(l.a.pos.x, l.a.pos.y, l.b.pos.x, l.b.pos.y)
    }

}

function addLinks(nodes) {
    //aggiungo i collegamenti fra lettere e owners,
    //metto in un array tutti gli owners e li uso dopo
    let ownersLinks = []
    for (let n of nodes) {
        if (n.owner === undefined) {
            ownersLinks.push(n)
        } else { //se l'owner esiste
            let ownerNode = nodes.filter((e) => {
                return e.ownerId === n.owner
            })
            sim.addLink(ownerNode[0], n, 50, 0.02)
        }
    }
    //aggiungo i collegamenti fra owners
    for (let i = 0; i < ownersLinks.length - 1; i++) {
        sim.addLink(ownersLinks[i], ownersLinks[i + 1], 500, 0.02)
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight)
}

function listener(p) {
    currentSelection = p;
    console.log("stai premendo su: " + currentSelection)
}

function mouseReleased() {
    smthSelected = false;
    for (let p of sim.points) {
        p.isSelected = false;
    }
}


//Altra modalità? tutte le lettere uguali raggruppate...
/*
function addLinks1(nodes) {
    let visitedLetters = []
    let previous
    for (let i = 0; i < nodes.length; i++) {
        console.log(visitedLetters)
        let current = nodes[i]

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
*/