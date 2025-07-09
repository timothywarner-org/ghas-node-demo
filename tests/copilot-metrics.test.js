const {
  showCopilotMetricsDemo,
  checkGitHubCLISetup,
  showOrganizationMetrics,
  showEnterpriseMetrics,
  showUserMetrics,
  showExampleCommands,
  showTutorialInfo,
  showVisualizationConcepts
} = require('../src/copilot-metrics');

const fs = require('fs');
const path = require('path');

describe('GitHub Copilot Metrics Module', () => {
  describe('Module Exports', () => {
    test('should export all required functions', () => {
      expect(typeof showCopilotMetricsDemo).toBe('function');
      expect(typeof checkGitHubCLISetup).toBe('function');
      expect(typeof showOrganizationMetrics).toBe('function');
      expect(typeof showEnterpriseMetrics).toBe('function');
      expect(typeof showUserMetrics).toBe('function');
      expect(typeof showExampleCommands).toBe('function');
      expect(typeof showTutorialInfo).toBe('function');
      expect(typeof showVisualizationConcepts).toBe('function');
    });

    test('should have proper function names', () => {
      const copilotMetrics = require('../src/copilot-metrics');
      const exportedFunctions = Object.keys(copilotMetrics);
      
      expect(exportedFunctions).toContain('showCopilotMetricsDemo');
      expect(exportedFunctions).toContain('checkGitHubCLISetup');
      expect(exportedFunctions).toContain('showOrganizationMetrics');
      expect(exportedFunctions).toContain('showEnterpriseMetrics');
      expect(exportedFunctions).toContain('showUserMetrics');
      expect(exportedFunctions).toContain('showExampleCommands');
      expect(exportedFunctions).toContain('showTutorialInfo');
      expect(exportedFunctions).toContain('showVisualizationConcepts');
    });
  });

  describe('Function Structure', () => {
    test('functions should be properly defined', () => {
      // Test that functions don't throw immediately when imported
      expect(() => {
        require('../src/copilot-metrics');
      }).not.toThrow();
    });

    test('should contain proper dependencies', () => {
      const copilotMetricsCode = fs.readFileSync(
        path.join(__dirname, '../src/copilot-metrics.js'), 
        'utf8'
      );
      
      // Check for required dependencies
      expect(copilotMetricsCode).toMatch(/require\(['"]child_process['"]\)/);
      expect(copilotMetricsCode).toMatch(/require\(['"]util['"]\)/);
      expect(copilotMetricsCode).toMatch(/require\(['"]chalk['"]\)/);
      expect(copilotMetricsCode).toMatch(/require\(['"]inquirer['"]\)/);
    });

    test('should contain GitHub CLI commands', () => {
      const copilotMetricsCode = fs.readFileSync(
        path.join(__dirname, '../src/copilot-metrics.js'), 
        'utf8'
      );
      
      // Check for GitHub CLI API endpoints
      expect(copilotMetricsCode).toMatch(/\/orgs\/.*\/copilot\/usage/);
      expect(copilotMetricsCode).toMatch(/\/enterprises\/.*\/copilot\/usage/);
      expect(copilotMetricsCode).toMatch(/\/orgs\/.*\/copilot\/billing\/seats/);
    });

    test('should contain educational comments', () => {
      const copilotMetricsCode = fs.readFileSync(
        path.join(__dirname, '../src/copilot-metrics.js'), 
        'utf8'
      );
      
      // Check for educational comments
      expect(copilotMetricsCode).toMatch(/\/\*\*[\s\S]*GitHub Copilot Metrics/);
      expect(copilotMetricsCode).toMatch(/Key Learning Points:/);
      expect(copilotMetricsCode).toMatch(/GitHub CLI authentication/);
    });
  });

  describe('Integration with Main App', () => {
    test('should be properly imported in main index.js', () => {
      const indexCode = fs.readFileSync(
        path.join(__dirname, '../src/index.js'), 
        'utf8'
      );
      
      expect(indexCode).toMatch(/require\(['"]\.\/copilot-metrics['"]\)/);
      expect(indexCode).toMatch(/showCopilotMetricsDemo/);
    });

    test('should have new menu option in main app', () => {
      const indexCode = fs.readFileSync(
        path.join(__dirname, '../src/index.js'), 
        'utf8'
      );
      
      expect(indexCode).toMatch(/📊 GitHub Copilot Metrics Demo/);
      expect(indexCode).toMatch(/copilot-metrics/);
    });

    test('should have case handler for copilot-metrics', () => {
      const indexCode = fs.readFileSync(
        path.join(__dirname, '../src/index.js'), 
        'utf8'
      );
      
      expect(indexCode).toMatch(/case 'copilot-metrics':/);
      expect(indexCode).toMatch(/await showCopilotMetricsDemo\(\)/);
    });
  });

  describe('Documentation and Tutorial', () => {
    test('should have comprehensive tutorial file', () => {
      const tutorialPath = path.join(__dirname, '../COPILOT_METRICS_TUTORIAL.md');
      expect(fs.existsSync(tutorialPath)).toBe(true);
      
      const tutorialContent = fs.readFileSync(tutorialPath, 'utf8');
      expect(tutorialContent.length).toBeGreaterThan(1000); // Substantial content
    });

    test('tutorial should contain required sections', () => {
      const tutorialContent = fs.readFileSync(
        path.join(__dirname, '../COPILOT_METRICS_TUTORIAL.md'), 
        'utf8'
      );
      
      // Check for key sections
      expect(tutorialContent).toMatch(/## Prerequisites/);
      expect(tutorialContent).toMatch(/## GitHub CLI Setup/);
      expect(tutorialContent).toMatch(/## Understanding Copilot Metrics/);
      expect(tutorialContent).toMatch(/## Organization-Level Metrics/);
      expect(tutorialContent).toMatch(/## Enterprise-Level Metrics/);
      expect(tutorialContent).toMatch(/## Data Analysis and Visualization/);
      expect(tutorialContent).toMatch(/## Practical Use Cases/);
    });

    test('tutorial should contain code examples', () => {
      const tutorialContent = fs.readFileSync(
        path.join(__dirname, '../COPILOT_METRICS_TUTORIAL.md'), 
        'utf8'
      );
      
      // Check for code examples
      expect(tutorialContent).toMatch(/```bash/);
      expect(tutorialContent).toMatch(/gh api/);
      expect(tutorialContent).toMatch(/```python/);
      expect(tutorialContent).toMatch(/```html/); // JavaScript is in HTML blocks
    });

    test('tutorial should contain visualization examples', () => {
      const tutorialContent = fs.readFileSync(
        path.join(__dirname, '../COPILOT_METRICS_TUTORIAL.md'), 
        'utf8'
      );
      
      expect(tutorialContent).toMatch(/Chart\.js/);
      expect(tutorialContent).toMatch(/matplotlib/);
      expect(tutorialContent).toMatch(/visualization/i);
      expect(tutorialContent).toMatch(/dashboard/i);
    });
  });

  describe('Error Handling', () => {
    test('should contain error handling patterns', () => {
      const copilotMetricsCode = fs.readFileSync(
        path.join(__dirname, '../src/copilot-metrics.js'), 
        'utf8'
      );
      
      expect(copilotMetricsCode).toMatch(/try\s*{/);
      expect(copilotMetricsCode).toMatch(/catch\s*\(/);
      expect(copilotMetricsCode).toMatch(/handleAPIError/);
    });

    test('should have helpful error messages', () => {
      const copilotMetricsCode = fs.readFileSync(
        path.join(__dirname, '../src/copilot-metrics.js'), 
        'utf8'
      );
      
      expect(copilotMetricsCode).toMatch(/404.*not found|Organization\/Enterprise not found/i);
      expect(copilotMetricsCode).toMatch(/403.*permissions|Insufficient permissions/i);
      expect(copilotMetricsCode).toMatch(/401.*authentication|Authentication required/i);
    });
  });

  describe('GitHub CLI Integration', () => {
    test('should contain GitHub CLI setup instructions', () => {
      const copilotMetricsCode = fs.readFileSync(
        path.join(__dirname, '../src/copilot-metrics.js'), 
        'utf8'
      );
      
      expect(copilotMetricsCode).toMatch(/gh auth login/);
      expect(copilotMetricsCode).toMatch(/gh --version/);
      expect(copilotMetricsCode).toMatch(/brew install gh/);
    });

    test('should contain proper API endpoint examples', () => {
      const copilotMetricsCode = fs.readFileSync(
        path.join(__dirname, '../src/copilot-metrics.js'), 
        'utf8'
      );
      
      expect(copilotMetricsCode).toMatch(/gh api \/orgs\/\{[^}]+\}\/copilot\/usage/);
      expect(copilotMetricsCode).toMatch(/gh api \/enterprises\/\{[^}]+\}\/copilot\/usage/);
      expect(copilotMetricsCode).toMatch(/gh api \/orgs\/\{[^}]+\}\/copilot\/billing\/seats/);
    });
  });

  describe('Educational Content', () => {
    test('should contain metrics explanations', () => {
      const copilotMetricsCode = fs.readFileSync(
        path.join(__dirname, '../src/copilot-metrics.js'), 
        'utf8'
      );
      
      expect(copilotMetricsCode).toMatch(/Total Suggestions/);
      expect(copilotMetricsCode).toMatch(/Acceptance Rate/);
      expect(copilotMetricsCode).toMatch(/Active Users/);
    });

    test('should contain use case examples', () => {
      const copilotMetricsCode = fs.readFileSync(
        path.join(__dirname, '../src/copilot-metrics.js'), 
        'utf8'
      );
      
      expect(copilotMetricsCode).toMatch(/adoption patterns/);
      expect(copilotMetricsCode).toMatch(/productivity/);
      expect(copilotMetricsCode).toMatch(/ROI/);
    });

    test('should contain visualization concepts', () => {
      const copilotMetricsCode = fs.readFileSync(
        path.join(__dirname, '../src/copilot-metrics.js'), 
        'utf8'
      );
      
      expect(copilotMetricsCode).toMatch(/Chart\./);
      expect(copilotMetricsCode).toMatch(/visualization/i);
      expect(copilotMetricsCode).toMatch(/dashboard/i);
    });
  });

  describe('Comprehensive Feature Coverage', () => {
    test('should cover all required problem statement points', () => {
      const tutorialContent = fs.readFileSync(
        path.join(__dirname, '../COPILOT_METRICS_TUTORIAL.md'), 
        'utf8'
      );
      const copilotMetricsCode = fs.readFileSync(
        path.join(__dirname, '../src/copilot-metrics.js'), 
        'utf8'
      );
      
      // 1. Step-by-step tutorial
      expect(tutorialContent).toMatch(/Step \d+/); // Has numbered steps
      expect(tutorialContent).toMatch(/comprehensive guide/i);
      
      // 2. Practical use cases
      expect(tutorialContent).toMatch(/Practical Use Cases/);
      expect(tutorialContent).toMatch(/organization.*enterprise/i);
      
      // 3. Explanation of metrics
      expect(tutorialContent).toMatch(/Understanding Copilot Metrics/);
      expect(copilotMetricsCode).toMatch(/suggestions.*users|active.*users/i);
      
      // 4. Code snippets with GitHub CLI
      expect(tutorialContent).toMatch(/gh api/);
      expect(copilotMetricsCode).toMatch(/gh api/);
      
      // 5. Visualization ideas
      expect(tutorialContent).toMatch(/visualization/i);
      expect(tutorialContent).toMatch(/chart|dashboard/i);
      
      // 6. Detailed comments
      expect(copilotMetricsCode).toMatch(/\/\*\*[\s\S]*\*\//);
      expect(copilotMetricsCode).toMatch(/demonstrates how to use|Key Learning Points/i);
    });
  });
});