export function byClassesASC(a, b) {
  if (a.grade === b.grade) {
    if (a.letter > b.letter) {
      return 1;
    }
    return -1;
  }
  return a.grade - b.grade;
}
