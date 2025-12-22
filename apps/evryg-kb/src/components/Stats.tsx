import styles from './Stats.module.css'

interface Stat {
  value: string
  label: string
}

interface StatsProps {
  items: Stat[]
}

export function Stats({ items }: StatsProps) {
  return (
    <div className={styles.stats}>
      {items.map((item, i) => (
        <div key={i} className={styles.stat}>
          <div className={styles.number}>{item.value}</div>
          <div className={styles.label}>{item.label}</div>
        </div>
      ))}
    </div>
  )
}
