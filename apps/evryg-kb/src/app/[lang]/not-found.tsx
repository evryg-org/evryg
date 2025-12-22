import { SuggestedPages } from '../../components/SuggestedPages'
import styles from '../../components/NotFoundPage.module.css'

export default function NotFound() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Page not found</h1>
      <p className={styles.subtitle}>
        The page you're looking for doesn't exist or has been moved.
      </p>
      <SuggestedPages />
    </div>
  )
}
