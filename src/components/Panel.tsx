import { ReactNode } from "react"

type Props = {
  children?: ReactNode
  className: string
}

const Panel = ({ children, className }: Props) => (
  <div className={`panel ${className}`}>{children}</div>
)

export default Panel
