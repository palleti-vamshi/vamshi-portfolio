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
    'AI/ML undergraduate at VNR VJIET (CGPA 9.9/10) with strong foundations in Data Structures and Algorithms. Experienced in engineering event-driven IoT telemetry pipelines, normalized relational databases, and decoupled backends from first principles.',

  education: {
    institution: 'Vallurupalli Nageswara Rao Vignana Jyothi Institute of Engineering and Technology (VNR VJIET)',
    location: 'Hyderabad, India',
    degree: 'Bachelor of Technology (B.Tech) in Artificial Intelligence & Machine Learning',
    timeline: 'Expected Graduation: 2029 | Current Standing: 2nd Year',
    cgpa: '9.9 / 10',
    history: [
      {
        institution: 'Vallurupalli Nageswara Rao Vignana Jyothi Institute of Engineering and Technology (VNR VJIET)',
        degree: 'B.Tech in Artificial Intelligence & Machine Learning',
        timeline: 'Expected Graduation: 2029',
        score: 'Current CGPA: 9.9 / 10 (10.0 Scale) | Current Standing: 2nd Year'
      },
      {
        institution: 'Narayana Junior College',
        degree: 'Intermediate',
        score: '987 marks'
      },
      {
        institution: 'Pratibha Model High School',
        degree: 'Secondary School',
        score: 'score 9.7'
      }
    ]
  },

  achievements: [
    {
      title: 'Code Frenzy',
      rank: '22nd rank'
    }
  ],

  skills: {
    programming: ['C', 'C++', 'Python', 'Java (21 LTS)', 'JavaScript (ES6+)', 'SQL'],
    aiMl: ['Scikit-Learn', 'XGBoost', 'Machine Learning Foundations', 'Explainable AI (SHAP)'],
    backend: ['Spring Boot', 'Spring Data JPA', 'Node.js', 'Express.js', 'RESTful APIs'],
    databases: ['MySQL (3NF Relational Schemas)', 'MongoDB (Mongoose)', 'H2 In-Memory'],
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
        'Built an industrial digital twin simulating 6 physical machine classes streaming 10 real-time continuous sensor telemetry channels.',
        'Engineered an event-driven MQTT ingestion pipeline to validate, sanitize, and buffer sensor packets under bandwidth constraints.',
        'Trained and benchmarked tree-based classifiers (Decision Trees, Random Forest, XGBoost) optimized for edge inference and SHAP explainability.'
      ]
    },
    {
      id: 'smart-campus',
      title: 'Smart Campus Management System',
      subtitle: 'Academic Enterprise & Campus Workflow Platform',
      tech: 'Java 21, Spring Boot, Spring Data JPA, MySQL 8.x, H2 Database, Maven',
      githubUrl: 'https://github.com/palleti-vamshi/Smart-Campus-Management-System',
      bullets: [
        'Architected a 16-table relational MySQL schema (3NF) governing departments, courses, faculty, attendance, and certificate requests.',
        'Implemented 16 Spring Data JPA repositories with Jakarta Validation, enforcing referential integrity and composite primary keys.',
        'Formulated 13 optimized DBMS queries for conflict-free timetable scheduling and validated services with automated in-memory H2 test suites.'
      ]
    },
    {
      id: 'mentor-student',
      title: 'Mentor-Student Management',
      subtitle: 'Mentor–Student Coordination Service',
      tech: 'Node.js, Express 5, MongoDB, Mongoose, JWT, BCrypt',
      githubUrl: 'https://github.com/palleti-vamshi/Mentor-Student-Management',
      bullets: [
        'Developed an asynchronous REST service using Express 5 and ES modules for academic mentorship tracking during the P17 Hackathon.',
        'Designed MongoDB schemas with Mongoose 9, configuring index structures, relational references, and schema-level validation.',
        'Implemented stateless JWT authentication with BCrypt password hashing and secure HTTP cookie parsing middleware.'
      ]
    },
    {
      id: 'attendance-management',
      title: 'Attendance Management System',
      subtitle: 'Desktop Attendance Tracking Application',
      tech: 'Python, File I/O, Structured Data Processing, CSV Reporting',
      githubUrl: null,
      bullets: [
        'Built a standalone Python utility to automate student attendance capture, roster validation, and aggregate summary metrics.',
        'Implemented duplicate-entry validation routines and structured CSV export workflows for administrative record-keeping.'
      ]
    }
  ],

  leadership: [
    {
      role: 'Volunteer in Tech & Innovation',
      organization: 'AWS Student Builder Group',
      detail:
        'Engaged in technical exploration initiatives, community knowledge sharing, and emerging technology sessions.'
    }
  ],

  strengths: [
    'Data Structures & Algorithms',
    'Relational Schema Design',
    'Systems Architecture',
    'Critical Thinking',
    'Technical Curiosity'
  ]
};
