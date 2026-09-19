import React from 'react';
import { Lightbulb, CheckCircle2, AlertTriangle, ArrowUpRight, Award } from 'lucide-react';
import { AnalysisResult } from '../types';

interface SkillGapExplanationCardProps {
  result: AnalysisResult;
}

export const SkillGapExplanationCard: React.FC<SkillGapExplanationCardProps> = ({ result }) => {
  const { gapExplanation, roleTitle, matchPercentage } = result;

  return (
    <section className="py-4 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="bg-gradient-to-br from-indigo-900 via-slate-900 to-slate-950 text-white rounded-2xl p-6 sm:p-8 shadow-xl border border-indigo-500/20 relative overflow-hidden">
        
        {/* Subtle decorative glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative space-y-6">
          
          {/* Header */}
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-indigo-500/30 pb-4">
            <div className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded-lg bg-indigo-500/30 text-indigo-300 flex items-center justify-center">
                <Lightbulb className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs font-semibold text-indigo-300 uppercase tracking-wider">Step 5</span>
                <h3 className="text-xl font-extrabold text-white">Skill Gap Analysis &amp; Hiring Diagnosis</h3>
              </div>
            </div>

            <div className="flex items-center space-x-2 text-xs">
              <span className="text-slate-400">Position Benchmark:</span>
              <span className="font-semibold text-sky-400">{roleTitle}</span>
            </div>
          </div>

          {/* Simple Language Summary (Prompt Core Requirement) */}
          <div className="p-4 sm:p-5 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
            <span className="text-xs font-semibold uppercase tracking-wider text-sky-400 block mb-1">
              Executive Evaluation
            </span>
            <p className="text-base sm:text-lg font-medium text-slate-100 leading-relaxed">
              "{gapExplanation.summary}"
            </p>
          </div>

          {/* Two-Column Diagnostic Breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Left: Your Foundational Strengths */}
            <div className="p-4 sm:p-5 rounded-xl bg-emerald-950/30 border border-emerald-500/30 space-y-3">
              <div className="flex items-center space-x-2 text-emerald-400 font-bold text-sm">
                <CheckCircle2 className="w-4 h-4" />
                <span>Foundational Strengths Identified</span>
              </div>
              <p className="text-xs text-slate-300">
                These core skills demonstrate your programming aptitude and qualify you for the foundational phase of this role:
              </p>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {gapExplanation.foundationalStrengths.length > 0 ? (
                  gapExplanation.foundationalStrengths.map((st) => (
                    <span
                      key={st}
                      className="text-xs font-medium bg-emerald-500/20 text-emerald-200 border border-emerald-500/40 px-2.5 py-1 rounded-md"
                    >
                      {st}
                    </span>
                  ))
                ) : (
                  <span className="text-xs text-slate-400 italic">
                    Beginning fresh: Focus on the Step 1 Foundations roadmap below.
                  </span>
                )}
              </div>
            </div>

            {/* Right: Critical Missing Skills */}
            <div className="p-4 sm:p-5 rounded-xl bg-rose-950/30 border border-rose-500/30 space-y-3">
              <div className="flex items-center space-x-2 text-rose-400 font-bold text-sm">
                <AlertTriangle className="w-4 h-4" />
                <span>Top Missing Competencies</span>
              </div>
              <p className="text-xs text-slate-300">
                These are the most critical screening barriers where recruiters or technical interviews will test you:
              </p>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {gapExplanation.criticalGaps.length > 0 ? (
                  gapExplanation.criticalGaps.map((cg) => (
                    <span
                      key={cg}
                      className="text-xs font-medium bg-rose-500/20 text-rose-200 border border-rose-500/40 px-2.5 py-1 rounded-md"
                    >
                      {cg}
                    </span>
                  ))
                ) : (
                  <span className="text-xs text-emerald-300 font-semibold">
                    No critical gaps! Ready to build full-scale portfolio demonstrations.
                  </span>
                )}
              </div>
            </div>

          </div>

          {/* Action Advice Banner */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-xl bg-indigo-500/10 border border-indigo-500/30 text-xs text-slate-200">
            <div className="flex items-center space-x-2">
              <Award className="w-4 h-4 text-amber-400 shrink-0" />
              <span>
                <strong className="text-white">Coach's Advice: </strong>
                {gapExplanation.actionAdvice}
              </span>
            </div>
            <a
              href="#personalized-roadmap"
              className="inline-flex items-center space-x-1 font-semibold text-sky-400 hover:text-sky-300 transition shrink-0"
            >
              <span>View Guided Learning Steps</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>

        </div>

      </div>
    </section>
  );
};
