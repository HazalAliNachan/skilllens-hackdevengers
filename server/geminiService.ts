import { GoogleGenAI, Type } from '@google/genai';
import { AnalysisResult } from '../src/types';

let genAIClient: GoogleGenAI | null = null;

function getGeminiClient(): GoogleGenAI | null {
  const key = process.env.GEMINI_API_KEY;
  if (!key || key === 'MY_GEMINI_API_KEY') {
    return null;
  }
  if (!genAIClient) {
    genAIClient = new GoogleGenAI({
      apiKey: key,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return genAIClient;
}

const CANDIDATE_MODELS = ['gemini-3.8-flash', 'gemini-2.5-flash', 'gemini-flash-latest'];

async function generateWithFallback(
  ai: GoogleGenAI,
  prompt: string,
  config: any
) {
  for (const model of CANDIDATE_MODELS) {
    // Attempt up to 2 times per model if 503/429
    for (let attempt = 1; attempt <= 2; attempt++) {
      try {
        const response = await ai.models.generateContent({
          model,
          contents: prompt,
          config,
        });
        if (response && response.text) {
          return response;
        }
      } catch (err: any) {
        const statusCode = err?.status || err?.code || err?.error?.code;
        const msg = String(err?.message || '');
        const isTransient =
          statusCode === 503 ||
          statusCode === 429 ||
          msg.includes('high demand') ||
          msg.includes('UNAVAILABLE') ||
          msg.includes('RESOURCE_EXHAUSTED');

        if (isTransient && attempt < 2) {
          // Quick wait before retry
          await new Promise((resolve) => setTimeout(resolve, 400 * attempt));
          continue;
        }
        // If still transient after attempt 2, advance to the next candidate model
        if (isTransient) {
          break;
        }
        // Non-transient error, move to next model or finish
        break;
      }
    }
  }
  return null;
}

export async function enhanceAnalysisWithGemini(
  baseResult: AnalysisResult,
  userSkills: string[],
  roleTitle: string,
  jobDescription?: string
): Promise<AnalysisResult> {
  const ai = getGeminiClient();
  if (!ai) {
    return baseResult;
  }

  try {
    const prompt = `You are an elite university career coach and technical hiring advisor.
A student or internship seeker wants a skill-gap analysis for the role "${roleTitle}".
Their current skills are: ${JSON.stringify(userSkills)}.
${jobDescription ? `The target job description text is: """${jobDescription.slice(0, 1200)}"""` : ''}

The initial algorithmic analysis identified:
- Matched skills: ${JSON.stringify(baseResult.matchedSkills.map(s => s.name))}
- Developing skills: ${JSON.stringify(baseResult.developingSkills.map(s => s.name))}
- Missing skills: ${JSON.stringify(baseResult.missingSkills.map(s => s.name))}

Provide an enhanced, encouraging yet realistically sharp gap critique and project guidance for this student.
Keep your explanation concise, direct, and actionable (2-3 sentences max for the summary).
Explain why their foundations matter and what their #1 priority gap is.
Return a structured JSON with:
1. summary: A sharp, humane summary of their gap.
2. actionAdvice: One concrete high-leverage action advice.
3. projectWhySelected: A customized explanation of why the recommended project "${baseResult.recommendedProject.title}" specifically addresses their personal gap.`;

    const response = await generateWithFallback(ai, prompt, {
      responseMimeType: 'application/json',
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          summary: { type: Type.STRING },
          actionAdvice: { type: Type.STRING },
          projectWhySelected: { type: Type.STRING },
        },
        required: ['summary', 'actionAdvice', 'projectWhySelected'],
      },
    });

    if (response?.text) {
      const data = JSON.parse(response.text);
      return {
        ...baseResult,
        isAiEnhanced: true,
        gapExplanation: {
          ...baseResult.gapExplanation,
          summary: data.summary || baseResult.gapExplanation.summary,
          actionAdvice: data.actionAdvice || baseResult.gapExplanation.actionAdvice,
        },
        recommendedProject: {
          ...baseResult.recommendedProject,
          whySelected: data.projectWhySelected || baseResult.recommendedProject.whySelected,
        },
      };
    }
  } catch (err: any) {
    // Log clean message without dumping raw ApiError stack into console
    const reason = err?.message ? err.message.slice(0, 100) : 'API busy';
    console.info(`[SkillLens] Standard algorithmic analysis active (${reason})`);
  }

  return baseResult;
}

export async function extractSkillsWithGemini(jobDescription: string): Promise<string[] | null> {
  const ai = getGeminiClient();
  if (!ai) return null;

  try {
    const prompt = `Extract all core technical skills, programming languages, frameworks, and data/engineering tools mentioned in this job description.
Return a clean list of canonical skill names (e.g. Python, SQL, Docker, Scikit-learn, React).
Job Description:
"""
${jobDescription.slice(0, 2500)}
"""`;

    const response = await generateWithFallback(ai, prompt, {
      responseMimeType: 'application/json',
      responseSchema: {
        type: Type.ARRAY,
        items: { type: Type.STRING },
      },
    });

    if (response?.text) {
      const skills = JSON.parse(response.text);
      if (Array.isArray(skills) && skills.length > 0) {
        return skills;
      }
    }
  } catch (err: any) {
    const reason = err?.message ? err.message.slice(0, 100) : 'API busy';
    console.info(`[SkillLens] Fallback to regex job extractor (${reason})`);
  }
  return null;
}
