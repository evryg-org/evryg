/**
 * Port - Search interface (driven port)
 */

export interface SearchResult {
  url: string
  title: string
}

export interface SearchPort {
  /**
   * Initialize the search engine
   */
  init(): Promise<void>

  /**
   * Search for pages matching the query
   * @param query - Search query string
   * @param limit - Maximum number of results to return
   */
  search(query: string, limit: number): Promise<SearchResult[]>
}
