import { getUnTraversedNeighbours } from "@/app/utils/getUnTraversedNeighbours";
import { isEqual } from "@/app/utils/helpers";
import { isInQueue } from "@/app/utils/isInQueue";
import { GridType, TileType } from "@/app/utils/types";

export const bfs = (grid: GridType, startTile: TileType, endTile: TileType) => {
    const traversedTiles: TileType[] = [];
    const base = grid[startTile.row][startTile.col];
    base.distance = 0;
    base.isTraversed = true;
    const unTraversed: TileType[] = [base];
    while(unTraversed.length){
        const tile = unTraversed.shift();
        if(!tile) continue;
        if(tile.isWall) continue;
        if(tile.distance === Infinity) break;
        tile.isTraversed = true;
        traversedTiles.push(tile);
        if(isEqual(endTile,tile)) break;

        const neighbours = getUnTraversedNeighbours(grid,tile);
        for(let i=0;i<neighbours.length; i++){
            if(!isInQueue(neighbours[i],unTraversed)){
                const neighbour = neighbours[i];
                neighbour.distance = tile.distance + 1;
                neighbour.parent = tile;
                unTraversed.push(neighbour);
            }
        }
    }
    const path = [];
    let tile = grid[endTile.row][endTile.col];
    while(tile!=null){
        tile.isPath = true;
        path.unshift(tile);
        tile = tile.parent!;
    }
    return {traversedTiles, path};
}