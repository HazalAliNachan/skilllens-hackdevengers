import React from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  Layers, 
  CheckCircle2, 
  BookOpen, 
  Rocket, 
  Sliders, 
  Target 
} from 'lucide-react';

export const HowItWorksGuide: React.FC = () => {
  const steps = [
    { num: '01', title: 'Enter Skills', desc: 'Add current programming languages, libraries, tools & coursework' },
    { num: '02', title: 'Pick Role / Paste JD', desc: 'Select from tech internship benchmarks or paste live job postings' },
    { num: '03', title: 'Compare & Categorize', desc: 'Deterministic matching into Matched (100%), Developing (50%), and Missing (0%)' },
    { num: '04', title: 'Visual Dashboard', desc: 'Inspect coverage metrics, tier status, and comprehensive competency tables' },
    { num: '05', title: 'Gap Explanation', desc: 'Humane diagnostic narrative pinpointing foundational strengths vs. core barriers' },
    { num: '06', title: 'Personalized Roadmap', desc: 'Step-by-step chronological curriculum with milestones and curated free guides' },
    { num: '07', title: 'Targeted Project', desc: 'Practical portfolio blueprint specifically bridging your largest missing competency' },
    { num: '08', title: 'What-If Simulator', desc: 'Toggle future skills to preview simulated coverage increases in real time' },
  ];

  return (
    <section id="how-it-works" className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-100">
      <div className="text-center max-w-3xl mx-auto mb-8">
        <span className="text-xs font-bold text-sky-600 uppercase tracking-wider">
          University Hackathon Architecture
        </span>
        <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">
          The 8 Core Functional Modules
        </h3>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Designed with clean separation between UI components, canonical skill data, matching algorithms, roadmap sequencing, and project intelligence.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        {steps.map((s) => (
          <div
            key={s.num}
            className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs hover:border-sky-300 transition duration-150"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-black text-sky-600 bg-sky-50 px-2 py-0.5 rounded-md border border-sky-100">
                {s.num}
              </span>
            </div>
            <h4 className="text-sm font-bold text-slate-900">{s.title}</h4>
            <p className="text-xs text-slate-500 mt-1 leading-snug">{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};
