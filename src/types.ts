export type SkillStatus = 'matched' | 'developing' | 'missing';

export type SkillImportance = 'critical' | 'important' | 'recommended';

export interface SkillDetail {
  name: string;
  category: 'languages' | 'data' | 'ml_ai' | 'core_cs' | 'web_backend' | 'devops_tools';
  status: SkillStatus;
  importance: SkillImportance;
  foundationalSkill?: string; // e.g. "Python" is foundational for "Pandas"
  userHasFoundations?: boolean;
  matchReason?: string;
}

export interface JobRole {
  id: string;
  title: string;
  category: string;
  level: string;
  shortDescription: string;
  requiredSkills: {
    name: string;
    importance: SkillImportance;
    category: 'languages' | 'data' | 'ml_ai' | 'core_cs' | 'web_backend' | 'devops_tools';
  }[];
  sampleJobDescription: string;
}

export interface RoadmapResource {
  name: string;
  url: string;
  type: 'documentation' | 'interactive' | 'course' | 'github';
  free: boolean;
}

export interface RoadmapStep {
  stepNumber: number;
  phase: string;
  title: string;
  status: 'completed' | 'in_progress' | 'upcoming';
  durationWeeks: string;
  targetSkills: string[];
  milestoneProject: string;
  keyConcepts: string[];
  resources: RoadmapResource[];
}

export interface ProjectRecommendation {
  id: string;
  title: string;
  tagline: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  estimatedHours: string;
  whySelected: string;
  skillsDeveloped: string[];
  whatYouWillLearn: string[];
  architectureSteps: string[];
  recommendedDataset: {
    name: string;
    description: string;
    source: string;
  };
  portfolioDeliverables: string[];
}

export interface AnalysisResult {
  roleTitle: string;
  targetSource: 'standard_role' | 'custom_jd';
  totalRequired: number;
  matchPercentage: number;
  matchedSkills: SkillDetail[];
  developingSkills: SkillDetail[];
  missingSkills: SkillDetail[];
  scoreBreakdown: {
    matchedCount: number;
    developingCount: number;
    missingCount: number;
    matchedPoints: number;
    developingPoints: number;
    totalPossiblePoints: number;
    formulaExplanation: string;
  };
  gapExplanation: {
    summary: string;
    foundationalStrengths: string[];
    criticalGaps: string[];
    actionAdvice: string;
  };
  learningRoadmap: RoadmapStep[];
  recommendedProject: ProjectRecommendation;
  alternativeProjects: ProjectRecommendation[];
  isAiEnhanced?: boolean;
  analyzedAt: string;
}

export interface ProfilePreset {
  id: string;
  name: string;
  targetRole: string;
  userSkills: string[];
  badge: string;
  description: string;
  hasJobDescription?: boolean;
}
