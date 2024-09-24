import { AnimationArrayType } from "@/app/utils/types";

function heapify(array: number[], length: number, i: number, animations: AnimationArrayType) {
  let largest = i;
  const left = 2 * i + 1;
  const right = 2 * i + 2;

  if (left < length && array[left] > array[largest]) {
    largest = left;
  }

  if (right < length && array[right] > array[largest]) {
    largest = right;
  }

  if (largest !== i) {
    animations.push([[i, largest], false]); // Highlight elements being compared
    animations.push([[i, array[largest]], true]); // Swap elements
    animations.push([[largest, array[i]], true]); // Swap elements
    [array[i], array[largest]] = [array[largest], array[i]];
    heapify(array, length, largest, animations);
  }
}

function runHeapSort(array: number[], animations: AnimationArrayType) {
  const length = array.length;

  // Build a max heap
  for (let i = Math.floor(length / 2) - 1; i >= 0; i--) {
    heapify(array, length, i, animations);
  }

  // Extract elements from the heap
  for (let i = length - 1; i > 0; i--) {
    animations.push([[0, i], false]); // Highlight elements being compared
    animations.push([[0, array[i]], true]); // Swap elements
    animations.push([[i, array[0]], true]); // Swap elements
    [array[0], array[i]] = [array[i], array[0]];
    heapify(array, i, 0, animations);
  }
}

export function heap(
  isSorting: boolean,
  array: number[],
  runAnimation: (animations: AnimationArrayType) => void
) {
  if (isSorting) return;
  if (array.length <= 1) return [];

  const auxiliaryArray = array.slice();
  const animations: AnimationArrayType = [];
  runHeapSort(auxiliaryArray, animations);
  runAnimation(animations);
}
