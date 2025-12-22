/**
 * Secondary Adapter - Pagefind implementation of SearchPort
 */

import type { SearchPort, SearchResult } from '../core/ports/SearchPort'

interface PagefindSearchResult {
  results: Array<{
    id: string
    score: number
    data: () => Promise<{
      url: string
      meta: { title: string }
      excerpt: string
    }>
  }>
}

interface PagefindAPI {
  init: () => Promise<void>
  search: (query: string) => Promise<PagefindSearchResult>
}

let pagefindPromise: Promise<PagefindAPI | null> | null = null

async function loadPagefind(): Promise<PagefindAPI | null> {
  if (typeof window === 'undefined') return null

  if (pagefindPromise) return pagefindPromise

  pagefindPromise = (async () => {
    try {
      const pagefindUrl = new URL('/_pagefind/pagefind.js', window.location.origin).href
      const pagefind = await import(/* webpackIgnore: true */ pagefindUrl)
      return pagefind as PagefindAPI
    } catch (e) {
      console.error('Failed to load pagefind:', e)
      return null
    }
  })()

  return pagefindPromise
}

export function createPagefindAdapter(): SearchPort {
  let pagefind: PagefindAPI | null = null

  return {
    async init(): Promise<void> {
      if (!pagefind) {
        pagefind = await loadPagefind()
        if (pagefind) {
          await pagefind.init()
        }
      }
    },

    async search(query: string, limit: number): Promise<SearchResult[]> {
      if (!pagefind) {
        throw new Error('Pagefind not initialized')
      }

      const searchResult = await pagefind.search(query)
      const results: SearchResult[] = []

      for (const result of searchResult.results.slice(0, limit)) {
        const data = await result.data()
        results.push({
          url: data.url,
          title: data.meta.title
        })
      }

      return results
    }
  }
}
