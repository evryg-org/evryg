/**
 * Use Case - Extract excerpt from content
 *
 * Shared business logic for extracting excerpts from MDX or HTML content.
 * Works in both server (build time) and client (runtime) contexts.
 */

const MAX_LENGTH = 200

/**
 * Extract a clean text excerpt from content.
 *
 * @param content - Raw content string (MDX source or HTML)
 * @param format - Content format: 'mdx' for raw MDX source, 'html' for HTML snippets
 * @returns Clean text excerpt, truncated to MAX_LENGTH
 */
export function extractExcerpt(content: string, format: 'mdx' | 'html'): string {
  const text = format === 'mdx'
    ? extractTextFromMdx(content)
    : extractTextFromHtml(content)

  return truncate(stripLatex(text), MAX_LENGTH)
}

function extractTextFromMdx(sourceCode: string): string {
  // Remove frontmatter (---\n...\n---)
  const withoutFrontmatter = sourceCode.replace(/^---[\s\S]*?---\n*/, '')

  // Split into lines and find first non-heading, non-empty content
  const lines = withoutFrontmatter.split('\n')

  let paragraph = ''
  for (const line of lines) {
    const trimmed = line.trim()
    // Skip empty lines, headings, imports, and JSX
    if (!trimmed || trimmed.startsWith('#') || trimmed.startsWith('import') || trimmed.startsWith('<')) {
      if (paragraph) break // End of paragraph
      continue
    }
    paragraph += (paragraph ? ' ' : '') + trimmed
  }

  // Clean up markdown formatting
  return paragraph
    .replace(/\*([^*]+)\*/g, '$1')           // Remove italics
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // Remove links, keep text
}

function extractTextFromHtml(html: string): string {
  return html.replace(/<[^>]*>/g, '')
}

function stripLatex(text: string): string {
  return text
    // Unwrap math delimiters, keep content
    .replace(/\$\$([\s\S]*?)\$\$/g, '$1')    // $$...$$ -> content
    .replace(/\$([^$]+)\$/g, '$1')           // $...$ -> content
    // Convert LaTeX commands to plain text
    .replace(/\\text\{([^}]*)\}/g, '$1')     // \text{foo} -> foo
    .replace(/\\(langle|rangle)/g, '')       // Remove angle brackets
    .replace(/\\to/g, '→')                   // \to -> →
    .replace(/\\rightarrow/g, '→')
    .replace(/\\leftarrow/g, '←')
    .replace(/\\Rightarrow/g, '⇒')
    .replace(/\\[a-zA-Z]+/g, '')             // Remove remaining LaTeX commands
    .replace(/[{}]/g, '')                    // Remove braces
    .replace(/\s+/g, ' ')                    // Normalize whitespace
    .trim()
}

function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength) + '...'
}
