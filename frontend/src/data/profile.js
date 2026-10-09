/**
 * Verified profile configuration for Palleti Vamshi
 * Grounded strictly in verified facts. No fabricated statistics, metrics, or titles.
 */

export const profile = {
  name: 'Palleti Vamshi',
  handle: 'VAMSHI',
  college: 'VNR VJIET',
  degree: 'B.Tech Artificial Intelligence & Machine Learning',
  year: '2nd Year',
  graduation: 2029,
  cgpa: '9.9 / 10',
  location: 'Hyderabad, Telangana, India',
  awsVolunteer: 'AWS Student Builder Group volunteer in Tech & Innovation',

  // Verified Academic Milestones
  education: [
    {
      institution: 'VNR VJIET',
      degree: 'B.Tech in Artificial Intelligence & Machine Learning',
      timeline: 'Expected Graduation: 2029',
      score: 'Current CGPA 9.9/10',
      isCurrent: true
    },
    {
      institution: 'Narayana Junior College',
      degree: 'Intermediate',
      score: '987 marks'
    },
    {
      institution: 'Pratibha Model High School',
      degree: 'School',
      score: 'score 9.7'
    }
  ],

  // Verified Competitive Achievements
  achievements: [
    {
      title: 'Code Frenzy',
      rank: '22nd rank'
    }
  ],

  hero: {
    kicker: '01 / AI • DSA • BUILDING',
    headline: 'I BUILD TO UNDERSTAND.',
    supportingCopy:
      "I'm a second-year AI/ML student at VNR VJIET, Hyderabad, exploring artificial intelligence, machine learning, data structures, competitive programming, and emerging technologies through hands-on projects.",
    currentlyExploring: [
      { label: 'AI / ML', desc: 'Neural architectures & explainable systems' },
      { label: 'DSA & Competitive Programming', desc: 'Algorithmic optimization & complexity analysis' },
      { label: 'Emerging Technologies', desc: 'Edge intelligence & modern full-stack platforms' }
    ]
  },

  about: {
    sectionNum: '01',
    title: 'ABOUT',
    bio: [
      "I am an undergraduate student in Artificial Intelligence and Machine Learning at VNR Vignana Jyothi Institute of Engineering and Technology (VNR VJIET), Hyderabad, graduating in 2029.",
      "My engineering approach centers around building foundational systems from first principles. Rather than relying on black-box abstractions, I focus on deeply understanding algorithmic complexity, data structures, and the mathematical mechanics driving intelligent systems.",
      "Currently in my second year, I split my time between competitive problem solving in C++, experimenting with applied machine learning models in Python, and building clean, decoupled full-stack applications with modern web standards."
    ],
    details: [
      { label: 'Name', value: 'Palleti Vamshi' },
      { label: 'Institution', value: 'VNR VJIET, Hyderabad' },
      { label: 'Degree', value: 'B.Tech Artificial Intelligence & Machine Learning' },
      { label: 'Expected Graduation', value: '2029' },
      { label: 'CGPA', value: '9.9 / 10' },
      { label: 'Current Standing', value: '2nd Year' },
      { label: 'Location', value: 'Hyderabad, India' },
      { label: 'Core Focus', value: 'AI/ML, DSA, Competitive Programming, Full-Stack Systems' }
    ]
  },

  problemSolving: {
    sectionNum: '02',
    title: 'HOW I APPROACH A PROBLEM',
    steps: [
      {
        number: '01',
        name: 'Observe',
        tagline: 'Examine constraints and context',
        description: 'Analyze real-world constraints, data inputs, and system boundaries carefully before writing code.'
      },
      {
        number: '02',
        name: 'Define',
        tagline: 'Isolate the core technical bottleneck',
        description: 'Formulate precise mathematical or computational goals, identifying invariants and edge cases.'
      },
      {
        number: '03',
        name: 'Explore',
        tagline: 'Evaluate trade-offs',
        description: 'Compare alternative data structures, algorithmic paradigms, and space/time complexity profiles.'
      },
      {
        number: '04',
        name: 'Build',
        tagline: 'Construct minimal, robust code',
        description: 'Implement modular, cleanly structured logic prioritizing clarity, safety, and maintainability.'
      },
      {
        number: '05',
        name: 'Test',
        tagline: 'Verify boundaries rigorously',
        description: 'Subject implementations to boundary cases, stress inputs, and performance profiling.'
      },
      {
        number: '06',
        name: 'Iterate',
        tagline: 'Refine from feedback',
        description: 'Profile execution bottlenecks, eliminate redundant overhead, and refactor for production resilience.'
      }
    ]
  },

  focusAreas: [
    {
      id: 'ai-ml',
      title: 'Artificial Intelligence / Machine Learning',
      summary:
        'Developing practical machine learning models with strong theoretical foundations, focusing on model explainability, evaluation rigor, and low-latency inference on constrained hardware.'
    },
    {
      id: 'dsa',
      title: 'Data Structures & Algorithms',
      summary:
        'Systematic study of graph algorithms, dynamic programming, tree traversals, and combinatorial optimization, analyzing theoretical lower bounds and practical cache-friendly patterns.'
    },
    {
      id: 'cp',
      title: 'Competitive Programming',
      summary:
        'Regular practice solving time-constrained algorithmic challenges in C++, training rapid pattern recognition, numerical precision handling, and edge-case resilience.'
    },
    {
      id: 'fullstack',
      title: 'Full-Stack Development',
      summary:
        'Building decoupled web services with React and Node.js/Express, emphasizing layered architecture, strict API contracts, security middleware, and responsive interfaces.'
    },
    {
      id: 'emerging-tech',
      title: 'Emerging Technologies',
      summary:
        'Tracking breakthroughs in retrieval-augmented generation (RAG), edge computing pipelines, and lightweight security architectures for connected embedded devices.'
    }
  ],

  projects: [
    {
      id: 'lightx-ids',
      title: 'LightX-IDS',
      subtitle: 'Lightweight Explainable Real-Time Intrusion Detection System for Industrial IoT Networks',
      description:
        'An architectural prototype designed to provide real-time network anomaly detection for Industrial IoT environments. Addresses the critical challenge of high-precision intrusion classification under constrained compute environments while incorporating explainable AI (XAI) mechanisms so security engineers can audit prediction rationale.',
      domains: ['AI / ML', 'Network Security', 'Industrial IoT', 'Explainable AI'],
      status: 'Active Prototype / Research & Development',
      highlights: [
        'Explores lightweight feature reduction for low-latency inference',
        'Prioritizes model explainability for industrial telemetry auditing',
        'Engineered for resource-constrained device environments'
      ],
      githubUrl: 'https://github.com/palleti-vamshi'
    },
    {
      id: 'smart-campus',
      title: 'Smart Campus Management System',
      subtitle: 'Smart Campus Management System',
      description:
        'A multi-module software platform engineered to consolidate campus administrative workflows, departmental communications, and student resource coordination through structured, role-based interfaces and modular REST API services.',
      domains: ['Full-Stack', 'System Architecture', 'Campus Operations'],
      status: 'In Development',
      highlights: [
        'Modular backend architecture with clean API boundaries',
        'Role-oriented views for students, faculty, and administrative staff',
        'Structured database schemas designed for maintainable scaling'
      ],
      githubUrl: 'https://github.com/palleti-vamshi'
    }
  ],

  toolbox: {
    categories: [
      {
        name: 'Languages',
        skills: [
          { name: 'C++', level: 'Comfortable', note: 'Core language for DSA & competitive problem solving' },
          { name: 'Python', level: 'Comfortable', note: 'Primary environment for ML modeling, data analysis & automation' },
          { name: 'JavaScript (ES6+)', level: 'Comfortable', note: 'Frontend client logic and Node.js backend runtimes' }
        ]
      },
      {
        name: 'AI / ML',
        skills: [
          { name: 'Machine Learning Foundations', level: 'Learning', note: 'Supervised/unsupervised algorithms, evaluation methodologies' },
          { name: 'Deep Learning Concepts', level: 'Learning', note: 'Neural network representations, feedforward & convolution principles' },
          { name: 'Explainable AI (XAI)', level: 'Exploring', note: 'Feature importance and interpretability in security models' }
        ]
      },
      {
        name: 'Development',
        skills: [
          { name: 'React', level: 'Comfortable', note: 'Component architecture, reactive state, modular UI systems' },
          { name: 'Node.js & Express', level: 'Comfortable', note: 'Modular REST routing, service layers, security middleware' },
          { name: 'HTML5 & Modern CSS', level: 'Comfortable', note: 'Semantic structure, CSS variables, responsive layout design' }
        ]
      },
      {
        name: 'Data / Backend',
        skills: [
          { name: 'REST API Design', level: 'Comfortable', note: 'HTTP status codes, structured envelopes, rate limiting' },
          { name: 'Relational Database Concepts', level: 'Learning', note: 'Entity-relationship modeling and query optimization' },
          { name: 'System Architecture Basics', level: 'Learning', note: 'Layered separation, security headers, CORS origin control' }
        ]
      },
      {
        name: 'Tools',
        skills: [
          { name: 'Git & GitHub', level: 'Comfortable', note: 'Version control, atomic commits, branching workflows' },
          { name: 'Linux CLI & Bash', level: 'Comfortable', note: 'Shell navigation, process management, development workflows' },
          { name: 'VS Code', level: 'Comfortable', note: 'Primary IDE, debugging configurations, editor extensions' },
          { name: 'Vite', level: 'Comfortable', note: 'Modern frontend build orchestration and dev server' }
        ]
      }
    ]
  },

  socials: {
    github: 'https://github.com/palleti-vamshi',
    linkedin: 'https://www.linkedin.com/in/vamshi-palleti-466001344',
    email: 'vamshipalleti18@gmail.com'
  },
  links: {
    github: 'https://github.com/palleti-vamshi',
    linkedin: 'https://www.linkedin.com/in/vamshi-palleti-466001344',
    email: 'vamshipalleti18@gmail.com'
  }
};
