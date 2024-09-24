import { bubble } from "../lib/algorithms/sorting/bubble";
import { heap } from "../lib/algorithms/sorting/heap";
import { insertion } from "../lib/algorithms/sorting/insertion";
import { merge } from "../lib/algorithms/sorting/merge";
import { quick } from "../lib/algorithms/sorting/quick";
import { selection } from "../lib/algorithms/sorting/selection";
import { AnimationArrayType, SortingAlgorithmType } from "./types";

export function runSortingAlgorithm (
    selectedAlgorithm: SortingAlgorithmType,
    isSorting: boolean,
    array: number[],
    runAnimation: (animations: AnimationArrayType) => void,
) {
    switch(selectedAlgorithm){
        case "bubble":
            bubble(isSorting,array,runAnimation);
            break;
        case "selection":
            selection(isSorting,array,runAnimation);
            break;
        case "insertion":
            insertion(isSorting,array,runAnimation);
            break;
        case "quick":
            quick(isSorting,array,runAnimation);
            break;
        case "merge":
            merge(isSorting,array,runAnimation);
            break;
        case "heap":
            heap(isSorting,array,runAnimation);
            break;
        default:
            bubble(isSorting,array,runAnimation);
            break;
    }
}