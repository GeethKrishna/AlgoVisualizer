"use client";
import { useSortingAlgorithm } from "../hooks/useSortingAlgorithm";

export function Pillers() {
    const {arrayToSort} = useSortingAlgorithm();
    return (
        <div className="relative h-[calc(100vh-66px)] w-full">
            <div className="absolute bottom-[32px] w-full mx-auto left-0 right-0 flex justify-center items-end">
                {arrayToSort.map((value,index) => (
                    <div
                        key={index}
                        className="array-line relative w-1 mx-0.5 shadow-lg opacity-70 rounded-lg default-line-color"
                        style={{height: `${value}px`}}    
                    >
                    </div>
                ))}
            </div>
        </div>
    );
}