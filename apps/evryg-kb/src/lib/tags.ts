import { getPageMap } from 'nextra/page-map'
import { importPage } from 'nextra/pages'
import type { PageMapItem, MdxFile, Folder } from 'nextra'
import { extractExcerpt } from '../main/core/use_cases/ExtractExcerpt'
import { calculateReadingTime } from '../main/core/domain/OGImageData'

interface ArticleWithTags {
  title: string
  excerpt?: string
  readingTime?: number
  route: string
  tags: string[]
}

interface TagInfo {
  tag: string
  count: number
  articles: ArticleWithTags[]
}

function collectArticlesWithTags(
  items: PageMapItem[],
  articles: ArticleWithTags[] = []
): ArticleWithTags[] {
  for (const item of items) {
    if ('children' in item) {
      collectArticlesWithTags((item as Folder).children, articles)
    } else if ('frontMatter' in item) {
      const mdxFile = item as MdxFile
      const frontMatter = mdxFile.frontMatter as {
        pageType?: string
        title?: string
        description?: string
        tags?: string[]
      }

      if (frontMatter?.pageType === 'article' && frontMatter?.tags?.length) {
        articles.push({
          title: frontMatter.title || mdxFile.name,
          route: mdxFile.route,
          tags: frontMatter.tags,
        })
      }
    }
  }
  return articles
}

export async function getAllTags(lang: string): Promise<TagInfo[]> {
  const pageMap = await getPageMap(`/${lang}`)
  const articles = collectArticlesWithTags(pageMap)

  const tagMap = new Map<string, ArticleWithTags[]>()

  for (const article of articles) {
    for (const tag of article.tags) {
      if (!tagMap.has(tag)) {
        tagMap.set(tag, [])
      }
      tagMap.get(tag)!.push(article)
    }
  }

  return Array.from(tagMap.entries())
    .map(([tag, articles]) => ({
      tag,
      count: articles.length,
      articles,
    }))
    .sort((a, b) => b.count - a.count)
}

export async function getArticlesByTag(
  lang: string,
  tag: string
): Promise<ArticleWithTags[]> {
  const pageMap = await getPageMap(`/${lang}`)
  const articles = collectArticlesWithTags(pageMap)
  const filtered = articles.filter(article => article.tags.includes(tag))

  // Fetch excerpts for each article
  const withExcerpts = await Promise.all(
    filtered.map(async article => {
      try {
        // Convert route to mdxPath: /en/foo/bar -> ['foo', 'bar']
        const mdxPath = article.route.split('/').slice(2)
        const result = await importPage(mdxPath, lang)
        const excerpt = extractExcerpt(result.sourceCode, 'mdx')
        const readingTime = calculateReadingTime(result.sourceCode)
        return { ...article, excerpt, readingTime }
      } catch {
        return article
      }
    })
  )

  return withExcerpts
}

export async function getAllTagSlugs(): Promise<{ lang: string; tag: string }[]> {
  const locales = ['en', 'fr']
  const slugs: { lang: string; tag: string }[] = []

  for (const lang of locales) {
    const tags = await getAllTags(lang)
    for (const { tag } of tags) {
      slugs.push({ lang, tag })
    }
  }

  return slugs
}

export function toTitleCase(tag: string): string {
  return tag
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}
