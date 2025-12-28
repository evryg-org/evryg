import Link from 'next/link'
import { getAllTagSlugs, getArticlesByTag, toTitleCase } from '../../../../lib/tags'
import { getTagStats } from '../../../../main/core/use_cases/GetTagStats'
import styles from '../tags.module.css'

const BASE_URL = 'https://kb.evryg.com'

const translations = {
  en: {
    articlesTagged: 'Articles tagged',
    backToTags: 'Back to all tags',
    minRead: (n: number) => `${n} min read`,
    articleCount: (n: number) => `${n} article${n === 1 ? '' : 's'}`,
  },
  fr: {
    articlesTagged: 'Articles taggu\u00e9s',
    backToTags: 'Retour aux tags',
    minRead: (n: number) => `${n} min de lecture`,
    articleCount: (n: number) => `${n} article${n === 1 ? '' : 's'}`,
  },
}

export async function generateStaticParams() {
  const slugs = await getAllTagSlugs()
  return slugs
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; tag: string }>
}) {
  const { lang, tag } = await params
  const t = translations[lang as keyof typeof translations] || translations.en
  const tagTitle = toTitleCase(tag)
  const title = `${t.articlesTagged} "${tagTitle}"`
  const description = `${t.articlesTagged} ${tagTitle}`

  return {
    title,
    description,
    alternates: {
      canonical: `${BASE_URL}/${lang}/tags/${tag}`,
      languages: {
        en: `${BASE_URL}/en/tags/${tag}`,
        fr: `${BASE_URL}/fr/tags/${tag}`,
      },
    },
    openGraph: {
      title,
      description,
      type: 'website',
    },
  }
}

export default async function TagPage({
  params,
}: {
  params: Promise<{ lang: string; tag: string }>
}) {
  const { lang, tag } = await params
  const articles = await getArticlesByTag(lang, tag)
  const stats = getTagStats(articles)
  const t = translations[lang as keyof typeof translations] || translations.en
  const tagTitle = toTitleCase(tag)

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{tagTitle}</h1>
      <p className={styles.statsLine}>{t.articleCount(stats.articleCount)}</p>
      <Link href={`/${lang}/tags`} className={styles.backLink}>
        &larr; {t.backToTags}
      </Link>

      <ul className={styles.articleList}>
        {articles.map(article => (
          <li key={article.route}>
            <Link href={article.route} className={styles.articleLink}>
              {article.title}
            </Link>
            {article.readingTime && (
              <span className={styles.readingTime}>{t.minRead(article.readingTime)}</span>
            )}
            {article.excerpt && (
              <p className={styles.articleDescription}>{article.excerpt}</p>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}
