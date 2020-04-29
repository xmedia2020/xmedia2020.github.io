let a = [];
let txtPos = [];
let text;

function setup() {
  createCanvas(windowWidth, windowHeight);

  text = createGraphics(width, height);
  text.background(255);
  text.fill(0);
  text.textStyle(BOLD);
  text.textSize(min([width, height]) / 2);
  text.textAlign(CENTER, CENTER);
  text.text("B", width / 2, height / 2);

  for (let y = 0; y < height; y += 2) {
    for (let x = 0; x < width; x += 2) {
      if (text.get(x, y)[0] == 0) txtPos.push({ x: x, y: y });
    }
  }
  print(txtPos.length);

  for (let i = 0; i < txtPos.length / 10; i++) {
    a[i] = g({});
  }

}
function draw() {
  background(0);

  fill(0);
 
  a.forEach(e => {
    ellipse(e.x, e.y, e.s + 4, e.s + 4);
  });
  fill(255);
  noStroke()
  a.forEach(e => {
    // fill(e.col);
    ellipse(e.x, e.y, e.s, e.s);
    e.s += e.ss;
    e.t--;
    if (e.s > e.m && e.ss > 0) e.ss = 0;
    if (e.t < 0 && e.ss == 0) e.ss = -1;
    if (e.s < 0) {
      e = g(e);
    }
  });
}

function g(o) {
  const pt = txtPos[int(random(txtPos.length - 1))];
  o.x = pt.x;
  o.y = pt.y;
  o.t = random(30,60);
  o.s = 0;
  o.ss = 1;
  o.m = random(10,40);
  return o;
}

