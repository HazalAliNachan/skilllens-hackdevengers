import React, { useState } from 'react';
import { 
  GitCommit, 
  CheckCircle2, 
  Clock, 
  Circle, 
  ExternalLink, 
  ChevronRight, 
  BookOpen, 
  Calendar,
  Layers,
  Sparkles
} from 'lucide-react';
import { RoadmapStep } from '../types';

interface PersonalizedRoadmapProps {
  roadmap: RoadmapStep[];
  roleTitle: string;
}

export const PersonalizedRoadmap: React.FC<PersonalizedRoadmapProps> = ({ roadmap, roleTitle }) => {
  const [activeStep, setActiveStep] = useState<number>(
    // Default to the first in-progress or upcoming step
    roadmap.find(s => s.status !== 'completed')?.stepNumber || 1
  );

  return (
    <section id="personalized-roadmap" className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-6">
      
      {/* Section Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-sky-600 uppercase tracking-wider">
            Step 6 &bull; Personalized Learning Roadmap
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Logical Learning Sequence for <span className="text-indigo-600">{roleTitle}</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Structured step-by-step pathway prioritizing your immediate missing competencies while building on existing strengths.
          </p>
        </div>

        {/* Milestone summary badge */}
        <div className="flex items-center space-x-2 text-xs text-slate-500 bg-white border border-slate-200 px-3 py-1.5 rounded-xl shadow-xs">
          <Calendar className="w-3.5 h-3.5 text-indigo-600" />
          <span>{roadmap.length} Sequential Milestones</span>
        </div>
      </div>

      {/* Visual Sequence Flow (as requested in prompt example: Python -> NumPy/Pandas -> Stats -> Scikit-learn...) */}
      <div className="bg-slate-900 p-4 sm:p-5 rounded-2xl border border-slate-800 text-white overflow-x-auto">
        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-3">
          Chronological Learning Pipeline:
        </span>
        <div className="flex items-center min-w-max space-x-2">
          {roadmap.map((step, idx) => {
            const isCompleted = step.status === 'completed';
            const isCurrent = step.stepNumber === activeStep;

            return (
              <React.Fragment key={step.stepNumber}>
                <button
                  onClick={() => setActiveStep(step.stepNumber)}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-xl text-xs font-semibold transition border ${
                    isCurrent
                      ? 'bg-sky-500 text-white border-sky-400 shadow-md shadow-sky-500/20'
                      : isCompleted
                      ? 'bg-emerald-950/60 text-emerald-300 border-emerald-500/40 hover:bg-emerald-900/60'
                      : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
                  }`}
                >
                  {isCompleted ? (
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  ) : (
                    <span className="w-4 h-4 rounded-full bg-slate-700 text-slate-300 flex items-center justify-center text-[10px]">
                      {step.stepNumber}
                    </span>
                  )}
                  <span>{step.title.split('&')[0]}</span>
                </button>
                
                {idx < roadmap.length - 1 && (
                  <ChevronRight className="w-4 h-4 text-slate-600 shrink-0" />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* Detailed Step Cards / Interactive Timeline */}
      <div className="space-y-4">
        {roadmap.map((step) => {
          const isCompleted = step.status === 'completed';
          const isSelected = step.stepNumber === activeStep;

          return (
            <div
              key={step.stepNumber}
              className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                isSelected
                  ? 'border-indigo-500 bg-white shadow-lg ring-1 ring-indigo-500/20'
                  : 'border-slate-200 bg-white/80 hover:border-slate-300 shadow-xs'
              }`}
            >
              {/* Step Header */}
              <div
                onClick={() => setActiveStep(isSelected ? 0 : step.stepNumber)}
                className="p-5 flex flex-wrap items-center justify-between gap-4 cursor-pointer select-none"
              >
                <div className="flex items-start space-x-3.5">
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 mt-0.5 ${
                      isCompleted
                        ? 'bg-emerald-100 text-emerald-700'
                        : isSelected
                        ? 'bg-indigo-100 text-indigo-700'
                        : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {isCompleted ? (
                      <CheckCircle2 className="w-5 h-5" />
                    ) : (
                      <span className="font-bold text-sm">{step.stepNumber}</span>
                    )}
                  </div>

                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                        {step.phase}
                      </span>
                      <span className="text-slate-300">&bull;</span>
                      <span className="text-xs font-medium text-slate-500 flex items-center">
                        <Clock className="w-3 h-3 mr-1" />
                        {step.durationWeeks}
                      </span>
                      {isCompleted && (
                        <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full border border-emerald-200">
                          Already Mastered
                        </span>
                      )}
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 mt-0.5">
                      {step.title}
                    </h3>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <div className="flex flex-wrap gap-1 max-w-xs justify-end">
                    {step.targetSkills.map((sk) => (
                      <span
                        key={sk}
                        className="text-[11px] font-medium bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md border border-slate-200"
                      >
                        {sk}
                      </span>
                    ))}
                  </div>
                  <ChevronRight
                    className={`w-5 h-5 text-slate-400 transition-transform duration-150 ${
                      isSelected ? 'transform rotate-90' : ''
                    }`}
                  />
                </div>
              </div>

              {/* Step Expanded Content */}
              {isSelected && (
                <div className="px-5 pb-6 pt-2 border-t border-slate-100 space-y-4 text-xs sm:text-sm animate-fadeIn">
                  
                  {/* Practical Milestone Project */}
                  <div className="p-3.5 rounded-xl bg-indigo-50/70 border border-indigo-100">
                    <span className="text-xs font-bold text-indigo-900 uppercase tracking-wider block mb-1">
                      Target Milestone Project:
                    </span>
                    <p className="text-xs sm:text-sm text-indigo-950 font-medium">
                      🎯 {step.milestoneProject}
                    </p>
                  </div>

                  {/* Two Columns: Key Concepts & Curated Free Resources */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    
                    {/* Key Concepts */}
                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                      <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                        Core Concepts to Study:
                      </span>
                      <ul className="space-y-1.5 text-xs text-slate-600">
                        {step.keyConcepts.map((concept, i) => (
                          <li key={i} className="flex items-start space-x-2">
                            <span className="text-indigo-500 font-bold">•</span>
                            <span>{concept}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Curated Free Resources */}
                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                      <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                        Curated Free Resources:
                      </span>
                      <div className="space-y-2">
                        {step.resources.map((res, i) => (
                          <a
                            key={i}
                            href={res.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-between p-2.5 rounded-lg bg-white border border-slate-200 hover:border-sky-400 hover:bg-sky-50/50 transition text-xs font-medium text-slate-800 group"
                          >
                            <div className="flex items-center space-x-2">
                              <BookOpen className="w-3.5 h-3.5 text-sky-600" />
                              <span className="group-hover:text-sky-700">{res.name}</span>
                            </div>
                            <div className="flex items-center space-x-1.5 text-[10px] text-slate-400 group-hover:text-sky-600">
                              <span className="uppercase">{res.type}</span>
                              <ExternalLink className="w-3 h-3" />
                            </div>
                          </a>
                        ))}
                      </div>
                    </div>

                  </div>

                </div>
              )}

            </div>
          );
        })}
      </div>

    </section>
  );
};
