import type { Module } from '../../components/ModuleCards'

export interface ModulesData {
  modules: Module[]
}

export type ModulesLoader = () => Promise<ModulesData>
export type ModulesRegistry = Record<string, Record<string, ModulesLoader>>

// Cache for loaded modules
const cache: Record<string, ModulesData> = {}

async function loadModulesData(
  registry: ModulesRegistry,
  lang: string,
  categorySlug: string
): Promise<ModulesData | null> {
  const key = `${lang}/${categorySlug}`
  if (cache[key]) return cache[key]

  const loader = registry[lang]?.[categorySlug]
  if (!loader) return null

  const data = await loader()
  cache[key] = data
  return cache[key]
}

/**
 * Create a title lookup function from a modules registry.
 *
 * Path format: [categorySlug, moduleSlug?, articleSlug?]
 *
 * Returns:
 * - For category index (length 1): null (not handled by modules)
 * - For module index (length 2): module.title
 * - For article (length 3): article.title from module.articles
 */
export function createTitleLookup(registry: ModulesRegistry) {
  return async function lookupTitleFromModules(
    mdxPath: string[],
    lang: string
  ): Promise<string | null> {
    if (mdxPath.length < 1) return null

    const categorySlug = mdxPath[0]
    const data = await loadModulesData(registry, lang, categorySlug)
    if (!data) return null

    if (mdxPath.length === 1) {
      // Category index - not handled by modules
      return null
    }

    const moduleSlug = mdxPath[1]
    const mod = data.modules.find(m => m.slug === moduleSlug)
    if (!mod) return null

    if (mdxPath.length === 2) {
      // Module index - return module title
      return mod.title
    }

    if (mdxPath.length >= 3) {
      // Article - find in module.articles
      const articleSlug = mdxPath[2]
      const article = mod.articles.find(a => a.slug === articleSlug)
      return article?.title || null
    }

    return null
  }
}
