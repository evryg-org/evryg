import Link from 'next/link'
import { getAllTagSlugs, getArticlesByTag, toTitleCase } from '../../../../lib/tags'
import styles from '../tags.module.css'

const BASE_URL = 'https://kb.evryg.com'

const translations = {
  en: {
    articlesTagged: 'Articles tagged',
    backToTags: 'Back to all tags',
  },
  fr: {
    articlesTagged: 'Articles taggu\u00e9s',
    backToTags: 'Retour aux tags',
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
  const t = translations[lang as keyof typeof translations] || translations.en
  const tagTitle = toTitleCase(tag)

  return (
    <div className={styles.container}>
      <Link href={`/${lang}/tags`} className={styles.backLink}>
        &larr; {t.backToTags}
      </Link>

      <h1 className={styles.title}>
        {t.articlesTagged} <span className={styles.highlight}>{tagTitle}</span>
      </h1>

      <ul className={styles.articleList}>
        {articles.map(article => (
          <li key={article.route}>
            <Link href={article.route} className={styles.articleLink}>
              {article.title}
            </Link>
            {article.excerpt && (
              <p className={styles.articleDescription}>{article.excerpt}</p>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}
