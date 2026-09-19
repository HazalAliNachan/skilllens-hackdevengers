/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { HeroLanding } from './components/HeroLanding';
import { SkillInputForm } from './components/SkillInputForm';
import { DashboardOverview } from './components/DashboardOverview';
import { SkillGapExplanationCard } from './components/SkillGapExplanationCard';
import { PersonalizedRoadmap } from './components/PersonalizedRoadmap';
import { ProjectRecommendationCard } from './components/ProjectRecommendationCard';
import { WhatIfSimulator } from './components/WhatIfSimulator';
import { HowItWorksGuide } from './components/HowItWorksGuide';
import { ExportSummaryModal } from './components/ExportSummaryModal';

import { AnalysisResult, ProfilePreset } from './types';
import { DEMO_PRESETS, PRESET_JOB_ROLES } from './data/skillsData';
import { analyzeProfile } from './services/skillMatchingEngine';
import { Download, Sparkles, Compass } from 'lucide-react';

export default function App() {
  // Core user input state
  const [skills, setSkills] = useState<string[]>([
    'Python',
    'Pandas',
    'NumPy',
    'Git',
    'GitHub',
    'EDA',
  ]);
  const [targetRole, setTargetRole] = useState<string>('Machine Learning Intern');
  const [jobDescription, setJobDescription] = useState<string>('');
  
  // Analysis execution state
  const [activePresetId, setActivePresetId] = useState<string>('cs-sophomore-ml');
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  // Export modal state
  const [isExportOpen, setIsExportOpen] = useState<boolean>(false);

  // Initialize with the starter profile so judges see immediate real results
  useEffect(() => {
    runAnalysis(['Python', 'Pandas', 'NumPy', 'Git', 'GitHub', 'EDA'], 'Machine Learning Intern', '');
  }, []);

  const handleAddSkill = (skill: string) => {
    const trimmed = skill.trim();
    if (!trimmed) return;
    if (skills.some((s) => s.toLowerCase() === trimmed.toLowerCase())) return;
    setSkills((prev) => [...prev, trimmed]);
    setError(null);
  };

  const handleRemoveSkill = (skill: string) => {
    setSkills((prev) => prev.filter((s) => s.toLowerCase() !== skill.toLowerCase()));
  };

  const handleClearSkills = () => {
    setSkills([]);
    setActivePresetId('');
  };

  const handleSelectPreset = (preset: ProfilePreset) => {
    setActivePresetId(preset.id);
    setSkills(preset.userSkills);
    setTargetRole(preset.targetRole);
    setJobDescription('');
    setError(null);
    runAnalysis(preset.userSkills, preset.targetRole, '');
  };

  const handleReset = () => {
    setSkills([]);
    setTargetRole(PRESET_JOB_ROLES[0].title);
    setJobDescription('');
    setActivePresetId('');
    setResult(null);
    setError(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const runAnalysis = async (
    currentSkills: string[],
    selectedRole: string,
    customJD: string
  ) => {
    if (currentSkills.length === 0) {
      setError('Please enter at least one skill or select a demo profile to analyze.');
      return;
    }

    setIsAnalyzing(true);
    setError(null);

    try {
      // Attempt to call full-stack server API
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          skills: currentSkills,
          role: selectedRole,
          jobDescription: customJD,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setResult(data);
      } else {
        // Fallback to local engine immediately for bulletproof reliability
        const fallback = analyzeProfile(currentSkills, selectedRole, customJD);
        setResult(fallback);
      }
    } catch (err) {
      // Local fallback in case server endpoint has network latency
      const fallback = analyzeProfile(currentSkills, selectedRole, customJD);
      setResult(fallback);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleAnalyzeClick = () => {
    runAnalysis(skills, targetRole, jobDescription);
    const dashboardElem = document.getElementById('analysis-dashboard');
    if (dashboardElem) {
      dashboardElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToForm = () => {
    const formElem = document.getElementById('analyzer-form');
    if (formElem) {
      formElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans antialiased flex flex-col selection:bg-sky-500 selection:text-white">
      
      {/* Top Sticky Header */}
      <Header
        presets={DEMO_PRESETS}
        onSelectPreset={handleSelectPreset}
        activePresetId={activePresetId}
        onReset={handleReset}
        isAnalyzing={isAnalyzing}
      />

      {/* Main Content */}
      <main className="flex-1">
        
        {/* Landing Hero */}
        <HeroLanding
          presets={DEMO_PRESETS}
          onSelectPreset={handleSelectPreset}
          onScrollToForm={scrollToForm}
        />

        {/* Input Configuration Section */}
        <SkillInputForm
          skills={skills}
          onAddSkill={handleAddSkill}
          onRemoveSkill={handleRemoveSkill}
          onClearSkills={handleClearSkills}
          targetRole={targetRole}
          onSelectRole={(r) => {
            setTargetRole(r);
            setActivePresetId('');
          }}
          jobDescription={jobDescription}
          onChangeJobDescription={(jd) => {
            setJobDescription(jd);
            setActivePresetId('');
          }}
          onAnalyze={handleAnalyzeClick}
          isAnalyzing={isAnalyzing}
          error={error}
        />

        {/* Core Analysis Output Sections */}
        {result && (
          <div className="space-y-4 animate-fadeIn pb-16">
            
            {/* Quick floating action bar to export */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-end">
              <button
                onClick={() => setIsExportOpen(true)}
                className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-white border border-slate-200 hover:border-slate-300 text-slate-700 text-xs font-semibold shadow-xs transition hover:shadow-sm cursor-pointer"
              >
                <Download className="w-4 h-4 text-sky-600" />
                <span>Export Career Report (Markdown)</span>
              </button>
            </div>

            {/* FEATURE 3 & 4: Dashboard & Skill Categorization */}
            <DashboardOverview result={result} />

            {/* FEATURE 5: Skill Gap Explanation */}
            <SkillGapExplanationCard result={result} />

            {/* FEATURE 6: Personalized Learning Roadmap */}
            <PersonalizedRoadmap
              roadmap={result.learningRoadmap}
              roleTitle={result.roleTitle}
            />

            {/* FEATURE 7: Project Recommendation */}
            <ProjectRecommendationCard
              primaryProject={result.recommendedProject}
              alternativeProjects={result.alternativeProjects}
            />

            {/* FEATURE 8: "What If?" Skill Simulator */}
            <WhatIfSimulator result={result} />

          </div>
        )}

        {/* 8-Step Architecture Guide */}
        <HowItWorksGuide />

      </main>

      {/* Export Summary Modal */}
      {result && (
        <ExportSummaryModal
          isOpen={isExportOpen}
          onClose={() => setIsExportOpen(false)}
          result={result}
        />
      )}

      {/* Modern Footer */}
      <footer className="bg-slate-900 text-slate-400 py-10 border-t border-slate-800 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 rounded-lg bg-sky-500 flex items-center justify-center text-white">
              <Compass className="w-4 h-4" />
            </div>
            <span className="font-bold text-slate-200">SkillLens</span>
            <span>&bull;</span>
            <span>Know your gap. Build your path.</span>
          </div>

          <div className="text-slate-400 text-center sm:text-right">
            <span>Built for University Hackathon &bull; Powered by Deterministic Matching &amp; Gemini Grounding</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
