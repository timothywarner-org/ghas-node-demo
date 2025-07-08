# Security Policy

## Supported Versions

Use this section to tell people about which versions of your project are currently being supported with security updates.

| Version | Supported          |
| ------- | ------------------ |
| 1.0.x   | :white_check_mark: |

## Reporting a Vulnerability

We take the security of the GHAS Node.js Demo seriously. If you believe you have found a security vulnerability, please report it to us as described below.

**Please do not report security vulnerabilities through public GitHub issues.**

Instead, please report them via email to the maintainers at timothywarner316@gmail.com.

You should receive a response within 48 hours. If for some reason you do not, please follow up via email to ensure we received your original message.

Please include the requested information listed below (as much as you can provide) to help us better understand the nature and scope of the possible issue:

* **Type of issue** (buffer overflow, SQL injection, cross-site scripting, etc.)
* **Full paths of source file(s) related to the vulnerability**
* **The location of the affected source code (tag/branch/commit or direct URL)**
* **Any special configuration required to reproduce the issue**
* **Step-by-step instructions to reproduce the issue**
* **Proof-of-concept or exploit code (if possible)**
* **Impact of the issue, including how an attacker might exploit it**

This information will help us triage your report more quickly.

## Preferred Languages

We prefer all communications to be in English.

## Policy

We take security seriously and will make every effort to promptly address any reported issues. We appreciate your efforts to responsibly disclose your findings, and will make every effort to acknowledge your contributions.

## Security Considerations for Contributors

When contributing to this project, please keep in mind:

1. **Never commit real secrets** - This is a demo project, so only use fake/demo secrets
2. **Test CodeQL queries** - Ensure custom queries don't introduce false positives
3. **Follow security best practices** - Even in demo code, model good security practices
4. **Document security implications** - If your changes have security implications, document them clearly

## Security Features

This demo project includes several security features:

- **CodeQL Analysis** - Automated security scanning
- **Secret Scanning** - Detection of accidentally committed secrets
- **Dependency Scanning** - Automated vulnerability detection in dependencies
- **Branch Protection** - Required reviews and status checks

## Responsible Disclosure Timeline

- **48 hours** - Initial response to security report
- **7 days** - Status update and timeline for fix
- **30 days** - Public disclosure (if applicable)

## Recognition

Security researchers who responsibly disclose vulnerabilities will be recognized in:

- Security advisories
- Release notes
- README acknowledgments (if desired)

Thank you for helping keep the GHAS community secure! 🛡️
