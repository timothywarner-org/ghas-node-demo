const { exec } = require('child_process');
const { promisify } = require('util');
const chalk = require('chalk');
const inquirer = require('inquirer');

const execAsync = promisify(exec);

/**
 * GitHub Copilot Metrics Demo Module
 * 
 * This module demonstrates how to use GitHub CLI to interact with 
 * GitHub Copilot's Metrics API for organization and enterprise insights.
 * 
 * Key Learning Points:
 * - GitHub CLI authentication and setup
 * - Copilot usage metrics API endpoints
 * - Data interpretation and visualization concepts
 * - Organization vs Enterprise level access
 */

/**
 * Main entry point for Copilot Metrics demo
 * Presents a submenu with different metrics examples
 */
async function showCopilotMetricsDemo() {
  console.log(chalk.cyan('\n📊 GitHub Copilot Metrics API Demo\n'));
  console.log(chalk.yellow('This demo shows how to use GitHub CLI to fetch Copilot usage metrics.'));
  console.log(chalk.blue('Note: Requires GitHub CLI (gh) installed and authenticated.\n'));

  const { choice } = await inquirer.prompt([
    {
      type: 'list',
      name: 'choice',
      message: 'What would you like to explore?',
      choices: [
        { name: '🔧 Check GitHub CLI Setup', value: 'setup' },
        { name: '📈 Organization Usage Metrics', value: 'org-usage' },
        { name: '🏢 Enterprise Usage Metrics', value: 'enterprise-usage' },
        { name: '👥 User Activity Metrics', value: 'user-metrics' },
        { name: '💡 View Example Commands', value: 'examples' },
        { name: '📚 View Tutorial Documentation', value: 'tutorial' },
        { name: '📊 Data Visualization Concepts', value: 'visualization' },
        { name: '↩️ Back to Main Menu', value: 'back' }
      ]
    }
  ]);

  switch (choice) {
    case 'setup':
      await checkGitHubCLISetup();
      break;
    case 'org-usage':
      await showOrganizationMetrics();
      break;
    case 'enterprise-usage':
      await showEnterpriseMetrics();
      break;
    case 'user-metrics':
      await showUserMetrics();
      break;
    case 'examples':
      await showExampleCommands();
      break;
    case 'tutorial':
      await showTutorialInfo();
      break;
    case 'visualization':
      await showVisualizationConcepts();
      break;
    case 'back':
      return; // Return to main menu
  }

  // Show submenu again unless returning to main menu
  if (choice !== 'back') {
    await showCopilotMetricsDemo();
  }
}

/**
 * Check if GitHub CLI is installed and authenticated
 * Provides setup instructions if not ready
 */
async function checkGitHubCLISetup() {
  console.log(chalk.yellow('\n🔧 Checking GitHub CLI Setup...\n'));

  try {
    // Check if gh CLI is installed
    const { stdout: version } = await execAsync('gh --version');
    console.log(chalk.green('✅ GitHub CLI is installed:'));
    console.log(chalk.gray(version.split('\n')[0]));

    // Check authentication status
    const { stdout: authStatus } = await execAsync('gh auth status');
    console.log(chalk.green('\n✅ GitHub CLI is authenticated:'));
    console.log(chalk.gray(authStatus));

    console.log(chalk.blue('\n💡 Your GitHub CLI is ready for Copilot metrics!'));

  } catch (error) {
    console.log(chalk.red('❌ GitHub CLI setup issue detected.\n'));
    
    if (error.message.includes('gh: command not found') || error.code === 'ENOENT') {
      console.log(chalk.yellow('GitHub CLI is not installed. To install:'));
      console.log(chalk.gray('• macOS: brew install gh'));
      console.log(chalk.gray('• Windows: winget install --id GitHub.cli'));
      console.log(chalk.gray('• Linux: See https://github.com/cli/cli/blob/trunk/docs/install_linux.md'));
    } else if (error.message.includes('not logged in') || error.message.includes('authentication')) {
      console.log(chalk.yellow('GitHub CLI is installed but not authenticated.'));
      console.log(chalk.gray('Run: gh auth login'));
      console.log(chalk.gray('Choose "GitHub.com" and follow the authentication flow.'));
    } else {
      console.log(chalk.gray(`Error details: ${error.message}`));
    }

    console.log(chalk.blue('\n📖 For more info: https://cli.github.com/'));
  }
}

/**
 * Demonstrate organization-level Copilot metrics
 * Shows usage patterns, adoption rates, and user engagement
 */
async function showOrganizationMetrics() {
  console.log(chalk.yellow('\n📈 Organization-Level Copilot Metrics\n'));

  const { orgName } = await inquirer.prompt([
    {
      type: 'input',
      name: 'orgName',
      message: 'Enter your organization name (e.g., "octocat-org"):',
      validate: input => input.length > 0 || 'Organization name is required'
    }
  ]);

  console.log(chalk.blue(`\n🔍 Fetching Copilot metrics for organization: ${orgName}\n`));

  // Example command for organization usage metrics
  const usageCommand = `gh api /orgs/${orgName}/copilot/usage`;
  console.log(chalk.cyan('Command for usage metrics:'));
  console.log(chalk.gray(`$ ${usageCommand}`));

  try {
    console.log(chalk.yellow('\n⏳ Executing command...\n'));
    const { stdout } = await execAsync(usageCommand);
    const metrics = JSON.parse(stdout);
    
    displayOrganizationUsageMetrics(metrics);
    
  } catch (error) {
    handleAPIError(error, 'organization usage');
    showOrganizationMetricsExamples();
  }
}

/**
 * Display formatted organization usage metrics
 */
function displayOrganizationUsageMetrics(metrics) {
  console.log(chalk.green('✅ Organization Copilot Usage Metrics:\n'));
  
  if (metrics && metrics.length > 0) {
    metrics.forEach((dayMetrics, index) => {
      console.log(chalk.cyan(`📅 Date: ${dayMetrics.day}`));
      console.log(chalk.gray(`   Total Suggestions: ${dayMetrics.total_suggestions_count || 'N/A'}`));
      console.log(chalk.gray(`   Accepted Suggestions: ${dayMetrics.total_acceptances_count || 'N/A'}`));
      console.log(chalk.gray(`   Active Users: ${dayMetrics.total_active_users || 'N/A'}`));
      
      if (dayMetrics.total_suggestions_count && dayMetrics.total_acceptances_count) {
        const acceptanceRate = ((dayMetrics.total_acceptances_count / dayMetrics.total_suggestions_count) * 100).toFixed(2);
        console.log(chalk.green(`   Acceptance Rate: ${acceptanceRate}%`));
      }
      
      if (index < metrics.length - 1) console.log('');
    });
  } else {
    console.log(chalk.yellow('No metrics data available for this organization.'));
  }
}

/**
 * Show example organization metrics when API call fails
 */
function showOrganizationMetricsExamples() {
  console.log(chalk.blue('\n📊 Example Organization Metrics Data:\n'));
  
  const exampleMetrics = [
    {
      day: '2024-01-15',
      total_suggestions_count: 1250,
      total_acceptances_count: 875,
      total_active_users: 45
    },
    {
      day: '2024-01-14',
      total_suggestions_count: 1180,
      total_acceptances_count: 820,
      total_active_users: 42
    }
  ];

  displayOrganizationUsageMetrics(exampleMetrics);
  
  console.log(chalk.yellow('\n💡 Key Insights from Organization Metrics:'));
  console.log(chalk.gray('• Track daily adoption and engagement trends'));
  console.log(chalk.gray('• Monitor acceptance rates to gauge developer satisfaction'));
  console.log(chalk.gray('• Identify most active development periods'));
  console.log(chalk.gray('• Measure ROI through productivity improvements'));
}

/**
 * Demonstrate enterprise-level Copilot metrics
 */
async function showEnterpriseMetrics() {
  console.log(chalk.yellow('\n🏢 Enterprise-Level Copilot Metrics\n'));

  const { enterpriseName } = await inquirer.prompt([
    {
      type: 'input',
      name: 'enterpriseName',
      message: 'Enter your enterprise name (e.g., "acme-corp"):',
      validate: input => input.length > 0 || 'Enterprise name is required'
    }
  ]);

  console.log(chalk.blue(`\n🔍 Fetching Copilot metrics for enterprise: ${enterpriseName}\n`));

  // Example command for enterprise usage metrics
  const usageCommand = `gh api /enterprises/${enterpriseName}/copilot/usage`;
  console.log(chalk.cyan('Command for enterprise usage metrics:'));
  console.log(chalk.gray(`$ ${usageCommand}`));

  try {
    console.log(chalk.yellow('\n⏳ Executing command...\n'));
    const { stdout } = await execAsync(usageCommand);
    const metrics = JSON.parse(stdout);
    
    displayEnterpriseUsageMetrics(metrics);
    
  } catch (error) {
    handleAPIError(error, 'enterprise usage');
    showEnterpriseMetricsExamples();
  }
}

/**
 * Display formatted enterprise usage metrics
 */
function displayEnterpriseUsageMetrics(metrics) {
  console.log(chalk.green('✅ Enterprise Copilot Usage Metrics:\n'));
  
  if (metrics && metrics.length > 0) {
    metrics.forEach((dayMetrics, index) => {
      console.log(chalk.cyan(`📅 Date: ${dayMetrics.day}`));
      console.log(chalk.gray(`   Total Suggestions: ${dayMetrics.total_suggestions_count || 'N/A'}`));
      console.log(chalk.gray(`   Accepted Suggestions: ${dayMetrics.total_acceptances_count || 'N/A'}`));
      console.log(chalk.gray(`   Active Users: ${dayMetrics.total_active_users || 'N/A'}`));
      console.log(chalk.gray(`   Active Organizations: ${dayMetrics.total_active_organizations || 'N/A'}`));
      
      if (dayMetrics.total_suggestions_count && dayMetrics.total_acceptances_count) {
        const acceptanceRate = ((dayMetrics.total_acceptances_count / dayMetrics.total_suggestions_count) * 100).toFixed(2);
        console.log(chalk.green(`   Acceptance Rate: ${acceptanceRate}%`));
      }
      
      if (index < metrics.length - 1) console.log('');
    });
  } else {
    console.log(chalk.yellow('No metrics data available for this enterprise.'));
  }
}

/**
 * Show example enterprise metrics when API call fails
 */
function showEnterpriseMetricsExamples() {
  console.log(chalk.blue('\n📊 Example Enterprise Metrics Data:\n'));
  
  const exampleMetrics = [
    {
      day: '2024-01-15',
      total_suggestions_count: 15750,
      total_acceptances_count: 11025,
      total_active_users: 485,
      total_active_organizations: 12
    },
    {
      day: '2024-01-14',
      total_suggestions_count: 14200,
      total_acceptances_count: 9940,
      total_active_users: 445,
      total_active_organizations: 11
    }
  ];

  displayEnterpriseUsageMetrics(exampleMetrics);
  
  console.log(chalk.yellow('\n💡 Key Insights from Enterprise Metrics:'));
  console.log(chalk.gray('• Cross-organization adoption patterns'));
  console.log(chalk.gray('• Enterprise-wide productivity impact'));
  console.log(chalk.gray('• Resource allocation and licensing optimization'));
  console.log(chalk.gray('• Multi-team collaboration effectiveness'));
}

/**
 * Show user-level metrics and seat information
 */
async function showUserMetrics() {
  console.log(chalk.yellow('\n👥 User Activity and Seat Metrics\n'));

  const { orgName } = await inquirer.prompt([
    {
      type: 'input',
      name: 'orgName',
      message: 'Enter organization name for user metrics:',
      validate: input => input.length > 0 || 'Organization name is required'
    }
  ]);

  // Show seat information command
  const seatsCommand = `gh api /orgs/${orgName}/copilot/billing/seats`;
  console.log(chalk.cyan('Command for seat information:'));
  console.log(chalk.gray(`$ ${seatsCommand}`));
  
  try {
    console.log(chalk.yellow('\n⏳ Fetching seat information...\n'));
    const { stdout } = await execAsync(seatsCommand);
    const seatsData = JSON.parse(stdout);
    
    displayUserSeatsInfo(seatsData);
    
  } catch (error) {
    handleAPIError(error, 'user seats');
    showUserMetricsExamples();
  }
}

/**
 * Display user seats information
 */
function displayUserSeatsInfo(seatsData) {
  console.log(chalk.green('✅ Copilot Seat Information:\n'));
  
  if (seatsData && seatsData.seats && seatsData.seats.length > 0) {
    console.log(chalk.cyan(`Total Seats: ${seatsData.total_seats || seatsData.seats.length}`));
    console.log(chalk.gray(`Active Seats: ${seatsData.seats.filter(seat => seat.assignee).length}\n`));
    
    seatsData.seats.slice(0, 5).forEach(seat => {
      if (seat.assignee) {
        console.log(chalk.blue(`👤 ${seat.assignee.login}`));
        console.log(chalk.gray(`   Type: ${seat.assignee.type}`));
        console.log(chalk.gray(`   Last Activity: ${seat.last_activity_at || 'N/A'}`));
        console.log(chalk.gray(`   Created: ${seat.created_at}`));
        console.log('');
      }
    });
    
    if (seatsData.seats.length > 5) {
      console.log(chalk.gray(`... and ${seatsData.seats.length - 5} more seats`));
    }
  } else {
    console.log(chalk.yellow('No seat information available.'));
  }
}

/**
 * Show example user metrics
 */
function showUserMetricsExamples() {
  console.log(chalk.blue('\n📊 Example User Metrics Data:\n'));
  
  console.log(chalk.green('✅ Example Copilot Seat Information:'));
  console.log(chalk.cyan('Total Seats: 50'));
  console.log(chalk.gray('Active Seats: 45\n'));
  
  const exampleUsers = [
    { login: 'developer1', type: 'User', last_activity: '2024-01-15T10:30:00Z' },
    { login: 'developer2', type: 'User', last_activity: '2024-01-15T09:15:00Z' },
    { login: 'team-lead', type: 'User', last_activity: '2024-01-14T16:45:00Z' }
  ];
  
  exampleUsers.forEach(user => {
    console.log(chalk.blue(`👤 ${user.login}`));
    console.log(chalk.gray(`   Type: ${user.type}`));
    console.log(chalk.gray(`   Last Activity: ${user.last_activity}`));
    console.log('');
  });
  
  console.log(chalk.yellow('💡 User Metrics Insights:'));
  console.log(chalk.gray('• Track individual developer engagement'));
  console.log(chalk.gray('• Monitor seat utilization and licensing costs'));
  console.log(chalk.gray('• Identify most active contributors'));
  console.log(chalk.gray('• Plan capacity and team expansion'));
}

/**
 * Show comprehensive GitHub CLI command examples
 */
async function showExampleCommands() {
  console.log(chalk.yellow('\n💡 GitHub CLI Command Examples for Copilot Metrics\n'));
  
  const commands = [
    {
      title: 'Organization Usage Metrics',
      command: 'gh api /orgs/{org}/copilot/usage',
      description: 'Get daily usage metrics for an organization',
      example: 'gh api /orgs/github/copilot/usage'
    },
    {
      title: 'Enterprise Usage Metrics', 
      command: 'gh api /enterprises/{enterprise}/copilot/usage',
      description: 'Get daily usage metrics for an enterprise',
      example: 'gh api /enterprises/acme-corp/copilot/usage'
    },
    {
      title: 'Organization Seat Information',
      command: 'gh api /orgs/{org}/copilot/billing/seats',
      description: 'Get Copilot seat assignments and billing info',
      example: 'gh api /orgs/github/copilot/billing/seats'
    },
    {
      title: 'Formatted JSON Output',
      command: 'gh api /orgs/{org}/copilot/usage | jq .',
      description: 'Pretty-print JSON output using jq',
      example: 'gh api /orgs/github/copilot/usage | jq .'
    },
    {
      title: 'Save to File',
      command: 'gh api /orgs/{org}/copilot/usage > metrics.json',
      description: 'Save metrics data to a file for analysis',
      example: 'gh api /orgs/github/copilot/usage > copilot-metrics-2024.json'
    },
    {
      title: 'Filter Recent Data',
      command: 'gh api "/orgs/{org}/copilot/usage?since=2024-01-01"',
      description: 'Filter metrics since a specific date',
      example: 'gh api "/orgs/github/copilot/usage?since=2024-01-01"'
    }
  ];
  
  commands.forEach((cmd, index) => {
    console.log(chalk.cyan(`${index + 1}. ${cmd.title}`));
    console.log(chalk.gray(`   Command: ${cmd.command}`));
    console.log(chalk.blue(`   Description: ${cmd.description}`));
    console.log(chalk.yellow(`   Example: ${cmd.example}`));
    console.log('');
  });
  
  console.log(chalk.green('🔧 Prerequisites:'));
  console.log(chalk.gray('• GitHub CLI installed and authenticated'));
  console.log(chalk.gray('• Appropriate permissions (org admin/enterprise admin)'));
  console.log(chalk.gray('• GitHub Copilot Business/Enterprise subscription'));
  console.log(chalk.gray('• jq installed for JSON formatting (optional)'));
}

/**
 * Show tutorial information and documentation links
 */
async function showTutorialInfo() {
  console.log(chalk.yellow('\n📚 GitHub Copilot Metrics Tutorial Information\n'));
  
  console.log(chalk.cyan('📖 Step-by-Step Tutorial:'));
  console.log(chalk.blue('See COPILOT_METRICS_TUTORIAL.md for comprehensive documentation'));
  console.log('');
  
  console.log(chalk.cyan('🔗 Official Documentation:'));
  console.log(chalk.gray('• GitHub Copilot API: https://docs.github.com/en/rest/copilot'));
  console.log(chalk.gray('• GitHub CLI: https://cli.github.com/'));
  console.log(chalk.gray('• Copilot for Business: https://docs.github.com/en/copilot/copilot-for-business'));
  console.log('');
  
  console.log(chalk.cyan('🎯 Learning Objectives:'));
  console.log(chalk.gray('• Understand GitHub CLI authentication and setup'));
  console.log(chalk.gray('• Learn Copilot metrics API endpoints and data structure'));
  console.log(chalk.gray('• Interpret usage patterns and adoption metrics'));
  console.log(chalk.gray('• Implement data visualization and reporting'));
  console.log(chalk.gray('• Apply insights for organizational decision-making'));
  console.log('');
  
  console.log(chalk.cyan('🛠️ Tools and Technologies:'));
  console.log(chalk.gray('• GitHub CLI (gh)'));
  console.log(chalk.gray('• GitHub REST API'));
  console.log(chalk.gray('• JSON processing tools (jq)'));
  console.log(chalk.gray('• Data visualization libraries'));
}

/**
 * Show data visualization concepts and examples
 */
async function showVisualizationConcepts() {
  console.log(chalk.yellow('\n📊 Data Visualization Concepts for Copilot Metrics\n'));
  
  console.log(chalk.cyan('📈 Recommended Chart Types:'));
  console.log('');
  
  const chartTypes = [
    {
      type: 'Time Series Line Chart',
      useCase: 'Daily suggestions and acceptance trends',
      tools: 'Chart.js, D3.js, Plotly',
      description: 'Track usage patterns over time'
    },
    {
      type: 'Bar Chart',
      useCase: 'User adoption and activity levels',
      tools: 'Chart.js, Matplotlib, ggplot2',
      description: 'Compare metrics across teams/organizations'
    },
    {
      type: 'Pie Chart',
      useCase: 'Acceptance rate distribution',
      tools: 'Chart.js, D3.js, Highcharts',
      description: 'Show proportion of accepted vs rejected suggestions'
    },
    {
      type: 'Heatmap',
      useCase: 'Activity patterns by time/day',
      tools: 'D3.js, Seaborn, Plotly',
      description: 'Identify peak usage periods'
    },
    {
      type: 'Dashboard',
      useCase: 'Real-time metrics overview',
      tools: 'Grafana, Tableau, Power BI',
      description: 'Comprehensive metrics monitoring'
    }
  ];
  
  chartTypes.forEach((chart, index) => {
    console.log(chalk.blue(`${index + 1}. ${chart.type}`));
    console.log(chalk.gray(`   Use Case: ${chart.useCase}`));
    console.log(chalk.gray(`   Tools: ${chart.tools}`));
    console.log(chalk.yellow(`   Description: ${chart.description}`));
    console.log('');
  });
  
  console.log(chalk.cyan('💡 Visualization Best Practices:'));
  console.log(chalk.gray('• Use consistent color schemes and themes'));
  console.log(chalk.gray('• Include clear labels and legends'));
  console.log(chalk.gray('• Provide interactive filtering and drilling down'));
  console.log(chalk.gray('• Add trend lines and statistical indicators'));
  console.log(chalk.gray('• Export capabilities for reports and presentations'));
  console.log('');
  
  console.log(chalk.cyan('📋 Example Metrics Dashboard Components:'));
  console.log(chalk.gray('• Total suggestions and acceptance rate KPIs'));
  console.log(chalk.gray('• Daily/weekly/monthly trend charts'));
  console.log(chalk.gray('• Top active users and teams leaderboard'));
  console.log(chalk.gray('• Language-specific usage patterns'));
  console.log(chalk.gray('• Cost per suggestion and ROI calculations'));
}

/**
 * Handle API errors with helpful messages
 */
function handleAPIError(error, context) {
  console.log(chalk.red(`❌ Error fetching ${context} metrics:\n`));
  
  if (error.message.includes('404')) {
    console.log(chalk.yellow('• Organization/Enterprise not found or no access'));
    console.log(chalk.gray('• Verify the organization/enterprise name is correct'));
    console.log(chalk.gray('• Ensure you have admin permissions'));
  } else if (error.message.includes('403')) {
    console.log(chalk.yellow('• Insufficient permissions'));
    console.log(chalk.gray('• You need admin access to view Copilot metrics'));
    console.log(chalk.gray('• Contact your organization administrator'));
  } else if (error.message.includes('401')) {
    console.log(chalk.yellow('• Authentication required'));
    console.log(chalk.gray('• Run: gh auth login'));
    console.log(chalk.gray('• Ensure you have a valid GitHub token'));
  } else {
    console.log(chalk.gray(`Error details: ${error.message}`));
  }
  
  console.log(chalk.blue('\n💡 Showing example data instead...\n'));
}

module.exports = {
  showCopilotMetricsDemo,
  checkGitHubCLISetup,
  showOrganizationMetrics,
  showEnterpriseMetrics,
  showUserMetrics,
  showExampleCommands,
  showTutorialInfo,
  showVisualizationConcepts
};