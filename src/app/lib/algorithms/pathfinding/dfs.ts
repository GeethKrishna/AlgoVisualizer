import { getUnTraversedNeighbours } from "@/app/utils/getUnTraversedNeighbours";
import { isEqual } from "@/app/utils/helpers";
import { isInQueue } from "@/app/utils/isInQueue";
import { GridType, TileType } from "@/app/utils/types"

export const dfs = (grid: GridType, startTile: TileType, endTile: TileType) => {
    const traversedTiles = [];
    const base = grid[startTile.row][startTile.col];
    base.distance = 0;
    base.isTraversed = true;
    const unTraversedTiles = [base];
    while(unTraversedTiles.length){
        const tile = unTraversedTiles.pop();
        if(tile){
            if(tile.isWall) continue;
            if(tile.distance === Infinity) break;
            traversedTiles.push(tile);
            tile.isTraversed = true;
            if(isEqual(tile,endTile)) break;
            const neighbours = getUnTraversedNeighbours(grid,tile);
            for(let i=0; i<neighbours.length; i++){
                if(!isInQueue(neighbours[i],unTraversedTiles)){
                    neighbours[i].distance = tile.distance + 1;
                    neighbours[i].parent = tile;
                    unTraversedTiles.push(neighbours[i]);
                }
            }
        }
    }
    const path = [];
    let currentTile =  grid[endTile.row][endTile.col];
    while(currentTile!=null){
        currentTile.isPath = true;
        path.unshift(currentTile);
        currentTile = currentTile.parent!;
    }
    return {traversedTiles,path};
}