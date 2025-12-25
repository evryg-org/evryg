/**
 * Secondary Adapter - Nextra implementation of PageMetadataPort
 */

import { importPage } from 'nextra/pages'
import type { PageMetadataPort } from '../core/ports/PageMetadataPort'
import type { PageMetadata } from '../core/domain/OGImageData'
import { createTitleLookup } from '../../libs/nextra-contrib/createTitleLookup'

const lookupTitle = createTitleLookup()

export function createNextraPageMetadataAdapter(): PageMetadataPort {
  return {
    async getPageMetadata(mdxPath: string[], lang: string): Promise<PageMetadata | null> {
      try {
        const result = await importPage(mdxPath, lang)
        const title = await lookupTitle(mdxPath, lang)
        return {
          title: title || 'evryg',
          sourceCode: result.sourceCode,
        }
      } catch {
        return null
      }
    },
  }
}
