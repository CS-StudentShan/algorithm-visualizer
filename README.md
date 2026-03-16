# 💻 Algorithm Visualizer

![Matrix Theme Preview](https://img.shields.io/badge/UI-Matrix%20Theme-00FF41?style=for-the-badge&logoColor=black)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)

A high-performance, interactive sorting algorithm visualizer built with React. Designed from scratch with a premium "Hacker / Matrix" aesthetic, this tool dynamically illustrates how different algorithms process and sort data in real-time.

---

## ✨ Features

- **6 Distinct Sorting Algorithms**: Including Quick Sort, Merge Sort, Heap Sort, Insertion Sort, Selection Sort, and Bubble Sort.
- **Dynamic Array Generation**: Generate random data distributions and adjust the array sample size up to 250 elements seamlessly.
- **Real-Time Analytics Dashboard**: Live-tracking of mathematical performance metrics including:
  - Big O Time Complexity
  - Space Complexity
  - Live Operation Counts (Total Swaps and Comparisons)
- **Clock Speed Adjustments**: Adjust the animation execution speed without dropping frames.
- **Cyberpunk UI Architecture**: Engineered a fully custom, authentic command-line aesthetic using CSS gradients, intense shadow glow effects, and strict monospace typography.

## 🚀 Algorithms Implemented

| Algorithm | Average Time Complexity | Space Complexity |
|-----------|-------------------------|-----------------:|
| **Quick Sort** | `O(N log N)` | `O(log N)` |
| **Merge Sort** | `O(N log N)` | `O(N)` |
| **Heap Sort** | `O(N log N)` | `O(1)` |
| **Insertion Sort**| `O(N²)` | `O(1)` |
| **Selection Sort**| `O(N²)` | `O(1)` |
| **Bubble Sort** | `O(N²)` | `O(1)` |

## 🛠⚙️ Technical Implementation

- **State Management Engine**: Engineered a custom React hook workflow to process a unified array of animations. Rather than re-rendering the entire DOM repeatedly, the engine translates algorithm steps into targeted, optimized DOM manipulations (`setTimeout` queueing).
- **Responsive Flexbox Design**: The visual array seamlessly scales structurally and visually without breaking page overflow rules. 

## 💻 Getting Started

### Prerequisites
- Node.js installed on your machine.
- Git.

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/YOUR_GITHUB_USERNAME/algorithm-visualizer.git
   ```
2. Navigate to the directory:
   ```bash
   cd algorithm-visualizer
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm start
   ```

The application will run locally on `http://localhost:3000`.

---
*This project was built to demonstrate an understanding of core data structures, algorithmic time complexities, state management, and modern frontend styling logic.*
