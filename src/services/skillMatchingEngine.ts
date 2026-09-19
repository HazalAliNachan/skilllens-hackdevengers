import { 
  AnalysisResult, 
  JobRole, 
  SkillDetail, 
  SkillImportance, 
  SkillStatus 
} from '../types';
import { 
  COMMON_SKILLS, 
  FOUNDATIONAL_PREREQUISITES, 
  PRESET_JOB_ROLES, 
  SKILL_SYNONYMS 
} from '../data/skillsData';
import { generatePersonalizedRoadmap } from './roadmapEngine';
import { recommendProjectForGaps } from './projectRecommendationEngine';

/**
 * Normalizes user skill text to canonical skill names using dictionary & aliases
 */
export function normalizeSkill(input: string): string {
  const clean = input.trim();
  const lower = clean.toLowerCase();
  
  // Check synonyms table first
  if (SKILL_SYNONYMS[lower]) {
    return SKILL_SYNONYMS[lower];
  }

  // Check common skills exact case-insensitive match
  const found = COMMON_SKILLS.find(s => s.name.toLowerCase() === lower);
  if (found) {
    return found.name;
  }

  // Capitalize nicely if not found
  return clean.charAt(0).toUpperCase() + clean.slice(1);
}

/**
 * Extracts skills from raw Job Description text
 */
export function extractSkillsFromJobDescription(text: string): {
  name: string;
  importance: SkillImportance;
  category: 'languages' | 'data' | 'ml_ai' | 'core_cs' | 'web_backend' | 'devops_tools';
}[] {
  const lowerText = text.toLowerCase();
  const detected: {
    name: string;
    importance: SkillImportance;
    category: 'languages' | 'data' | 'ml_ai' | 'core_cs' | 'web_backend' | 'devops_tools';
  }[] = [];

  const seen = new Set<string>();

  // Look for all common skills
  for (const skill of COMMON_SKILLS) {
    const sLower = skill.name.toLowerCase();
    
    // Create word boundary regex to avoid partial substring mismatches (e.g. 'c' inside 'cloud')
    let isMatch = false;
    if (sLower === 'c' || sLower === 'r') {
      const regex = new RegExp(`\\b${sLower}\\b(?![+#])`, 'i');
      isMatch = regex.test(text);
    } else if (sLower === 'c++') {
      isMatch = text.toLowerCase().includes('c++') || text.toLowerCase().includes('c plus plus');
    } else if (sLower === 'c#') {
      isMatch = text.toLowerCase().includes('c#') || text.toLowerCase().includes('c sharp');
    } else {
      const escaped = sLower.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const regex = new RegExp(`\\b${escaped}\\b`, 'i');
      isMatch = regex.test(text);
    }

    if (isMatch && !seen.has(skill.name)) {
      seen.add(skill.name);
      
      // Determine importance based on text context
      let importance: SkillImportance = 'important';
      if (
        lowerText.includes(`required:`) ||
        lowerText.includes(`must have`) ||
        lowerText.includes(`proficien`) ||
        lowerText.includes(`strong`) ||
        lowerText.includes(`qualifications`)
      ) {
        // if mentioned near requirements
        importance = 'critical';
      }

      detected.push({
        name: skill.name,
        importance,
        category: skill.category,
      });
    }
  }

  // Also check synonyms
  for (const [synKey, canonical] of Object.entries(SKILL_SYNONYMS)) {
    if (!seen.has(canonical)) {
      const regex = new RegExp(`\\b${synKey.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i');
      if (regex.test(text)) {
        seen.add(canonical);
        const canonSkill = COMMON_SKILLS.find(s => s.name === canonical);
        detected.push({
          name: canonical,
          importance: 'important',
          category: canonSkill ? canonSkill.category : 'languages',
        });
      }
    }
  }

  // Fallback if very few skills were found: provide standard ML/Data/SWE baseline
  if (detected.length < 3) {
    return [
      { name: 'Python', importance: 'critical', category: 'languages' },
      { name: 'SQL', importance: 'critical', category: 'languages' },
      { name: 'Git', importance: 'important', category: 'devops_tools' },
      { name: 'Data Analysis', importance: 'important', category: 'data' },
      { name: 'REST APIs', importance: 'recommended', category: 'web_backend' },
    ];
  }

  return detected;
}

/**
 * Evaluates skill matching and generates the complete profile analysis
 */
export function analyzeProfile(
  rawUserSkills: string[],
  targetRoleInput: string,
  customJobDescription?: string
): AnalysisResult {
  // 1. Normalize user skills
  const normalizedUserSkills = rawUserSkills
    .map(normalizeSkill)
    .filter((s, idx, arr) => arr.indexOf(s) === idx && s.length > 0);

  const userSkillSet = new Set(normalizedUserSkills.map(s => s.toLowerCase()));

  // 2. Identify target role or custom job description
  let roleTitle = targetRoleInput.trim() || 'Software Engineer Intern';
  let requiredList: {
    name: string;
    importance: SkillImportance;
    category: 'languages' | 'data' | 'ml_ai' | 'core_cs' | 'web_backend' | 'devops_tools';
  }[] = [];
  let targetSource: 'standard_role' | 'custom_jd' = 'standard_role';

  if (customJobDescription && customJobDescription.trim().length > 30) {
    targetSource = 'custom_jd';
    requiredList = extractSkillsFromJobDescription(customJobDescription);
    if (!targetRoleInput) {
      roleTitle = 'Custom Job Description Analysis';
    }
  } else {
    const matchedPreset = PRESET_JOB_ROLES.find(
      r => r.title.toLowerCase() === targetRoleInput.toLowerCase() || r.id === targetRoleInput.toLowerCase()
    );

    if (matchedPreset) {
      roleTitle = matchedPreset.title;
      requiredList = matchedPreset.requiredSkills;
    } else {
      // Default to ML Intern or General SWE if unmatched
      const defaultRole = PRESET_JOB_ROLES[0];
      roleTitle = targetRoleInput || defaultRole.title;
      requiredList = defaultRole.requiredSkills;
    }
  }

  // 3. Categorize into MATCHED, DEVELOPING, MISSING
  const matchedSkills: SkillDetail[] = [];
  const developingSkills: SkillDetail[] = [];
  const missingSkills: SkillDetail[] = [];

  for (const req of requiredList) {
    const reqLower = req.name.toLowerCase();

    // Check direct match
    if (userSkillSet.has(reqLower)) {
      matchedSkills.push({
        name: req.name,
        category: req.category,
        status: 'matched',
        importance: req.importance,
        matchReason: 'Direct proficiency confirmed in your skill profile.',
      });
      continue;
    }

    // Check if user has foundational prerequisites (DEVELOPING)
    const prereqs = FOUNDATIONAL_PREREQUISITES[req.name];
    let isDeveloping = false;
    let foundationFound = '';

    if (prereqs && prereqs.length > 0) {
      const hasAnyPrereq = prereqs.filter(p => userSkillSet.has(p.toLowerCase()));
      if (hasAnyPrereq.length >= 1) {
        isDeveloping = true;
        foundationFound = hasAnyPrereq.join(', ');
      }
    }

    // Heuristic: If user knows Python and role needs EDA or Data Analysis, that's developing
    if (!isDeveloping && (req.name === 'EDA' || req.name === 'Data Analysis') && userSkillSet.has('python')) {
      isDeveloping = true;
      foundationFound = 'Python';
    }

    // Heuristic: If user knows JavaScript and role needs React or Node.js
    if (!isDeveloping && (req.name === 'React' || req.name === 'Node.js') && userSkillSet.has('javascript')) {
      isDeveloping = true;
      foundationFound = 'JavaScript';
    }

    if (isDeveloping) {
      developingSkills.push({
        name: req.name,
        category: req.category,
        status: 'developing',
        importance: req.importance,
        foundationalSkill: foundationFound,
        userHasFoundations: true,
        matchReason: `Developing: You have prerequisite foundations in ${foundationFound}, lowering the learning curve.`,
      });
    } else {
      missingSkills.push({
        name: req.name,
        category: req.category,
        status: 'missing',
        importance: req.importance,
        matchReason: 'Missing: No direct or adjacent foundational skills detected yet.',
      });
    }
  }

  // 4. Calculate transparent score
  const totalRequired = requiredList.length || 1;
  const matchedCount = matchedSkills.length;
  const developingCount = developingSkills.length;
  const missingCount = missingSkills.length;

  const matchedPoints = matchedCount * 1.0;
  const developingPoints = developingCount * 0.5;
  const totalPossiblePoints = totalRequired * 1.0;

  const rawPercentage = ((matchedPoints + developingPoints) / totalPossiblePoints) * 100;
  const matchPercentage = Math.min(100, Math.max(0, Math.round(rawPercentage)));

  const formulaExplanation = `Calculated as: (${matchedCount} Matched × 100%) + (${developingCount} Developing × 50%) ÷ ${totalRequired} Total Required = ${matchPercentage}% coverage.`;

  // 5. Formulate humanized gap explanation
  const foundationalStrengths = matchedSkills
    .filter(s => s.importance === 'critical' || s.category === 'languages' || s.category === 'data')
    .map(s => s.name);

  const criticalGaps = missingSkills
    .filter(s => s.importance === 'critical' || s.importance === 'important')
    .map(s => s.name);

  let summaryText = '';
  if (matchPercentage >= 80) {
    summaryText = `Outstanding alignment for ${roleTitle}! You possess ${matchedCount} of ${totalRequired} core requirements with strong technical foundations. Your remaining focus should be on polishing production portfolio artifacts.`;
  } else if (matchPercentage >= 55) {
    if (foundationalStrengths.length > 0) {
      summaryText = `You have strong foundations in ${foundationalStrengths.slice(0, 3).join(', ')}. Your primary gap for this ${roleTitle} role centers on ${criticalGaps.slice(0, 2).join(' and ') || 'specialized modeling tools'}.`;
    } else {
      summaryText = `You are on a solid trajectory with ${matchPercentage}% coverage. Bridging gaps in ${criticalGaps.slice(0, 2).join(' and ')} will accelerate your interview readiness.`;
    }
  } else {
    summaryText = `You currently match ${matchPercentage}% of the benchmark for ${roleTitle}. By targeting the ${criticalGaps.slice(0, 3).join(', ')} sequence, you can rapidly build the required domain depth.`;
  }

  const actionAdvice = criticalGaps.length > 0
    ? `Prioritize mastering ${criticalGaps[0]} first before advancing to complex frameworks. Building one end-to-end practical project will bridge multiple gaps simultaneously.`
    : `Focus on packaging your existing projects with Docker and writing clear architectural READMEs for recruiters.`;

  // 6. Generate Roadmap & Project Recommendations
  const learningRoadmap = generatePersonalizedRoadmap(
    roleTitle,
    matchedSkills,
    developingSkills,
    missingSkills
  );

  const { primary: recommendedProject, alternatives: alternativeProjects } = recommendProjectForGaps(
    roleTitle,
    missingSkills,
    developingSkills,
    matchedSkills
  );

  return {
    roleTitle,
    targetSource,
    totalRequired,
    matchPercentage,
    matchedSkills,
    developingSkills,
    missingSkills,
    scoreBreakdown: {
      matchedCount,
      developingCount,
      missingCount,
      matchedPoints,
      developingPoints,
      totalPossiblePoints,
      formulaExplanation,
    },
    gapExplanation: {
      summary: summaryText,
      foundationalStrengths,
      criticalGaps,
      actionAdvice,
    },
    learningRoadmap,
    recommendedProject,
    alternativeProjects,
    isAiEnhanced: false,
    analyzedAt: new Date().toISOString(),
  };
}

/**
 * Recalculates simulated match percentage for Feature 8: "What-If Simulator"
 */
export function simulateCoverage(
  initialResult: AnalysisResult,
  simulatedLearnedSkills: string[]
): {
  simulatedPercentage: number;
  deltaPercentage: number;
  newlyMasteredCount: number;
  updatedSkillsBreakdown: {
    matched: string[];
    stillDeveloping: string[];
    stillMissing: string[];
  };
} {
  const learnedSet = new Set(simulatedLearnedSkills.map(s => s.toLowerCase()));

  const matchedSet = new Set(initialResult.matchedSkills.map(s => s.name.toLowerCase()));
  const developingSet = new Set(initialResult.developingSkills.map(s => s.name.toLowerCase()));
  const missingSet = new Set(initialResult.missingSkills.map(s => s.name.toLowerCase()));

  let simulatedMatchedCount = initialResult.matchedSkills.length;
  let simulatedDevelopingCount = 0;
  let simulatedMissingCount = 0;

  const finalMatched: string[] = [...initialResult.matchedSkills.map(s => s.name)];
  const finalDeveloping: string[] = [];
  const finalMissing: string[] = [];

  // Check developing skills
  for (const s of initialResult.developingSkills) {
    if (learnedSet.has(s.name.toLowerCase())) {
      simulatedMatchedCount++;
      finalMatched.push(s.name);
    } else {
      simulatedDevelopingCount++;
      finalDeveloping.push(s.name);
    }
  }

  // Check missing skills
  for (const s of initialResult.missingSkills) {
    if (learnedSet.has(s.name.toLowerCase())) {
      simulatedMatchedCount++;
      finalMatched.push(s.name);
    } else {
      simulatedMissingCount++;
      finalMissing.push(s.name);
    }
  }

  const total = initialResult.totalRequired || 1;
  const rawSim = ((simulatedMatchedCount * 1.0 + simulatedDevelopingCount * 0.5) / total) * 100;
  const simulatedPercentage = Math.min(100, Math.max(0, Math.round(rawSim)));
  const deltaPercentage = simulatedPercentage - initialResult.matchPercentage;
  const newlyMasteredCount = simulatedLearnedSkills.length;

  return {
    simulatedPercentage,
    deltaPercentage,
    newlyMasteredCount,
    updatedSkillsBreakdown: {
      matched: finalMatched,
      stillDeveloping: finalDeveloping,
      stillMissing: finalMissing,
    },
  };
}
