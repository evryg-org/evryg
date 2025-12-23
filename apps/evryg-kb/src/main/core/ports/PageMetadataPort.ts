/**
 * Port - Page metadata interface (driven port)
 */

import type { PageMetadata } from '../domain/OGImageData'

export interface PageMetadataPort {
  /**
   * Get metadata for a page
   * @param mdxPath - Array of path segments (e.g., ['fondements', 'dags'])
   * @param lang - Language code (e.g., 'en', 'fr')
   * @returns Page metadata or null if page not found
   */
  getPageMetadata(mdxPath: string[], lang: string): Promise<PageMetadata | null>
}
