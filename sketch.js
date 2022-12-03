let root = 3; // Root of the amount of fields in the grid
let gap = 15; // Weird number used to determine spacing of squares
let bw; // Board width
let bh; // Board height

let ai = new Menace3();

let board = fillArray(0, ai.fields);
let winPiece = 1; // Determines the winning conditions: 1 = fill out with O's, 2 = fill out with X's

let butSwitchAi;
let butSwitchGoal;
let butPlayBulk;
let butPlayLive;
let butRestart;

let liveGame = 0;
let stamp;
let wait = 500; // How long to wait in between each move (milliseconds)

function setup() {
  createCanvas(1000, 600);
  bw = height;
  bh = height;

  butSwitchAi = createButton("SWITCH AI");
  butSwitchAi.mousePressed(function () {
    if (ai.fields == 3) {
      ai = new Menace6();
      console.log("Switched ai to menace6");
    } else {
      ai = new Menace3();
      console.log("Switched ai to menace3");
    }
    board = fillArray(0, ai.fields);
  });

  butSwitchGoal = createButton("SWITCH GOAL");
  butSwitchGoal.mousePressed(function () {
    if (winPiece == 1) {
      winPiece++;
      console.log("Switched goal to X");
    } else {
      winPiece--;
      console.log("Switched goal to O");
    }
  });

  butPlayLive = createButton("PLAY LIVE");
  butPlayLive.mousePressed(function () {
    liveGame++;
    console.log("Started live game");
  });

  butPlayBulk = createButton("PLAY 100");
  butPlayBulk.mousePressed(function () {
    for (let i = 0; i < 100; i++) {
      ai.game();
    }
    console.log("Played 100 games");
  });

  butRestart = createButton("RESTART");
  butRestart.mousePressed(function () {
    ai.restart();
    ai.lossCount = 0;
    ai.winCount = 0;
    console.log("Restarted ai");
  });

  stamp = millis();
}

function draw() {
  background(150);
  drawGrid();

  if (0 < liveGame) {
    if (ai.moves.length >= board.length && stamp + wait < millis()) {
      ai.checkWin();
      liveGame--;
    } else if (stamp + wait < millis()) {
      ai.move();
      stamp = millis();
    }
  }

  // Draw all pieces on the board
  board.forEach((value, index) => {
    if (value == 1) {
      oPiece(index);
    }
    if (value == 2) {
      xPiece(index);
    }
  });
}

/*function mouseClicked() {
  for (let i = 0; i < 100; i++) {
    ai.game();
  }
}*/
