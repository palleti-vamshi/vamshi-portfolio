# Palleti Vamshi — Portfolio

A technical portfolio and profile-specific AI system for Palleti Vamshi (B.Tech Artificial Intelligence & Machine Learning, VNR VJIET). This project is being engineered incrementally across structured phases, beginning with clean baseline architecture and modular service design.

## Project Overview

This repository is designed to showcase technical projects, engineering depth, and domain expertise in AI/ML through a modern web interface coupled with a dedicated retrieval-augmented chatbot. The platform is architected with a decoupled frontend and backend to support clean API boundaries, hardened security practices, and scalable knowledge retrieval.

> **Current Status**: Under active development. Currently in **Phase 1 (Project Foundation & Architecture)**. Visual sections, hero components, project showcases, and RAG systems are intentionally scheduled for later phases.

## Current Architecture

The project maintains strict separation between client, server, and knowledge storage:

- **Frontend**: Single-page application built with React and Vite, structured into modular component, section, service, and state layers.
- **Backend**: Express REST API adhering to MVC/Service layering (controllers, routes, services, middleware, and config), decoupled from transport and runtime concerns.
- **Knowledge Base**: Isolated knowledge repository (`knowledge/`) reserved for structured profile facts and RAG data pipelines in subsequent phases.

## Tech Stack

- **Client Runtime**: React, Vite
- **Server Runtime**: Node.js, Express
- **Security & Networking**: Helmet (HTTP security headers), CORS (origin-restricted), Express Rate Limit, Express JSON payload limits
- **Language**: JavaScript (ES Modules)

## Local Development

Ensure Node.js (v18+) and npm are installed on your machine.

### 1. Install Dependencies

Install dependencies for both frontend and backend services:

```bash
# Option A: From root using convenience script
npm run install:all

# Option B: Independently
cd backend && npm install
cd ../frontend && npm install
```

### 2. Configure Environment Variables

Copy the example environment files:

```bash
# Backend environment setup
cp backend/.env.example backend/.env

# Or root environment setup
cp .env.example .env
```

### 3. Run Development Servers

Run frontend and backend in separate terminal sessions:

```bash
# Terminal 1: Backend API (runs on http://localhost:5001)
npm run dev:backend
# or: cd backend && npm run dev

# Terminal 2: Frontend client (runs on http://localhost:5173)
npm run dev:frontend
# or: cd frontend && npm run dev
```

Verify the health check endpoint:
```bash
curl http://localhost:5001/api/health
```

## Environment Variables

The project uses `.env.example` templates to document runtime configuration without exposing sensitive values.

| Variable | Description | Default (Dev) |
| :--- | :--- | :--- |
| `NODE_ENV` | Runtime environment mode (`development` / `production`) | `development` |
| `PORT` | HTTP server port for backend API | `5001` |
| `FRONTEND_URL` | Allowed CORS origin for browser requests | `http://localhost:5173` |
| `VITE_API_BASE_URL` | Frontend API client base URL | `http://localhost:5001/api` |

## Project Structure

```text
vamshi-portfolio/
│
├── frontend/
│   ├── src/
│   │   ├── components/         # Reusable UI components (Phase 2+)
│   │   ├── sections/           # Portfolio sections (Phase 2+)
│   │   ├── data/               # Static and profile baseline data
│   │   ├── hooks/              # Custom React hooks (Phase 2+)
│   │   ├── services/           # API and client network services
│   │   ├── utils/              # Client helper utilities
│   │   ├── assets/             # Media and static assets (Phase 2+)
│   │   ├── App.jsx             # Root application component
│   │   ├── index.css           # Global baseline styles
│   │   └── main.jsx            # React DOM mounting entrypoint
│   ├── public/                 # Static web assets
│   ├── index.html              # Vite HTML template
│   ├── vite.config.js          # Vite build and dev configuration
│   └── package.json            # Frontend dependencies and scripts
│
├── backend/
│   ├── src/
│   │   ├── controllers/        # Request handling and response coordination
│   │   ├── routes/             # API routing definitions
│   │   ├── services/           # Core business logic and health services
│   │   ├── middleware/         # Security, CORS, rate-limiting, error handling
│   │   ├── utils/              # Response formatters and HTTP constants
│   │   ├── config/             # Environment validation and server configuration
│   │   └── data/               # Backend data stores and profile facts
│   ├── server.js               # Server entrypoint and graceful shutdown
│   ├── .env.example            # Backend environment template
│   └── package.json            # Backend dependencies and scripts
│
├── knowledge/                  # RAG documents and profile embeddings (Phase 3+)
│   └── .gitkeep
│
├── public/                     # Root shared public assets
│   └── .gitkeep
│
├── .gitignore                  # Git exclusions for secrets, builds, and dependencies
├── .env.example                # Root environment template
├── README.md                   # Project documentation
└── package.json                # Root automation scripts
```

## Development Phases

This project is built incrementally to ensure maintainability, code quality, and security:

1. **Phase 1: Project Foundation & Architecture (Current)** — Monorepo-free clean repository structure, security baselines (CORS, Helmet, Rate Limiter, Error Handler), API service abstraction, verified profile data baseline, and health verification.
2. **Phase 2: Portfolio UI & Responsive Design** — Modern design system, hero section, academic profile, technical projects showcase, skills matrix, and contact workflows.
3. **Phase 3: RAG Knowledge Base & AI Chatbot** — Profile vector embeddings, context retrieval pipeline, and interactive technical assistant integration.
4. **Phase 4: Optimization & Deployment** — Performance tuning, audit verification, production containerization/hosting, and CI/CD automation.
