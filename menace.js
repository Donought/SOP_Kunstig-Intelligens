class Menace3 {
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
    if (arrayEqualityCheck(board, fillArray(winPiece, this.fields))) {
      this.win();
    } else {
      this.lose();
    }

    this.clear();
    board = fillArray(0, this.fields);
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
            for (let l = 0; l < this.marbles; l++) {
              this.ai[i][j][k].push([0, 1]);
              this.ai[i][j][k].push([0, 2]);
            }
          }
          if (j == 0) {
            for (let l = 0; l < this.marbles; l++) {
              this.ai[i][j][k].push([1, 1]);
              this.ai[i][j][k].push([1, 2]);
            }
          }
          if (k == 0) {
            for (let l = 0; l < this.marbles; l++) {
              this.ai[i][j][k].push([2, 1]);
              this.ai[i][j][k].push([2, 2]);
            }
          }
        }
      }
    }
  }
}

class Menace6 extends Menace3 {
  constructor() {
    super();
    this.fields = 6;
    this.marbles = 9;
    this.positiveFb = 12;
    this.negativeFb = 1;
    this.restart();
  }

  move() {
    let b = board;
    //console.log(board);
    let temp = this.ai[b[0]][b[1]][b[2]][b[3]][b[4]][b[5]]; // Temp holder for this array
    //console.log("temp: ", ai.ai[b[0]][b[1]][b[2]][1]);

    this.boxes.push([b[0], b[1], b[2], b[3], b[4], b[5]]);
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

  win() {
    // fb = feedback (how many to add of each marble)
    for (let i = 0; i < this.moves.length; i++) {
      let b = this.boxes[i];
      for (let j = 0; j < this.positiveFb; j++) {
        this.ai[b[0]][b[1]][b[2]][b[3]][b[4]][b[5]].push(this.moves[i]);
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
        let index = indexOfArray(
          this.ai[b[0]][b[1]][b[2]][b[3]][b[4]][b[5]],
          this.moves[i]
        );
        //console.log(index);
        if (index != -1) {
          this.ai[b[0]][b[1]][b[2]][b[3]][b[4]][b[5]].splice(index, 1);
          //console.log("lost");
          //console.log(arrayOccurence(ai.ai[b[0]][b[1]][b[2]], ai.moves[i]));
        }
      }
    }
    this.lossCount++;
    console.log("Lost: " + this.lossCount);
  }

  restart() {
    this.ai = [[], [], []];
    for (let i = 0; i < 3; i++) {
      this.ai[i] = [[], [], []];
      for (let j = 0; j < 3; j++) {
        this.ai[i][j] = [[], [], []];
        for (let k = 0; k < 3; k++) {
          this.ai[i][j][k] = [[], [], []];
          for (let l = 0; l < 3; l++) {
            this.ai[i][j][k][l] = [[], [], []];
            for (let m = 0; m < 3; m++) {
              this.ai[i][j][k][l][m] = [[], [], []];
              for (let n = 0; n < 3; n++) {
                if (i == 0) {
                  for (let o = 0; o < this.marbles; o++) {
                    this.ai[i][j][k][l][m][n].push([0, 1]);
                    this.ai[i][j][k][l][m][n].push([0, 2]);
                  }
                }
                if (j == 0) {
                  for (let o = 0; o < this.marbles; o++) {
                    this.ai[i][j][k][l][m][n].push([1, 1]);
                    this.ai[i][j][k][l][m][n].push([1, 2]);
                  }
                }
                if (k == 0) {
                  for (let o = 0; o < this.marbles; o++) {
                    this.ai[i][j][k][l][m][n].push([2, 1]);
                    this.ai[i][j][k][l][m][n].push([2, 2]);
                  }
                }
                if (l == 0) {
                  for (let o = 0; o < this.marbles; o++) {
                    this.ai[i][j][k][l][m][n].push([3, 1]);
                    this.ai[i][j][k][l][m][n].push([3, 2]);
                  }
                }
                if (m == 0) {
                  for (let o = 0; o < this.marbles; o++) {
                    this.ai[i][j][k][l][m][n].push([4, 1]);
                    this.ai[i][j][k][l][m][n].push([4, 2]);
                  }
                }
                if (n == 0) {
                  for (let o = 0; o < this.marbles; o++) {
                    this.ai[i][j][k][l][m][n].push([5, 1]);
                    this.ai[i][j][k][l][m][n].push([5, 2]);
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
