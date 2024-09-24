import { getUnTraversedNeighbours } from "@/app/utils/getUnTraversedNeighbours";
import { dropFromQueue, isEqual } from "@/app/utils/helpers";
import { initFunctionCost, initHeuristicCost } from "@/app/utils/heuristics";
import { GridType, TileType } from "@/app/utils/types";

export const astar = (
    grid: GridType,
    startTile: TileType,
    endTile: TileType
) => {
    const traversedTiles = [];
    const heuristicCost = initHeuristicCost(grid,endTile);
    const functionCost = initFunctionCost();
    const base = grid[startTile.row][startTile.col];
    base.distance = 0;
    functionCost[base.row][base.col] = base.distance + heuristicCost[base.row][base.col];
    base.isTraversed = true;
    const unTraversedTiles = [base];
    while(unTraversedTiles.length){
        unTraversedTiles.sort((a,b)=>{
            if(functionCost[a.row][a.col] === functionCost[b.row][b.col]){
                return b.distance - a.distance;
            }
            return functionCost[a.row][a.col] - functionCost[b.row][b.col]
        });
        const currentTile = unTraversedTiles.shift();
        if(currentTile){
            if(currentTile.isWall) continue;
            if(currentTile.distance===Infinity) break;
            currentTile.isTraversed = true;
            traversedTiles.push(currentTile);
            if(isEqual(currentTile,endTile)) break;
            const neighbours = getUnTraversedNeighbours(grid,currentTile);
            for(let i=0; i<neighbours.length; i++){
                const distanceToNeighbour = currentTile.distance + 1;
                if(distanceToNeighbour < neighbours[i].distance) {
                    dropFromQueue(neighbours[i],unTraversedTiles);
                    neighbours[i].distance = distanceToNeighbour;
                    functionCost[neighbours[i].row][neighbours[i].col] = neighbours[i].distance + heuristicCost[neighbours[i].row][neighbours[i].col];
                    neighbours[i].parent = currentTile;
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