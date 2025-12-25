import { Logo } from '../../design_system/EvrygLogo'
import styles from './ArticleCTA.module.css'

const CONFIG = {
  bookingUrl: 'https://calendar.app.google/meJGweBNzTMJMx2t9',
  discordUrl: 'https://discord.gg/qQjsDKtqqC',
  email: 'contact@evryg.com',
}

const TEXT = {
  en: {
    headline: 'Want to dive deeper into these topics?',
    description:
      'We help teams adopt these practices through hands-on consulting and training.',
    primaryCta: 'Schedule a call',
    discordCta: 'Talk to us on Discord',
    secondaryCta: 'or email us at',
  },
  fr: {
    headline: "Envie d'approfondir ces sujets ?",
    description:
      'Nous aidons les équipes à adopter ces pratiques via du conseil et de la formation.',
    primaryCta: 'Planifier un appel',
    discordCta: 'Discutez sur Discord',
    secondaryCta: 'ou écrivez-nous à',
  },
}

interface ArticleCTAProps {
  lang: string
}

export function ArticleCTA({ lang }: ArticleCTAProps) {
  const text = TEXT[lang as keyof typeof TEXT] || TEXT.en

  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        <Logo theme="light" />
      </div>
      <h3 className={styles.headline}>{text.headline}</h3>

      <p className={styles.description}>{text.description}</p>

      <div className={styles.buttons}>
        <a
          href={CONFIG.bookingUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.primaryCta}
        >
          {text.primaryCta}
          <span aria-hidden="true" className={styles.arrow}>
            &rarr;
          </span>
        </a>

        <a
          href={CONFIG.discordUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.discordCta}
        >
          {text.discordCta}
        </a>
      </div>

      <p className={styles.secondaryCta}>
        {text.secondaryCta}{' '}
        <a href={`mailto:${CONFIG.email}`}>{CONFIG.email}</a>
      </p>
    </div>
  )
}
