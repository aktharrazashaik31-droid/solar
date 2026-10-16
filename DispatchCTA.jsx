import React, { useState } from 'react';
import { Send, FileText, CheckCircle2, Download, AlertCircle, Sparkles } from 'lucide-react';
import { PLANETS_DATA } from '../data/planetsData';

export default function DispatchCTA({ currentPlanet }) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // 'idle' | 'success' | 'error'
  const [errorMessage, setErrorMessage] = useState('');
  const [isDownloaded, setIsDownloaded] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !email.includes('@') || !email.includes('.')) {
      setStatus('error');
      setErrorMessage('Please enter a valid academic or professional email address.');
      return;
    }

    setStatus('success');
    setErrorMessage('');
  };

  const handleDownloadDossier = () => {
    const planet = currentPlanet;
    const dossierText = `========================================================================
SPACEEDU PLANETARY RESEARCH DOSSIER
TARGET OBJECT: ${planet.name.toUpperCase()} (SOL ${planet.orderFromSun})
STATUS: CALIBRATED ASTRONOMICAL TELEMETRY
========================================================================

TAGLINE: ${planet.tagline}
ORBITAL DISTANCE: ${planet.distanceFromSunAU} (${planet.distanceFromSunKm})
EQUATORIAL DIAMETER: ${planet.quickStats.diameter}
PLANETARY MASS: ${planet.quickStats.mass}
SURFACE GRAVITY: ${planet.quickStats.gravity}
SURFACE PRESSURE: ${planet.quickStats.surfacePressure}
MEAN SURFACE TEMP: ${planet.quickStats.meanTemperature} (Range: ${planet.quickStats.tempRange})
SOLAR DAY DURATION: ${planet.quickStats.dayLength}
ORBITAL YEAR: ${planet.quickStats.yearLength}
NATURAL SATELLITES: ${planet.quickStats.moons}
AXIAL TILT: ${planet.quickStats.axialTilt}

ATMOSPHERIC SUMMARY:
${planet.atmosphere.summary}

ATMOSPHERIC COMPOSITION:
${planet.atmosphere.composition.map(c => `• ${c.gas}: ${c.percentage}%`).join('\n')}

EXTREME TOPOGRAPHIC LANDMARKS:
${planet.landmarks.map(l => `• ${l.name} (${l.type}): ${l.metric} - ${l.description}`).join('\n')}

HISTORIC ROBOTIC MISSIONS:
${planet.missions.map(m => `• [${m.year}] ${m.name} (${m.type}): ${m.note}`).join('\n')}

SCIENTIFIC CURIOSITIES:
${planet.curiosities.map(c => `• ${c.title}: ${c.body}`).join('\n')}

========================================================================
DATA SOURCE: NASA Planetary Data System (PDS) & ESA Planetary Science Archive
CURATED BY: SpaceEdu Planetary Explorer Platform
TIMESTAMP: ${new Date().toISOString()}
========================================================================`;

    const blob = new Blob([dossierText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `SpaceEdu_${planet.id.toUpperCase()}_Planetary_Dossier.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    setIsDownloaded(true);
    setTimeout(() => setIsDownloaded(false), 4000);
  };

  return (
    <section className="py-16 sm:py-24 border-t border-slate-900 bg-gradient-to-b from-space-950 to-space-900">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="p-8 sm:p-12 rounded-3xl bg-space-900/90 border border-slate-800 shadow-2xl relative overflow-hidden">
          {/* Subtle background glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-10">
            
            <div className="max-w-xl text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/70 border border-cyan-800/40 text-xs font-mono text-cyan-300 mb-4">
                <Sparkles size={13} />
                <span>EXPEDITION TELEMETRY DISPATCH</span>
              </div>
              <h2 className="font-display text-3xl sm:text-4xl text-white font-medium mb-3">
                Download Planetary Observation Dossier
              </h2>
              <p className="font-sans text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
                Generate an immediate calibrated research brief for <span className="text-cyan-300 font-semibold">{currentPlanet.name}</span>, or subscribe to receive our weekly planetary science dispatches directly from space agencies.
              </p>

              {/* Instant Download Action */}
              <button
                onClick={handleDownloadDossier}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-space-950 hover:bg-space-850 border border-cyan-500/40 text-cyan-200 text-xs font-mono tracking-wider uppercase font-semibold transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,240,255,0.2)] focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
              >
                {isDownloaded ? <CheckCircle2 size={16} className="text-emerald-400" /> : <Download size={16} />}
                <span>{isDownloaded ? 'Dossier Downloaded!' : `Download ${currentPlanet.name} Research Dossier (.txt)`}</span>
              </button>
            </div>

            {/* Newsletter Subscription Form */}
            <div className="w-full lg:w-80 flex-shrink-0 p-6 rounded-2xl bg-space-950/80 border border-slate-800">
              <span className="text-xs font-mono text-slate-300 font-medium block mb-3">
                SpaceEdu Monthly Dispatch
              </span>

              {status === 'success' ? (
                <div className="p-4 rounded-xl bg-emerald-950/60 border border-emerald-800/50 text-emerald-200 text-xs font-mono flex items-start gap-2.5">
                  <CheckCircle2 size={16} className="flex-shrink-0 text-emerald-400 mt-0.5" />
                  <div>
                    <span className="font-bold block">Transmission Verified!</span>
                    <span>You are subscribed to the SpaceEdu Planetary Science Dispatch.</span>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3">
                  <div>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="researcher@institute.edu"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-space-900 border border-slate-700 text-white text-xs font-mono focus:outline-none focus:border-cyan-400 placeholder:text-slate-500"
                      aria-label="Email address"
                    />
                  </div>

                  {status === 'error' && (
                    <div className="text-[11px] font-mono text-rose-400 flex items-center gap-1.5">
                      <AlertCircle size={13} />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    className="w-full py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-space-950 font-mono text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-2"
                  >
                    <Send size={13} />
                    <span>Subscribe to Dispatch</span>
                  </button>
                </form>
              )}

              <span className="text-[10px] font-mono text-slate-500 block text-center mt-3">
                Zero spam. Strict adherence to academic data privacy.
              </span>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
