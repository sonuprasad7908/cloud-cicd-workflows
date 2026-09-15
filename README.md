# ☁️ Cloud CI/CD Workflows

A hands-on Cloud Engineering portfolio project demonstrating application validation, Docker containerization, CI automation, environment-based deployments, health checks, controlled production releases, and rollback validation.

![CI](https://github.com/sonuprasad7908/cloud-cicd-workflows/actions/workflows/ci.yml/badge.svg)

## 🎯 Project Goal

This repository demonstrates how application changes can move through a controlled CI/CD lifecycle.

The focus is not application development. The sample Node.js service exists so the repository can demonstrate practical Cloud and DevOps concepts such as:

- automated testing;
- Docker image validation;
- non-root containers;
- reusable deployment workflows;
- environment promotion;
- deployment health checking;
- explicit Git revision deployment;
- controlled production releases;
- rollback validation.

---

## 🏗️ CI/CD Architecture

```text
Developer Change
       │
       ▼
Pull Request
       │
       ├───────────────┐
       ▼               ▼
Node.js Tests     Docker Validation
       │               │
       └───────┬───────┘
               ▼
      Development Validation
               │
               ▼
             Merge
               │
               ▼
              main
               │
               ▼
               CI
               │
               ▼
        Test Deployment
               │
               ▼
      Manual Production Release
               │
               ▼
      Validate Release Revision
               │
               ▼
     Production Health Validation
```

Rollback path:

```text
Production Problem
       │
       ▼
Select Previous Known-Good SHA
       │
       ▼
Validate Git Commit
       │
       ▼
Verify Commit Belongs to main
       │
       ▼
Deploy Exact Rollback Revision
       │
       ▼
Health + Endpoint Validation
```

---

## 🔄 Environment Promotion

### Development

Pull requests run:

```text
Application Tests
       ↓
Docker Image Validation
       ↓
Development Deployment Validation
```

The development workflow uses the shared reusable deployment workflow.

### Test

After code reaches `main`:

```text
CI Success
    ↓
workflow_run
    ↓
Test Deployment
    ↓
Health Validation
```

The test environment deploys the exact Git revision that passed CI.

### Production

Production deployment is intentionally manual.

The operator supplies an explicit commit SHA from `main`.

```text
Manual Dispatch
      ↓
Release SHA
      ↓
Validate SHA belongs to main
      ↓
Checkout exact revision
      ↓
Deploy
      ↓
Health validation
```

This prevents production from automatically following every repository push.

### Rollback

Rollback is also manually controlled.

The workflow validates that the requested rollback SHA:

- is a valid Git commit;
- belongs to `main` history;
- is not the current `main` revision.

The exact previous revision is then deployed through the same reusable deployment validation workflow.

---

## 🧪 Continuous Integration

The CI workflow runs on pull requests and pushes to `main`.

It performs:

```text
Node.js Tests
      ↓
Docker Build
      ↓
Container Start
      ↓
Docker HEALTHCHECK
      ↓
/health Validation
      ↓
Non-root User Validation
      ↓
Cleanup
```

A failed validation causes the workflow to fail.

---

## 🐳 Container Security

The sample application is packaged using Docker with:

- Node.js Alpine base image;
- non-root `node` user;
- explicit application port;
- container health check;
- runtime environment configuration;
- `.dockerignore` to reduce build context.

Example validation:

```bash
docker exec cloud-cicd-demo id
```

Expected behavior:

```text
uid=1000(node)
```

The application is not intended to run as root.

---

## ❤️ Deployment Health Checks

Deployment validation uses:

```text
scripts/health-check.sh
```

The reusable health-check utility supports:

- HTTP status validation;
- retry logic;
- configurable retry count;
- configurable delay;
- expected response-content validation;
- diagnostic output;
- non-zero failure status.

Example:

```bash
./scripts/health-check.sh \
  http://127.0.0.1:3000/health \
  '"status":"healthy"'
```

A deployment is considered successful only after the application passes health and endpoint validation.

---

## 🔐 Reliability & Security Practices

This project demonstrates:

- minimal GitHub Actions repository permissions;
- controlled production workflow execution;
- deployment of explicit Git revisions;
- reusable workflow design;
- non-root Docker execution;
- automated health validation;
- automatic test-container cleanup;
- concurrency controls;
- rollback target validation;
- no credentials stored in the repository.

---

## 📁 Repository Structure

```text
cloud-cicd-workflows/
├── .github/
│   └── workflows/
│       ├── ci.yml
│       ├── deploy-development.yml
│       ├── deploy-test.yml
│       ├── deploy-production.yml
│       ├── deploy-rollback.yml
│       └── reusable-deploy.yml
│
├── sample-app/
│   ├── .dockerignore
│   ├── .env.example
│   ├── Dockerfile
│   ├── package.json
│   ├── server.js
│   └── server.test.js
│
├── scripts/
│   └── health-check.sh
│
├── docs/
├── .gitignore
└── README.md
```

---

## 🛠️ Technologies

- Git
- GitHub Actions
- Linux
- Bash
- Docker
- Node.js
- CI/CD
- HTTP health checks
- Git-based environment promotion

---

## 📌 Project Roadmap

- [x] Create sample application with health endpoint
- [x] Containerize application with Docker
- [x] Add continuous integration workflow
- [x] Add Docker image validation
- [x] Add development deployment workflow
- [x] Add test deployment workflow
- [x] Add production deployment workflow
- [x] Add deployment health-check script
- [x] Add rollback validation
- [x] Document CI/CD architecture

---

## ✅ Validated Workflow Capabilities

The project has successfully demonstrated:

- application tests executed in CI;
- Docker image build validation;
- container health validation;
- non-root container execution;
- development deployment validation;
- automatic test deployment after successful CI;
- manually controlled production deployment;
- explicit production Git revision validation;
- reusable deployment health checks;
- manually controlled rollback validation.

---

## ⚠️ Portfolio Scope

This repository intentionally does **not** provision or deploy to a live AWS production environment.

Development, test, production, and rollback workflows are validated using GitHub-hosted runners and Docker containers.

The purpose is to demonstrate CI/CD architecture, environment promotion, deployment validation, and rollback engineering without requiring external cloud credentials or paid infrastructure.

---

## 💡 What This Project Demonstrates

This repository is designed to show practical Cloud/DevOps engineering thinking:

```text
Build safely
     +
Test automatically
     +
Deploy exact revisions
     +
Validate health
     +
Control production releases
     +
Recover using rollback
```

The emphasis is on reliable deployment automation rather than simply running deployment commands.
