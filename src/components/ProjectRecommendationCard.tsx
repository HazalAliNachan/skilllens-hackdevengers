import React, { useState } from 'react';
import { 
  Rocket, 
  Sparkles, 
  CheckCircle2, 
  Database, 
  Terminal, 
  Award, 
  ExternalLink,
  ChevronRight,
  FolderGit2
} from 'lucide-react';
import { ProjectRecommendation } from '../types';

interface ProjectRecommendationCardProps {
  primaryProject: ProjectRecommendation;
  alternativeProjects?: ProjectRecommendation[];
}

export const ProjectRecommendationCard: React.FC<ProjectRecommendationCardProps> = ({
  primaryProject,
  alternativeProjects = [],
}) => {
  const [selectedProject, setSelectedProject] = useState<ProjectRecommendation>(primaryProject);

  const allProjects = [primaryProject, ...alternativeProjects];

  return (
    <section className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-6">
      
      {/* Section Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-sky-600 uppercase tracking-wider">
            Step 7 &bull; Portfolio Project Recommendation
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Recommended Project: <span className="text-indigo-600">{selectedProject.title}</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Carefully curated to bridge your largest competency gap through hands-on, recruiter-verifiable implementation.
          </p>
        </div>

        {/* Project switcher tabs if alternatives exist */}
        {allProjects.length > 1 && (
          <div className="flex items-center space-x-1.5 bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs">
            {allProjects.map((p, idx) => (
              <button
                key={p.id}
                onClick={() => setSelectedProject(p)}
                className={`px-3 py-1.5 rounded-lg font-medium transition ${
                  selectedProject.id === p.id
                    ? 'bg-white text-slate-900 shadow-xs font-bold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {idx === 0 ? '★ Primary Pick' : `Alternative ${idx}`}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Main Project Card */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xl shadow-slate-100 overflow-hidden">
        
        {/* Card Header Banner */}
        <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-6 sm:p-8">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="space-y-2 max-w-3xl">
              <div className="flex items-center space-x-2">
                <span className="px-2.5 py-0.5 rounded-md text-xs font-bold bg-sky-500/20 text-sky-300 border border-sky-500/30">
                  {selectedProject.difficulty} Difficulty
                </span>
                <span className="text-slate-400 text-xs">&bull;</span>
                <span className="text-xs text-slate-300 font-medium">
                  Est. {selectedProject.estimatedHours}
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
                {selectedProject.title}
              </h3>
              <p className="text-sm sm:text-base text-slate-300 font-normal">
                {selectedProject.tagline}
              </p>
            </div>

            <div className="w-12 h-12 rounded-2xl bg-indigo-600/30 border border-indigo-500/30 flex items-center justify-center text-sky-400 shrink-0">
              <Rocket className="w-6 h-6" />
            </div>
          </div>

          {/* Prompt Mandate: WHY THIS PROJECT WAS SELECTED */}
          <div className="mt-6 p-4 rounded-xl bg-white/10 border border-white/15 backdrop-blur-sm">
            <span className="text-xs font-bold text-sky-400 uppercase tracking-wider block mb-1">
              Why This Project Was Selected For You:
            </span>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
              {selectedProject.whySelected}
            </p>
          </div>
        </div>

        {/* Card Body */}
        <div className="p-6 sm:p-8 space-y-8">
          
          {/* Prompt Mandate: SKILLS IT DEVELOPS */}
          <div>
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2.5">
              Skills This Project Develops:
            </span>
            <div className="flex flex-wrap gap-2">
              {selectedProject.skillsDeveloped.map((skill) => (
                <span
                  key={skill}
                  className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-indigo-50 text-indigo-800 border border-indigo-200 shadow-2xs"
                >
                  <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                  <span>{skill}</span>
                </span>
              ))}
            </div>
          </div>

          {/* Two-Column: What You Will Learn & Recommended Dataset */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Prompt Mandate: WHAT THE USER WOULD LEARN */}
            <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
              <span className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
                What You Will Learn &amp; Master:
              </span>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
                {selectedProject.whatYouWillLearn.map((item, idx) => (
                  <li key={idx} className="flex items-start space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Architecture Steps */}
            <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
              <span className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
                Implementation Architecture:
              </span>
              <ol className="space-y-2 text-xs sm:text-sm text-slate-700 font-mono">
                {selectedProject.architectureSteps.map((step, idx) => (
                  <li key={idx} className="flex items-start space-x-2">
                    <span className="text-sky-600 font-bold shrink-0">{idx + 1}.</span>
                    <span>{step.replace(/^\d+\.\s*/, '')}</span>
                  </li>
                ))}
              </ol>
            </div>

          </div>

          {/* Dataset & Portfolio Deliverables Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2 border-t border-slate-100">
            
            {/* Recommended Open Dataset */}
            <div className="flex items-start space-x-3 p-4 rounded-xl bg-sky-50/50 border border-sky-200">
              <Database className="w-5 h-5 text-sky-600 shrink-0 mt-0.5" />
              <div>
                <span className="text-xs font-bold text-sky-900 uppercase tracking-wider block">
                  Recommended Open-Source Dataset
                </span>
                <h4 className="text-sm font-bold text-slate-900 mt-0.5">
                  {selectedProject.recommendedDataset.name}
                </h4>
                <p className="text-xs text-slate-600 mt-1">
                  {selectedProject.recommendedDataset.description}
                </p>
                <a
                  href={selectedProject.recommendedDataset.source}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-1 text-xs font-semibold text-sky-600 hover:text-sky-700 mt-2"
                >
                  <span>Access Dataset Source</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            {/* Recruiter Deliverables */}
            <div className="flex items-start space-x-3 p-4 rounded-xl bg-slate-50 border border-slate-200">
              <FolderGit2 className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
              <div>
                <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                  Interview Portfolio Deliverables
                </span>
                <ul className="mt-1 space-y-1 text-xs text-slate-600">
                  {selectedProject.portfolioDeliverables.map((del, i) => (
                    <li key={i} className="flex items-center space-x-1.5">
                      <span className="text-indigo-500 font-bold">•</span>
                      <span>{del}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

          </div>

        </div>

      </div>

    </section>
  );
};
