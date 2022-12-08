// VARIABLES
let wait = 250; // How long to wait in between each move in live game (milliseconds)
let bulk = 500; // How many games to play when bulk button is pressed
let trainedState = 10; // How many wins in a row before ai is considered trained

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
let butPlayUntilTrained;
let butRestart;

let liveGame = 0;
let stamp;

function setup() {
  createCanvas(1000, 600);
  bw = height;
  bh = height;

  console.log(ai.ai);

  butSwitchAi = createButton("SWITCH AI");
  formatBut(butSwitchAi);
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
  formatBut(butSwitchGoal);
  butSwitchGoal.mousePressed(function () {
    if (winPiece == 1) {
      winPiece++;
      console.log("Switched goal to X");
    } else {
      winPiece--;
      console.log("Switched goal to O");
    }
    ai.winStreak = 0;
    ai.bestWinStreak = 0;
  });

  butPlayLive = createButton("PLAY LIVE");
  formatBut(butPlayLive);
  butPlayLive.mousePressed(function () {
    liveGame++;
    console.log("Started live game");
  });

  butPlayBulk = createButton("PLAY " + bulk);
  formatBut(butPlayBulk);
  butPlayBulk.mousePressed(function () {
    for (let i = 0; i < bulk; i++) {
      ai.game();
    }
    console.log("Played " + bulk + " games");
  });

  butPlayUntilTrained = createButton("PLAY UNTIL TRAINED");
  formatBut(butPlayUntilTrained);
  butPlayUntilTrained.mousePressed(function () {
    while (ai.bestWinStreak < trainedState) {
      ai.game();
    }
    console.log("Ai trained after " + ai.games + " games");
  });

  butRestart = createButton("RESTART");
  formatBut(butRestart);
  butRestart.mousePressed(function () {
    ai.restart();
    ai.lossCount = 0;
    ai.winCount = 0;
    ai.winStreak = 0;
    ai.bestWinStreak = 0;
    ai.games = 0;
    board = fillArray(0, ai.fields);
    console.log("Restarted ai");
  });

  stamp = millis();
}

function draw() {
  background(150);
  drawGrid();
  drawStatusBoard();

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
