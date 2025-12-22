/**
 * Domain - Pure types and functions for page suggestions
 */

export interface Suggestion {
  url: string
  title: string
  excerpt: string
}

export interface ExtractedKeywords {
  /** Keywords from the last path segment (most specific) */
  primary: string
  /** Keywords from parent path segments */
  secondary: string
}

export type Locale = 'en' | 'fr'

// Common stop words to filter out (EN + FR)
const STOP_WORDS = new Set([
  // English
  'a', 'an', 'the', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by', 'is', 'are', 'was', 'were',
  // French
  'le', 'la', 'les', 'un', 'une', 'des', 'du', 'de', 'et', 'ou', 'en', 'au', 'aux', 'pour', 'par', 'sur', 'dans', 'avec'
])

export const FALLBACK_TERMS: Record<Locale, readonly string[]> = {
  fr: ['logiciel', 'code', 'programmation'],
  en: ['software', 'code', 'programming']
}

export function extractKeywords(pathname: string): ExtractedKeywords {
  const withoutLocale = pathname.replace(/^\/(en|fr)\//, '')
  const segments = withoutLocale.split('/').filter(Boolean)

  const extractWords = (segment: string) =>
    segment
      .split('-')
      .map(w => w.toLowerCase().trim())
      .filter(w => w.length > 2 && !STOP_WORDS.has(w))
      .join(' ')

  const lastSegment = segments[segments.length - 1] || ''
  const parentSegments = segments.slice(0, -1)

  return {
    primary: extractWords(lastSegment),
    secondary: parentSegments.map(extractWords).join(' ')
  }
}

export function getLocaleFromPath(pathname: string): Locale {
  const match = pathname.match(/^\/(en|fr)\//)
  return (match ? match[1] : 'en') as Locale
}

export function matchesLocale(url: string, locale: Locale): boolean {
  return url.startsWith(`/${locale}/`)
}
