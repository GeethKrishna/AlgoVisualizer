"use client";
import { Pillers } from "../components/Pillers";
import { SortingNav } from "../components/SortingNav";
import { SortingAlgorithmContextProvider } from "../context/SortingVisualiser";

export default function Page() {
  return (
    <SortingAlgorithmContextProvider>
      <main className="absolute top-0 h-screen w-screen z-[-2] bg-[#000000] bg-[radial-gradient(#ffffff33_1px,#150229_1px)] bg-[size:40px_40px]">
        <div className="flex h-full justify-center">
          <div id="content-container" className="flex max-w-[1020px] w-full flex-col lg:px-0 px-4">
            <SortingNav/>
            <Pillers/>
          </div>
        </div>
      </main>
    </SortingAlgorithmContextProvider>
  );
}