import { getPageMap } from 'nextra/page-map'
import { importPage } from 'nextra/pages'
import type { PageMapItem, MdxFile, Folder } from 'nextra'

interface ArticleWithTags {
  title: string
  excerpt?: string
  route: string
  tags: string[]
}

function extractFirstParagraph(sourceCode: string): string {
  // Remove frontmatter (---\n...\n---)
  const withoutFrontmatter = sourceCode.replace(/^---[\s\S]*?---\n*/, '')

  // Split into lines and find first non-heading, non-empty content
  const lines = withoutFrontmatter.split('\n')

  let paragraph = ''
  for (const line of lines) {
    const trimmed = line.trim()
    // Skip empty lines, headings, imports, and JSX
    if (!trimmed || trimmed.startsWith('#') || trimmed.startsWith('import') || trimmed.startsWith('<')) {
      if (paragraph) break // End of paragraph
      continue
    }
    paragraph += (paragraph ? ' ' : '') + trimmed
  }

  // Clean up markdown formatting and truncate
  return paragraph
    .replace(/\*([^*]+)\*/g, '$1') // Remove italics
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // Remove links, keep text
    .slice(0, 200) + (paragraph.length > 200 ? '...' : '')
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
        const excerpt = extractFirstParagraph(result.sourceCode)
        return { ...article, excerpt }
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
