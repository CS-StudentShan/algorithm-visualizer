export function getQuickSortAnimations(array) {
  const animations = [];
  if (array.length <= 1) return animations;
  const auxiliaryArray = array.slice();
  quickSortHelper(auxiliaryArray, 0, auxiliaryArray.length - 1, animations);
  return animations;
}

function quickSortHelper(mainArray, startIdx, endIdx, animations) {
  if (startIdx < endIdx) {
    const pivotIdx = partition(mainArray, startIdx, endIdx, animations);
    quickSortHelper(mainArray, startIdx, pivotIdx - 1, animations);
    quickSortHelper(mainArray, pivotIdx + 1, endIdx, animations);
  }
}

function partition(mainArray, startIdx, endIdx, animations) {
  const pivot = mainArray[endIdx];
  let i = startIdx - 1;

  for (let j = startIdx; j < endIdx; j++) {
    // Highlight items we are comparing
    animations.push({ type: 'compare', indices: [j, endIdx] });
    animations.push({ type: 'revert', indices: [j, endIdx] });

    if (mainArray[j] < pivot) {
      i++;
      // Highlight items we are swapping
      animations.push({
        type: 'swap',
        indices: [i, j],
        heights: [mainArray[j], mainArray[i]] // heights to swap visually
      });
      // Swap in auxiliary array
      let temp = mainArray[i];
      mainArray[i] = mainArray[j];
      mainArray[j] = temp;
    }
  }

  // Swap pivot into correct position
  animations.push({
    type: 'swap',
    indices: [i + 1, endIdx],
    heights: [mainArray[endIdx], mainArray[i + 1]]
  });
  let temp = mainArray[i + 1];
  mainArray[i + 1] = mainArray[endIdx];
  mainArray[endIdx] = temp;

  return i + 1;
}
