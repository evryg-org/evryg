import { readdirSync, statSync } from 'fs'
import { join } from 'path'

const CONTENT_DIR = join(process.cwd(), 'content')

export interface ContentStats {
  articleCount: number
  domainCount: number
}

/**
 * Counts articles recursively in a directory.
 * An article is any subdirectory containing an index.mdx file,
 * excluding the domain's own index.mdx.
 */
function countArticlesInDomain(domainPath: string): number {
  let count = 0
  const entries = readdirSync(domainPath)

  for (const entry of entries) {
    const entryPath = join(domainPath, entry)
    const stat = statSync(entryPath)

    if (stat.isDirectory()) {
      // Check if this directory has an index.mdx (is an article)
      try {
        statSync(join(entryPath, 'index.mdx'))
        count++
      } catch {
        // No index.mdx, not an article - but check subdirectories
      }
      // Recurse into subdirectories for nested articles
      count += countArticlesInDomain(entryPath)
    }
  }

  return count
}

/**
 * Get content statistics (article and domain counts) for a locale.
 * Scanned at build time.
 */
export function getContentStats(locale: string): ContentStats {
  const localePath = join(CONTENT_DIR, locale)
  const entries = readdirSync(localePath)

  let domainCount = 0
  let articleCount = 0

  for (const entry of entries) {
    const entryPath = join(localePath, entry)
    const stat = statSync(entryPath)

    // Only count directories as potential domains (skip index.mdx, _meta.tsx, etc.)
    if (stat.isDirectory()) {
      domainCount++
      articleCount += countArticlesInDomain(entryPath)
    }
  }

  return { articleCount, domainCount }
}
