import { createContext, useEffect, useState } from "react";
import { AnimationArrayType, SortingAlgorithmType } from "../utils/types";
import { MIN_SORTING_SPEED } from "../utils/constants";
import { getRandFromInterval } from "../utils/helpers";

interface SortingAlgorithmContextType{
    arrayToSort: number[],
    setArrayToSort: (arrayToSort: number[]) => void,
    selectedAlgorithm: SortingAlgorithmType,
    setSelectedAlgorithm: (selectedAlgorithm: SortingAlgorithmType) => void,
    isSorting: boolean,
    setIsSorting: (isSorting: boolean) => void,
    speed: number,
    setSpeed: (speed: number) => void,
    isAnimationComplete: boolean,
    setIsAnimationComplete: (isAnimationComplete: boolean) => void,
    resetArrayAndAnimation: () => void,
    runAnimation: (animations: AnimationArrayType) => void,
    resetRequired: boolean,
}

export const SortingAlgorithmContext = createContext<SortingAlgorithmContextType | undefined>(undefined);

export const SortingAlgorithmContextProvider = ({children} : {children: React.ReactNode}) => {
    const [arrayToSort,setArrayToSort] = useState<number[]>([]);
    const [selectedAlgorithm,setSelectedAlgorithm] = useState<SortingAlgorithmType>("bubble");
    const [isSorting,setIsSorting] = useState<boolean>(false);
    const [speed,setSpeed] = useState<number>(MIN_SORTING_SPEED);
    const [isAnimationComplete, setIsAnimationComplete] = useState<boolean>(false);

    const resetRequired = isSorting || isAnimationComplete;

    useEffect(() => {
        resetArrayAndAnimation();
        window.addEventListener("resize", resetArrayAndAnimation);

        return () => {
            window.addEventListener("resize",resetArrayAndAnimation);
        }
    }, []);
    
    const resetArrayAndAnimation = () => {
        const contentContainer = document.getElementById('content-container');
        if(!contentContainer){
            return;
        }
        const contentContainerWidth = contentContainer.clientWidth;
        const tempArray:number[] = [];
        const numOfLines = contentContainerWidth/8;
        const containerHeight = window.innerHeight;
        const maxLineHeight = Math.max(containerHeight - 420, 100);
        for(let i=0; i<numOfLines; i++){
            tempArray.push(getRandFromInterval(35,maxLineHeight));
        }
        setArrayToSort(tempArray);
        setIsAnimationComplete(false);
        setIsSorting(false);

        const highestId = window.setTimeout(() => {
            for(let i=highestId;i>=0;i--){
                window.clearTimeout(i);
            }
        },0)

        setTimeout(() => {
            const arrayLines = document.getElementsByClassName("array-line") as HTMLCollectionOf<HTMLElement>;
            for(let i=0; i<arrayLines.length; i++){
                arrayLines[i].classList.remove("change-line-color");
                arrayLines[i].classList.add("default-line-color");
            }
        }, 0);
    }

    const runAnimation = (animations: AnimationArrayType) => {
        setIsSorting(true);
        const inverseSpeed = (1/speed) * 200;
        const arrayLines = document.getElementsByClassName("array-line") as HTMLCollectionOf<HTMLElement>;

        const updateClassList = (
            indexes: number[],
            addClassName: string,
            removeClassName: string,
        ) => {
            indexes.forEach((index) => {
                arrayLines[index].classList.add(addClassName);
                arrayLines[index].classList.remove(removeClassName);
            })
        }

        const updateHeightValue = (lineIndex: number, newHeight: number) => {
            if(newHeight===undefined){
                return;
            }
            arrayLines[lineIndex].style.height = `${newHeight}px`;
        }

        animations.forEach((animation,index) => {
            setTimeout(() => {
                const [values,isSwap] = animation;
                if(!isSwap){
                    updateClassList(values, 'change-line-color', 'default-line-color');
                    setTimeout(() => {
                        updateClassList(values, 'default-line-color', 'change-line-color');
                    }, inverseSpeed)
                }
                else{
                    const [lineIndex,newHeight] = values;
                    updateHeightValue(lineIndex,newHeight);
                }
            }, index*inverseSpeed)
        });

        const finalTimeOut = animations.length * inverseSpeed;
        setTimeout(() => {
            Array.from(arrayLines).forEach((line) => {
                line.classList.add("pulse-animation","change-line-color");
                line.classList.remove("default-line-color");
            });
            setTimeout(() => {
                Array.from(arrayLines).forEach((line) => {
                    line.classList.remove("pulse-animation","change-line-color");
                    line.classList.add("default-line-color");
                });
                setIsSorting(false);
                setIsAnimationComplete(true);
            }, 1000);
        },finalTimeOut);
    }

    const value = {
        arrayToSort,
        setArrayToSort,
        selectedAlgorithm,
        setSelectedAlgorithm,
        isSorting,
        setIsSorting,
        speed,
        setSpeed,
        isAnimationComplete,
        setIsAnimationComplete,
        resetArrayAndAnimation,
        runAnimation,
        resetRequired,
    }

    return <SortingAlgorithmContext.Provider value={value}>{children}</SortingAlgorithmContext.Provider>
}