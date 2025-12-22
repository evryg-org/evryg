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
  const isHomePage = mdxPath.length === 0

  let title: string
  let category: string | null = null
  let readingTime: number | null = null

  if (isHomePage) {
    title = HOME_TITLES[lang] || HOME_TITLES.en
  } else {
    const metadata = await ports.pageMetadata.getPageMetadata(mdxPath, lang)
    title = metadata?.title || 'evryg'

    if (metadata?.sourceCode) {
      readingTime = calculateReadingTime(metadata.sourceCode)
    }

    const categorySlug = mdxPath[0]
    category = ports.categoryTitles.getCategoryTitle(categorySlug, lang)
  }

  return {
    title,
    category,
    readingTime,
    isHomePage,
    labels,
  }
}
