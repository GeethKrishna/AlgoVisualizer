import { AlgorithmSelectType, MazeSelectType, SortingAlgorithmSelectType, SpeedSelectType } from "./types";

export const MAX_ROWS = 39;
export const MAX_COLS = 49;

export const START_TILE_CONFIG = {
    row: 1,
    col: 1,
    isEnd: false,
    isPath: false,
    isWall: false,
    distance: 0,
    isStart: false,
    isTraversed: false,
    parent: null,
}

export const END_TILE_CONFIG = {
    row: MAX_ROWS-2,
    col: MAX_COLS-2,
    isEnd: false,
    isPath: false,
    isWall: false,
    distance: 0,
    isStart: false,
    isTraversed: false,
    parent: null,
}

export const TILE_STYLE = 'lg:w-[17px] md:w-[15px] xs:w-[8px] w-[7px] lg:h-[17px] md:h-[15px] xs:h-[8px] h-[7px] border-t border-r border-sky-200';

export const TRAVERSED_TILE_STYLE = TILE_STYLE + ' bg-cyan-400';
export const START_TILE_STYLE = TILE_STYLE + ' bg-green-400';
export const END_TILE_STYLE = TILE_STYLE + ' bg-red-400';
export const WALL_TILE_STYLE = TILE_STYLE + ' bg-gray-400';
export const PATH_TILE_STYLE = TILE_STYLE + ' bg-green-500';

export const MAZES: MazeSelectType[] = [
    {name: "No Maze", value: "NONE"},
    {name: "Binary Tree", value: "BINARY_TREE"},
    {name: "Recursive Division", value: "RECURSIVE_DIVISION"},
];

export const SPEEDS: SpeedSelectType[] = [
    {name: "Fast", value: 0.5},
    {name: "Medium", value: 1},
    {name: "Slow", value: 2},
];

export const ALGORITHMS: AlgorithmSelectType[] = [
    {name: "Dijkstra's", value:"DIJKSTRA"},
    {name: "A-Star", value: "A_STAR"},
    {name: "Breath First Search", value: "BFS"},
    {name: "Depth First Search", value: "DFS"}
];

export const SLEEP_TIME = 8;

export const EXDENTED_SLEEP_TIME = 30;

// sorting

export const MAX_SORTING_SPEED = 400;
export const MIN_SORTING_SPEED = 100;

export const SORTING_ALGORITHMS: SortingAlgorithmSelectType[] = [
    {name: "Bubble", value:"bubble"},
    {name: "Insertion", value: "insertion"},
    {name: "Selection", value: "selection"},
    {name: "Quick", value: "quick"},
    {name: "Merge", value: "merge"},
    {name: "Heap", value: "heap"},
];