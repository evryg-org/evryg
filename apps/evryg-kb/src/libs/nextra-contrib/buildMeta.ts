import type { ContentNode } from './types'

interface BuildMetaInput {
  items?: ContentNode[]
  index?: string
}

/**
 * Build Nextra _meta configuration from a content node.
 * Works for both category level (modules) and module level (articles).
 */
export const buildMeta = (node: BuildMetaInput): Record<string, string> => ({
  index: node.index ?? 'Introduction',
  ...Object.fromEntries((node.items ?? []).map(item => [item.slug, item.title]))
})
