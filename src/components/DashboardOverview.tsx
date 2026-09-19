import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  Filter, 
  Percent,
  Sparkles,
  Layers,
  Info
} from 'lucide-react';
import { AnalysisResult, SkillDetail } from '../types';

interface DashboardOverviewProps {
  result: AnalysisResult;
}

export const DashboardOverview: React.FC<DashboardOverviewProps> = ({ result }) => {
  const [filter, setFilter] = useState<'all' | 'matched' | 'developing' | 'missing'>('all');
  const [showFormula, setShowFormula] = useState(false);

  const {
    roleTitle,
    matchPercentage,
    matchedSkills,
    developingSkills,
    missingSkills,
    totalRequired,
    scoreBreakdown,
  } = result;

  // Visual color for match gauge
  const getGaugeColor = (pct: number) => {
    if (pct >= 80) return 'text-emerald-600 stroke-emerald-500';
    if (pct >= 60) return 'text-sky-600 stroke-sky-500';
    if (pct >= 40) return 'text-amber-600 stroke-amber-500';
    return 'text-rose-600 stroke-rose-500';
  };

  const getBadgeTier = (pct: number) => {
    if (pct >= 85) return { label: 'Strong Interview Readiness', bg: 'bg-emerald-100 text-emerald-800 border-emerald-200' };
    if (pct >= 65) return { label: 'Promising Trajectory', bg: 'bg-sky-100 text-sky-800 border-sky-200' };
    if (pct >= 45) return { label: 'Developing Candidate', bg: 'bg-amber-100 text-amber-800 border-amber-200' };
    return { label: 'Early Stage Foundations', bg: 'bg-rose-100 text-rose-800 border-rose-200' };
  };

  const tier = getBadgeTier(matchPercentage);

  // Filter skills for list view
  const allCategorized: SkillDetail[] = [
    ...matchedSkills,
    ...developingSkills,
    ...missingSkills,
  ];

  const displayedSkills = allCategorized.filter((s) => {
    if (filter === 'all') return true;
    return s.status === filter;
  });

  return (
    <section id="analysis-dashboard" className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-6">
      
      {/* Section Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-xs font-bold text-sky-600 uppercase tracking-wider">
              Step 3 &amp; 4 &bull; Core Dashboard
            </span>
            {result.isAiEnhanced && (
              <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold bg-indigo-100 text-indigo-800 border border-indigo-200">
                <Sparkles className="w-3 h-3 mr-1 text-indigo-600" />
                Gemini Grounded
              </span>
            )}
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Skill Analysis Dashboard: <span className="text-indigo-600">{roleTitle}</span>
          </h2>
        </div>

        {/* Breakdown formula toggle */}
        <button
          onClick={() => setShowFormula(!showFormula)}
          className="inline-flex items-center space-x-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-white border border-slate-200 px-3 py-2 rounded-xl shadow-xs transition"
        >
          <Info className="w-4 h-4 text-sky-600" />
          <span>Transparent Scoring Formula</span>
          {showFormula ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>
      </div>

      {/* Scoring Explanation Dropdown */}
      {showFormula && (
        <div className="p-4 rounded-xl bg-slate-900 text-white text-xs space-y-2 animate-fadeIn border border-slate-800">
          <div className="flex items-center justify-between font-bold text-sky-400">
            <span>Deterministic Scoring Transparency</span>
            <span className="font-mono text-slate-300">{scoreBreakdown.formulaExplanation}</span>
          </div>
          <p className="text-slate-300">
            Unlike black-box AI platforms, SkillLens calculates your score using verified industry weights:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1 text-slate-200">
            <div className="bg-slate-800/80 p-2.5 rounded-lg border border-slate-700">
              <span className="font-semibold text-emerald-400">Matched Skills (100% credit):</span>
              <p className="text-slate-400 mt-0.5">Skills you actively possess and demonstrate proficiency in.</p>
            </div>
            <div className="bg-slate-800/80 p-2.5 rounded-lg border border-slate-700">
              <span className="font-semibold text-amber-400">Developing Skills (50% credit):</span>
              <p className="text-slate-400 mt-0.5">Skills where you already hold strong prerequisites, lowering the learning barrier.</p>
            </div>
            <div className="bg-slate-800/80 p-2.5 rounded-lg border border-slate-700">
              <span className="font-semibold text-rose-400">Missing Skills (0% credit):</span>
              <p className="text-slate-400 mt-0.5">Required competencies with no direct or adjacent foundational coverage.</p>
            </div>
          </div>
        </div>
      )}

      {/* Top Metric Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
        
        {/* Overall Match Percentage Card (4 cols) */}
        <div className="md:col-span-5 lg:col-span-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-md shadow-slate-100 flex flex-col items-center justify-center text-center relative overflow-hidden">
          <div className="absolute top-3 right-3">
            <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full border ${tier.bg}`}>
              {tier.label}
            </span>
          </div>

          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
            Overall Skill Match
          </span>

          {/* Large Circular Gauge */}
          <div className="relative w-40 h-40 flex items-center justify-center my-2">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              {/* Background circle */}
              <circle
                cx="50"
                cy="50"
                r="42"
                className="stroke-slate-100"
                strokeWidth="10"
                fill="transparent"
              />
              {/* Foreground progress circle */}
              <circle
                cx="50"
                cy="50"
                r="42"
                className={`${getGaugeColor(matchPercentage)} transition-all duration-1000 ease-out`}
                strokeWidth="10"
                strokeDasharray={264}
                strokeDashoffset={264 - (264 * matchPercentage) / 100}
                strokeLinecap="round"
                fill="transparent"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-4xl font-extrabold tracking-tight text-slate-900">
                {matchPercentage}%
              </span>
              <span className="text-[11px] font-medium text-slate-500 mt-0.5">
                Role Coverage
              </span>
            </div>
          </div>

          <p className="text-xs text-slate-600 max-w-xs mt-1">
            Based on <strong className="text-slate-900">{totalRequired}</strong> core competencies evaluated for this position.
          </p>
        </div>

        {/* Three Category Cards (7/8 cols) */}
        <div className="md:col-span-7 lg:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
          
          {/* Matched Card */}
          <div 
            onClick={() => setFilter(filter === 'matched' ? 'all' : 'matched')}
            className={`p-5 rounded-2xl border transition duration-150 cursor-pointer flex flex-col justify-between ${
              filter === 'matched'
                ? 'bg-emerald-50/70 border-emerald-400 ring-2 ring-emerald-400/20'
                : 'bg-white border-slate-200 hover:border-emerald-300'
            }`}
          >
            <div>
              <div className="flex items-center justify-between">
                <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                  {Math.round((matchedSkills.length / totalRequired) * 100)}%
                </span>
              </div>
              <h3 className="text-2xl font-black text-slate-900 mt-3">{matchedSkills.length}</h3>
              <p className="text-xs font-bold uppercase tracking-wider text-emerald-800">Matched Skills</p>
              <p className="text-xs text-slate-500 mt-1">
                Direct competencies acquired through coursework or projects.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap gap-1">
              {matchedSkills.slice(0, 3).map(s => (
                <span key={s.name} className="text-[10px] bg-emerald-100 text-emerald-800 font-medium px-1.5 py-0.5 rounded">
                  {s.name}
                </span>
              ))}
              {matchedSkills.length > 3 && (
                <span className="text-[10px] text-emerald-700 font-medium self-center">
                  +{matchedSkills.length - 3} more
                </span>
              )}
            </div>
          </div>

          {/* Developing Card */}
          <div 
            onClick={() => setFilter(filter === 'developing' ? 'all' : 'developing')}
            className={`p-5 rounded-2xl border transition duration-150 cursor-pointer flex flex-col justify-between ${
              filter === 'developing'
                ? 'bg-amber-50/70 border-amber-400 ring-2 ring-amber-400/20'
                : 'bg-white border-slate-200 hover:border-amber-300'
            }`}
          >
            <div>
              <div className="flex items-center justify-between">
                <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center">
                  <Clock className="w-5 h-5" />
                </div>
                <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
                  {Math.round((developingSkills.length / totalRequired) * 100)}%
                </span>
              </div>
              <h3 className="text-2xl font-black text-slate-900 mt-3">{developingSkills.length}</h3>
              <p className="text-xs font-bold uppercase tracking-wider text-amber-800">Developing Skills</p>
              <p className="text-xs text-slate-500 mt-1">
                Prerequisites met. Ready to accelerate with hands-on practice.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap gap-1">
              {developingSkills.slice(0, 3).map(s => (
                <span key={s.name} className="text-[10px] bg-amber-100 text-amber-800 font-medium px-1.5 py-0.5 rounded">
                  {s.name}
                </span>
              ))}
              {developingSkills.length > 3 && (
                <span className="text-[10px] text-amber-700 font-medium self-center">
                  +{developingSkills.length - 3} more
                </span>
              )}
            </div>
          </div>

          {/* Missing Card */}
          <div 
            onClick={() => setFilter(filter === 'missing' ? 'all' : 'missing')}
            className={`p-5 rounded-2xl border transition duration-150 cursor-pointer flex flex-col justify-between ${
              filter === 'missing'
                ? 'bg-rose-50/70 border-rose-400 ring-2 ring-rose-400/20'
                : 'bg-white border-slate-200 hover:border-rose-300'
            }`}
          >
            <div>
              <div className="flex items-center justify-between">
                <div className="w-9 h-9 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center">
                  <AlertCircle className="w-5 h-5" />
                </div>
                <span className="text-xs font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded-md border border-rose-200">
                  {Math.round((missingSkills.length / totalRequired) * 100)}%
                </span>
              </div>
              <h3 className="text-2xl font-black text-slate-900 mt-3">{missingSkills.length}</h3>
              <p className="text-xs font-bold uppercase tracking-wider text-rose-800">Missing Skills</p>
              <p className="text-xs text-slate-500 mt-1">
                Critical gap areas needed to become a competitive candidate.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap gap-1">
              {missingSkills.slice(0, 3).map(s => (
                <span key={s.name} className="text-[10px] bg-rose-100 text-rose-800 font-medium px-1.5 py-0.5 rounded">
                  {s.name}
                </span>
              ))}
              {missingSkills.length > 3 && (
                <span className="text-[10px] text-rose-700 font-medium self-center">
                  +{missingSkills.length - 3} more
                </span>
              )}
            </div>
          </div>

        </div>

      </div>

      {/* Categorized Skills Breakdown List */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        
        {/* Table/List Filter Bar */}
        <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center space-x-2">
            <Layers className="w-4 h-4 text-slate-500" />
            <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
              Detailed Competency Breakdown ({displayedSkills.length} of {totalRequired})
            </span>
          </div>

          <div className="flex items-center space-x-1.5">
            <span className="text-xs text-slate-500 mr-1 hidden sm:inline">Filter:</span>
            {[
              { id: 'all', label: `All (${totalRequired})` },
              { id: 'matched', label: `Matched (${matchedSkills.length})` },
              { id: 'developing', label: `Developing (${developingSkills.length})` },
              { id: 'missing', label: `Missing (${missingSkills.length})` },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilter(tab.id as any)}
                className={`text-xs px-2.5 py-1 rounded-lg font-medium transition ${
                  filter === tab.id
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-white text-slate-600 hover:bg-slate-200 border border-slate-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Skills Cards Grid */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {displayedSkills.map((skill) => {
            const isMatched = skill.status === 'matched';
            const isDev = skill.status === 'developing';

            return (
              <div
                key={skill.name}
                className={`p-3.5 rounded-xl border flex flex-col justify-between space-y-2 transition ${
                  isMatched
                    ? 'bg-emerald-50/40 border-emerald-200'
                    : isDev
                    ? 'bg-amber-50/40 border-amber-200'
                    : 'bg-slate-50/70 border-slate-200'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-2">
                    {isMatched ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    ) : isDev ? (
                      <Clock className="w-4 h-4 text-amber-600 shrink-0" />
                    ) : (
                      <AlertCircle className="w-4 h-4 text-rose-500 shrink-0" />
                    )}
                    <span className="text-sm font-bold text-slate-900">{skill.name}</span>
                  </div>

                  <span
                    className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-md ${
                      isMatched
                        ? 'bg-emerald-100 text-emerald-800'
                        : isDev
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-rose-100 text-rose-800'
                    }`}
                  >
                    {skill.status}
                  </span>
                </div>

                <div className="text-xs text-slate-600 space-y-1">
                  <div className="flex items-center space-x-2 text-[11px] text-slate-400">
                    <span className="capitalize">Category: {skill.category.replace('_', ' ')}</span>
                    <span>&bull;</span>
                    <span className="capitalize">Importance: {skill.importance}</span>
                  </div>
                  <p className="text-[11px] text-slate-600 leading-snug">
                    {skill.matchReason}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>

    </section>
  );
};
