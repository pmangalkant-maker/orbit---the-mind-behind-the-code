import { PortfolioData } from '../types/portfolio.ts';

export const initialPortfolioData: PortfolioData = {
  profile: {
    name: 'Mangal Kant',
    title: 'Full-Stack Web Developer | C++ Problem Solver | AI Enthusiast',
    tagline: 'Building ideas into reality.',
    bio: "I'm a developer focused on building useful web experiences, strengthening my problem-solving skills with C++, and exploring artificial intelligence. I enjoy learning by building projects, understanding how systems work, and continuously improving my technical abilities.",
    avatarUrl: '/images/mangal-kant.png',
    email: 'pmangalkant@gmail.com',
    phone: '+91 9990089179',
    linkedinUrl: 'https://www.linkedin.com/in/mangalkant-pandey-763983384',
    githubUrl: 'https://github.com/pmangalkant-maker',
    leetcodeUsername: 'the_real_mangal',
    leetcodeUrl: 'https://leetcode.com/u/the_real_mangal/',
    resumeAvailable: true,
    resumeFileName: 'Mangal_Kant_Resume.pdf'
  },
  about: {
    introduction: "I'm a developer focused on building useful web experiences, strengthening my problem-solving skills with C++, and exploring artificial intelligence. I enjoy learning by building projects, understanding how systems work, and continuously improving my technical abilities.",
    developmentInterests: 'Passionate about engineering full-stack web applications with clean architecture, responsive layouts, modular state management, and high-performance server interactions.',
    problemSolvingJourney: 'Dedicated C++ problem solver actively practicing Data Structures and Algorithms. I focus on optimizing time and space complexity, memory efficiency, and systematic debugging.',
    aiInterest: 'Actively exploring artificial intelligence, machine learning concepts, and computer vision workflows to integrate intelligent automation into real-world applications.',
    learningGoals: 'Currently strengthening machine learning foundations, mastering advanced algorithmic paradigms in C++, and expanding cloud deployment & scalable backend practices.'
  },
  skills: [
    {
      category: 'Development',
      description: 'Building robust, interactive client and server web applications',
      skills: [
        { name: 'Full-Stack Web Development' }
      ]
    },
    {
      category: 'Programming',
      description: 'Core languages for systems, algorithms, and scripting',
      skills: [
        { name: 'C++' },
        { name: 'Python' }
      ]
    },
    {
      category: 'Computer Science',
      description: 'Foundational principles of software engineering and algorithm design',
      skills: [
        { name: 'Object-Oriented Programming (OOP)' },
        { name: 'Data Structures and Algorithms' },
        { name: 'Problem Solving' }
      ]
    },
    {
      category: 'Artificial Intelligence',
      description: 'Intelligent systems and predictive computational models',
      skills: [
        { name: 'Artificial Intelligence (AI)' },
        { name: 'Machine Learning (ML)', tag: 'Currently Learning' }
      ]
    }
  ],
  techStack: [
    {
      category: 'Frontend Development',
      items: [
        { name: 'HTML5', iconKey: 'html5', category: 'Frontend Development' },
        { name: 'CSS3', iconKey: 'css3', category: 'Frontend Development' },
        { name: 'JavaScript', iconKey: 'javascript', category: 'Frontend Development' },
        { name: 'React.js', iconKey: 'react', category: 'Frontend Development' }
      ]
    },
    {
      category: 'Programming Languages',
      items: [
        { name: 'C', iconKey: 'c', category: 'Programming Languages' },
        { name: 'C++', iconKey: 'cpp', category: 'Programming Languages' },
        { name: 'Java', iconKey: 'java', category: 'Programming Languages' },
        { name: 'Python', iconKey: 'python', category: 'Programming Languages' }
      ]
    },
    {
      category: 'UI/UX Design',
      items: [
        { name: 'Figma', iconKey: 'figma', category: 'UI/UX Design' }
      ]
    }
  ],
  projects: [
    {
      id: 'skillmap',
      title: 'SkillMap',
      shortDescription: 'An interactive skill-mapping and career pathway visualization platform.',
      detailedDescription: 'SkillMap helps aspiring developers and engineers chart out career learning journeys, visualize node-based skill dependencies, and track tangible milestone progression.',
      overview: 'SkillMap is designed to address the fragmented nature of modern software learning paths by turning career roadmaps into an interactive visual graph.',
      problem: 'Learners frequently struggle with understanding prerequisite technologies and prioritizing what to master next for a specific career track.',
      solution: 'An intuitive graph-based curriculum visualizer that dynamically maps skill nodes, highlights completion paths, and identifies skill gaps.',
      implementedFeatures: [
        'Interactive skill node graph preview',
        'Role-targeted pathway breakdown (Frontend, Data, Systems)',
        'Progress tracking state and checklist UI'
      ],
      plannedFeatures: [
        'Industry job requirement API synchronization',
        'Dynamic resume skill gap analyzer',
        'Community-curated learning roadmaps'
      ],
      technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Graph UI'],
      status: 'In Progress',
      thumbnailUrl: '/src/assets/images/project_skillmap_1792412933391.jpg',
      githubUrl: '',
      liveDemoUrl: '',
      myContribution: 'Architected the interactive node visualization and structured the roadmap data schema.',
      lessonsLearned: 'Deepened knowledge of state orchestration for dynamic graph elements and responsive SVG/Canvas scaling.',
      date: '2025 – Present',
      featured: true
    },
    {
      id: 'medsick',
      title: 'Medsick',
      shortDescription: 'AI-assisted digital healthcare platform concept for patient triage and medical accessibility.',
      detailedDescription: 'A modern conceptual healthcare web platform aimed at streamlining patient symptom triage, vital health overview tracking, and medical consultation access.',
      overview: 'Medsick explores how modern digital interfaces and AI-assisted workflows can lower the barrier for patients seeking timely medical guidance.',
      problem: 'Navigating healthcare access can be overwhelming, with delayed appointments and lack of organized personal health metric summaries.',
      solution: 'A central patient dashboard presenting vitals, preliminary triage assessment flows, and verified practitioner directories.',
      implementedFeatures: [
        'Patient vitals tracking overview layout',
        'Preliminary intake and complaint categorization UI',
        'Emergency contact and provider directory interface'
      ],
      plannedFeatures: [
        'AI symptom triage assistance and risk estimation',
        'Secure HL7/FHIR compliant health record import',
        'Encrypted teleconsultation video messaging'
      ],
      technologies: ['React', 'TypeScript', 'Node.js', 'Tailwind CSS'],
      status: 'In Progress',
      thumbnailUrl: '/src/assets/images/project_medsick_1792412933301.jpg',
      githubUrl: '',
      liveDemoUrl: '',
      myContribution: 'Designed the complete clinical UI and established the state models for patient triage intake.',
      lessonsLearned: 'Gained crucial insight into accessibility standards, healthcare data privacy constraints, and user empathy in critical UX flows.',
      date: '2025 – Present',
      featured: true
    },
    {
      id: 'facetrace-ai',
      title: 'FaceTrace AI',
      shortDescription: 'Computer vision and biometric facial landmark detection research prototype.',
      detailedDescription: 'A planned computer vision application exploring real-time facial feature tracking, landmark coordinate mapping, and biometric telemetry feeds.',
      overview: 'FaceTrace AI is focused on understanding the fundamentals of computer vision pipelines, neural landmark detectors, and real-time video frame processing.',
      problem: 'Facial detection algorithms often require significant computational overhead, making lightweight real-time tracking a technical challenge.',
      solution: 'A lightweight visual analysis architecture designed to process facial frames efficiently and extract geometric landmark vectors.',
      implementedFeatures: [
        'System architecture and pipeline specification',
        'Biometric coordinate telemetry dashboard interface'
      ],
      plannedFeatures: [
        'Real-time webcam facial mesh tracking integration',
        'Facial attribute and orientation analysis',
        'Local edge processing model optimization'
      ],
      technologies: ['Python', 'OpenCV', 'AI / Computer Vision', 'TypeScript'],
      status: 'Planned',
      thumbnailUrl: '/src/assets/images/project_facetrace_1792412933751.jpg',
      githubUrl: '',
      liveDemoUrl: '',
      myContribution: 'Specifying the model pipeline requirements and constructing the visual inspection dashboard.',
      lessonsLearned: 'Exploring mathematical transformations behind facial landmark projections and real-time frame buffering.',
      date: 'Planned 2026',
      featured: false
    },
    {
      id: 'amazon-frontend-clone',
      title: 'Amazon Frontend Clone',
      shortDescription: 'Independent frontend practice project inspired by an e-commerce shopping interface.',
      detailedDescription: 'An independent frontend practice project recreating the core shopping experience of an e-commerce platform, including responsive product catalog grids, interactive shopping cart drawer, and dynamic pricing calculations. (Note: Independent practice project, not affiliated with Amazon).',
      overview: 'Built as an intensive frontend engineering exercise to replicate complex e-commerce user interaction patterns.',
      problem: 'Managing deeply nested product categories, responsive multi-column catalog layouts, and real-time cart state across components.',
      solution: 'Engineered a modular component architecture with centralized cart state, responsive grid layouts, and seamless modal drawers.',
      implementedFeatures: [
        'Responsive multi-column product showcase grid',
        'Interactive shopping cart drawer with live subtotal calculation',
        'Category search bar and navigation header simulation',
        'Item quantity increment/decrement and deletion controls'
      ],
      plannedFeatures: [
        'Persistent cart state using local storage',
        'Customer review rating input modal'
      ],
      technologies: ['HTML5', 'CSS3', 'JavaScript', 'React.js'],
      status: 'Completed',
      thumbnailUrl: '/src/assets/images/project_amazon_clone_1792412933889.jpg',
      githubUrl: '',
      liveDemoUrl: '',
      myContribution: 'Built the complete frontend interface from scratch, implementing responsive CSS and stateful cart management.',
      lessonsLearned: 'Mastered component lifecycle management, state synchronization between distant components, and accessible keyboard navigation in modal dialogs.',
      date: 'Completed 2025',
      featured: true
    },
    {
      id: 'python-file-manager',
      title: 'Python File Manager',
      shortDescription: 'Automated file-system utility for batch operations, directory cleanup, and disk auditing.',
      detailedDescription: 'A practical utility written in Python designed to automate repetitive file system management tasks such as sorting unorganized directories, bulk renaming, duplicate detection, and file type classification.',
      overview: 'Developed to solve personal workflow bottlenecks when managing large volumes of project files, downloads, and programming assets.',
      problem: 'Unorganized download folders and redundant files consume significant manual sorting time and disk storage.',
      solution: 'A fast, reliable Python automation script and GUI tool that scans directories recursively, organizes files by MIME type or date, and logs operations safely.',
      implementedFeatures: [
        'Recursive directory traversal and automatic categorization',
        'Safe batch renaming with conflict resolution',
        'File operations log and storage breakdown summary'
      ],
      plannedFeatures: [
        'Automated scheduled background cleanup',
        'Hash-based duplicate file detection'
      ],
      technologies: ['Python', 'OS & Shutil', 'File I/O', 'JSON Config'],
      status: 'Completed',
      thumbnailUrl: '/src/assets/images/project_python_filemgr_1792412948879.jpg',
      githubUrl: '',
      liveDemoUrl: '',
      myContribution: 'Designed and implemented the core Python scripts, exception handling, and safe rollback mechanisms.',
      lessonsLearned: 'Enhanced understanding of file system APIs, cross-platform file path resolution, and robust error handling during I/O operations.',
      date: 'Completed 2025',
      featured: true
    }
  ]
};
