class Menace1 {
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

class Menace2 extends Menace1 {}
