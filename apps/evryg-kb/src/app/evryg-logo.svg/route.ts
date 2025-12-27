import { NextRequest, NextResponse } from 'next/server'
import { EVRYG_LOGO_PATHS, EVRYG_LOGO_ACCENT_COLOR } from '../../design_system/evryg-logo-paths'
import { colors } from '../../design_system/theme'

export async function GET(request: NextRequest) {
  const theme = request.nextUrl.searchParams.get('theme') || 'dark'
  const fill = theme === 'light' ? colors.white : colors.black

  const svg = `<svg width="1000" height="300" viewBox="0 0 1000 300" fill="${fill}" xmlns="http://www.w3.org/2000/svg">
  <title>evryg</title>
  <path d="${EVRYG_LOGO_PATHS.accent}" fill="${EVRYG_LOGO_ACCENT_COLOR}" />
  <path d="${EVRYG_LOGO_PATHS.main}" />
</svg>`

  return new NextResponse(svg, {
    headers: {
      'Content-Type': 'image/svg+xml',
      'Cache-Control': 'public, max-age=86400, stale-while-revalidate=604800',
    },
  })
}
