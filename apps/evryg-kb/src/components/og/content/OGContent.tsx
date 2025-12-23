import type { ReactNode } from 'react'

interface OGContentProps {
  children: ReactNode
}

export function OGContent({ children }: OGContentProps) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        justifyContent: 'center',
      }}
    >
      {children}
    </div>
  )
}
