export function isStringEmpty(s) {
  if (s === undefined || s.toString().length <= 0) {
    return true;
  } else {
    return false;
  }
}

export function minMax(s, min, max) {
  if (s.toString().length < min) {
    return false;
  } else if (s.toString().length > max) {
    return false;
  } else {
    return true;
  }
}
