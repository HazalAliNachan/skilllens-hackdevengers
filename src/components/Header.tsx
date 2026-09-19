import React from 'react';
import { Compass, Sparkles, RefreshCw, Layers } from 'lucide-react';
import { ProfilePreset } from '../types';

interface HeaderProps {
  presets: ProfilePreset[];
  onSelectPreset: (preset: ProfilePreset) => void;
  activePresetId?: string;
  onReset: () => void;
  isAnalyzing: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  presets,
  onSelectPreset,
  activePresetId,
  onReset,
  isAnalyzing,
}) => {
  return (
    <header className="sticky top-0 z-30 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 text-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Brand */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={onReset}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-sky-500 flex items-center justify-center shadow-md shadow-indigo-500/20">
              <Compass className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-bold text-xl tracking-tight text-white">Skill<span className="text-sky-400">Lens</span></span>
                <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  Hackathon Edition
                </span>
              </div>
              <p className="text-xs text-slate-400 hidden md:block">
                Know your gap. Build your path.
              </p>
            </div>
          </div>

          {/* Quick Preset Selector for Hackathon Demo */}
          <div className="hidden lg:flex items-center space-x-2">
            <span className="text-xs text-slate-400 font-medium flex items-center mr-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-400 mr-1" />
              Quick Demos:
            </span>
            {presets.slice(0, 3).map((p) => {
              const isActive = activePresetId === p.id;
              return (
                <button
                  key={p.id}
                  onClick={() => onSelectPreset(p)}
                  disabled={isAnalyzing}
                  className={`text-xs px-2.5 py-1.5 rounded-lg font-medium transition-all duration-150 border ${
                    isActive
                      ? 'bg-sky-500 text-white border-sky-400 shadow-sm'
                      : 'bg-slate-800/80 text-slate-300 border-slate-700 hover:bg-slate-700 hover:text-white'
                  }`}
                >
                  {p.name}
                </button>
              );
            })}
          </div>

          {/* Right Action: Reset / New Analysis */}
          <div className="flex items-center space-x-3">
            <button
              onClick={onReset}
              className="inline-flex items-center space-x-1.5 text-xs font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 px-3 py-1.5 rounded-lg border border-slate-700 transition"
              title="Reset inputs and start fresh"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
            <a
              href="#analyzer-form"
              className="inline-flex items-center space-x-1 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 px-3 py-1.5 rounded-lg shadow-sm transition"
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Analyzer</span>
            </a>
          </div>

        </div>
      </div>
    </header>
  );
};
