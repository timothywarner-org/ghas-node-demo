# Product Requirements Document (PRD)

**Project:** GHAS Demo Node Console App Scaffold
**Audience:** Cursor AI ingestion
**Date:** 2025-07-07

---

## 1. Purpose

Build a Node.js console app scaffold that teaches GitHub Advanced Security (GHAS) in a hands-on 45 min session.

---

## 2. Background

You'll demo three GHAS pillars: **Secret Scanning**, **Dependency Review**, **Code Scanning (CodeQL)**.

The app injects real vulnerabilities on demand. It triggers Dependabot alerts, CodeQL scans, and push-protection on a fake Stripe key.

---

## 3. Objectives

- Enable learners to run a local inner-loop CodeQL scan
- Show Dependabot alerts on outdated dependencies
- Demo Secret Scanning blocking on a non-gitignored key
- Keep setup fast, stable, and reproducible in VS Code

---

## 4. Success Criteria

- Fresh repo clone → 5 min to demo all three pillars
- Dependabot alerts fire on push to origin
- CodeQL scan flags injected vulnerability
- Secret Scanning blocks the fake Stripe key
- Clear GHAS docs and VS Code links in README

---

## 5. Scope

### Included

- Repo scaffold with `.vscode`, `.github`, code files
- App logic: clear console, ASCII art, menu, vulnerability injection
- Local CodeQL CLI and query packs
- Custom CodeQL query for fake secret
- Dependabot and CodeQL GitHub Actions
- README with verified links

### Excluded

- Production deployment
- Real Stripe integration
- Extensive test coverage

---

## 6. User Stories

1. **As a developer**, I want to inject a vulnerable dependency so Dependabot alerts on push
2. **As a security engineer**, I want to write and run a CodeQL query that catches the demo vulnerability
3. **As a security lead**, I want a fake secret in source so Secret Scanning blocks it on PR
4. **As a presenter**, I want clear setup steps in VS Code

---

## 7. Functional Requirements

### 1. Console App

- Clears console
- Renders ASCII art welcome
- Presents menu:
  1. Dependency issue
  2. Code scanning issue
  3. Secret scanning issue
  4. Exit

### 2. Dependency Issue

- Overwrite `package.json` with a known vulnerable version (e.g. `lodash@4.17.20`)
- Log steps with emoji via chalk

### 3. Code Scanning Issue

- Append a JS file with an insecure pattern (e.g. `eval` or SQL injection)

### 4. Secret Scanning Issue

- Write `STRIPE_API_KEY=sk_test_...` to `src/secrets.js` (tracked)

### 5. Exit

- Ends process gracefully

---

## 8. Technical Requirements

- **Node.js** latest LTS
- **Dependencies**:
  - `figlet` (ASCII art)
  - `chalk` (rich logging)
  - `inquirer` (prompt)
- **DevDependencies**: none beyond CodeQL CLI
- **Engines** field or `.nvmrc` for Node version
- **Scripts** in `package.json`:
  - `start` → `node index.js`
  - `codeql:download` → fetch CodeQL CLI
  - `codeql:scan` → run local CodeQL with standard + extended + custom packs

---

## 9. Repo Structure

```
/
├── .vscode/
│   └── mcp.json
├── .github/
│   ├── CODEOWNERS
│   ├── workflows/
│   │   ├── dependabot.yml
│   │   └── codeql-analysis.yml
├── src/
│   ├── index.js
│   └── secrets.js
├── codeql/
│   ├── cli/            # downloaded CodeQL CLI
│   └── packs/
│       ├── standard/
│       ├── extended-node/
│       └── custom/
│           └── secret-scan.ql
├── .gitignore
├── package.json
├── README.md
└── .nvmrc
```

---

## 10. CI/CD & Automation

### Dependabot

- `dependabot.yml` daily updates on Node ecosystem

### CodeQL Analysis

- Runs on push and PR
- Includes standard, extended-node, and custom packs

### Branch Protection

- Require CodeQL and Dependabot status checks
- Enforce CODEOWNERS review

---

## 11. README Contents

- **Quick start**
  - Clone, `npm install`, `npm run codeql:download`, `npm start`
- **VS Code Extensions**
  - GitHub Pull Requests and Issues (`ms-vscode.vscode-pull-request-github`)
  - GitHub Actions (`github.vscode-pull-request-github`)
- **GHAS Links**
  - Secret Scanning docs
  - Dependency Review docs
  - CodeQL repo & docs
- **Branch protection guide**
- **Reset script** for demo state

---

## 12. Acceptance Criteria

- [ ] Repo clones without errors
- [ ] `npm run codeql:download` fetches CLI
- [ ] `npm start` shows menu and injects issues
- [ ] Pushing vulnerable dependency triggers Dependabot alert
- [ ] CodeQL scan flags injected code bug
- [ ] PR with fake secret is blocked by Secret Scanning
- [ ] README contains all required links and steps

---

## 13. Timeline & Milestones

- **Day 1 (Today)**: Scaffold directories, stub `index.js`, `mcp.json`, `CODEOWNERS`, `.gitignore`
- **Day 2**: Implement menu logic, vulnerability injections, CodeQL download script
- **Day 3**: Add custom QL query, workflows, README; test locally
- **Session Day**: Demo dry run, verify GHAS checks on a test repo

---

## 14. Risks & Mitigations

### Risk: Dependabot delay on first run
**Mitigation**: Pre-push a PR with vulnerable dependency to seed alert

### Risk: CodeQL CLI download fails
**Mitigation**: Include fallback local archive in repo

### Risk: Secret Scanning rule mismatch
**Mitigation**: Test pattern in custom secret QL pack
