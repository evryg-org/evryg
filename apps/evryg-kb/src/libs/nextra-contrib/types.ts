export type IconType = 'foundation' | 'types' | 'shield' | 'check' | 'interpret' | 'logic' | 'pattern' | 'code' | 'flow'

/**
 * ContentNode - unified recursive type for all content levels.
 *
 * Represents articles (leaf nodes), modules (branch with icon/description), and categories (branch).
 * - Article: { slug, title } - no items
 * - Module: { slug, title, index, items, icon, description } - all fields
 * - Category: { slug, title, index, items } - no icon/description needed
 */
export interface ContentNode {
  slug: string
  title: string
  index?: string           // nav title for index page (branch nodes only)
  items?: ContentNode[]    // children: undefined = leaf (article), defined = branch (module/category)
  icon?: IconType          // optional display metadata
  description?: string     // optional display metadata
}
