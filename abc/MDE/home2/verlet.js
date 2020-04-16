
// Classe "punto"
class Point{
    constructor(x, y, r, l, txt){
        this.pos = createVector(x, y)
        this.pre = createVector(x, y)
        this.radius = r
        this.radius_squared = r * r // Controlliamo il raggio al quadrato, più rapido senza radice
        this.pinned = false
        this.cell_x = 0
        this.cell_y = 0
        this.displayText = txt
        this.letter = l
    }
}
class PointOwner extends Point {
    constructor(x, y, r, o, c, txt){
        super(x, y, r, undefined, txt)
        this.owner = o
        this.childs = c
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

    addPoint(x, y, r, l, txt){
        const p = new Point(x, y, r, l, txt)
        this.points.push(p)
        return p
    }

    addPointOwner(x, y, r, o, c, txt){
        const p = new PointOwner(x, y, r, o, c, txt)
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



