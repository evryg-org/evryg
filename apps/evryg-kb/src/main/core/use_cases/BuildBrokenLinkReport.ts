/**
 * Use Case - Build a broken link report from browser context
 */

import type { BrokenLinkReport } from '../domain/BrokenLinkReport'

export interface BuildBrokenLinkReportInput {
  pathname: string
  lang: string
  fullUrl: string
  referrer: string
}

export function buildBrokenLinkReport(input: BuildBrokenLinkReportInput): BrokenLinkReport {
  return {
    pathname: input.pathname,
    fullUrl: input.fullUrl,
    referrer: input.referrer,
    lang: input.lang,
    timestamp: new Date().toISOString()
  }
}
