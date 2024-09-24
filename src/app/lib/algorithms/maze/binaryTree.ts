import { MAX_COLS, MAX_ROWS } from "@/app/utils/constants";
import { createwall } from "@/app/utils/createWall";
import { destroyWall } from "@/app/utils/destroyWall";
import { getRand, isEqual, sleep } from "@/app/utils/helpers";
import { GridType, SpeedType, TileType } from "@/app/utils/types"

export default async function binaryTree (
    grid: GridType,
    startTile: TileType,
    endTile: TileType,
    setIsDisabled: (isDisabled: boolean) => void,
    speed: SpeedType,
) {
    await createwall(grid,startTile,endTile,speed);
    await sleep(MAX_ROWS*MAX_COLS);
    
    for(let row = 1; row < MAX_ROWS; row+=2){
        for(let col = 1; col < MAX_COLS; col+=2){
            if(row === MAX_ROWS-2 && col === MAX_COLS-2){
                continue;
            }
            else if(row === MAX_ROWS-2){
                await destroyWall(grid,row,col,1,speed);
            }
            else if(col === MAX_COLS-2){
                await destroyWall(grid,row,col,0,speed);
            }
            else{
                await destroyWall(grid,row,col,getRand(0,2),speed);
            }
        }
    } 
    setIsDisabled(false);
};