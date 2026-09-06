"use client";

import React from 'react';
import { Map, MapPin, Lock } from 'lucide-react';

export default function SeoulMap({ onSelectScenario, currentLevel }) {
  return (
    <div className="relative w-full h-[600px] bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-800 p-6 flex flex-col items-center justify-center shadow-2xl">
      
      <div className="absolute top-6 left-6 text-2xl font-bold text-white z-10 flex items-center gap-2">
        <Map className="text-neon-pink" /> 
        Virtual Seoul
      </div>

      {/* Cyberpunk Style Map Mockup */}
      <div className="relative w-full max-w-2xl aspect-video bg-zinc-950 rounded-xl border border-neon-purple/30 shadow-[0_0_30px_rgba(176,38,255,0.15)] overflow-hidden">
        
        {/* Grid Background */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(176,38,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(176,38,255,0.1)_1px,transparent_1px)] bg-[size:20px_20px]"></div>

        {/* Location 1: Seongsu (Drama) - Always Unlocked */}
        <button 
          onClick={() => onSelectScenario('drama-1')}
          className="absolute top-1/3 left-1/4 group transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center"
        >
          <div className="w-4 h-4 bg-neon-purple rounded-full shadow-[0_0_15px_#b026ff] group-hover:scale-150 transition-all duration-300"></div>
          <span className="mt-2 px-2 py-1 bg-zinc-900/80 text-xs font-mono text-neon-purple border border-neon-purple/50 rounded backdrop-blur-sm">
            Seongsu Cafe (Lv.1)
          </span>
        </button>

        {/* Location 2: Gangnam (K-Pop) - Requires Level 2 */}
        <button 
          onClick={() => currentLevel >= 2 ? onSelectScenario('pop-1') : alert("Reach Level 2 to unlock!")}
          className={`absolute top-2/3 left-2/3 group transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center ${currentLevel < 2 ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          <div className={`w-4 h-4 rounded-full transition-all duration-300 ${currentLevel >= 2 ? 'bg-neon-pink shadow-[0_0_15px_#ff107a] group-hover:scale-150' : 'bg-zinc-600'}`}></div>
          <span className={`mt-2 px-2 py-1 bg-zinc-900/80 text-xs font-mono border rounded backdrop-blur-sm flex items-center gap-1 ${currentLevel >= 2 ? 'text-neon-pink border-neon-pink/50' : 'text-zinc-400 border-zinc-700'}`}>
            {currentLevel < 2 && <Lock size={10} />}
            Gangnam Agency (Lv.2)
          </span>
        </button>

      </div>

      <p className="mt-8 text-zinc-400 text-sm">
        {currentLevel < 2 ? "Complete the Seongsu Cafe scenario to earn EXP and unlock Gangnam!" : "Select a location on the map to start your mission."}
      </p>
    </div>
  );
}
