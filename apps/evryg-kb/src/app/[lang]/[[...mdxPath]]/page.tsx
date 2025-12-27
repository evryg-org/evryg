import { generateStaticParamsFor, importPage } from 'nextra/pages'
import { useMDXComponents } from '../../../mdx-components'
import { ArticleCTA } from '../../../components/article_cta'
import { translatePath } from '../../../slug-mappings'

const BASE_URL = 'https://kb.evryg.com'

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
  const publishedTime = metadata?.timestamp
    ? new Date(metadata.timestamp).toISOString()
    : undefined

  const currentPath = `/${params.lang}${path ? `/${path}` : ''}`

  return {
    ...metadata,
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
      publishedTime,
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
  const showCTA = pageType === 'article'

  return (
    <Wrapper toc={toc} metadata={metadata}>
      <MDXContent {...props} params={params} />
      {showCTA && <ArticleCTA lang={params.lang} />}
    </Wrapper>
  )
}
