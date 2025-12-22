/**
 * Domain - Types and pure functions for OG image generation
 */

export interface PageMetadata {
  title: string
  sourceCode?: string
}

export interface Labels {
  knowledgeBase: string
  articlePrefix: string
  categorySeparator: string
  minRead: (min: number) => string
}

export interface OGImageData {
  title: string
  category: string | null
  readingTime: number | null
  isHomePage: boolean
  labels: Labels
}

export function calculateReadingTime(content: string): number {
  const text = content
    .replace(/```[\s\S]*?```/g, '')
    .replace(/`[^`]*`/g, '')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/[#*_~>\-|]/g, '')
    .replace(/\s+/g, ' ')
    .trim()

  const wordCount = text.split(/\s+/).filter(word => word.length > 0).length
  const minutes = Math.ceil(wordCount / 200)
  return Math.max(1, minutes)
}
