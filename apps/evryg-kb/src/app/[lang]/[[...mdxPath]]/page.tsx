import { generateStaticParamsFor, importPage } from 'nextra/pages'
import { useMDXComponents } from '../../../mdx-components'
import { ArticleCTA } from '../../../components/article_cta'
import { ArticleTags } from '../../../components/article_tags'
import { translatePath } from '../../../slug-mappings'

const BASE_URL = 'https://kb.evryg.com'

function buildBreadcrumbList(lang: string, mdxPath?: string[]) {
  const items = [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": `${BASE_URL}/${lang}`
    }
  ]

  if (mdxPath) {
    let currentPath = `/${lang}`
    mdxPath.forEach((segment, index) => {
      currentPath += `/${segment}`
      items.push({
        "@type": "ListItem",
        "position": index + 2,
        "name": segment.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()),
        "item": `${BASE_URL}${currentPath}`
      })
    })
  }

  return items
}

export const generateStaticParams = generateStaticParamsFor('mdxPath')

export async function generateMetadata(props: {
  params: Promise<{ lang: string; mdxPath?: string[] }>
}) {
  const params = await props.params
  const { metadata } = await importPage(params.mdxPath, params.lang)

  // Build OG image URL
  const path = params.mdxPath?.join('/') || ''
  const ogImageUrl = `/api/og?lang=${params.lang}&path=${encodeURIComponent(path)}`

  const description = metadata?.description || ''
  const modifiedTime = metadata?.timestamp
    ? new Date(metadata.timestamp).toISOString()
    : undefined
  const tags = (metadata as { tags?: string[] })?.tags || []

  // Get section title from the section's index.mdx frontmatter
  let section: string | undefined
  if (params.mdxPath?.[0]) {
    try {
      const sectionPage = await importPage([params.mdxPath[0]], params.lang)
      section = sectionPage.metadata?.title
    } catch {
      // Section index not found, skip section metadata
    }
  }

  const currentPath = `/${params.lang}${path ? `/${path}` : ''}`

  return {
    ...metadata,
    authors: [{ name: 'evryg', url: 'https://www.evryg.com' }],
    keywords: tags,
    alternates: {
      canonical: `${BASE_URL}${translatePath(currentPath, 'fr')}`,
      languages: {
        en: `${BASE_URL}${translatePath(currentPath, 'en')}`,
        fr: `${BASE_URL}${translatePath(currentPath, 'fr')}`,
      },
    },
    openGraph: {
      ...metadata?.openGraph,
      type: 'article',
      description,
      authors: ['evryg'],
      modifiedTime,
      ...(section && { section }),
      tags,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: metadata?.title || 'evryg',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      description,
      images: [ogImageUrl],
    },
  }
}

const Wrapper = useMDXComponents().wrapper

export default async function Page(props: {
  params: Promise<{ lang: string; mdxPath?: string[] }>
}) {
  const params = await props.params
  const result = await importPage(params.mdxPath, params.lang)
  const { default: MDXContent, toc, metadata } = result

  const pageType = (metadata as { pageType?: string }).pageType
  const tags = (metadata as { tags?: string[] })?.tags || []
  const showCTA = pageType === 'article'

  const path = params.mdxPath?.join('/') || ''
  const currentUrl = `${BASE_URL}/${params.lang}${path ? `/${path}` : ''}`
  const modifiedTime = (metadata as { timestamp?: number })?.timestamp

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        "itemListElement": buildBreadcrumbList(params.lang, params.mdxPath)
      },
      {
        "@type": "TechArticle",
        "headline": metadata?.title,
        "description": metadata?.description,
        "url": currentUrl,
        "inLanguage": params.lang,
        ...(modifiedTime && {
          "dateModified": new Date(modifiedTime).toISOString()
        }),
        "keywords": tags.join(', '),
        "author": {
          "@type": "Organization",
          "@id": "https://kb.evryg.com/#organization",
          "name": "evryg",
          "url": "https://www.evryg.com"
        },
        "publisher": { "@id": "https://kb.evryg.com/#organization" },
        "isPartOf": { "@id": "https://kb.evryg.com/#website" }
      }
    ]
  }

  return (
    <Wrapper toc={toc} metadata={metadata}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <ArticleTags tags={tags} lang={params.lang} />
      <MDXContent {...props} params={params} />
      {showCTA && <ArticleCTA lang={params.lang} />}
    </Wrapper>
  )
}
