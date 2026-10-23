let cars = [];

let centerX = innerWidth / 2;
let centerY = innerHeight / 2;

let headlightLeft = [
  [false, false, false, false, false, false],
  [false, false, false, false, false, false],
  [false, false, false, false, false, false],
  [false, false, false, false, false, false],
  [false, false, false, false, false, false],
  [false, false, false, false, false, false],
  [false, false, false, false, false, false],
  [false, false, false, false, false, false],
  [false, false, false, false, false, false],
  [false, false, false, false, false, false],
];
let headlightRight = [
  [false, false, false, false, false, false],
  [false, false, false, false, false, false],
  [false, false, false, false, false, false],
  [false, false, false, false, false, false],
  [false, false, false, false, false, false],
  [false, false, false, false, false, false],
  [false, false, false, false, false, false],
  [false, false, false, false, false, false],
  [false, false, false, false, false, false],
  [false, false, false, false, false, false],
];
let fogLeft = [
  [false, false, false, false, false, false],
  [false, false, false, false, false, false],
  [false, false, false, false, false, false],
  [false, false, false, false, false, false],
  [false, false, false, false, false, false],
  [false, false, false, false, false, false],
  [false, false, false, false, false, false],
  [false, false, false, false, false, false],
  [false, false, false, false, false, false],
  [false, false, false, false, false, false],
];
let fogRight = [
  [false, false, false, false, false, false],
  [false, false, false, false, false, false],
  [false, false, false, false, false, false],
  [false, false, false, false, false, false],
  [false, false, false, false, false, false],
  [false, false, false, false, false, false],
  [false, false, false, false, false, false],
  [false, false, false, false, false, false],
  [false, false, false, false, false, false],
  [false, false, false, false, false, false],
];

let pulse = 0;
let selected = 1;

async function setup() {
  createCanvas(innerWidth, innerHeight);

  for (let i = 1; i <= 7; i++) {
    cars[i] = await loadImage(`/media/car${i}.png`);
  }

  angleMode(DEGREES);
}

function draw() {
  background(22, 6, 46);
  fill(46);
  rect(0, innerHeight * 0.3, innerWidth, innerHeight);

  // Front Row //
  for (let i = 4; i <= 5; i++) {
    let offsetX = centerX - cars[i].width * (5 - i);
    let offsetY = centerY - innerHeight * 0.05;
    drawCar(offsetX, offsetY, i);
  }

  // Back Row //
  for (let i = 1; i <= 3; i++) {
    let offsetX = centerX + cars[i].width * (i - 5 / 2);
    let offsetY = centerY - innerHeight * 0.4;

    drawCar(offsetX, offsetY, i);
  }

  if (frameCount % 10 == 0) {
    pulse++;
    if (pulse >= 10) {
      pulse = 0;
    }
    console.log(pulse);
  }

  frameRate(20);
}

function drawCar(offsetX, offsetY, i) {
  push();
  translate(offsetX, offsetY);

  if (i == selected) {
    fill(255, 232, 59, 150);
    ellipse(innerWidth * 0.124, innerHeight * 0.38, 350, 180);
  }

  image(
    cars[i],
    0,
    0,
    innerWidth * 0.25,
    innerWidth * 0.25 * (cars[i].width / cars[i].height),
  );

  strokeWeight(30 + random(30));
  stroke(random(225), random(225), random(225), 150);
  let angle = 80 + random(20);

  if (headlightLeft[pulse][i]) {
    line(
      innerWidth * 0.059,
      innerHeight * 0.27,
      innerWidth * 0.059 + 1000 * cos(angle),
      innerHeight * 0.27 + 1000 * sin(angle),
    );
  }

  if (headlightRight[pulse][i]) {
    line(
      innerWidth * 0.192,
      innerHeight * 0.27,
      innerWidth * 0.192 + 1000 * cos(angle),
      innerHeight * 0.27 + 1000 * sin(angle),
    );
  }

  if (fogLeft[pulse][i]) {
    line(
      innerWidth * 0.047,
      innerHeight * 0.35,
      innerWidth * 0.047 + 1000 * cos(angle),
      innerHeight * 0.27 + 1000 * sin(angle),
    );
  }

  if (fogRight[pulse][i]) {
    line(
      innerWidth * 0.203,
      innerHeight * 0.35,
      innerWidth * 0.203 + 1000 * cos(angle),
      innerHeight * 0.27 + 1000 * sin(angle),
    );
  }

  pop();
}

function keyPressed() {
  switch (key) {
    case "d":
      selected++;
      if (selected > 5) {
        selected = 1;
      }
      break;
    case "a":
      selected--;
      if (selected < 1) {
        selected = 5;
      }
      break;
  }
}
