/**
 * Port - Category titles interface (driven port)
 */

export interface CategoryTitlesPort {
  /**
   * Get category title for a slug in a given language
   */
  getCategoryTitle(slug: string, lang: string): string | null
}
