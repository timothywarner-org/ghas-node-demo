# GitHub Advanced Security (GHAS) Node.js Console Demo App

[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)
[![Node.js](https://img.shields.io/badge/node-%3E%3D20-brightgreen.svg)](https://nodejs.org/)
[![CodeQL](https://github.com/timothywarner-org/ghas-node-demo/workflows/CodeQL%20Analysis/badge.svg)](https://github.com/timothywarner-org/ghas-node-demo/actions?query=workflow%3A%22CodeQL+Analysis%22)
[![Dependabot](https://img.shields.io/badge/dependabot-enabled-brightgreen.svg)](https://dependabot.com/)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com)
[![Contributions Welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat)](CONTRIBUTING.md)

> **Node.js console app scaffold for practical GitHub Advanced Security (GHAS) learning and teaching**

This project demonstrates all three **GHAS pillars** in a hands-on 45-minute session:
- 🔍 **CodeQL Code Scanning** - Local and automated vulnerability detection
- 📦 **Dependency Review** - Automated dependency vulnerability alerts
- 🔐 **Secret Scanning** - Real-time secret detection and blocking

## 🚀 Quick Start

### Prerequisites
- **Node.js** 20+ (see `.nvmrc`)
- **GitHub repository** with GHAS enabled
- **VS Code** (recommended)

### Setup (5 minutes)
```bash
# Clone and setup
git clone <your-repo-url>
cd ghas-node-demo
npm install

# Download CodeQL CLI
npm run codeql:download

# Start the demo app
npm start
```

## 🎯 Demo Features

### Interactive Console App
The demo app provides an interactive menu to inject vulnerabilities on demand:

```bash
npm start
```

**Menu Options:**
- 🔧 **Inject Dependency Issue** - Adds vulnerable `lodash@4.17.20` to `package.json`
- 🔍 **Inject Code Scanning Issue** - Creates `src/vulnerable.js` with `eval()` and SQL injection patterns
- 🔐 **Inject Secret Scanning Issue** - Creates `src/secrets.js` with fake Stripe, AWS, and GitHub tokens
- 🚪 **Exit** - Clean exit

### CodeQL Integration

#### Local CodeQL Scanning
```bash
# Run local CodeQL scan
npm run codeql:scan
```

**What it does:**
- Creates CodeQL database from your JavaScript code in `codeql/database/`
- Runs standard + extended + custom security queries
- Generates SARIF results in `codeql/results/results.sarif`
- Outputs CSV summary of findings

#### Custom CodeQL Queries
Located in `codeql/packs/custom/`:
- **`secret-scan.ql`** - Detects fake Stripe API keys (`sk_test_` pattern)
- **`ghas-demo.qls`** - Custom query suite combining standard, extended, and custom queries
- **`qlpack.yml`** - CodeQL pack configuration for custom queries

### GitHub Actions Integration

#### Automated CodeQL Analysis
- **Trigger:** Push to `main` or Pull Request
- **Schedule:** Weekly (Sundays 1:30 AM UTC)
- **Languages:** JavaScript only
- **Query Packs:** `security-and-quality`, `security-extended`, plus custom suite
- **Output:** SARIF results in GitHub Security tab

#### Dependabot Automation
- **Schedule:** Daily dependency updates
- **Ecosystem:** npm
- **Reviewers:** `@timwarner`
- **Assignees:** `@timwarner`
- **Commit Prefix:** `deps` for production, `deps-dev` for development

## 📁 Project Structure

```
ghas-node-demo/
├── .github/
│   ├── CODEOWNERS              # Branch protection rules
│   ├── dependabot.yml          # Automated dependency updates
│   └── workflows/
│       └── codeql-analysis.yml # Automated CodeQL scanning
├── .vscode/
│   └── mcp.json               # VS Code configuration (empty)
├── codeql/
│   ├── cli/                   # CodeQL CLI binaries (downloaded)
│   ├── database/              # CodeQL databases (generated)
│   ├── results/               # Scan results (generated)
│   └── packs/
│       ├── custom/            # Custom security queries
│       │   ├── secret-scan.ql # Fake Stripe key detection
│       │   ├── ghas-demo.qls  # Custom query suite
│       │   └── qlpack.yml     # CodeQL pack config
│       ├── extended-node/     # Extended Node.js queries
│       └── standard/          # Standard security queries
├── scripts/
│   ├── download-codeql.js     # CodeQL CLI downloader (v2.16.4)
│   └── run-codeql-scan.js     # Local CodeQL runner
├── src/
│   └── index.js              # Main demo application
├── package.json              # Dependencies and scripts
├── .nvmrc                    # Node.js version (20)
└── README.md                 # This file
```

## 🔧 Available Scripts

| Script | Description |
|--------|-------------|
| `npm start` | Launch interactive demo console |
| `npm run codeql:download` | Download CodeQL CLI v2.16.4 |
| `npm run codeql:scan` | Run local CodeQL analysis |

## 🛡️ GHAS Security Features

### 1. CodeQL Code Scanning
- **Local Development:** `npm run codeql:scan` with custom suite
- **CI/CD:** Automated on every push/PR with GitHub Actions
- **Custom Queries:** Fake Stripe API key detection (`sk_test_` pattern)
- **Query Packs:** Standard + Extended + Custom demo queries
- **Output Formats:** SARIF and CSV results

### 2. Dependency Review
- **Automated:** Dependabot daily updates with proper commit prefixes
- **Vulnerability Detection:** Known vulnerable packages (e.g., `lodash@4.17.20`)
- **Demo Trigger:** Interactive injection via console menu
- **Review Process:** Assigned to `@timwarner` for approval

### 3. Secret Scanning
- **Real-time:** Blocks secrets on push to protected branches
- **Demo Secrets:** Fake Stripe, AWS, and GitHub tokens in `src/secrets.js`
- **Custom Detection:** Enhanced secret patterns via CodeQL
- **File Tracking:** Secrets are committed (not gitignored) for demo purposes

## 🎓 Learning Objectives

### For Developers
- Inject vulnerable dependencies to trigger Dependabot alerts
- Understand CodeQL query language and custom queries
- Experience real-time secret scanning protection
- Learn proper commit message conventions for dependency updates

### For Security Engineers
- Write and test custom CodeQL queries for specific patterns
- Configure automated security scanning in CI/CD
- Integrate security into development workflows
- Understand SARIF output and result interpretation

### For Security Leads
- Demonstrate GHAS ROI with hands-on examples
- Show automated security enforcement in practice
- Build security-first development practices
- Configure branch protection and review requirements

## 🔗 VS Code Extensions

**Recommended Extensions:**
- [GitHub Pull Requests and Issues](https://marketplace.visualstudio.com/items?itemName=GitHub.vscode-pull-request-github)
- [GitHub Actions](https://marketplace.visualstudio.com/items?itemName=github.vscode-github-actions)
- [CodeQL](https://marketplace.visualstudio.com/items?itemName=GitHub.vscode-codeql)

## 📚 GHAS Documentation Links

### Official Documentation
- [GitHub Advanced Security Overview](https://docs.github.com/en/github/getting-started-with-github/learning-about-github/about-github-advanced-security)
- [CodeQL Documentation](https://codeql.github.com/docs/)
- [Secret Scanning](https://docs.github.com/en/code-security/secret-scanning/about-secret-scanning)
- [Dependency Review](https://docs.github.com/en/code-security/supply-chain-security/understanding-your-software-supply-chain/about-dependency-review)

### CodeQL Resources
- [CodeQL Repository](https://github.com/github/codeql)
- [CodeQL Query Packs](https://github.com/github/codeql/tree/main/javascript/ql/src)
- [Writing CodeQL Queries](https://codeql.github.com/docs/writing-codeql-queries/)

## 🚨 Branch Protection Setup

**Required Status Checks:**
- CodeQL Analysis
- Dependabot alerts

**Required Reviews:**
- CODEOWNERS approval (`@timwarner`)

**Settings Location:** Repository Settings → Branches → Branch protection rules

## 🔄 Demo Reset

To reset the demo state:
```bash
# Remove injected vulnerabilities
rm -f src/vulnerable.js src/secrets.js

# Reset package.json (remove lodash)
git checkout package.json
npm install
```

## 🛠️ Technical Details

### CodeQL CLI Version
- **Version:** 2.16.4
- **Platform Support:** Windows (PowerShell extraction) and Linux
- **Download Location:** `codeql/cli/codeql/`

### Vulnerability Patterns
- **Dependency:** `lodash@4.17.20` (known vulnerable version)
- **Code Injection:** `eval(userInput)` pattern
- **SQL Injection:** Template literal with user input
- **Secrets:** Fake Stripe (`sk_test_`), AWS (`AKIA`), GitHub (`ghp_`) tokens

### File Generation
- **Vulnerable Code:** `src/vulnerable.js` (created on demand)
- **Fake Secrets:** `src/secrets.js` (created on demand)
- **Results:** `codeql/results/` (generated during scan)

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

### Quick Start for Contributors
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Ensure CodeQL passes (`npm run codeql:scan`)
5. Commit your changes (`git commit -m 'feat: add amazing feature'`)
6. Push to the branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

### Development Setup
```bash
git clone https://github.com/your-username/ghas-node-demo.git
cd ghas-node-demo
npm install
npm run codeql:download
```

## 📄 License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **GitHub Advanced Security** team for the excellent tooling
- **CodeQL community** for query contributions

---

**Ready to secure your code?** 🚀

Run `npm start` and start exploring GitHub Advanced Security!
