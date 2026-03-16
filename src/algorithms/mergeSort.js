export function getMergeSortAnimations(array) {
  const animations = [];
  if (array.length <= 1) return animations;
  const auxiliaryArray = array.slice();
  mergeSortHelper(array, 0, array.length - 1, auxiliaryArray, animations);
  return animations;
}

function mergeSortHelper(mainArray, startIdx, endIdx, auxiliaryArray, animations) {
  if (startIdx === endIdx) return;
  const middleIdx = Math.floor((startIdx + endIdx) / 2);
  
  // Recursively sort the two halves
  mergeSortHelper(auxiliaryArray, startIdx, middleIdx, mainArray, animations);
  mergeSortHelper(auxiliaryArray, middleIdx + 1, endIdx, mainArray, animations);
  
  // Merge the halves
  doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations);
}

function doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations) {
  let k = startIdx;
  let i = startIdx;
  let j = middleIdx + 1;
  
  while (i <= middleIdx && j <= endIdx) {
    // Highlight items we are comparing
    animations.push({ type: 'compare', indices: [i, j] });
    animations.push({ type: 'revert', indices: [i, j] });
    
    if (auxiliaryArray[i] <= auxiliaryArray[j]) {
      // Overwrite mainArray[k] with auxiliaryArray[i]
      animations.push({ type: 'overwrite', index: k, height: auxiliaryArray[i] });
      mainArray[k++] = auxiliaryArray[i++];
    } else {
      // Overwrite mainArray[k] with auxiliaryArray[j]
      animations.push({ type: 'overwrite', index: k, height: auxiliaryArray[j] });
      mainArray[k++] = auxiliaryArray[j++];
    }
  }
  
  while (i <= middleIdx) {
    animations.push({ type: 'compare', indices: [i, i] });
    animations.push({ type: 'revert', indices: [i, i] });
    animations.push({ type: 'overwrite', index: k, height: auxiliaryArray[i] });
    mainArray[k++] = auxiliaryArray[i++];
  }
  
  while (j <= endIdx) {
    animations.push({ type: 'compare', indices: [j, j] });
    animations.push({ type: 'revert', indices: [j, j] });
    animations.push({ type: 'overwrite', index: k, height: auxiliaryArray[j] });
    mainArray[k++] = auxiliaryArray[j++];
  }
}
