let n = 0;
let nMax = 110; // how much flipping happens
const states = [ "stopped", "spinning" ];
let currentState = "stopped";
let allChoices = ["🍕","🍗","🍔","🍣","🥞","🥙","🥗","🍲","🍝","🍜"];
let choices = allChoices;
let currentChoice;
let previousChoice = -1;
let tickSound;

function preload() {
  soundFormats('ogg');
  tickSound = loadSound("assets/tick.ogg");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(12);
}

function draw() {
  background(125);
  showChoices();

  switch (currentState) {
    case "stopped":
      textAlign(CENTER);
      textSize(width/2);
      text(choices[currentChoice], width/2, height-(height*.2));
      break;
    case "spinning":
      // flip through choices, with a sin-wave pattern to the flip speed
      currentChoice = floor( map2(n, 0, nMax, 0, nMax, SINUSOIDAL, BOTH) );
      if (currentChoice != previousChoice) {
        tickSound.play();
        previousChoice = currentChoice;
      }
      textAlign(CENTER);
      textSize(width/2);
      text(choices[currentChoice % choices.length], width/2, height-(height*.2));
      n++;
      if (n == nMax) { 
        currentState = "stopped"; 
        //choices = [...allChoices];  // copy the choices from the original list every time
        currentChoice = floor(random(choices.length)); // end with a random choice
        // if the random choice above is the same as what was already selected,
        // playing a tick is weird - it should only play a tick if the image changes...
        if (currentChoice != previousChoice) {
          tickSound.play();
        } 
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
  // userStartAudio();
  if (currentState != "stopped" || (mouseX < 12 || mouseX > 43)) return;  
  for (let i = 0; i < choices.length; i++) {
    if (mouseY > height-56-(i*40) && mouseY < height-30-(i*40)) {
      console.log(i);
      delete choices[i];
    }
  }
}

function keyPressed()   { 
  userStartAudio();
  if (currentState == "stopped") roll();
}

function deviceShaken() { 
  userStartAudio();
  if (currentState == "stopped") roll(); 
}

function roll() {
  choices = choices.filter(Boolean);  // compress the array since there could be holes from deleting items
  shuffle(choices, true);  // shuffle just before starting to spin
  currentState = "spinning";
  n = 0;
}