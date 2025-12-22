import { ImageResponse } from 'next/og'
import { importPage } from 'nextra/pages'
import { NextRequest } from 'next/server'
import { OGImage } from '../../../components/og/OGImage'
import { CATEGORY_TITLES, HOME_TITLES, LABELS } from '../../../components/og/constants'

// Image size
const size = { width: 1200, height: 630 }

/**
 * Load a Google Font dynamically
 */
async function loadGoogleFont(
  font: string,
  weight: number
): Promise<ArrayBuffer> {
  // Replace spaces with + for Google Fonts URL (don't use encodeURIComponent on the result)
  const fontFamily = font.replace(/ /g, '+')
  const url = `https://fonts.googleapis.com/css2?family=${fontFamily}:wght@${weight}&display=swap`

  // Use a User-Agent that requests TTF format (not WOFF2) for ImageResponse compatibility
  const css = await fetch(url, {
    headers: {
      // Safari 3 user agent triggers TTF response from Google Fonts
      'User-Agent': 'Mozilla/5.0 (Macintosh; U; PPC Mac OS X; en) AppleWebKit/312.8.1 (KHTML, like Gecko) Safari/312.6',
    },
  }).then((res) => res.text())

  // Match src: url(...) in CSS - handle both quoted and unquoted URLs
  const fontUrl = css.match(/src:\s*url\(([^)]+)\)/)?.[1]

  if (!fontUrl) {
    console.error('Failed to extract font URL from CSS:', css.substring(0, 200))
    throw new Error(`Failed to extract font URL for ${font}`)
  }

  const response = await fetch(fontUrl)
  return response.arrayBuffer()
}

/**
 * Calculate reading time from MDX content
 * ~200 words per minute for technical content
 */
function calculateReadingTime(content: string): number {
  // Strip MDX/markdown syntax and count words
  const text = content
    .replace(/```[\s\S]*?```/g, '') // Remove code blocks
    .replace(/`[^`]*`/g, '') // Remove inline code
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1') // Replace links with text
    .replace(/[#*_~>\-|]/g, '') // Remove markdown symbols
    .replace(/\s+/g, ' ') // Normalize whitespace
    .trim()

  const wordCount = text.split(/\s+/).filter(word => word.length > 0).length
  const minutes = Math.ceil(wordCount / 200)
  return Math.max(1, minutes) // At least 1 minute
}

/**
 * Calculate responsive font size based on title length
 */
function getTitleStyle(title: string): { fontSize: number; lineHeight: number } {
  const length = title.length

  if (length <= 30) return { fontSize: 64, lineHeight: 1.1 }
  if (length <= 50) return { fontSize: 56, lineHeight: 1.15 }
  if (length <= 80) return { fontSize: 48, lineHeight: 1.2 }
  if (length <= 120) return { fontSize: 40, lineHeight: 1.25 }
  return { fontSize: 34, lineHeight: 1.3 }
}

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl
  const lang = searchParams.get('lang') || 'en'
  const path = searchParams.get('path') || ''
  const labels = LABELS[lang as keyof typeof LABELS] || LABELS.en

  const mdxPath = path ? path.split('/').filter(Boolean) : []
  const isHomePage = mdxPath.length === 0

  // Get title, category, and reading time
  let title: string
  let category: string | null = null
  let readingTime: number | null = null

  if (isHomePage) {
    title = HOME_TITLES[lang] || HOME_TITLES.en
  } else {
    try {
      const result = await importPage(mdxPath, lang)
      title = result.metadata?.title || 'evryg'
      // Calculate reading time from source code
      if (result.sourceCode) {
        readingTime = calculateReadingTime(result.sourceCode)
      }
    } catch {
      title = 'evryg'
    }
    // Get category from first path segment
    const categorySlug = mdxPath[0]
    category = CATEGORY_TITLES[lang]?.[categorySlug] || null
  }

  const titleStyle = getTitleStyle(title)

  // Load Source Sans 3 fonts
  const [fontBold, fontRegular] = await Promise.all([
    loadGoogleFont('Source Sans 3', 700),
    loadGoogleFont('Source Sans 3', 400),
  ])

  return new ImageResponse(
    (
      <OGImage
        title={title}
        titleStyle={titleStyle}
        category={category}
        readingTime={readingTime}
        isHomePage={isHomePage}
        labels={labels}
      />
    ),
    {
      ...size,
      fonts: [
        {
          name: 'Source Sans 3',
          data: fontBold,
          style: 'normal',
          weight: 700,
        },
        {
          name: 'Source Sans 3',
          data: fontRegular,
          style: 'normal',
          weight: 400,
        },
      ],
    }
  )
}
