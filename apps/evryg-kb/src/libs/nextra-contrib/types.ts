/**
 * ContentItem - a leaf node for content structure (article).
 */
export interface ContentItem {
  slug: string
  title: string
}

/**
 * ModuleContent - the content structure exported by each module's _meta.ts.
 * Contains the index page title and the list of articles.
 */
export interface ModuleContent {
  index: string
  items: ContentItem[]
}
