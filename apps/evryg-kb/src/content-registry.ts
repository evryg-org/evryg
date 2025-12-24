import type { ModulesRegistry } from './libs/nextra-contrib/lookupTitleFromModules'

/**
 * Registry mapping language and category slugs to their modules.ts loaders.
 * This is the content-specific configuration for title lookups.
 */
export const modulesRegistry: ModulesRegistry = {
  en: {
    'advanced-software-engineering': () =>
      import('../content/en/advanced-software-engineering/modules'),
    'lean-and-value-stream': () =>
      import('../content/en/lean-and-value-stream/modules'),
  },
  fr: {
    'ingenierie-logicielle-avancee': () =>
      import('../content/fr/ingenierie-logicielle-avancee/modules'),
    'lean-et-flux-de-valeur': () =>
      import('../content/fr/lean-et-flux-de-valeur/modules'),
  },
}
