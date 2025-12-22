'use client'

import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

import type { Suggestion } from '../main/core/domain/Suggestions'
import { findSuggestions } from '../main/core/use_cases/FindSuggestions'
import { createPagefindAdapter } from '../main/secondary/PagefindAdapter'
import styles from './NotFoundPage.module.css'

function stripHtmlTags(html: string): string {
  return html.replace(/<[^>]*>/g, '')
}

function cleanUrl(url: string): string {
  return url.replace(/\.html$/, '').replace(/\/index$/, '')
}

export function SuggestedPages() {
  const pathname = usePathname()
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
    return <div className={styles.loading}>Searching for similar pages...</div>
  }

  if (error || suggestions.length === 0) {
    return null
  }

  return (
    <div className={styles.suggestions}>
      <p className={styles.suggestionsTitle}>Perhaps you were looking for:</p>
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
                {stripHtmlTags(suggestion.excerpt)}
              </p>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
