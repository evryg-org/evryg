'use client'

import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

import type { Suggestion } from '../main/core/domain/Suggestions'
import { findSuggestions } from '../main/core/use_cases/FindSuggestions'
import { extractExcerpt } from '../main/core/use_cases/ExtractExcerpt'
import { createPagefindAdapter } from '../main/secondary/PagefindAdapter'
import styles from './NotFoundPage.module.css'

const translations = {
  en: { suggestionsTitle: 'Perhaps you were looking for:' },
  fr: { suggestionsTitle: 'Peut-être cherchiez-vous :' }
}

function cleanUrl(url: string): string {
  return url.replace(/\.html$/, '').replace(/\/index$/, '')
}

export function SuggestedPages() {
  const pathname = usePathname()
  const [, lang] = pathname.split('/')
  const t = translations[lang as keyof typeof translations] ?? translations.en
  const [suggestions, setSuggestions] = useState<Suggestion[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    async function loadSuggestions() {
      try {
        const searchPort = createPagefindAdapter()
        const { suggestions } = await findSuggestions({ pathname }, searchPort)
        setSuggestions(suggestions)
      } catch (e) {
        console.error('Failed to find suggestions:', e)
        setError(true)
      } finally {
        setLoading(false)
      }
    }

    loadSuggestions()
  }, [pathname])

  if (loading) {
    return (
      <div className={styles.suggestions}>
        <p className={styles.suggestionsTitle}>{t.suggestionsTitle}</p>
        <ul className={styles.resultsList}>
          {[1, 2, 3].map((i) => (
            <li key={i} className={styles.resultCard}>
              <Skeleton width="60%" height={18} />
              <Skeleton width="40%" height={14} style={{ marginTop: 6 }} />
              <Skeleton count={2} height={14} style={{ marginTop: 6 }} />
            </li>
          ))}
        </ul>
      </div>
    )
  }

  if (error || suggestions.length === 0) {
    return null
  }

  return (
    <div className={styles.suggestions}>
      <p className={styles.suggestionsTitle}>{t.suggestionsTitle}</p>
      <ul className={styles.resultsList}>
        {suggestions.map((suggestion) => {
          const url = cleanUrl(suggestion.url)
          return (
            <li key={suggestion.url} className={styles.resultCard}>
              <a href={url} className={styles.resultTitle}>
                {suggestion.title}
              </a>
              <div className={styles.resultUrl}>{url}</div>
              <p className={styles.resultExcerpt}>
                {extractExcerpt(suggestion.excerpt, 'html')}
              </p>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
