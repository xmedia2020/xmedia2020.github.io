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

let a;


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

    //-------- disegno webcam --------
    push();
    scale(-1.0, 1.0);
    translate(-windowWidth+20,20);
    image(video, 0, 0, 640/2.5, 480/2.5);
    pop();
    drawKeypoints();

    fill(255);
    noStroke();

    push();
    // rect(width/2-25, height/2+300, 50, -(height-noseY)*0.5);
    rect(width/2-25, height/2+300, 50, -350);
    ellipse(width-leftWristX, leftWristY, 50, 50);
    ellipse(width-rightWristX, rightWristY, 50, 50);
    pop();

    if (leftWristY > height/2-50 || rightWristY < height/2+50){
        a = PI;
        b = PI;
    } else if ((width-leftWristX) > width/2 || (width-rightWristX) > width/2){
        a = -PI/2;
        b = -PI/2;
    } else {
        // a = atan2(mouseY - height / 2, mouseX - width / 2);
        a = atan2(leftWristY - height/2, (width-leftWristX) - width/2);
        b = atan2(rightWristY - height/2, (width-rightWristX) - width/2);
    }

    push();
    translate(width/2-25, height/2);
    rotate(a);
    // rect(0, 0, (width/2-25)-mouseX, 50);
    rect(0, 0, width/2-(width-leftWristX), 50);
    pop();

    push();
    translate(width/2+25, height/2);
    rotate(b);
    rect(0, 0, width/2-(width-rightWristX), -50);
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
}

function windowResized(){
    resizeCanvas(windowWidth, windowHeight);
}