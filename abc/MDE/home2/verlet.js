
// Classe "punto"
class Point{
    constructor(x, y, r, l, o, txt, obj){
        this.pos = createVector(x, y)
        this.pre = createVector(x, y)
        this.vel = createVector(0, 0)
        this.maxVel = 0.1;
        this.radius = r
        this.radius_squared = r * r // Controlliamo il raggio al quadrato, più rapido senza radice
        this.pinned = false
        this.cell_x = 0
        this.cell_y = 0
        this.displayText = txt
        this.letter = l
        this.owner = o
        this.obj = obj;
        this.letterFill = 255;
        this.isSelected = false;
    }

    display(){
        fill(0)
        noStroke()
       //ellipse(this.pos.x, this.pos.y, 25, 25)
        push()
        textSize(22)
        let asc = textAscent() * 0.8; // Calc ascent
        let txtW = textWidth(this.displayText);
        translate(-txtW/2, asc/2)
        fill(this.letterFill)
        text(this.displayText, this.pos.x, this.pos.y)
        pop()
    }

    update(){
        this.vel.limit(this.maxVel)
        this.pos.add(this.vel)

        //this.vel.mult(1 - 0.9);

    }

    attractNodes(nodeArray) {        
        for(let i = 0; i < nodeArray.length; i++){
            let otherNode = nodeArray[i]
            
            if(otherNode === undefined){            //interrompi se ancora non ci sono nodi
                break
            }       
            if(otherNode === this) {                //salta se i due nodi sono uguali
                continue
            }         

            let thisNodePos = this.pos.copy()
            let otherNodePos = otherNode.pos.copy()
            let d = thisNodePos.dist(otherNodePos)
            d = constrain(d, 16, 90)                                    //costringo per non farli sparare ovunque
            if (d > 0 && d < this.radius){
                let s = pow(d/ this.radius, 1)                          //la forza di attrazione in base alla distanza?
                let f = s * 9 * -1 * (1 / (s + 1) + ((s - 3) / 4)) / d  //copiata da ref, non capisco ma funziona
                let df = thisNodePos.sub(otherNodePos)
                df.mult(f)
                //console.log(df)
                otherNode.vel.add(df)
            }
        }
        
    }

}
class PointOwner extends Point {
    //una classe che distingue i nodi degli owner, al quale saranno agganciati i punti
    constructor(x, y, r, id, txt){
        super(x, y, r, undefined, undefined, txt)
        this.ownerId = id
    }
}

// Classe "molla"
class Link{
    constructor(a, b, l, k){
        this.a = a
        this.b = b
        this.length = l
        this.k = k
    }
}

class Sim {

    constructor() {
        this.points = []
        this.links = []
        this.friction = 0.9
        this.gravity = createVector(0, 0)
    }

    update(steps){
        // Punti
        for (const p of this.points) {
            if (p.pinned) continue
            let v = p5.Vector.sub(p.pos, p.pre)
            v.add(this.gravity)
            v.mult(this.friction)
            p.pre = p.pos.copy()
            p.pos.add(v)
        }

        // Molle
        const sub_step = 1.0 / steps
        for (let i=0; i<steps; i++){
            for (const l of this.links){
                const v = p5.Vector.sub(l.a.pos, l.b.pos)
                const m = v.mag()
                v.mult((l.length - m) / m * l.k * sub_step)
                if (!l.a.pinned) l.a.pos.add(v)
                if (!l.b.pinned) l.b.pos.sub(v)
            }
        }

        // Reset dei punti "pinned"
        for (const p of this.points){
            if (p.pinned) p.pos.set(p.pre.x, p.pre.y)
        }
    }

    addPoint(x, y, r, l, o, txt, obj){
        const p = new Point(x, y, r, l, o,  txt, obj)
        this.points.push(p)
        return p
    }

    addPointOwner(x, y, r, id, txt){
        const p = new PointOwner(x, y, r, id, txt)
        this.points.push(p)
        return p
    }

    addLink(a, b, length = null, k = 0.1){
        if(length === null){
            length = p5.Vector.sub(a.pos, b.pos).mag()
        }

        const l = new Link(a, b, length, k)
        this.links.push(l)
        return l
    }

    // Per ora c'è solo il check del piano in fondo
    bounds(x1, y1, x2, y2){
        const damp = 0.8
        for (const p of this.points){
            if (p.pos.x >= x2){
                 const d = (p.pos.x - p.pre.x) * damp
                 p.pre.x = x2 + d
                 p.pos.x = x2
            } else if (p.pos.x <= x1) {
                 const d = (p.pos.x - p.pre.x) * damp
                 p.pre.x = x1 + d
                 p.pos.x = x1
            }

            if (p.pos.y >= y2){
                 const d = (p.pos.y - p.pre.y) * damp
                 p.pre.y = y2 + d
                 p.pos.y = y2
            } else if (p.pos.y <= y1) {
                 const d = (p.pos.y - p.pre.y) * damp
                 p.pre.y = y1 + d
                 p.pos.y = y1
            }
        }
    }
}



