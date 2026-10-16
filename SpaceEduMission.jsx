import React from 'react';
import { EDUCATIONAL_MODULES } from '../data/planetsData';
import { GraduationCap, Database, Code, Globe2, BookOpenCheck, ArrowUpRight } from 'lucide-react';

export default function SpaceEduMission() {
  return (
    <section id="mission" className="py-16 sm:py-24 border-t border-slate-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-space-900 border border-slate-800 text-xs font-mono text-cyan-400 mb-3">
            <GraduationCap size={13} />
            <span>ACADEMIC FOUNDATION & MISSION</span>
          </div>
          <h2 className="font-display text-3xl sm:text-5xl text-white font-medium mb-4">
            Democratizing Planetary Science
          </h2>
          <p className="font-sans text-slate-300 text-base sm:text-lg leading-relaxed">
            SpaceEdu bridges high-precision telemetry from robotic space probes with intuitive, interactive pedagogical simulations. We transform raw mission datasets into accessible experiential discovery for students, educators, and planetary science enthusiasts worldwide.
          </p>
        </div>

        {/* 3 Core Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {[
            {
              icon: Database,
              title: 'Calibrated Open Datasets',
              description: 'Direct ingestion of peer-reviewed telemetry archives from the NASA Planetary Data System (PDS) and ESA Planetary Science Archive (PSA).'
            },
            {
              icon: Code,
              title: 'Physics-Accurate Kinematics',
              description: 'Zero fabricated approximations. Gravitational equations, atmospheric densities, and thermodynamic curves reflect verified celestial mechanics.'
            },
            {
              icon: Globe2,
              title: 'Universal Public Access',
              description: 'Designed from first principles to run smoothly on desktop, tablet, and mobile browsers worldwide without proprietary plugins.'
            }
          ].map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div 
                key={pillar.title}
                className="p-6 rounded-2xl bg-space-900/80 border border-slate-800 hover:border-slate-700 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-cyan-950/60 border border-cyan-800/40 text-cyan-400 flex items-center justify-center mb-5">
                  <Icon size={22} />
                </div>
                <h3 className="font-display text-xl text-white font-semibold mb-2">
                  {pillar.title}
                </h3>
                <p className="font-sans text-sm text-slate-300 leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Educational Curriculum Modules */}
        <div className="p-8 rounded-2xl bg-space-900/90 border border-slate-800">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <span className="text-xs font-mono text-cyan-400 tracking-wider uppercase block">
                Open Curriculum Track
              </span>
              <h3 className="font-display text-2xl text-white font-medium">
                Core Comparative Planetary Modules
              </h3>
            </div>
            <span className="text-xs font-mono px-3 py-1 rounded bg-space-950 border border-slate-700 text-slate-400 w-fit">
              GRADES 9–16+ / ASTROPHYSICS
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {EDUCATIONAL_MODULES.map((mod) => (
              <div 
                key={mod.code}
                className="p-5 rounded-xl bg-space-950/80 border border-slate-800/80 hover:border-cyan-500/40 transition-colors"
              >
                <span className="font-mono text-xs font-bold text-cyan-400 block mb-1">
                  {mod.code}
                </span>
                <h4 className="font-display text-lg text-white font-semibold mb-2">
                  {mod.title}
                </h4>
                <p className="font-sans text-xs text-slate-400 leading-relaxed">
                  {mod.description}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
