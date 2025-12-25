export type IconType = 'foundation' | 'types' | 'shield' | 'check' | 'interpret' | 'logic' | 'pattern' | 'code' | 'flow'

/**
 * ContentNode - structural type for content ordering.
 *
 * Used in _meta.ts files to define navigation structure.
 * Display metadata (title, icon, description) is now in frontmatter.
 */
export interface ContentNode {
  slug: string
  index?: string                       // nav title for index page
  items?: { slug: string }[]           // children slugs for ordering
}
