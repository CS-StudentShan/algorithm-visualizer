export function getInsertionSortAnimations(array) {
  const animations = [];
  if (array.length <= 1) return animations;
  const auxArray = array.slice();

  for (let i = 1; i < auxArray.length; i++) {
    let key = auxArray[i];
    let j = i - 1;

    animations.push({ type: 'compare', indices: [i, i] });
    animations.push({ type: 'revert', indices: [i, i] });

    while (j >= 0 && auxArray[j] > key) {
      animations.push({ type: 'compare', indices: [j, j + 1] });
      animations.push({ type: 'revert', indices: [j, j + 1] });

      // Overwrite auxArray[j+1] with auxArray[j]
      animations.push({
        type: 'overwrite',
        index: j + 1,
        height: auxArray[j]
      });

      auxArray[j + 1] = auxArray[j];
      j = j - 1;
    }

    // Overwrite auxArray[j+1] with key
    animations.push({
      type: 'overwrite',
      index: j + 1,
      height: key
    });
    auxArray[j + 1] = key;
  }

  return animations;
}
