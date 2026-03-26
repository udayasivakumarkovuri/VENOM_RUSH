/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { SnakeGame } from './components/SnakeGame';
import { MusicPlayer } from './components/MusicPlayer';
import { InteractiveBackground } from './components/InteractiveBackground';

export default function App() {
  return (
    <div className="min-h-screen bg-black text-white font-terminal overflow-hidden relative flex flex-col items-center justify-center p-4">
      <InteractiveBackground />
      <div className="static-noise" />
      <div className="scanline" />
      
      {/* Glitch glow accents */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-yellow-400 rounded-none blur-[100px] opacity-30 pointer-events-none mix-blend-screen" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gray-300 rounded-none blur-[100px] opacity-30 pointer-events-none mix-blend-screen" />

      <div className="z-10 w-full max-w-5xl flex flex-col md:flex-row gap-12 items-center justify-center">
        
        {/* Left/Top side: Title and Music Player */}
        <div className="flex flex-col items-center md:items-start gap-8 w-full md:w-1/2">
          <div className="text-center md:text-left relative z-10">
            <h1 className="text-6xl md:text-8xl font-painted mb-2 leading-tight transition-all duration-500 hover:scale-105">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-yellow-600 drop-shadow-[0_0_15px_rgba(253,224,71,0.8)] hover:brightness-150 transition-all duration-300 cursor-default">VENOM</span>
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-300 to-gray-500 drop-shadow-[0_0_15px_rgba(209,213,219,0.8)] hover:brightness-150 transition-all duration-300 cursor-default">RUSH</span>
            </h1>
            <p className="text-yellow-400 font-terminal text-xl tracking-widest uppercase rgb-split mt-4 hover:text-white transition-colors duration-300 cursor-default">
              [ ERROR: GLITCH_ART_EDITION ]
            </p>
          </div>
          
          <div className="w-full border-2 border-gray-300 p-1 relative bg-black/50 backdrop-blur-sm hover:border-white transition-colors duration-300">
            <div className="absolute -top-3 -left-3 w-6 h-6 border-t-2 border-l-2 border-yellow-400" />
            <div className="absolute -bottom-3 -right-3 w-6 h-6 border-b-2 border-r-2 border-yellow-400" />
            <MusicPlayer />
          </div>
        </div>

        {/* Right/Bottom side: Snake Game */}
        <div className="w-full md:w-1/2 flex justify-center relative group">
          <div className="absolute -top-4 -left-4 w-8 h-8 border-t-4 border-l-4 border-gray-300 z-20 group-hover:border-white transition-colors duration-300" />
          <div className="absolute -bottom-4 -right-4 w-8 h-8 border-b-4 border-r-4 border-gray-300 z-20 group-hover:border-white transition-colors duration-300" />
          <SnakeGame />
        </div>

      </div>
    </div>
  );
}
