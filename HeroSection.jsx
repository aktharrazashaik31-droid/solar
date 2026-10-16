import React from 'react';
import { Compass, ArrowDown, Activity, Sparkles, Radio } from 'lucide-react';

export default function HeroSection({ onExploreClick, onCompareClick }) {
  return (
    <section id="hero" className="relative pt-12 pb-20 sm:pt-20 sm:pb-32 overflow-hidden">
      {/* Background radial highlight */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-cyan-600/10 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        
        {/* Mission Status Badge */}
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-space-900/90 border border-slate-700/80 shadow-xl mb-8">
          <Radio size={14} className="text-cyan-400 animate-pulse" />
          <span className="text-[11px] font-mono tracking-widest text-slate-300 uppercase">
            SpaceEdu Deep Space Telemetry • Inner Solar System
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
        </div>

        {/* Cinematic Headline in Prata */}
        <h1 className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight text-white max-w-5xl mx-auto leading-[1.08] mb-6">
          Three Rocky Worlds. <br />
          <span className="bg-gradient-to-r from-sky-200 via-cyan-300 to-blue-400 bg-clip-text text-transparent">
            Three Divergent Destinies.
          </span>
        </h1>

        {/* Subtitle in Hanken Grotesk */}
        <p className="font-sans text-base sm:text-lg md:text-xl text-slate-300 max-w-2xl mx-auto font-light leading-relaxed mb-10">
          Formed from the same primordial accretion disk 4.6 billion years ago, Earth, Venus, and Mars embarked on wildly distinct evolutionary trajectories. Explore their atmospheres, geological extremes, and cosmic mysteries in real-time.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <button
            onClick={onExploreClick}
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-space-950 font-mono font-semibold text-sm tracking-wider uppercase transition-all duration-300 shadow-[0_0_25px_rgba(0,240,255,0.3)] hover:shadow-[0_0_35px_rgba(0,240,255,0.5)] transform hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
          >
            Launch 3D Explorer
          </button>

          <button
            onClick={onCompareClick}
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-space-900/90 hover:bg-space-850 border border-slate-700/80 hover:border-slate-500 text-slate-200 font-mono text-sm tracking-wider uppercase transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
          >
            Comparative Matrix
          </button>
        </div>

        {/* Scientific Quick Metric Highlights */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto">
          {[
            { label: 'EARTH', detail: '1.0 AU From Sun', note: 'Liquid Water Oasis' },
            { label: 'VENUS', detail: '464°C Mean Surface', note: 'Runaway Greenhouse' },
            { label: 'MARS', detail: '21.9 km Volcano', note: 'Thin Hyper-Arid Desert' },
            { label: 'DATA BASIS', detail: 'NASA PDS & ESA', note: 'Calibrated Telemetry' },
          ].map((item) => (
            <div 
              key={item.label}
              className="p-3.5 sm:p-4 rounded-xl bg-space-900/60 backdrop-blur-md border border-slate-800/80 text-left"
            >
              <div className="text-[10px] font-mono tracking-widest text-cyan-400 font-semibold mb-1">
                {item.label}
              </div>
              <div className="font-display text-sm sm:text-base text-white font-medium truncate">
                {item.detail}
              </div>
              <div className="text-[11px] font-mono text-slate-400 mt-0.5">
                {item.note}
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Subtle Bottom Transition Indicator */}
      <div className="mt-12 flex justify-center">
        <a 
          href="#explorer" 
          className="flex flex-col items-center gap-2 text-slate-500 hover:text-cyan-400 transition-colors"
          aria-label="Scroll down to interactive explorer"
        >
          <span className="text-[10px] font-mono tracking-widest uppercase">Scroll to Explore</span>
          <ArrowDown size={14} className="animate-bounce" />
        </a>
      </div>
    </section>
  );
}
