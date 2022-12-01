class Menace {
  constructor() {
    this.ai = [];
    this.marbles = 2;
    this.restart();

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
          this.ai[i][j][k] = [[], [], []];
          for (let l = 0; l < 3; l++) {
            this.ai[i][j][k][l] = [[], [], []];
            for (let m = 0; m < 3; m++) {
              this.ai[i][j][k][l][m] = [[], [], []];
              for (let n = 0; n < 3; n++) {
                this.ai[i][j][k][l][m][n] = [[], [], []];
                for (let o = 0; o < 3; o++) {
                  this.ai[i][j][k][l][m][n][o] = [[], [], []];
                  for (let p = 0; p < 3; p++) {
                    this.ai[i][j][k][l][m][n][o][p] = [[], [], []];
                    for (let q = 0; q < 3; q++) {
                      /*function add(state) {
												if (state == 0) {
													for (let r = 0; r < this.marbles; r++) {
														this.ai[i][j][k][l][m][n][o][p][q].push(1);
													}
												}
											};
											add(i);
											add(j);
											add(k);
											add(l);
											add(m);
											add[n];
											add[o];
											add[p];
											add[q];*/

                      if (i == 0) {
                        for (let r = 0; r < this.marbles; r++) {
                          this.ai[i][j][k][l][m][n][o][p][q].push(0);
                        }
                      }
                      if (j == 0) {
                        for (let r = 0; r < this.marbles; r++) {
                          this.ai[i][j][k][l][m][n][o][p][q].push(1);
                        }
                      }
                      if (k == 0) {
                        for (let r = 0; r < this.marbles; r++) {
                          this.ai[i][j][k][l][m][n][o][p][q].push(2);
                        }
                      }
                      if (l == 0) {
                        for (let r = 0; r < this.marbles; r++) {
                          this.ai[i][j][k][l][m][n][o][p][q].push(3);
                        }
                      }
                      if (m == 0) {
                        for (let r = 0; r < this.marbles; r++) {
                          this.ai[i][j][k][l][m][n][o][p][q].push(4);
                        }
                      }
                      if (n == 0) {
                        for (let r = 0; r < this.marbles; r++) {
                          this.ai[i][j][k][l][m][n][o][p][q].push(5);
                        }
                      }
                      if (o == 0) {
                        for (let r = 0; r < this.marbles; r++) {
                          this.ai[i][j][k][l][m][n][o][p][q].push(6);
                        }
                      }
                      if (p == 0) {
                        for (let r = 0; r < this.marbles; r++) {
                          this.ai[i][j][k][l][m][n][o][p][q].push(7);
                        }
                      }
                      if (q == 0) {
                        for (let r = 0; r < this.marbles; r++) {
                          this.ai[i][j][k][l][m][n][o][p][q].push(8);
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
    }
  }
}

let root = 3; // Root of the amount of fields in the grid
let gap = 15; // Weird number used to determine spacing of squares

let menace = new Menace();

let board = [0, 0, 0, 0, 0, 0, 0, 0, 0];

function setup() {
  createCanvas(600, 600);
  console.log(menace.ai[0][0][0][0][0][0][0][0][0]);
}

function draw() {
  background(150);
  drawGrid();

  board.forEach((value, index) => {
    if (value == 1) {
      oPiece(index);
    }
    if (value == 2) {
      xPiece(index);
    }
  });
}

function drawGrid() {
  rectMode(CENTER);
  noStroke();
  fill(50);
  for (let i = 0; i < root; i++) {
    for (let j = 0; j < root; j++) {
      rect(
        (width / root) * (j + 1) - width / (root * 2),
        (height / root) * (i + 1) - height / (root * 2),
        width / root - width / (gap * root),
        height / root - height / (gap * root)
      );
    }
  }
}

function xPiece(pos) {
  let coord = convertToCoord(pos);
  let x = coord[0] * (width / root);
  let y = coord[1] * (height / root);
  let thick = ((15 * 3) / root / 700) * ((width + height) / 2); // Weird equation I use to find appropiate thickness
  stroke(255); // Color
  strokeWeight(thick);

  // The lines that make up the cross scale with everything else, and as a result, this is pretty unreadable
  line(
    x - width / root + width / (gap * root) + thick / 2,
    y - height / root + height / (gap * root) + thick / 2,
    x - width / (gap * root) - thick / 2,
    y - height / (gap * root) - thick / 2
  );
  line(
    x - width / root + width / (gap * root) + thick / 2,
    y - height / (gap * root) - thick / 2,
    x - width / (gap * root) - thick / 2,
    y - height / root + height / (gap * root) + thick / 2
  );
}

function oPiece(pos) {
  let coord = convertToCoord(pos);
  let x = coord[0] * (width / root);
  let y = coord[1] * (height / root);
  let thick = ((15 * 3) / root / 700) * ((width + height) / 2); // Same equation as I want identical thickness
  stroke(255); // Color
  strokeWeight(thick);
  noFill();
  ellipseMode(CORNERS); // This line is important if you want to dechipher the following parameters

  // Scales with everything else
  ellipse(
    x - width / root + width / (gap * root) + thick / 2,
    y - height / root + height / (gap * root) + thick / 2,
    x - width / (gap * root) - thick / 2,
    y - height / (gap * root) - thick / 2
  );
}

// Convert 1d pos to 2d pos
function convertToCoord(pos) {
  p = pos + 1;
  let y = Math.ceil(p / root);
  let x = p - (y - 1) * root;
  return [x, y];
}

// Has to do with chrome's rules. It gives me an error if I don't do this, the error doesn't stop the program from working though
function touchStarted() {
  getAudioContext().resume();
}
