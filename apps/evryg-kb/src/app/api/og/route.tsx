import { ImageResponse } from 'next/og'
import { importPage } from 'nextra/pages'
import { NextRequest } from 'next/server'
import { colors } from '../../../design_system/theme'

// Image size
const size = { width: 1200, height: 630 }

// Category title mappings (from _meta.tsx files)
const CATEGORY_TITLES: Record<string, Record<string, string>> = {
  en: {
    'advanced-software-engineering': 'Advanced Software Engineering',
    'lean-and-value-stream': 'Lean & Value Stream',
  },
  fr: {
    'ingenierie-logicielle-avancee': 'Ingénierie logicielle avancée',
    'lean-et-flux-de-valeur': 'Lean et Flux de valeur',
  },
}

const HOME_TITLES: Record<string, string> = {
  en: 'evryg Knowledge Base',
  fr: 'Base de connaissances evryg',
}

// Localized labels
const LABELS = {
  en: {
    knowledgeBase: 'Knowledge Base',
    articlePrefix: 'Our article on',
    categorySeparator: '', // English uses "on" as connector
    minRead: (min: number) => `${min} min read`,
  },
  fr: {
    knowledgeBase: 'Base de connaissances',
    articlePrefix: 'Notre article',
    categorySeparator: '·', // French uses middle dot to avoid preposition issues
    minRead: (min: number) => `Temps de lecture : ${min} min`,
  },
}

const TAGLINE = 'evryg · Paris · Lean Software Delivery'
const URL = 'www.evryg.com'

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
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          fontFamily: 'Source Sans 3, sans-serif',
          backgroundColor: colors.accent,
        }}
      >
        {/* Raisin header bar with logo, "Knowledge Base" text, and green square */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: colors.raisin,
            padding: '28px 50px',
          }}
        >
          {/* Left: Logo + Knowledge Base */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
            {/* evryg logo as inline SVG */}
            <svg
              width="120"
              height="36"
              viewBox="0 0 1000 300"
              fill="white"
              style={{ marginTop: 4 }}
            >
              <path d="M188 4h45l50 134L331 4h44l-68 178h-49Zm333 40q-18-4-34 1-32 12-33 54v83h-45V4h45v40q15-48 67-42Zm22-40h45l50 134L685 4h44l-69 181c-22 64-62 65-95 60v-34c24 5 37-5 46-30L543 4Zm339 141c-29 55-138 42-134-60S860-17 883 33V4h44v160q0 83-93 84-70 0-82-55h44q6 24 41 24 45 0 45-47v-25Zm2-60c0-32-19-52-46-53s-46 21-46 57 19 55 46 55 46-19 46-52Zm-713-1c-1-60-56-106-127-73v38H9c-23 56-2 127 66 136s92-39 95-58h-41q-10 26-39 26-41 0-47-49h128ZM45 75c5-54 82-58 83 0Z" />
            </svg>

            {/* Separator */}
            <div
              style={{
                width: 1,
                height: 28,
                backgroundColor: 'rgba(255, 255, 255, 0.3)',
              }}
            />

            {/* Knowledge Base label */}
            <div
              style={{
                fontSize: 24,
                fontWeight: 600,
                color: 'rgba(255, 255, 255, 0.9)',
                letterSpacing: '0.01em',
              }}
            >
              {labels.knowledgeBase}
            </div>
          </div>

          {/* Green square accent */}
          <div
            style={{
              width: 36,
              height: 36,
              backgroundColor: colors.accent,
            }}
          />
        </div>

        {/* Green content area */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            flex: 1,
            padding: '40px 50px 50px 50px',
            justifyContent: 'space-between',
          }}
        >
          {/* Category + Title section */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              flex: 1,
              justifyContent: 'center',
            }}
          >
            {/* Article prefix + Category (for articles only) */}
            {!isHomePage && (
              <div
                style={{
                  fontSize: 22,
                  fontWeight: 400,
                  color: 'rgba(255, 255, 255, 0.75)',
                  marginBottom: 16,
                  letterSpacing: '0.02em',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                }}
              >
                <span style={{ display: 'flex' }}>{labels.articlePrefix}</span>
                {category && labels.categorySeparator && (
                  <span style={{ display: 'flex' }}>{labels.categorySeparator}</span>
                )}
                {category && (
                  <span style={{ display: 'flex', fontWeight: 600, color: 'rgba(255, 255, 255, 0.95)' }}>
                    {category}
                  </span>
                )}
              </div>
            )}

            {/* Article title (prominent) */}
            <div
              style={{
                display: 'flex',
                fontSize: titleStyle.fontSize,
                fontWeight: 700,
                color: 'white',
                lineHeight: titleStyle.lineHeight,
                letterSpacing: '-0.02em',
              }}
            >
              {title}
            </div>

            {/* Reading time (below title, for articles only) */}
            {!isHomePage && readingTime && (
              <div
                style={{
                  display: 'flex',
                  fontSize: 20,
                  fontWeight: 400,
                  color: 'rgba(255, 255, 255, 0.7)',
                  marginTop: 16,
                  letterSpacing: '0.01em',
                }}
              >
                {labels.minRead(readingTime)}
              </div>
            )}
          </div>

          {/* Bottom section: Tagline and URL */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              borderTop: '1px solid rgba(255, 255, 255, 0.25)',
              paddingTop: 20,
            }}
          >
            {/* Tagline */}
            <div
              style={{
                fontSize: 20,
                fontWeight: 400,
                color: 'rgba(255, 255, 255, 0.9)',
                letterSpacing: '0.01em',
              }}
            >
              {TAGLINE}
            </div>

            {/* URL */}
            <div
              style={{
                fontSize: 18,
                fontWeight: 400,
                color: 'rgba(255, 255, 255, 0.7)',
              }}
            >
              {URL}
            </div>
          </div>
        </div>
      </div>
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
