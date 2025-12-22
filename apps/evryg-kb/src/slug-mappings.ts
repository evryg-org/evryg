/**
 * Runtime slug mapping - scans EN content for canonical-slug frontmatter
 * FR is the golden source - EN pages reference their FR equivalent via canonical-slug
 *
 * Uses lazy loading: only scans when a specific slug translation is needed
 */

import * as fs from 'fs'
import * as path from 'path'

const CONTENT_DIR = path.join(process.cwd(), 'content')

interface SlugMapping {
  fr: string
  en: string
}

// Global cache that survives hot reloads in dev mode
const globalForMappings = globalThis as typeof globalThis & {
  slugMappingsCache?: Record<string, SlugMapping>
}

if (!globalForMappings.slugMappingsCache) {
  globalForMappings.slugMappingsCache = {}
}

const cache = globalForMappings.slugMappingsCache

function parseFrontmatter(content: string): Record<string, string> {
  const match = content.match(/^---\n([\s\S]*?)\n---/)
  if (!match) return {}

  const frontmatter: Record<string, string> = {}
  const lines = match[1].split('\n')
  for (const line of lines) {
    const [key, ...valueParts] = line.split(':')
    if (key && valueParts.length) {
      frontmatter[key.trim()] = valueParts.join(':').trim()
    }
  }
  return frontmatter
}

// Lazily find mapping for a single slug
function findMappingForSlug(slug: string): SlugMapping | null {
  // Already cached?
  if (cache[slug]) return cache[slug]

  const enDir = path.join(CONTENT_DIR, 'en')

  // Check if slug is an EN folder name
  const enPath = path.join(enDir, slug, 'index.mdx')
  if (fs.existsSync(enPath)) {
    const content = fs.readFileSync(enPath, 'utf-8')
    const frontmatter = parseFrontmatter(content)
    const canonicalSlug = frontmatter['canonical-slug']
    if (canonicalSlug) {
      const mapping = { fr: canonicalSlug, en: slug }
      cache[slug] = mapping
      cache[canonicalSlug] = mapping
      return mapping
    }
  }

  // Check if slug is a FR canonical-slug by scanning EN files
  // Only scan top-level directories for performance
  if (fs.existsSync(enDir)) {
    const entries = fs.readdirSync(enDir, { withFileTypes: true })
    for (const entry of entries) {
      if (entry.isDirectory()) {
        const indexPath = path.join(enDir, entry.name, 'index.mdx')
        if (fs.existsSync(indexPath)) {
          const content = fs.readFileSync(indexPath, 'utf-8')
          const frontmatter = parseFrontmatter(content)
          const canonicalSlug = frontmatter['canonical-slug']
          if (canonicalSlug === slug) {
            const mapping = { fr: slug, en: entry.name }
            cache[slug] = mapping
            cache[entry.name] = mapping
            return mapping
          }
        }
      }
    }
  }

  return null
}

const locales = ['en', 'fr'] as const
type Locale = typeof locales[number]

export function getSlugMappings(): Record<string, SlugMapping> {
  return cache
}

export function translateSlug(slug: string, targetLocale: Locale): string {
  const mapping = findMappingForSlug(slug)
  return mapping?.[targetLocale] ?? slug
}

export function translatePath(pathname: string, toLocale: Locale): string {
  const segments = pathname.split('/')
  return segments.map((segment, i) => {
    if (i === 0) return segment
    if (i === 1) return toLocale
    return translateSlug(segment, toLocale)
  }).join('/')
}

export function getCanonicalPath(pathname: string): string | null {
  const segments = pathname.split('/')
  const locale = segments[1] as Locale

  if (!locales.includes(locale)) return null

  let needsRedirect = false
  const correctedSegments = segments.map((segment, i) => {
    if (i <= 1) return segment

    const correctSlug = translateSlug(segment, locale)
    if (correctSlug !== segment) {
      needsRedirect = true
    }
    return correctSlug
  })

  return needsRedirect ? correctedSegments.join('/') : null
}
