import { Logo } from "./EvrygLogo"
import styles from "./ThemedEvrygLogo.module.css"

interface ThemedEvrygLogoProps {
  width?: number | string
  className?: string
}

export function ThemedEvrygLogo({ width = 80, className }: ThemedEvrygLogoProps) {
  return (
    <span className={`${styles.themeAdaptive} ${className ?? ""}`} style={{ width }}>
      <Logo fill="currentColor" />
    </span>
  )
}
