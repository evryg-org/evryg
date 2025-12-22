import { TAGLINE, URL } from './constants'

export function OGFooter() {
  return (
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
  )
}
