function drawGrid() {
  rectMode(CENTER);
  noStroke();
  fill(50);
  for (let i = 0; i < root; i++) {
    if (convertToCoord(board.length - 1)[1] < i + 1) {
      fill(50, 0.5 * 255); // Lower opacity for unused fields
    }
    for (let j = 0; j < root; j++) {
      rect(
        (bw / root) * (j + 1) - bw / (root * 2),
        (bh / root) * (i + 1) - bh / (root * 2),
        bw / root - bw / (gap * root),
        bh / root - bh / (gap * root)
      );
    }
  }
}

function drawStatusBoard() {
  let step = height / 20;
  let x = bw + step;
  let y = step;

  rectMode(CORNER);
  noStroke();
  fill(50);
  rect(x, y, width - bw - step * 2, step * 18);

  textAlign(LEFT, TOP);
  textSize(26);
  fill(255);

  text("STATUS BOARD", x + step, y + step);

  textSize(20);

  if (ai.fields == 3) {
    text("Current AI: menace3", x + step, y + step * 3);
  } else {
    text("Current AI: menace6", x + step, y + step * 3);
  }

  if (winPiece == 1) {
    text("Current goal: O", x + step, y + step * 4);
  } else {
    text("Current goal: X", x + step, y + step * 4);
  }

  text("Games played: " + ai.games, x + step, y + step * 6);
  text("Games won: " + ai.winCount, x + step, y + step * 7);
  text("Games lost: " + ai.lossCount, x + step, y + step * 8);

  text("Best win streak: " + ai.bestWinStreak, x + step, y + step * 10);
  text("Current win streak: " + ai.winStreak, x + step, y + step * 11);

  if (ai.bestWinStreak < trainedState) {
    text("Training status: untrained", x + step, y + step * 13);
  } else {
    text("Training status: TRAINED", x + step, y + step * 13);
  }
}

function xPiece(pos) {
  let coord = convertToCoord(pos);
  let x = coord[0] * (bw / root);
  let y = coord[1] * (bh / root);
  let thick = ((15 * 3) / root / 700) * ((bw + bh) / 2); // Weird equation I use to find appropiate thickness
  stroke(255); // Color
  strokeWeight(thick);

  // The lines that make up the cross scale with everything else, and as a result, this is pretty unreadable
  line(
    x - bw / root + bw / (gap * root) + thick / 2,
    y - bh / root + bh / (gap * root) + thick / 2,
    x - bw / (gap * root) - thick / 2,
    y - bh / (gap * root) - thick / 2
  );
  line(
    x - bw / root + bw / (gap * root) + thick / 2,
    y - bh / (gap * root) - thick / 2,
    x - bw / (gap * root) - thick / 2,
    y - bh / root + bh / (gap * root) + thick / 2
  );
}

function oPiece(pos) {
  let coord = convertToCoord(pos);
  let x = coord[0] * (bw / root);
  let y = coord[1] * (bh / root);
  let thick = ((15 * 3) / root / 700) * ((bw + bh) / 2); // Same equation as I want identical thickness
  stroke(255); // Color
  strokeWeight(thick);
  noFill();
  ellipseMode(CORNERS); // This line is important if you want to dechipher the following parameters

  // Scales with everything else
  ellipse(
    x - bw / root + bw / (gap * root) + thick / 2,
    y - bh / root + bh / (gap * root) + thick / 2,
    x - bw / (gap * root) - thick / 2,
    y - bh / (gap * root) - thick / 2
  );
}

function formatBut(but) {
  but.size(but.size().width * 1.5, but.size().height * 1.5);
  but.style("font-size", "18px");
}
