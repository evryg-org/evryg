import type { Module } from '../../components/ModuleCards'

/**
 * Build a Nextra _meta.ts configuration for a module.
 *
 * This function generates the navigation metadata for a module folder,
 * using modules.ts as the single source of truth for titles.
 *
 * @param modules - The modules array from modules.ts
 * @param articleTitles - The articleTitles mapping from modules.ts
 * @param moduleSlug - The slug of the current module folder
 * @returns A Record<string, string> suitable for Nextra _meta.ts export
 */
export function buildModuleMeta(
  modules: Module[],
  articleTitles: Record<string, string>,
  moduleSlug: string
): Record<string, string> {
  const mod = modules.find(m => m.slug === moduleSlug)
  const meta: Record<string, string> = { index: mod?.indexTitle || 'Introduction' }

  for (const slug of mod?.articles || []) {
    if (articleTitles[slug]) {
      meta[slug] = articleTitles[slug]
    }
  }

  return meta
}
