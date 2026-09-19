import React from 'react';
import { Target, ArrowRight, BookOpen, CheckCircle2, Sliders, Rocket, Sparkles } from 'lucide-react';
import { ProfilePreset } from '../types';

interface HeroLandingProps {
  presets: ProfilePreset[];
  onSelectPreset: (preset: ProfilePreset) => void;
  onScrollToForm: () => void;
}

export const HeroLanding: React.FC<HeroLandingProps> = ({
  presets,
  onSelectPreset,
  onScrollToForm,
}) => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 text-white pt-12 pb-16 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
      {/* Subtle geometric pattern background */}
      <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:24px_24px]" />
      
      <div className="relative max-w-5xl mx-auto text-center space-y-6">
        
        {/* Hackathon Badge */}
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-300 text-xs font-semibold tracking-wide uppercase">
          <Sparkles className="w-3.5 h-3.5 text-sky-400" />
          <span>AI Career Skill-Gap Engine for Students &amp; Internship Seekers</span>
        </div>

        {/* Primary Headline */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
          Know your gap. <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-indigo-300 to-teal-300">
            Build your path.
          </span>
        </h1>

        {/* Value Proposition */}
        <p className="max-w-2xl mx-auto text-base sm:text-lg text-slate-300 font-normal leading-relaxed">
          Stop guessing which skills recruiters look for. Enter your current coursework and projects, choose your dream internship, and get an instant transparent gap analysis, structured learning roadmap, and your next portfolio-defining project.
        </p>

        {/* Primary CTA Buttons */}
        <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={onScrollToForm}
            className="inline-flex items-center space-x-2 px-6 py-3 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white font-semibold text-sm shadow-lg shadow-sky-500/25 transition duration-150"
          >
            <span>Start My Skill Analysis</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          <a
            href="#how-it-works"
            className="inline-flex items-center space-x-2 px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium text-sm border border-slate-700 transition duration-150"
          >
            <span>Explore The 8 Core Steps</span>
          </a>
        </div>

        {/* 4 Feature Pillars */}
        <div className="pt-10 grid grid-cols-2 md:grid-cols-4 gap-4 text-left">
          <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/60 backdrop-blur-sm">
            <div className="w-8 h-8 rounded-lg bg-sky-500/20 text-sky-400 flex items-center justify-center mb-3">
              <Target className="w-4 h-4" />
            </div>
            <h4 className="text-sm font-semibold text-white">Transparent Coverage</h4>
            <p className="text-xs text-slate-400 mt-1">
              Deterministic scoring formula across Matched, Developing, and Missing skills.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/60 backdrop-blur-sm">
            <div className="w-8 h-8 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center mb-3">
              <BookOpen className="w-4 h-4" />
            </div>
            <h4 className="text-sm font-semibold text-white">Curated Roadmap</h4>
            <p className="text-xs text-slate-400 mt-1">
              Phased learning progression with free resources, milestones, and timeframes.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/60 backdrop-blur-sm">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-3">
              <Rocket className="w-4 h-4" />
            </div>
            <h4 className="text-sm font-semibold text-white">Targeted Project</h4>
            <p className="text-xs text-slate-400 mt-1">
              Hands-on project specifically chosen to bridge your largest missing competency.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/60 backdrop-blur-sm">
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center mb-3">
              <Sliders className="w-4 h-4" />
            </div>
            <h4 className="text-sm font-semibold text-white">What-If Simulator</h4>
            <p className="text-xs text-slate-400 mt-1">
              Select future skills and witness your simulated coverage climb in real time.
            </p>
          </div>
        </div>

        {/* Quick Demo Profiles Strip for Evaluators */}
        <div className="pt-6 border-t border-slate-800/80">
          <p className="text-xs uppercase tracking-wider text-slate-400 font-semibold mb-3">
            One-Click Demonstration Profiles for Judges:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {presets.map((preset) => (
              <button
                key={preset.id}
                onClick={() => {
                  onSelectPreset(preset);
                  onScrollToForm();
                }}
                className="text-left p-3.5 rounded-xl bg-slate-800/70 hover:bg-slate-750 border border-slate-700 hover:border-sky-500/50 transition duration-150 group"
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-semibold text-sky-400 group-hover:text-sky-300">
                    {preset.name}
                  </span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-700 text-slate-300">
                    {preset.userSkills.length} skills
                  </span>
                </div>
                <p className="text-xs text-slate-300 font-medium">Target: {preset.targetRole}</p>
                <p className="text-[11px] text-slate-400 mt-1 line-clamp-2">{preset.description}</p>
              </button>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
