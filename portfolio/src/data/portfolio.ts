export interface Project {
  title: string;
  description: string;
  tech: string[]; // Changed to match data
  technologies?: string[]; // Added to match ProjectCard usage
  github: string;
  live: string;
  colab?: string; // Colab notebook link
  image?: string;
  category?: string;
  schematicId?: string;
}

export const personalInfo = {
  name: 'Munish Upadhyay',
  role: 'Full Stack & ML/AI Developer',
  tagline: 'Passionate about Python & Django | AI/ML Explorer',
  description: [
    "Results-driven Computer Science undergraduate specializing in full stack development, scalable backend engineering, and machine learning. Proficient in designing production-grade RESTful APIs, multi-agent LLM pipelines, and RAG-based systems using Python, Django, FastAPI, and React.js. Hands-on experience with cloud deployment (AWS, Render), containerization (Docker), CI/CD pipelines, and Agile SDLC.",
    "Skilled at integrating Generative AI, LLMs, and deep learning models into end-to-end applications — from model development and deployment to scalable system design. Actively targeting full-time opportunities as a Software Developer, Backend Developer, or ML/Data Science Engineer."
  ],
  bornIn: 'Delhi, India',
  dob: 'May 09, 2004',
  age: '21 Years Old',
  email: 'munishupadhyay.workspace@gmail.com',
  github: 'https://github.com/MunishUpadhyay',
  linkedin: 'https://www.linkedin.com/in/munishupadhyay09/',
  leetcode: 'https://leetcode.com/u/Munish_01',
  hackerrank: 'https://www.hackerrank.com/profile/munishupadhyay11',
  resume: '/Munish_v5.pdf' // Updated to latest PDF file path
};

export const skills = [
  // Programming Languages
  { name: 'Python', icon: '🐍', color: '#3776AB', domain: 'programming' },
  { name: 'C++', icon: '⚡', color: '#00599C', domain: 'programming' },
  { name: 'Java', icon: '☕', color: '#007396', domain: 'programming' },
  { name: 'SQL', icon: '🗄️', color: '#4479A1', domain: 'programming' },

  // Data Science, ML & AI
  { name: 'PyTorch', icon: '🔥', color: '#EE4C2C', domain: 'datascience' },
  { name: 'TensorFlow', icon: '🧠', color: '#FF6F00', domain: 'datascience' },
  { name: 'Scikit-learn', icon: '📊', color: '#F7931E', domain: 'datascience' },
  { name: 'Pandas', icon: '🐼', color: '#150458', domain: 'datascience' },
  { name: 'NumPy', icon: '🔢', color: '#013243', domain: 'datascience' },
  { name: 'OpenCV', icon: '👁️', color: '#5C3EE8', domain: 'computervision' },
  { name: 'Large Language Models / LLMs', icon: '💬', color: '#8A2BE2', domain: 'datascience' },
  { name: 'Generative AI', icon: '✨', color: '#FF1493', domain: 'datascience' },
  { name: 'RAG - Retrieval Augmented Generation', icon: '🔍', color: '#00BFFF', domain: 'datascience' },

  // Web Development & Backend Frameworks
  { name: 'Django', icon: '🎸', color: '#092E20', domain: 'web' },
  { name: 'Django REST Framework', icon: '🛡️', color: '#A30000', domain: 'web' },
  { name: 'FastAPI', icon: '⚡', color: '#009688', domain: 'web' },
  { name: 'React', icon: '⚛️', color: '#61DAFB', domain: 'web' },
  { name: 'Celery', icon: '🥦', color: '#37814A', domain: 'backend' },

  // Databases & Cache
  { name: 'MySQL', icon: '🐬', color: '#4479A1', domain: 'database' },
  { name: 'JDBC', icon: '🔌', color: '#007396', domain: 'backend' },
  { name: 'PostgreSQL', icon: '🐘', color: '#336791', domain: 'database' },
  { name: 'ChromaDB', icon: '🧬', color: '#00FFCC', domain: 'database' },
  { name: 'Redis', icon: '🔴', color: '#DC382D', domain: 'backend' },

  // DevOps & Cloud
  { name: 'Docker', icon: '🐳', color: '#2496ED', domain: 'devops' },
  { name: 'AWS', icon: '☁️', color: '#FF9900', domain: 'devops' },
  { name: 'Render', icon: '🚀', color: '#46E3B7', domain: 'devops' },
  { name: 'Vercel', icon: '▲', color: '#FFFFFF', domain: 'devops' },
  { name: 'CI/CD', icon: '🔁', color: '#10B981', domain: 'devops' },
  { name: 'Git', icon: '📦', color: '#F05032', domain: 'devops' },
  { name: 'GitHub', icon: '🐙', color: '#c9d1d9', domain: 'devops' },

  // Tools
  { name: 'Jupyter', icon: '📓', color: '#F37626', domain: 'tools' },
  { name: 'Google Colab', icon: '📔', color: '#F9AB00', domain: 'tools' },
];

export const education = [
  {
    period: 'Sep 2023 – May 2027',
    degree: 'B.Tech in Computer Science & Engineering',
    institution: 'VIT Bhopal University',
    field: 'CGPA: 9.13',
    cgpa: '9.13 CGPA',
    coursework: 'Data Structures & Algorithms, OOP, DBMS, Operating Systems, Computer Networks, Software Engineering, Machine Learning, Artificial Intelligence'
  },
  {
    period: '2021 – 2022',
    degree: 'Class 12th (Senior Secondary)',
    institution: 'Modern Public School, Delhi',
    field: 'Percentage: 87%',
    cgpa: '87%',
    coursework: 'Physics, Chemistry, Mathematics, Computer Science'
  },
  {
    period: '2019 – 2020',
    degree: 'Class 10th (Secondary)',
    institution: 'Modern Public School, Delhi',
    field: 'Percentage: 95%',
    cgpa: '95%',
    coursework: 'Mathematics, Science, Computer Science, English'
  }
];

export const experience = [
  {
    role: 'Artificial Intelligence Intern',
    company: 'Coding Jr.',
    period: 'Jun 2025 – Aug 2025',
    description: '• Designed and optimized supervised machine learning models using Python, Scikit-learn, and Pandas for feature engineering, preprocessing, and hyperparameter tuning, achieving up to 15% accuracy improvement.\n• Deployed and served trained models as scalable RESTful APIs on Render and AWS, reducing inference latency by 30% and enabling production-grade, low-latency model deployment for end users.\n• Engineered automated model evaluation pipelines using Python, Scikit-learn, and Jupyter Notebooks, cutting manual QA time by 40% and accelerating research-to-deployment cycles.\n• Managed version control using Git/GitHub; converted 3 research prototypes into production-ready deployments within an Agile sprint workflow, improving team delivery velocity by 20%.',
    tech: ['Python', 'Scikit-learn', 'Machine Learning', 'AWS', 'REST APIs', 'Render', 'Agile']
  }
];

export const projects: Project[] = [
  {
    title: 'Prahari — Real-time Civic Incident Triage Platform',
    description: 'Architected a real-time civic incident triage platform across 3 civic domains with a 5-Agent LLM pipeline (Groq LLaMA 3.3 70B / 3.1 8B). Engineered a RAG pipeline using ChromaDB and Sentence Transformers for semantic retrieval, and streamed live incident updates via WebSockets.',
    tech: ['Python', 'Django', 'Django REST Framework', 'Celery', 'Redis', 'Django Channels', 'PostgreSQL', 'ChromaDB', 'Groq LLM', 'Sentence Transformers'],
    technologies: ['Python', 'Django', 'Celery', 'Redis', 'PostgreSQL', 'ChromaDB'],
    github: 'https://github.com/MunishUpadhyay/Prahari',
    live: 'https://prahari-zbgm.onrender.com/',
    image: './projects/crop.jpg',
    category: 'MULTI-AGENT AI',
    schematicId: 'prahari'
  },
  {
    title: 'YuVA Wellness — AI-Driven Mental Health Platform',
    description: 'Engineered a real-time AI model-switching interface toggling across 3 Gemini model variants (1.5 Flash, 1.5 Pro, and 2.0) via FastAPI async endpoints. Implemented Google OAuth 2.0, bcrypt hashing, and a keyword-based crisis detection layer.',
    tech: ['Python', 'FastAPI', 'React.js', 'PostgreSQL', 'Google Gemini API', 'Google OAuth 2.0', 'Tailwind CSS', 'Framer Motion'],
    technologies: ['Python', 'FastAPI', 'React.js', 'PostgreSQL', 'Google Gemini API'],
    github: 'https://github.com/MunishUpadhyay/YuVA-Wellness',
    live: 'https://yuva-wellness.vercel.app/',
    image: './projects/tumor.jpg',
    category: 'Full Stack AI',
    schematicId: 'yuva'
  },
  {
    title: 'Brain Tumor Segmentation — BraTS 2020',
    description: 'Implemented 3D U-Net deep learning architecture in PyTorch for multi-modal MRI brain tumor segmentation. Applied intensity normalization, 3D patch-based augmentation, and volumetric preprocessing using Nibabel and NumPy.',
    tech: ['Python', 'PyTorch', '3D U-Net', 'Nibabel', 'NumPy', 'OpenCV', 'Matplotlib', 'Google Colab'],
    technologies: ['Python', 'PyTorch', '3D U-Net', 'Nibabel', 'NumPy'],
    github: 'https://github.com/MunishUpadhyay/Brain-Tumor-Segmentation-BraTS-2020-Dataset',
    live: '',
    colab: 'https://colab.research.google.com/github/MunishUpadhyay/Brain-Tumor-Segmentation-BraTS-2020-Dataset/blob/main/train_brats2020.ipynb',
    image: './projects/expense.jpg',
    category: 'Computer Vision',
    schematicId: 'tumor'
  },
  {
    title: 'Autism & ADHD Behavior Analyzer',
    description: 'Developed a vision-based behavioral analysis pipeline utilizing OpenCV and MediaPipe (pose, gaze, and facial mesh) to extract behavioral tracking vectors from video feeds. Built an interactive React-FastAPI dashboard calculating and visualizing explainable behavior scores.',
    tech: ['React', 'FastAPI', 'OpenCV', 'MediaPipe', 'Python', 'Tailwind CSS', 'Axios'],
    technologies: ['React', 'FastAPI', 'OpenCV', 'MediaPipe', 'Python'],
    github: 'https://github.com/MunishUpadhyay/autism-adhd-vision',
    live: '',
    image: './projects/expense.jpg',
    category: 'Computer Vision',
    schematicId: 'vision'
  },
  {
    title: 'AI Legal Document Classifier',
    description: 'Engineered a transformer-based NLP and OCR document classifier processing scanned legal PDFs and bilingual (Hindi/English) images. Fine-tuned a BERT model in PyTorch, leveraging Tesseract OCR and OpenCV image preprocessing to achieve automated legal document triage with page-wise majority voting.',
    tech: ['Python', 'PyTorch', 'BERT', 'Transformers', 'Tesseract OCR', 'OpenCV', 'Streamlit', 'Pandas'],
    technologies: ['Python', 'PyTorch', 'BERT', 'Tesseract OCR', 'OpenCV'],
    github: 'https://github.com/MunishUpadhyay/EPICS-LEGAL-AI',
    live: '',
    image: './projects/expense.jpg',
    category: 'NLP & Document Intelligence',
    schematicId: 'legal'
  },
  {
    title: '3D Interactive Developer Portfolio',
    description: 'A modern, high-performance developer portfolio featuring interactive 3D particle systems and a responsive skills constellation powered by React Three Fiber, Three.js, and Framer Motion. Integrates a custom circuit-board tech tree, dynamic LeetCode API metrics, and obsidian glassmorphic card layouts.',
    tech: ['React.js', 'Three.js', 'React Three Fiber', 'Tailwind CSS', 'Framer Motion', 'TypeScript', 'Vite'],
    technologies: ['React.js', 'Three.js', 'Tailwind CSS', 'TypeScript'],
    github: 'https://github.com/MunishUpadhyay/Portfolio',
    live: '',
    image: './projects/portfolio.jpg',
    category: 'Frontend & 3D Web',
    schematicId: 'portfolio'
  },
  {
    title: 'Multiple Disease Prediction System',
    description: 'Designed an interactive machine learning dashboard utilizing Support Vector Machine (SVM) and Logistic Regression models to predict Diabetes, Heart Disease, and Parkinson\'s Disease. Integrated clinical parameters and acoustic voice analysis features (jitter, shimmer, and pitch entropy) for high-accuracy diagnostic predictions.',
    tech: ['Python', 'Scikit-learn', 'Pandas', 'Streamlit', 'Streamlit Cloud', 'NumPy', 'Seaborn'],
    technologies: ['Python', 'Scikit-learn', 'Pandas', 'Streamlit', 'NumPy'],
    github: 'https://github.com/MunishUpadhyay/Multiple-Disease-Prediction',
    live: 'https://multiple-disease-prediction-sbdf.onrender.com/',
    image: './projects/crop.jpg',
    category: 'Machine Learning',
    schematicId: 'disease'
  },
  {
    title: 'Smart Crop Recommendation System',
    description: 'ML-powered agriculture system achieving 99.3% accuracy using Random Forest Classifier trained on soil and weather data.',
    tech: ['Python', 'Scikit-learn', 'Pandas', 'Streamlit', 'Flask', 'Weather API', 'Render'],
    technologies: ['Python', 'Scikit-learn', 'Pandas', 'Streamlit', 'Flask'],
    github: 'https://github.com/MunishUpadhyay/Smart-Crop-Recommendation-System',
    live: 'https://smart-crop-recommendation-system-oc1j.onrender.com/',
    image: './projects/crop.jpg',
    category: 'Machine Learning',
    schematicId: 'crop'
  },
  {
    title: 'Expense Splitter Application',
    description: 'Splitwise-inspired desktop application built in Java with real-time transaction settlement, MVC/DAO architecture, and MySQL persistence via JDBC. Supports multi-user concurrent access and trip-wise expense grouping.',
    tech: ['Java', 'JDBC', 'MySQL', 'Swing/UI'],
    technologies: ['Java', 'JDBC', 'MySQL', 'Swing'],
    github: 'https://github.com/MunishUpadhyay/Splitwise',
    live: '',
    image: './projects/expense.jpg',
    category: 'Full Stack | Desktop App',
    schematicId: 'splitter'
  }
];

export const certifications = [
  {
    title: 'Computer Networking',
    issuer: 'Coursera',
    date: 'Nov 2025',
    description: 'Comprehensive networking fundamentals covering IP addressing, TCP/IP protocols, routing, DNS resolution, and OSI model concepts.',
    link: 'https://drive.google.com/file/d/14U7FOBcHUc3cdasft1cebSRDCzokoltT/view',
    color: '#06b6d4'
  },
  {
    title: 'Introduction to Machine Learning',
    issuer: 'NPTEL',
    date: 'Apr 2025',
    description: 'Core ML algorithms, supervised and unsupervised learning, model evaluation techniques, and hands-on Python implementation.',
    link: 'https://drive.google.com/file/d/1ULUUNHSop1djGvZHy29W1BkfEHEDBlXF/view',
    color: '#10b981'
  },
  {
    title: 'Marketing Analytics',
    issuer: 'NPTEL',
    date: 'Apr 2026',
    description: 'Data-driven marketing strategies, customer segmentation, predictive modeling, campaign performance analysis, and ROI optimization using statistical and machine learning techniques.',
    link: 'https://drive.google.com/file/d/1ZaNpaJnpYeU5HKpl_3rzy320HK9Dl-Iq/view?usp=sharing',
    color: '#d946ef'
  }
];
