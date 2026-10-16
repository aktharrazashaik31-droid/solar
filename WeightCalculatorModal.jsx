import React, { useState, useEffect } from 'react';
import { X, Scale, ArrowRight, Sparkles, Check, Info } from 'lucide-react';

export default function WeightCalculatorModal({ isOpen, onClose }) {
  const [weightInput, setWeightInput] = useState(70);
  const [unit, setUnit] = useState('kg'); // 'kg' or 'lbs'

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const earthVal = parseFloat(weightInput) || 0;
  // Gravities relative to Earth
  const venusVal = (earthVal * (8.87 / 9.807)).toFixed(1);
  const marsVal = (earthVal * (3.721 / 9.807)).toFixed(1);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-space-950/85 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-lg rounded-2xl bg-space-900 border border-slate-700/80 shadow-2xl p-6 sm:p-8 animate-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
        aria-labelledby="calc-title"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-lg text-slate-400 hover:text-white hover:bg-space-850 transition-colors"
          aria-label="Close dialog"
        >
          <X size={18} />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-xl bg-cyan-950/60 border border-cyan-800/40 text-cyan-400 flex items-center justify-center">
            <Scale size={20} />
          </div>
          <div>
            <h3 id="calc-title" className="font-display text-xl text-white font-medium">
              Weight Across Worlds
            </h3>
            <p className="text-xs font-mono text-slate-400">
              Gravitational mass vs force interaction
            </p>
          </div>
        </div>

        {/* Input Field */}
        <div className="mb-6">
          <label htmlFor="earth-weight" className="block text-xs font-mono text-slate-300 mb-2">
            Enter Your Earth Body Mass / Weight:
          </label>
          <div className="flex gap-2">
            <input
              id="earth-weight"
              type="number"
              min="1"
              max="500"
              value={weightInput}
              onChange={(e) => setWeightInput(e.target.value)}
              className="flex-1 px-4 py-2.5 rounded-xl bg-space-950 border border-slate-700 text-white font-mono text-lg focus:outline-none focus:border-cyan-400"
              placeholder="70"
            />
            <div className="flex rounded-xl bg-space-950 border border-slate-700 p-1">
              <button
                type="button"
                onClick={() => setUnit('kg')}
                className={`px-3 py-1 rounded-lg text-xs font-mono font-semibold transition-colors ${
                  unit === 'kg' ? 'bg-cyan-500 text-space-950' : 'text-slate-400 hover:text-white'
                }`}
              >
                kg
              </button>
              <button
                type="button"
                onClick={() => setUnit('lbs')}
                className={`px-3 py-1 rounded-lg text-xs font-mono font-semibold transition-colors ${
                  unit === 'lbs' ? 'bg-cyan-500 text-space-950' : 'text-slate-400 hover:text-white'
                }`}
              >
                lbs
              </button>
            </div>
          </div>
        </div>

        {/* Results Cards */}
        <div className="space-y-3 mb-6">
          <div className="p-4 rounded-xl bg-space-950/80 border border-sky-900/50 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="w-3 h-3 rounded-full bg-sky-400" />
              <div>
                <span className="font-display text-sm font-semibold text-white block">Earth (1.00g)</span>
                <span className="text-[11px] font-mono text-slate-400">9.81 m/s² baseline</span>
              </div>
            </div>
            <div className="font-mono text-xl font-bold text-sky-400">
              {earthVal} {unit}
            </div>
          </div>

          <div className="p-4 rounded-xl bg-space-950/80 border border-amber-900/50 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="w-3 h-3 rounded-full bg-amber-400" />
              <div>
                <span className="font-display text-sm font-semibold text-white block">Venus (0.90g)</span>
                <span className="text-[11px] font-mono text-slate-400">8.87 m/s² (feels ~10% lighter)</span>
              </div>
            </div>
            <div className="font-mono text-xl font-bold text-amber-400">
              {venusVal} {unit}
            </div>
          </div>

          <div className="p-4 rounded-xl bg-space-950/80 border border-orange-900/50 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="w-3 h-3 rounded-full bg-orange-400" />
              <div>
                <span className="font-display text-sm font-semibold text-white block">Mars (0.38g)</span>
                <span className="text-[11px] font-mono text-slate-400">3.72 m/s² (feels ~62% lighter!)</span>
              </div>
            </div>
            <div className="font-mono text-xl font-bold text-orange-400">
              {marsVal} {unit}
            </div>
          </div>
        </div>

        {/* Physics Note */}
        <div className="p-3 rounded-xl bg-space-950/60 border border-slate-800 text-[11px] font-mono text-slate-400 flex items-start gap-2">
          <Info size={14} className="text-cyan-400 flex-shrink-0 mt-0.5" />
          <span>
            Note: Your physical body mass ($m$) remains completely unchanged across the cosmos. It is the planetary gravitational acceleration vector ($g$) that scales the downward normal force ($F = mg$).
          </span>
        </div>

        {/* Bottom Dismiss */}
        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-space-850 hover:bg-space-800 border border-slate-700 text-xs font-mono text-slate-200 transition-colors"
          >
            Close Calculator
          </button>
        </div>
      </div>
    </div>
  );
}
