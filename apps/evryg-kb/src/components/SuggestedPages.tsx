'use client'

import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

import type { Suggestion } from '../main/core/domain/Suggestions'
import { findSuggestions } from '../main/core/use_cases/FindSuggestions'
import { createPagefindAdapter } from '../main/secondary/PagefindAdapter'

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
    return (
      <div style={{ marginTop: '1.5rem', color: 'var(--nextra-text-color-secondary, #666)' }}>
        Searching for similar pages...
      </div>
    )
  }

  if (error || suggestions.length === 0) {
    return null
  }

  return (
    <div style={{ marginTop: '1.5rem' }}>
      <p style={{ marginBottom: '0.75rem', color: 'var(--nextra-text-color-secondary, #666)' }}>
        Perhaps you were looking for:
      </p>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {suggestions.map((suggestion) => (
          <li key={suggestion.url} style={{ marginBottom: '0.5rem' }}>
            <a
              href={suggestion.url}
              style={{
                color: 'var(--nextra-primary-hue, #0070f3)',
                textDecoration: 'underline'
              }}
            >
              {suggestion.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}
