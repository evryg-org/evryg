/**
 * Item with slug and title for navigation.
 * Both Module and Article satisfy this interface.
 */
export interface NavItem {
  slug: string
  title: string
}

/**
 * Build Nextra _meta configuration from navigation items.
 * Works for both category level (modules) and module level (articles).
 */
export const buildMeta = (
  items: NavItem[],
  indexTitle = 'Introduction'
): Record<string, string> => ({
  index: indexTitle,
  ...Object.fromEntries(items.map(item => [item.slug, item.title]))
})
