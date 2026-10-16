import React, { useState } from 'react';
import { Wind, Mountain, Rocket, Layers, ChevronRight, CheckCircle2 } from 'lucide-react';

export default function AtmosphereSurfaceSection({ planet }) {
  const [activeTab, setActiveTab] = useState('atmosphere'); // 'atmosphere' | 'geology' | 'missions'

  return (
    <section id="atmosphere" className="py-16 sm:py-24 bg-space-950/60 border-t border-b border-slate-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-space-900 border border-slate-800 text-xs font-mono text-cyan-400 mb-3">
            <Layers size={13} />
            <span>GEOCHEMICAL & EXPLORATION ARCHIVE</span>
          </div>
          <h2 className="font-display text-3xl sm:text-5xl text-white font-medium mb-4">
            Atmospheric Envelope & Surface Terrain
          </h2>
          <p className="font-sans text-slate-300 text-base leading-relaxed">
            The thin interface between solid rock and outer space defines a planet's climate, erosion patterns, and ability to shield surface matter from lethal cosmic rays.
          </p>

          {/* Sub-nav switcher */}
          <div className="flex items-center justify-center gap-2 mt-8 p-1.5 rounded-xl bg-space-900/90 border border-slate-800 max-w-md mx-auto">
            {[
              { id: 'atmosphere', label: 'Atmosphere Composition', icon: Wind },
              { id: 'geology', label: 'Extreme Geology', icon: Mountain },
              { id: 'missions', label: 'Historic Missions', icon: Rocket },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs font-mono transition-all duration-200 ${
                    isActive 
                      ? 'bg-cyan-500/20 text-cyan-300 font-semibold border border-cyan-500/40 shadow-sm'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-space-850'
                  }`}
                >
                  <Icon size={14} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab 1: Atmosphere */}
        {activeTab === 'atmosphere' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-5 p-6 rounded-2xl bg-space-900/70 border border-slate-800">
              <span className="text-xs font-mono tracking-widest text-cyan-400 uppercase">
                Atmosphere Profile • {planet.name}
              </span>
              <h3 className="font-display text-2xl text-white mt-1 mb-4">
                Chemical Constituents
              </h3>
              <p className="font-sans text-sm text-slate-300 leading-relaxed mb-6">
                {planet.atmosphere.summary}
              </p>

              <div className="p-4 rounded-xl bg-space-950/90 border border-slate-800">
                <span className="text-[11px] font-mono text-slate-400 block mb-1">
                  BAROMETRIC COMPARISON:
                </span>
                <span className="text-sm font-semibold text-white">
                  {planet.atmosphere.pressureComparison}
                </span>
              </div>
            </div>

            <div className="lg:col-span-7 p-6 rounded-2xl bg-space-900/70 border border-slate-800">
              <span className="text-xs font-mono tracking-widest text-slate-400 uppercase block mb-4">
                Volumetric Concentration Ratios
              </span>

              <div className="space-y-4">
                {planet.atmosphere.composition.map((item) => (
                  <div key={item.gas} className="space-y-1.5">
                    <div className="flex justify-between text-xs font-mono">
                      <span className="text-slate-200">{item.gas}</span>
                      <span className="text-cyan-300 font-bold">{item.percentage}%</span>
                    </div>

                    <div className="w-full h-3 bg-space-950 rounded-full overflow-hidden p-0.5 border border-slate-800">
                      <div 
                        className="h-full rounded-full transition-all duration-700"
                        style={{ 
                          width: `${Math.max(item.percentage, 2)}%`,
                          backgroundColor: item.color 
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-5 border-t border-slate-800 text-[11px] font-mono text-slate-400 flex items-center justify-between">
                <span>Total Gaseous Column: 100% Volumetric</span>
                <span className="text-cyan-400">PDS / ESA Vetted</span>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Geological Landmarks */}
        {activeTab === 'geology' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {planet.landmarks.map((lmark) => (
              <div 
                key={lmark.name}
                className="p-6 rounded-2xl bg-space-900/80 border border-slate-800 hover:border-slate-700 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="text-[10px] font-mono uppercase tracking-widest text-cyan-400 mb-2">
                    {lmark.type}
                  </div>
                  <h3 className="font-display text-xl text-white font-semibold mb-2 group-hover:text-cyan-200 transition-colors">
                    {lmark.name}
                  </h3>
                  <div className="inline-block px-2.5 py-1 rounded bg-space-950 border border-slate-800 font-mono text-xs text-amber-300 mb-4">
                    {lmark.metric}
                  </div>
                  <p className="font-sans text-sm text-slate-300 leading-relaxed">
                    {lmark.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono text-slate-400">
                  <span>TOPOGRAPHIC DATUM</span>
                  <ChevronRight size={14} className="text-slate-500 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 3: Missions Timeline */}
        {activeTab === 'missions' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {planet.missions.map((mission) => (
              <div 
                key={mission.name}
                className="p-6 rounded-2xl bg-space-900/80 border border-slate-800 relative overflow-hidden"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="font-display text-2xl font-bold text-cyan-400">
                    {mission.year}
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-space-950 border border-slate-700 text-slate-300">
                    {mission.type}
                  </span>
                </div>

                <h3 className="font-display text-xl text-white font-medium mb-3">
                  {mission.name}
                </h3>

                <p className="font-sans text-sm text-slate-300 leading-relaxed">
                  {mission.note}
                </p>

                <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center gap-2 text-xs font-mono text-emerald-400">
                  <CheckCircle2 size={13} />
                  <span>Mission Telemetry Archived</span>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}
