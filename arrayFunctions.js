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
