class Menace {
  constructor() {
    this.ai = [];
    this.marbles = 2;
    this.restart();

    this.fields = 3;
    this.pos = [];
    this.moves = [];
    this.boxes = [];

    this.winCount = 0;
    this.lossCount = 0;

    this.positiveFb = 3; // Positive feedback / how many marbles to add
    this.negativeFb = 1; // Negative feedback / how many marbles to remove
  }

  move() {
    let b = board;
    //console.log(board);
    let temp = this.ai[b[0]][b[1]][b[2]]; // Temp holder for this array
    //console.log("temp: ", ai.ai[b[0]][b[1]][b[2]][1]);

    this.boxes.push([b[0], b[1], b[2]]);
    //console.log("ai.boxes: ", ai.boxes);
    //console.log(ai.boxes);

    let move = Math.round(random(0, temp.length - 1));
    //console.log("move: ", move);

    //console.log("field: ", temp[move]);
    board[temp[move][0]] = temp[move][1];
    //console.log(board);
    this.moves.push(temp[move]);
    //console.log("ai.moves: ", ai.moves);
  }

  game() {
    // Plays an entire game

    for (let j = 0; j < board.length; j++) {
      this.move();
    }

    this.checkWin();
  }

  checkWin() {
    //if (ai.moves.length >= board.length) {
    // Determine whether ai won or lost
    if (arrayEqualityCheck(board, [winPiece, winPiece, winPiece])) {
      this.win();
    } else {
      this.lose();
    }

    this.clear();
    board = [0, 0, 0];
    //}
  }

  win() {
    // fb = feedback (how many to add of each marble)
    for (let i = 0; i < this.moves.length; i++) {
      let b = this.boxes[i];
      for (let j = 0; j < this.positiveFb; j++) {
        this.ai[b[0]][b[1]][b[2]].push(this.moves[i]);
      }
    }
    this.winCount++;
    console.log("Won: " + this.winCount);
  }

  lose() {
    // fb = feedback (how many to remove of each marble)
    for (let i = 0; i < this.moves.length; i++) {
      let b = this.boxes[i];
      //console.log("box: ", b);
      for (let j = 0; j < this.negativeFb; j++) {
        //console.log("lost");
        //let index = ai.ai[b[0]][b[1]][b[2]].indexOf(ai.moves[i]);
        //console.log(ai.ai[b[0]][b[1]][b[2]]);
        let index = indexOfArray(this.ai[b[0]][b[1]][b[2]], this.moves[i]);
        //console.log(index);
        if (index != -1) {
          this.ai[b[0]][b[1]][b[2]].splice(index, 1);
          //console.log("lost");
          //console.log(arrayOccurence(ai.ai[b[0]][b[1]][b[2]], ai.moves[i]));
        }
      }
    }
    this.lossCount++;
    console.log("Lost: " + this.lossCount);
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

let root = 3; // Root of the amount of fields in the grid
let gap = 15; // Weird number used to determine spacing of squares
let bw; // Board width
let bh; // Board height

let ai = new Menace();

let activeFields = ai.fields;

let board = [0, 0, 0];

let winPiece = 1; // Determines the winning conditions: 1 = fill out with O's, 2 = fill out with X's

let stamp;
let wait = 100; // How long to wait in between each move (milliseconds)

function setup() {
  createCanvas(1000, 600);
  bw = height;
  bh = height;

  stamp = millis();
}

function draw() {
  background(150);
  drawGrid();

  if (ai.moves.length >= board.length && stamp + wait < millis()) {
    ai.checkWin();
    stamp = millis();
  } else if (stamp + wait < millis()) {
    ai.move();
    stamp = millis();
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

function mouseClicked() {
  for (let i = 0; i < 100; i++) {
    ai.game();
  }
}
