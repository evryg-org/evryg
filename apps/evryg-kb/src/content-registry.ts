import type { ContentRegistry } from './libs/nextra-contrib/createTitleLookup'

/**
 * Registry mapping language and category slugs to their _meta.ts loaders.
 * This is the content-specific configuration for title lookups.
 */
export const contentRegistry: ContentRegistry = {
  en: {
    'advanced-software-engineering': () =>
      import('../content/en/advanced-software-engineering/_meta'),
    'lean-and-value-stream': () =>
      import('../content/en/lean-and-value-stream/_meta'),
  },
  fr: {
    'ingenierie-logicielle-avancee': () =>
      import('../content/fr/ingenierie-logicielle-avancee/_meta'),
    'lean-et-flux-de-valeur': () =>
      import('../content/fr/lean-et-flux-de-valeur/_meta'),
  },
}
