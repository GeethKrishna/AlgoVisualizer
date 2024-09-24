"use client";
import { useContext } from "react"
import { SortingAlgorithmContext } from "../context/SortingVisualiser";

export const useSortingAlgorithm = () => {
    const context = useContext(SortingAlgorithmContext);
    
    if(!context){
        throw new Error("useSortingAlgorithm must be used within a SortingAlgorithmContextProvider");
    }

    return context;
}