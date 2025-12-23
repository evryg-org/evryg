import * as React from "react"
import { colors } from "./theme"

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
      <path d="M999 4h-44v45h44V4Z" fill="#32B26E" />
      <path d="M188 4h45l50 134L331 4h44l-68 178h-49Zm333 40q-18-4-34 1-32 12-33 54v83h-45V4h45v40q15-48 67-42Zm22-40h45l50 134L685 4h44l-69 181c-22 64-62 65-95 60v-34c24 5 37-5 46-30L543 4Zm339 141c-29 55-138 42-134-60S860-17 883 33V4h44v160q0 83-93 84-70 0-82-55h44q6 24 41 24 45 0 45-47v-25Zm2-60c0-32-19-52-46-53s-46 21-46 57 19 55 46 55 46-19 46-52Zm-713-1c-1-60-56-106-127-73v38H9c-23 56-2 127 66 136s92-39 95-58h-41q-10 26-39 26-41 0-47-49h128ZM45 75c5-54 82-58 83 0Z" />
      {!!baseline && (
        <text x={500} y={380} fontSize="90px" textAnchor="middle" fill={baselineColor ?? fill}>
          {baseline}
        </text>
      )}
    </svg>
  )
}
