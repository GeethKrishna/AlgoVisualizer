"use client";
import { createContext, ReactNode, useState } from "react";
import { AlgorithmType, MazeType, GridType } from "../utils/types";
import { END_TILE_CONFIG, START_TILE_CONFIG } from "../utils/constants";
import { createGrid } from "../utils/helpers";

interface PathFindingContextInterface {
    algorithm: AlgorithmType;
    setAlgorithm: (algorithm: AlgorithmType) => void;
    maze: MazeType;
    setMaze: (maze: MazeType) => void;
    grid: GridType;
    setGrid: (grid: GridType) => void;
    isGraphVisualised: boolean;
    setIsGraphVisualised: (isGraphVisualised: boolean) => void;
}

export const PathFindingContext = createContext<PathFindingContextInterface | undefined> (undefined);

export const PathFindingProvider = ({children} : {children: ReactNode}) => {
    const [algorithm,setAlgorithm] = useState<AlgorithmType>("BFS");
    const [maze,setMaze] = useState<MazeType>("NONE");
    const [grid,setGrid] = useState<GridType>(createGrid(START_TILE_CONFIG,END_TILE_CONFIG));
    const [isGraphVisualised, setIsGraphVisualised] = useState<boolean>(false);

    return (
        <PathFindingContext.Provider
            value={
                {
                    algorithm,
                    setAlgorithm,
                    maze,
                    setMaze,
                    grid,
                    setGrid,
                    isGraphVisualised,
                    setIsGraphVisualised,
                }
            }
        >  
            {children}
        </PathFindingContext.Provider>
    )
}