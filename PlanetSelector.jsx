import React from 'react';
import { playTelemetryBeep } from '../utils/spaceAudio';

export default function PlanetSelector({ currentPlanetId, onSelectPlanet, planets }) {
  const planetList = Object.values(planets);

  const handleSelect = (planetId) => {
    if (planetId === currentPlanetId) return;
    playTelemetryBeep(planetId === 'earth' ? 920 : planetId === 'venus' ? 1040 : 780);
    onSelectPlanet(planetId);
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      const nextIndex = (index + 1) % planetList.length;
      handleSelect(planetList[nextIndex].id);
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      const prevIndex = (index - 1 + planetList.length) % planetList.length;
      handleSelect(planetList[prevIndex].id);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto my-8">
      {/* Orbital Path Line HUD */}
      <div className="relative flex items-center justify-between p-2 sm:p-3 rounded-2xl bg-space-900/90 backdrop-blur-xl border border-slate-800 shadow-2xl">
        <div className="absolute left-6 right-6 top-1/2 -translate-y-1/2 h-[1px] bg-gradient-to-r from-transparent via-slate-700/60 to-transparent pointer-events-none" />

        <div className="grid grid-cols-3 gap-2 sm:gap-4 w-full relative z-10" role="tablist" aria-label="Planetary Target Selector">
          {planetList.map((p, index) => {
            const isSelected = p.id === currentPlanetId;
            return (
              <button
                key={p.id}
                role="tab"
                id={`tab-${p.id}`}
                aria-selected={isSelected}
                aria-controls={`panel-${p.id}`}
                tabIndex={isSelected ? 0 : -1}
                onClick={() => handleSelect(p.id)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className={`group relative flex flex-col sm:flex-row items-center gap-2 sm:gap-4 p-2.5 sm:p-4 rounded-xl text-left transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 ${
                  isSelected
                    ? 'bg-space-800/90 border border-slate-600/80 shadow-[0_0_25px_rgba(0,0,0,0.6)] transform sm:-translate-y-0.5'
                    : 'hover:bg-space-850/60 border border-transparent hover:border-slate-800 opacity-70 hover:opacity-100'
                }`}
              >
                {/* Visual Planet Node / Ring */}
                <div className="relative flex-shrink-0 flex items-center justify-center">
                  <div 
                    className={`w-9 h-9 sm:w-12 sm:h-12 rounded-full transition-all duration-500 overflow-hidden relative shadow-lg ${
                      isSelected ? 'ring-2 ring-offset-2 ring-offset-space-950 scale-105' : 'group-hover:scale-105'
                    }`}
                    style={{ 
                      backgroundColor: p.color,
                      boxShadow: isSelected ? `0 0 20px ${p.glowColor}` : 'none'
                    }}
                  >
                    {/* Embedded preview image */}
                    <img 
                      src={p.poster} 
                      alt="" 
                      className="w-full h-full object-cover scale-110"
                    />
                  </div>

                  {/* Orbit node pulse indicator */}
                  {isSelected && (
                    <span 
                      className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full animate-ping pointer-events-none"
                      style={{ backgroundColor: p.color }}
                    />
                  )}
                </div>

                {/* Planet Info Text */}
                <div className="flex-1 text-center sm:text-left min-w-0">
                  <div className="flex items-center justify-center sm:justify-start gap-2">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400">
                      SOL {p.orderFromSun}
                    </span>
                    {isSelected && (
                      <span className="text-[9px] px-1.5 py-0.2 rounded bg-cyan-500/20 text-cyan-300 font-mono hidden md:inline-block">
                        TRACKED
                      </span>
                    )}
                  </div>
                  <h3 className={`font-display text-base sm:text-lg tracking-wide transition-colors truncate ${
                    isSelected ? 'text-white font-bold' : 'text-slate-300 group-hover:text-white'
                  }`}>
                    {p.name}
                  </h3>
                  <p className="text-[11px] font-mono text-slate-400 hidden sm:block truncate">
                    {p.distanceFromSunAU} • {p.quickStats.meanTemperature.split(' ')[0]}
                  </p>
                </div>

                {/* Active Indicator Underline / Border Bar */}
                {isSelected && (
                  <div 
                    className="absolute -bottom-1 left-4 right-4 h-0.5 rounded-full"
                    style={{ backgroundColor: p.color }}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
