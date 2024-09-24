"use client";
import { usePathFinding } from "../hooks/usePathFinding";
import { twMerge } from "tailwind-merge";
import { MAX_COLS, MAX_ROWS } from "../utils/constants";
import { Tile } from "./Tile";
import { MutableRefObject, useState } from "react";
import { checkIfStartOrEnd, createNewGrid } from "../utils/helpers";

export function Grid ({isVisualisationRunningRef} : {isVisualisationRunningRef: MutableRefObject<boolean>}) {
    const {grid, setGrid} = usePathFinding();
    const [isMouseDown, setIsMouseDown] = useState<boolean>(false);

    const handelMouseDown = (row: number, col: number) => {
        if(isVisualisationRunningRef.current || checkIfStartOrEnd(row,col)){
            return;
        }
        console.log(row,col);
        setIsMouseDown(true);
        const newGrid = createNewGrid(grid,row,col);
        setGrid(newGrid);
    }

    const handelMouseUp = (row:number, col: number) => {
        if(isVisualisationRunningRef.current || checkIfStartOrEnd(row,col)){
            return;
        }
        setIsMouseDown(false);
    }

    const handelMouseEnter = (row: number, col: number) => {
        if(isVisualisationRunningRef.current || checkIfStartOrEnd(row,col)){
            return;
        }
        if(isMouseDown){
            const newGrid = createNewGrid(grid,row,col);
            setGrid(newGrid);
        }
    }
    return (
        <div
            className={twMerge(
                // base classes
                "flex flex-col items-center justify-center border-sky-300 mt-10",
                // controling grid height
                `lg:h-[{${MAX_ROWS * 17}px}] md:h-[{${MAX_ROWS * 15}px}] xs:h-[{${MAX_ROWS * 8}px}] h-[{${MAX_ROWS * 7}px}]`,
                // controling grid width
                `lg:w-[${MAX_COLS * 17}] md:w-[${MAX_COLS * 15}] xs:w-[${MAX_COLS * 8}] w-[${MAX_COLS * 7}]`,
            )}    
        >
            {
                grid.map((rowOuter,rowIndex) => (
                    <div key={rowIndex} className="flex">
                        {
                            rowOuter.map((tile,tileIndex) => {
                                const {row, col, isEnd, isStart, isPath, isTraversed, isWall} = tile;

                                return (
                                    <Tile 
                                        key={tileIndex}
                                        row={tile.row}
                                        col={tile.col}
                                        isEnd={isEnd}
                                        isStart={isStart}
                                        isPath={isPath}
                                        isWall={isWall}
                                        isTraversed={isTraversed}
                                        handelMouseDown={() => handelMouseDown(row,col)}
                                        handelMouseUp={() => handelMouseUp(row,col)}
                                        handelMouseEnter={() => handelMouseEnter(row,col)}
                                    />
                                )
                            })
                        }
                    </div>
                ))
            }
        </div>
    );
}