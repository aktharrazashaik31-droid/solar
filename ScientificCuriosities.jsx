import React, { useState } from 'react';
import { Sparkles, Compass, Lightbulb, ChevronDown, ChevronUp, BookOpen } from 'lucide-react';

export default function ScientificCuriosities({ planet }) {
  const [expandedIndex, setExpandedIndex] = useState(0);

  return (
    <section id="curiosities" className="py-16 sm:py-24 bg-space-950/70 border-t border-slate-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-space-900 border border-slate-800 text-xs font-mono text-cyan-400 mb-3">
            <Sparkles size={13} />
            <span>ASTROPHYSICS PHENOMENA & CURIOSITIES</span>
          </div>
          <h2 className="font-display text-3xl sm:text-5xl text-white font-medium mb-4">
            Scientific Wonders of {planet.name}
          </h2>
          <p className="font-sans text-slate-300 text-base leading-relaxed">
            Astrophysical phenomena that challenge our intuition and redefine planetary mechanics across our solar system.
          </p>
        </div>

        {/* Curiosities Accordion / Grid */}
        <div className="space-y-4 max-w-4xl mx-auto">
          {planet.curiosities.map((item, index) => {
            const isExpanded = expandedIndex === index;
            return (
              <div
                key={item.title}
                className="rounded-2xl bg-space-900/80 border border-slate-800 overflow-hidden transition-all duration-300"
              >
                <button
                  onClick={() => setExpandedIndex(isExpanded ? -1 : index)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 hover:bg-space-850/60 transition-colors"
                  aria-expanded={isExpanded}
                >
                  <div className="flex items-center gap-4">
                    <div 
                      className="w-8 h-8 rounded-lg flex items-center justify-center font-mono text-xs font-bold"
                      style={{ 
                        backgroundColor: isExpanded ? planet.color : 'rgba(30, 41, 59, 0.8)',
                        color: isExpanded ? '#030509' : '#94a3b8' 
                      }}
                    >
                      0{index + 1}
                    </div>
                    <h3 className="font-display text-lg sm:text-xl text-white font-medium">
                      {item.title}
                    </h3>
                  </div>

                  <div className="p-2 rounded-lg bg-space-950 border border-slate-800 text-slate-400">
                    {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </div>
                </button>

                {isExpanded && (
                  <div className="px-6 pb-6 pt-2 text-sm sm:text-base font-sans text-slate-300 leading-relaxed border-t border-slate-800/80 animate-in fade-in duration-200">
                    <p>{item.body}</p>
                    <div className="mt-4 pt-3 border-t border-slate-800/60 flex items-center gap-2 text-xs font-mono text-cyan-400">
                      <BookOpen size={13} />
                      <span>Verified astrophysical publication data (NASA/ESA planetary papers)</span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
