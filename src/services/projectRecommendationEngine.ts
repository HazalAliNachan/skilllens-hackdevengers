import { ProjectRecommendation, SkillDetail } from '../types';

export function recommendProjectForGaps(
  roleTitle: string,
  missingSkills: SkillDetail[],
  developingSkills: SkillDetail[],
  matchedSkills: SkillDetail[]
): { primary: ProjectRecommendation; alternatives: ProjectRecommendation[] } {
  const missingNames = missingSkills.map(s => s.name.toLowerCase());
  const developingNames = developingSkills.map(s => s.name.toLowerCase());
  const allGaps = [...missingNames, ...developingNames];

  const projects: ProjectRecommendation[] = [];

  // Project 1: ML / Scikit-learn / Classification focus
  if (allGaps.some(g => g.includes('scikit') || g.includes('machine learning') || g.includes('statistics') || g.includes('eda'))) {
    projects.push({
      id: 'customer-churn-prediction',
      title: 'Customer Churn Prediction & Retention Engine',
      tagline: 'End-to-End Supervised Machine Learning Pipeline with Scikit-learn & Streamlit',
      difficulty: 'Intermediate',
      estimatedHours: '15-20 hours',
      whySelected: 'Selected because your profile indicates strong foundational Python programming, but has a direct gap in hands-on Scikit-learn model evaluation and production classification algorithms.',
      skillsDeveloped: ['Machine Learning', 'Scikit-learn', 'Feature Engineering', 'Data Visualization', 'Pandas'],
      whatYouWillLearn: [
        'How to formulate a real business problem as a binary classification machine learning task',
        'Techniques for handling class imbalance (SMOTE, class weighting, stratified sampling)',
        'Benchmarking multiple classifiers (Logistic Regression, Random Forest, Gradient Boosting)',
        'Extracting feature importances to communicate business drivers to stakeholders',
        'Deploying an interactive Streamlit inference dashboard where users input customer attributes for instant churn probability'
      ],
      architectureSteps: [
        '1. Ingest Telco / SaaS customer dataset using Pandas and perform automated EDA',
        '2. Encode categorical features (One-Hot, Target Encoding) and normalize numerical distributions',
        '3. Train baseline Scikit-learn models and perform stratified 5-fold cross-validation',
        '4. Optimize hyperparameters using GridSearchCV and plot ROC-AUC / Confusion Matrices',
        '5. Export serialized model pipeline using joblib and build a 2-page Streamlit web app'
      ],
      recommendedDataset: {
        name: 'Telco Customer Churn Dataset (Kaggle)',
        description: '7,043 rows containing customer account info, services signed up for, tenure, charges, and churn flags.',
        source: 'https://www.kaggle.com/datasets/blastchar/telco-customer-churn',
      },
      portfolioDeliverables: [
        'Well-documented Jupyter Notebook with clean Markdown headings and insights',
        'Interactive Streamlit web app hosted on Streamlit Community Cloud or HuggingFace Spaces',
        'GitHub repository with environment.yml / requirements.txt and clear setup instructions'
      ],
    });
  }

  // Project 2: Deep Learning / Computer Vision / PyTorch focus
  if (allGaps.some(g => g.includes('deep learning') || g.includes('pytorch') || g.includes('tensorflow'))) {
    projects.push({
      id: 'medical-imaging-classifier',
      title: 'Chest X-Ray Pneumonia Classifier with PyTorch',
      tagline: 'Convolutional Neural Networks & Transfer Learning with Grad-CAM Explainability',
      difficulty: 'Advanced',
      estimatedHours: '20-25 hours',
      whySelected: 'Selected to bridge your specific gap in Deep Learning and PyTorch by implementing real tensor pipelines, convolutional layers, and explainability maps.',
      skillsDeveloped: ['Deep Learning', 'PyTorch', 'Computer Vision', 'Data Augmentation', 'Model Explainability'],
      whatYouWillLearn: [
        'How to load and augment image datasets using torchvision.transforms',
        'Fine-tuning pre-trained architectures (ResNet-50 / EfficientNet) with transfer learning',
        'Writing clean PyTorch training loops with validation loss tracking and early stopping',
        'Using Grad-CAM heatmaps to visually explain which image regions the model attended to',
        'Exporting models to ONNX runtime for low-latency client inference'
      ],
      architectureSteps: [
        '1. Set up PyTorch DataLoader with random rotations, color jitter, and normalization',
        '2. Load pre-trained ResNet-50 backbone and freeze early convolutional weights',
        '3. Train custom dense classification head using CrossEntropyLoss and AdamW optimizer',
        '4. Generate Grad-CAM heatmaps overlaid on sample X-ray images for verification',
        '5. Package script with a lightweight FastAPI endpoint'
      ],
      recommendedDataset: {
        name: 'NIH Chest X-ray Dataset / Kaggle Pneumonia',
        description: '5,863 JPEG images categorized into Normal and Pneumonia chest radiographs.',
        source: 'https://www.kaggle.com/datasets/paultimothymooney/chest-xray-pneumonia',
      },
      portfolioDeliverables: [
        'PyTorch training scripts with modular structure (`dataset.py`, `model.py`, `train.py`)',
        'Visual Grad-CAM diagnostic report proving model is not taking shortcuts',
        'Short 60-second video demo showing inference on unseen test scans'
      ],
    });
  }

  // Project 3: Data Analytics & SQL focus
  if (allGaps.some(g => g.includes('sql') || g.includes('data analysis') || g.includes('tableau') || g.includes('data visualization'))) {
    projects.push({
      id: 'ecommerce-cohort-analytics',
      title: 'E-Commerce Cohort Retention & Revenue Analytics',
      tagline: 'Complex SQL Data Warehouse Modeling + Interactive Tableau / Python Dashboard',
      difficulty: 'Intermediate',
      estimatedHours: '12-16 hours',
      whySelected: 'Selected because your target role demands robust SQL aggregation, customer lifecycle metrics, and executive visual storytelling.',
      skillsDeveloped: ['SQL', 'Data Analysis', 'Data Visualization', 'Tableau', 'Statistics'],
      whatYouWillLearn: [
        'Writing advanced SQL window functions (LEAD, LAG, NTILE, DENSE_RANK) on multi-million row records',
        'Building month-by-month customer retention cohort heatmaps from scratch',
        'Calculating essential SaaS/Commerce KPIs: LTV, CAC payback, Average Order Value (AOV), and repeat rates',
        'Designing executive dashboards with intuitive filter drill-downs and color contrast'
      ],
      architectureSteps: [
        '1. Load raw transactional sales data into PostgreSQL or DuckDB database',
        '2. Formulate 6 core SQL analytical views for monthly cohorts, repeat purchase cycles, and churn',
        '3. Connect SQL queries to Tableau or Streamlit/Plotly to generate interactive charts',
        '4. Write an executive summary memo detailing three strategic recommendations based on data'
      ],
      recommendedDataset: {
        name: 'Online Retail II UCI Machine Learning Repository',
        description: '1 million+ transactions from a UK-based non-store online retail vendor.',
        source: 'https://archive.ics.uci.edu/dataset/502/online+retail+ii',
      },
      portfolioDeliverables: [
        'Complete SQL file containing formatted, commented queries with explanation of CTEs',
        'Interactive Tableau Public workbook or Plotly web application',
        'PDF one-pager executive brief presenting findings in business terms'
      ],
    });
  }

  // Project 4: Full-Stack / Backend / Node.js & Docker focus
  if (allGaps.some(g => g.includes('node') || g.includes('rest') || g.includes('docker') || g.includes('backend') || g.includes('database design'))) {
    projects.push({
      id: 'distributed-api-container',
      title: 'Containerized Microservice API with Rate Limiting & PostgreSQL',
      tagline: 'Production-Grade REST API with Docker Compose, SQL Migrations & Caching',
      difficulty: 'Intermediate',
      estimatedHours: '14-18 hours',
      whySelected: 'Selected to address your backend architecture and DevOps gaps, proving you can build reliable, containerized services beyond simple scripts.',
      skillsDeveloped: ['Node.js', 'REST APIs', 'SQL', 'Database Design', 'Docker', 'Git'],
      whatYouWillLearn: [
        'Structuring modular Express/Node.js microservices with clean controller-service-repository pattern',
        'Designing ACID-compliant relational schemas with foreign keys and database migrations',
        'Writing unit and integration tests with Jest and Supertest',
        'Configuring multi-container environments with Docker Compose (Node.js + Postgres + Redis)'
      ],
      architectureSteps: [
        '1. Initialize TypeScript Node.js server with strict typing and ESLint',
        '2. Implement database migrations and queries with parameterized SQL to prevent injection',
        '3. Build token-bucket rate limiter middleware using in-memory Redis store',
        '4. Write a multi-stage Dockerfile and docker-compose.yml for zero-config local boot'
      ],
      recommendedDataset: {
        name: 'Synthetic API Workload / Mock E-commerce Catalog',
        description: 'Simulated multi-tenant database schema with product inventory and transaction logs.',
        source: 'https://github.com',
      },
      portfolioDeliverables: [
        'Single-command bootable project (`docker-compose up`)',
        'Swagger / OpenAPI interactive documentation specification',
        'CI/CD GitHub Actions workflow running automated linting and tests on pull requests'
      ],
    });
  }

  // Fallback / General Project: Algorithm & Visualizer
  if (projects.length === 0) {
    projects.push({
      id: 'algorithmic-trading-backtester',
      title: 'Algorithmic Strategy Backtester & Metrics Suite',
      tagline: 'High-Performance Python Engine for Quantitative Evaluation and Risk Modeling',
      difficulty: 'Intermediate',
      estimatedHours: '15 hours',
      whySelected: 'Selected as a versatile project that combines algorithms, data structures, quantitative statistics, and software design.',
      skillsDeveloped: ['Python', 'DSA', 'OOP', 'Data Analysis', 'Statistics'],
      whatYouWillLearn: [
        'Building object-oriented event-driven backtesting architectures',
        'Calculating quantitative finance metrics: Sharpe ratio, maximum drawdown, CAGR',
        'Optimizing algorithmic complexity for rapid historical data replay',
        'Visualizing risk-adjusted returns and benchmark comparisons'
      ],
      architectureSteps: [
        '1. Ingest daily stock ticker data using yfinance API',
        '2. Define abstract Strategy class and implement Moving Average & Momentum rules',
        '3. Simulate execution with realistic slippage and transaction fee modeling',
        '4. Generate tearsheet report with Matplotlib/Plotly'
      ],
      recommendedDataset: {
        name: 'Yahoo Finance Free Historical Daily Bars',
        description: 'Historical OHLCV data across S&P 500 equities.',
        source: 'https://pypi.org/project/yfinance/',
      },
      portfolioDeliverables: [
        'Clean, typed Python package with README and examples folder',
        'Benchmark tearsheet comparison against buy-and-hold SPY index'
      ],
    });
  }

  const primary = projects[0];
  const alternatives = projects.slice(1);

  return { primary, alternatives };
}
