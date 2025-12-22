import styles from './Hero.module.css'

interface HeroProps {
  title: string
  subtitle: string
  ctaText: string
  ctaHref: string
}

export function Hero({ title, subtitle, ctaText, ctaHref }: HeroProps) {
  return (
    <div className={styles.hero}>
      <h1 className={styles.title}>{title}</h1>
      <div className={styles.subtitle}>{subtitle}</div>
      <a href={ctaHref} className={styles.cta}>
        {ctaText}
      </a>
    </div>
  )
}
