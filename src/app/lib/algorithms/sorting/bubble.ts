import { AnimationArrayType } from "@/app/utils/types";

function runBubbleSort(array: number[], animations: AnimationArrayType){
    for(let i=0; i<array.length; i++){
        for(let j=0;j<array.length-i;j++){
            animations.push([[j,j+1],false]);
            if(array[j]>array[j+1]){
                animations.push([[j,array[j+1]],true]);
                animations.push([[j+1,array[j]],true]);
                [array[j],array[j+1]] = [array[j+1],array[j]];
            }
        }
    }
}

export function bubble(
    isSorting: boolean,
    array: number[],
    runAnimation: (animations: AnimationArrayType) => void,
) {
    if(isSorting) return;
    if(array.length<=1) return;
    const animations: AnimationArrayType = [];
    const auxArray = array.slice();
    runBubbleSort(auxArray,animations);
    runAnimation(animations);
}