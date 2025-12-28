/**
 * Use Case - Get Tag Statistics
 *
 * Provides statistics about articles for a given tag.
 */

export interface TagStats {
  articleCount: number
}

interface Article {
  title: string
  route: string
}

export function getTagStats(articles: Article[]): TagStats {
  return {
    articleCount: articles.length,
  }
}
