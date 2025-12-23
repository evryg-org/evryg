/**
 * Secondary Adapter - Nextra implementation of CategoryTitlesPort
 */

import type { CategoryTitlesPort } from '../core/ports/CategoryTitlesPort'
import enMeta from '../../../content/en/_meta'
import frMeta from '../../../content/fr/_meta'

function extractCategoryTitles(meta: Record<string, { title?: string; type?: string }>): Record<string, string> {
  const titles: Record<string, string> = {}
  for (const [slug, config] of Object.entries(meta)) {
    if (config.type === 'page' && config.title && slug !== 'index' && slug !== 'evryg') {
      titles[slug] = config.title
    }
  }
  return titles
}

const CATEGORY_TITLES: Record<string, Record<string, string>> = {
  en: extractCategoryTitles(enMeta),
  fr: extractCategoryTitles(frMeta),
}

export function createNextraCategoryTitlesAdapter(): CategoryTitlesPort {
  return {
    getCategoryTitle(slug: string, lang: string): string | null {
      return CATEGORY_TITLES[lang]?.[slug] || null
    },
  }
}
