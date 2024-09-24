export type AlgorithmType = "DIJKSTRA" | "A_STAR" | "BFS" | "DFS";

export interface AlgorithmSelectType {
    name: string,
    value: AlgorithmType,
}

export type MazeType = "NONE" | "BINARY_TREE" | "RECURSIVE_DIVISION";

export interface MazeSelectType {
    name: string,
    value: MazeType,
}

export type TileType = {
    row: number;
    col: number;
    distance: number;
    isEnd: boolean;
    isStart: boolean;
    isWall: boolean;
    isPath: boolean;
    isTraversed: boolean;
    parent: TileType | null;
};

export type GridType = TileType[][];

export type SpeedType = 1 | 2 | 0.5;

export interface SpeedSelectType {
    name: string;
    value: SpeedType;
}

// sorting

export type SortingAlgorithmType = "bubble" | "insertion" | "selection" | "quick" | "merge" | "heap";

export interface SortingAlgorithmSelectType {
    name: string,
    value: SortingAlgorithmType,
}

export type AnimationArrayType = [number[],boolean][];