import React, { useState } from 'react';
import { PLANETS_DATA } from './data/planetsData';
import Navbar from './components/Navbar';
import CosmicStarfield from './components/CosmicStarfield';
import HeroSection from './components/HeroSection';
import PlanetSelector from './components/PlanetSelector';
import PlanetViewer3D from './components/PlanetViewer3D';
import PlanetDataPanel from './components/PlanetDataPanel';
import AtmosphereSurfaceSection from './components/AtmosphereSurfaceSection';
import ComparativeMatrix from './components/ComparativeMatrix';
import ScientificCuriosities from './components/ScientificCuriosities';
import SpaceEduMission from './components/SpaceEduMission';
import DispatchCTA from './components/DispatchCTA';
import Footer from './components/Footer';
import WeightCalculatorModal from './components/WeightCalculatorModal';

export default function App() {
  const [currentPlanetId, setCurrentPlanetId] = useState('earth');
  const [isWeightModalOpen, setIsWeightModalOpen] = useState(false);

  const currentPlanet = PLANETS_DATA[currentPlanetId] || PLANETS_DATA.earth;

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen text-slate-100 flex flex-col font-sans selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Procedural Canvas Starfield & Cosmic Dust */}
      <CosmicStarfield />

      {/* Top Navigation */}
      <Navbar onOpenWeightModal={() => setIsWeightModalOpen(true)} />

      <main className="flex-grow">
        {/* Cinematic Hero */}
        <HeroSection 
          onExploreClick={() => scrollToSection('explorer')}
          onCompareClick={() => scrollToSection('comparison')}
        />

        {/* Core Interactive Planet Explorer Module */}
        <section id="explorer" className="py-12 sm:py-20 scroll-mt-24">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <div className="text-center max-w-3xl mx-auto mb-8">
              <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-semibold">
                CORE EXPLORATION MODULE
              </span>
              <h2 className="font-display text-3xl sm:text-5xl text-white font-medium mt-1 mb-3">
                Interactive Planetary Sphere
              </h2>
              <p className="font-sans text-slate-300 text-sm sm:text-base leading-relaxed">
                Rotate, inspect elevation topographies, and examine the atmospheric layers of the terrestrial inner planets in full 3D.
              </p>
            </div>

            {/* Prominent Planet Selector HUD */}
            <PlanetSelector
              currentPlanetId={currentPlanetId}
              onSelectPlanet={(id) => setCurrentPlanetId(id)}
              planets={PLANETS_DATA}
            />

            {/* Real-time 3D Viewport with Cinematic Transition */}
            <div className="mt-8 transition-opacity duration-300">
              <PlanetViewer3D planet={currentPlanet} />
            </div>

          </div>
        </section>

        {/* Planet Data Panel with Kinematics Jump Lab */}
        <PlanetDataPanel planet={currentPlanet} />

        {/* Atmosphere & Geology Section */}
        <AtmosphereSurfaceSection planet={currentPlanet} />

        {/* Cross-Planetary Comparative Matrix */}
        <ComparativeMatrix onSelectPlanet={(id) => setCurrentPlanetId(id)} />

        {/* Scientific Curiosities */}
        <ScientificCuriosities planet={currentPlanet} />

        {/* About SpaceEdu Mission */}
        <SpaceEduMission />

        {/* Research Dossier Download & Dispatch CTA */}
        <DispatchCTA currentPlanet={currentPlanet} />
      </main>

      {/* Footer */}
      <Footer />

      {/* Weight on Other Worlds Interactive Modal */}
      <WeightCalculatorModal 
        isOpen={isWeightModalOpen} 
        onClose={() => setIsWeightModalOpen(false)} 
      />
    </div>
  );
}
