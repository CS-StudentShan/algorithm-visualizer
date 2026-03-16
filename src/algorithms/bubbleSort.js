export function getBubbleSortAnimations(array) {
  const animations = [];
  if (array.length <= 1) return animations;
  const auxArray = array.slice();
  
  for (let i = 0; i < auxArray.length - 1; i++) {
    let swapped = false;
    for (let j = 0; j < auxArray.length - i - 1; j++) {
      // Compare the two values
      animations.push({ type: 'compare', indices: [j, j + 1] });
      animations.push({ type: 'revert', indices: [j, j + 1] });
      
      if (auxArray[j] > auxArray[j + 1]) {
        // Swap values
        animations.push({
          type: 'swap',
          indices: [j, j + 1],
          heights: [auxArray[j + 1], auxArray[j]]
        });
        
        let temp = auxArray[j];
        auxArray[j] = auxArray[j + 1];
        auxArray[j + 1] = temp;
        swapped = true;
      }
    }
    // Optimization: if no two elements were swapped, inner loop is sorted
    if (!swapped) break;
  }
  return animations;
}
