import 'dotenv/config';
import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { analyzeProfile, extractSkillsFromJobDescription } from './src/services/skillMatchingEngine';
import { PRESET_JOB_ROLES, DEMO_PRESETS, COMMON_SKILLS } from './src/data/skillsData';
import { enhanceAnalysisWithGemini, extractSkillsWithGemini } from './server/geminiService';

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API endpoints
  app.get('/api/health', (req, res) => {
    res.json({
      status: 'ok',
      service: 'SkillLens Backend',
      hasGeminiKey: Boolean(process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== 'MY_GEMINI_API_KEY'),
    });
  });

  app.get('/api/data', (req, res) => {
    res.json({
      roles: PRESET_JOB_ROLES,
      presets: DEMO_PRESETS,
      commonSkills: COMMON_SKILLS,
    });
  });

  app.post('/api/analyze', async (req, res) => {
    try {
      const { skills, role, jobDescription } = req.body;
      const userSkills = Array.isArray(skills) ? skills : [];
      const targetRole = typeof role === 'string' ? role : 'Machine Learning Intern';
      const jd = typeof jobDescription === 'string' ? jobDescription : '';

      // Perform reliable core algorithmic analysis first
      const baseResult = analyzeProfile(userSkills, targetRole, jd);

      // Enhance with Gemini if key is provided and available
      const finalResult = await enhanceAnalysisWithGemini(
        baseResult,
        userSkills,
        targetRole,
        jd
      );

      res.json(finalResult);
    } catch (error: any) {
      console.error('Error analyzing profile:', error);
      res.status(500).json({
        error: 'Failed to analyze skill profile',
        details: error?.message || 'Unknown server error',
      });
    }
  });

  app.post('/api/extract-jd', async (req, res) => {
    try {
      const { jobDescription } = req.body;
      if (!jobDescription || typeof jobDescription !== 'string') {
        return res.status(400).json({ error: 'Job description text required' });
      }

      // Try AI extraction first, fallback to regex extractor
      let extracted = await extractSkillsWithGemini(jobDescription);
      if (!extracted || extracted.length === 0) {
        const details = extractSkillsFromJobDescription(jobDescription);
        extracted = details.map(d => d.name);
      }

      res.json({ skills: extracted });
    } catch (error: any) {
      console.error('Error extracting job description:', error);
      res.status(500).json({ error: 'Failed to extract skills from job description' });
    }
  });

  // Vite middleware in development or static serving in production
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`SkillLens server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
