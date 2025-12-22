import type { Labels } from '../../main/core/domain/OGImageData'

interface OGContentProps {
  title: string
  titleStyle: { fontSize: number; lineHeight: number }
  category: string | null
  readingTime: number | null
  isHomePage: boolean
  labels: Labels
}

export function OGContent({
  title,
  titleStyle,
  category,
  readingTime,
  isHomePage,
  labels,
}: OGContentProps) {
  return (
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
  )
}
