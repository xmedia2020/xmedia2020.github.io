let video;
let poses = [];
let skeletons = [];
let pg;

let posNet;
let noseX;
let noseY;
let pNoseX;
let pNoseY;

let leftWristX;
let leftWristY;
let pLeftWristX;
let pLeftWristY;

let rightWristX;
let rightWristY;
let pRightWristX;

// let a;
let dimY = 0;

function setup() {
    background (255);
    createCanvas(windowWidth, windowHeight); 
    video = createCapture(VIDEO);
    video.size (windowWidth, 0.75*windowWidth);
    video.hide();

    pixelDensity(1);
    pg = createGraphics(windowWidth, windowHeight);

    poseNet = ml5.poseNet(video, modelReady);
    poseNet.on('pose', function(results) {
    poses = results;
    });
}

function modelReady() {
}

function draw() {
    background (0);
    const s = min(width, height)/100;
    const d = s * 40;
    //-------- disegno webcam --------
    push();
    scale(-1.0, 1.0);
    translate(-640/s -20,20);
    image(video, 0, 0, 640/s, 480/s);
    pop();
    drawKeypoints();

    fill(255);
    noStroke();
    ellipse(width-leftWristX, leftWristY, 50, 50);
    ellipse(width-rightWristX, rightWristY, 50, 50);

    push();
    noFill();
    stroke(255);
    strokeWeight(50);
    line(width/2, height/2+d, width/2, height/2);
    line(width/2, height/2, (width-leftWristX), leftWristY);
    line(width/2, height/2, (width-rightWristX), rightWristY);
    pop();
}

function drawKeypoints() {
  for (let i = 0; i < min(poses.length,1); i++) {
    for (let j = 0; j < poses[i].pose.keypoints.length; j++) {
      let keypoint = poses[i].pose.keypoints[j];
      if (keypoint.score > 0.6) {
        if (j == 0) {
            //-------- disegno naso --------
            noseX = lerp(noseX, noseX, 0.5);
            noseY = lerp(noseY, noseY, 0.5);
            noseX = keypoint.position.x;
            noseY = keypoint.position.y;
        } else if (j == 9){
            //-------- disegno polso sinistro --------
            leftWristX = lerp(leftWristX, leftWristX, 0.5);
            leftWristY = lerp(leftWristY, leftWristY, 0.5);
            leftWristX = keypoint.position.x;
            leftWristY = keypoint.position.y;
        } else if (j == 10){
            //-------- disegno polso destro --------
            rightWristX = lerp(rightWristX, rightWristX, 0.5);
            rightWristY = lerp(rightWristY, rightWristY, 0.5);
            rightWristX = keypoint.position.x;
            rightWristY = keypoint.position.y;
        } 
      }
    }
  }
}

function drawSkeleton() {
  for (let i = 0; i < poses.length; i++) {
    for (let j = 0; j < poses[i].skeleton.length; j++) {
    }
  }
}

function gotPoses(results) {
    poses = results;
}

function mousePressed() {
    background(255);
    pg.clear();
}

function keyPressed(){
    if (key == 's' || key == 'S') {
        saveCanvas('Y', 'png');
    } else if (key == 'x' || key == 'X'){
        setup()
    }

    return false;
}

function windowResized(){
    resizeCanvas(windowWidth, windowHeight);
}