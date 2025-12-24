import type { Module } from '../../components/ModuleCards'

/**
 * Build Nextra _meta for a category (top-level module folder).
 * Maps module slugs to their titles for navigation.
 */
export const buildCategoryMeta = (modules: Module[]): Record<string, string> => ({
  index: 'Introduction',
  ...Object.fromEntries(modules.map(mod => [mod.slug, mod.title]))
})
