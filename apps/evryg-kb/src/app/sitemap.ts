import type { MetadataRoute } from 'next'
import { getPageMap } from 'nextra/page-map'
import type { PageMapItem } from 'nextra'
import { translatePath } from '../slug-mappings'

const BASE_URL = 'https://kb.evryg.com'
const locales = ['en', 'fr'] as const

// Recursively collect all page routes from Nextra's page map
function collectRoutes(items: PageMapItem[]): string[] {
  const routes: string[] = []
  for (const item of items) {
    if ('children' in item) {
      // Folder - recurse into children
      routes.push(...collectRoutes(item.children))
    } else if ('route' in item) {
      // MdxFile - add route
      routes.push(item.route)
    }
    // Skip MetaJsonFile items (no route property)
  }
  return routes
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries: MetadataRoute.Sitemap = []

  for (const lang of locales) {
    const pageMap = await getPageMap(`/${lang}`)
    const routes = collectRoutes(pageMap)

    for (const route of routes) {
      entries.push({
        url: `${BASE_URL}${route}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: route === `/${lang}` ? 1 : 0.8,
        alternates: {
          languages: {
            en: `${BASE_URL}${translatePath(route, 'en')}`,
            fr: `${BASE_URL}${translatePath(route, 'fr')}`,
            'x-default': `${BASE_URL}${translatePath(route, 'fr')}`,
          },
        },
      })
    }
  }

  return entries
}
