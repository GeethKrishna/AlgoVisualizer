"use client";
import { useSortingAlgorithm } from "../hooks/useSortingAlgorithm";
import { SORTING_ALGORITHMS } from "../utils/constants";
import { sortingAlgorithmsData } from "../utils/helpers";
import { runSortingAlgorithm } from "../utils/runSortingAlgorithm";
import { SortingAlgorithmType } from "../utils/types";
import { PlayButton } from "./PlayButton";
import { Select } from "./Select";
import { Slider } from "./Slider";

export function SortingNav() {

    const {isSorting,arrayToSort,speed,setSpeed,selectedAlgorithm,setSelectedAlgorithm,runAnimation,resetArrayAndAnimation,resetRequired} = useSortingAlgorithm();

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedAlgorithm(e.target.value as SortingAlgorithmType);
    }

    const handlePlay = () => {
        if(resetRequired){
            resetArrayAndAnimation();
            return;
        }

        runSortingAlgorithm(selectedAlgorithm,isSorting,arrayToSort,runAnimation);
    }

    return (
        <div className="h-[66px] relative flex items-center justify-between w-full">
            <h1 className="text-gray-300 text-2xl font-light hidden md:flex">Sorting Visualizer</h1>
            <div className="flex items-center justify-center gap-4">
                <Slider value={speed} handleChange={(e) => setSpeed(Number(e.target.value))} isDisabled={isSorting}/>
                <Select 
                    options={SORTING_ALGORITHMS} 
                    isDisabled={isSorting} 
                    label="Algorithm" 
                    value={selectedAlgorithm} 
                    onChange={handleSelectChange}
                />
                <PlayButton
                    isDisabled={false}
                    isGraphVisualized={resetRequired}
                    handlerVisualizer={handlePlay}
                />
            </div>
            <div className="hidden sm:flex absolute top-[120%] left-0 w-full">
                <div className="flex w-full text-gray-400 p-4 rounded border border-system-purple20 bg-system-purple80 bg-opacity-10 gap-6">
                    <div className="flex flex-col items-start justify-start w-3/4">
                        <h3 className="text-lg">
                            {sortingAlgorithmsData[selectedAlgorithm].title}
                        </h3>
                        <p className="text-sm text-gray-500">
                            {sortingAlgorithmsData[selectedAlgorithm].description}
                        </p>
                    </div>
                    <div className="flex flex-col items-start justify-start w-1/4 gap-2">
                        <h3 className="text-lg">
                            Time Complexity
                        </h3>
                        <div className="flex flex-col gap-2">
                            <p className="flex w-full text-sm text-gray-500">
                                <span className="w-28">Worst Case: </span>
                                <span>
                                    {sortingAlgorithmsData[selectedAlgorithm].worstCase}
                                </span>
                            </p>
                        </div>
                        <div className="flex flex-col gap-2">
                            <p className="flex w-full text-sm text-gray-500">
                                <span className="w-28">Average Case: </span>
                                <span>
                                    {sortingAlgorithmsData[selectedAlgorithm].averageCase}
                                </span>
                            </p>
                        </div>
                        <div className="flex flex-col gap-2">
                            <p className="flex w-full text-sm text-gray-500">
                                <span className="w-28">Best Case: </span>
                                <span>
                                    {sortingAlgorithmsData[selectedAlgorithm].bestCase}
                                </span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}