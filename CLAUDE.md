# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a GitHub Advanced Security (GHAS) demonstration Node.js console application designed for a 45-minute hands-on training session. The app demonstrates three GHAS pillars:

1. **Secret Scanning** - Blocks fake Stripe API keys on push
2. **Dependency Review** - Triggers Dependabot alerts for vulnerable dependencies  
3. **Code Scanning (CodeQL)** - Detects injected code vulnerabilities

## Key Commands

### Development
```bash
npm install          # Install dependencies
npm start           # Run the console app
npm run codeql:download  # Download CodeQL CLI
npm run codeql:scan     # Run local CodeQL scan with all packs
```

### Testing GHAS Features
- Push vulnerable dependency changes to trigger Dependabot
- Create PRs with fake secrets to test Secret Scanning
- Run CodeQL scans to detect injected vulnerabilities

## Architecture

### Application Flow
1. Console app presents menu with vulnerability injection options
2. User selects vulnerability type (dependency/code/secret)
3. App modifies files to inject the selected vulnerability
4. GHAS features detect and alert on the vulnerabilities

### Key Components
- **src/index.js** - Main application entry point with menu system
- **src/secrets.js** - Target file for secret injection
- **codeql/packs/custom/secret-scan.ql** - Custom CodeQL query for demo vulnerabilities
- **.github/workflows/** - Dependabot and CodeQL analysis workflows

### Vulnerability Injection Mechanisms
- **Dependency Issue**: Overwrites package.json with vulnerable lodash@4.17.20
- **Code Scanning Issue**: Appends insecure patterns (eval, SQL injection) to JS files
- **Secret Scanning Issue**: Writes fake Stripe key to tracked src/secrets.js

## Important Implementation Notes

1. **Dependencies**: The app uses `figlet` for ASCII art, `chalk` for colored logging, and `inquirer` for interactive prompts
2. **Node Version**: Use latest LTS, specified in .nvmrc
3. **CodeQL Integration**: Local CLI stored in codeql/cli/, with standard, extended-node, and custom query packs
4. **GitHub Actions**: Both dependabot.yml and codeql-analysis.yml should run on push and PR

## Demo Requirements

- Fresh repo clone to working demo in 5 minutes
- All three GHAS pillars must be demonstrable
- Clear visual feedback via console output with emojis
- VS Code integration with recommended extensions

## File Modifications During Demo

When injecting vulnerabilities, the app will:
1. Modify package.json for dependency vulnerabilities
2. Append to or create JS files for code scanning issues  
3. Write to src/secrets.js for secret scanning demos

Always ensure these modifications are reversible for demo reset.