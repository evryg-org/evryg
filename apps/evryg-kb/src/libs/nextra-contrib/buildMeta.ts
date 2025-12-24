import type { ContentItem } from './types'

/**
 * Build Nextra _meta configuration from content items.
 * Works for both category level (modules) and module level (articles).
 */
export const buildMeta = (
  items: ContentItem[],
  index = 'Introduction'
): Record<string, string> => ({
  index,
  ...Object.fromEntries(items.map(item => [item.slug, item.title]))
})
