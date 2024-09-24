import { MAX_COLS, MAX_ROWS } from "./constants";
import { GridType, TileType } from "./types";

const createRow = (row: number, startTile: TileType, endTile: TileType) => {
    const currentRow: TileType[] = [];
    for(let col = 0; col < MAX_COLS; col++){
        currentRow.push({
            row,
            col,
            isEnd: row === endTile.row && col == endTile.col,
            isWall: false,
            isPath: false,
            distance: Infinity,
            isStart: row === startTile.row && col === startTile.col,
            isTraversed: false,
            parent: null
        });
    }
    return currentRow;
}

export const createNewGrid = (grid: GridType, row: number, col: number) => {
    const newGrid = grid.slice();
    const newTile = {
        ...newGrid[row][col],
        isWall: !newGrid[row][col].isWall,
    }
    newGrid[row][col] = newTile;
    return newGrid;
}

export const createGrid = (startTile: TileType, endTile: TileType) => {
    const grid: GridType = [];
    for(let row = 0; row < MAX_ROWS; row++){
        grid.push(createRow(row,startTile,endTile));
    }
    return grid;
};

export const checkIfStartOrEnd = (row: number, col: number) => {
    return (row === 1 && col === 1) || (row === MAX_ROWS-2 && col === MAX_COLS-2);
}

export const isEqual = (a: TileType, b : TileType) => {
    return a.col===b.col && a.row===b.row;
}

export const isRowColEqual = (row: number, col: number, tile: TileType) => {
    return row===tile.row && col===tile.col;
}

export const sleep = (ms: number) => {
    return new Promise((resolve) => setTimeout(resolve,ms));
}

export const getRand = (min:number, max:number) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max-min) + min);
}

export const dropFromQueue = (tile: TileType, queue: TileType[]) => {
    for(let i=0;i<queue.length;i++){
        if(isEqual(tile,queue[i])){
            queue.splice(i,1);
            break;
        }
    }
}

// sorting

export const getRandFromInterval = (min:number, max:number) => {
    return Math.floor(Math.random() * (max-min+1) + min);
}

export const sortingAlgorithmsData = {
    bubble: {
      title: "Bubble Sort",
      description:
        "A simple comparison-based sorting algorithm. Bubble sort repeatedly compares and swaps adjacent elements if they are in the wrong order, moving larger elements towards the end with each pass through the list. This process continues until the list is sorted and no more swaps are needed.",
      worstCase: "O(n²)",
      averageCase: "O(n²)",
      bestCase: "O(n)",
    },
    insertion: {
      title: "Insertion Sort",
      description:
        "Insertion sort builds the final sorted array one element at a time, by repeatedly taking the next unsorted element and inserting it into its correct position among the previously sorted elements. This process continues until all elements have been inserted into their proper place, resulting in a sorted list.",
      worstCase: "O(n²)",
      averageCase: "O(n²)",
      bestCase: "O(n)",
    },
    selection: {
      title: "Selection Sort",
      description:
        "Selection sort works by repeatedly finding the minimum element from the unsorted portion of the list and swapping it with the element at the current position. This process is continued for each position in the list, moving the boundary of the sorted and unsorted portions one element forward each time until the entire list is sorted.",
      worstCase: "O(n²)",
      averageCase: "O(n²)",
      bestCase: "O(n²)",
    },
    merge: {
      title: "Merge Sort",
      description:
        "Merge sort divides the unsorted list into n sublists, each containing one element (a list of one element is considered sorted), and then repeatedly merges these sublists to produce new sorted sublists until there is only one sublist remaining, which is the sorted list. This algorithm uses a divide-and-conquer approach, splitting the list in half recursively and merging the sorted halves back together.",
      worstCase: "O(n log n)",
      averageCase: "O(n log n)",
      bestCase: "O(n log n)",
    },
    quick: {
      title: "Quick Sort",
      description:
        "Quick sort selects a 'pivot' element from the array and partitions the other elements into two sub-arrays, according to whether they are less than or greater than the pivot. The sub-arrays are then sorted recursively, and the sorted sub-arrays are combined with the pivot to form the sorted array.",
      worstCase: "O(n²)",
      averageCase: "O(n log n)",
      bestCase: "O(n log n)",
    },
    heap: {
      title: "Heap Sort",
      description:
        "Heap sort is a comparison-based sorting algorithm that uses a binary heap data structure. It builds a max heap from the input data, then repeatedly extracts the maximum element from the heap and rebuilds the heap until the heap is empty. This process results in a sorted array. Heap sort is efficient, with a time complexity of O(n log n) in all cases, and it is an in-place sorting algorithm, meaning it requires a constant amount of additional memory.",
      worstCase: "O(n log n)",
      averageCase: "O(n log n)",
      bestCase: "O(n log n)",
    },    
  };