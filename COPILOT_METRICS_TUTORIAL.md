# GitHub CLI and Copilot Metrics API Tutorial

## Overview

This tutorial provides a comprehensive guide to using GitHub CLI (gh) to interact with GitHub Copilot's Metrics API. You'll learn how to fetch, analyze, and visualize Copilot usage data at organization and enterprise levels.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [GitHub CLI Setup](#github-cli-setup)
3. [Understanding Copilot Metrics](#understanding-copilot-metrics)
4. [Organization-Level Metrics](#organization-level-metrics)
5. [Enterprise-Level Metrics](#enterprise-level-metrics)
6. [User and Seat Management](#user-and-seat-management)
7. [Data Analysis and Visualization](#data-analysis-and-visualization)
8. [Practical Use Cases](#practical-use-cases)
9. [Best Practices](#best-practices)
10. [Troubleshooting](#troubleshooting)

## Prerequisites

Before starting this tutorial, ensure you have:

- ✅ **GitHub Account** with appropriate permissions
- ✅ **GitHub Copilot Business or Enterprise** subscription
- ✅ **Admin access** to your organization or enterprise
- ✅ **Command line access** (Terminal, PowerShell, or Command Prompt)
- ✅ **Basic knowledge** of REST APIs and JSON

### Permission Requirements

| Level | Required Role | Access Scope |
|-------|---------------|--------------|
| Organization | Organization Admin | Org-level metrics and seat management |
| Enterprise | Enterprise Admin | Enterprise-wide metrics across orgs |

## GitHub CLI Setup

### Step 1: Install GitHub CLI

#### macOS
```bash
# Using Homebrew
brew install gh

# Using MacPorts
sudo port install gh
```

#### Windows
```powershell
# Using winget
winget install --id GitHub.cli

# Using Chocolatey
choco install gh

# Using Scoop
scoop install gh
```

#### Linux
```bash
# Ubuntu/Debian
curl -fsSL https://cli.github.com/packages/githubcli-archive-keyring.gpg | sudo dd of=/usr/share/keyrings/githubcli-archive-keyring.gpg
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/githubcli-archive-keyring.gpg] https://cli.github.com/packages stable main" | sudo tee /etc/apt/sources.list.d/github-cli.list > /dev/null
sudo apt update
sudo apt install gh

# CentOS/RHEL/Fedora
sudo dnf install gh
```

### Step 2: Authenticate with GitHub

```bash
# Start the authentication process
gh auth login

# Follow the interactive prompts:
# 1. Choose "GitHub.com"
# 2. Choose "HTTPS"
# 3. Choose "Yes" to authenticate Git with your GitHub credentials
# 4. Choose "Login with a web browser" (recommended)
# 5. Copy the one-time code and press Enter
# 6. Complete authentication in your web browser
```

### Step 3: Verify Installation

```bash
# Check GitHub CLI version
gh --version

# Verify authentication status
gh auth status

# Test API access
gh api user
```

**Expected Output:**
```
✓ Logged in to github.com as username (TOKEN_NAME)
✓ Git operations for github.com configured to use https protocol.
✓ Token scopes: admin:enterprise, admin:org, repo, workflow
```

## Understanding Copilot Metrics

GitHub Copilot provides several types of metrics that help organizations understand usage patterns, adoption rates, and productivity impact.

### Key Metric Types

#### 1. Usage Metrics
- **Total Suggestions Count**: Number of code suggestions generated
- **Total Acceptances Count**: Number of suggestions accepted by developers
- **Acceptance Rate**: Percentage of suggestions accepted (acceptances/suggestions × 100)
- **Active Users**: Number of users who used Copilot on a given day

#### 2. Engagement Metrics
- **Daily Active Users**: Users who interacted with Copilot suggestions
- **Session Duration**: Time spent using Copilot-enabled editors
- **Language Distribution**: Programming languages where Copilot is most used

#### 3. Organizational Metrics
- **Seat Utilization**: Percentage of assigned seats actively used
- **Team Adoption**: Adoption rates across different teams
- **Cost per Suggestion**: Financial efficiency metrics

### Data Structure Overview

```json
{
  "day": "2024-01-15",
  "total_suggestions_count": 1250,
  "total_acceptances_count": 875,
  "total_active_users": 45,
  "breakdown": [
    {
      "language": "javascript",
      "editor": "vscode",
      "suggestions_count": 650,
      "acceptances_count": 455
    }
  ]
}
```

## Organization-Level Metrics

Organization-level metrics provide insights into how teams within a single GitHub organization use Copilot.

### Step 1: Fetch Organization Usage Data

```bash
# Basic usage metrics for an organization
gh api /orgs/{organization-name}/copilot/usage

# Example with real organization name
gh api /orgs/github/copilot/usage
```

### Step 2: Understanding the Response

The API returns an array of daily usage metrics:

```json
[
  {
    "day": "2024-01-15",
    "total_suggestions_count": 1250,
    "total_acceptances_count": 875,
    "total_active_users": 45,
    "breakdown": [
      {
        "language": "typescript",
        "editor": "vscode",
        "suggestions_count": 450,
        "acceptances_count": 315
      },
      {
        "language": "python", 
        "editor": "vscode",
        "suggestions_count": 380,
        "acceptances_count": 266
      }
    ]
  }
]
```

### Step 3: Advanced Query Parameters

```bash
# Filter by date range
gh api "/orgs/{org}/copilot/usage?since=2024-01-01&until=2024-01-31"

# Get data for the last 7 days
gh api "/orgs/{org}/copilot/usage?since=$(date -d '7 days ago' +%Y-%m-%d)"

# Format output with jq for better readability
gh api /orgs/{org}/copilot/usage | jq '.[0]'
```

### Step 4: Calculate Key Performance Indicators

```bash
# Calculate acceptance rate using jq
gh api /orgs/{org}/copilot/usage | jq '
  .[0] | 
  (.total_acceptances_count / .total_suggestions_count * 100) as $rate |
  "Acceptance Rate: \($rate | round)%"
'

# Get top languages by usage
gh api /orgs/{org}/copilot/usage | jq '
  .[0].breakdown | 
  sort_by(-.suggestions_count) | 
  .[0:3] | 
  map("Language: \(.language), Suggestions: \(.suggestions_count)")
'
```

## Enterprise-Level Metrics

Enterprise metrics aggregate data across all organizations within an enterprise account.

### Step 1: Fetch Enterprise Usage Data

```bash
# Enterprise usage metrics
gh api /enterprises/{enterprise-name}/copilot/usage

# Example command
gh api /enterprises/acme-corp/copilot/usage
```

### Step 2: Understanding Enterprise Data Structure

```json
[
  {
    "day": "2024-01-15",
    "total_suggestions_count": 15750,
    "total_acceptances_count": 11025,
    "total_active_users": 485,
    "total_active_organizations": 12,
    "breakdown": [
      {
        "language": "javascript",
        "editor": "vscode", 
        "suggestions_count": 6300,
        "acceptances_count": 4410
      }
    ]
  }
]
```

### Step 3: Cross-Organization Analysis

```bash
# Compare organizations within enterprise
gh api /enterprises/{enterprise}/copilot/usage | jq '
  .[0] |
  "Total Organizations: \(.total_active_organizations)",
  "Average Users per Org: \((.total_active_users / .total_active_organizations) | round)",
  "Enterprise Acceptance Rate: \((.total_acceptances_count / .total_suggestions_count * 100) | round)%"
'
```

## User and Seat Management

Understanding seat allocation and user activity is crucial for optimizing Copilot licensing costs.

### Step 1: View Seat Information

```bash
# Get all seats for an organization
gh api /orgs/{organization}/copilot/billing/seats

# Get seats with pagination
gh api /orgs/{organization}/copilot/billing/seats?per_page=100&page=1
```

### Step 2: Analyze Seat Data

```json
{
  "total_seats": 50,
  "seats": [
    {
      "created_at": "2023-12-01T10:00:00Z",
      "updated_at": "2024-01-15T14:30:00Z",
      "pending_cancellation_date": null,
      "last_activity_at": "2024-01-15T14:30:00Z",
      "last_activity_editor": "vscode",
      "assignee": {
        "login": "developer1",
        "id": 12345,
        "type": "User",
        "site_admin": false
      }
    }
  ]
}
```

### Step 3: Seat Utilization Analysis

```bash
# Find inactive users (no activity in last 30 days)
gh api /orgs/{org}/copilot/billing/seats | jq '
  .seats | 
  map(select(.last_activity_at < (now - 30*24*3600 | todate))) |
  length as $inactive |
  "Inactive seats (30+ days): \($inactive)"
'

# Calculate seat utilization rate
gh api /orgs/{org}/copilot/billing/seats | jq '
  (.seats | map(select(.last_activity_at != null)) | length) as $active |
  .total_seats as $total |
  "Utilization Rate: \(($active / $total * 100) | round)%"
'
```

### Step 4: Manage Seat Assignments

```bash
# Add a user to Copilot (requires admin permissions)
gh api \
  --method POST \
  /orgs/{org}/copilot/billing/seats \
  --field selected_usernames='["username1","username2"]'

# Remove a user from Copilot
gh api \
  --method DELETE \
  /orgs/{org}/copilot/billing/seats \
  --field selected_usernames='["username1"]'
```

## Data Analysis and Visualization

### Step 1: Export Data for Analysis

```bash
# Export to JSON file
gh api /orgs/{org}/copilot/usage > copilot-usage-$(date +%Y%m%d).json

# Export to CSV using jq
gh api /orgs/{org}/copilot/usage | jq -r '
  ["day","suggestions","acceptances","users","acceptance_rate"],
  (.[] | [.day, .total_suggestions_count, .total_acceptances_count, .total_active_users, (.total_acceptances_count/.total_suggestions_count*100|round)])
  | @csv
' > copilot-usage.csv
```

### Step 2: Create Simple Visualizations

#### Using Python with matplotlib

```python
#!/usr/bin/env python3
import json
import matplotlib.pyplot as plt
import pandas as pd
from datetime import datetime

# Load data from GitHub CLI export
with open('copilot-usage.json', 'r') as f:
    data = json.load(f)

# Convert to DataFrame
df = pd.DataFrame(data)
df['day'] = pd.to_datetime(df['day'])
df['acceptance_rate'] = (df['total_acceptances_count'] / df['total_suggestions_count'] * 100).round(2)

# Create visualizations
fig, axes = plt.subplots(2, 2, figsize=(15, 10))

# Daily suggestions trend
axes[0,0].plot(df['day'], df['total_suggestions_count'], marker='o')
axes[0,0].set_title('Daily Suggestions Count')
axes[0,0].set_xlabel('Date')
axes[0,0].set_ylabel('Suggestions')

# Acceptance rate trend  
axes[0,1].plot(df['day'], df['acceptance_rate'], marker='o', color='green')
axes[0,1].set_title('Daily Acceptance Rate')
axes[0,1].set_xlabel('Date')
axes[0,1].set_ylabel('Acceptance Rate (%)')

# Active users trend
axes[1,0].plot(df['day'], df['total_active_users'], marker='o', color='orange')
axes[1,0].set_title('Daily Active Users')
axes[1,0].set_xlabel('Date')
axes[1,0].set_ylabel('Active Users')

# Suggestions vs Acceptances
axes[1,1].plot(df['day'], df['total_suggestions_count'], label='Suggestions', marker='o')
axes[1,1].plot(df['day'], df['total_acceptances_count'], label='Acceptances', marker='s')
axes[1,1].set_title('Suggestions vs Acceptances')
axes[1,1].set_xlabel('Date')
axes[1,1].set_ylabel('Count')
axes[1,1].legend()

plt.tight_layout()
plt.savefig('copilot-metrics-dashboard.png', dpi=300, bbox_inches='tight')
plt.show()
```

#### Using JavaScript with Chart.js

```html
<!DOCTYPE html>
<html>
<head>
    <title>Copilot Metrics Dashboard</title>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
</head>
<body>
    <div style="width: 800px;">
        <canvas id="metricsChart"></canvas>
    </div>

    <script>
        // Data from GitHub CLI (replace with actual data)
        const data = {
            labels: ['2024-01-10', '2024-01-11', '2024-01-12', '2024-01-13', '2024-01-14'],
            datasets: [{
                label: 'Suggestions',
                data: [1200, 1350, 1180, 1420, 1250],
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1
            }, {
                label: 'Acceptances',
                data: [840, 945, 826, 994, 875],
                borderColor: 'rgb(255, 99, 132)',
                tension: 0.1
            }]
        };

        const config = {
            type: 'line',
            data: data,
            options: {
                responsive: true,
                plugins: {
                    title: {
                        display: true,
                        text: 'Copilot Usage Trends'
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        };

        new Chart(document.getElementById('metricsChart'), config);
    </script>
</body>
</html>
```

### Step 3: Automated Reporting Script

```bash
#!/bin/bash
# copilot-report.sh - Generate daily Copilot metrics report

ORG_NAME="your-org"
DATE=$(date +%Y-%m-%d)
REPORT_DIR="copilot-reports"

# Create report directory
mkdir -p $REPORT_DIR

# Fetch latest metrics
echo "Fetching Copilot metrics for $ORG_NAME..."
gh api "/orgs/$ORG_NAME/copilot/usage" > "$REPORT_DIR/usage-$DATE.json"
gh api "/orgs/$ORG_NAME/copilot/billing/seats" > "$REPORT_DIR/seats-$DATE.json"

# Generate summary
echo "Generating summary report..."
gh api "/orgs/$ORG_NAME/copilot/usage" | jq -r '
  .[0] |
  "Copilot Metrics Summary - " + .day + "\n" +
  "=====================================\n" +
  "Total Suggestions: " + (.total_suggestions_count | tostring) + "\n" +
  "Total Acceptances: " + (.total_acceptances_count | tostring) + "\n" +
  "Acceptance Rate: " + ((.total_acceptances_count / .total_suggestions_count * 100) | round | tostring) + "%\n" +
  "Active Users: " + (.total_active_users | tostring) + "\n"
' > "$REPORT_DIR/summary-$DATE.txt"

echo "Report generated in $REPORT_DIR/"
```

## Practical Use Cases

### Use Case 1: ROI Analysis

**Objective**: Calculate return on investment for Copilot subscription

**Script**: `roi-analysis.sh`
```bash
#!/bin/bash
ORG="your-org"

# Get metrics for the last 30 days
METRICS=$(gh api "/orgs/$ORG/copilot/usage?since=$(date -d '30 days ago' +%Y-%m-%d)")
SEATS=$(gh api "/orgs/$ORG/copilot/billing/seats")

# Calculate totals
TOTAL_SUGGESTIONS=$(echo "$METRICS" | jq 'map(.total_suggestions_count) | add')
TOTAL_ACCEPTANCES=$(echo "$METRICS" | jq 'map(.total_acceptances_count) | add')
TOTAL_SEATS=$(echo "$SEATS" | jq '.total_seats')

# Estimate time savings (assuming 30 seconds saved per acceptance)
TIME_SAVED_HOURS=$(echo "scale=2; $TOTAL_ACCEPTANCES * 30 / 3600" | bc)
MONTHLY_COST=$(echo "scale=2; $TOTAL_SEATS * 19" | bc)  # $19 per seat
COST_PER_HOUR=$(echo "scale=2; $MONTHLY_COST / $TIME_SAVED_HOURS" | bc)

echo "Copilot ROI Analysis (30 days)"
echo "=============================="
echo "Total Suggestions: $TOTAL_SUGGESTIONS"
echo "Total Acceptances: $TOTAL_ACCEPTANCES"
echo "Time Saved: $TIME_SAVED_HOURS hours"
echo "Monthly Cost: \$$MONTHLY_COST"
echo "Cost per Hour Saved: \$$COST_PER_HOUR"
```

### Use Case 2: Team Adoption Tracking

**Objective**: Monitor adoption rates across different teams

**Script**: `team-adoption.py`
```python
#!/usr/bin/env python3
import subprocess
import json
import pandas as pd

def get_copilot_metrics(org):
    """Fetch Copilot metrics using GitHub CLI"""
    result = subprocess.run(['gh', 'api', f'/orgs/{org}/copilot/usage'], 
                          capture_output=True, text=True)
    return json.loads(result.stdout)

def get_team_members(org, team):
    """Get team members using GitHub CLI"""
    result = subprocess.run(['gh', 'api', f'/orgs/{org}/teams/{team}/members'], 
                          capture_output=True, text=True)
    return json.loads(result.stdout)

def calculate_team_adoption(org, teams):
    """Calculate adoption rates for each team"""
    metrics = get_copilot_metrics(org)
    seats_result = subprocess.run(['gh', 'api', f'/orgs/{org}/copilot/billing/seats'], 
                                capture_output=True, text=True)
    seats = json.loads(seats_result.stdout)
    
    active_users = {seat['assignee']['login'] for seat in seats['seats'] 
                   if seat['last_activity_at']}
    
    adoption_data = []
    for team in teams:
        members = get_team_members(org, team)
        team_usernames = {member['login'] for member in members}
        active_in_team = team_usernames.intersection(active_users)
        
        adoption_rate = len(active_in_team) / len(team_usernames) * 100
        adoption_data.append({
            'team': team,
            'total_members': len(team_usernames),
            'active_copilot_users': len(active_in_team),
            'adoption_rate': round(adoption_rate, 2)
        })
    
    return pd.DataFrame(adoption_data)

# Example usage
org = "your-org"
teams = ["frontend", "backend", "devops", "mobile"]
adoption_df = calculate_team_adoption(org, teams)
print(adoption_df.to_string(index=False))
```

### Use Case 3: Cost Optimization

**Objective**: Identify underutilized seats for cost optimization

**Script**: `cost-optimization.sh`
```bash
#!/bin/bash
ORG="your-org"
INACTIVE_DAYS=30

echo "Copilot Cost Optimization Report"
echo "================================"

# Get seats data
SEATS_DATA=$(gh api "/orgs/$ORG/copilot/billing/seats")
TOTAL_SEATS=$(echo "$SEATS_DATA" | jq '.total_seats')

# Find inactive users
INACTIVE_CUTOFF=$(date -d "$INACTIVE_DAYS days ago" --iso-8601)
INACTIVE_USERS=$(echo "$SEATS_DATA" | jq -r --arg cutoff "$INACTIVE_CUTOFF" '
  .seats[] |
  select(.last_activity_at < $cutoff or .last_activity_at == null) |
  .assignee.login
')

INACTIVE_COUNT=$(echo "$INACTIVE_USERS" | wc -l)
POTENTIAL_SAVINGS=$(echo "scale=2; $INACTIVE_COUNT * 19" | bc)

echo "Total Seats: $TOTAL_SEATS"
echo "Inactive Seats (>$INACTIVE_DAYS days): $INACTIVE_COUNT"
echo "Potential Monthly Savings: \$$POTENTIAL_SAVINGS"
echo ""
echo "Inactive Users:"
echo "$INACTIVE_USERS"
```

## Best Practices

### 1. Data Collection and Storage

- **Regular Exports**: Set up automated daily exports of metrics data
- **Data Retention**: Maintain historical data for trend analysis
- **Backup Strategy**: Ensure metrics data is backed up regularly

```bash
# Automated daily backup script
#!/bin/bash
DATE=$(date +%Y%m%d)
BACKUP_DIR="/path/to/copilot-backups"

mkdir -p "$BACKUP_DIR/$DATE"
gh api /orgs/your-org/copilot/usage > "$BACKUP_DIR/$DATE/usage.json"
gh api /orgs/your-org/copilot/billing/seats > "$BACKUP_DIR/$DATE/seats.json"
```

### 2. Monitoring and Alerting

- **Usage Thresholds**: Set up alerts for unusual usage patterns
- **Adoption Tracking**: Monitor adoption rates across teams
- **Cost Monitoring**: Track costs and optimize seat allocation

### 3. Security and Access Control

- **API Token Security**: Use fine-grained tokens with minimal required permissions
- **Access Logging**: Log all API access for audit purposes
- **Regular Reviews**: Periodically review access permissions

### 4. Data Analysis

- **Statistical Significance**: Ensure sufficient data for meaningful analysis
- **Trend Analysis**: Focus on trends rather than daily fluctuations
- **Comparative Analysis**: Compare metrics across teams and time periods

## Troubleshooting

### Common Issues and Solutions

#### 1. Authentication Errors

**Problem**: `HTTP 401: Unauthorized`

**Solution**:
```bash
# Re-authenticate with GitHub CLI
gh auth logout
gh auth login --scopes admin:org

# Verify token scopes
gh auth status
```

#### 2. Permission Errors

**Problem**: `HTTP 403: Forbidden`

**Solution**:
- Ensure you have admin permissions for the organization
- Verify Copilot subscription is active
- Check if your organization has enabled Copilot Business/Enterprise

#### 3. Rate Limiting

**Problem**: `HTTP 429: Too Many Requests`

**Solution**:
```bash
# Check rate limit status
gh api rate_limit

# Add delays between requests
sleep 1
gh api /orgs/your-org/copilot/usage
```

#### 4. Data Not Available

**Problem**: Empty or missing metrics data

**Possible Causes**:
- Organization doesn't have Copilot Business/Enterprise
- No active Copilot usage in the specified time period
- API endpoint changes

**Solution**:
```bash
# Verify Copilot subscription
gh api /orgs/your-org/copilot/billing

# Check for recent activity
gh api "/orgs/your-org/copilot/usage?since=$(date -d '7 days ago' +%Y-%m-%d)"
```

### Debugging Tips

1. **Verbose Output**: Use `gh api --verbose` to see request details
2. **JSON Validation**: Use `jq` to validate and format JSON responses
3. **API Documentation**: Refer to [GitHub REST API docs](https://docs.github.com/en/rest/copilot)
4. **Community Support**: Ask questions in GitHub Community discussions

## Advanced Topics

### 1. Custom Dashboards with Grafana

Set up Grafana to visualize Copilot metrics in real-time:

```yaml
# docker-compose.yml for Grafana setup
version: '3.8'
services:
  grafana:
    image: grafana/grafana:latest
    ports:
      - "3000:3000"
    environment:
      - GF_SECURITY_ADMIN_PASSWORD=admin
    volumes:
      - grafana-data:/var/lib/grafana

volumes:
  grafana-data:
```

### 2. Integration with Business Intelligence Tools

Connect Copilot metrics to BI tools like Tableau or Power BI for advanced analytics.

### 3. Machine Learning for Usage Prediction

Use historical data to predict future usage patterns and optimize seat allocation.

## Conclusion

This tutorial provides a comprehensive foundation for using GitHub CLI to interact with Copilot's Metrics API. By following these examples and best practices, you can:

- **Monitor Usage**: Track adoption and engagement metrics
- **Optimize Costs**: Identify and manage underutilized seats
- **Drive Adoption**: Use data to encourage team adoption
- **Measure ROI**: Calculate the return on investment for Copilot
- **Make Data-Driven Decisions**: Use insights for strategic planning

### Next Steps

1. **Implement Automation**: Set up regular metrics collection
2. **Create Dashboards**: Build visualizations for stakeholders
3. **Establish Processes**: Define regular review cycles
4. **Share Insights**: Use data to drive organizational decisions

### Additional Resources

- [GitHub Copilot Documentation](https://docs.github.com/en/copilot)
- [GitHub CLI Manual](https://cli.github.com/manual/)
- [GitHub REST API Reference](https://docs.github.com/en/rest)
- [GitHub Community Discussions](https://github.com/community/community/discussions)

---

**Last Updated**: January 2024  
**Version**: 1.0  
**Authors**: GitHub Advanced Security Demo Team