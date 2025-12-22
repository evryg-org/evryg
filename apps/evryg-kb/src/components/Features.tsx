import styles from './Features.module.css'

const icons = {
  code: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  ),
  flow: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  )
} as const

interface Feature {
  icon: keyof typeof icons
  title: string
  description: string
  href: string
}

interface FeaturesProps {
  items: Feature[]
}

export function Features({ items }: FeaturesProps) {
  return (
    <div className={styles.features}>
      {items.map((item, i) => (
        <a key={i} href={item.href} className={styles.card}>
          <div className={styles.icon}>{icons[item.icon]}</div>
          <div className={styles.title}>{item.title}</div>
          <div className={styles.desc}>{item.description}</div>
        </a>
      ))}
    </div>
  )
}
