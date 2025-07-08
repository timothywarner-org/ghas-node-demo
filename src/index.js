#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const figlet = require('figlet');
const inquirer = require('inquirer');

// ASCII Art Banner
console.clear();
console.log(chalk.cyan(figlet.textSync('GHAS Demo', { horizontalLayout: 'full' })));
console.log(chalk.yellow('GitHub Advanced Security Demo Console\n'));

async function showMenu() {
  const { action } = await inquirer.prompt([
    {
      type: 'list',
      name: 'action',
      message: 'What would you like to do?',
      choices: [
        { name: '🔧 Inject Dependency Issue', value: 'dependency' },
        { name: '🔍 Inject Code Scanning Issue', value: 'codescan' },
        { name: '🔐 Inject Secret Scanning Issue', value: 'secret' },
        { name: '🚪 Exit', value: 'exit' }
      ]
    }
  ]);

  switch (action) {
    case 'dependency':
      await injectDependencyIssue();
      break;
    case 'codescan':
      await injectCodeScanIssue();
      break;
    case 'secret':
      await injectSecretIssue();
      break;
    case 'exit':
      console.log(chalk.green('👋 Thanks for using GHAS Demo!'));
      process.exit(0);
  }

  // Show menu again
  await showMenu();
}

async function injectDependencyIssue() {
  console.log(chalk.yellow('🔧 Injecting vulnerable dependency...'));

  const packageJsonPath = path.join(__dirname, '..', 'package.json');
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

  // Add a known vulnerable version of lodash
  packageJson.dependencies = packageJson.dependencies || {};
  packageJson.dependencies.lodash = '4.17.20'; // Known vulnerable version

  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));

  console.log(chalk.red('✅ Injected vulnerable lodash@4.17.20'));
  console.log(chalk.blue('💡 This will trigger Dependabot alerts on push'));
}

async function injectCodeScanIssue() {
  console.log(chalk.yellow('🔍 Injecting code scanning issue...'));

  const vulnerableCode = `
// VULNERABLE CODE - FOR DEMO PURPOSES ONLY
function processUserInput(userInput) {
  // This is intentionally vulnerable for GHAS demo
  return eval(userInput); // ⚠️ SECURITY RISK: eval() with user input
}

function sqlQuery(userId) {
  // This is intentionally vulnerable for GHAS demo
  const query = \`SELECT * FROM users WHERE id = \${userId}\`; // ⚠️ SQL Injection risk
  return query;
}

module.exports = { processUserInput, sqlQuery };
`;

  const vulnerableFilePath = path.join(__dirname, 'vulnerable.js');
  fs.writeFileSync(vulnerableFilePath, vulnerableCode);

  console.log(chalk.red('✅ Injected vulnerable code patterns'));
  console.log(chalk.blue('💡 This will trigger CodeQL alerts'));
}

async function injectSecretIssue() {
  console.log(chalk.yellow('🔐 Injecting secret scanning issue...'));

  const secretCode = `
// DEMO SECRETS - FOR GHAS DEMO PURPOSES ONLY
// These are fake secrets that will trigger Secret Scanning

const STRIPE_API_KEY = 'sk_test_51ABC123DEF456GHI789JKL012MNO345PQR678STU901VWX234YZA567BCD890EFG';
const AWS_ACCESS_KEY = 'AKIAIOSFODNN7EXAMPLE';
const GITHUB_TOKEN = 'ghp_1234567890abcdef1234567890abcdef12345678';

module.exports = {
  STRIPE_API_KEY,
  AWS_ACCESS_KEY,
  GITHUB_TOKEN
};
`;

  const secretFilePath = path.join(__dirname, 'secrets.js');
  fs.writeFileSync(secretFilePath, secretCode);

  console.log(chalk.red('✅ Injected fake secrets'));
  console.log(chalk.blue('💡 This will trigger Secret Scanning alerts'));
}

// Start the app
showMenu().catch(console.error);
