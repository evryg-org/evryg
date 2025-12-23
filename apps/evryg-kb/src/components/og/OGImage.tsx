import { colors } from '../../design_system/theme'
import type { OGImageData } from '../../main/core/domain/OGImageData'
import { OGArticleContent } from './content/OGArticleContent'
import { OGHomeContent } from './content/OGHomeContent'
import { OGFooter } from './OGFooter'
import { OGHeader } from './OGHeader'

export interface OGImageProps {
  data: OGImageData
  lang: string
}

function getTitleStyle(title: string): { fontSize: number; lineHeight: number } {
  const length = title.length
  if (length <= 30) return { fontSize: 72, lineHeight: 1.1 }
  if (length <= 50) return { fontSize: 64, lineHeight: 1.15 }
  if (length <= 80) return { fontSize: 56, lineHeight: 1.2 }
  if (length <= 120) return { fontSize: 48, lineHeight: 1.25 }
  return { fontSize: 40, lineHeight: 1.3 }
}

export function OGImage({ data, lang }: OGImageProps) {
  const titleStyle = getTitleStyle(data.title)

  return (
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
      <OGHeader knowledgeBaseLabel={data.labels.knowledgeBase} />

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          padding: '40px 50px 50px 50px',
          justifyContent: 'space-between',
        }}
      >
        {data.pageType === 'home' ? (
          <OGHomeContent title={data.title} titleStyle={titleStyle} />
        ) : (
          <OGArticleContent
            title={data.title}
            titleStyle={titleStyle}
            category={data.category}
            readingTime={data.readingTime}
            labels={data.labels}
          />
        )}
        <OGFooter lang={lang} />
      </div>
    </div>
  )
}
