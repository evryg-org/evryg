import Link from 'next/link'
import { getAllTags, toTitleCase } from '../../../lib/tags'
import styles from './tags.module.css'

const BASE_URL = 'https://kb.evryg.com'

const translations = {
  en: {
    title: 'All Tags',
    description: 'Browse all articles by topic',
    articles: 'articles',
    article: 'article',
  },
  fr: {
    title: 'Tous les Tags',
    description: 'Parcourir tous les articles par sujet',
    articles: 'articles',
    article: 'article',
  },
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  const t = translations[lang as keyof typeof translations] || translations.en

  return {
    title: t.title,
    description: t.description,
    alternates: {
      canonical: `${BASE_URL}/${lang}/tags`,
      languages: {
        en: `${BASE_URL}/en/tags`,
        fr: `${BASE_URL}/fr/tags`,
      },
    },
    openGraph: {
      title: t.title,
      description: t.description,
      type: 'website',
    },
  }
}

export function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'fr' }]
}

export default async function TagsPage({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  const tags = await getAllTags(lang)
  const t = translations[lang as keyof typeof translations] || translations.en

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{t.title}</h1>
      <p className={styles.description}>{t.description}</p>

      <div className={styles.tagGrid}>
        {tags.map(({ tag, count }) => (
          <Link
            key={tag}
            href={`/${lang}/tags/${tag}`}
            className={styles.tagCard}
          >
            <span className={styles.tagName}>{toTitleCase(tag)}</span>
            <span className={styles.tagCount}>
              {count} {count === 1 ? t.article : t.articles}
            </span>
          </Link>
        ))}
      </div>
    </div>
  )
}
