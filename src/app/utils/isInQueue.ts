import { isEqual } from "./helpers";
import { TileType } from "./types";

export const isInQueue = (tile: TileType, queue: TileType[]) => {
    for(let i=0;i<queue.length;i++){
        if(isEqual(queue[i],tile)){
            return true;
        }
    }
    return false;
}