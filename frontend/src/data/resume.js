import { profile } from './profile.js';
import { projects } from './projects.js';

/**
 * Structured resume data for Palleti Vamshi.
 * Derived strictly from verified portfolio facts.
 * Single source of truth for PDF generation and resume components.
 */

export const resumeData = {
  personal: {
    name: profile.name,
    title: 'Undergraduate Student in Artificial Intelligence & Machine Learning',
    location: profile.location,
    email: profile.socials.email,
    college: profile.college,
    degree: profile.degree,
    year: profile.year,
    graduation: profile.graduation,
    cgpa: profile.cgpa,
    links: {
      github: {
        label: 'GitHub',
        url: profile.socials.github,
        username: 'palleti-vamshi'
      },
      linkedin: {
        label: 'LinkedIn',
        url: profile.socials.linkedin,
        username: 'vamshi-palleti'
      },
      leetcode: {
        label: 'LeetCode',
        url: 'https://leetcode.com/u/vamsh_i2007/',
        username: 'vamsh_i2007'
      },
      codechef: {
        label: 'CodeChef',
        url: 'https://www.codechef.com/users/vamsh_i2007',
        username: 'vamsh_i2007'
      },
      codeforces: {
        label: 'Codeforces',
        url: 'https://codeforces.com/profile/vamsh_i2007',
        username: 'vamsh_i2007'
      }
    }
  },

  summary:
    'Second-year Artificial Intelligence & Machine Learning undergraduate at VNR VJIET with strong foundations in Data Structures & Algorithms, mathematical modeling, and backend systems. Experienced in architecting decoupled applications, industrial IoT digital twins, and relational database schemas. Focused on building robust, maintainable systems from first principles with a dedication to consistency, problem solving, and technical curiosity.',

  education: {
    institution: 'Vallurupalli Nageswara Rao Vignana Jyothi Institute of Engineering and Technology (VNR VJIET)',
    location: 'Hyderabad, India',
    degree: 'Bachelor of Technology (B.Tech) in Artificial Intelligence & Machine Learning',
    timeline: 'Expected Graduation: 2029 | Current Standing: 2nd Year',
    cgpa: '9.9 / 10'
  },

  skills: {
    programming: ['C', 'C++', 'Python', 'Java (21 LTS)', 'JavaScript (ES6+)'],
    aiMl: ['Scikit-Learn', 'XGBoost', 'Machine Learning Foundations', 'Explainable AI Concepts'],
    backend: ['Node.js', 'Express.js (5.x)', 'Spring Boot (4.x)', 'Spring Security (7.x)'],
    databases: ['MongoDB', 'MySQL (3NF Relational Schema Design)', 'H2 In-Memory'],
    toolsProtocols: ['Git', 'GitHub', 'Apache Maven', 'Vite', 'MQTT (Mosquitto & Paho)', 'Linux CLI']
  },

  projects: [
    {
      id: 'lightx-ids',
      title: 'LightX-IDS (Evolution of IDS_prototype)',
      subtitle: 'Industrial IoT Intrusion Detection System',
      tech: 'Python, MQTT (Mosquitto), Scikit-Learn, XGBoost, Digital Twin Simulation',
      githubUrl: 'https://github.com/palleti-vamshi/IDS_prototype',
      bullets: [
        'Constructed an Industrial Digital Twin simulating 6 machine classes (Motor, Pump, Tank, Conveyor, Valve, Compressor) with 10 continuous telemetry sensor types.',
        'Engineered an event-driven telemetry pipeline streaming sensor packets over MQTT (Mosquitto) to ingest and preprocess structured industrial datasets.',
        'Developed model training routines for lightweight tree-based classifiers (Decision Trees, Random Forest, XGBoost) targeting low-latency edge deployment and Explainable AI (SHAP).'
      ]
    },
    {
      id: 'smart-campus',
      title: 'Smart Campus Management System',
      subtitle: 'Academic Enterprise & Campus Workflow Platform',
      tech: 'Java 21, Spring Boot 4.1, Spring Data JPA, MySQL 8.x, H2 Database, Maven',
      githubUrl: 'https://github.com/palleti-vamshi/Smart-Campus-Management-System',
      bullets: [
        'Designed an enterprise-grade 16-table normalized relational MySQL schema (3NF) modeling departments, courses, faculty, students, daily attendance, and certificate requests.',
        'Implemented 16 Spring Data JPA repositories with Jakarta Validation and Hibernate schema validation (ddl-auto=validate), enforcing composite unique constraints and referential integrity.',
        'Created complete database seed datasets and 13 complex DBMS queries verifying timetable conflict detection, validated against automated in-memory H2 tests.'
      ]
    },
    {
      id: 'mentor-student',
      title: 'Mentor-Student Management',
      subtitle: 'Mentor–Student Coordination Service',
      tech: 'Node.js, Express 5.2, MongoDB, Mongoose 9.1, JWT, BCrypt',
      githubUrl: 'https://github.com/palleti-vamshi/Mentor-Student-Management',
      bullets: [
        'Developed a modular asynchronous REST backend service using Express 5 and ES modules for academic mentorship tracking during the P17 Hackathon.',
        'Configured MongoDB persistence using Mongoose 9 schemas, enforcing strict schema validation and document lifecycle management across mentor and student allocations.',
        'Implemented stateless token authentication using JSON Web Tokens (JWT), BCrypt credential hashing, and HTTP cookie parsing middleware.'
      ]
    },
    {
      id: 'attendance-management',
      title: 'Attendance Management System',
      subtitle: 'Desktop Attendance Tracking Application',
      tech: 'Python, File I/O, Structured Data Processing, CSV Reporting',
      githubUrl: null,
      bullets: [
        'Built a standalone Python application to automate student attendance capture, roster verification, and record management.',
        'Developed validation logic to eliminate duplicate roll number submissions and compute session-wise as well as cumulative attendance statistics.',
        'Implemented file persistence routines and formatted report exports to streamline administrative record-keeping.'
      ]
    }
  ],

  leadership: [
    {
      role: 'Active Member',
      organization: 'AWS Student Builder Group',
      detail:
        'Engaged in collaborative technical learning sessions, cloud architecture discussions, and peer programming workshops.'
    },
    {
      role: 'Technical Operations Contributor',
      organization: 'Department Academic & Technical Events',
      detail:
        'Contributed to the coordination of technical hackathons, resource scheduling, and student event logistics.'
    }
  ],

  strengths: [
    'Problem Solving',
    'Critical Thinking',
    'Consistency',
    'Leadership',
    'Collaboration',
    'Technical Curiosity'
  ]
};
