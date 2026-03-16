export function getSelectionSortAnimations(array) {
  const animations = [];
  if (array.length <= 1) return animations;
  const auxArray = array.slice();

  for (let i = 0; i < auxArray.length - 1; i++) {
    let minIdx = i;

    // Highlight the current minimum initially
    animations.push({ type: 'compare', indices: [minIdx, minIdx] });
    animations.push({ type: 'revert', indices: [minIdx, minIdx] });

    for (let j = i + 1; j < auxArray.length; j++) {
      // Highlight comparison
      animations.push({ type: 'compare', indices: [j, minIdx] });
      animations.push({ type: 'revert', indices: [j, minIdx] });

      if (auxArray[j] < auxArray[minIdx]) {
        minIdx = j;
      }
    }

    if (minIdx !== i) {
      // Swap logic
      animations.push({
        type: 'swap',
        indices: [i, minIdx],
        heights: [auxArray[minIdx], auxArray[i]]
      });

      let temp = auxArray[minIdx];
      auxArray[minIdx] = auxArray[i];
      auxArray[i] = temp;
    }
  }

  return animations;
}
