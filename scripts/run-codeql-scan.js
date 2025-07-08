const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const CLI_DIR = path.join(__dirname, '..', 'codeql', 'cli');
const CUSTOM_PACK_DIR = path.join(__dirname, '..', 'codeql', 'packs', 'custom');
const DATABASE_DIR = path.join(__dirname, '..', 'codeql', 'database');
const RESULTS_DIR = path.join(__dirname, '..', 'codeql', 'results');

function getCodeQLPath() {
  const platform = process.platform === 'win32' ? 'codeql.exe' : 'codeql';
  return path.join(CLI_DIR, 'codeql', platform);
}

function ensureDirectories() {
  [DATABASE_DIR, RESULTS_DIR].forEach(dir => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  });
}

function runCodeQLScan() {
  console.log('🔍 Starting CodeQL scan...');

  const codeqlPath = getCodeQLPath();

  if (!fs.existsSync(codeqlPath)) {
    console.error('❌ CodeQL CLI not found. Run "npm run codeql:download" first.');
    process.exit(1);
  }

  ensureDirectories();

  try {
    // Create database
    console.log('📊 Creating CodeQL database...');
    execSync(`${codeqlPath} database create ${DATABASE_DIR} --language=javascript --source-root=.`, {
      stdio: 'inherit',
      cwd: path.join(__dirname, '..')
    });

    // Run analysis with custom suite
    console.log('🔎 Running CodeQL analysis...');
    const suitePath = path.join(CUSTOM_PACK_DIR, 'ghas-demo.qls');

    execSync(`${codeqlPath} database analyze ${DATABASE_DIR} ${suitePath} --format=sarif-latest --output=${path.join(RESULTS_DIR, 'results.sarif')}`, {
      stdio: 'inherit'
    });

    // Generate summary
    console.log('📋 Generating results summary...');
    execSync(`${codeqlPath} bqrs decode --format=csv ${path.join(RESULTS_DIR, 'results.bqrs')}`, {
      stdio: 'inherit'
    });

    console.log('✅ CodeQL scan completed successfully!');
    console.log(`📁 Results saved to: ${RESULTS_DIR}`);

  } catch (error) {
    console.error('❌ CodeQL scan failed:', error.message);
    process.exit(1);
  }
}

// Run the scan
runCodeQLScan();
