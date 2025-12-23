import { ImageResponse } from 'next/og'
import { NextRequest } from 'next/server'
import { OGImage } from '../../../components/og/OGImage'
import { generateOGImageData } from '../../../main/core/use_cases/GenerateOGImageData'
import { createNextraPageMetadataAdapter } from '../../../main/secondary/NextraPageMetadataAdapter'
import { createNextraCategoryTitlesAdapter } from '../../../main/secondary/NextraCategoryTitlesAdapter'

const size = { width: 1200, height: 630 }

async function loadGoogleFont(font: string, weight: number): Promise<ArrayBuffer> {
  const fontFamily = font.replace(/ /g, '+')
  const url = `https://fonts.googleapis.com/css2?family=${fontFamily}:wght@${weight}&display=swap`

  // Safari 3 user agent triggers TTF response from Google Fonts (ImageResponse needs TTF, not WOFF2)
  const css = await fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Macintosh; U; PPC Mac OS X; en) AppleWebKit/312.8.1 (KHTML, like Gecko) Safari/312.6',
    },
  }).then((res) => res.text())

  const fontUrl = css.match(/src:\s*url\(([^)]+)\)/)?.[1]
  if (!fontUrl) {
    throw new Error(`Failed to extract font URL for ${font}`)
  }

  return fetch(fontUrl).then((res) => res.arrayBuffer())
}

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl
  const lang = searchParams.get('lang') || 'en'
  const path = searchParams.get('path') || ''

  const ogData = await generateOGImageData(
    { lang, path },
    {
      pageMetadata: createNextraPageMetadataAdapter(),
      categoryTitles: createNextraCategoryTitlesAdapter(),
    }
  )

  const [fontBold, fontRegular] = await Promise.all([
    loadGoogleFont('Source Sans 3', 700),
    loadGoogleFont('Source Sans 3', 400),
  ])

  return new ImageResponse(
    <OGImage data={ogData} lang={lang} />,
    {
      ...size,
      fonts: [
        { name: 'Source Sans 3', data: fontBold, style: 'normal', weight: 700 },
        { name: 'Source Sans 3', data: fontRegular, style: 'normal', weight: 400 },
      ],
    }
  )
}
