const https = require('https');
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const CODEQL_VERSION = '2.16.4';
const CLI_DIR = path.join(__dirname, '..', 'codeql', 'cli');

async function downloadCodeQL() {
  console.log('🔍 Downloading CodeQL CLI...');

  // Create CLI directory if it doesn't exist
  if (!fs.existsSync(CLI_DIR)) {
    fs.mkdirSync(CLI_DIR, { recursive: true });
  }

  const platform = process.platform === 'win32' ? 'win64' : 'linux64';
  const url = `https://github.com/github/codeql-cli-binaries/releases/download/v${CODEQL_VERSION}/codeql-${platform}.zip`;
  const zipPath = path.join(CLI_DIR, 'codeql.zip');

  console.log(`📥 Downloading from: ${url}`);

  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(zipPath);
    https.get(url, (response) => {
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        console.log('✅ Download complete');
        extractCodeQL(zipPath, resolve, reject);
      });
    }).on('error', (err) => {
      fs.unlink(zipPath, () => {}); // Delete the file async
      reject(err);
    });
  });
}

function extractCodeQL(zipPath, resolve, reject) {
  console.log('📦 Extracting CodeQL CLI...');

  try {
    // Use PowerShell to extract on Windows
    if (process.platform === 'win32') {
      execSync(`powershell -command "Expand-Archive -Path '${zipPath}' -DestinationPath '${CLI_DIR}' -Force"`, { stdio: 'inherit' });
    } else {
      execSync(`unzip -o "${zipPath}" -d "${CLI_DIR}"`, { stdio: 'inherit' });
    }

    // Clean up zip file
    fs.unlinkSync(zipPath);

    // Make codeql executable on Unix systems
    if (process.platform !== 'win32') {
      const codeqlPath = path.join(CLI_DIR, 'codeql', 'codeql');
      fs.chmodSync(codeqlPath, '755');
    }

    console.log('✅ CodeQL CLI extracted successfully');
    console.log(`📍 CLI location: ${path.join(CLI_DIR, 'codeql')}`);
    resolve();
  } catch (error) {
    reject(error);
  }
}

// Run the download
downloadCodeQL().catch(console.error);
