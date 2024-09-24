import { astar } from "../lib/algorithms/pathfinding/astar";
import { bfs } from "../lib/algorithms/pathfinding/bfs";
import { dfs } from "../lib/algorithms/pathfinding/dfs";
import { dijkstras } from "../lib/algorithms/pathfinding/dijkstras";
import { AlgorithmType, GridType, TileType } from "./types"

export const runPathFindingAlgorithm = (
    {
        algorithm,
        grid,
        startTile,
        endTile,
    }
    :
    {
        algorithm: AlgorithmType,
        grid: GridType,
        startTile: TileType,
        endTile: TileType,
    }
) =>  {
    switch(algorithm){
        case "BFS":
            return bfs(grid,startTile,endTile);
        case "DFS":
            return dfs(grid,startTile,endTile);
        case "DIJKSTRA":
            return dijkstras(grid,startTile,endTile);
        case "A_STAR":
            return astar(grid,startTile,endTile);
        default:
            return bfs(grid,startTile,endTile);
    }
}