/**
 * Template per P5JS
 * Reference: https://p5js.org/reference/
 */

const nr = 200;
const r = 200;

// funzione d’inizio
function setup() {
    // creiamo un'applicazione della dimensione della finestra
    createCanvas(windowWidth, windowHeight)
    noiseSeed(random() * 1000)
}

// funzione di loop
function draw() {
    background(0)
    translate(width * 0.5, height * 0.5);
    let off1 = 0;
    let off2 = 0;

    //-----NOSE---------------------------------
    push();

    const rw = floor(random(r*0.6, r*1.8));
    const rh = floor(random(r * 0.4, r*1.7));
    const rx = floor(random(r * 0.5)+rw *0.5);
    const ry = floor(random(r)+rh*0.3);
    let yHeight = floor(random(r*0.2, rh))
    //constrain(random(-rh/2,rh), r*0.1, rh)
    let rep = 50;

    noFill();
    stroke(255, 255, 255)

    for (let j = 0; j < 5; j++) {
        push()
        translate(-rx, -ry);
        stroke(255, 255, 255, 100 + j * 80)
        //rect(0,0, rw, rh);

        // --------------- \
        let a1 = {
            x: 0,
            y: 0,
        }
        let a2 = {
            x: rw / 2,
            y: yHeight,
        }
        beginShape();
        for (let i = 0; i <= rep; i++) {
        	const wiggle = map(noise(off2), 0, 1, -5, 5);
            let pt = pointLerp(a1, a2, i / rep);
            vertex(pt.x + wiggle, pt.y + wiggle);
            off2 += 0.8;
        }
        endShape();

        // --------------- /
        let b1 = {
            x: rw/2,
            y: yHeight,
        }
        let b2 = {
            x: rw,
            y: 0,
        }        
        beginShape();
        for (let i = 0; i <= rep; i++) {
        	const wiggle = map(noise(off2), 0, 1, -5, 5);
            let pt = pointLerp(b1, b2, i / rep);
            vertex(pt.x + wiggle, pt.y + wiggle);
            off2 += 0.8;
        }
        endShape();

        // -------------- |
        let c1 = {
            x: rw/2,
            y: yHeight,
        }
        let c2 = {
            x: rw/2,
            y: rh,
        }
        beginShape();
        for (let i = 0; i <= rep; i++) {
        	const wiggle = map(noise(off2), 0, 1, -5, 5);
            let pt = pointLerp(c1, c2, i / rep);
            vertex(pt.x + wiggle, pt.y + wiggle);
            off2 += 0.8;
        }
        endShape();

        pop()
    }


    pop()

    //-----NOSE---------------------------------    

    //-----EYES---------------------------------    
    push();
    
    const ex = rx;
    const ey = ry - yHeight; //sempre sotto le sopracciglia

    translate(-ex, -ey);

    const eL = {
    	x: floor(random(-r*0.1, r*0.5)),
    	y: floor(random(r*0.5)),
    }
    const eR = {
    	x: floor(random(-r*0.1,r*0.1)+ex),
    	y: floor(random(r*0.1)),
    }

    noStroke()
    ellipse(eL.x, eL.y,5,5);
    ellipse(eR.x,eR.y,5,5);
    //ellipse(150, 0, 5, 5)

    pop();

    //-----EYES---------------------------------    
   

    //-----MOUTH---------------------------------    
   	push()

   	const mx = -rx + rw * 0.5 + random(r*0.3);
   	const my =  rh * 0.8 + random(r*0.3)
   	const mr = random(r*0.1, r*0.8) //raggio cerchio bocca
   	const ang = random(-PI*0.04, PI*0.04)
   	const ampl = 50 + random(40)
    let side;
    random()<0.5 ? side = -random(300) : side = random(300);

   	translate(mx, my);
   	rotate(ang)
   	ellipse(0,0,10,10)

   	for (let j = 0; j < 3; j++) {
    beginShape()
    const deform = map(noise(off1), 0, 1, 0, side + j * 20);
   	for (let i = 0; i < 50; i++) {
        const s = map(i, 0, nr, TAU, PI); //la forza che comprime la forma... che all'apertura e chiusura deve essere 0 (per non vedere "scalino")
        const S = sin(s) * 0.5;
        //console.log(strength)
        const x = cos(i * PI / ampl) * -mr + deform * S // grazie a seno e coseno riusciamo a trovare ascisse e ordinate di un punto
        const y = sin(i * PI / ampl) * -mr + deform * S// in funzione di un angolo...

        const wiggle = map(noise(off2), 0, 1, -5, 5);


        vertex(x + wiggle, y + wiggle);

        off2 += 0.08;
        }
    noFill();
    stroke(255)
    endShape();
	}

   	//ellipse(0,0, 7,7)

   	pop()

    //-----MOUTH---------------------------------    




    //-----FACE---------------------------------
    push()
    rotate(random(TAU))

    for (let j = 0; j < 2; j++) {
        beginShape();
        const deform = map(noise(off1), 0, 1, 0, 200 + j * 20);
        for (let i = 0; i < nr; i++) {

            const s = map(i, 0, nr, TAU, PI); //la forza che comprime la forma... che all'apertura e chiusura deve essere 0 (per non vedere "scalino")
            const S = sin(s) * 0.5;
            //console.log(strength)
            const x = cos(i * TAU / nr) * r + deform * S // grazie a seno e coseno riusciamo a trovare ascisse e ordinate di un punto
            const y = sin(i * TAU / nr) * r + deform * S // in funzione di un angolo...

            const wiggle = map(noise(off2), 0, 1, -5, 5);


            vertex(x + wiggle, y + wiggle);

            off2 += 0.2;
        }
        off1 += 0.005;
        //stroke(255, 255, 255, 50 + j * 30)
        stroke(255, 255, 255)
        noFill();
        endShape(CLOSE);
    }
    pop()
    //-----FACE------------------------------------



    noLoop()
}




function pointLerp(a, b, t) {

    return {
        x: a.x + (b.x - a.x) * t,
        y: a.y + (b.y - a.y) * t,
    }
}








// -- EVENTI ----------------------------------

function windowResized() {
    // importante: il canvas deve essere ridimensionato assieme alla finestra
    resizeCanvas(windowWidth, windowHeight)
}



function keyPressed() {

}

function keyReleased() {

}

function mousePressed() {

}

function mouseReleased() {

}

function mouseMoved() {

}