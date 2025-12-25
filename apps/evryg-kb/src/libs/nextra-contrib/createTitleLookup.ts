import { importPage } from 'nextra/pages'

/**
 * Create a title lookup function that reads sidebarTitle from MDX frontmatter.
 *
 * Path format: [categorySlug, groupSlug?, itemSlug?]
 *
 * Returns sidebarTitle from frontmatter, or null if not found.
 */
export function createTitleLookup() {
  return async function lookupTitle(
    mdxPath: string[],
    lang: string
  ): Promise<string | null> {
    if (mdxPath.length < 1) return null

    try {
      const { metadata } = await importPage(mdxPath, lang)
      return (metadata as { sidebarTitle?: string }).sidebarTitle || null
    } catch {
      return null
    }
  }
}
