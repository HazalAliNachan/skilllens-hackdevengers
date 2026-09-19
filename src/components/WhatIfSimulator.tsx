import React, { useState } from 'react';
import { 
  Sliders, 
  Sparkles, 
  ArrowUpRight, 
  RotateCcw, 
  Check, 
  AlertCircle, 
  TrendingUp, 
  ShieldAlert,
  Plus
} from 'lucide-react';
import { AnalysisResult } from '../types';
import { simulateCoverage } from '../services/skillMatchingEngine';

interface WhatIfSimulatorProps {
  result: AnalysisResult;
}

export const WhatIfSimulator: React.FC<WhatIfSimulatorProps> = ({ result }) => {
  // Skills eligible to be simulated as "learned": all developing and missing skills
  const eligibleSkills = [
    ...result.developingSkills.map(s => ({ name: s.name, type: 'developing' as const })),
    ...result.missingSkills.map(s => ({ name: s.name, type: 'missing' as const })),
  ];

  const [simulatedSkills, setSimulatedSkills] = useState<string[]>([]);

  const toggleSkill = (name: string) => {
    setSimulatedSkills((prev) =>
      prev.includes(name) ? prev.filter((s) => s !== name) : [...prev, name]
    );
  };

  const selectAll = () => {
    setSimulatedSkills(eligibleSkills.map(s => s.name));
  };

  const resetSimulation = () => {
    setSimulatedSkills([]);
  };

  const simulation = simulateCoverage(result, simulatedSkills);

  return (
    <section id="what-if-simulator" className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-6">
      
      {/* Section Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-sky-600 uppercase tracking-wider">
            Step 8 &bull; Interactive What-If Scenario
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            "What If?" Skill Simulator
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Test how acquiring missing competencies will elevate your technical qualification profile before committing time.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          {simulatedSkills.length > 0 && (
            <button
              onClick={resetSimulation}
              className="inline-flex items-center space-x-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-white border border-slate-200 px-3 py-1.5 rounded-xl shadow-xs transition"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Simulation</span>
            </button>
          )}
          <button
            onClick={selectAll}
            className="inline-flex items-center space-x-1.5 text-xs font-semibold text-indigo-600 hover:text-indigo-700 bg-indigo-50 border border-indigo-200 px-3 py-1.5 rounded-xl transition"
          >
            <span>Simulate All Gaps</span>
          </button>
        </div>
      </div>

      {/* Simulator Control Card */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xl shadow-slate-100 overflow-hidden">
        
        {/* Score Comparison Display Bar */}
        <div className="bg-slate-900 text-white p-6 sm:p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            
            {/* Current Real Match */}
            <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700 text-center">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-1">
                Current Real Match
              </span>
              <div className="text-3xl sm:text-4xl font-black text-slate-200">
                {result.matchPercentage}%
              </div>
              <span className="text-xs text-slate-400 mt-1 block">
                {result.matchedSkills.length} of {result.totalRequired} skills acquired
              </span>
            </div>

            {/* Simulated Projected Match */}
            <div className="p-4 rounded-xl bg-gradient-to-br from-indigo-950 to-sky-950 border border-sky-500/40 text-center relative overflow-hidden">
              <span className="text-xs font-semibold uppercase tracking-wider text-sky-400 block mb-1">
                Simulated Projected Match
              </span>
              <div className="text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-emerald-300">
                {simulation.simulatedPercentage}%
              </div>
              <span className="text-xs text-sky-200 mt-1 block">
                +{simulatedSkills.length} simulated skills added
              </span>
            </div>

            {/* Delta Lift Metric */}
            <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700 text-center">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-1">
                Net Coverage Gain
              </span>
              <div className="flex items-center justify-center space-x-1 text-3xl sm:text-4xl font-black text-emerald-400">
                <TrendingUp className="w-7 h-7" />
                <span>+{simulation.deltaPercentage}%</span>
              </div>
              <span className="text-xs text-slate-400 mt-1 block">
                Relative competency expansion
              </span>
            </div>

          </div>

          {/* Prompt Mandate: CLEAR ETHICAL DISCLAIMER */}
          <div className="mt-6 p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/25 flex items-start space-x-2.5 text-xs text-amber-200/90">
            <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <strong className="font-semibold text-amber-300">Transparency Notice: </strong>
              This feature is an educational skill-coverage simulation based on posted job requirements. It is designed to assist your study roadmap and is <em>not</em> a prediction or guarantee of employment, interview callbacks, or hiring probability.
            </div>
          </div>
        </div>

        {/* Skill Toggle Checklist */}
        <div className="p-6 sm:p-8 space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-bold text-slate-900">
              Select Missing or Developing Skills to Simulate Learning:
            </h4>
            <span className="text-xs text-slate-500">
              {simulatedSkills.length} of {eligibleSkills.length} selected
            </span>
          </div>

          {eligibleSkills.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {eligibleSkills.map(({ name, type }) => {
                const isSelected = simulatedSkills.includes(name);
                const isDev = type === 'developing';

                return (
                  <button
                    key={name}
                    type="button"
                    onClick={() => toggleSkill(name)}
                    className={`flex items-center justify-between p-3 rounded-xl border text-left transition duration-150 cursor-pointer ${
                      isSelected
                        ? 'bg-sky-50 border-sky-400 ring-2 ring-sky-400/20 shadow-xs'
                        : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center space-x-2.5">
                      <div
                        className={`w-5 h-5 rounded-md flex items-center justify-center text-xs transition ${
                          isSelected
                            ? 'bg-sky-500 text-white'
                            : 'border border-slate-300 bg-slate-50 text-transparent'
                        }`}
                      >
                        <Check className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <span className="text-xs sm:text-sm font-bold text-slate-900 block">
                          {name}
                        </span>
                        <span className="text-[10px] text-slate-500 capitalize">
                          Currently: {type}
                        </span>
                      </div>
                    </div>

                    <span
                      className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                        isDev ? 'bg-amber-100 text-amber-800' : 'bg-rose-100 text-rose-800'
                      }`}
                    >
                      {isDev ? '+50% boost' : '+100% boost'}
                    </span>
                  </button>
                );
              })}
            </div>
          ) : (
            <p className="text-xs text-slate-500 italic">
              All required competencies for this position are already matched in your profile!
            </p>
          )}

          {/* Action Callout if skills simulated */}
          {simulatedSkills.length > 0 && (
            <div className="mt-4 p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="space-y-0.5">
                <span className="font-bold text-slate-900">
                  Ready to put this simulation into action?
                </span>
                <p className="text-slate-600">
                  Follow Phase 3 and Phase 4 of your personalized roadmap to build these exact {simulatedSkills.length} competencies.
                </p>
              </div>

              <a
                href="#personalized-roadmap"
                className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-500 transition"
              >
                <span>Jump to Learning Roadmap</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          )}

        </div>

      </div>

    </section>
  );
};
