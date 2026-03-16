export function getHeapSortAnimations(array) {
  const animations = [];
  if (array.length <= 1) return animations;
  const auxArray = array.slice();
  const n = auxArray.length;

  // Build heap (rearrange array)
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(auxArray, n, i, animations);
  }

  // One by one extract an element from heap
  for (let i = n - 1; i > 0; i--) {
    // Move current root to end
    animations.push({
      type: 'swap',
      indices: [0, i],
      heights: [auxArray[i], auxArray[0]]
    });
    let temp = auxArray[0];
    auxArray[0] = auxArray[i];
    auxArray[i] = temp;

    // call max heapify on the reduced heap
    heapify(auxArray, i, 0, animations);
  }

  return animations;
}

function heapify(auxArray, n, i, animations) {
  let largest = i;
  let left = 2 * i + 1;
  let right = 2 * i + 2;

  // Compare left child
  if (left < n) {
    animations.push({ type: 'compare', indices: [left, largest] });
    animations.push({ type: 'revert', indices: [left, largest] });
    if (auxArray[left] > auxArray[largest]) {
      largest = left;
    }
  }

  // Compare right child
  if (right < n) {
    animations.push({ type: 'compare', indices: [right, largest] });
    animations.push({ type: 'revert', indices: [right, largest] });
    if (auxArray[right] > auxArray[largest]) {
      largest = right;
    }
  }

  // If largest is not root
  if (largest !== i) {
    animations.push({
      type: 'swap',
      indices: [i, largest],
      heights: [auxArray[largest], auxArray[i]]
    });
    
    let swap = auxArray[i];
    auxArray[i] = auxArray[largest];
    auxArray[largest] = swap;

    // Recursively heapify the affected sub-tree
    heapify(auxArray, n, largest, animations);
  }
}
