let n = 0;
let nMax = 100; // how many flips to do in speedingUp/slowingDown
const states = [ "stopped", "spinning" ];
let currentState = "stopped";
let allChoices = ["🍕","🍗","🍔","🍣","🥞","🥙","🥗","🍲","🍝","🍜"];
let choices = allChoices;

let unchoices = [];
let currentChoice;

function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(12);
}

function draw() {
  background(125);
  showChoices();

  switch (currentState) {
    case "stopped":
      // show current choice and a way to change the list of choices
      textAlign(CENTER);
      textSize(width/2);
      text(choices[currentChoice], width/2, height-(height*.2));
      break;
    case "spinning":
      // flip through choices, with a slow ramp-up to fullSpeed
      currentChoice = floor( map2(n, 0, nMax, 0, nMax, CIRCULAR, BOTH) );
      textAlign(CENTER);
      textSize(width/2);
      text(choices[currentChoice % choices.length], width/2, height-(height*.2));
      n++;
      if (n == nMax) { 
        currentState = "stopped"; 
        //choices = [...allChoices];  // copy the choices from the original list every time
        currentChoice = floor(random(choices.length)); // end with a random choice
      }
      break;
  }
}

function showChoices() {
  for (let i = 0; i < choices.length; i++) {
    textAlign(LEFT);
    textSize(30);
    text(choices[i],6,height-30-(i*40));
  }
}

function mouseClicked() {
  if (currentState != "stopped" || (mouseX < 12 || mouseX > 43)) return;  
  for (let i = 0; i < choices.length; i++) {
    if (mouseY > height-56-(i*40) && mouseY < height-30-(i*40)) {
      console.log(i);
      delete choices[i];
    }
  }
}

function keyPressed() {
  if (key == " " && currentState == "stopped") roll();
}

function deviceShaken() {
  if (currentState == "stopped") roll();
}

function roll() {
  // compress the array since there could be holes from deleting items
  choices = choices.filter(Boolean);
  shuffle(choices, true);
  currentState = "spinning";
  n = 0;
}