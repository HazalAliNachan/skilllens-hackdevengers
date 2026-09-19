import React, { useState, useRef, useEffect } from 'react';
import { 
  Plus, 
  X, 
  Briefcase, 
  FileText, 
  Sparkles, 
  Check, 
  AlertCircle, 
  Search,
  Code2,
  Database,
  Brain,
  Cpu,
  Globe,
  Wrench
} from 'lucide-react';
import { JobRole } from '../types';
import { COMMON_SKILLS, PRESET_JOB_ROLES } from '../data/skillsData';

interface SkillInputFormProps {
  skills: string[];
  onAddSkill: (skill: string) => void;
  onRemoveSkill: (skill: string) => void;
  onClearSkills: () => void;
  targetRole: string;
  onSelectRole: (role: string) => void;
  jobDescription: string;
  onChangeJobDescription: (jd: string) => void;
  onAnalyze: () => void;
  isAnalyzing: boolean;
  error?: string | null;
}

export const SkillInputForm: React.FC<SkillInputFormProps> = ({
  skills,
  onAddSkill,
  onRemoveSkill,
  onClearSkills,
  targetRole,
  onSelectRole,
  jobDescription,
  onChangeJobDescription,
  onAnalyze,
  isAnalyzing,
  error,
}) => {
  const [inputValue, setInputValue] = useState('');
  const [activeTab, setActiveTab] = useState<'preset' | 'custom_jd'>('preset');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const inputRef = useRef<HTMLInputElement>(null);

  // Filter autocomplete suggestions based on input
  const suggestions = inputValue.trim()
    ? COMMON_SKILLS.filter(
        (s) =>
          s.name.toLowerCase().includes(inputValue.toLowerCase()) &&
          !skills.some((userSkill) => userSkill.toLowerCase() === s.name.toLowerCase())
      ).slice(0, 6)
    : [];

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      if (inputValue.trim()) {
        onAddSkill(inputValue.trim());
        setInputValue('');
      }
    }
  };

  const handleSuggestionClick = (name: string) => {
    onAddSkill(name);
    setInputValue('');
    inputRef.current?.focus();
  };

  const loadSampleJD = () => {
    const activeRole = PRESET_JOB_ROLES.find(r => r.title === targetRole) || PRESET_JOB_ROLES[0];
    onChangeJobDescription(activeRole.sampleJobDescription);
  };

  // Category icons
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'languages': return <Code2 className="w-3.5 h-3.5" />;
      case 'data': return <Database className="w-3.5 h-3.5" />;
      case 'ml_ai': return <Brain className="w-3.5 h-3.5" />;
      case 'core_cs': return <Cpu className="w-3.5 h-3.5" />;
      case 'web_backend': return <Globe className="w-3.5 h-3.5" />;
      case 'devops_tools': return <Wrench className="w-3.5 h-3.5" />;
      default: return null;
    }
  };

  const filteredQuickSkills = selectedCategory === 'all'
    ? COMMON_SKILLS
    : COMMON_SKILLS.filter(s => s.category === selectedCategory);

  return (
    <section id="analyzer-form" className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-200 overflow-hidden">
        
        {/* Card Header */}
        <div className="bg-slate-900 text-white px-6 py-5 border-b border-slate-800 flex flex-wrap items-center justify-between gap-4">
          <div>
            <span className="text-xs font-semibold text-sky-400 uppercase tracking-wider">Step 1 &amp; 2</span>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight">Configure Your Career Profile</h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-0.5">
              Enter your current toolkit and designate your target internship or paste an actual posting.
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-xs bg-slate-800 text-slate-300 px-3 py-1.5 rounded-lg border border-slate-700">
              {skills.length} skills loaded
            </span>
          </div>
        </div>

        <div className="p-6 sm:p-8 space-y-8">
          
          {/* FEATURE 1 — SKILL INPUT */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-bold text-slate-800 flex items-center">
                <span>1. Your Current Skills &amp; Technologies</span>
                <span className="ml-2 text-xs font-normal text-slate-500">
                  (Type and hit Enter, or click quick chips below)
                </span>
              </label>
              {skills.length > 0 && (
                <button
                  type="button"
                  onClick={onClearSkills}
                  className="text-xs font-medium text-rose-600 hover:text-rose-700 transition"
                >
                  Clear all
                </button>
              )}
            </div>

            {/* Input and Chips Container */}
            <div className="min-h-[60px] p-3 rounded-xl border border-slate-300 bg-slate-50/50 focus-within:border-sky-500 focus-within:ring-2 focus-within:ring-sky-500/20 transition">
              <div className="flex flex-wrap gap-2 items-center">
                {skills.map((skill) => (
                  <span
                    key={skill}
                    className="inline-flex items-center space-x-1 px-3 py-1.5 rounded-lg text-xs font-medium bg-sky-100 text-sky-900 border border-sky-200 shadow-sm animate-fadeIn"
                  >
                    <span>{skill}</span>
                    <button
                      type="button"
                      onClick={() => onRemoveSkill(skill)}
                      className="text-sky-600 hover:text-sky-900 p-0.5 rounded-full hover:bg-sky-200 transition"
                      aria-label={`Remove ${skill}`}
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </span>
                ))}

                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder={skills.length === 0 ? "e.g. Python, SQL, Pandas, NumPy, Machine Learning..." : "Add more skills..."}
                  className="flex-1 min-w-[200px] bg-transparent text-sm text-slate-800 placeholder-slate-400 focus:outline-none py-1"
                />
              </div>

              {/* Autocomplete Dropdown */}
              {suggestions.length > 0 && (
                <div className="mt-2 pt-2 border-t border-slate-200 flex flex-wrap gap-1.5 items-center">
                  <span className="text-[11px] text-slate-400 font-medium mr-1 flex items-center">
                    <Search className="w-3 h-3 mr-1" /> Suggestion:
                  </span>
                  {suggestions.map((s) => (
                    <button
                      key={s.name}
                      type="button"
                      onClick={() => handleSuggestionClick(s.name)}
                      className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-md text-xs font-medium bg-white hover:bg-sky-50 text-slate-700 hover:text-sky-700 border border-slate-200 hover:border-sky-300 transition shadow-xs"
                    >
                      <Plus className="w-3 h-3 text-sky-600" />
                      <span>{s.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Quick-Add Popular Skills Section */}
            <div className="mt-3.5 pt-3 border-t border-slate-100">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                <span className="text-xs font-semibold text-slate-600">Quick-Add Common Career Skills:</span>
                
                {/* Category filters */}
                <div className="flex flex-wrap gap-1">
                  {[
                    { id: 'all', label: 'All' },
                    { id: 'languages', label: 'Languages' },
                    { id: 'data', label: 'Data' },
                    { id: 'ml_ai', label: 'ML & AI' },
                    { id: 'core_cs', label: 'Core CS' },
                    { id: 'web_backend', label: 'Web & API' },
                    { id: 'devops_tools', label: 'DevOps & Tools' },
                  ].map((cat) => (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`text-[11px] px-2 py-0.5 rounded font-medium transition ${
                        selectedCategory === cat.id
                          ? 'bg-slate-800 text-white'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap gap-1.5 max-h-32 overflow-y-auto pr-1">
                {filteredQuickSkills.map((s) => {
                  const isSelected = skills.some(
                    (us) => us.toLowerCase() === s.name.toLowerCase()
                  );
                  return (
                    <button
                      key={s.name}
                      type="button"
                      onClick={() => {
                        if (isSelected) {
                          onRemoveSkill(s.name);
                        } else {
                          onAddSkill(s.name);
                        }
                      }}
                      className={`inline-flex items-center space-x-1 px-2.5 py-1 rounded-lg text-xs font-medium transition border ${
                        isSelected
                          ? 'bg-emerald-50 text-emerald-800 border-emerald-300 font-semibold'
                          : 'bg-white text-slate-600 hover:text-slate-900 border-slate-200 hover:border-slate-300 shadow-2xs'
                      }`}
                    >
                      {isSelected ? (
                        <Check className="w-3 h-3 text-emerald-600" />
                      ) : (
                        getCategoryIcon(s.category)
                      )}
                      <span>{s.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* FEATURE 2 — TARGET ROLE & JOB DESCRIPTION */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="text-sm font-bold text-slate-800">
                2. Target Job Role or Custom Posting
              </label>

              {/* Mode Toggle */}
              <div className="inline-flex rounded-lg bg-slate-100 p-0.5 border border-slate-200 text-xs">
                <button
                  type="button"
                  onClick={() => setActiveTab('preset')}
                  className={`inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-md font-medium transition ${
                    activeTab === 'preset'
                      ? 'bg-white text-slate-900 shadow-xs font-semibold'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  <Briefcase className="w-3.5 h-3.5" />
                  <span>Standard Role</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('custom_jd')}
                  className={`inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-md font-medium transition ${
                    activeTab === 'custom_jd'
                      ? 'bg-white text-slate-900 shadow-xs font-semibold'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Paste Job Description</span>
                </button>
              </div>
            </div>

            {/* Standard Role Selector */}
            {activeTab === 'preset' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                {PRESET_JOB_ROLES.map((role) => {
                  const isSelected = targetRole === role.title;
                  return (
                    <button
                      key={role.id}
                      type="button"
                      onClick={() => onSelectRole(role.title)}
                      className={`text-left p-3.5 rounded-xl border transition duration-150 relative ${
                        isSelected
                          ? 'border-sky-500 bg-sky-50/70 ring-2 ring-sky-500/20 shadow-sm'
                          : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                          {role.level}
                        </span>
                        {isSelected && (
                          <div className="w-4 h-4 rounded-full bg-sky-500 text-white flex items-center justify-center">
                            <Check className="w-3 h-3" />
                          </div>
                        )}
                      </div>
                      <h4 className="text-sm font-bold text-slate-900 mt-1">
                        {role.title}
                      </h4>
                      <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                        {role.shortDescription}
                      </p>
                      <div className="mt-2 flex flex-wrap gap-1">
                        {role.requiredSkills.slice(0, 3).map((rs) => (
                          <span key={rs.name} className="text-[10px] bg-slate-200/70 text-slate-700 px-1.5 py-0.5 rounded">
                            {rs.name}
                          </span>
                        ))}
                        {role.requiredSkills.length > 3 && (
                          <span className="text-[10px] text-slate-400 self-center">
                            +{role.requiredSkills.length - 3} more
                          </span>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            ) : (
              /* Custom Job Description Textarea */
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-500">
                    Paste real job qualifications from LinkedIn, Handshake, or Greenhouse.
                  </span>
                  <button
                    type="button"
                    onClick={loadSampleJD}
                    className="text-xs font-semibold text-sky-600 hover:text-sky-700 underline"
                  >
                    Load Sample Job Description
                  </button>
                </div>
                <textarea
                  rows={6}
                  value={jobDescription}
                  onChange={(e) => onChangeJobDescription(e.target.value)}
                  placeholder="Paste job posting here (e.g. Responsibilities, Minimum Qualifications, Preferred Skills)..."
                  className="w-full p-3.5 rounded-xl border border-slate-300 bg-slate-50/50 text-slate-900 text-xs sm:text-sm font-mono focus:bg-white focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 transition"
                />
                <div className="flex justify-between items-center text-xs text-slate-400">
                  <span>SkillLens will automatically extract and benchmark technical requirements.</span>
                  <span>{jobDescription.length} characters</span>
                </div>
              </div>
            )}
          </div>

          {/* Validation / Error Message */}
          {error && (
            <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs sm:text-sm flex items-start space-x-2">
              <AlertCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {/* Analyze Action Button */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-100">
            <div className="text-xs text-slate-500">
              <p>
                Targeting: <strong className="text-slate-800">{targetRole}</strong> &bull; {skills.length} skills ready for evaluation.
              </p>
            </div>

            <button
              type="button"
              onClick={onAnalyze}
              disabled={isAnalyzing}
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-sky-600 via-indigo-600 to-indigo-700 hover:from-sky-500 hover:to-indigo-600 text-white font-bold text-sm sm:text-base shadow-lg shadow-indigo-500/25 disabled:opacity-50 disabled:cursor-not-allowed transition duration-150 cursor-pointer"
            >
              {isAnalyzing ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Analyzing Competency Matrix...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5 text-amber-300" />
                  <span>Analyze My Profile</span>
                </>
              )}
            </button>
          </div>

        </div>
      </div>
    </section>
  );
};
