import * as React from "react"
import { colors } from "./theme"
import { EVRYG_LOGO_PATHS, EVRYG_LOGO_ACCENT_COLOR } from "./evryg-logo-paths"

interface Props extends React.SVGProps<SVGSVGElement> {
  theme?: "light" | "dark"
  baseline?: string
  baselineColor?: string
}

export const Logo = ({ baseline, baselineColor, theme = "dark", ...props }: Props) => {
  const fill = theme === "dark" ? colors.black : colors.white

  const height = baseline ? 500 : 300

  return (
    <svg
      width="1000"
      style={{ width: "100%", height: "auto" }}
      height={height}
      viewBox={`0 0 1000 ${height}`}
      fill={fill}
      {...props}
    >
      <title style={{ opacity: 0 }}>evryg</title>{" "}
      {/* Required for Satori/OpenGraph rendering but hidden with opacity */}
      <path d={EVRYG_LOGO_PATHS.accent} fill={EVRYG_LOGO_ACCENT_COLOR} />
      <path d={EVRYG_LOGO_PATHS.main} />
      {!!baseline && (
        <text x={500} y={380} fontSize="90px" textAnchor="middle" fill={baselineColor ?? fill}>
          {baseline}
        </text>
      )}
    </svg>
  )
}
