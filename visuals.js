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
  rectMode(CORNER);
  noStroke();
  fill(50);
  rect(
    bw + height / 20,
    height / 20,
    width - bw - (height / 20) * 2,
    (height / 20) * 18
  );
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
