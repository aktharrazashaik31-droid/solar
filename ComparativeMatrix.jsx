import React, { useState } from 'react';
import { COMPARATIVE_METRICS } from '../data/planetsData';
import { Columns, ArrowLeftRight, Check, HelpCircle, Eye } from 'lucide-react';

export default function ComparativeMatrix({ onSelectPlanet }) {
  const [highlightMetric, setHighlightMetric] = useState(null);

  return (
    <section id="comparison" className="py-16 sm:py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-space-900 border border-slate-800 text-xs font-mono text-cyan-400 mb-3">
            <ArrowLeftRight size={13} />
            <span>CROSS-PLANETARY COMPARATIVE MATRIX</span>
          </div>
          <h2 className="font-display text-3xl sm:text-5xl text-white font-medium mb-4">
            Earth vs Venus vs Mars
          </h2>
          <p className="font-sans text-slate-300 text-base leading-relaxed">
            Side-by-side comparative astrophysics metrics. Observe how minor variations in solar distance and planetary mass generated radically divergent worlds.
          </p>
        </div>

        {/* Planet Visual Header Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {[
            { id: 'earth', name: 'Earth', color: '#38bdf8', tag: 'The Living Oasis', poster: '/textures/earth_poster.jpg' },
            { id: 'venus', name: 'Venus', color: '#eab308', tag: 'Runaway Greenhouse', poster: '/textures/venus_poster.jpg' },
            { id: 'mars', name: 'Mars', color: '#ea580c', tag: 'Ancient Desert Frontier', poster: '/textures/mars_poster.jpg' },
          ].map((item) => (
            <div 
              key={item.id}
              className="p-4 rounded-xl bg-space-900/80 border border-slate-800 flex items-center justify-between group hover:border-slate-700 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div 
                  className="w-10 h-10 rounded-full overflow-hidden border"
                  style={{ borderColor: item.color }}
                >
                  <img src={item.poster} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h3 className="font-display text-lg text-white font-semibold">
                    {item.name}
                  </h3>
                  <p className="text-[11px] font-mono text-slate-400">
                    {item.tag}
                  </p>
                </div>
              </div>

              <button
                onClick={() => {
                  onSelectPlanet(item.id);
                  const el = document.querySelector('#explorer');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-2.5 py-1 rounded bg-space-950 hover:bg-cyan-950/60 border border-slate-700 hover:border-cyan-500/50 text-[11px] font-mono text-slate-300 hover:text-cyan-300 transition-colors flex items-center gap-1"
              >
                <Eye size={12} />
                <span>View 3D</span>
              </button>
            </div>
          ))}
        </div>

        {/* Comparative Table */}
        <div className="rounded-2xl bg-space-900/90 backdrop-blur-md border border-slate-800 overflow-x-auto shadow-2xl">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-800 bg-space-950/60 text-xs font-mono tracking-wider text-slate-400 uppercase">
                <th className="py-4 px-6 font-semibold">Scientific Parameter</th>
                <th className="py-4 px-6 font-semibold text-sky-400">Earth (Sol 3)</th>
                <th className="py-4 px-6 font-semibold text-amber-400">Venus (Sol 2)</th>
                <th className="py-4 px-6 font-semibold text-orange-400">Mars (Sol 4)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-sm font-sans">
              {COMPARATIVE_METRICS.map((row, idx) => (
                <tr 
                  key={row.metric}
                  onMouseEnter={() => setHighlightMetric(row.metric)}
                  onMouseLeave={() => setHighlightMetric(null)}
                  className={`transition-colors ${
                    highlightMetric === row.metric ? 'bg-space-850' : 'hover:bg-space-850/40'
                  }`}
                >
                  <td className="py-4 px-6 font-mono text-xs text-slate-300 font-medium whitespace-nowrap">
                    {row.metric}
                  </td>
                  <td className="py-4 px-6 font-mono text-xs sm:text-sm text-slate-200 font-semibold whitespace-nowrap">
                    {row.earth}
                  </td>
                  <td className="py-4 px-6 font-mono text-xs sm:text-sm text-slate-200 font-semibold whitespace-nowrap">
                    {row.venus}
                  </td>
                  <td className="py-4 px-6 font-mono text-xs sm:text-sm text-slate-200 font-semibold whitespace-nowrap">
                    {row.mars}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Informative footnote */}
        <div className="mt-4 flex flex-wrap items-center justify-between text-xs font-mono text-slate-500 gap-2">
          <span>* All metrics normalized against IAU 2015 / NASA Planetary Fact Sheets</span>
          <span>Equatorial radii measured at 1-bar surface pressure level</span>
        </div>

      </div>
    </section>
  );
}
