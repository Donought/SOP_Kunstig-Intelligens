class Menace {
  constructor() {
    this.ai = [];
    this.marbles = 2;
    this.restart();

    this.fields = 3;
    this.pos = [];
    this.moves = [];
    this.boxes = [];
  }

  clear() {
    this.pos = [];
    this.moves = [];
    this.boxes = [];
  }

  restart() {
    this.ai = [[], [], []];
    for (let i = 0; i < 3; i++) {
      this.ai[i] = [[], [], []];
      for (let j = 0; j < 3; j++) {
        this.ai[i][j] = [[], [], []];
        for (let k = 0; k < 3; k++) {
          for (let q = 0; q < 3; q++) {
            if (i == 0) {
              for (let r = 0; r < this.marbles; r++) {
                this.ai[i][j][k].push([0, 1]);
                this.ai[i][j][k].push([0, 2]);
              }
            }
            if (j == 0) {
              for (let r = 0; r < this.marbles; r++) {
                this.ai[i][j][k].push([1, 1]);
                this.ai[i][j][k].push([1, 2]);
              }
            }
            if (k == 0) {
              for (let r = 0; r < this.marbles; r++) {
                this.ai[i][j][k].push([2, 1]);
                this.ai[i][j][k].push([2, 2]);
              }
            }
          }
        }
      }
    }
  }
}

let root = 3; // Root of the amount of fields in the grid
let gap = 15; // Weird number used to determine spacing of squares
let bw; // Board width
let bh; // Board height

let menace = new Menace();

let activeFields = menace.fields;

let board = clearBoard();

let winPiece = 1; // Determines the winning conditions: 1 = fill out with O's, 2 = fill out with X's

let winCount = 0;
let lossCount = 0;

let positiveFb = 3; // Positive feedback / how many marbles to add
let negativeFb = 1; // Negative feedback / how many marbles to remove

function clearBoard() {
  let b = [];
  for (let i = 0; i < activeFields; i++) {
    b.push(0);
  }
  return b;
}

let stamp;

function setup() {
  createCanvas(1000, 600);
  bw = height;
  bh = height;

  console.log(menace.ai);

  stamp = millis();
}

function draw() {
  background(150);
  drawGrid();

  /*if (stamp + 1000 < millis()) {
    checkWin(menace);
    aiMove(menace);
    stamp = millis();
  }*/

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

function mouseClicked() {
  for (let i = 0; i < 1; i++) {
    bulkGame(menace);
  }
}

// Convert 1d pos to 2d pos
function convertToCoord(pos) {
  p = pos + 1;
  let y = Math.ceil(p / root);
  let x = p - (y - 1) * root;
  return [x, y];
}

function bulkGame(ai) {
  // ai = the one who will be playing
  // step: set to 1 if you want to play game step by step

  // ai does all moves at once if step isn't 1:

  for (let j = 0; j < board.length; j++) {
    aiMove(ai);
  }

  checkWin(ai);
}

function checkWin(ai) {
  if (ai.moves.length >= board.length) {
    // Determine whether ai won or lost
    if (
      arrayEqualityCheck(
        board,
        (function () {
          let b = [];
          for (let j = 0; j < board.length; j++) {
            b.push(winPiece);
          }
          return b;
        })()
      )
    ) {
      win(ai, positiveFb);
    } else {
      lose(ai, negativeFb);
    }

    ai.clear();
    board = clearBoard();
  }
}

function win(ai, fb) {
  // fb = feedback (how many to add of each marble)
  console.log("win");
  for (let i = 0; i < ai.moves.length; i++) {
    let b = ai.boxes[i];
    for (let j = 0; j < fb; j++) {
      ai.ai[b[0]][b[1]][b[2]].push(ai.moves[i]);
    }
  }
  winCount++;
  console.log("Wins: " + winCount);
}

function lose(ai, fb) {
  // fb = feedback (how many to remove of each marble)
  //console.log("lost");
  for (let i = 0; i < ai.moves.length; i++) {
    let b = ai.boxes[i];
    for (let j = 0; j < fb; j++) {
      //console.log("lost");
      //let index = ai.ai[b[0]][b[1]][b[2]].indexOf(ai.moves[i]);
      console.log(ai.ai[b[0]][b[1]][b[2]]);
      let index = indexOfArray(ai.ai[b[0]][b[1]][b[2]], ai.moves[i]);
      console.log(index);
      if (index != -1) {
        ai.ai[b[0]][b[1]][b[2]].splice(index, 1);
        //console.log("lost");
        //console.log(arrayOccurence(ai.ai[b[0]][b[1]][b[2]], ai.moves[i]));
      }
    }
  }
  lossCount++;
  console.log("Losses: " + lossCount);
}

function aiMove(ai) {
  let b = board;
  //console.log(board);
  let temp = ai.ai[b[0]][b[1]][b[2]]; // Temp holder for this array
  //console.log("temp: ", temp);

  ai.boxes.push(b);
  //console.log("ai.boxes: ", ai.boxes);
  console.log(menace.boxes);

  let move = Math.round(random(0, temp.length - 1));

  board[temp[move][0]] = temp[move][1];
  //console.log(board);
  ai.moves.push(temp[move]);
  //console.log("ai.moves: ", ai.moves);
}
