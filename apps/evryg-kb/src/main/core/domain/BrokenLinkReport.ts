/**
 * Domain - Pure types and functions for broken link reporting
 */

export interface BrokenLinkReport {
  pathname: string
  fullUrl: string
  referrer: string
  lang: string
  timestamp: string
}

export function formatReportBody(report: BrokenLinkReport): string {
  return `### Broken link details

- **URL**: ${report.fullUrl}
- **Referrer**: ${report.referrer || '(direct access)'}
- **Language**: ${report.lang}
- **Reported**: ${report.timestamp}`
}

export function buildGitHubIssueUrl(
  report: BrokenLinkReport,
  repoUrl: string,
  labels: string[]
): string {
  const title = `Broken link: ${report.pathname}`
  const body = formatReportBody(report)
  const labelsParam = labels.join(',')

  return `${repoUrl}/issues/new?title=${encodeURIComponent(title)}&labels=${labelsParam}&body=${encodeURIComponent(body)}`
}
