import React, { useState, useEffect } from 'react';
import { getMergeSortAnimations } from '../algorithms/mergeSort';
import { getBubbleSortAnimations } from '../algorithms/bubbleSort';
import { getQuickSortAnimations } from '../algorithms/quickSort';
import { getInsertionSortAnimations } from '../algorithms/insertionSort';
import { getSelectionSortAnimations } from '../algorithms/selectionSort';
import { getHeapSortAnimations } from '../algorithms/heapSort';
import '../index.css';

const PRIMARY_COLOR = '#00ff41'; // Neon Green
const SECONDARY_COLOR = '#ff003c'; // Cyber Red for comparison
const SUCCESS_COLOR = '#ffffff'; // White flash for sorted

const ALGORITHM_INFO = {
  mergeSort: { name: 'Merge Sort', time: 'O(N log N)', space: 'O(N)' },
  bubbleSort: { name: 'Bubble Sort', time: 'O(N²)', space: 'O(1)' },
  quickSort: { name: 'Quick Sort', time: 'O(N log N)', space: 'O(log N)' },
  insertionSort: { name: 'Insertion Sort', time: 'O(N²)', space: 'O(1)' },
  selectionSort: { name: 'Selection Sort', time: 'O(N²)', space: 'O(1)' },
  heapSort: { name: 'Heap Sort', time: 'O(N log N)', space: 'O(1)' },
};

export default function SortingVisualizer() {
  // Dark mode state
  const [darkMode, setDarkMode] = useState(false);

  // Apply dark mode class to body
  useEffect(() => {
    document.body.classList.toggle('dark-mode', darkMode);
  }, [darkMode]);

  // Load algorithm from URL query param for shareable links
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const algo = params.get('algo');
    if (algo && Object.keys(ALGORITHM_INFO).includes(algo)) {
      setSelectedAlgo(algo);
    }
  }, []);

  const [array, setArray] = useState([]);
  const [isSorting, setIsSorting] = useState(false);
  const [animationSpeed, setAnimationSpeed] = useState(50);
  const [arraySize, setArraySize] = useState(60);
  const [selectedAlgo, setSelectedAlgo] = useState('mergeSort');
  
  // Stats State
  const [comparisons, setComparisons] = useState(0);
  const [swaps, setSwaps] = useState(0);

  const DEFAULT_MAX_HEIGHT = 380;

  useEffect(() => {
    generateArray(arraySize);
    // eslint-disable-next-line
  }, [arraySize]);

  const generateArray = (size = arraySize) => {

    const arr = [];
    for (let i = 0; i < size; i++) {
        arr.push(Math.floor(Math.random() * (DEFAULT_MAX_HEIGHT - 10 + 1) + 10));
    }
    setArray(arr);
    // Reset stats & colors
    setComparisons(0);
    setSwaps(0);
    const arrayBars = document.getElementsByClassName('array-bar');
    for (let i = 0; i < arrayBars.length; i++) {
        arrayBars[i].style.backgroundColor = PRIMARY_COLOR;
    }
  };

  // Copy the current page URL (including selected algorithm) to clipboard
  const copyShareableLink = () => {
    try {
      const url = new URL(window.location.href);
      url.searchParams.set('algo', selectedAlgo);
      navigator.clipboard.writeText(url.toString());
      alert('Shareable link copied to clipboard!');
    } catch (e) {
      console.error('Copy failed', e);
      alert('Failed to copy link');
    }
  };

    const arr = [];
    for (let i = 0; i < size; i++) {
        arr.push(Math.floor(Math.random() * (DEFAULT_MAX_HEIGHT - 10 + 1) + 10));
    }
    setArray(arr);
    
    // Reset stats & colors
    setComparisons(0);
    setSwaps(0);
    const arrayBars = document.getElementsByClassName('array-bar');
    for (let i = 0; i < arrayBars.length; i++) {
        arrayBars[i].style.backgroundColor = PRIMARY_COLOR;
    }
  };

  const getAnimations = () => {
    switch(selectedAlgo) {
        case 'mergeSort': return getMergeSortAnimations(array);
        case 'bubbleSort': return getBubbleSortAnimations(array);
        case 'quickSort': return getQuickSortAnimations(array);
        case 'insertionSort': return getInsertionSortAnimations(array);
        case 'selectionSort': return getSelectionSortAnimations(array);
        case 'heapSort': return getHeapSortAnimations(array);
        default: return [];
    }
  };

  const handleSort = () => {

    const animations = getAnimations();
    executeAnimations(animations);
  };

  const executeAnimations = (animations) => {
    setIsSorting(true);
    const arrayBars = document.getElementsByClassName('array-bar');
    
    // Reset live stats counters
    let currentComparisons = 0;
    let currentSwaps = 0;

    const delay = Math.max(1, 100 - animationSpeed);
    
    for (let i = 0; i < animations.length; i++) {
      setTimeout(() => {
        const anim = animations[i];
        if (anim.type === 'compare') {
            currentComparisons += 0.5; // (since we push compare then revert)
            setComparisons(Math.floor(currentComparisons));
            const [idx1, idx2] = anim.indices;
            if (arrayBars[idx1]) arrayBars[idx1].style.backgroundColor = SECONDARY_COLOR;
            if (arrayBars[idx2]) arrayBars[idx2].style.backgroundColor = SECONDARY_COLOR;
        } else if (anim.type === 'revert') {
            const [idx1, idx2] = anim.indices;
            if (arrayBars[idx1]) arrayBars[idx1].style.backgroundColor = PRIMARY_COLOR;
            if (arrayBars[idx2]) arrayBars[idx2].style.backgroundColor = PRIMARY_COLOR;
        } else if (anim.type === 'overwrite') {
            currentSwaps += 1; // treating overwrites as operations
            setSwaps(currentSwaps);
            if (arrayBars[anim.index]) arrayBars[anim.index].style.height = `${anim.height}px`;
        } else if (anim.type === 'swap') {
            currentSwaps += 1;
            setSwaps(currentSwaps);
            const [idx1, idx2] = anim.indices;
            const [height1, height2] = anim.heights;
            if (arrayBars[idx1]) arrayBars[idx1].style.height = `${height1}px`;
            if (arrayBars[idx2]) arrayBars[idx2].style.height = `${height2}px`;
        }
        
        if (i === animations.length - 1) {
            for (let j = 0; j < arrayBars.length; j++) {
                setTimeout(() => {
                    arrayBars[j].style.backgroundColor = SUCCESS_COLOR;
                    setTimeout(() => {
                        arrayBars[j].style.backgroundColor = PRIMARY_COLOR;
                    }, 300); // White flash then back to green
                }, j * 5); 
            }
            setTimeout(() => setIsSorting(false), arrayBars.length * 5 + 300);
        }
      }, i * delay);
    }
    
    if (animations.length === 0) {
        setIsSorting(false);
    }
  };

  const activeInfo = ALGORITHM_INFO[selectedAlgo];

  return (
    <div className="visualizer-container">
      
      <div className="stats-dashboard">
          <div className="stat-item">
              <div className="stat-label">Algorithm</div>
              <div className="stat-value">{activeInfo.name}</div>
          </div>
          <div className="stat-item">
              <div className="stat-label">Time Complexity</div>
              <div className="stat-value">{activeInfo.time}</div>
          </div>
          <div className="stat-item">
              <div className="stat-label">Space Complexity</div>
              <div className="stat-value">{activeInfo.space}</div>
          </div>
          <div className="stat-item">
              <div className="stat-label">Comparisons</div>
              <div className="stat-value">{comparisons}</div>
          </div>
          <div className="stat-item">
              <div className="stat-label">Swaps / Overwrites</div>
              <div className="stat-value">{swaps}</div>
          </div>
      </div>

      <div className="controls">
        <button className="btn" onClick={() => generateArray()} disabled={isSorting}>Generate Data</button>
        {/* Dark Mode Toggle */}
        <button className="btn" onClick={() => setDarkMode(prev => !prev)} disabled={isSorting} style={{ marginLeft: '8px' }}>
          {darkMode ? 'Light Mode' : 'Dark Mode'}

        {/* Copy Shareable Link */}
        <button className="btn" onClick={copyShareableLink} disabled={isSorting} style={{ marginLeft: '8px' }}>
          Copy Shareable Link



        
        <select 
          className="select-dropdown" 
          value={selectedAlgo} 
          onChange={(e) => setSelectedAlgo(e.target.value)}
          disabled={isSorting}
        >
            <option value="mergeSort">Merge Sort</option>
            <option value="quickSort">Quick Sort</option>
            <option value="heapSort">Heap Sort</option>
            <option value="insertionSort">Insertion Sort</option>
            <option value="selectionSort">Selection Sort</option>
            <option value="bubbleSort">Bubble Sort</option>
        </select>
        
        <button className="btn" onClick={handleSort} disabled={isSorting}>
          &gt; Execute Sort_

        
        <div className="slider-container">
            <label>Clock_Spd:</label>
            <input 
              type="range" min="1" max="99" 
              value={animationSpeed} 
              onChange={(e) => setAnimationSpeed(Number(e.target.value))}
              disabled={isSorting}
            />
        </div>
        
        <div className="slider-container">
            <label>Data_Size:</label>
            <input 
              type="range" min="10" max="250" 
              value={arraySize} 
              onChange={(e) => setArraySize(Number(e.target.value))}
              disabled={isSorting}
            />
        </div>
      </div>

      <div className="array-container">
        {array.map((value, idx) => (
          <div
            className="array-bar"
            key={idx}
            style={{ height: `${value}px` }}
          ></div>
        ))}
      </div>
    </div>
  );
}
