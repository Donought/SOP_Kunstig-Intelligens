class Menace {
  constructor() {
    this.ai = [[], [], []];

    this.marbles = 2;

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

let menace = new Menace();

function setup() {
  createCanvas(400, 400);
  console.log(menace.ai[0][0][0][0][0][0][0][0][0]);
}

function draw() {
  background(220);
}
