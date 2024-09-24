"use client";
import { useRef } from "react";
import { PathFindingProvider } from "../context/PathFindingContext";
import { TileContextProvider } from "../context/TileContext";
import { SpeedContextProvider } from "../context/SpeedContext";
import { Nav } from "../components/Nav";
import { Grid } from "../components/Grid";

export default function Page() {
  const isVisualisationRunningRef = useRef(false);
  return (
    <PathFindingProvider>
      <TileContextProvider>
        <SpeedContextProvider>
          <div className="h-screen w-screen flex flex-col overflow-x-hidden">
              <Nav isVisualisationRunningRef={isVisualisationRunningRef}/>
              <Grid isVisualisationRunningRef={isVisualisationRunningRef}/>
          </div>
        </SpeedContextProvider>
      </TileContextProvider>
    </PathFindingProvider>
  );
}
