/**
 * Secondary Adapter - Nextra implementation of PageMetadataPort
 */

import { importPage } from 'nextra/pages'
import type { PageMetadataPort } from '../core/ports/PageMetadataPort'
import type { PageMetadata } from '../core/domain/OGImageData'

export function createNextraPageMetadataAdapter(): PageMetadataPort {
  return {
    async getPageMetadata(mdxPath: string[], lang: string): Promise<PageMetadata | null> {
      try {
        const result = await importPage(mdxPath, lang)
        return {
          title: result.metadata?.title || 'evryg',
          sourceCode: result.sourceCode,
        }
      } catch {
        return null
      }
    },
  }
}
