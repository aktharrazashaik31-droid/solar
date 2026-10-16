import React, { useState } from 'react';
import { 
  Compass, 
  Volume2, 
  VolumeX, 
  Menu, 
  X, 
  Scale, 
  ExternalLink,
  Orbit
} from 'lucide-react';
import { toggleSpaceAudio } from '../utils/spaceAudio';

export default function Navbar({ onOpenWeightModal }) {
  const [isAudioActive, setIsAudioActive] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleAudioToggle = () => {
    const newState = !isAudioActive;
    toggleSpaceAudio(newState);
    setIsAudioActive(newState);
  };

  const navLinks = [
    { label: '3D Explorer', href: '#explorer' },
    { label: 'Telemetry', href: '#data' },
    { label: 'Atmosphere & Geology', href: '#atmosphere' },
    { label: 'Comparison', href: '#comparison' },
    { label: 'Curiosities', href: '#curiosities' },
    { label: 'Mission', href: '#mission' },
  ];

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-space-950/80 backdrop-blur-xl border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand / Logo */}
        <a 
          href="#hero" 
          className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded-lg p-1"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-600/30 border border-cyan-500/40 flex items-center justify-center text-cyan-400 group-hover:scale-105 transition-transform duration-300 shadow-[0_0_15px_rgba(0,240,255,0.15)]">
            <Orbit className="animate-spin-very-slow" size={22} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-display text-lg tracking-wider font-bold text-white">SPACEEDU</span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-cyan-950/80 border border-cyan-700/50 text-cyan-400 font-semibold uppercase">
                EXP-03
              </span>
            </div>
            <p className="text-[11px] font-mono text-slate-400 tracking-widest uppercase">
              Planetary Science Explorer
            </p>
          </div>
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2" aria-label="Main Navigation">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="px-3 py-1.5 text-xs font-mono tracking-wider text-slate-300 hover:text-cyan-400 hover:bg-space-900/60 rounded-lg transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right Action Utilities */}
        <div className="hidden sm:flex items-center gap-3">
          {/* Audio Drone Ambience Toggle */}
          <button
            onClick={handleAudioToggle}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-mono transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 ${
              isAudioActive
                ? 'bg-cyan-500/10 border-cyan-400/40 text-cyan-300 shadow-[0_0_12px_rgba(0,240,255,0.2)]'
                : 'bg-space-900/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
            }`}
            title="Toggle Procedural Deep Space Audio Drone"
            aria-label={isAudioActive ? 'Mute ambient audio' : 'Unmute ambient audio'}
          >
            {isAudioActive ? <Volume2 size={15} className="animate-pulse" /> : <VolumeX size={15} />}
            <span className="hidden md:inline">{isAudioActive ? 'AMBIENCE ON' : 'AUDIO OFF'}</span>
          </button>

          {/* Interactive Weight Calculator Trigger */}
          <button
            onClick={onOpenWeightModal}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-cyan-600/30 to-blue-600/30 hover:from-cyan-500/40 hover:to-blue-500/40 border border-cyan-500/40 text-xs font-mono font-medium text-cyan-200 transition-all duration-300 hover:shadow-[0_0_15px_rgba(0,240,255,0.25)] focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
          >
            <Scale size={14} className="text-cyan-400" />
            <span>GRAVITY CALCULATOR</span>
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex sm:hidden items-center gap-2">
          <button
            onClick={handleAudioToggle}
            className="p-2 rounded-lg bg-space-900 border border-slate-800 text-slate-300"
            aria-label="Toggle audio"
          >
            {isAudioActive ? <Volume2 size={16} className="text-cyan-400" /> : <VolumeX size={16} />}
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg bg-space-900 border border-slate-800 text-slate-300 hover:text-white"
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="sm:hidden border-b border-slate-800 bg-space-950/95 backdrop-blur-2xl px-4 py-5 animate-in slide-in-from-top duration-200">
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="px-3 py-2 text-sm font-mono text-slate-300 hover:text-cyan-400 hover:bg-space-900 rounded-lg transition-colors"
              >
                {link.label}
              </a>
            ))}

            <div className="pt-3 mt-2 border-t border-slate-800">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenWeightModal();
                }}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-cyan-600/30 border border-cyan-500/50 text-xs font-mono text-cyan-200"
              >
                <Scale size={15} />
                <span>OPEN GRAVITY CALCULATOR</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
