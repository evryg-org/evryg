/**
 * Use Case - Generate OG image data for a page
 */

import type { PageMetadataPort } from '../ports/PageMetadataPort'
import type { CategoryTitlesPort } from '../ports/CategoryTitlesPort'
import { type OGImageData, calculateReadingTime } from '../domain/OGImageData'

export interface GenerateOGImageDataInput {
  lang: string
  path: string
}

export interface GenerateOGImageDataPorts {
  pageMetadata: PageMetadataPort
  categoryTitles: CategoryTitlesPort
}

const HOME_TITLES: Record<string, string> = {
  en: 'evryg Knowledge Base',
  fr: 'Base de connaissances evryg',
}

const LABELS = {
  en: {
    knowledgeBase: 'Knowledge Base',
    articlePrefix: 'Our article on',
    categorySeparator: '',
    minRead: (min: number) => `${min} min read`,
  },
  fr: {
    knowledgeBase: 'Base de connaissances',
    articlePrefix: 'Notre article',
    categorySeparator: '·',
    minRead: (min: number) => `Temps de lecture : ${min} min`,
  },
}

export async function generateOGImageData(
  input: GenerateOGImageDataInput,
  ports: GenerateOGImageDataPorts
): Promise<OGImageData> {
  const { lang, path } = input
  const labels = LABELS[lang as keyof typeof LABELS] || LABELS.en

  const mdxPath = path ? path.split('/').filter(Boolean) : []

  if (mdxPath.length === 0) {
    return {
      pageType: 'home' as const,
      title: HOME_TITLES[lang] || HOME_TITLES.en,
      labels,
    }
  }

  const metadata = await ports.pageMetadata.getPageMetadata(mdxPath, lang)
  const categorySlug = mdxPath[0]

  return {
    pageType: 'article' as const,
    title: metadata?.title || 'evryg',
    category: ports.categoryTitles.getCategoryTitle(categorySlug, lang),
    readingTime: metadata?.sourceCode ? calculateReadingTime(metadata.sourceCode) : null,
    labels,
  }
}
