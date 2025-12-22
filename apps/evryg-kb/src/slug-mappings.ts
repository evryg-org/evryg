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

// Recursively scan a directory for index.mdx files with canonical-slug
function scanDirectory(dir: string): void {
  if (!fs.existsSync(dir)) return

  const entries = fs.readdirSync(dir, { withFileTypes: true })
  for (const entry of entries) {
    if (entry.isDirectory()) {
      const indexPath = path.join(dir, entry.name, 'index.mdx')
      if (fs.existsSync(indexPath)) {
        const content = fs.readFileSync(indexPath, 'utf-8')
        const frontmatter = parseFrontmatter(content)
        const canonicalSlug = frontmatter['canonical-slug']
        if (canonicalSlug) {
          const mapping = { fr: canonicalSlug, en: entry.name }
          cache[entry.name] = mapping
          cache[canonicalSlug] = mapping
        }
      }
      // Recursively scan subdirectories
      scanDirectory(path.join(dir, entry.name))
    }
  }
}

// Track if we've done a full scan
let fullScanDone = false

// Lazily find mapping for a single slug
function findMappingForSlug(slug: string): SlugMapping | null {
  // Already cached?
  if (cache[slug]) return cache[slug]

  // If not in cache and we haven't scanned yet, do a full recursive scan
  if (!fullScanDone) {
    const enDir = path.join(CONTENT_DIR, 'en')
    scanDirectory(enDir)
    fullScanDone = true
  }

  return cache[slug] ?? null
}

const locales = ['en', 'fr'] as const
type Locale = typeof locales[number]

export function getSlugMappings(): Record<string, SlugMapping> {
  // Ensure scan is done before returning mappings
  if (!fullScanDone) {
    const enDir = path.join(CONTENT_DIR, 'en')
    scanDirectory(enDir)
    fullScanDone = true
  }
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
