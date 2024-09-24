import { SPEEDS, WALL_TILE_STYLE } from "@/app/utils/constants";
import { getRand, isEqual, sleep } from "@/app/utils/helpers";
import { GridType, SpeedType, TileType } from "@/app/utils/types";
import recursiveDivision from "./recursiveDivision";

export async function horizontalDivision(
    {
        grid,
        startTile,
        endTile,
        row,
        col,
        height,
        width,
        setIsDisabled,
        speed,
    }
    :
    {
        grid: GridType,
        startTile: TileType,
        endTile: TileType,
        row: number,
        col: number,
        height: number,
        width: number
        setIsDisabled: (isDisabled: boolean) => void,
        speed: SpeedType,
    }
) {
    const makeWallAt = row + getRand(0,height-1) * 2 + 1;
    const makePassageAt = col + getRand(0,width) * 2 ;
    for(let i = 0; i < 2*width-1; i++){
        if(makePassageAt !== col + i){
            if(!isEqual(startTile,grid[makeWallAt][col+i]) && !isEqual(grid[makeWallAt][col+i],endTile)){
                grid[makeWallAt][col+i].isWall = true;
                document.getElementById(`${makeWallAt}-${col+i}`)!.className = `${WALL_TILE_STYLE} animate-wall`;
                await sleep(10*SPEEDS.find((s) => s.value===speed)!.value - 5);
            }
        }
    }
    await recursiveDivision({
        grid,
        startTile,
        endTile,
        row,
        col,
        height: (makeWallAt - row + 1) / 2,
        width,
        setIsDisabled,
        speed,
    });
    await recursiveDivision({
        grid,
        startTile,
        endTile,
        row: makeWallAt+1,
        col,
        height: height - (makeWallAt - row + 1) / 2,
        width,
        setIsDisabled,
        speed,
    });
}