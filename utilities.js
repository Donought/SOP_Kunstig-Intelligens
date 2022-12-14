// Convert 1d pos to 2d pos
function convertToCoord(pos) {
  p = pos + 1;
  let y = Math.ceil(p / root);
  let x = p - (y - 1) * root;
  return [x, y];
}

function arrayEqualityCheck(a, b) {
  // Check for basic properties first
  if (a === b) return true;
  if (a == null || b == null) return false;
  if (a.length !== b.length) return false;

  // Check for quality for all index. If it finds an inequality, it returns false
  for (let i = 0; i < a.length; ++i) {
    if (a[i] !== b[i]) return false;
  }
  return true;
}

function arrayOccurence(arr, val) {
  let count = 0;
  arr.forEach((v) => {
    if (v === val) {
      count++;
    }
  });
  return count;
}

function indexOfArray(arr, val) {
  for (let i = 0; i < arr.length; i++) {
    if (arrayEqualityCheck(arr[i], val)) {
      return i;
    }
  }
  return -1;
}

function fillArray(val, amount) {
  let arr = [];
  for (let i = 0; i < amount; i++) {
    arr.push(val);
  }
  return arr;
}
