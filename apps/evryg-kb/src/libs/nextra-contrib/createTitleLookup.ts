import type { ContentItem } from './types'

export interface ContentData {
  modules: ContentItem[]
}

export type ContentLoader = () => Promise<ContentData>
export type ContentRegistry = Record<string, Record<string, ContentLoader>>

// Cache for loaded content
const cache: Record<string, ContentData> = {}

async function loadContentData(
  registry: ContentRegistry,
  lang: string,
  categorySlug: string
): Promise<ContentData | null> {
  const key = `${lang}/${categorySlug}`
  if (cache[key]) return cache[key]

  const loader = registry[lang]?.[categorySlug]
  if (!loader) return null

  const data = await loader()
  cache[key] = data
  return cache[key]
}

/**
 * Create a title lookup function from a content registry.
 *
 * Path format: [categorySlug, groupSlug?, itemSlug?]
 *
 * Returns:
 * - For category index (length 1): null (not handled)
 * - For group index (length 2): group.title
 * - For item (length 3): item.title from group.items
 */
export function createTitleLookup(registry: ContentRegistry) {
  return async function lookupTitle(
    mdxPath: string[],
    lang: string
  ): Promise<string | null> {
    if (mdxPath.length < 1) return null

    const categorySlug = mdxPath[0]
    const data = await loadContentData(registry, lang, categorySlug)
    if (!data) return null

    if (mdxPath.length === 1) {
      // Category index - not handled
      return null
    }

    const groupSlug = mdxPath[1]
    const group = data.modules.find(m => m.slug === groupSlug)
    if (!group) return null

    if (mdxPath.length === 2) {
      // Group index - return group title
      return group.title
    }

    if (mdxPath.length >= 3 && group.items) {
      // Item - find in group.items
      const itemSlug = mdxPath[2]
      const item = group.items.find(i => i.slug === itemSlug)
      return item?.title || null
    }

    return null
  }
}
