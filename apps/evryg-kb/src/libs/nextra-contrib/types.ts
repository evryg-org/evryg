/**
 * ContentItem - a recursive tree node for content structure.
 * Leaves omit items, parents have children.
 */
export interface ContentItem {
  slug: string
  title: string
  indexTitle?: string
  items?: ContentItem[]
}
