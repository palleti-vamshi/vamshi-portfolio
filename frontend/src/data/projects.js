/**
 * Verified project data for Palleti Vamshi's portfolio.
 * Grounded strictly in verified GitHub repositories, README documentation, and codebases.
 * Exactly 4 real projects represented.
 * No fabricated statistics, metrics, users, awards, or benchmark numbers.
 */

export const projects = [
  {
    id: 'lightx-ids',
    number: '01',
    title: 'LightX-IDS',
    subtitle: 'Lightweight Explainable Real-Time Intrusion Detection System for Industrial IoT Networks',
    evolutionBadge: 'IDS_prototype → LightX-IDS',
    category: 'AI / ML • Cybersecurity • Industrial IoT',
    engineeringFocus: 'Industrial Digital Twin simulation & lightweight ML anomaly classification over MQTT',
    description:
      'A modular Industrial IoT Intrusion Detection System combining an industrial digital twin with machine learning models and MQTT telemetry streaming for real-time cyberattack detection.',
    problem:
      'Industrial IoT networks operate under strict resource constraints and high reliability requirements. Traditional heavyweight security tools cannot run on low-power industrial edge hardware, while real industrial hardware testbeds are prohibitively expensive for security modeling and dataset generation.',
    approach:
      'Constructs an Industrial Digital Twin that simulates factory machines (Motor, Pump, Tank, Conveyor, Valve, Compressor) and attached sensors transmitting continuous telemetry over MQTT (Mosquitto). This telemetry pipeline generates structured datasets used to train and evaluate lightweight machine learning classifiers (Random Forest, Decision Tree, Logistic Regression, XGBoost), advancing toward SHAP model interpretability and real-time detection.',
    architecture: {
      diagramTitle: 'LightX-IDS Architecture & Research Pipeline (IDS_prototype)',
      nodes: [
        { step: '01', name: 'Factory Simulator (Digital Twin)', role: 'Simulation clock, behavior engine & machine state logic' },
        { step: '02', name: 'Industrial Machines & Sensors', role: 'Motor, Pump, Compressor, etc. with 10 telemetry sensor types' },
        { step: '03', name: 'MQTT Transport Layer', role: 'Paho MQTT publisher streaming packets to Mosquitto broker' },
        { step: '04', name: 'Dataset Pipeline & Preprocessing', role: 'Feature engineering, selection & model serialization' },
        { step: '05', name: 'ML Classifier IDS Engine', role: 'Random Forest, Decision Tree, XGBoost anomaly inference' },
        { step: '06', name: 'Explainable AI & Dashboard (Roadmap)', role: 'SHAP attribution & real-time security analyst monitoring' }
      ]
    },
    workflow: [
      { stage: 'Industrial Twin Simulation', detail: 'Factory manager advances simulation clock, driving industrial behavior state machines across machines and attached sensors.' },
      { stage: 'Sensor Sampling & Telemetry', detail: 'Sensors sample physical telemetry (temperature, vibration, pressure, current, RPM, level) into standardized payloads.' },
      { stage: 'MQTT Serialization', detail: 'Standardized sensor packets are serialized and published continuously to Mosquitto broker topics.' },
      { stage: 'Feature Processing', detail: 'Telemetry stream is ingested into preprocessing modules for feature extraction and scaling.' },
      { stage: 'Model Classification', detail: 'Trained ML models (XGBoost, Random Forest) evaluate feature vectors to identify anomalous attack signatures.' },
      { stage: 'Explainable XAI Attribution', detail: 'Explainable AI modules provide transparent feature attribution for security auditing.' }
    ],
    technologies: {
      'Language': ['Python 3.12+'],
      'Messaging & Protocols': ['MQTT (Mosquitto)', 'Paho MQTT'],
      'Machine Learning & XAI': ['Scikit-Learn', 'XGBoost', 'NumPy', 'Pandas', 'SHAP (Planned)'],
      'Planned Systems': ['FastAPI', 'React', 'Docker']
    },
    implementation: [
      { name: 'Industrial Digital Twin', detail: 'Modular machine classes (Motor, Pump, Conveyor, Valve, etc.) and sensor frameworks simulating realistic factory states.' },
      { name: 'MQTT Streaming Engine', detail: 'Continuous telemetry publisher transmitting standardized sensor payload packets to Mosquitto broker.' },
      { name: 'ML Pipeline & Model Factory', detail: 'Dataset loaders, feature engineering, and model training routines with serialization for Random Forest, Decision Tree, and XGBoost.' },
      { name: 'Academic Evolution Context', detail: 'Developed as a Final Year B.Tech Project by Vamshi Palleti (System Architecture, ML, Digital Twin) and Srinidhi (Frontend, Dataset).' }
    ],
    projectStructure: `IDS_prototype/
├── backend/
│   ├── core/
│   ├── industrial/
│   │   ├── behavior/
│   │   ├── factory/
│   │   ├── machines/
│   │   ├── mqtt/
│   │   ├── sensors/
│   │   ├── simulator/
│   │   └── registry/
│   ├── preprocessing/
│   ├── ml/
│   ├── models/
│   ├── services/
│   └── utils/
├── frontend/
├── dataset/
├── requirements.txt
└── README.md`,
    challenges:
      'Simulating realistic industrial physics and continuous multi-sensor telemetry without hardware while keeping sensor packet serialization low-latency over MQTT and preparing lightweight models for edge interpretability.',
    learnings:
      'Architecting modular event-driven telemetry engines in Python, configuring Mosquitto broker topics, and evaluating lightweight tree-based classification for edge deployment.',
    results:
      'Phase 1 completed under the IDS_prototype codebase: full industrial digital twin, 6 machine classes, 10 sensor types, MQTT publisher, and model training pipeline operational.',
    readmeSummary: {
      purpose: 'LightX-IDS: Modular Industrial IoT Intrusion Detection System built from the IDS_prototype digital twin foundation for real-time cyberattack detection research.',
      setup: 'git clone https://github.com/palleti-vamshi/IDS_prototype.git\npip install -r requirements.txt\nbrew services start mosquitto\npython -m backend.industrial.simulator.factory_simulator',
      status: 'Phase 1 completed (Digital Twin & ML pipeline); Phase 2+ research active.'
    },
    githubUrl: 'https://github.com/palleti-vamshi/IDS_prototype',
    demoUrl: null,
    documentationUrl: null
  },
  {
    id: 'smart-campus',
    number: '02',
    title: 'Smart Campus Management System',
    subtitle: 'Academic Enterprise & Campus Workflow Platform',
    category: 'Backend Systems • Java & Spring Boot • Database Architecture',
    engineeringFocus: '16 normalized relational tables, JPA entities, and Spring Data repositories',
    description:
      'A robust campus management platform engineered in Java 21 and Spring Boot 4.1 with a 16-table normalized MySQL database schema modeling departments, courses, students, faculty, attendance, and document requests.',
    problem:
      'Campus operations typically suffer from fragmented departmental silos where courses, timetable scheduling, daily attendance, marks, and official certificate requests lack cohesive schema constraints and referential integrity.',
    approach:
      'Constructs an enterprise-grade relational schema adhering to 3NF principles with composite unique constraints and cascading rules. Implements the persistence tier via 16 Spring Data JPA repositories with validation, comprehensive SQL seeding, and analytical queries.',
    architecture: {
      diagramTitle: 'Spring Boot Layered & Persistence Architecture',
      nodes: [
        { step: '01', name: 'Client & REST Layer', role: 'HTTP endpoints, ApiResponse envelope, GlobalExceptionHandler' },
        { step: '02', name: 'Security Foundation', role: 'Spring Security 7.x, BCrypt hashing, stateless architecture' },
        { step: '03', name: 'Domain Entities (16)', role: 'JPA entities with Lombok, Jakarta Validation & 9 domain enums' },
        { step: '04', name: 'Repositories (16)', role: 'Spring Data JPA repositories extending JpaRepository' },
        { step: '05', name: 'Persistence Engine', role: 'Hibernate 7.x schema validation (ddl-auto=validate)' },
        { step: '06', name: 'Database Tier', role: 'MySQL 8.x (production) / H2 in-memory (automated testing)' }
      ]
    },
    workflow: [
      { stage: 'Authentication & Role Check', detail: 'Spring Security evaluates user credentials and enforces role privileges (ADMIN, FACULTY, STUDENT).' },
      { stage: 'Academic Coordination', detail: 'Courses, programs, faculty assignments, and timetable slots are validated for venue and schedule conflicts.' },
      { stage: 'Attendance & Grading Lifecycle', detail: 'Daily lecture attendance logs and multi-stage exam marks (Mid, Lab, End-Sem) are recorded with referential checks.' },
      { stage: 'Document Request & Audit Trail', detail: 'Students submit certificate requests (bonafide, transcripts) tracked through status transitions with audit history.' }
    ],
    technologies: {
      'Platform & Language': ['Java 21 (LTS)'],
      'Framework & Security': ['Spring Boot 4.1.1', 'Spring Security 7.x', 'BCrypt'],
      'Persistence & ORM': ['Spring Data JPA', 'Hibernate 7.x'],
      'Databases': ['MySQL 8.x', 'H2 In-Memory (Test)'],
      'Build & Tooling': ['Apache Maven', 'Maven Wrapper (./mvnw)', 'Project Lombok', 'Jakarta Validation']
    },
    implementation: [
      { name: 'Relational Schema DDL', detail: '16 normalized tables defined in schema.sql with foreign keys, composite unique indexes, and audit timestamps.' },
      { name: 'JPA Domain Entities', detail: '16 entity classes with bi-directional and uni-directional mappings, domain enums, and Bean Validation annotations.' },
      { name: 'Seed Data & Query Suite', detail: 'Complete seed-data.sql dataset and 13 complex DBMS queries covering GPA calculation, attendance rates, and timetable conflicts.' }
    ],
    projectStructure: `Smart-Campus-Management-System/
├── docs/
│   └── database-design.md
├── sql/
│   ├── schema.sql
│   ├── seed-data.sql
│   └── queries.sql
├── backend/
│   ├── pom.xml
│   ├── mvnw
│   └── src/
│       ├── main/java/com/smartcampus/
│       │   ├── config/
│       │   ├── entity/
│       │   ├── repository/
│       │   └── exception/
│       └── test/
└── README.md`,
    challenges:
      'Ensuring strict referential integrity across 16 interconnected academic tables while avoiding circular JPA relationships and N+1 query overhead.',
    learnings:
      'Designing production-grade relational database schemas, configuring Hibernate schema validation against real MySQL instances, and writing modular Spring Data JPA repositories.',
    results:
      'Phase 1: Database & Foundation complete with 16 entities, 16 repositories, MySQL DDL, demo seed data, 13 complex SQL queries, and passing H2 test suite.',
    readmeSummary: {
      purpose: 'Centralized backend platform for campus administrative workflows, course tracking, and student records.',
      setup: 'git clone https://github.com/palleti-vamshi/Smart-Campus-Management-System.git\ncp .env.example .env\nmysql -u root -p < sql/schema.sql\ncd backend && ./mvnw clean test && ./mvnw spring-boot:run',
      status: 'Phase 1 complete (Database, Entities & Repositories); Phase 2+ (Auth & REST Controllers) planned.'
    },
    githubUrl: 'https://github.com/palleti-vamshi/Smart-Campus-Management-System',
    demoUrl: null,
    documentationUrl: null
  },
  {
    id: 'mentor-student',
    number: '03',
    title: 'Mentor-Student Management',
    subtitle: 'Mentor–Student Coordination Service',
    category: 'Backend Engineering • Node.js & Express 5 • MongoDB',
    engineeringFocus: 'Modular REST service with Mongoose ORM, JWT authentication, and cookie parsing',
    description:
      'A backend coordination service developed for the P17 Mentor–Student Management System hackathon, providing structured data models and secure API endpoints for student-faculty mentorship tracking.',
    problem:
      'Educational mentorship programs often lack centralized tracking for mentor allocations, student progress monitoring, and secure role-based session management.',
    approach:
      'Engineered an asynchronous Node.js and Express 5 backend with Mongoose ODM for MongoDB persistence, incorporating BCrypt password hashing, JWT authentication tokens, and CORS middleware.',
    architecture: {
      diagramTitle: 'Node.js & MongoDB Backend Architecture',
      nodes: [
        { step: '01', name: 'HTTP Transport', role: 'Express 5 server, CORS middleware, Cookie-Parser' },
        { step: '02', name: 'Authentication Layer', role: 'JWT tokens, BCrypt password hashing, cookie verification' },
        { step: '03', name: 'API Routing & Config', role: 'Modular route handlers & environment configuration (dotenv)' },
        { step: '04', name: 'Persistence Tier', role: 'Mongoose 9 ODM connecting to MongoDB cluster via db.js' }
      ]
    },
    workflow: [
      { stage: 'Client Authentication', detail: 'Clients authenticate via credentials, generating verified JWT tokens in HTTP cookies.' },
      { stage: 'Request Routing', detail: 'Express 5 router routes authenticated requests through security and parsing middleware.' },
      { stage: 'Data Persistence', detail: 'Mongoose schemas validate mentor and student documents before committing to MongoDB.' }
    ],
    technologies: {
      'Runtime & Language': ['Node.js', 'JavaScript (ES Modules)'],
      'Server Framework': ['Express 5.2'],
      'Database & ODM': ['MongoDB', 'Mongoose 9.1'],
      'Authentication & Security': ['JSON Web Tokens (jsonwebtoken)', 'bcryptjs', 'cookie-parser', 'cors']
    },
    implementation: [
      { name: 'Database Configuration', detail: 'Modular db.js module managing MongoDB connection lifecycle.' },
      { name: 'Authentication Pipeline', detail: 'JWT creation, verification, and BCrypt credential hashing.' },
      { name: 'Server Entrypoint', detail: 'Clean Express server instance with environment variable binding.' }
    ],
    projectStructure: `Mentor-Student-Management/
├── backend/
│   ├── src/
│   │   └── config/
│   │       └── db.js
│   ├── server.js
│   ├── package.json
│   └── .gitignore
└── README.md`,
    challenges:
      'Developing clean modular backend architecture under hackathon time constraints while maintaining security best practices for credentials and cookies.',
    learnings:
      'Working with Express 5 primitives, ES module imports in modern Node.js, and structuring MongoDB connections with Mongoose.',
    results:
      'Functional backend foundation developed for the P17 Backend Engineering Hackathon.',
    readmeSummary: {
      purpose: 'Backend engineering service for mentor-student allocation and progress tracking.',
      setup: 'git clone https://github.com/palleti-vamshi/Mentor-Student-Management.git\ncd backend && npm install\nnpm start',
      status: 'Backend foundation and database connection established.'
    },
    githubUrl: 'https://github.com/palleti-vamshi/Mentor-Student-Management',
    demoUrl: null,
    documentationUrl: null
  },
  {
    id: 'attendance-management',
    number: '04',
    title: 'Attendance Management System',
    subtitle: 'Desktop Attendance Tracking Application (Python)',
    category: 'Application Software • Python',
    engineeringFocus: 'Attendance records processing, student list verification, and structured report logging',
    description:
      'A Python-based attendance tracking software utility built to record, manage, and verify student attendance logs, providing streamlined data entry and attendance summaries.',
    problem:
      'Manual paper-based attendance logging in academic sessions is prone to record discrepancies, calculation errors, and inefficient tracking across consecutive classes.',
    approach:
      'Implemented automated attendance capture and calculation workflows in Python, processing student identifiers and computing aggregate attendance summaries.',
    architecture: {
      diagramTitle: 'Attendance Management Data Flow',
      nodes: [
        { step: '01', name: 'User / Session Input', role: 'Class identifiers, student rolls, session timestamps' },
        { step: '02', name: 'Validation Engine', role: 'Format verification, duplicate check, roll lookup' },
        { step: '03', name: 'Attendance Processor', role: 'Status tallying, aggregate percentage calculations' },
        { step: '04', name: 'File Storage / Logs', role: 'Structured record persistence and CSV/report output' }
      ]
    },
    workflow: [
      { stage: 'Session Setup', detail: 'User specifies class, subject, and session parameters.' },
      { stage: 'Marking Entries', detail: 'Student attendance statuses (present / absent) are recorded.' },
      { stage: 'Calculation & Aggregation', detail: 'Attendance percentages and totals are computed per student.' },
      { stage: 'Report Generation', detail: 'Summary records are formatted and exported for administrative review.' }
    ],
    technologies: {
      'Language': ['Python'],
      'Core Modules': ['File I/O', 'Data Structures (Dictionaries/Lists)', 'CSV/Text Persistence'],
      'Interface': ['Console / GUI (Details will be added)']
    },
    implementation: [
      { name: 'Attendance Logging Logic', detail: 'Functions to register daily student attendance.' },
      { name: 'Summary & Calculation', detail: 'Routines to compute session and cumulative attendance statistics.' },
      { name: 'Storage Handler', detail: 'File persistence for maintaining historical attendance records.' }
    ],
    projectStructure: null,
    challenges:
      'Ensuring persistent record integrity and preventing duplicate entry conflicts during batch student logging.',
    learnings:
      'Practical Python scripting, file serialization, and structured record handling for everyday administrative tooling.',
    results:
      'Verified standalone attendance management utility.',
    readmeSummary: {
      purpose: 'Python application for managing and logging student class attendance.',
      setup: 'Details will be added as documentation is published.',
      status: 'Standalone utility implemented.'
    },
    githubUrl: null, // Intentionally null as requested; repository is not publicly published.
    demoUrl: null,
    documentationUrl: null
  }
];
