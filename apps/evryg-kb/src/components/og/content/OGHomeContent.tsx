import { OGContent } from './OGContent'

interface OGHomeContentProps {
  title: string
  titleStyle: { fontSize: number; lineHeight: number }
}

export function OGHomeContent({ title, titleStyle }: OGHomeContentProps) {
  return (
    <OGContent>
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
    </OGContent>
  )
}
