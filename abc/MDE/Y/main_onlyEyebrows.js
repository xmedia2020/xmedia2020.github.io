/**
 * Template per P5JS
 * Reference: https://p5js.org/reference/
 */

let faceapi;
let video;
let detections;
let ebr;

const detection_options = {
    withLandmarks: true,
    withDescriptors: false,
}

let videoWidth = 640;
let videoHeight = 480;

let nrFaces = 16; //16
let r;
let step;
let off1 = 0;
let off2 = 0;
let off3 = 0;
let off4 = 0;

let facePar;


function setup() {
    // creiamo un'applicazione della dimensione della finestra
    createCanvas(windowWidth, windowHeight)
    console.log("setup")

    video = createCapture(VIDEO);
    video.size(videoWidth, videoHeight);
    video.hide(); // Hide the video element, and just show the canvas
    faceapi = ml5.faceApi(video, detection_options, modelReady)

    r = 150;
    facePar = {
        rw: floor(random(r * 1, r * 2.0)),
        rh: floor(random(r * 0.9, r * 1.8)),
        head: {
            ang: random(TAU),
        },
        eyeL: {
            x: floor(random(-r * 0.1, r * 0.5)),
            y: floor(random(r * 0.5)),
        },
        eyeR: {
            x: floor(random(-r * 0.1, r * 0.1)),
            y: floor(random(r * 0.1)),
        },
        mouth: {
            mr: random(r * 0.8, r * 1), //raggio cerchio bocca
            rTweak: random(),
        },
    }
    facePar.rx = floor(random(r * 0.5) + facePar.rw * 0.5);
    facePar.ry = floor(random(r) + facePar.rh * 0.3);
    facePar.yh = floor(random(r * 0.3, facePar.rh / 2));
    //noiseSeed(random() * 1000)
}

// funzione di loop
function draw() {
    translate(width / 2, height / 2)
    if (ebr) {
        background(0)

        //facePar.eyebrows = ebr;
        //console.log(facePar.eyebrows.r[0])
        drawFace(0, 0, facePar, ebr)
    }
    //

    //noLoop()
}




function pointLerp(a, b, t) {

    return {
        x: a.x + (b.x - a.x) * t,
        y: a.y + (b.y - a.y) * t,
    }
}

function drawFace(x, y, fP, eyebrows) {
    //console.log(eyebrows)
    const nr = 200;
    push()
    translate(r * 0.5 + x, r * 0.5 + y)
    //-----NOSE---------------------------------
    push();

    
    fill(255,0,0)
    ellipse(eyebrows.l[0].x,eyebrows.l[0].y,5,5)
    fill(0,0,255)
    ellipse(eyebrows.l[2].x,eyebrows.l[2].y,5,5)
    fill(0,255,0)
    ellipse(eyebrows.l[4].x,eyebrows.l[4].y,5,5)
    
    let deltaY = constrain(eyebrows.l[4].y-eyebrows.l[0].y,0,8);

    let eybrwL = map(deltaY, 0, 6, fP.rh*0.2, fP.rh);
    fP.yh = eybrwL;

    //constrain(random(-rh/2,rh), r*0.1, rh)
    let rep = nrFaces * 0.2;

    noFill();
    stroke(255, 255, 255)

    for (let j = 0; j < 5; j++) {
        push()
        translate(-fP.rx, -fP.ry);
        stroke(255, 255, 255, 100 + j * 80)

        // --------------- \
        let a1 = {
            x: 0,
            y: 0,
        }
        let a2 = {
            x: fP.rw / 2,
            y: fP.yh,
        }
        //console.log(a1, a2)
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
            x: fP.rw / 2,
            y: fP.yh,
        }
        let b2 = {
            x: fP.rw,
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
            x: fP.rw / 2,
            y: fP.yh,
        }
        let c2 = {
            x: fP.rw / 2,
            y: fP.rh,
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

    const ex = fP.rx;
    const ey = fP.ry - fP.yh; //sempre sotto le sopracciglia

    translate(-ex, -ey);

    noStroke()
    ellipse(fP.eyeL.x, fP.eyeL.y, 5, 5);
    ellipse(fP.eyeR.x + ex, fP.eyeR.y, 5, 5);
    //ellipse(150, 0, 5, 5)

    pop();

    //-----EYES---------------------------------    


    //-----MOUTH---------------------------------    
    push()


    const mx = -fP.rx + fP.rw * 0.5 + random(r * 0.01) + fP.mouth.mr * 0.2;
    const my = -fP.ry + fP.rh * 0.5 + random(r * 0.01, r * 0.04) + fP.mouth.mr * 1.8
    const ang = random(-PI * 0.04, PI * 0.04)
    const ampl = 50 + random(5)
    let side;
    fP.mouth.rTweak < 0.5 ? side = -random(110, 120) : side = random(110, 120);

    translate(mx, my);

    for (let j = 0; j < 2; j++) {
        beginShape()
        const deform = map(noise(off1), 0, 1, 0, side + j * 10);
        for (let i = 0; i < 50; i++) {
            const s = map(i, 0, nr, TAU, PI); //la forza che comprime la forma... che all'apertura e chiusura deve essere 0 (per non vedere "scalino")
            const S = sin(s) * 0.8;
            //console.log(strength)
            const x = cos(i * PI / ampl) * -fP.mouth.mr + deform * S // grazie a seno e coseno riusciamo a trovare ascisse e ordinate di un punto
            const y = sin(i * PI / ampl) * -fP.mouth.mr + deform * S // in funzione di un angolo...

            const wiggle = map(noise(off2), 0, 1, -4, 4);


            vertex(x + wiggle, y + wiggle);

            off2 += 0.08;
        }
        noFill();
        stroke(255, 255, 255, 30 + j * 100)
        endShape();
    }

    //ellipse(0,0, 7,7)

    pop()

    //-----MOUTH---------------------------------    

    //-----FACE---------------------------------
    push()
    rotate(fP.head.ang)
    //let off4 = 0.0;
    for (let j = 0; j < 2; j++) {
        beginShape();
        const deform = map(noise(off3), 0, 1, 0, 54 + j * 20);
        for (let i = 0; i < nr; i++) {

            const s = map(i, 0, nr, TAU, PI); //la forza che comprime la forma... che all'apertura e chiusura deve essere 0 (per non vedere "scalino")
            const S = sin(s) * 0.8;
            //console.log(strength)
            const x = cos(i * TAU / nr) * r + deform * S // grazie a seno e coseno riusciamo a trovare ascisse e ordinate di un punto
            const y = sin(i * TAU / nr) * r + deform * S // in funzione di un angolo...

            const wiggle = map(noise(off4), 0, 1, -4, 4);


            vertex(x + wiggle, y + wiggle);

            off4 += 0.1;
        }
        off3 += 0.0005;
        stroke(255, 255, 255, 50 + j * 150)
        //stroke(255, 255, 255)
        noFill();
        endShape(CLOSE);
    }
    pop()
    //-----FACE------------------------------------
    pop()
}

function gotResults(err, result) {
    if (err) {
        console.log(err)
        return
    }
    // console.log(result)
    detections = result;

    // background(220);
    background(255);
    image(video, 0, 0, videoWidth, videoHeight)
    if (detections) {
        if (detections.length > 0) {
            //console.log(detections)
            //drawLandmarks(detections)
            ebr = {
                r: detections[0].parts.rightEyeBrow,
                l: detections[0].parts.leftEyeBrow,
            }
        }

    }
    faceapi.detect(gotResults)
}


function modelReady() {
    console.log('ready!')
    console.log(faceapi)
    faceapi.detect(gotResults)

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