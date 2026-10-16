import React from 'react';
import { Orbit, ArrowUp, Globe, Shield, ExternalLink } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-slate-900 bg-space-950 py-12 text-slate-400 font-sans text-xs">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-10 border-b border-slate-900">
          
          {/* Brand & Mission Statement */}
          <div className="max-w-md">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 rounded-lg bg-cyan-950 border border-cyan-800 text-cyan-400 flex items-center justify-center">
                <Orbit size={16} />
              </div>
              <span className="font-display text-base font-bold text-white tracking-wider">SPACEEDU</span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-space-900 text-cyan-400 border border-slate-800">
                PLANETARY EXPLORER
              </span>
            </div>
            <p className="font-sans text-slate-400 leading-relaxed text-xs">
              An open-access astronomical inquiry tool designed for classrooms, science centers, and curious explorers across the globe. Built on peer-reviewed telemetry archives.
            </p>
          </div>

          {/* Quick Back to Top and Status */}
          <div className="flex flex-col items-start md:items-end gap-3">
            <div className="flex items-center gap-2 font-mono text-[11px] text-slate-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>ORBITAL TELEMETRY ENGINE ONLINE</span>
            </div>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-space-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 transition-colors font-mono text-xs"
              aria-label="Back to top"
            >
              <span>RETURN TO TOP</span>
              <ArrowUp size={14} />
            </button>
          </div>

        </div>

        {/* Data Source Disclosures and Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[11px] text-slate-500">
          <div>
            Data curated from NASA Jet Propulsion Laboratory, USGS Astrogeology Science Center, and ESA PSA.
          </div>
          <div>
            © {new Date().getFullYear()} SpaceEdu Observatory. MIT Open Educational License.
          </div>
        </div>

      </div>
    </footer>
  );
}
