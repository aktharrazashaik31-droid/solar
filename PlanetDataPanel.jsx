import React, { useState } from 'react';
import { 
  Globe, 
  Flame, 
  Thermometer, 
  Clock, 
  Compass, 
  Orbit, 
  Moon, 
  ArrowUpRight, 
  Weight, 
  Gauge,
  Sparkles,
  Zap
} from 'lucide-react';

export default function PlanetDataPanel({ planet }) {
  const [earthJumpHeight, setEarthJumpHeight] = useState(0.5); // meters on Earth

  // Gravities: Earth=9.81, Venus=8.87, Mars=3.72
  const gravityValue = planet.id === 'earth' ? 9.807 : planet.id === 'venus' ? 8.87 : 3.721;
  const jumpHeightOnPlanet = ((earthJumpHeight * 9.807) / gravityValue).toFixed(2);
  const airTimeSeconds = (2 * Math.sqrt((2 * jumpHeightOnPlanet) / gravityValue)).toFixed(2);

  const stats = [
    {
      label: 'Equatorial Diameter',
      value: planet.quickStats.diameter,
      sub: planet.id === 'earth' ? 'Standard reference' : planet.id === 'venus' ? '~95% of Earth' : '~53% of Earth',
      icon: Globe,
    },
    {
      label: 'Surface Gravity',
      value: planet.quickStats.gravity,
      sub: planet.id === 'earth' ? '1.00 g (Baseline)' : planet.id === 'venus' ? '0.90 g (Sub-Earth)' : '0.38 g (Low Gravity)',
      icon: Weight,
    },
    {
      label: 'Mean Temperature',
      value: planet.quickStats.meanTemperature,
      sub: `Range: ${planet.quickStats.tempRange}`,
      icon: Thermometer,
    },
    {
      label: 'Atmospheric Pressure',
      value: planet.quickStats.surfacePressure,
      sub: planet.atmosphere.pressureComparison,
      icon: Gauge,
    },
    {
      label: 'Solar Day Duration',
      value: planet.quickStats.dayLength,
      sub: planet.id === 'venus' ? 'Spins backward slowly' : planet.id === 'mars' ? '1 Sol (~24h 37m)' : 'Standard 24h cycle',
      icon: Clock,
    },
    {
      label: 'Orbital Period (Year)',
      value: planet.quickStats.yearLength,
      sub: `Speed: ${planet.quickStats.orbitalSpeed}`,
      icon: Orbit,
    },
    {
      label: 'Distance from Sun',
      value: planet.distanceFromSunAU,
      sub: planet.distanceFromSunKm,
      icon: Compass,
    },
    {
      label: 'Natural Satellites',
      value: planet.quickStats.moons,
      sub: planet.id === 'earth' ? 'Tidally locked Luna' : planet.id === 'venus' ? 'Zero captured moons' : 'Phobos & Deimos (captured)',
      icon: Moon,
    },
  ];

  return (
    <section id="data" className="py-12 sm:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header with Planet Title & Overview */}
        <div className="mb-10 text-left">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-mono tracking-widest text-cyan-400 uppercase font-semibold">
              TELEMETRY & PHYSICAL CONSTANTS
            </span>
            <span className="text-slate-600">/</span>
            <span className="text-xs font-mono text-slate-400">PDS-CALIBRATED</span>
          </div>

          <h2 className="font-display text-3xl sm:text-5xl text-white font-medium mb-3">
            {planet.name}: <span className="text-slate-400 font-light">{planet.tagline}</span>
          </h2>

          <p className="font-sans text-base sm:text-lg text-slate-300 max-w-3xl leading-relaxed">
            {planet.overview}
          </p>
        </div>

        {/* 8-Card Telemetry Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className="p-5 rounded-2xl bg-space-900/80 backdrop-blur-md border border-slate-800 hover:border-slate-700 transition-all duration-300 hover:shadow-xl group"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] font-mono tracking-wider uppercase text-slate-400 group-hover:text-slate-200 transition-colors">
                    {stat.label}
                  </span>
                  <div className="p-2 rounded-lg bg-space-800/80 text-cyan-400 group-hover:scale-110 transition-transform">
                    <Icon size={16} />
                  </div>
                </div>

                <div className="font-display text-xl sm:text-2xl text-white font-semibold mb-1">
                  {stat.value}
                </div>

                <div className="text-xs font-mono text-slate-400">
                  {stat.sub}
                </div>
              </div>
            );
          })}
        </div>

        {/* Interactive Gravity Jump Physics Simulator */}
        <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-space-900/90 via-space-850 to-space-950 border border-slate-800 shadow-xl">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="max-w-xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-800/40 text-[11px] font-mono text-cyan-300 mb-3">
                <Zap size={13} />
                <span>INTERACTIVE KINEMATICS LAB</span>
              </div>
              <h3 className="font-display text-xl sm:text-2xl text-white mb-2">
                Human Jump Dynamics on {planet.name}
              </h3>
              <p className="text-sm font-sans text-slate-300 leading-relaxed">
                Gravitational acceleration directly dictates vertical leap clearance and parabolic hang-time ($h = v^2 / 2g$). Slide to test your jump height on Earth and see how you would perform on {planet.name}.
              </p>

              {/* Slider Control */}
              <div className="mt-5 flex items-center gap-4">
                <label htmlFor="jump-slider" className="text-xs font-mono text-slate-400 whitespace-nowrap">
                  Earth Leap:
                </label>
                <input
                  id="jump-slider"
                  type="range"
                  min="0.2"
                  max="1.2"
                  step="0.05"
                  value={earthJumpHeight}
                  onChange={(e) => setEarthJumpHeight(parseFloat(e.target.value))}
                  className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                />
                <span className="font-mono text-xs text-cyan-300 font-semibold w-12 text-right">
                  {earthJumpHeight.toFixed(2)} m
                </span>
              </div>
            </div>

            {/* Calculated Output Display */}
            <div className="w-full lg:w-auto flex-shrink-0 grid grid-cols-2 gap-3 sm:gap-4 p-4 rounded-xl bg-space-950/80 border border-slate-800/80">
              <div className="p-3 text-center sm:text-left">
                <span className="text-[10px] font-mono tracking-widest text-slate-400 uppercase">
                  Apex Height on {planet.name}
                </span>
                <div 
                  className="font-display text-2xl sm:text-3xl font-bold mt-1"
                  style={{ color: planet.color }}
                >
                  {jumpHeightOnPlanet} m
                </div>
                <span className="text-[11px] font-mono text-slate-500">
                  {((jumpHeightOnPlanet / earthJumpHeight) * 100).toFixed(0)}% of Earth
                </span>
              </div>

              <div className="p-3 text-center sm:text-left border-l border-slate-800">
                <span className="text-[10px] font-mono tracking-widest text-slate-400 uppercase">
                  Flight Hang-Time
                </span>
                <div className="font-display text-2xl sm:text-3xl font-bold text-white mt-1">
                  {airTimeSeconds} s
                </div>
                <span className="text-[11px] font-mono text-cyan-400">
                  Parabolic arc
                </span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
