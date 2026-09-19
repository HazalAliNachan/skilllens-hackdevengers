import { JobRole, ProfilePreset } from '../types';

export const COMMON_SKILLS: { name: string; category: 'languages' | 'data' | 'ml_ai' | 'core_cs' | 'web_backend' | 'devops_tools' }[] = [
  // Languages
  { name: 'Python', category: 'languages' },
  { name: 'Java', category: 'languages' },
  { name: 'C', category: 'languages' },
  { name: 'C++', category: 'languages' },
  { name: 'JavaScript', category: 'languages' },
  { name: 'TypeScript', category: 'languages' },
  { name: 'SQL', category: 'languages' },
  
  // Data & Analytics
  { name: 'Pandas', category: 'data' },
  { name: 'NumPy', category: 'data' },
  { name: 'Data Analysis', category: 'data' },
  { name: 'Data Visualization', category: 'data' },
  { name: 'Statistics', category: 'data' },
  { name: 'EDA', category: 'data' },
  { name: 'Tableau', category: 'data' },

  // Machine Learning & AI
  { name: 'Machine Learning', category: 'ml_ai' },
  { name: 'Deep Learning', category: 'ml_ai' },
  { name: 'Scikit-learn', category: 'ml_ai' },
  { name: 'TensorFlow', category: 'ml_ai' },
  { name: 'PyTorch', category: 'ml_ai' },
  { name: 'Natural Language Processing', category: 'ml_ai' },
  { name: 'Computer Vision', category: 'ml_ai' },

  // Core Computer Science
  { name: 'DSA', category: 'core_cs' },
  { name: 'OOP', category: 'core_cs' },
  { name: 'System Design', category: 'core_cs' },
  { name: 'Database Design', category: 'core_cs' },

  // Web & Backend
  { name: 'React', category: 'web_backend' },
  { name: 'Node.js', category: 'web_backend' },
  { name: 'REST APIs', category: 'web_backend' },
  { name: 'Express', category: 'web_backend' },
  { name: 'FastAPI', category: 'web_backend' },

  // DevOps & Tools
  { name: 'Git', category: 'devops_tools' },
  { name: 'GitHub', category: 'devops_tools' },
  { name: 'Docker', category: 'devops_tools' },
  { name: 'Cloud', category: 'devops_tools' },
  { name: 'Linux', category: 'devops_tools' },
];

export const SKILL_SYNONYMS: Record<string, string> = {
  'py': 'Python',
  'python3': 'Python',
  'js': 'JavaScript',
  'javascript': 'JavaScript',
  'ts': 'TypeScript',
  'typescript': 'TypeScript',
  'cpp': 'C++',
  'c plus plus': 'C++',
  'c#': 'C#',
  'scikit': 'Scikit-learn',
  'sklearn': 'Scikit-learn',
  'scikit learn': 'Scikit-learn',
  'scikitlearn': 'Scikit-learn',
  'ml': 'Machine Learning',
  'machine-learning': 'Machine Learning',
  'dl': 'Deep Learning',
  'deep-learning': 'Deep Learning',
  'tf': 'TensorFlow',
  'tensorflow': 'TensorFlow',
  'torch': 'PyTorch',
  'pytorch': 'PyTorch',
  'data-analysis': 'Data Analysis',
  'eda': 'EDA',
  'exploratory data analysis': 'EDA',
  'data viz': 'Data Visualization',
  'dataviz': 'Data Visualization',
  'data-visualization': 'Data Visualization',
  'stats': 'Statistics',
  'dsa': 'DSA',
  'data structures': 'DSA',
  'algorithms': 'DSA',
  'data structures and algorithms': 'DSA',
  'data structures & algorithms': 'DSA',
  'oop': 'OOP',
  'object oriented programming': 'OOP',
  'reactjs': 'React',
  'react.js': 'React',
  'react js': 'React',
  'nodejs': 'Node.js',
  'node': 'Node.js',
  'node.js': 'Node.js',
  'expressjs': 'Express',
  'express.js': 'Express',
  'rest': 'REST APIs',
  'rest api': 'REST APIs',
  'restful apis': 'REST APIs',
  'apis': 'REST APIs',
  'aws': 'Cloud',
  'gcp': 'Cloud',
  'azure': 'Cloud',
  'cloud computing': 'Cloud',
  'git / github': 'GitHub',
  'k8s': 'Docker',
  'docker containers': 'Docker',
  'containerization': 'Docker',
  'numpy': 'NumPy',
  'pandas': 'Pandas',
  'sql database': 'SQL',
  'postgres': 'SQL',
  'mysql': 'SQL',
};

// Foundational prerequisites: if user has key foundations, target skill counts as "DEVELOPING" instead of completely missing
export const FOUNDATIONAL_PREREQUISITES: Record<string, string[]> = {
  'Scikit-learn': ['Python', 'Pandas', 'NumPy'],
  'Machine Learning': ['Python', 'Statistics', 'Pandas', 'NumPy'],
  'Deep Learning': ['Python', 'Machine Learning', 'NumPy'],
  'PyTorch': ['Python', 'Machine Learning'],
  'TensorFlow': ['Python', 'Machine Learning'],
  'Data Visualization': ['Python', 'Data Analysis'],
  'EDA': ['Python', 'Pandas'],
  'React': ['JavaScript'],
  'Node.js': ['JavaScript'],
  'REST APIs': ['Node.js', 'Python', 'JavaScript'],
  'Docker': ['Linux', 'Git'],
  'Cloud': ['Docker', 'Linux'],
  'System Design': ['DSA', 'OOP'],
  'FastAPI': ['Python'],
  'Express': ['Node.js', 'JavaScript'],
};

export const PRESET_JOB_ROLES: JobRole[] = [
  {
    id: 'ml-intern',
    title: 'Machine Learning Intern',
    category: 'AI & Data Science',
    level: 'Internship / Entry-Level',
    shortDescription: 'Build, evaluate, and fine-tune machine learning models with Python, Scikit-learn, and data pipelines.',
    requiredSkills: [
      { name: 'Python', importance: 'critical', category: 'languages' },
      { name: 'NumPy', importance: 'critical', category: 'data' },
      { name: 'Pandas', importance: 'critical', category: 'data' },
      { name: 'Statistics', importance: 'critical', category: 'data' },
      { name: 'Machine Learning', importance: 'critical', category: 'ml_ai' },
      { name: 'Scikit-learn', importance: 'critical', category: 'ml_ai' },
      { name: 'Data Visualization', importance: 'important', category: 'data' },
      { name: 'SQL', importance: 'important', category: 'languages' },
      { name: 'Git', importance: 'important', category: 'devops_tools' },
      { name: 'Deep Learning', importance: 'recommended', category: 'ml_ai' },
      { name: 'PyTorch', importance: 'recommended', category: 'ml_ai' },
      { name: 'Docker', importance: 'recommended', category: 'devops_tools' },
    ],
    sampleJobDescription: `We are seeking a motivated Machine Learning Intern to join our Predictive Systems team.
Responsibilities:
- Collaborate with senior data scientists to clean, transform, and analyze datasets using Python, Pandas, and NumPy.
- Train, evaluate, and benchmark baseline ML algorithms using Scikit-learn (regression, decision trees, random forests, clustering).
- Perform exploratory data analysis (EDA) and create insightful data visualizations.
- Query experimental datasets using SQL and maintain reproducible code repositories using Git & GitHub.
Requirements:
- Strong proficiency in Python and statistical modeling fundamentals.
- Hands-on experience with NumPy, Pandas, and Scikit-learn on real datasets.
- Familiarity with deep learning frameworks (PyTorch/TensorFlow) or Docker containerization is a plus.`,
  },
  {
    id: 'data-analyst',
    title: 'Data Analyst',
    category: 'Analytics & Business Intelligence',
    level: 'Internship / Junior',
    shortDescription: 'Extract insights from relational databases, perform exploratory analysis, and build reporting dashboards.',
    requiredSkills: [
      { name: 'SQL', importance: 'critical', category: 'languages' },
      { name: 'Python', importance: 'critical', category: 'languages' },
      { name: 'Pandas', importance: 'critical', category: 'data' },
      { name: 'Data Analysis', importance: 'critical', category: 'data' },
      { name: 'Data Visualization', importance: 'critical', category: 'data' },
      { name: 'Statistics', importance: 'important', category: 'data' },
      { name: 'Tableau', importance: 'important', category: 'data' },
      { name: 'EDA', importance: 'important', category: 'data' },
      { name: 'Git', importance: 'recommended', category: 'devops_tools' },
      { name: 'Database Design', importance: 'recommended', category: 'core_cs' },
    ],
    sampleJobDescription: `Seeking an aspiring Data Analyst intern to turn complex behavioral data into actionable business intelligence.
Responsibilities:
- Write optimized SQL queries to extract, aggregate, and validate records from production data warehouses.
- Cleanse, process, and investigate trends using Python (Pandas & NumPy).
- Design and maintain interactive dashboards using Tableau and Data Visualization libraries (Matplotlib/Seaborn).
- Apply statistical principles (hypothesis testing, confidence intervals, A/B metrics) to present analytical summaries.
Qualifications:
- Solid understanding of SQL joins, subqueries, and window functions.
- Experience scripting in Python for automated reporting.`,
  },
  {
    id: 'data-scientist',
    title: 'Data Scientist',
    category: 'AI & Data Science',
    level: 'Entry-Level / Graduate',
    shortDescription: 'Formulate hypotheses, design rigorous statistical experiments, and deploy predictive models.',
    requiredSkills: [
      { name: 'Python', importance: 'critical', category: 'languages' },
      { name: 'SQL', importance: 'critical', category: 'languages' },
      { name: 'Statistics', importance: 'critical', category: 'data' },
      { name: 'Pandas', importance: 'critical', category: 'data' },
      { name: 'Machine Learning', importance: 'critical', category: 'ml_ai' },
      { name: 'Scikit-learn', importance: 'critical', category: 'ml_ai' },
      { name: 'Data Analysis', importance: 'important', category: 'data' },
      { name: 'Deep Learning', importance: 'important', category: 'ml_ai' },
      { name: 'Git', importance: 'important', category: 'devops_tools' },
      { name: 'Cloud', importance: 'recommended', category: 'devops_tools' },
      { name: 'Docker', importance: 'recommended', category: 'devops_tools' },
    ],
    sampleJobDescription: `As a Data Scientist, you will spearhead end-to-end predictive modeling initiatives.
Requirements:
- Advanced statistical foundations (regression analysis, multivariate distributions, Bayesian thinking).
- Proficiency with Python, Pandas, NumPy, Scikit-learn, and SQL.
- Practical experience delivering predictive machine learning models and evaluating cross-validation metrics.
- Familiarity with cloud platforms (AWS/GCP) and containerization tools (Docker).`,
  },
  {
    id: 'ai-engineer',
    title: 'AI Engineer',
    category: 'Applied AI & LLMs',
    level: 'Internship / Junior',
    shortDescription: 'Integrate machine learning models, neural networks, and generative AI APIs into reliable software systems.',
    requiredSkills: [
      { name: 'Python', importance: 'critical', category: 'languages' },
      { name: 'Deep Learning', importance: 'critical', category: 'ml_ai' },
      { name: 'PyTorch', importance: 'critical', category: 'ml_ai' },
      { name: 'Machine Learning', importance: 'critical', category: 'ml_ai' },
      { name: 'REST APIs', importance: 'critical', category: 'web_backend' },
      { name: 'Docker', importance: 'important', category: 'devops_tools' },
      { name: 'Git', importance: 'important', category: 'devops_tools' },
      { name: 'Cloud', importance: 'important', category: 'devops_tools' },
      { name: 'FastAPI', importance: 'recommended', category: 'web_backend' },
      { name: 'DSA', importance: 'recommended', category: 'core_cs' },
    ],
    sampleJobDescription: `Join our AI Applications engineering group to deploy next-generation intelligent services.
Responsibilities:
- Build and serve inference endpoints for deep learning and LLM architectures using Python and FastAPI/REST APIs.
- Train and fine-tune PyTorch neural network pipelines.
- Package inference containers with Docker and deploy them to Cloud environments.
- Optimize model latency, token budgets, and system throughput.`,
  },
  {
    id: 'software-developer',
    title: 'Software Developer',
    category: 'Core Engineering',
    level: 'Internship / Entry-Level',
    shortDescription: 'Write robust, scalable code applying core algorithms, object-oriented design, and modern version control.',
    requiredSkills: [
      { name: 'DSA', importance: 'critical', category: 'core_cs' },
      { name: 'OOP', importance: 'critical', category: 'core_cs' },
      { name: 'Git', importance: 'critical', category: 'devops_tools' },
      { name: 'GitHub', importance: 'critical', category: 'devops_tools' },
      { name: 'Java', importance: 'important', category: 'languages' },
      { name: 'C++', importance: 'important', category: 'languages' },
      { name: 'Python', importance: 'important', category: 'languages' },
      { name: 'SQL', importance: 'important', category: 'languages' },
      { name: 'Database Design', importance: 'important', category: 'core_cs' },
      { name: 'System Design', importance: 'recommended', category: 'core_cs' },
      { name: 'Docker', importance: 'recommended', category: 'devops_tools' },
    ],
    sampleJobDescription: `We are looking for a Software Engineering Intern to develop performant features across our distributed services.
Qualifications:
- Strong grasp of Data Structures and Algorithms (DSA) and Object-Oriented Programming (OOP).
- Proficiency in at least one core language: Java, C++, or Python.
- Understanding of relational databases (SQL) and relational schema design.
- Diligent version control habits with Git and GitHub.`,
  },
  {
    id: 'frontend-developer',
    title: 'Frontend Developer',
    category: 'Web Engineering',
    level: 'Internship / Junior',
    shortDescription: 'Craft intuitive, accessible, high-performance web user interfaces using modern JavaScript and React.',
    requiredSkills: [
      { name: 'JavaScript', importance: 'critical', category: 'languages' },
      { name: 'React', importance: 'critical', category: 'web_backend' },
      { name: 'TypeScript', importance: 'critical', category: 'languages' },
      { name: 'Git', importance: 'important', category: 'devops_tools' },
      { name: 'REST APIs', importance: 'important', category: 'web_backend' },
      { name: 'Node.js', importance: 'recommended', category: 'web_backend' },
      { name: 'Docker', importance: 'recommended', category: 'devops_tools' },
    ],
    sampleJobDescription: `We are seeking a Frontend Developer Intern passionate about responsive web applications and clean UI architecture.
Key Requirements:
- Deep fluency in modern JavaScript (ES6+) and TypeScript.
- Strong hands-on experience building component architectures with React.
- Integrating backend REST APIs, managing async state, and ensuring mobile responsiveness.
- Familiarity with modern build tooling and Git-based collaborative workflows.`,
  },
  {
    id: 'backend-developer',
    title: 'Backend Developer',
    category: 'Web Engineering & Systems',
    level: 'Internship / Junior',
    shortDescription: 'Architect robust server-side services, REST APIs, database schemas, and microservice workflows.',
    requiredSkills: [
      { name: 'Node.js', importance: 'critical', category: 'web_backend' },
      { name: 'REST APIs', importance: 'critical', category: 'web_backend' },
      { name: 'SQL', importance: 'critical', category: 'languages' },
      { name: 'Database Design', importance: 'critical', category: 'core_cs' },
      { name: 'Git', importance: 'important', category: 'devops_tools' },
      { name: 'Express', importance: 'important', category: 'web_backend' },
      { name: 'Docker', importance: 'important', category: 'devops_tools' },
      { name: 'DSA', importance: 'important', category: 'core_cs' },
      { name: 'Cloud', importance: 'recommended', category: 'devops_tools' },
      { name: 'System Design', importance: 'recommended', category: 'core_cs' },
    ],
    sampleJobDescription: `Seeking a Backend Developer Intern to construct resilient backend microservices and databases.
Responsibilities:
- Implement scalable REST APIs using Node.js, Express, or Python frameworks.
- Design database schemas and write optimized SQL queries.
- Containerize services with Docker and manage version-controlled code using Git.
- Basic appreciation of system design fundamentals, caching, and authentication patterns.`,
  },
];

export const DEMO_PRESETS: ProfilePreset[] = [
  {
    id: 'cs-sophomore-ml',
    name: 'CS Student ➔ ML Intern',
    targetRole: 'Machine Learning Intern',
    badge: 'Popular Hackathon Demo',
    description: 'Has Python, Pandas, NumPy, and basic stats, but missing Scikit-learn and model validation.',
    userSkills: ['Python', 'Pandas', 'NumPy', 'Git', 'GitHub', 'EDA'],
  },
  {
    id: 'data-analyst-aspirant',
    name: 'Self-Taught ➔ Data Analyst',
    targetRole: 'Data Analyst',
    badge: 'Pivot to Analytics',
    description: 'Strong SQL and Excel foundations, developing visualization and automated reporting.',
    userSkills: ['SQL', 'Python', 'Pandas', 'Statistics'],
  },
  {
    id: 'cs-junior-swe',
    name: 'CS Junior ➔ Software Developer',
    targetRole: 'Software Developer',
    badge: 'Core CS Track',
    description: 'Strong DSA and OOP, ready to benchmark against real software engineering criteria.',
    userSkills: ['Java', 'C++', 'DSA', 'OOP', 'Git'],
  },
  {
    id: 'frontend-to-fullstack',
    name: 'Web Dev ➔ Backend Developer',
    targetRole: 'Backend Developer',
    badge: 'Full-Stack Expansion',
    description: 'Has JavaScript and Git, stepping into Node.js, SQL, Docker, and REST APIs.',
    userSkills: ['JavaScript', 'Git', 'GitHub', 'React'],
  },
];
