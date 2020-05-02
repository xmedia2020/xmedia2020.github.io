/**
 * Template per P5JS
 * Reference: https://p5js.org/reference/
 */
/*
  partendo da uno sketch di
  Johan Karlsson (DonKarlssonSan)
*/
//Provo a gestire le particelle con il giroscopio dunque dichiaro le variabili




function Particle() { //particelle si muovono random x altezza e larghezza
  this.x = random([0, w]);
  this.y = random([0, h]);
  this.oldX = this.x;
  this.oldY = this.y;
}

Particle.prototype.move = function(stepSize) { //indica il movimento random che deve fare la particella e di quanto
  this.oldX = this.x;
  this.oldY = this.y;
  // Questo è quello giusto
  this.x += random(-stepSize, stepSize);
  this.y += random(-stepSize, stepSize);
  if (this.x < 0) this.x = 0;
  if (this.x > w) this.x = w;
  if (this.y < 0) this.y = 0;
  if (this.y > h) this.y = h;
};

Particle.prototype.draw = function() { //senza questa non disegna niente
line(this.oldX, this.oldY, this.x, this.y); //linea che parte da old xy a nuovo xy)
  };

var particles;
var iterations;
var px;
var py;
var w;
var h;

function setup() { //funzione più generale, agisce su tutto
  iterations = 10; //ripetizioni della linea che disegna (piu alto n si riempie piu veloce)
  w = windowWidth;
  h = windowHeight;
  createCanvas(w, h);
  reset();
  stroke(255, 20); //(colore bianco, opacità)
  //console.log(iterations);
}

function draw() { //disegno "fuori" dalla lettera
  for (var i = 0; i < iterations; i++) {
    particles.forEach(p => {
      var x = floor(p.x);
      var y = floor(p.y);

      var off = (y * w + x) * 4; //perchè se cambio il 4 va via il disegno della lettera??
      var stepSize = 30; //lunghezza linee che disegna esternamente
      if(px[off+3] > 100) {
        stepSize = 2;
      }

      p.move(stepSize); //muove
      p.draw();         //disegna linea

      
      //console.log(p); //vedo le coordinate (che sono 4 x1y1, x2,y2 perchè è linea)
    // let ciao = mouseX
    // initParticles(mouseX); 

    });
  }
}

function initParticles() {
  particles = [];
  for(var i = 0; i < 50; i++) { //definire questo map rende più piena la creazione
    particles.push(new Particle());
  }
}

function initImage() { //qui disegna la parola / lettera centrato nella finestra
  var message = "A"; //contenuto lettera
  //var tSize = 550; //dimensione testo di partenza
  var tSize = (w / 2 , h / 2); //funziona
  // AG - NOTA: questo NON funziona :)
  //            in pratica stai assegnando a tSize metà dell'altezza dell skecth
  //            e si vede: se stringi la finsestra la A non cambia, ma se la stringi
  //            in altezza, allora rimpiciolisce...
  //            ad ogno modo il modo corretto sarebbe:
  //            var tASize = w / 2
  //              oppure
  //            var tSize = h / 2
  //              oppure
  //            var tSize = Math.min(h/2, w/2)  // <--- scegli il monore dei due
  textSize(tSize);
  var tWidth = textWidth(message); //larghezza testo = larghezza messaggio
  text(message, w / 2 - tWidth / 2, h * 0.65); // visto che non sappiamo cos'è l'altezza della lettera, si può andare a occhio
  var image = get(0, 0, w, h);
  image.loadPixels();
  px = image.pixels;
  background(0); //sfondo nero
}

function reset() { //resetta al click del mouse
  initParticles(); //inizia le particelle
  clear();          //pulisci
  initImage();      //inizia l'immagine da capo
}

function windowResized() { //resize della finestra
  resizeCanvas(windowWidth, windowHeight);
  w = windowWidth;
  h = windowHeight;
  reset();
}

function mouseClicked() {
}
 

// -- EVENTI ----------------------------------

// function windowResized(){
//  // importante: il canvas deve essere ridimensionato assieme alla finestra
//  resizeCanvas(windowWidth, windowHeight)
// }

function keyPressed(){
  if (key == 's' || key == 'S') {
    saveCanvas('A', 'png');
  } else if (key == 'x' || key == 'X'){
    setup()
  }

  return false;
}

function keyReleased(){

}

function mousePressed(){

}

function mouseReleased(){

}

function mouseMoved(){
    
    particles = [];
  
  for(var i = 0; i < 250; i++) { //definire questo map rende più piena la creazione
    // px = floor(mouseX);// posizione
    py = floor(mouseY);
    particles.push(new Particle());
    // reset();
  }
}
