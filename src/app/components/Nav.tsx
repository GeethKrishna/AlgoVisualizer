"use client";
import { MutableRefObject, useState } from "react";
import { usePathFinding } from "../hooks/usePathFinding";
import { useTile } from "../hooks/useTile";
import { ALGORITHMS, EXDENTED_SLEEP_TIME, MAZES, SLEEP_TIME, SPEEDS } from "../utils/constants";
import { resetGrid } from "../utils/resetGrid";
import { AlgorithmType, MazeType, SpeedType } from "../utils/types";
import { Select } from "./Select";
import { runMazeAlgorithm } from "../utils/runMazeAlgorithm";
import { useSpeed } from "../hooks/useSpeed";
import { PlayButton } from "./PlayButton";
import { runPathFindingAlgorithm } from "../utils/runPathFindingAlgorithm";
import { animatePath } from "../utils/animatePath";

export function Nav({isVisualisationRunningRef} : {isVisualisationRunningRef: MutableRefObject<boolean>}) {
    const [isDisabled,setIsDisabled] = useState(false);
    const {maze,setMaze,grid,setGrid,isGraphVisualised,setIsGraphVisualised,algorithm,setAlgorithm} = usePathFinding();
    const {startTile, endTile} = useTile();
    const {speed,setSpeed} = useSpeed();
    const handleGenerateMaze = (maze: MazeType) => {
        if(maze==="NONE"){
            setMaze(maze);
            resetGrid({grid,startTile,endTile});
            return;
        }
        setMaze(maze);
        setIsDisabled(true);
        // run maze algorithm
        runMazeAlgorithm({maze,grid,startTile,endTile,setIsDisabled,speed});
        const newGrid = grid.slice();
        console.log(newGrid);
        setGrid(newGrid);
        setIsGraphVisualised(false);
    }

    const handlerVisualizer = () => {
        if(isGraphVisualised){
            setIsGraphVisualised(false);
            resetGrid({grid: grid.slice(),startTile,endTile});
            return;
        }
        // run the algorithm
        const {traversedTiles,path} = runPathFindingAlgorithm({
            algorithm,
            grid,
            startTile,
            endTile,
        });
        console.log("Traversed tiles: ",traversedTiles);
        console.log("Path: ",path);

        animatePath(traversedTiles,path,startTile,endTile,speed);
        setIsDisabled(true);
        isVisualisationRunningRef.current = true;
        setTimeout(() => {
            const newGrid = grid.slice();
            setGrid(newGrid);
            setIsGraphVisualised(true);
            setIsDisabled(false);
            isVisualisationRunningRef.current = false;
        },(SLEEP_TIME * (traversedTiles.length + SLEEP_TIME*2) + EXDENTED_SLEEP_TIME * (path.length + 60) * SPEEDS.find((s) => s.value===speed)!.value));
    }
    return (
        <div className="flex items-center justify-center min-h-[4.5rem] border-b shadow-gray-600 sm:px-5 px-0">
            <div className="flex items-center lg:justify-between justify-center w-full sm:w-[52rem]">
                <h1 className="lg:flex hidden w-[40%] text-2xl pl-1">
                    Pathfinding Visualiser
                </h1>
                <div className="flex sm:items-end items-center justify-center sm:justify-between sm:flex-row flex-col sm:space-y-0 space-y-3 sm:py-0 py-4 sm:space-x-4">
                    <Select
                        label='Maze'
                        value={maze}
                        options={MAZES}
                        onChange={(e) => {
                            handleGenerateMaze(e.target.value as MazeType);
                        }}
                        isDisabled={isDisabled}
                    />
                    <Select
                        label='Algorithm'
                        value={algorithm}
                        options={ALGORITHMS}
                        onChange={(e) => {
                            setAlgorithm(e.target.value as AlgorithmType);
                        }}
                        isDisabled={isDisabled}
                    />
                    <Select
                        label='Speed'
                        value={speed}
                        options={SPEEDS}
                        onChange={(e) => {
                            setSpeed(parseInt(e.target.value) as SpeedType);
                        }}
                        isDisabled={isDisabled}
                    />
                    <PlayButton 
                        isDisabled={isDisabled}
                        isGraphVisualized={isGraphVisualised}
                        handlerVisualizer={handlerVisualizer}
                    />
                </div>
            </div>
        </div>
    );
}