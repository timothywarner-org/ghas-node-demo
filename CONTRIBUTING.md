# Contributing to GHAS Node.js Demo

Thank you for your interest in contributing to the GitHub Advanced Security (GHAS) Node.js Demo! 🚀

## 🤝 How to Contribute

We welcome contributions from the community! Whether you're fixing a bug, adding a feature, or improving documentation, your help is appreciated.

### Types of Contributions

- 🐛 **Bug Reports** - Help us identify and fix issues
- ✨ **Feature Requests** - Suggest new functionality
- 📚 **Documentation** - Improve README, comments, or guides
- 🔧 **Code Improvements** - Refactor, optimize, or enhance existing code
- 🧪 **Tests** - Add or improve test coverage
- 🌍 **Localization** - Translate documentation or UI text

## 🚀 Quick Start

### Prerequisites
- Node.js 20+ (see `.nvmrc`)
- Git
- GitHub account

### Development Setup
```bash
# Fork and clone the repository
git clone https://github.com/your-username/ghas-node-demo.git
cd ghas-node-demo

# Install dependencies
npm install

# Download CodeQL CLI
npm run codeql:download

# Verify everything works
npm start
```

## 📋 Development Workflow

### 1. Create a Feature Branch
```bash
git checkout -b feature/your-feature-name
```

### 2. Make Your Changes
- Write clear, well-documented code
- Follow the existing code style
- Add comments for complex logic
- Update documentation if needed

### 3. Test Your Changes
```bash
# Run the demo app
npm start

# Run CodeQL scan (if applicable)
npm run codeql:scan

# Test any new functionality
```

### 4. Commit Your Changes
```bash
git add .
git commit -m "feat: add your feature description"
```

**Commit Message Guidelines:**
- Use conventional commit format: `type(scope): description`
- Types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`
- Keep descriptions clear and concise

### 5. Push and Create Pull Request
```bash
git push origin feature/your-feature-name
```

## 🎯 Contribution Guidelines

### Code Style
- Use **2 spaces** for indentation
- Follow **JavaScript Standard Style** conventions
- Use **ES6+** features when appropriate
- Add **JSDoc comments** for functions and classes

### Security Considerations
- **Never commit real secrets** - use fake/demo secrets only
- **Test CodeQL queries** before submitting
- **Follow security best practices** in demo code
- **Document any security implications** of changes

### Documentation
- Update **README.md** for user-facing changes
- Add **inline comments** for complex logic
- Update **PRD.md** if requirements change
- Include **usage examples** for new features

## 🐛 Reporting Issues

### Before Submitting
1. Check if the issue already exists
2. Try to reproduce the issue
3. Check the documentation

### Issue Template
```markdown
**Describe the bug**
A clear description of what the bug is.

**To Reproduce**
Steps to reproduce the behavior:
1. Run `npm start`
2. Select option '...'
3. See error

**Expected behavior**
A clear description of what you expected to happen.

**Environment:**
- OS: [e.g. Windows 10, macOS, Ubuntu]
- Node.js version: [e.g. 20.0.0]
- npm version: [e.g. 9.0.0]

**Additional context**
Add any other context about the problem here.
```

## ✨ Requesting Features

### Feature Request Template
```markdown
**Is your feature request related to a problem?**
A clear description of what the problem is.

**Describe the solution you'd like**
A clear description of what you want to happen.

**Describe alternatives you've considered**
A clear description of any alternative solutions.

**Additional context**
Add any other context or screenshots about the feature request.
```

## 🔍 CodeQL Contributions

### Adding Custom Queries
1. Create your query in `codeql/packs/custom/`
2. Follow the existing query structure
3. Add proper documentation and metadata
4. Test with `npm run codeql:scan`
5. Update `ghas-demo.qls` if needed

### Query Guidelines
- Use descriptive names and comments
- Include proper metadata (`@name`, `@description`, `@tags`)
- Test with the demo vulnerability patterns
- Follow CodeQL best practices

## 🧪 Testing

### Manual Testing
- Test all menu options in the demo app
- Verify CodeQL scans work correctly
- Check that vulnerabilities are properly injected
- Ensure reset functionality works

### Automated Testing
- Run `npm run codeql:scan` to verify security
- Check that GitHub Actions pass
- Verify Dependabot integration

## 📝 Pull Request Process

### Before Submitting
1. **Test thoroughly** - ensure all functionality works
2. **Update documentation** - README, comments, etc.
3. **Follow commit guidelines** - use conventional commits
4. **Check CodeQL** - ensure no new security issues

### PR Template
```markdown
**Description**
Brief description of changes.

**Type of change**
- [ ] Bug fix
- [ ] New feature
- [ ] Documentation update
- [ ] Code refactoring

**Testing**
- [ ] Manual testing completed
- [ ] CodeQL scan passes
- [ ] Documentation updated

**Screenshots** (if applicable)
Add screenshots to help explain your changes.

**Checklist**
- [ ] My code follows the style guidelines
- [ ] I have performed a self-review
- [ ] I have commented my code where needed
- [ ] I have made corresponding changes to documentation
- [ ] My changes generate no new warnings
- [ ] I have added tests if applicable
```

## 🏷️ Labels and Tags

We use the following labels for issues and PRs:

- `bug` - Something isn't working
- `enhancement` - New feature or request
- `documentation` - Improvements to documentation
- `good first issue` - Good for newcomers
- `help wanted` - Extra attention is needed
- `security` - Security-related changes
- `codeql` - CodeQL query improvements
- `demo` - Demo-specific changes

## 🎉 Recognition

Contributors will be recognized in:
- **README.md** acknowledgments
- **GitHub contributors** list
- **Release notes** for significant contributions

## 📞 Getting Help

- **Issues:** Use GitHub Issues for bugs and feature requests
- **Discussions:** Use GitHub Discussions for questions and ideas
- **Security:** Report security issues privately to maintainers

## 📄 License

By contributing, you agree that your contributions will be licensed under the ISC License.

---

**Thank you for contributing to GHAS education!** 🛡️✨
