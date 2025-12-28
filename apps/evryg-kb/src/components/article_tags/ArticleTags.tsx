import Link from 'next/link'
import styles from './ArticleTags.module.css'

interface ArticleTagsProps {
  tags: string[]
  lang: string
}

function toTitleCase(tag: string): string {
  return tag
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

export function ArticleTags({ tags, lang }: ArticleTagsProps) {
  if (!tags || tags.length === 0) return null

  return (
    <div className={styles.container}>
      {tags.map(tag => (
        <Link
          key={tag}
          href={`/${lang}/tags/${tag}`}
          className={styles.tag}
        >
          {toTitleCase(tag)}
        </Link>
      ))}
    </div>
  )
}
