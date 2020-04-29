
// Classe "punto"
class Point{
    constructor(x, y, r){
        this.pos = createVector(x, y)
        this.pre = createVector(x, y)
        this.radius = r
        this.radius_squared = r * r // Controlliamo il raggio al quadrato, più rapido senza radice
        this.pinned = false
        this.cell_x = 0
        this.cell_y = 0
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
        this.friction = 0.995
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

    addPoint(x, y, r){
        const p = new Point(x, y, r)
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
    bounds(height){
        for (const p of this.points){
            if (p.pos.y >= height){
                 const d = (p.pos.y - p.pre.y) * 0.8
                 p.pre.y = height + d
                 p.pos.y = height
            }
        }
    }
}



