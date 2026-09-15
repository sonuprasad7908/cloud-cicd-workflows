# 🚀 Cloud CI/CD Workflows

A hands-on Cloud Engineering portfolio project demonstrating practical CI/CD patterns for application validation, Docker builds, environment-based releases, deployment health checks, and rollback decisions.

## 🎯 Project Goal

The purpose of this repository is to demonstrate how application changes can move through a controlled CI/CD workflow.

The focus is deployment automation and operational validation rather than application development.

## 🔄 Planned Pipeline

```text
Developer Push
      ↓
GitHub
      ↓
CI Pipeline
      ↓
Code Validation
      ↓
Application Test
      ↓
Docker Build
      ↓
Deployment Workflow
      ↓
Health Check
      ↓
Success / Rollback

## 📌 Project Roadmap

- [x] Create sample application with health endpoint
- [x] Containerize application with Docker
- [x] Add continuous integration workflow
- [ ] Add Docker image validation
- [ ] Add development deployment workflow
- [ ] Add test deployment workflow
- [ ] Add production deployment workflow
- [ ] Add deployment health-check script
- [ ] Add rollback validation
- [ ] Document CI/CD architecture
