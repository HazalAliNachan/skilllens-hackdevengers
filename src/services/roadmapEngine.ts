import { RoadmapStep, SkillDetail } from '../types';

export function generatePersonalizedRoadmap(
  roleTitle: string,
  matchedSkills: SkillDetail[],
  developingSkills: SkillDetail[],
  missingSkills: SkillDetail[]
): RoadmapStep[] {
  const matchedNames = new Set(matchedSkills.map(s => s.name.toLowerCase()));
  const developingNames = new Set(developingSkills.map(s => s.name.toLowerCase()));
  const missingNames = new Set(missingSkills.map(s => s.name.toLowerCase()));

  const steps: RoadmapStep[] = [];

  // Check role type
  const isML = roleTitle.toLowerCase().includes('machine learning') || 
               roleTitle.toLowerCase().includes('ai') || 
               roleTitle.toLowerCase().includes('data scientist');
  const isData = roleTitle.toLowerCase().includes('data analyst');
  const isBackend = roleTitle.toLowerCase().includes('backend');
  const isFrontend = roleTitle.toLowerCase().includes('frontend');
  const isGeneralSWE = roleTitle.toLowerCase().includes('software');

  if (isML) {
    // Phase 1: Foundations (Python, NumPy, Pandas, Stats)
    const p1Skills = ['Python', 'NumPy', 'Pandas', 'Statistics'].filter(s => 
      matchedNames.has(s.toLowerCase()) || developingNames.has(s.toLowerCase()) || missingNames.has(s.toLowerCase())
    );
    const p1AllMatched = p1Skills.length > 0 && p1Skills.every(s => matchedNames.has(s.toLowerCase()));

    steps.push({
      stepNumber: 1,
      phase: 'Phase 1: Foundations',
      title: 'Data Wrangling & Statistical Foundations',
      status: p1AllMatched ? 'completed' : 'in_progress',
      durationWeeks: p1AllMatched ? 'Mastered' : '2 Weeks',
      targetSkills: p1Skills.length ? p1Skills : ['Python', 'Pandas', 'NumPy'],
      milestoneProject: 'Clean & summarize a messy Kaggle dataset using vectorized Pandas methods',
      keyConcepts: [
        'Vectorized array math with NumPy',
        'Dataframe filtering, groupby & aggregation in Pandas',
        'Descriptive statistics, variance & standard deviation',
        'Handling null values & feature transformations',
      ],
      resources: [
        { name: 'Python Data Science Handbook', url: 'https://jakevdp.github.io/PythonDataScienceHandbook/', type: 'documentation', free: true },
        { name: 'Kaggle Pandas & Data Cleaning Tutorial', url: 'https://www.kaggle.com/learn/pandas', type: 'interactive', free: true },
      ],
    });

    // Phase 2: Exploratory Data Analysis & Feature Engineering
    const p2Skills = ['Data Analysis', 'Data Visualization', 'EDA'].filter(s =>
      matchedNames.has(s.toLowerCase()) || developingNames.has(s.toLowerCase()) || missingNames.has(s.toLowerCase())
    );
    const p2Completed = p2Skills.length > 0 && p2Skills.every(s => matchedNames.has(s.toLowerCase()));

    steps.push({
      stepNumber: 2,
      phase: 'Phase 2: Insights',
      title: 'Exploratory Data Analysis & Visualization',
      status: p2Completed ? 'completed' : (p1AllMatched ? 'in_progress' : 'upcoming'),
      durationWeeks: p2Completed ? 'Mastered' : '1-2 Weeks',
      targetSkills: p2Skills.length ? p2Skills : ['Data Visualization', 'EDA'],
      milestoneProject: 'Comprehensive EDA notebook with correlation heatmaps and automated summary charts',
      keyConcepts: [
        'Feature distribution analysis (boxplots, histograms)',
        'Correlation matrices and multicollinearity detection',
        'Visual communication with Matplotlib & Seaborn',
        'Outlier detection and imputation techniques',
      ],
      resources: [
        { name: 'Kaggle Data Visualization Course', url: 'https://www.kaggle.com/learn/data-visualization', type: 'interactive', free: true },
        { name: 'Seaborn Official Gallery & Patterns', url: 'https://seaborn.pydata.org/examples/index.html', type: 'documentation', free: true },
      ],
    });

    // Phase 3: Core Machine Learning & Scikit-learn
    const p3Skills = ['Machine Learning', 'Scikit-learn'].filter(s =>
      matchedNames.has(s.toLowerCase()) || developingNames.has(s.toLowerCase()) || missingNames.has(s.toLowerCase())
    );
    const p3Completed = p3Skills.length > 0 && p3Skills.every(s => matchedNames.has(s.toLowerCase()));

    steps.push({
      stepNumber: 3,
      phase: 'Phase 3: Core ML',
      title: 'Supervised Learning & Model Evaluation',
      status: p3Completed ? 'completed' : ((p1AllMatched && p2Completed) ? 'in_progress' : 'upcoming'),
      durationWeeks: p3Completed ? 'Mastered' : '3 Weeks',
      targetSkills: p3Skills.length ? p3Skills : ['Machine Learning', 'Scikit-learn'],
      milestoneProject: 'Train and compare 4 classification models with cross-validation on tabular benchmarks',
      keyConcepts: [
        'Train/test split, stratified K-Fold cross-validation',
        'Logistic Regression, Decision Trees, Random Forests, XGBoost',
        'Evaluation metrics: Precision, Recall, F1-Score, ROC-AUC curve',
        'Hyperparameter tuning using GridSearchCV and RandomizedSearchCV',
      ],
      resources: [
        { name: 'Scikit-learn User Guide & Tutorials', url: 'https://scikit-learn.org/stable/user_guide.html', type: 'documentation', free: true },
        { name: 'Coursera / Stanford Machine Learning (Andrew Ng)', url: 'https://www.deeplearning.ai/program/machine-learning-specialization/', type: 'course', free: true },
      ],
    });

    // Phase 4: Advanced Modeling / Deep Learning (if in role)
    const hasDeepLearning = missingNames.has('deep learning') || missingNames.has('pytorch') || 
                            developingNames.has('deep learning') || matchedNames.has('deep learning');
    if (hasDeepLearning || roleTitle.toLowerCase().includes('ai')) {
      const p4Completed = matchedNames.has('deep learning') && (matchedNames.has('pytorch') || matchedNames.has('tensorflow'));
      steps.push({
        stepNumber: 4,
        phase: 'Phase 4: Deep Learning',
        title: 'Neural Networks & PyTorch Fundamentals',
        status: p4Completed ? 'completed' : 'upcoming',
        durationWeeks: p4Completed ? 'Mastered' : '3-4 Weeks',
        targetSkills: ['Deep Learning', 'PyTorch'],
        milestoneProject: 'Build a multi-layer perceptron or CNN image classifier from scratch in PyTorch',
        keyConcepts: [
          'Tensors, forward pass, autograd & backpropagation',
          'Loss functions (CrossEntropyLoss, MSE) & Optimizers (AdamW, SGD)',
          'Convolutional layers, pooling & transfer learning',
          'Preventing overfitting: Dropout, Batch Normalization & Early Stopping',
        ],
        resources: [
          { name: 'PyTorch Official 60-Minute Blitz', url: 'https://pytorch.org/tutorials/beginner/deep_learning_60min_blitz.html', type: 'interactive', free: true },
          { name: 'Fast.ai Practical Deep Learning for Coders', url: 'https://course.fast.ai/', type: 'course', free: true },
        ],
      });
    }

    // Final Phase: Deployment, Git & Reproducibility
    const finalSkills = ['Git', 'Docker', 'Cloud'].filter(s =>
      matchedNames.has(s.toLowerCase()) || developingNames.has(s.toLowerCase()) || missingNames.has(s.toLowerCase())
    );
    const finalCompleted = finalSkills.length > 0 && finalSkills.every(s => matchedNames.has(s.toLowerCase()));

    steps.push({
      stepNumber: steps.length + 1,
      phase: 'Final Phase: MLOps',
      title: 'Model Packaging & Production Deployment',
      status: finalCompleted ? 'completed' : 'upcoming',
      durationWeeks: finalCompleted ? 'Mastered' : '2 Weeks',
      targetSkills: finalSkills.length ? finalSkills : ['Git', 'Docker', 'REST APIs'],
      milestoneProject: 'Containerize model inference script with FastAPI and Docker for cloud hosting',
      keyConcepts: [
        'Exporting serialized weights (Joblib / ONNX)',
        'Building a lightweight prediction REST API in FastAPI',
        'Creating multi-stage Dockerfiles for minimal container size',
        'Documenting input schemas and reproducing benchmarks with Git tags',
      ],
      resources: [
        { name: 'FastAPI Machine Learning Serving Guide', url: 'https://fastapi.tiangolo.com/tutorial/', type: 'documentation', free: true },
        { name: 'Docker Getting Started Guide', url: 'https://docs.docker.com/get-started/', type: 'documentation', free: true },
      ],
    });

  } else if (isData) {
    // Data Analyst Roadmap
    steps.push({
      stepNumber: 1,
      phase: 'Phase 1: Querying',
      title: 'Relational Database Mastery with SQL',
      status: matchedNames.has('sql') ? 'completed' : 'in_progress',
      durationWeeks: matchedNames.has('sql') ? 'Mastered' : '2 Weeks',
      targetSkills: ['SQL', 'Database Design'],
      milestoneProject: 'Complex multi-table cohort queries analyzing customer retention and monthly churn',
      keyConcepts: ['INNER, LEFT & FULL OUTER JOINS', 'Window functions: ROW_NUMBER, RANK, DENSE_RANK', 'Common Table Expressions (CTEs)', 'GROUP BY and HAVING aggregates'],
      resources: [
        { name: 'SQLBolt Interactive Exercises', url: 'https://sqlbolt.com/', type: 'interactive', free: true },
        { name: 'Mode Analytics SQL Tutorial', url: 'https://mode.com/sql-tutorial/', type: 'documentation', free: true },
      ],
    });

    steps.push({
      stepNumber: 2,
      phase: 'Phase 2: Analytics',
      title: 'Python for Business Analysis & Wrangling',
      status: (matchedNames.has('python') && matchedNames.has('pandas')) ? 'completed' : 'in_progress',
      durationWeeks: '2 Weeks',
      targetSkills: ['Python', 'Pandas', 'Data Analysis'],
      milestoneProject: 'Automated data hygiene and aggregation pipeline outputting structured reports',
      keyConcepts: ['Missing data imputations', 'Datetime parsing and time-series resampling', 'Pivot tables and cross-tabulation', 'Combining heterogeneous CSV/database exports'],
      resources: [
        { name: 'Pandas 10-Minute Walkthrough', url: 'https://pandas.pydata.org/docs/user_guide/10min.html', type: 'documentation', free: true },
      ],
    });

    steps.push({
      stepNumber: 3,
      phase: 'Phase 3: Visual Storytelling',
      title: 'Interactive Dashboards & Executive Storytelling',
      status: (matchedNames.has('data visualization') && matchedNames.has('tableau')) ? 'completed' : 'upcoming',
      durationWeeks: '2 Weeks',
      targetSkills: ['Data Visualization', 'Tableau'],
      milestoneProject: 'Full-featured executive dashboard with dynamic filtering and calculated KPI fields',
      keyConcepts: ['Designing visual hierarchy for non-technical stakeholders', 'Level of Detail (LOD) calculations', 'Choosing optimal chart archetypes (avoiding pie charts)', 'Color accessibility standards'],
      resources: [
        { name: 'Tableau Public Free Training Videos', url: 'https://www.tableau.com/learn/training', type: 'course', free: true },
      ],
    });

    steps.push({
      stepNumber: 4,
      phase: 'Phase 4: Applied Statistics',
      title: 'Business Statistics & Hypothesis Testing',
      status: matchedNames.has('statistics') ? 'completed' : 'upcoming',
      durationWeeks: '2 Weeks',
      targetSkills: ['Statistics', 'EDA'],
      milestoneProject: 'A/B testing simulation evaluating statistical significance and conversion lift',
      keyConcepts: ['Null hypothesis formulation & p-value interpretation', 'Two-sample t-tests and Chi-squared tests', 'Sample size estimation and statistical power', 'Detecting sampling bias and Simpson’s paradox'],
      resources: [
        { name: 'Penn State STAT 414 Public Notes', url: 'https://online.stat.psu.edu/stat414/', type: 'documentation', free: true },
      ],
    });

  } else if (isBackend) {
    // Backend Developer Roadmap
    steps.push({
      stepNumber: 1,
      phase: 'Phase 1: Core Runtime',
      title: 'Server-Side Architecture & REST APIs',
      status: (matchedNames.has('node.js') && matchedNames.has('express')) ? 'completed' : 'in_progress',
      durationWeeks: '2-3 Weeks',
      targetSkills: ['Node.js', 'Express', 'REST APIs'],
      milestoneProject: 'RESTful API with input validation, JWT authentication, and structured error responses',
      keyConcepts: ['Event loop, non-blocking I/O and stream handling', 'Middleware architecture and error handlers', 'HTTP status codes, headers, and idempotent verbs', 'Environment configuration and security headers'],
      resources: [
        { name: 'Node.js Official Guides', url: 'https://nodejs.org/en/docs/guides/', type: 'documentation', free: true },
        { name: 'MDN Express Web Framework Guide', url: 'https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Server-side/Express_Nodejs', type: 'documentation', free: true },
      ],
    });

    steps.push({
      stepNumber: 2,
      phase: 'Phase 2: Data Persistence',
      title: 'Database Schema Design & Query Optimization',
      status: (matchedNames.has('sql') && matchedNames.has('database design')) ? 'completed' : 'upcoming',
      durationWeeks: '2 Weeks',
      targetSkills: ['SQL', 'Database Design'],
      milestoneProject: 'Normalized relational schema with foreign key constraints, indexes, and transactions',
      keyConcepts: ['1NF, 2NF, 3NF Normalization rules', 'ACID transactions and isolation levels', 'B-Tree indexing and query plan EXPLAIN analysis', 'Connection pooling and ORM query optimization'],
      resources: [
        { name: 'Use The Index, Luke! (SQL Indexing Guide)', url: 'https://use-the-index-luke.com/', type: 'documentation', free: true },
      ],
    });

    steps.push({
      stepNumber: 3,
      phase: 'Phase 3: Containerization',
      title: 'Docker & Distributed Deployment',
      status: (matchedNames.has('docker') && matchedNames.has('cloud')) ? 'completed' : 'upcoming',
      durationWeeks: '2 Weeks',
      targetSkills: ['Docker', 'Git', 'Cloud'],
      milestoneProject: 'Docker Compose orchestration running a Node service, PostgreSQL database, and Redis cache',
      keyConcepts: ['Layer caching and multi-stage container builds', 'Volume mounts and container networking', 'Basic CI/CD pipeline with GitHub Actions', 'Deploying containerized microservices to cloud runtimes'],
      resources: [
        { name: 'Docker Compose Official Documentation', url: 'https://docs.docker.com/compose/', type: 'documentation', free: true },
      ],
    });

    steps.push({
      stepNumber: 4,
      phase: 'Phase 4: Systems & Scale',
      title: 'Data Structures & System Reliability',
      status: (matchedNames.has('dsa') && matchedNames.has('system design')) ? 'completed' : 'upcoming',
      durationWeeks: '3 Weeks',
      targetSkills: ['DSA', 'System Design'],
      milestoneProject: 'Rate limiter and in-memory caching layer with benchmarked throughput testing',
      keyConcepts: ['Hash tables, priority queues, and LRU caches', 'Horizontal vs vertical scaling and load balancing', 'Idempotent consumer queues and message brokers', 'Rate limiting algorithms (token bucket, leaky bucket)'],
      resources: [
        { name: 'System Design Primer on GitHub', url: 'https://github.com/donnemartin/system-design-primer', type: 'github', free: true },
      ],
    });

  } else {
    // General Software Engineering / Frontend Roadmap
    steps.push({
      stepNumber: 1,
      phase: 'Phase 1: Problem Solving',
      title: 'Data Structures & Algorithmic Problem Solving',
      status: matchedNames.has('dsa') ? 'completed' : 'in_progress',
      durationWeeks: matchedNames.has('dsa') ? 'Mastered' : '3-4 Weeks',
      targetSkills: ['DSA', 'OOP'],
      milestoneProject: 'Implement core graph traversal, binary tree operations, and sorting benchmarks',
      keyConcepts: ['Time and space complexity Big-O analysis', 'Arrays, Linked Lists, Hash Maps, Stacks, Queues', 'Trees, Binary Search, Breadth-First and Depth-First Search', 'Dynamic Programming fundamentals & memoization'],
      resources: [
        { name: 'NeetCode Roadmap & Patterns', url: 'https://neetcode.io/roadmap', type: 'interactive', free: true },
      ],
    });

    steps.push({
      stepNumber: 2,
      phase: 'Phase 2: Code Craftsmanship',
      title: 'Object-Oriented Design & Clean Architecture',
      status: (matchedNames.has('oop') && matchedNames.has('git')) ? 'completed' : 'upcoming',
      durationWeeks: '2 Weeks',
      targetSkills: ['OOP', 'Git', 'GitHub'],
      milestoneProject: 'Design a modular card game or banking system applying SOLID design principles',
      keyConcepts: ['Encapsulation, Inheritance, Polymorphism, Abstraction', 'SOLID principles and Dependency Injection', 'Branching workflows: feature branches, PR reviews, merge strategies', 'Unit testing and regression assertions'],
      resources: [
        { name: 'Refactoring Guru: Design Patterns', url: 'https://refactoring.guru/design-patterns', type: 'documentation', free: true },
      ],
    });

    steps.push({
      stepNumber: 3,
      phase: 'Phase 3: Integration',
      title: 'Database Design & Persistent Storage',
      status: (matchedNames.has('sql') || matchedNames.has('database design')) ? 'completed' : 'upcoming',
      durationWeeks: '2 Weeks',
      targetSkills: ['SQL', 'Database Design'],
      milestoneProject: 'Build and query a multi-relational database for an e-commerce inventory app',
      keyConcepts: ['Primary keys, foreign keys, and referential integrity', 'SQL queries, joins, and aggregates', 'Schema migrations and index tuning', 'Connecting database clients to application code'],
      resources: [
        { name: 'PostgreSQL Official Tutorial', url: 'https://www.postgresql.org/docs/current/tutorial.html', type: 'documentation', free: true },
      ],
    });

    steps.push({
      stepNumber: 4,
      phase: 'Phase 4: Full System',
      title: 'Full Application Deployment & Portfolio Delivery',
      status: (matchedNames.has('docker') || matchedNames.has('cloud')) ? 'completed' : 'upcoming',
      durationWeeks: '2-3 Weeks',
      targetSkills: ['Docker', 'Cloud', 'System Design'],
      milestoneProject: 'Deploy a complete end-to-end service with health checks, README, and demo video',
      keyConcepts: ['Automated deployment and containerization', 'Application logging, environment variables, and secrets', 'Writing recruiter-ready documentation and architectural diagrams', 'Technical interview storytelling using the STAR format'],
      resources: [
        { name: 'Full Stack Open', url: 'https://fullstackopen.com/en/', type: 'course', free: true },
      ],
    });
  }

  return steps;
}
