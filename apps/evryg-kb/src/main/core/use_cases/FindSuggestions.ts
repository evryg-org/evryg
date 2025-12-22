/**
 * Use Case - Find page suggestions for a 404 path
 */

import type { SearchPort } from '../ports/SearchPort'
import {
  type Suggestion,
  extractKeywords,
  getLocaleFromPath,
  matchesLocale,
  FALLBACK_TERMS
} from '../domain/Suggestions'

export interface FindSuggestionsInput {
  pathname: string
  maxResults?: number
}

export interface FindSuggestionsOutput {
  suggestions: Suggestion[]
}

export async function findSuggestions(
  input: FindSuggestionsInput,
  searchPort: SearchPort
): Promise<FindSuggestionsOutput> {
  const { pathname, maxResults = 3 } = input
  const { primary, secondary } = extractKeywords(pathname)
  const locale = getLocaleFromPath(pathname)

  await searchPort.init()

  const results: Suggestion[] = []
  const seenUrls = new Set<string>()

  const addResults = async (searchResults: Suggestion[]) => {
    for (const result of searchResults) {
      if (results.length >= maxResults) break
      if (matchesLocale(result.url, locale) && !seenUrls.has(result.url)) {
        seenUrls.add(result.url)
        results.push(result)
      }
    }
  }

  // 1. Search with primary keywords (last path segment - most specific)
  if (primary) {
    const primaryResults = await searchPort.search(primary, 10)
    await addResults(primaryResults)
  }

  // 2. Try individual primary keywords if not enough results
  if (results.length < maxResults && primary) {
    for (const keyword of primary.split(' ')) {
      if (results.length >= maxResults) break
      if (keyword.length > 3) {
        const keywordResults = await searchPort.search(keyword, 5)
        await addResults(keywordResults)
      }
    }
  }

  // 3. Try secondary keywords (parent path segments)
  if (results.length < maxResults && secondary) {
    const secondaryResults = await searchPort.search(secondary, 10)
    await addResults(secondaryResults)
  }

  // 4. Try individual secondary keywords
  if (results.length < maxResults && secondary) {
    for (const keyword of secondary.split(' ')) {
      if (results.length >= maxResults) break
      if (keyword.length > 3) {
        const keywordResults = await searchPort.search(keyword, 5)
        await addResults(keywordResults)
      }
    }
  }

  // 5. Fallback: search for common terms
  if (results.length < maxResults) {
    for (const term of FALLBACK_TERMS[locale]) {
      if (results.length >= maxResults) break
      const fallbackResults = await searchPort.search(term, 5)
      await addResults(fallbackResults)
    }
  }

  return { suggestions: results }
}
