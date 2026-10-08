---
id: smart-campus
type: project
title: Smart Campus Management System
category: Backend Systems • Java & Spring Boot • Database Architecture
last_updated: 2026-10-09
---

# Smart Campus Management System

## Overview

Smart Campus Management System is an enterprise-grade academic workflow and administrative platform built with Java 21 (LTS) and Spring Boot 4.1. The system features a normalized 16-table relational MySQL schema modeling institutional workflows, departmental structures, courses, students, faculty, daily lecture attendance, examination marks, and student certificate requests.

## Problem

Higher education campus administration often suffers from isolated data silos. Student enrollment records, course timetable schedules, daily attendance tracking, internal examination grading, and official document requests (such as bonafide certificates) are commonly maintained across disconnected systems or spreadsheets. This lack of centralized schema enforcement leads to data inconsistencies, timetable scheduling conflicts, and compromised audit trails.

## Approach

The system establishes an enterprise relational foundation strictly adhering to Third Normal Form (3NF). It enforces referential integrity through foreign keys, composite unique constraints, and database cascading rules. On top of MySQL 8.x, the backend implements 16 Spring Data JPA repositories with Jakarta Validation and Hibernate schema validation (`ddl-auto=validate`), supported by an automated H2 in-memory test suite and comprehensive SQL seed data.

## Technology

- **Language & Runtime**: Java 21 (Long-Term Support)
- **Framework**: Spring Boot 4.1.1
- **Security**: Spring Security 7.x, BCrypt password hashing
- **Persistence & ORM**: Spring Data JPA, Hibernate 7.x
- **Databases**: MySQL 8.x (production), H2 In-Memory Database (automated integration testing)
- **Build & Management**: Apache Maven, Maven Wrapper (`./mvnw`), Project Lombok, Jakarta Validation

## Architecture

The backend architecture follows standard Spring enterprise separation of concerns:

1. **Client & API Layer (Roadmap)**: HTTP REST controllers, standardized `ApiResponse` envelope, and `GlobalExceptionHandler`.
2. **Security & Authentication Foundation**: Spring Security 7.x with BCrypt password hashing and role-based access control.
3. **Domain Entity Layer**: 16 JPA domain entities mapped with Lombok annotations, Jakarta Bean Validation, and 9 domain enums.
4. **Data Access Layer**: 16 Spring Data JPA repositories extending `JpaRepository`.
5. **Persistence Engine**: Hibernate 7.x validating entity mappings against the underlying database catalog.
6. **Relational Database Tier**: MySQL 8.x production instance and H2 in-memory test catalog.

## Workflow

1. **User Authentication**: User credentials are submitted and evaluated by Spring Security against hashed BCrypt passwords, assigning roles (`ADMIN`, `FACULTY`, `STUDENT`).
2. **Academic Coordination**: Programs, academic departments, courses, and timetable allocations are scheduled and validated against instructor availability and room allocations.
3. **Attendance & Grading Logging**: Faculty record daily class attendance logs and enter multi-tier examination marks (Mid-Term, Laboratory, and End-Semester).
4. **Document Request Lifecycle**: Students initiate certificate requests (e.g., bonafide or official transcripts), which advance through structured approval workflows with audit timestamps.

## Implementation

- **Relational Schema (`schema.sql`)**: 16 normalized relational tables with primary keys, foreign key constraints, composite unique indexes, and audit columns.
- **Spring Data JPA Entities**: 16 entity classes with bi-directional and uni-directional relationship mappings, mapped enums, and validation constraints.
- **SQL Testing & Analytical Suite**: Complete `seed-data.sql` and 13 complex DBMS queries verifying GPA computation, attendance calculations, and scheduling conflict detection.

## Project Structure

```
Smart-Campus-Management-System/
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
└── README.md
```

## Challenges

- Designing an interconnected 16-table schema without introducing circular entity references or N+1 query bottlenecks in Hibernate.
- Ensuring composite unique constraints prevent timetable overlaps across classrooms and faculty members.
- Enforcing strict schema validation between JPA annotations and MySQL DDL.

## Learnings

- Applying 3NF normalization rules to complex multi-role institutional requirements.
- Configuring Hibernate 7.x schema validation against live MySQL instances.
- Architecting unit and repository tests using Spring Boot's `@DataJpaTest` with an in-memory H2 database.

## Results

Phase 1 (Database & Foundation) is complete and verified: 16 normalized JPA entities, 16 repositories, MySQL DDL schema, complete seed dataset, 13 complex analytical SQL queries, and passing H2 database integration test suite. Subsequent phases address REST controllers and frontend interfaces.

## Repository

- **GitHub Repository**: [https://github.com/palleti-vamshi/Smart-Campus-Management-System](https://github.com/palleti-vamshi/Smart-Campus-Management-System)
- **Deployment / Live URL**: Not documented yet.
