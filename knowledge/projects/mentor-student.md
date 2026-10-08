---
id: mentor-student
type: project
title: Mentor-Student Management
category: Backend Engineering • Node.js & Express 5 • MongoDB
last_updated: 2026-10-09
---

# Mentor-Student Management

## Overview

Mentor-Student Management is a modular backend coordination service built with Node.js and Express 5, utilizing MongoDB and Mongoose ODM for data persistence. Developed for the P17 Mentor–Student Management System hackathon, the service provides structured data schemas and secure REST API patterns for tracking student-faculty mentorship relationships.

## Problem

Academic mentorship programs frequently suffer from fragmented tracking. Assigning faculty mentors to incoming or continuing students, maintaining session notes, and monitoring academic and career progress often rely on manual spreadsheets or informal messaging. This causes administrative disorganization and lacks secure role-based session isolation.

## Approach

The system implements an asynchronous Node.js backend using modern ES module architecture and Express 5. MongoDB serves as the persistent document store, managed through Mongoose 9.1 schemas with strict type constraints. Security is addressed through BCrypt credential hashing, JSON Web Tokens (JWT) for stateless authentication, and secure HTTP cookie parsing.

## Technology

- **Runtime & Language**: Node.js, JavaScript (ES Modules `type: module`)
- **Web Framework**: Express 5.2
- **Database & ODM**: MongoDB, Mongoose 9.1
- **Authentication & Security**: JSON Web Tokens (`jsonwebtoken`), `bcryptjs`, `cookie-parser`, `cors`
- **Environment Management**: `dotenv`

## Architecture

The backend architecture is structured around four primary layers:

1. **HTTP Transport & Middleware Layer**: Express 5 application instance configuring CORS middleware, JSON body parsing, and cookie parsing.
2. **Authentication & Security Layer**: BCrypt password hashing for user accounts and JWT token generation/validation stored in HTTP cookies.
3. **API Routing & Controllers**: Modular route handlers managing mentor allocations and mentorship records.
4. **Data Persistence Tier**: Mongoose 9 ODM managing the database connection lifecycle via a modular `db.js` configuration module.

## Workflow

1. **Authentication Flow**: Users log in with verified credentials, triggering password hash validation via BCrypt and issuing a signed JWT in an HTTP cookie.
2. **Request Routing**: Inbound requests pass through security and authentication middleware to verify JWT signatures before accessing protected routes.
3. **Data Operations**: Controller handlers execute CRUD operations through Mongoose models, validating document structures before writing to MongoDB collections.

## Implementation

- **Database Connection Lifecycle**: Modular `src/config/db.js` module handling MongoDB connection state and error reporting.
- **Authentication Pipeline**: Implementation of JWT generation, token verification middleware, and password encryption via `bcryptjs`.
- **Server Entrypoint**: Clean `server.js` setting up middleware pipelines, routes, and environment variable bindings.
- **Event Context**: Created as part of the P17 Backend Engineering Hackathon.

## Project Structure

```
Mentor-Student-Management/
├── backend/
│   ├── src/
│   │   └── config/
│   │       └── db.js
│   ├── server.js
│   ├── package.json
│   └── .gitignore
└── README.md
```

## Challenges

- Structuring a modular, scalable backend architecture within tight hackathon time limits.
- Configuring secure cookie handling and CORS settings across development environments.
- Ensuring reliable database connection handling with Mongoose 9.

## Learnings

- Utilizing modern Express 5 features and native ES module imports in Node.js.
- Implementing token-based authentication workflows and secure credential management.
- Designing schema validation rules in Mongoose for relational data modeling in NoSQL.

## Results

Functional backend foundation and database connectivity verified for the P17 Hackathon. Frontend interface and production deployment are not documented yet.

## Repository

- **GitHub Repository**: [https://github.com/palleti-vamshi/Mentor-Student-Management](https://github.com/palleti-vamshi/Mentor-Student-Management)
- **Deployment / Live URL**: Not documented yet.
