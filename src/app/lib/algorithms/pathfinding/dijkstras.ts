import { getUnTraversedNeighbours } from "@/app/utils/getUnTraversedNeighbours";
import { dropFromQueue, isEqual } from "@/app/utils/helpers";
import { GridType, TileType } from "@/app/utils/types";

export const dijkstras = (
    grid: GridType,
    startTile: TileType,
    endTile: TileType,
) => {
    const traversedTiles = [];
    const base = grid[startTile.row][startTile.col];
    base.distance = 0;
    base.isTraversed = true;
    const unTraversedTiles = [base];
    while(unTraversedTiles.length){
        unTraversedTiles.sort((a,b) => a.distance - b.distance);
        const tile = unTraversedTiles.shift();
        if(tile){
            if(tile.isWall) continue;
            if(tile.distance === Infinity) break;
            tile.isTraversed = true;
            traversedTiles.push(tile);
            if(isEqual(endTile,tile)) break;
            const neighbours = getUnTraversedNeighbours(grid,tile);
            for(let i=0; i<neighbours.length; i++){
                if(tile.distance + 1 < neighbours[i].distance){
                    dropFromQueue(neighbours[i],unTraversedTiles);
                    neighbours[i].distance = tile.distance + 1;
                    neighbours[i].parent = tile;
                    unTraversedTiles.push(neighbours[i]);
                }
            }
        }
    }
    const path = [];
    let currentTile = grid[endTile.row][endTile.col];
    while(currentTile!=null){
        currentTile.isPath = true;
        path.unshift(currentTile);
        currentTile = currentTile.parent!;
    }
    return {traversedTiles,path};
}