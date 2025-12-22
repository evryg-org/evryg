// Import category titles from content _meta.tsx files (single source of truth)
import enMeta from '../../../content/en/_meta'
import frMeta from '../../../content/fr/_meta'

// Extract category titles from _meta exports
function extractCategoryTitles(meta: Record<string, { title?: string; type?: string }>): Record<string, string> {
  const titles: Record<string, string> = {}
  for (const [slug, config] of Object.entries(meta)) {
    if (config.type === 'page' && config.title && slug !== 'index' && slug !== 'evryg') {
      titles[slug] = config.title
    }
  }
  return titles
}

export const CATEGORY_TITLES: Record<string, Record<string, string>> = {
  en: extractCategoryTitles(enMeta),
  fr: extractCategoryTitles(frMeta),
}

export const HOME_TITLES: Record<string, string> = {
  en: 'evryg Knowledge Base',
  fr: 'Base de connaissances evryg',
}

// Localized labels
export const LABELS = {
  en: {
    knowledgeBase: 'Knowledge Base',
    articlePrefix: 'Our article on',
    categorySeparator: '', // English uses "on" as connector
    minRead: (min: number) => `${min} min read`,
  },
  fr: {
    knowledgeBase: 'Base de connaissances',
    articlePrefix: 'Notre article',
    categorySeparator: '·', // French uses middle dot to avoid preposition issues
    minRead: (min: number) => `Temps de lecture : ${min} min`,
  },
}

export type Labels = typeof LABELS.en

export const TAGLINE = 'evryg · Paris · Lean Software Delivery'
export const URL = 'www.evryg.com'
