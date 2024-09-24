"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import Particles from "react-tsparticles";
import { Engine } from "tsparticles-engine";
import type { ISourceOptions } from "tsparticles-engine";
import { loadSlim } from "tsparticles-slim";

export default function Home() {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true);
  }, []);

  const particlesInit = async (engine: Engine) => {
    await loadSlim(engine);
  };

  const particlesConfig: ISourceOptions = {
    particles: {
      number: { value: 100, density: { enable: true, value_area: 800 } },
      color: { value: "#ffffff" },
      shape: { type: "circle", stroke: { width: 0, color: "#000000" } },
      opacity: { value: 0.5, random: false },
      size: { value: 3, random: true },
      links: { 
        enable: true, 
        distance: 150, 
        color: "#ffffff", 
        opacity: 0.4, 
        width: 1 
      },
      move: {
        enable: true,
        speed: 2,
        direction: "none",
        random: false,
        straight: false,
        outModes: "out",
        attract: { enable: false, rotateX: 600, rotateY: 1200 }
      }
    },
    interactivity: {
      detectsOn: "canvas",
      events: {
        onHover: { enable: true, mode: "repulse" },
        onClick: { enable: true, mode: "push" },
        resize: true
      },
      modes: {
        repulse: { distance: 100, duration: 0.4 },
        push: { quantity: 4 }
      }
    },
    retina_detect: true
  };

  return (
    <main className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4 relative overflow-hidden">
      <Particles id="tsparticles" init={particlesInit} options={particlesConfig} className="absolute inset-0" />
      
      <div className={`transition-all duration-1000 ${animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} z-10`}>
        <h1 className="text-5xl font-bold mb-8 text-center">
          Algorithm Visualizer
        </h1>
        <p className="text-xl mb-12 text-center max-w-2xl">
          Explore the fascinating world of algorithms through interactive visualizations
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-6 z-10">
        <Link href="/PathFinder">
          <button className="btn-primary group">
            <span className="btn-text">Path Finder</span>
            <div className="btn-animation"></div>
          </button>
        </Link>
        <Link href="/SortingVisualiser">
          <button className="btn-primary group">
            <span className="btn-text">Sorting Visualizer</span>
            <div className="btn-animation"></div>
          </button>
        </Link>
      </div>
    </main>
  );
}