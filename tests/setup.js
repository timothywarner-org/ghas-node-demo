// Global test setup for GHAS Demo App

// Mock inquirer to avoid interactive prompts during tests
jest.mock('inquirer', () => ({
  prompt: jest.fn()
}));

// Mock figlet to avoid ASCII art generation during tests
jest.mock('figlet', () => ({
  textSync: jest.fn(() => 'MOCKED FIGLET TEXT')
}));

// Mock chalk to avoid color codes in test output
jest.mock('chalk', () => ({
  cyan: jest.fn((text) => text),
  yellow: jest.fn((text) => text),
  green: jest.fn((text) => text),
  red: jest.fn((text) => text),
  blue: jest.fn((text) => text)
}));

// Global test utilities
global.testUtils = {
  // Helper to capture console output
  captureConsoleOutput: () => {
    const output = [];
    const originalLog = console.log;
    console.log = jest.fn((...args) => {
      output.push(args.join(' '));
    });
    return {
      output,
      restore: () => {
        console.log = originalLog;
      }
    };
  },

  // Helper to mock file system operations
  mockFileSystem: (mockData = {}) => {
    const originalReadFileSync = require('fs').readFileSync;
    const originalWriteFileSync = require('fs').writeFileSync;

    require('fs').readFileSync = jest.fn((path) => {
      if (mockData[path]) {
        return mockData[path];
      }
      return originalReadFileSync(path);
    });

    require('fs').writeFileSync = jest.fn();

    return {
      restore: () => {
        require('fs').readFileSync = originalReadFileSync;
        require('fs').writeFileSync = originalWriteFileSync;
      }
    };
  }
};
